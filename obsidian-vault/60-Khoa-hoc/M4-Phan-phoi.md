# MODULE 4 — PHÂN PHỐI: TỰ ĐĂNG, TỰ LÊN LỊCH, TỰ SEO
Trước: [[M3-San-xuat-noi-dung]] · Tiếp: [[M5-Cham-soc-khach]]
Tài liệu gốc: `README.md` (phần Cài nhanh)

> ⚠️ Khi quay: **che token, ID app, ID base** (làm mờ ở hậu kỳ, hoặc dùng tài khoản test rồi xóa sau khi quay).

---

## Bài 4.1 — `/viet-bai`: 1 video thành 4 nội dung (10 phút) ☐
- Chạy `/viet-bai <ten-video>`, ra 4 thứ: caption ngắn, bài Facebook dài, bài blog SEO, comment ghim.
- Giải thích SEO cơ bản: từ khóa chính, tiêu đề, meta description, FAQ.
- Kết quả lưu ở `40-Bai-dang` với trạng thái `cho-duyet`. Duyệt xong đổi thành `da-duyet`.

## Bài 4.2 — Lark Base: bảng điều khiển nội dung (12 phút) ☐
- Tạo Base với 2 bảng: **Pages** (Fanpage, ID, access_token) và **Đăng bài** (Link Page, Loại, Nội dung, Comment ebook, Ảnh/video, Lịch đăng bài, Trạng thái, Log, Link bài đăng, nút Đăng).
- Tạo App Lark, cấp quyền **Can edit** vào Base, lấy App ID và App Secret.
**Tài liệu kèm:** file mẫu Base (học viên chỉ cần copy).

## Bài 4.3 — Lấy token Facebook đúng quyền & an toàn (12 phút) ☐
- Tạo app trên developers.facebook.com, dùng Graph API Explorer.
- Chọn quyền `pages_show_list`, `pages_manage_posts`, `pages_read_engagement`, `pages_manage_engagement`, `pages_messaging`.
- Đổi sang token dài hạn.
- **Bảo mật:** token giống chìa khóa nhà, không gửi cho ai, chỉ dán vào GitHub Secrets.

## Bài 4.4 — GitHub Actions: bấm nút trong Lark để đăng (15 phút) ☐
1. Vào repo, bật tab Actions.
2. Settings → Secrets: `LARK_APP_SECRET`, `FB_USER_TOKEN`, `FB_PAGE_TOKEN`. Variables: `LARK_APP_ID`, `LARK_BASE_ID`, `TABLE_PAGES`, `TABLE_DANGBAI`, `REEL_FB_PAGE_ID`.
3. Chạy `fetch-pages` để danh sách Page tự nạp vào Lark.
4. Tạo Automation trong Lark: nút Đăng gửi HTTP POST tới GitHub (dán mẫu từ README).
5. Đăng thử 1 video và 1 ảnh, xem Log và Link bài đăng được ghi ngược về Lark.
**Lỗi hay gặp:** token hết hạn, thiếu quyền, App Lark chưa được thêm vào Base.

## Bài 4.5 — `/len-lich`: lịch đăng cả tuần trong 5 phút (8 phút) ☐
- Chạy `/len-lich` để có bảng lịch 7 ngày.
- Điền cột "Lịch đăng bài" trong Lark, workflow sẽ tự đăng đúng giờ.
- Giờ vàng gợi ý: 11h30 và 20h. Xem số liệu thật của Page để chỉnh.

## Bài 4.6 — Comment ghim tự động: biến lượt xem thành lead (6 phút) ☐
- Cột "Comment ebook": hệ thống tự comment link quà hoặc link đăng ký ngay sau khi đăng.
- Kết hợp kêu gọi trong video: "comment chữ AI để nhận tài liệu", sau đó AI trả lời tự động (M5).
