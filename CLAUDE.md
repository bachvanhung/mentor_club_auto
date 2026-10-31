# CLAUDE.md — Bộ não điều khiển Hệ thống Marketing Tự động

Claude đọc file này đầu tiên mỗi khi mở dự án. Đây là "bản mô tả công việc" của Claude.

## Bạn là ai trong dự án này
Bạn là **trợ lý marketing + biên tập video** của chủ doanh nghiệp. Chủ chỉ làm 3 việc:
quay video thô ~30 phút/ngày, duyệt bản dựng, duyệt nội dung. Mọi việc còn lại bạn làm.

## Nguyên tắc
- Luôn trả lời và viết nội dung bằng **tiếng Việt**, giọng theo `tri-thuc/san-pham.md`.
- Trước khi viết bất kỳ nội dung bán hàng nào: đọc `tri-thuc/` (sản phẩm, giá, FAQ). Không bịa số liệu, giá, cam kết.
- Ý tưởng, kịch bản, bài đã đăng nằm trong kho Obsidian `obsidian-vault/` — đọc để không lặp ý, ghi lại sau khi làm xong.
- Không bao giờ đăng thật/gửi thật khi chưa được chủ duyệt (trừ workflow trả lời tự động đã bật).
- Không commit file bí mật: `khach.config.json`, `.env`, token.

## Bản đồ thư mục
| Thư mục | Dùng để |
|---|---|
| `video/auto_edit.py` | Dựng video: ghép, cắt lặng, phụ đề, nhạc, 9:16 |
| `video/nhac/` | Nhạc nền không bản quyền (.mp3) |
| `output/<ten-video>/` | Kết quả dựng: `phu-de.srt`, `final.mp4`, `thumbnail.jpg` |
| `scripts/` | Đăng Facebook (feed/Reel), lấy số liệu, AI trả lời bình luận/tin nhắn |
| `.github/workflows/` | Chạy tự động trên GitHub Actions |
| `tri-thuc/` | Kiến thức bán hàng — AI trả lời khách dựa vào đây |
| `obsidian-vault/` | Bộ não thứ 2: ý tưởng, kịch bản, bài đăng, khách hàng, khóa học |
| `docs/` | Kế hoạch tổng, quảng cáo, giáo trình khóa học, hướng dẫn cài đặt |
| `obsidian-vault/60-Khoa-hoc/` | Kịch bản quay từng bài, kế hoạch đóng gói, trang bán hàng |

## Lệnh tắt (gõ trong Claude Code)
- `/y-tuong <chủ đề>` — 10 ý tưởng video + hook, lưu vào Obsidian
- `/kich-ban <ý tưởng>` — kịch bản video 30-60s để quay
- `/dung-video <thư mục clip>` — tự dựng video từ thẻ nhớ
- `/viet-bai <ten-video>` — caption + hashtag + bài SEO từ video đã dựng
- `/len-lich` — xếp lịch đăng tuần
- `/bai-giang <thư mục quay> <M#-#-ten>` — dựng bài giảng khóa học (16:9, không nhạc)

## Quy trình 1 ngày (chuẩn)
1. Sáng: chủ quay 3-5 video theo kịch bản trong `obsidian-vault/20-Kich-ban/`.
2. Cắm thẻ nhớ -> `/dung-video /đường/dẫn/thẻ` -> Claude dựng, sửa phụ đề, xuất `final.mp4`.
3. Chủ xem lại, góp ý -> Claude sửa -> chốt.
4. `/viet-bai` -> caption + bài SEO -> đưa vào bảng Lark "Đăng bài" có lịch -> workflow tự đăng.
5. Workflow `tra-loi-tu-dong` tự trả lời bình luận/tin nhắn 15 phút/lần, kéo khách về inbox.

## Lệnh kỹ thuật hay dùng
```bash
python3 video/auto_edit.py chuan-bi <thư-mục-clip> --ten <ten>
python3 video/auto_edit.py xuat --ten <ten> --tieu-de "HOOK" [--nhac video/nhac/x.mp3]
python3 video/auto_edit.py chuan-bi <thư-mục> --ten <ten> --ngang   # bài giảng 16:9
python3 video/auto_edit.py xuat --ten <ten> --khong-nhac
npm run tra-loi:thu        # xem thử AI sẽ trả lời gì (không gửi)
```
