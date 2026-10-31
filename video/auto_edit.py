#!/usr/bin/env python3
"""
auto_edit.py — Tự dựng video dọc 9:16 từ clip quay thô (điện thoại / thẻ nhớ).

Quy trình 2 bước để Claude (hoặc bạn) kịp sửa phụ đề trước khi xuất:

  1) python3 video/auto_edit.py chuan-bi  <thư mục clip>  --ten <ten-video>
       - ghép các clip theo thứ tự tên file, đưa về 1080x1920 / 30fps
       - CẮT KHOẢNG LẶNG (chỗ ậm ừ, im lặng)
       - nhận giọng nói tiếng Việt -> tạo phụ đề  output/<ten>/phu-de.srt
         (cần: pip install faster-whisper ; không có thì bỏ qua phụ đề)

  2) python3 video/auto_edit.py xuat  --ten <ten-video>  [--nhac video/nhac/x.mp3] [--tieu-de "HOOK 3 GIÂY ĐẦU"]
       - đốt phụ đề (chữ to, viền đen, giữa màn hình phía dưới)
       - tiêu đề hook 3 giây đầu
       - chèn nhạc nền, TỰ HẠ NHẠC khi có giọng nói (sidechain)
       - chuẩn âm lượng -14 LUFS (chuẩn Reels/TikTok)
       - xuất  output/<ten>/final.mp4  +  thumbnail.jpg

Mọi thông số đổi được trong video/cau-hinh.json (không có thì dùng mặc định).
"""
import argparse, json, os, random, re, subprocess, sys
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
MAC_DINH = {
    "rong": 1080, "cao": 1920, "fps": 30,
    "nguong_lang_db": -32,      # dưới mức này coi là im lặng
    "lang_toi_thieu": 0.6,      # im lặng dài hơn (giây) thì cắt
    "chua_lai": 0.15,           # giữ lại chút đệm 2 đầu cho tự nhiên
    "whisper_model": "small",   # tiny/base/small/medium/large-v3 (càng lớn càng đúng, càng chậm)
    "font": "DejaVu Sans",
    "co_chu_phu_de": 15,        # cỡ chữ ASS (theo khung 384x288 của libass)
    "am_luong_nhac": 0.18,
    "lufs": -14,
}
DUOI_VIDEO = {".mp4", ".mov", ".m4v", ".mkv", ".avi", ".webm", ".mts"}


def cau_hinh():
    f = GOC / "video" / "cau-hinh.json"
    c = dict(MAC_DINH)
    if f.exists():
        c.update(json.loads(f.read_text(encoding="utf-8")))
    return c


def chay(cmd, lay_log=False):
    print("  $", " ".join(str(x) for x in cmd)[:200])
    r = subprocess.run([str(x) for x in cmd], capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("!! Lỗi ffmpeg:\n" + r.stderr[-2000:])
    return r.stderr if lay_log else r.stdout


def thoi_luong(f):
    out = chay(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f])
    return float(out.strip())


def co_am_thanh(f):
    out = chay(["ffprobe", "-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0", f])
    return bool(out.strip())


def thu_muc_ra(ten):
    d = GOC / "output" / ten
    d.mkdir(parents=True, exist_ok=True)
    return d


# ---------- BƯỚC 1 ----------
def chuan_hoa_va_ghep(clips, ra, c):
    """Đưa từng clip về 9:16 (crop giữa nếu quay ngang), cùng fps, cùng audio, rồi ghép."""
    W, H, fps = c["rong"], c["cao"], c["fps"]
    tam = ra / "tam"; tam.mkdir(exist_ok=True)
    ds = []
    for i, f in enumerate(clips):
        o = tam / f"{i:03d}.mp4"
        vf = f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={fps},setsar=1"
        cmd = ["ffmpeg", "-y", "-v", "error", "-i", f]
        if not co_am_thanh(f):  # clip không tiếng -> thêm tiếng câm để ghép không lỗi
            cmd += ["-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo", "-shortest"]
        cmd += ["-vf", vf, "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
                "-c:a", "aac", "-ar", "48000", "-ac", "2", o]
        chay(cmd); ds.append(o)
    lst = tam / "ds.txt"
    lst.write_text("".join(f"file '{p.as_posix()}'\n" for p in ds))
    ghep = ra / "ghep.mp4"
    chay(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst,
          "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-c:a", "aac", "-ar", "48000", ghep])
    return ghep


