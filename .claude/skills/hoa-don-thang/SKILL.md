---
name: hoa-don-thang
description: Lưu ảnh hóa đơn anh gửi hàng ngày và cuối tháng gộp thành 1 file PDF. Dùng khi người dùng gửi/chụp ảnh hóa đơn, biên lai, bill, receipt, hoặc nói "lưu hóa đơn", "tổng hợp hóa đơn", "xuất PDF hóa đơn tháng", "file hóa đơn cuối tháng".
---

# Hóa đơn tháng → PDF

Công cụ: `scripts/hoa_don_pdf.py` (cần `pip install pillow pillow-heif`).
Dữ liệu nằm trong `hoa-don/YYYY-MM/` (ảnh `YYYY-MM-DD_NN.jpg` + `danh-sach.json`).
Container bị xóa sau mỗi phiên, nên **mọi thay đổi trong `hoa-don/` phải commit và push** thì hôm sau mới còn.

## 1. Hàng ngày: anh gửi ảnh hóa đơn

1. Tìm file ảnh trên đĩa:
   - Ảnh anh đính kèm trong chat (tìm file ảnh mới trong thư mục làm việc / thư mục upload).
   - Ảnh anh đã tải lên `hoa-don/inbox/` qua GitHub (chạy `git pull` trước).
   - Nếu ảnh chỉ hiện trong chat mà không có file trên đĩa: nhờ anh tải ảnh lên thư mục
     `hoa-don/inbox/` của repo (GitHub app/web → Add file → Upload files), đừng tự vẽ lại ảnh.
2. Nhìn ảnh để đoán ghi chú ngắn (vd "Tiền điện EVN – 1.250.000đ") và ngày trên hóa đơn.
   Nếu anh không nói ngày thì dùng ngày hôm nay (giờ Việt Nam).
3. Lưu:
   ```bash
   python3 scripts/hoa_don_pdf.py add <ảnh...> --date YYYY-MM-DD --note "<ghi chú>"
   # ảnh từ inbox thì thêm --move để dọn inbox
   ```
   Nhiều hóa đơn khác nhau → gọi `add` riêng cho từng cái để ghi chú đúng.
4. Commit + push (`hoa-don: thêm hóa đơn <ngày>`), báo anh: đã lưu mấy ảnh, tháng này tổng bao nhiêu.

## 2. Cuối tháng: xuất file PDF

```bash
python3 scripts/hoa_don_pdf.py list  --month YYYY-MM   # kiểm tra trước
python3 scripts/hoa_don_pdf.py build --month YYYY-MM   # hoặc --month prev
```
- Kết quả: `hoa-don/YYYY-MM/HoaDon_YYYY-MM.pdf` — trang đầu là bảng tổng hợp (STT, ngày, ghi chú),
  sau đó mỗi hóa đơn 1 trang A4, tự xoay ảnh đúng chiều.
- Commit + push file PDF, rồi gửi file cho anh (SendUserFile) kèm số lượng hóa đơn.
- Đầu tháng mà anh nói "tháng trước" → dùng `--month prev`.

## Tự động bằng GitHub Actions (`.github/workflows/hoa-don.yml`)
- Tải ảnh vào `hoa-don/inbox/` → workflow tự lưu vào đúng tháng.
- 08:00 ngày 1 hàng tháng → tự gộp PDF tháng trước (tải ở tab Actions → Artifacts, hoặc trong repo).
- Chạy tay: Actions → hoa-don → Run workflow, nhập tháng.
