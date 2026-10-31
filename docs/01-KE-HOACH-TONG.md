# KẾ HOẠCH TỔNG — Hệ thống Marketing Tự động bằng AI

> Mục tiêu kép: (1) **tự dùng** hệ thống để có khách mỗi ngày, (2) **quay lại toàn bộ quá trình** để đóng gói thành khóa học bán cho chủ doanh nghiệp nhỏ & vừa.
> Bạn dùng hệ thống thật, quay lại cách mình dùng, rồi lấy chính kết quả đó làm bằng chứng để bán khóa học.

---

## 1. Hệ thống gồm những gì

```
 [Chủ: quay 30 phút]                      [Claude Code + Obsidian = BỘ NÃO]
        │                                   ý tưởng → kịch bản → caption → SEO
        ▼                                              │
  Thẻ nhớ / điện thoại ──► /dung-video ──► final.mp4 ──┤
                           (cắt lặng, phụ đề,          ▼
                            nhạc, hook, 9:16)   Bảng Lark "Đăng bài" (có lịch)
                                                       │  nút Đăng / hẹn giờ
                                                       ▼
                                          GitHub Actions: dang-bai / dang-reel
                                                       │
                                                       ▼
                                              Facebook Page (Reels + Feed)
                                                       │ bình luận, tin nhắn
                                                       ▼
                                 GitHub Actions: tra-loi-tu-dong (15 phút/lần)
                                 Claude trả lời theo tri-thuc/ → kéo về inbox
                                                       │
                                                       ▼
                                 Thu SĐT/Zalo → buổi học thử → chốt đơn
```

| Khâu | Công cụ | Trạng thái trong repo |
|---|---|---|
| Lên ý tưởng, kịch bản | Claude Code + `/y-tuong`, `/kich-ban` + Obsidian | ✅ có lệnh + mẫu |
| Dựng video | `video/auto_edit.py` + `/dung-video` | ✅ chạy được (cần cài faster-whisper để có phụ đề) |
| Viết caption, SEO | `/viet-bai` | ✅ |
| Lên lịch + tự đăng FB | Lark Base + `dang-bai`, `dang-reel` | ✅ có sẵn từ trước |
| Lấy số liệu bài đăng | `fetch-posts` | ✅ có sẵn |
| Tự trả lời bình luận + inbox | `scripts/tra-loi-tu-dong.js` + workflow | ✅ mới (cần ANTHROPIC_API_KEY) |
| TikTok / YouTube Shorts | Đăng tay hoặc công cụ lên lịch (Metricool, Buffer…) | ⏳ giai đoạn 2 |
| Blog SEO tự đăng | WordPress REST API | ⏳ giai đoạn 2 |
| Tự chốt đơn | AI thu SĐT + gửi link thanh toán/đăng ký; người chốt cuối | ⏳ giai đoạn 2 |

**Nói thật với học viên về giới hạn:** "Tự chốt đơn 100%" là nói quá. AI tự làm được phần trả lời, sàng lọc khách, xin SĐT, gửi link đăng ký và thanh toán. Đơn giá trị cao vẫn cần người gọi hoặc nhắn để chốt. Nói đúng như vậy thì học viên tin bạn hơn, ít bị hoàn tiền, và quảng cáo không bị Facebook từ chối.

---

## 2. Lộ trình 6 tuần

| Tuần | Việc của bạn | Quay lại làm bài học (khóa học) |
|---|---|---|
| 1 | Cài Claude Code, Obsidian, clone repo, viết `tri-thuc/san-pham.md`, chân dung khách | Module 1–2 |
| 2 | Quay 3 video/ngày (video của mẹ, của shop…), dựng bằng `/dung-video` | Module 3 |
| 3 | Nối Lark + Facebook, đăng tự động theo lịch | Module 4 |
| 4 | Bật `tra-loi-tu-dong`, chỉnh `tri-thuc/` theo câu hỏi thật | Module 5 |
| 5 | Dựng landing page + buổi học thử, chạy quảng cáo thử 300–500k/ngày | Module 6 |
| 6 | Tổng hợp số liệu thật (giờ tiết kiệm, lượt xem, lead) → làm case study, mở bán | Module 7 + video bán hàng |

Nguyên tắc: **làm thật trước, quay sau**. Mỗi thao tác bạn làm, bật quay màn hình (OBS) lại luôn. Đó chính là bài giảng.

---

## 3. Mô hình kinh doanh khóa học (đề xuất)

| Gói | Giá gợi ý | Gồm |
|---|---|---|
| Buổi học thử (miễn phí) | 0đ | Zoom 60–90 phút: demo trực tiếp quay → AI dựng → tự đăng → AI trả lời |
| Khóa tự học | 1.990.000 – 3.990.000đ | 7 module video + mẫu (repo, CLAUDE.md, vault Obsidian, prompt) + nhóm Zalo |
| Khóa kèm cài đặt | 7.000.000 – 15.000.000đ | + 4 buổi Zoom nhóm nhỏ + cài hệ thống cho doanh nghiệp học viên |
| Dịch vụ làm hộ | theo tháng | Bạn vận hành hệ thống cho doanh nghiệp |

Các mức giá trên chỉ là điểm xuất phát. Hãy thử giá thật trong buổi học thử rồi điều chỉnh.

---

## 4. Chỉ số theo dõi mỗi tuần (ghi vào `obsidian-vault/70-Quang-cao/`)
- Nội dung: số video/tuần, lượt xem TB, tỉ lệ xem hết 3 giây.
- Phễu: chi phí/lead, tỉ lệ lead → tham gia buổi thử, tỉ lệ tham gia → mua.
- Vận hành: số phút chủ bỏ ra/ngày (mục tiêu ≤ 30), số tin nhắn AI tự xử lý.

Tài liệu chi tiết: [02-QUANG-CAO](02-QUANG-CAO.md) · [03-KHOA-HOC](03-KHOA-HOC.md) · [04-HUONG-DAN-CAI-DAT](04-HUONG-DAN-CAI-DAT.md)
