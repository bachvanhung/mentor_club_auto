# GIÁO TRÌNH KHÓA HỌC — "Hệ thống Marketing Tự động bằng AI cho Chủ Doanh nghiệp"

> Mỗi dòng trong bảng là **1 video cần quay**. Mỗi bài dài 5–15 phút, quay màn hình bằng OBS và lồng mặt bạn ở góc.
> Gợi ý cách làm: mở Claude Code, gõ `/kich-ban Bài 2.3 - Cài CLAUDE.md` để AI viết dàn ý cho từng bài.
> **Kịch bản quay chi tiết từng bài + lịch quay 10 buổi + trang bán hàng:** `obsidian-vault/60-Khoa-hoc/` (bắt đầu từ `00-KE-HOACH-DONG-GOI.md`).
> Dựng bài giảng: `/bai-giang <thư mục quay> <M#-#-ten>`.

## Module 0 — Khởi động (miễn phí, dùng làm buổi học thử)
| # | Bài | Học viên làm được |
|---|---|---|
| 0.1 | Câu chuyện: mẹ tôi 60 tuổi có kênh video nhờ AI | Tin là mình làm được |
| 0.2 | Demo trọn vòng: quay → AI dựng → tự đăng → AI trả lời khách | Thấy bức tranh tổng |
| 0.3 | Bản đồ hệ thống & lộ trình 14 ngày | Biết đi đâu trước |

## Module 1 — Tư duy: AI là nhân viên, không phải phần mềm
| 1.1 | Giao việc cho AI như giao cho nhân viên mới: bối cảnh, mục tiêu, tiêu chuẩn, ví dụ | Viết lệnh rõ ràng |
| 1.2 | Công thức ra lệnh **B-M-T-V** (Bối cảnh, Mục tiêu, Tiêu chuẩn, Ví dụ) + cách bắt AI hỏi lại | Nhận kết quả đúng ngay lần đầu |
| 1.3 | Làm việc nhiều vòng: duyệt, góp ý, sửa. Đừng mong AI hoàn hảo từ lần đầu | Biết cách chỉnh kết quả của AI |
| 1.4 | Giới hạn của AI và chỗ bắt buộc phải có người duyệt (giá, cam kết, chốt đơn) | Tránh sự cố |

## Module 2 — Cài "bộ não": Claude Code + Obsidian + CLAUDE.md
| 2.1 | Cài Claude Code (Windows/Mac), đăng nhập, lệnh đầu tiên | Chạy được `claude` |
| 2.2 | Tải repo hệ thống (GitHub Desktop, không cần biết code) | Có thư mục hệ thống trên máy |
| 2.3 | CLAUDE.md là gì: "bản mô tả công việc" AI đọc mỗi lần mở dự án | Tự viết CLAUDE.md cho doanh nghiệp mình |
| 2.4 | Obsidian, bộ não thứ 2: mở vault, cấu trúc thư mục, mẫu note, liên kết | Có kho tri thức riêng |
| 2.5 | Viết `tri-thuc/san-pham.md`: sản phẩm, giá, FAQ, giọng văn | AI hiểu doanh nghiệp mình |
| 2.6 | Lệnh tắt (slash command): `/y-tuong`, `/kich-ban`, `/dung-video`, `/viet-bai`, `/len-lich` và cách tự tạo lệnh mới | Tự động hóa việc lặp lại |

## Module 3 — Sản xuất nội dung: 30 phút quay mỗi ngày
| 3.1 | Chân dung khách & bản đồ nỗi đau (`30-Khach-hang`) | Biết nói gì để khách dừng lướt |
| 3.2 | `/y-tuong`: 30 ý tưởng cho 1 tháng trong 10 phút | Kho ý tưởng không cạn |
| 3.3 | `/kich-ban`: hook 3 giây, cấu trúc 5 bước, kêu gọi hành động | Kịch bản sẵn để quay |
| 3.4 | Quay bằng điện thoại: ánh sáng, mic cài áo, khung 9:16, quay hàng loạt 5 video/30 phút | Clip thô đạt chuẩn |
| 3.5 | `/dung-video`: cắm thẻ nhớ, AI cắt khoảng lặng, làm phụ đề, chèn nhạc, hook | Video hoàn chỉnh không cần tự edit |
| 3.6 | Duyệt và góp ý cho AI sửa video: đổi nhạc, bỏ đoạn, đổi chữ | Video đúng ý mình |
| 3.7 | Case study: dựng video của mẹ từ đầu đến cuối | Làm theo được |

