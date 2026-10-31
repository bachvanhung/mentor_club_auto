# HƯỚNG DẪN CÀI ĐẶT — Từ con số 0 (cũng là kịch bản Module 2)

## Bước 1. Cài công cụ nền
| Công cụ | Để làm gì | Tải |
|---|---|---|
| Claude (gói Pro/Max) | Bộ não AI | claude.ai |
| Claude Code | AI làm việc trực tiếp trên máy, đọc/ghi file, chạy lệnh | `npm install -g @anthropic-ai/claude-code` hoặc bản desktop app |
| Node.js 20+ | Chạy script đăng bài, trả lời | nodejs.org |
| Python 3.10+ | Chạy script dựng video | python.org |
| FFmpeg | Động cơ dựng video | Mac: `brew install ffmpeg` · Windows: `winget install ffmpeg` |
| Git / GitHub Desktop | Tải và cập nhật hệ thống | desktop.github.com |
| Obsidian | Bộ não thứ 2 | obsidian.md |

Kiểm tra: mở Terminal, gõ `claude`, `node -v`, `python3 --version`, `ffmpeg -version`.

## Bước 2. Tải hệ thống về máy
```bash
git clone <link repo của bạn> mentor_club_auto
cd mentor_club_auto
npm install
pip install -r video/requirements.txt     # phụ đề tiếng Việt (faster-whisper)
claude                                     # mở Claude Code trong thư mục hệ thống
```
Lần đầu chạy, faster-whisper tự tải model nhận giọng nói (khoảng 500MB với model `small`).

## Bước 3. Cá nhân hóa (quan trọng nhất)
1. Sửa `tri-thuc/san-pham.md`: sản phẩm, giá, FAQ, giọng văn.
2. Sửa `obsidian-vault/30-Khach-hang/Chan-dung-khach-hang.md`.
3. Đọc `CLAUDE.md` và đổi phần "Nguyên tắc" cho hợp doanh nghiệp của bạn.
4. Bỏ vài file nhạc không bản quyền vào `video/nhac/`.

### CLAUDE.md viết thế nào cho hay
Hãy viết như **bản mô tả công việc cho nhân viên mới**:
- **Vai trò:** "Bạn là trợ lý marketing của spa ABC ở Đà Nẵng…"
- **Giọng văn:** xưng hô, độ dài, những từ cấm dùng.
- **Quy tắc cứng:** không bịa giá, chưa duyệt thì không đăng, khiếu nại thì chuyển cho người.
- **Bản đồ thư mục:** cái gì nằm ở đâu.
- **Quy trình chuẩn:** các bước một ngày làm việc.
- **Lệnh hay dùng.**

Giữ file ngắn gọn (dưới khoảng 200 dòng). Chi tiết thì để ở file khác và chỉ đường tới đó. Mỗi lần AI làm sai một việc lặp lại, thêm **một dòng** quy tắc vào CLAUDE.md.

## Bước 4. Obsidian
1. Mở Obsidian, chọn **Open folder as vault**, trỏ vào `mentor_club_auto/obsidian-vault`.
2. Settings → Core plugins → bật **Templates**, Template folder location = `Templates`.
3. Trên điện thoại: cài Obsidian và đồng bộ (Obsidian Sync, iCloud, hoặc Syncthing) để ghi ý tưởng vào `00-Inbox` mọi lúc.
4. Vì Claude Code đọc chính thư mục này, mọi thứ bạn ghi vào đều thành trí nhớ của AI.

## Bước 5. Dựng video đầu tiên
Trong Claude Code, gõ:
```
/dung-video /Volumes/SDCARD/DCIM/100MEDIA video-me-nau-an
```
(Windows: `D:\DCIM\100MEDIA`). Claude sẽ ghép clip, cắt khoảng lặng, làm phụ đề, tự sửa chính tả phụ đề, đề xuất hook, chèn nhạc, rồi xuất `output/video-me-nau-an/final.mp4`.

## Bước 6. Kết nối đăng tự động (Facebook qua Lark)
Xem `README.md` phần "Cài nhanh": fork repo, cài Secrets/Variables, tạo bảng Lark, chạy `fetch-pages`.

## Bước 7. Bật AI trả lời bình luận và tin nhắn
1. Lấy API key tại console.anthropic.com. Đây là khoản tính phí riêng, khác gói Claude Pro.
2. GitHub repo → Settings → Secrets → thêm `ANTHROPIC_API_KEY`, `FB_PAGE_TOKEN` (token Page có quyền `pages_read_engagement`, `pages_manage_engagement`, `pages_messaging`).
3. Variables: `REEL_FB_PAGE_ID` = ID Page.
4. Tab Actions → `tra-loi-tu-dong` → **Run workflow**, ô mode điền `--dry-run` để xem AI sẽ trả lời gì mà chưa gửi.
5. Ổn thì để workflow tự chạy 15 phút/lần.

## Cách ra lệnh cho AI (công thức B-M-T-V)
```
[Bối cảnh]  Tôi bán khóa học AI cho chủ spa. Khách 30-45 tuổi, bận, sợ công nghệ.
[Mục tiêu]  Viết 5 hook video 3 giây để họ dừng lướt.
[Tiêu chuẩn] ≤ 12 chữ, đánh vào nỗi đau mất thời gian, không hứa thu nhập, văn nói.
[Ví dụ]     "Chủ spa mà tối nào cũng ngồi edit video?"
Nếu thiếu thông tin, hỏi tôi trước khi viết.
```
Mẹo:
- Yêu cầu nhiều phương án rồi chọn, thay vì đòi một câu hoàn hảo.
- Góp ý cụ thể: "câu 2 dài quá, câu 4 đổi giọng vui hơn".
- Việc lặp lại từ 3 lần trở lên thì biến thành lệnh tắt trong `.claude/commands/`.
