# Mế Nguyệt Nem Chua: lịch đăng Reel tự động

- **3 Reel/ngày, đúng giờ:** 06:00, 10:30, 20:00 (giờ Việt Nam).
  - Clip được tải lên trước và **hẹn giờ ngay trên Facebook**, Facebook tự đăng đúng phút.
  - Trạng thái trên Lark: `Chờ đăng` → `Đã hẹn giờ` → `Đã đăng`.
  - Xem, sửa hoặc hủy trong Meta Business Suite → Nội dung → Đã lên lịch.
- **Bình luận đầu:** khoảng 10 phút sau khi Reel lên, page tự bình luận nội dung ở cột `Comment ebook`.
  GitHub hay chạy trễ, nên bình luận có thể lên muộn hơn.
- `lich-dang-reel.csv`: 29 bài kèm bình luận. Bài đầu đăng 20:00 ngày 02/11/2026, sau đó mỗi ngày 06:00, 10:30, 20:00, bài cuối 12/11/2026 06:00.

## Giọng viết
- Mế Nguyệt tự nói, xưng "Mế", gọi khách "cả nhà" hoặc "các con".
- Kể chuyện thường ngày trong bếp nem, không viết kiểu quảng cáo, không liệt kê ✅.
- Từ khóa "nem chua" có tự nhiên trong câu đầu.
- 3 hashtag: `#nemchua` + 1 hashtag theo chủ đề + `#menguyetnemchua`.
- Bình luận đầu cũng do Mế viết, như đang trò chuyện với khách.
- **Cần đọc lại cho đúng sự thật:** các chi tiết như đi chợ chọn thịt buổi sáng, ăn kèm lá đinh lăng hoặc lá sung, gửi hàng đi xa, nhận đơn quà Tết.

## Cách dùng
1. Import `lich-dang-reel.csv` vào bảng Đăng Reel trên Lark. Bảng cần có các cột:
   `Lịch đăng`, `Nội dung`, `Hastag`, `Comment ebook`, `TT Reel`, `Ảnh/video`, `Link Reel`, `Log đăng Reel`.
2. Gắn 1 clip vào cột `Ảnh/video` của mỗi dòng. Ưu tiên clip có nhạc cho các khung 20:00.
3. Chuyển `TT Reel` sang **Chờ đăng**.
4. GitHub → Actions → `dang-reel-lich` → **Run workflow**: tất cả dòng được hẹn giờ trên Facebook ngay. Phải chạy trước giờ đăng ít nhất 15 phút.
5. GitHub → Settings → Secrets and variables → Actions:
   - Variables: `LARK_APP_ID`, `REEL_BASE_ID`, `REEL_TABLE_ID`, `REEL_FB_PAGE_ID` (ID page Mế Nguyệt Nem Chua).
   - Secrets: `LARK_APP_SECRET`, `FB_PAGE_TOKEN` (token của page Mế Nguyệt, quyền `pages_manage_posts` + `pages_manage_engagement` để bình luận).
   - **Thiếu `REEL_TABLE_ID` hoặc `REEL_FB_PAGE_ID` thì workflow bị bỏ qua (skipped), không đăng gì.**
