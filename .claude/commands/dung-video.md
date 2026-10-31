---
description: Tự dựng video dọc 9:16 từ clip thô (thẻ nhớ / thư mục)
argument-hint: <thư mục clip> [tên video]
---
Dựng video từ clip trong: $ARGUMENTS

Làm lần lượt:
1. Nếu chưa có tên video, đặt tên dạng `yyyy-mm-dd-chu-de-ngan` (không dấu).
2. Chạy `python3 video/auto_edit.py chuan-bi <thư mục> --ten <ten>`.
3. Đọc `output/<ten>/phu-de.srt`, SỬA chính tả tiếng Việt, tên riêng, thuật ngữ (giữ nguyên mốc thời gian). Đối chiếu kịch bản trong `obsidian-vault/20-Kich-ban/` nếu có.
4. Đề xuất 3 câu hook ≤ 8 chữ cho 3 giây đầu, chọn câu mạnh nhất.
5. Chạy `python3 video/auto_edit.py xuat --ten <ten> --tieu-de "<hook>"` (nhạc: chọn file trong `video/nhac/` hợp không khí video nếu có).
6. Báo lại: thời lượng trước/sau, đường dẫn `final.mp4` + `thumbnail.jpg`, hook đã chọn, và hỏi chủ có muốn sửa gì không.
Nếu chủ góp ý (bỏ đoạn, đổi nhạc, đổi chữ) -> sửa và xuất lại.
