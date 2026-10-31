# KẾ HOẠCH QUAY & ĐÓNG GÓI KHÓA HỌC

Tên khóa: **"Hệ thống Marketing Tự động bằng AI cho Chủ Doanh nghiệp"**
Lời hứa: *Quay 30 phút mỗi ngày. AI dựng video, đăng bài, trả lời khách cho bạn.*
Quy mô: 8 module · 41 bài · tổng khoảng 6–7 giờ video · cùng bộ mẫu để học viên dùng ngay.

Kịch bản từng bài: [[M0-Khoi-dong]] · [[M1-Tu-duy-AI]] · [[M2-Cai-bo-nao]] · [[M3-San-xuat-noi-dung]] · [[M4-Phan-phoi]] · [[M5-Cham-soc-khach]] · [[M6-Quang-cao-va-pheu]] · [[M7-Van-hanh]]
Trang bán hàng: [[TRANG-BAN-HANG]]

---

## 1. Thiết bị quay (dưới 2 triệu là đủ)
| Thứ | Gợi ý | Ghi chú |
|---|---|---|
| Quay màn hình | **OBS Studio** (miễn phí) | 1920x1080, 30fps, định dạng mp4 |
| Mic | Mic cài áo không dây (Boya, Rode Wireless) | Âm thanh quan trọng hơn hình |
| Camera mặt | Webcam hoặc điện thoại làm webcam (Camo, DroidCam) | Đặt mặt ở góc phải dưới trong OBS |
| Ánh sáng | 1 đèn LED panel chiếu chéo 45° | Ngồi quay mặt về phía cửa sổ cũng được |
| Màn hình | Phóng to chữ Terminal và trình duyệt lên 125–150% | Học viên xem bằng điện thoại vẫn đọc được |

**Cảnh OBS cần tạo sẵn:** (1) Toàn mặt dùng cho mở/kết bài, (2) Màn hình kèm mặt góc nhỏ, (3) Chỉ màn hình.

## 2. Quy tắc quay mỗi bài
1. Mở bài gồm 3 phần: **kết quả của bài** ("Hết bài này anh chị sẽ…"), **vì sao quan trọng**, **lộ trình** của bài.
2. Thân bài: **làm thật trên màn hình**, vừa làm vừa nói, không đọc slide.
3. Kết bài: tóm tắt 3 ý, giao **bài tập**, giới thiệu bài sau.
4. Nói vấp thì dừng 2 giây rồi nói lại cả câu. Đoạn lặng sẽ được cắt tự động.
5. Mỗi bài dài **5–15 phút**. Dài hơn thì tách thành 2 bài.

## 3. Lịch quay 10 buổi (mỗi buổi khoảng 2 tiếng)
| Buổi | Quay | Chuẩn bị trước |
|---|---|---|
| 1 | M0 (3 bài) + video giới thiệu khóa | Có sẵn video demo của mẹ đã dựng |
| 2 | M1 (4 bài) | Không cần chuẩn bị |
| 3 | M2.1 – M2.3 | Một máy "sạch" (hoặc tài khoản mới) để quay cài đặt từ đầu |
| 4 | M2.4 – M2.6 | Obsidian đã cài |
| 5 | M3.1 – M3.4 | Điện thoại, mic, kịch bản mẫu |
| 6 | M3.5 – M3.7 | Thẻ nhớ có clip thô của mẹ |
| 7 | M4 (6 bài) | Page test, bảng Lark, repo đã fork |
| 8 | M5 (4 bài) | API key, chạy thử `--dry-run` trước |
| 9 | M6 (5 bài) | Có số liệu quảng cáo thật ít nhất 1 tuần |
| 10 | M7 (4 bài) + video cảm ơn/kết khóa | Số liệu 4–6 tuần dùng hệ thống |

Quay **M6 và M7 sau cùng**, khi đã có số liệu thật. Đây là phần bằng chứng mạnh nhất của khóa.

## 4. Hậu kỳ bằng chính hệ thống
1. Đặt file quay vào `quay/M2-3/` (một thư mục cho mỗi bài, nếu bài có nhiều đoạn thì đánh số 01, 02…).
2. Trong Claude Code: `/bai-giang quay/M2-3 M2-3-cai-claude-md`.
3. Claude cắt lặng, làm phụ đề, sửa chính tả, xuất bản ngang 16:9 không nhạc, rồi tick trạng thái bài trong file module.
4. Chọn 1–2 đoạn hay nhất dài 30–60 giây, dựng lại dạng dọc bằng `/dung-video` để làm Reels hoặc quảng cáo. Mỗi bài học như vậy cho thêm 1–2 video quảng cáo.

**Đặt tên file:** `M<module>-<bài>-<ten-khong-dau>.mp4`, ví dụ `M3-5-dung-video-tu-the-nho.mp4`

## 5. Bộ tài liệu học viên nhận (file nén `.zip` hoặc repo mẫu)
- [ ] Repo hệ thống: phiên bản sạch, **xóa toàn bộ token, ID, dữ liệu của mình**
- [ ] `CLAUDE.md` mẫu cho 5 ngành: spa, nha khoa, F&B, shop thời trang, BĐS
- [ ] `tri-thuc/san-pham.md` mẫu đã điền cho 5 ngành
- [ ] Vault Obsidian mẫu (đầy đủ Templates)
- [ ] 100 hook theo ngành (nhờ `/y-tuong` sinh rồi tự lọc)
- [ ] 30 kịch bản mẫu
- [ ] Checklist quay video bằng điện thoại (1 trang PDF)
- [ ] Bảng tính ngân sách quảng cáo

## 6. Nơi đặt khóa học
| Lựa chọn | Ưu | Nhược |
|---|---|---|
| Nền tảng khóa học VN (Unica, Gitiho…) | Có sẵn người mua | Chia hoa hồng cao, khó lấy dữ liệu khách |
| LMS thuê bao (Teachable, Thinkific, LearnWorlds, Kajabi) | Thương hiệu riêng, thanh toán và chứng chỉ có sẵn | Phí tháng, cổng thanh toán VN hạn chế |
| Tự làm: YouTube không công khai + web đơn giản + nhóm Zalo/Facebook kín | Rẻ, nhanh | Dễ bị chia sẻ link, ít chuyên nghiệp |

Gợi ý giai đoạn đầu: **tự làm** để thử thị trường với 20–50 học viên đầu tiên. Có doanh thu ổn định thì chuyển sang LMS.

## 7. Checklist trước khi mở bán
- [ ] Đã quay xong M0 (dùng làm buổi học thử) và video giới thiệu khóa
- [ ] Có ít nhất 1 case study có số liệu (doanh nghiệp của mình hoặc của mẹ)
- [ ] Trang bán hàng [[TRANG-BAN-HANG]] đã lên, có pixel
- [ ] Đã dạy thử 3–5 người quen miễn phí, xin lời chứng thực và sửa những chỗ họ bị kẹt
- [ ] Quy trình hỗ trợ: nhóm Zalo, giờ Zoom hỏi đáp hằng tuần
- [ ] Chính sách hoàn tiền rõ ràng (ví dụ 7 ngày)
