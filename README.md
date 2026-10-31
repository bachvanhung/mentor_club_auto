# Hệ thống Marketing Tự động bằng AI

Quay 30 phút mỗi ngày. Claude lo phần còn lại: **dựng video → viết caption/SEO → tự đăng theo lịch → tự trả lời bình luận và tin nhắn**.

| Bắt đầu từ đây | |
|---|---|
| [docs/01-KE-HOACH-TONG.md](docs/01-KE-HOACH-TONG.md) | Sơ đồ hệ thống, lộ trình 6 tuần, mô hình bán khóa học |
| [docs/02-QUANG-CAO.md](docs/02-QUANG-CAO.md) | Chiến lược quảng cáo tới chủ doanh nghiệp nhỏ & vừa |
| [docs/03-KHOA-HOC.md](docs/03-KHOA-HOC.md) | Giáo trình: danh sách video cần quay |
| [docs/04-HUONG-DAN-CAI-DAT.md](docs/04-HUONG-DAN-CAI-DAT.md) | Cài Claude Code, Obsidian, CLAUDE.md, cách ra lệnh AI |
| [CLAUDE.md](CLAUDE.md) | Bộ não: Claude đọc file này mỗi khi mở dự án |
| `video/auto_edit.py` | Tự dựng video 9:16 (cắt lặng, phụ đề, nhạc, hook) |
| `scripts/tra-loi-tu-dong.js` | AI trả lời bình luận + inbox (workflow `tra-loi-tu-dong`) |
| `obsidian-vault/` | Bộ não thứ 2 |

---

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
| tra-loi-tu-dong | AI trả lời bình luận + tin nhắn (tự chạy 15 phút/lần) | ANTHROPIC_API_KEY, FB_PAGE_TOKEN, var REEL_FB_PAGE_ID |