def doan_giu_lai(f, c):
    """Dò khoảng lặng bằng silencedetect -> trả về danh sách (bắt đầu, kết thúc) cần GIỮ."""
    log = chay(["ffmpeg", "-i", f, "-af",
                f"silencedetect=noise={c['nguong_lang_db']}dB:d={c['lang_toi_thieu']}",
                "-f", "null", "-"], lay_log=True)
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
    tong = thoi_luong(f)
    if len(ends) < len(starts):
        ends.append(tong)
    giu, dau = [], 0.0
    for s, e in zip(starts, ends):
        a, b = dau, s + c["chua_lai"]
        if b - a > 0.25:
            giu.append((max(0, a), min(tong, b)))
        dau = max(e - c["chua_lai"], 0)
    if tong - dau > 0.25:
        giu.append((dau, tong))
    return giu or [(0, tong)]


def cat_lang(f, ra, c):
    giu = doan_giu_lai(f, c)
    tong = thoi_luong(f)
    con = sum(b - a for a, b in giu)
    print(f"  cắt khoảng lặng: {tong:.1f}s -> {con:.1f}s ({len(giu)} đoạn)")
    n = len(giu)
    parts = [f"[0:v]split={n}" + "".join(f"[sv{i}]" for i in range(n)) + ";",
             f"[0:a]asplit={n}" + "".join(f"[sa{i}]" for i in range(n)) + ";"]
    for i, (a, b) in enumerate(giu):
        parts.append(f"[sv{i}]trim={a:.3f}:{b:.3f},setpts=PTS-STARTPTS[v{i}];"
                     f"[sa{i}]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS[a{i}];")
    nhan = "".join(f"[v{i}][a{i}]" for i in range(len(giu)))
    fc = "".join(parts) + f"{nhan}concat=n={len(giu)}:v=1:a=1[v][a]"
    fcf = ra / "tam" / "cat.txt"; fcf.write_text(fc)
    o = ra / "da-cat.mp4"
    chay(["ffmpeg", "-y", "-v", "error", "-i", f, "-filter_complex_script", fcf,
          "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
          "-c:a", "aac", "-ar", "48000", o])
    return o


def gio_srt(t):
    h, m = int(t // 3600), int(t % 3600 // 60)
    s = t % 60
    return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s % 1) * 1000)):03d}"


def tao_phu_de(f, ra, c):
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print("  (bỏ qua phụ đề: chưa cài faster-whisper -> pip install faster-whisper)")
        return None
    print(f"  nhận giọng nói (model {c['whisper_model']})...")
    model = WhisperModel(c["whisper_model"], device="auto", compute_type="int8")
    segs, _ = model.transcribe(str(f), language="vi", word_timestamps=True, vad_filter=True)
    # Chia câu ngắn tối đa ~6 chữ/dòng -> dễ đọc trên điện thoại
    dong, tat_ca = [], []
    for seg in segs:
        for w in seg.words or []:
            dong.append(w)
            if len(dong) >= 6 or w.word.strip().endswith((".", ",", "?", "!")):
                tat_ca.append(dong); dong = []
    if dong:
        tat_ca.append(dong)
    out = []
    for i, d in enumerate(tat_ca, 1):
        chu = "".join(w.word for w in d).strip()
        out.append(f"{i}\n{gio_srt(d[0].start)} --> {gio_srt(d[-1].end)}\n{chu}\n")
    srt = ra / "phu-de.srt"
    srt.write_text("\n".join(out), encoding="utf-8")
    return srt


def chuan_bi(args, c):
    src = Path(args.thu_muc)
    clips = sorted(p for p in src.iterdir() if p.suffix.lower() in DUOI_VIDEO)
    if not clips:
        sys.exit(f"!! Không thấy clip video trong {src}")
    ra = thu_muc_ra(args.ten)
    print(f"[1/3] ghép {len(clips)} clip -> 9:16")
    ghep = chuan_hoa_va_ghep(clips, ra, c)
    print("[2/3] cắt khoảng lặng")
    da_cat = cat_lang(ghep, ra, c) if not args.khong_cat else ghep
    print("[3/3] phụ đề")
    srt = tao_phu_de(da_cat, ra, c)
    print(f"\nXONG BƯỚC 1 -> {ra}")
    if srt:
        print(f"  Kiểm tra/sửa chính tả phụ đề: {srt}")
    print(f"  Rồi chạy: python3 video/auto_edit.py xuat --ten {args.ten}")


