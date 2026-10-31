# MODULE 2 — CÀI "BỘ NÃO": CLAUDE CODE + OBSIDIAN + CLAUDE.md
Trước: [[M1-Tu-duy-AI]] · Tiếp: [[M3-San-xuat-noi-dung]]
Tài liệu gốc: `docs/04-HUONG-DAN-CAI-DAT.md`

---

## Bài 2.1 — Cài Claude Code (Windows & Mac) (12–15 phút) ☐
**Quay trên máy sạch.** Quay cả Windows và Mac, hoặc tách thành 2 video.
**Các bước trên màn hình:**
1. Đăng ký Claude (gói Pro/Max), giải thích nên chọn gói nào.
2. Cài Node.js, Python, FFmpeg, Git (theo bảng trong docs/04).
3. Cài Claude Code, gõ `claude`, đăng nhập.
4. Lệnh đầu tiên: "Giới thiệu bạn có thể làm gì trên máy tôi".
5. Giải thích Claude hỏi quyền trước khi sửa file hay chạy lệnh, và vì sao cần đọc kỹ trước khi bấm đồng ý.
**Lỗi hay gặp:** "command not found" (chưa thêm PATH), Windows chặn script, Mac thiếu Xcode tools.
**Bài tập:** chụp màn hình Claude Code chạy được, gửi vào nhóm.

## Bài 2.2 — Tải hệ thống về máy (không cần biết code) (8 phút) ☐
1. GitHub Desktop: fork repo mẫu, rồi clone về máy.
2. Mở thư mục, giới thiệu bản đồ thư mục (bảng trong CLAUDE.md).
3. `npm install` và `pip install -r video/requirements.txt`. Có thể nhờ Claude chạy: "Cài giúp tôi các thứ cần thiết của dự án này".
**Mẹo:** gặp lỗi gì thì dán nguyên lỗi cho Claude, nhờ nó sửa.

## Bài 2.3 — CLAUDE.md: bản mô tả công việc cho AI (12 phút) ☐
**Mở:** "Đây là file quan trọng nhất của cả hệ thống."
**Nội dung:**
- CLAUDE.md là gì: Claude tự đọc file này mỗi khi mở dự án, giống bản mô tả công việc kèm sổ tay nhân viên.
- Đi qua từng phần của file mẫu: vai trò, nguyên tắc, bản đồ thư mục, lệnh tắt, quy trình một ngày.
- Màn hình: sửa CLAUDE.md cho một spa mẫu (đổi vai trò, giọng văn, quy tắc cứng).
- Thử: hỏi Claude "Hôm nay tôi cần làm gì?" và thấy nó trả lời theo quy trình trong file.
- Nguyên tắc: viết ngắn, chi tiết thì để ở file khác. **Mỗi lần AI làm sai lặp lại thì thêm một dòng quy tắc.**
**Tài liệu kèm:** CLAUDE.md mẫu cho 5 ngành.
**Bài tập:** viết CLAUDE.md cho doanh nghiệp của mình.

## Bài 2.4 — Obsidian: bộ não thứ 2 (12 phút) ☐
1. Cài Obsidian, chọn "Open folder as vault" và trỏ vào `obsidian-vault`.
2. Đi qua cấu trúc 00 → 70, giải thích mỗi thư mục chứa gì.
3. Bật plugin Templates, tạo một kịch bản từ mẫu.
4. Liên kết `[[...]]` và Graph view: các ý tưởng nối với nhau.
5. **Điểm mấu chốt:** Claude Code đọc chính thư mục này, nên anh chị ghi gì AI cũng nhớ.
6. Đồng bộ với điện thoại để ghi ý tưởng vào `00-Inbox` mọi lúc.
**Bài tập:** ghi 10 ý tưởng thô vào Inbox.

## Bài 2.5 — Dạy AI hiểu doanh nghiệp: `tri-thuc/` (10 phút) ☐
1. Mở `tri-thuc/san-pham.md`, điền sản phẩm, giá, FAQ, giọng văn, bước tiếp theo muốn dẫn khách.
2. Mẹo: nhờ Claude phỏng vấn mình: "Hỏi tôi từng câu để điền file san-pham.md".
3. Điền `30-Khach-hang/Chan-dung-khach-hang.md` theo cách tương tự.
4. Kiểm tra: hỏi Claude "Khách hỏi giá thì trả lời sao?" và thấy nó trả lời đúng theo file.

## Bài 2.6 — Lệnh tắt: một câu lệnh làm cả quy trình (10 phút) ☐
1. Giới thiệu 5 lệnh `/y-tuong`, `/kich-ban`, `/dung-video`, `/viet-bai`, `/len-lich`.
2. Mở `.claude/commands/kich-ban.md`: lệnh tắt chỉ là một file chữ hướng dẫn công việc.
3. **Tự tạo lệnh mới** trước màn hình, ví dụ `/tra-loi-review` để viết phản hồi đánh giá Google.
**Bài tập:** tạo một lệnh tắt cho việc anh chị lặp lại nhiều nhất.
