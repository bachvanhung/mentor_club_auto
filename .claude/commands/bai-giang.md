---
description: Dựng 1 bài giảng khóa học từ file quay màn hình (16:9, không nhạc)
argument-hint: <thư mục file quay> <M#-#-ten-bai>
---
Dựng bài giảng: $ARGUMENTS

1. Tìm kịch bản bài tương ứng trong `obsidian-vault/60-Khoa-hoc/M*.md` (theo số M#-#).
2. Chạy `python3 video/auto_edit.py chuan-bi <thư mục> --ten <M#-#-ten-bai> --ngang`.
3. Sửa `output/<ten>/phu-de.srt`: chính tả, thuật ngữ (Claude Code, CLAUDE.md, Obsidian, GitHub, Lark, token…), giữ nguyên mốc thời gian. Đối chiếu kịch bản.
4. Chạy `python3 video/auto_edit.py xuat --ten <ten> --khong-nhac`.
5. Kiểm tra bảo mật: đọc phụ đề, báo nếu bài có nhắc/hiện token, App Secret, ID base, số điện thoại khách — để chủ làm mờ trước khi đăng.
6. Đổi ☐ thành ✅ ở tiêu đề bài trong file module.
7. Đề xuất 1–2 đoạn 30–60s hay nhất (mốc thời gian + hook) để cắt làm Reels quảng cáo.
