#!/usr/bin/env python3
"""Lưu ảnh hóa đơn theo ngày và gộp thành 1 file PDF mỗi tháng.

Ảnh được lưu trong hoa-don/YYYY-MM/, kèm danh-sach.json ghi ngày + ghi chú.

  python3 scripts/hoa_don_pdf.py add anh1.jpg anh2.png [--date 2026-09-24] [--note "Tiền điện"]
  python3 scripts/hoa_don_pdf.py add hoa-don/inbox/* --move    # lấy ảnh từ thư mục inbox
  python3 scripts/hoa_don_pdf.py list [--month 2026-09]
  python3 scripts/hoa_don_pdf.py build [--month 2026-09 | --month prev]

Cần: pip install pillow   (tùy chọn: pillow-heif để đọc ảnh .heic của iPhone)
"""
import argparse
import datetime as dt
import json
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

try:
    from pillow_heif import register_heif_opener

    register_heif_opener()
except ImportError:
    pass

ROOT = Path(__file__).resolve().parent.parent / "hoa-don"
IMG_EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".bmp", ".tif", ".tiff"}
DPI = 150
PAGE_W, PAGE_H = int(8.27 * DPI), int(11.69 * DPI)  # A4
MARGIN = int(0.4 * DPI)
FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "C:/Windows/Fonts/arial.ttf",
]


def font(size):
    for p in FONT_PATHS:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default(size)


def month_dir(month):
    return ROOT / month


def load_index(month):
    f = month_dir(month) / "danh-sach.json"
    return json.loads(f.read_text("utf-8")) if f.exists() else []


def save_index(month, items):
    items.sort(key=lambda x: (x["date"], x["file"]))
    (month_dir(month) / "danh-sach.json").write_text(
        json.dumps(items, ensure_ascii=False, indent=2) + "\n", "utf-8"
    )


def resolve_month(value):
    today = dt.date.today()
    if not value:
        return today.strftime("%Y-%m")
    if value == "prev":
        return (today.replace(day=1) - dt.timedelta(days=1)).strftime("%Y-%m")
    dt.datetime.strptime(value, "%Y-%m")
    return value


def cmd_add(args):
    date = dt.date.fromisoformat(args.date) if args.date else dt.date.today()
    month = date.strftime("%Y-%m")
    d = month_dir(month)
    d.mkdir(parents=True, exist_ok=True)
    items = load_index(month)
    n = sum(1 for x in items if x["date"] == date.isoformat())
    for src in map(Path, args.files):
        if src.name.startswith("."):
            continue
        if src.suffix.lower() not in IMG_EXT:
            sys.exit(f"Không phải file ảnh: {src}")
        n += 1
        ext = src.suffix.lower()
        if ext in {".heic", ".heif"}:
            # Lưu sang JPG để xem được ở mọi nơi.
            dest = d / f"{date.isoformat()}_{n:02d}.jpg"
            ImageOps.exif_transpose(Image.open(src)).convert("RGB").save(dest, quality=90)
        else:
            dest = d / f"{date.isoformat()}_{n:02d}{ext}"
            shutil.copy2(src, dest)
        if args.move:
            src.unlink()
        items.append({"file": dest.name, "date": date.isoformat(), "note": args.note or ""})
        print(f"Đã lưu {dest.relative_to(ROOT.parent)}")
    save_index(month, items)
    print(f"Tháng {month}: {len(items)} hóa đơn.")


def cmd_list(args):
    month = resolve_month(args.month)
    items = load_index(month)
    if not items:
        print(f"Tháng {month}: chưa có hóa đơn nào.")
        return
    print(f"Tháng {month}: {len(items)} hóa đơn")
    for i, x in enumerate(items, 1):
        print(f"{i:>3}. {x['date']}  {x['file']}  {x['note']}")


def fit_page(img, title):
    page = Image.new("RGB", (PAGE_W, PAGE_H), "white")
    draw = ImageDraw.Draw(page)
    f = font(28)
    draw.text((MARGIN, MARGIN), title, fill="black", font=f)
    top = MARGIN + 60
    box_w, box_h = PAGE_W - 2 * MARGIN, PAGE_H - top - MARGIN
    img = ImageOps.exif_transpose(img).convert("RGB")
    img.thumbnail((box_w, box_h), Image.LANCZOS)
    page.paste(img, (MARGIN + (box_w - img.width) // 2, top + (box_h - img.height) // 2))
    return page


def cover_pages(month, items):
    title_font, row_font = font(44), font(26)
    year, mon = month.split("-")
    pages, page, draw, y = [], None, None, 0
    rows_per_page = (PAGE_H - 2 * MARGIN - 220) // 40
    for i, x in enumerate(items):
        if i % rows_per_page == 0:
            page = Image.new("RGB", (PAGE_W, PAGE_H), "white")
            draw = ImageDraw.Draw(page)
            draw.text((MARGIN, MARGIN), f"TỔNG HỢP HÓA ĐƠN THÁNG {mon}/{year}", fill="black", font=title_font)
            draw.text((MARGIN, MARGIN + 70), f"Tổng số: {len(items)} hóa đơn", fill="black", font=row_font)
            y = MARGIN + 150
            draw.text((MARGIN, y), "STT    Ngày            Ghi chú", fill="black", font=row_font)
            y += 50
            pages.append(page)
        d = dt.date.fromisoformat(x["date"]).strftime("%d/%m/%Y")
        draw.text((MARGIN, y), f"{i + 1:>3}.    {d}    {x['note']}", fill="black", font=row_font)
        y += 40
    return pages


def cmd_build(args):
    month = resolve_month(args.month)
    items = load_index(month)
    if not items:
        sys.exit(f"Tháng {month}: chưa có hóa đơn nào để gộp.")
    d = month_dir(month)
    pages = cover_pages(month, items)
    for i, x in enumerate(items, 1):
        date = dt.date.fromisoformat(x["date"]).strftime("%d/%m/%Y")
        title = f"Hóa đơn {i}/{len(items)} – {date}" + (f" – {x['note']}" if x["note"] else "")
        with Image.open(d / x["file"]) as img:
            pages.append(fit_page(img, title))
    out = d / f"HoaDon_{month}.pdf"
    pages[0].save(out, save_all=True, append_images=pages[1:], resolution=DPI, quality=85)
    print(f"Đã tạo {out.relative_to(ROOT.parent)} ({len(items)} hóa đơn, {len(pages)} trang)")


def main():
    p = argparse.ArgumentParser(description="Hóa đơn ảnh -> PDF theo tháng")
    sub = p.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("add", help="Lưu ảnh hóa đơn")
    a.add_argument("files", nargs="+")
    a.add_argument("--date", help="YYYY-MM-DD, mặc định hôm nay")
    a.add_argument("--note", help="Ghi chú, vd: Tiền điện")
    a.add_argument("--move", action="store_true", help="Xóa file gốc sau khi lưu (dùng cho hoa-don/inbox)")
    a.set_defaults(fn=cmd_add)
    ls = sub.add_parser("list", help="Xem hóa đơn trong tháng")
    ls.add_argument("--month", help="YYYY-MM hoặc prev")
    ls.set_defaults(fn=cmd_list)
    b = sub.add_parser("build", help="Gộp ảnh trong tháng thành PDF")
    b.add_argument("--month", help="YYYY-MM hoặc prev")
    b.set_defaults(fn=cmd_build)
    args = p.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
