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

## Checklist SEO (Ngày 6: tối ưu video)
Mỗi dòng trong `lich-dang-reel.csv` đã có đủ 5 mục:

| Mục | Cột trong CSV | Cách làm trên Facebook |
|---|---|---|
| **Từ khóa** gốc / chính / phụ | `Từ khóa gốc`, `Từ khóa chính`, `Từ khóa phụ` | Gốc luôn là "nem chua". Từ khóa chính nằm đầu tiêu đề, từ khóa phụ để tham khảo khi đọc lời trong clip. |
| **Playlist** (chứa từ khóa) | `Playlist` | Tạo 5 danh sách phát trong Meta Business Suite → Nội dung → Danh sách phát, rồi xếp Reel vào đúng tên. Phần này làm tay vì Facebook không cho thêm qua API. |
| **Tiêu đề** chứa từ khóa | `Tiêu đề` | Cấu trúc: `[Từ khóa chính]: [điều người xem nhận được]`. Script tự đặt tiêu đề làm **dòng đầu caption**. |
| **Thẻ** video liên quan | `Playlist` + `Link Reel` | Facebook không có thẻ, nên bình luận đầu được **tự gắn link 1 Reel đã đăng cùng Playlist** ("👉 Xem thêm: …"). |
| **Màn hình kết thúc** | `Màn hình kết thúc` | Chèn chữ 3-5 giây cuối clip (CapCut) theo gợi ý trong cột: "Xem tiếp …" + "Theo dõi Mế Nguyệt Nem Chua". |

5 Playlist:
- **Nem chua nhà làm: Mế gói tay mỗi ngày**: bài 2, 11, 13, 14, 15, 20, 29
- **Cách ăn nem chua ngon: mẹo của Mế**: bài 6, 9, 21, 26
- **Nem chua đồ nhắm, ăn vặt cả nhà**: bài 1, 3, 4, 7, 10, 18, 22, 25
- **Nem chua làm quà, gửi đi xa**: bài 5, 8, 16, 17, 23, 24
- **Mua nem chua nhà Mế: chuyện bán hàng**: bài 12, 19, 27, 28

Sau khi đăng xong lượt này, quay lại sửa các Reel cũ theo đúng 5 mục trên (sửa tiêu đề, xếp vào Playlist, thêm bình luận "Xem thêm").

## Cách dùng
1. Import `lich-dang-reel.csv` vào bảng Đăng Reel trên Lark. Bảng cần có các cột:
   `Lịch đăng`, `Tiêu đề`, `Nội dung`, `Hastag`, `Comment ebook`, `Playlist`, `TT Reel`, `Ảnh/video`, `Link Reel`, `Log đăng Reel`.
   Các cột `Từ khóa gốc`, `Từ khóa chính`, `Từ khóa phụ`, `Màn hình kết thúc` chỉ để tham khảo, script không đọc.
   Bảng cũ chưa có `Tiêu đề` / `Playlist` thì vẫn đăng bình thường, chỉ thiếu tiêu đề và link "Xem thêm".
2. Gắn 1 clip vào cột `Ảnh/video` của mỗi dòng. Ưu tiên clip có nhạc cho các khung 20:00.
3. Chuyển `TT Reel` sang **Chờ đăng**.
4. GitHub → Actions → `dang-reel-lich` → **Run workflow**: tất cả dòng được hẹn giờ trên Facebook ngay. Phải chạy trước giờ đăng ít nhất 15 phút.
5. GitHub → Settings → Secrets and variables → Actions:
   - Variables: `LARK_APP_ID`, `REEL_BASE_ID`, `REEL_TABLE_ID`, `REEL_FB_PAGE_ID` (ID page Mế Nguyệt Nem Chua).
   - Secrets: `LARK_APP_SECRET`, `FB_PAGE_TOKEN` (token của page Mế Nguyệt, quyền `pages_manage_posts` + `pages_manage_engagement` để bình luận).
   - **Thiếu `REEL_TABLE_ID` hoặc `REEL_FB_PAGE_ID` thì workflow bị bỏ qua (skipped), không đăng gì.**
