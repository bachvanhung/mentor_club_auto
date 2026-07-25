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
| dang-youtube | Đăng video lên YouTube (bảng riêng) | LARK_APP_SECRET + YT_CLIENT_ID/SECRET/REFRESH_TOKEN |

## Đăng YouTube (dang-youtube)
Đăng video từ Lark Base thẳng lên kênh YouTube của bạn (dùng YouTube Data API v3).

1. **Google Cloud**: tạo project → bật **YouTube Data API v3** → tạo **OAuth client** (Desktop hoặc Web).
   Lấy `refresh_token` với scope `https://www.googleapis.com/auth/youtube.upload`
   (dùng OAuth Playground hoặc script lấy token 1 lần).
2. **Settings → Secrets and variables → Actions**:
   - _Secrets_: `YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN` (thêm cạnh `LARK_APP_SECRET`).
   - _Variables_: `TABLE_YOUTUBE` (table id bảng đăng YouTube); tùy chọn `YT_BASE_ID`, `YT_PRIVACY` (public/unlisted/private), `YT_CATEGORY_ID` (mặc định 22).
3. Trong Lark: tạo bảng "Đăng YouTube" với các cột: `TT YouTube` (trạng thái, giá trị `Chờ đăng` để đăng),
   `Tiêu đề`, `Video` (đính kèm file mp4), `Nội dung`, `Tags` (ngăn cách bằng dấu phẩy), `Link YouTube` (URL), `Log`, `Lịch đăng` (tùy chọn).
   > Đổi tên cột được: ghi đè bằng env `COL_TITLE`, `COL_MEDIA`, `COL_CAPTION`, `COL_TAGS`, `COL_LINK`, `COL_LOG`, `COL_TRIGGER`, `COL_SCHEDULE`.
4. Tạo Automation trong Lark: nút **Đăng** → gửi HTTP `POST` tới `.../dispatches` với body
   `{"event_type":"dang-youtube","client_payload":{"record_id":"{{Record ID}}"}}`.
