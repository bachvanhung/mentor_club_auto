# Tự động đăng Facebook từ Lark Base

Fork repo này về, đặt cấu hình của BẠN, rồi đăng bài Facebook thẳng từ Lark Base.

## Cài nhanh
1. **Fork** repo này → vào tab **Actions** bật workflows.
2. **Settings → Secrets and variables → Actions**:
   - _Secrets_: `LARK_APP_SECRET`, `FB_USER_TOKEN` (bắt buộc), `FB_PAGE_TOKEN` (tùy chọn).
   - _Variables_: `LARK_APP_ID`, `LARK_BASE_ID`, `TABLE_PAGES`, `TABLE_DANGBAI` (bắt buộc), `TABLE_POSTS` (tùy chọn).
3. Trong Lark: thêm App vào Base (**Can edit**); bảng Pages có cột `Fanpage`,`ID`,`access_token`; bảng Đăng bài có cột `Page` (Link) và `Đăng` (Nút bấm).
4. Chạy workflow **fetch-pages** 1 lần để nạp danh sách Page.
5. Tạo Automation trong Lark: nút **Đăng** → gửi HTTP `POST` tới `.../dispatches` với body `{"event_type":"dang-bai","client_payload":{"record_id":"{{Record ID}}"}}`.

> Code không chứa sẵn base/token của ai — thiếu cấu hình sẽ báo lỗi rõ, không chạy nhầm.

## Workflow (event_type)
| event_type | Việc | Cần |
|---|---|---|
| fetch-pages | Lấy Page + token về Base | Secrets + Variables |
| fetch-posts | Lấy bài viết + tương tác | Secrets + Variables |
| dang-bai | Đăng bài (ảnh→feed / video→Reel) | LARK_APP_SECRET + Variables |
| dang-reel | Đăng Reel (bảng riêng) | + FB_PAGE_TOKEN |
| dang-reel-lich (tự chạy) | Đăng 1 Reel lúc 06:00, 10:30, 20:00 giờ VN | Variables `REEL_TABLE_ID`, `REEL_FB_PAGE_ID` |
