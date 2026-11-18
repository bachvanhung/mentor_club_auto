# Lịch đăng 16 clip + 7 ngày tuần lạnh (Mế Nguyệt Nem Chua)

**Đợt 1: 16 clip, mỗi ngày 2 clip lúc 10:30 và 20:00, từ 19/11 đến 26/11/2026.**
**Đợt 2: thư mục "7 ngày tuần lạnh", mỗi ngày 1 video lúc 19:00, từ 27/11 đến 03/12/2026.**

Bài viết đầy đủ (tiêu đề, nội dung, hashtag, bình luận đầu) nằm trong `lich-dang-16-clip.csv`. Cuối mỗi bài đều có dòng bắt buộc: *Nem chua Mế Nguyệt – Hợp tác xã Thực phẩm Chiển Hướng – Địa chỉ: Suối Sỏi, xã Cao Dương, tỉnh Phú Thọ*.

## Đợt 1: 16 clip

| # | Ngày giờ | File | Tiêu đề (dòng đầu caption) |
|---|---|---|---|
| 1 | 19/11 10:30 | `00-ngay-1-ban-khong-c…uoi.mp4` | Nem chua Mế làm tay – mẻ mới |
| 2 | 19/11 20:00 | `00-ngay-1-thit-chua-ng…on.mp4` | Thịt chua kiểu quê Mường của Mế |
| 3 | 20/11 10:30 | `clip-01-chao-ca-nha-lam…ep.mp4` | Nem chua Mế Nguyệt – Mế chào cả nhà |
| 4 | 20/11 20:00 | `clip-02-ben-chau-thit.mp4` | Nem chua – Mế ngồi bên chậu thịt tươi |
| 5 | 21/11 10:30 | `clip-03-thai-mieng-t…dep.mp4` | Nem chua – Mế thái miếng thịt cho đẹp |
| 6 | 21/11 20:00 | `clip-04-can-muoi-gia-vi.mp4` | Nem chua – Mế cân muối, cân gia vị |
| 7 | 22/11 10:30 | `clip-05-nem-thu-thit.mp4` | Nem chua – Mế nêm thịt cho vừa |
| 8 | 22/11 20:00 | `clip-06-tron-toi-ot.mp4` | Nem chua – Mế trộn tỏi ớt |
| 9 | 23/11 10:30 | `clip-07-them-bot-ot.mp4` | Nem chua – Mế thêm bột ớt |
| 10 | 23/11 20:00 | `clip-08-noi-chuyen-…ha.mp4` | Nem chua Mế Nguyệt – Mế nói chuyện với cả nhà |
| 11 | 24/11 10:30 | `clip-09-loc-gan-lam-thit…hua.mp4` | Thịt chua – Mế lọc gân từng miếng thịt |
| 12 | 24/11 20:00 | `clip-10-vua-loc-thit-vua…yen.mp4` | Nem chua – Mế vừa lọc thịt vừa trò chuyện |
| 13 | 25/11 10:30 | `clip-11-thit-tuoi-thi-thit…gon.mp4` | Nem chua – thịt tươi thì làm mới ngon |
| 14 | 25/11 20:00 | `clip-12-loc-mo.mp4` | Nem chua – Mế lọc mỡ cho kỹ |
| 15 | 26/11 10:30 | `clip-13-chuyen-gia-banh-thit.mp4` | Nem chua – Mế kể chuyện miếng thịt |
| 16 | 26/11 20:00 | `clip-14-ten-suoi-soi.mp4` | Nem chua Mế Nguyệt – làm ở Suối Sỏi |

## Đợt 2: 7 ngày tuần lạnh, 19:00 mỗi ngày

| Ngày | 27/11 | 28/11 | 29/11 | 30/11 | 01/12 | 02/12 | 03/12 |
|---|---|---|---|---|---|---|---|
| Giờ | 19:00 | 19:00 | 19:00 | 19:00 | 19:00 | 19:00 | 19:00 |

Gửi tên các video trong thư mục "7 ngày tuần lạnh" (chụp màn hình như lần trước) để viết bài cho đợt này.

## Cách đăng

**Cách A: Meta Business Suite, không cần token, khoảng 2 phút mỗi clip.**
1. business.facebook.com → chọn Trang Mế Nguyệt → **Tạo thước phim** (Reel).
2. Tải clip theo đúng thứ tự trong bảng.
3. Dán cột **Nội dung**, xuống dòng, rồi dán cột **Hastag** (lấy trong file CSV).
4. Bấm **Lên lịch**, chọn đúng ngày giờ trong bảng.
5. Khi Reel đã lên, dán cột **Comment ebook** làm bình luận đầu. Facebook không cho hẹn giờ bình luận.

**Cách B: tự động bằng hệ thống trong repo** (`dang-reel-lich`). Hiện chưa chạy được, vì còn thiếu:
- Secret `FB_PAGE_TOKEN` (token của Trang Mế Nguyệt).
- Biến `REEL_TABLE_ID` và `REEL_FB_PAGE_ID`.
- Bảng Lark có gắn sẵn clip.
Có đủ những thứ trên thì import `lich-dang-16-clip.csv` vào Lark, gắn clip, chuyển cột TT Reel sang **Chờ đăng**. Hệ thống sẽ tự hẹn giờ trên Facebook và tự bình luận.

## Cần kiểm tra trước khi đăng

- Tên file trong ảnh chụp bị cắt, nên một số bài viết theo nội dung đoán từ tên file. Đọc cột **Cần kiểm tra** trong CSV, xem clip rồi sửa cho khớp.
- **clip-05 (nêm/nếm thử thịt):** nếu có cảnh nếm thịt sống thì cắt đoạn đó, và không dùng clip này chạy quảng cáo.
- Các Reel mới đăng **không tự vào chiến dịch quảng cáo đang chạy**. Muốn quảng cáo thì phải thêm vào chiến dịch.