## Module 4 — Phân phối: tự đăng, tự lên lịch, tự SEO
| 4.1 | `/viet-bai`: caption, hashtag, bài dài, bài SEO từ một video | 1 video thành 4 nội dung |
| 4.2 | Lark Base làm "bảng điều khiển": bảng Pages, bảng Đăng bài | Quản lý nội dung một chỗ |
| 4.3 | Lấy token Facebook đúng quyền (an toàn) | Kết nối Page |
| 4.4 | GitHub Actions: bật workflow, cài Secrets, bấm nút Đăng trong Lark để đăng | Đăng tự động lần đầu |
| 4.5 | `/len-lich`: lịch đăng tuần theo tỉ lệ 3 thu hút : 2 nuôi dưỡng : 1 chuyển đổi | Kênh đều đặn |
| 4.6 | Comment ghim tự động (link quà/đăng ký) | Biến lượt xem thành lead |

## Module 5 — Chăm sóc: AI trả lời bình luận và tin nhắn
| 5.1 | Cách hệ thống trả lời tự động hoạt động, luật 24 giờ của Messenger | Hiểu để không vi phạm |
| 5.2 | Cài `ANTHROPIC_API_KEY`, bật workflow `tra-loi-tu-dong`, chạy thử với `--dry-run` | Xem trước AI sẽ nói gì |
| 5.3 | Huấn luyện AI bằng `tri-thuc/`: thêm FAQ từ câu hỏi thật mỗi tuần | AI trả lời ngày càng đúng |
| 5.4 | Kịch bản kéo khách về inbox và xin SĐT. Lúc nào chuyển cho người thật | Có lead, không mất khách nóng |

## Module 6 — Thu khách: quảng cáo & phễu
| 6.1 | Phễu: video → landing page → buổi demo/quà → chốt | Biết mình đang thiếu khâu nào |
| 6.2 | Dùng video tự quay làm quảng cáo, 5 góc nỗi đau | 6–10 mẫu quảng cáo |
| 6.3 | Dựng chiến dịch Meta: tìm khách mới, nuôi người đã biết, quảng cáo lại | Chạy được chiến dịch đầu tiên |
| 6.4 | Đọc số: CPM, CTR, giá lead, khi nào tắt/tăng | Không đốt tiền |
| 6.5 | Landing page bằng AI (Claude viết, dùng công cụ làm trang) | Có trang thu lead |

## Module 7 — Vận hành & mở rộng
| 7.1 | Thói quen 30 phút/ngày và 1 giờ/tuần xem số | Hệ thống chạy đều |
| 7.2 | Đọc số liệu `fetch-posts`, nhờ Claude phân tích nội dung thắng | Ra quyết định bằng dữ liệu |
| 7.3 | Mở rộng sang TikTok, YouTube Shorts, Zalo OA | Phủ nhiều kênh |
| 7.4 | Giao hệ thống cho nhân viên vận hành | Chủ rảnh tay |

## Quà tặng kèm (giá trị cảm nhận cao, chi phí 0)
- Bộ mẫu: repo hệ thống, CLAUDE.md mẫu theo 5 ngành (spa, nha khoa, F&B, shop thời trang, BĐS), vault Obsidian
- 100 hook theo ngành, 30 kịch bản mẫu
- Checklist quay video bằng điện thoại

## Quy trình quay khóa học (dùng chính hệ thống)
1. `/kich-ban Bài x.y - <tên>` → dàn ý bài giảng lưu ở `60-Khoa-hoc/`
2. Quay màn hình + mặt (OBS), quay liền từ đầu đến cuối, nói vấp thì nói lại câu đó
3. `/dung-video` để AI cắt khoảng lặng và chỗ vấp, làm phụ đề (với bài quay màn hình thì bỏ nhạc)
4. Upload lên nền tảng khóa học. Các đoạn hay cắt thành Reels để quảng cáo
