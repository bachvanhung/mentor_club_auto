# MODULE 5 — CHĂM SÓC: AI TRẢ LỜI BÌNH LUẬN & TIN NHẮN
Trước: [[M4-Phan-phoi]] · Tiếp: [[M6-Quang-cao-va-pheu]]
Code: `scripts/tra-loi-tu-dong.js` · Workflow: `tra-loi-tu-dong`

---

## Bài 5.1 — Hệ thống trả lời tự động hoạt động thế nào (8 phút) ☐
- Cứ 15 phút, GitHub chạy một lần: quét bình luận mới, trả lời công khai, nhắn riêng kéo khách về inbox, rồi trả lời tin nhắn đang chờ.
- AI **chỉ** trả lời theo `tri-thuc/`. Spam thì bỏ qua. Câu chê bai thì xin lỗi và mời nhắn riêng.
- **Luật 24 giờ** của Messenger: chỉ được nhắn khi khách nhắn trong vòng 24 giờ.
- Chi phí: API Claude tính theo lượng chữ, mỗi câu trả lời rất rẻ. Theo dõi chi phí trên console.anthropic.com.

## Bài 5.2 — Cài đặt & chạy thử an toàn (10 phút) ☐
1. Lấy API key ở console.anthropic.com (khoản tính phí riêng, khác gói Pro).
2. GitHub Secrets: `ANTHROPIC_API_KEY`, `FB_PAGE_TOKEN`. Variable: `REEL_FB_PAGE_ID`.
3. Vào Actions → `tra-loi-tu-dong` → Run workflow, ô mode điền `--dry-run`, đọc log xem AI định trả lời gì.
4. Thấy ổn thì để workflow tự chạy. Muốn tạm tắt thì bấm Disable workflow.
5. Tùy chọn qua Variables: `PRIVATE_REPLY=false` (không nhắn riêng), `TRA_LOI_INBOX=false`, `SO_BAI`.

## Bài 5.3 — Huấn luyện AI trả lời ngày càng đúng (10 phút) ☐
- Mỗi tuần: đọc log, tìm câu AI trả lời chưa hay, bổ sung FAQ vào `tri-thuc/`.
- Thêm file mới vào `tri-thuc/` (ví dụ `chinh-sach.md`, `uu-dai-thang-11.md`). AI tự đọc tất cả.
- Màn hình: một câu hỏi AI trả lời sai, thêm một dòng FAQ, chạy lại thì AI trả lời đúng.

## Bài 5.4 — Kéo khách về inbox, xin SĐT & chuyển cho người thật (10 phút) ☐
- Kịch bản: bình luận → AI trả lời và nhắn riêng → hỏi nhu cầu → xin SĐT/Zalo → gửi link đăng ký.
- Khi nào **người thật** nhảy vào: khách hỏi giá đơn lớn, khiếu nại, khách sẵn sàng mua.
- Bật thông báo Meta Business Suite trên điện thoại để không bỏ lỡ khách nóng.
- Nói thật với học viên: AI giúp không bỏ sót khách, còn chốt đơn lớn vẫn là việc của người.
