# Mế Nguyệt Nem Chua: lịch đăng Reel tự động

- **3 Reel/ngày:** 06:00, 10:30, 20:00 (giờ Việt Nam), do workflow `dang-reel-lich` thực hiện.
- Mỗi khung giờ chỉ đăng **1** video: dòng có `Lịch đăng` sớm nhất mà đã đến giờ, nếu không có thì lấy dòng `Chờ đăng` tiếp theo theo thứ tự trong bảng.
- `lich-dang-reel.csv`: 29 bài mô tả chuẩn SEO kèm hashtag, xếp lịch từ 01/11/2026 06:00 đến 10/11/2026 10:30.
  Con số 29 = 29 clip không nhạc, bỏ 4 bản không nhạc đã có bản có nhạc, rồi cộng 4 bản có nhạc.
- Cấu trúc mỗi bài để lên top tìm kiếm Facebook:
  - Dòng đầu là tiêu đề chứa từ khóa chính: nem chua, nem chua ngon, mua nem chua ở đâu, quà biếu đặc sản…
  - Tiếp theo là đoạn mô tả nhắc lại từ khóa một cách tự nhiên, rồi 3 điểm nổi bật ✅.
  - Cuối bài là lời kêu gọi đặt hàng và 5 hashtag (Facebook khuyên dùng ít hashtag nhưng đúng chủ đề).
- Video có nhạc: chỉ đăng bản có nhạc, bản không nhạc cùng nội dung phải xóa khỏi thư mục/bảng.

## Cách dùng
1. Import `lich-dang-35-reel.csv` vào bảng Đăng Reel trên Lark. Các cột cần có: `Lịch đăng`, `Nội dung`, `Hastag`, `TT Reel`, `Ảnh/video`.
2. Gắn 1 clip vào cột `Ảnh/video` của mỗi dòng.
3. Chuyển `TT Reel` sang **Chờ đăng** (chỉ làm với dòng đã gắn clip).
4. Trên GitHub, mục Settings → Variables cần có: `LARK_APP_ID`, `REEL_BASE_ID`, `REEL_TABLE_ID`, `REEL_FB_PAGE_ID` (Page ID của Mế Nguyệt Nem Chua). Mục Secrets cần có: `LARK_APP_SECRET`, `FB_PAGE_TOKEN` (token của chính page Mế Nguyệt).

Không cần lịch cố định: xóa trống cột `Lịch đăng`, mỗi khung giờ sẽ đăng clip tiếp theo theo thứ tự trong bảng.