# ---------- BƯỚC 2 ----------
def esc_duong_dan(p):
    return str(p).replace("\\", "/").replace(":", r"\:").replace("'", r"\'")


def xuat(args, c):
    ra = thu_muc_ra(args.ten)
    vao = ra / "da-cat.mp4"
    if not vao.exists():
        vao = ra / "ghep.mp4"
    if not vao.exists():
        sys.exit("!! Chưa chạy bước chuan-bi cho video này")
    dur = thoi_luong(vao)

    vf = []
    srt = ra / "phu-de.srt"
    if srt.exists() and not args.khong_phu_de:
        style = (f"FontName={c['font']},FontSize={c['co_chu_phu_de']},Bold=1,PrimaryColour=&H00FFFFFF,"
                 "OutlineColour=&H00000000,BorderStyle=1,Outline=2,Shadow=0,Alignment=2,MarginV=70")
        vf.append(f"subtitles='{esc_duong_dan(srt)}':force_style='{style}'")
    if args.tieu_de:
        font_file = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        ff = f"fontfile='{esc_duong_dan(font_file)}':" if os.path.exists(font_file) else ""
        tf = ra / "tam" / "tieu-de.txt"
        tf.parent.mkdir(exist_ok=True)
        tf.write_text(args.tieu_de, encoding="utf-8")  # đọc từ file -> không lo ký tự đặc biệt : ' %
        vf.append(f"drawtext={ff}textfile='{esc_duong_dan(tf)}':expansion=none:fontsize=60:fontcolor=white:"
                  "box=1:boxcolor=black@0.55:boxborderw=24:x=(w-text_w)/2:y=h*0.16:enable='lt(t,3)'")
    vchain = ",".join(vf) if vf else "null"

    nhac = Path(args.nhac) if args.nhac else None
    if not nhac:
        kho = sorted((GOC / "video" / "nhac").glob("*.mp3"))
        nhac = random.choice(kho) if kho else None

    cmd = ["ffmpeg", "-y", "-v", "error", "-i", vao]
    lufs = f"loudnorm=I={c['lufs']}:TP=-1.5:LRA=11"
    if nhac and nhac.exists():
        print(f"  nhạc nền: {nhac.name}")
        cmd += ["-stream_loop", "-1", "-i", nhac]
        fc = (f"[0:v]{vchain}[v];"
              f"[0:a]asplit=2[giong][sc];"
              f"[1:a]volume={c['am_luong_nhac']},afade=t=out:st={max(dur-2,0):.2f}:d=2,atrim=0:{dur:.2f}[nhac];"
              f"[nhac][sc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[nhacduck];"
              f"[giong][nhacduck]amix=inputs=2:duration=first:normalize=0,{lufs}[a]")
    else:
        print("  (không có nhạc: bỏ file .mp3 vào video/nhac/ hoặc dùng --nhac)")
        fc = f"[0:v]{vchain}[v];[0:a]{lufs}[a]"
    final = ra / "final.mp4"
    cmd += ["-filter_complex", fc, "-map", "[v]", "-map", "[a]", "-t", f"{dur:.2f}",
            "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-movflags", "+faststart", final]
    chay(cmd)
    chay(["ffmpeg", "-y", "-v", "error", "-ss", "1", "-i", final, "-frames:v", "1", ra / "thumbnail.jpg"])
    print(f"\nXONG -> {final}  ({dur:.1f}s)")


def main():
    p = argparse.ArgumentParser(description="Tự dựng video dọc 9:16")
    sub = p.add_subparsers(dest="buoc", required=True)
    a = sub.add_parser("chuan-bi", help="ghép + cắt lặng + phụ đề")
    a.add_argument("thu_muc"); a.add_argument("--ten", required=True)
    a.add_argument("--khong-cat", action="store_true", help="không cắt khoảng lặng")
    b = sub.add_parser("xuat", help="phụ đề + tiêu đề + nhạc -> final.mp4")
    b.add_argument("--ten", required=True); b.add_argument("--nhac")
    b.add_argument("--tieu-de", help="chữ hook hiện 3 giây đầu")
    b.add_argument("--khong-phu-de", action="store_true")
    args = p.parse_args()
    c = cau_hinh()
    (chuan_bi if args.buoc == "chuan-bi" else xuat)(args, c)


if __name__ == "__main__":
    main()
