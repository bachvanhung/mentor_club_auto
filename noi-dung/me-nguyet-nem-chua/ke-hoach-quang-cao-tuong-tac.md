# Kế hoạch quảng cáo Facebook: Mế Nguyệt Nem Chua

**1 chiến dịch Tương tác cho tất cả video của Trang, 7 ngày, tổng 700.000 đ, bán kính 20 km, mọi đối tượng từ 18 tuổi**
Lập ngày 16/11/2026. Chạy bằng **tài khoản quảng cáo trong nick Hưng**. Chỗ nào để trong [NGOẶC VUÔNG] là thông tin anh cần điền (xem mục 8).

| Đã chốt | Giá trị |
|---|---|
| Mục tiêu | Lượt tương tác |
| Ngân sách | **700.000 đ trọn đời cho 7 ngày** (khoảng 100.000 đ/ngày). Meta cộng thêm 10% VAT, nên thực trả khoảng **770.000 đ** |
| Thời gian | **Bắt đầu 00:02 ngày 17/11/2026**, kết thúc **23:59 ngày 23/11/2026** (7 ngày). Theo quy tắc của anh: quảng cáo luôn bắt đầu lúc 00:02. Múi giờ tài khoản phải là giờ Việt Nam (GMT+7) |
| Khu vực | Ghim tại [ĐỊA CHỈ CỬA HÀNG], **bán kính 20 km** (vùng tròn rộng khoảng 1.250 km²) |
| Đối tượng | Tất cả: nam nữ, 18 đến 65+, không chọn sở thích. **Hướng tới người Mường** bằng vị trí ghim và nội dung video (Meta không cho chọn theo dân tộc, xem mục 2b) |
| Video | **Tất cả video đang có trong mục Reels của Trang** (dùng bài viết có sẵn), mỗi video là 1 quảng cáo, cùng 1 nhóm |
| Tài khoản | Tài khoản quảng cáo trong nick Hưng (Chrome đã đăng nhập sẵn) |
| Thanh toán | **Tiền đã nạp qua MoMo** (số dư trả trước trong tài khoản quảng cáo). Số dư cần **ít nhất 770.000 đ** (700.000 đ + 10% VAT). Hết số dư thì quảng cáo tự dừng |

> **"20 km vuông" hay "bán kính 20 km"?** Meta chỉ khoanh vùng bằng ghim và **bán kính**. Kế hoạch này dùng bán kính 20 km, như anh nói lúc đầu. Nếu anh muốn một khu vực chỉ rộng 20 km², tức vùng tròn bán kính khoảng **2,5 km**, thì nhập bán kính 2,5 km. Vùng hẹp như vậy chỉ có ít người, nên 700.000 đ sẽ khiến mỗi người thấy quảng cáo lặp lại nhiều lần.

> **6 việc phải làm xong trước khi chạy**
> 1. **Cho nick Hưng quyền quảng cáo trên Trang Mế Nguyệt.** Đăng nhập nick quản trị Trang, vào **Cài đặt → Quyền truy cập Trang → Thêm mới**, thêm nick Hưng với quyền làm **Quảng cáo** (hoặc toàn quyền). Nếu Trang nằm trong Business Manager thì gán Trang cho nick Hưng ở đó. Thiếu bước này, Ads Manager của nick Hưng không chọn được Trang Mế Nguyệt và không dùng được video có sẵn.
> 2. **Dùng tất cả video đang có trong mục Reels của Trang.** Mở Trang → tab **Reels**, đếm số video, ghi lại câu mở đầu của từng video. Hệ thống đăng tự động (`dang-reel-lich`) **chưa đăng bài nào** (repo còn thiếu biến `REEL_TABLE_ID` và `REEL_FB_PAGE_ID`), nên Reels trên Trang là các video anh đã đăng tay.
> 3. **Kiểm tra caption của các Reel đó trước khi chạy.** Thêm dòng ghi tên và địa chỉ (bắt buộc, mục 3.3). Bỏ các chữ dễ bị từ chối: "nhất", "đảm bảo", "nhâm nhi/đồ nhắm/nhậu", "bình luận ĐẶT/chấm", "bà con người Mường ơi". Sửa ngay trên Trang. Theo nhiều nguồn, bài đã chạy quảng cáo thì không sửa nội dung được nữa. Bảng 3.4 và 3.5 áp dụng cho 29 caption trong `lich-dang-reel.csv`. Reel đăng tay với caption khác thì chỉ cần kiểm tra theo danh sách chữ cấm ở trên.
> 4. **Nạp đủ tiền MoMo, đăng chiến dịch trước 20:00 ngày 16/11.** Vào Ads Manager → **Thanh toán** của tài khoản nick Hưng, kiểm tra số dư trả trước ≥ **770.000 đ**. Quảng cáo phải được **duyệt xong trước 00:02**, nên đăng chiến dịch trước khoảng **20:00 ngày 16/11** để Meta kịp duyệt (thường vài phút đến vài giờ).
> 5. **Kiểm tra nhạc trong clip.** Bài hát thương mại ghép sẵn trong file có thể bị Facebook tắt tiếng hoặc chặn, và quảng cáo có thể bị từ chối vì bản quyền. Dùng tiếng gốc hoặc nhạc lấy từ Meta Sound Collection.
> 6. **Chuẩn bị Messenger.** Caption nào cũng mời "nhắn Mế", nên khi quảng cáo chạy, tin nhắn hỏi giá sẽ đến ngay (xem Bước 0).

---

## 1. Tóm tắt cấu hình

| Cấp | Mục | Giá trị |
|---|---|---|
| **Chiến dịch** | Tên | `MeNguyet_TuongTac_TatCaVideo_20km` |
| | Loại mua | Đấu giá |
| | Mục tiêu | **Lượt tương tác** |
| | Danh mục quảng cáo đặc biệt | Không chọn |
| | Ngân sách | Ngân sách chiến dịch Advantage+, **trọn đời 700.000 đ** |
| | Giới hạn chi tiêu chiến dịch | Không bắt buộc, vì ngân sách trọn đời đã là mức trần. Muốn chắc chắn thì đặt 700.000 đ |
| | Chiến lược giá thầu | Số lượng cao nhất (mặc định), không đặt giới hạn giá |
| | Thử nghiệm A/B | Tắt |
| **Nhóm quảng cáo** (chỉ 1 nhóm) | Tên | `20km_18+_TatCa` |
| | Vị trí chuyển đổi | Trên quảng cáo của bạn |
| | Mục tiêu hiệu quả | **Tối đa hóa số lượt tương tác** (Maximize Interactions). Nếu tài khoản không có mục này thì chọn "Tương tác với bài viết" |
| | Trang | Mế Nguyệt Nem Chua |
| | Lịch chạy | Bắt đầu **17/11/2026 00:02**, kết thúc **23/11/2026 23:59** (ngân sách trọn đời bắt buộc có ngày kết thúc); múi giờ GMT+7 |
| | Vị trí địa lý | Thả ghim tại [ĐỊA CHỈ CỬA HÀNG], bán kính **20 km**. Xóa "Việt Nam" mặc định. Bỏ tích ô mở rộng vị trí nếu thấy |
| | Đối tượng | Đối tượng Advantage+, không thêm gợi ý; tuổi tối thiểu **18**; mọi giới tính; không nhắm mục tiêu chi tiết; ngôn ngữ để trống; không loại trừ ai. **Người Mường:** Meta không cho chọn theo dân tộc, cách làm thay thế ở mục 2b |
| | Vị trí quảng cáo | Ưu tiên **thủ công, chỉ giữ Facebook** nếu tài khoản còn cho chọn. Nếu không cho chọn: Vị trí quảng cáo Advantage+, và chặn Audience Network trong Cài đặt quảng cáo của tài khoản |
| **Quảng cáo** (1 quảng cáo cho 1 Reel) | Danh tính | Trang Mế Nguyệt Nem Chua. Nếu còn vị trí Instagram: chọn "Sử dụng Trang Facebook" (không cần tài khoản Instagram) |
| | Thiết lập | **Sử dụng bài viết hiện có**, chọn Reel đã đăng trên Trang |
| | Số quảng cáo | **Tất cả video đã đăng trên Trang** (tối đa 29 Reel trong lịch; Meta cho tối đa 50 quảng cáo trong 1 nhóm) |
| | Cải tiến Advantage+ | Tắt mọi mục làm đổi hình hoặc tiếng (ví dụ "thêm nhạc") |
| | Theo dõi | Không cần pixel hay website |

**Vì sao chọn "Tối đa hóa số lượt tương tác":** mục tiêu này khớp với ý "chạy tương tác". Meta sẽ tìm những người hay thả cảm xúc, bình luận, chia sẻ và lưu bài. Phần lớn tương tác (từ vị trí Facebook) sẽ hiện ngay trên Reel của Trang. Mục tiêu này thay cho "Tương tác với bài viết" kiểu cũ. Meta công bố thay đổi từ tháng 10/2025 nhưng áp dụng dần, nên có tài khoản tới giữa 2026 mới thấy. Mục tiêu mới không tính lượt xem video hay lượt bấm, vì vậy số kết quả ít hơn và mỗi kết quả đắt hơn so với đẩy bài trước đây. Chuyện này là bình thường.
*Lựa chọn thay thế:* nếu muốn nhiều người xem hơn với chi phí rẻ hơn (chấp nhận ít bình luận hơn), chọn Loại tương tác "Lượt xem video" và mục tiêu "Tối đa hóa số lượt ThruPlay".

---

## 2. Từng bước nhập trên Ads Manager

> Tên nút tiếng Việt dưới đây chưa được đối chiếu với giao diện thật. Nếu chữ hơi khác, anh chọn theo ý nghĩa hoặc vị trí của nút. Tên tiếng Anh để trong ngoặc.

**Bước 0: chuẩn bị (ngoài Ads Manager)**
1. **Quyền:** cấp cho nick Hưng quyền Quảng cáo trên Trang Mế Nguyệt (xem việc số 1 ở đầu tài liệu).
2. Sửa caption theo mục 3.3 và 3.4. Bài đã đăng thì sửa ngay trên Trang, **trước khi** đưa vào quảng cáo.
3. Kiểm tra nhạc của từng clip. Clip chưa có trên Trang thì đăng lên (đăng tay, hoặc đổi `Lịch đăng` sang ngày mới rồi chạy `dang-reel-lich` sau khi đã đặt đủ biến). Reel chưa đăng thì không chọn được trong mục "bài viết hiện có".
4. **Messenger:** trong Meta Business Suite, bật tin nhắn trả lời tự động và câu hỏi thường gặp ("Nem chua bao nhiêu tiền?", "Có giao tới chỗ tôi không?", "Đặt thế nào?"). Ghi giá bán và khu vực giao hàng vào phần Giới thiệu của Trang. Chọn sẵn người trực tin nhắn trong thời gian quảng cáo chạy.

**Bước 1: Chiến dịch**
1. Trên Chrome đã đăng nhập **nick Hưng**, vào adsmanager.facebook.com và chọn **tài khoản quảng cáo của nick Hưng** ở góc trên bên trái. Kiểm tra: tiền tệ VND, múi giờ Việt Nam, **số dư nạp qua MoMo ≥ 770.000 đ**.
2. Bấm **+ Tạo**, chọn **Lượt tương tác** (Engagement), rồi bấm **Tiếp tục**.
3. Đặt tên `MeNguyet_TuongTac_TatCaVideo_20km`. Để trống mục Danh mục quảng cáo đặc biệt.
4. Ngân sách: bật **Ngân sách chiến dịch Advantage+** (Advantage+ campaign budget), chọn **Trọn đời** (Lifetime), nhập **700.000**. Để chiến lược giá thầu mặc định. Meta tự chia khoảng 100.000 đ mỗi ngày, có ngày nhiều có ngày ít, nhưng tổng không vượt 700.000 đ (chưa tính VAT).
5. **Giới hạn chi tiêu chiến dịch:** không bắt buộc. Muốn chắc chắn thì nhập 700.000.
6. Bấm **Tiếp**.

**Bước 2: Nhóm quảng cáo**
1. Đặt tên `20km_18+_TatCa`.
2. Vị trí chuyển đổi: chọn **Trên quảng cáo của bạn** (On your ad).
3. Nếu được hỏi Loại tương tác, chọn tương tác với bài viết, không chọn lượt xem video.
4. Mục tiêu hiệu quả: chọn **Tối đa hóa số lượt tương tác**. Nếu chỉ thấy **Tương tác với bài viết** thì chọn mục đó. Khi đó chi phí mỗi kết quả sẽ thấp hơn, vì Meta tính cả lượt xem video, nên không so được với số ước tính ở mục 4. Ngưỡng ở mục 5 vẫn dùng được vì chúng so với chính số liệu tuần đầu.
5. Trang Facebook: chọn Mế Nguyệt Nem Chua.
6. Lịch chạy: bắt đầu **17/11/2026 lúc 00:02**, kết thúc **23/11/2026 lúc 23:59**. Không cần cài khung giờ chạy. Kiểm tra dòng múi giờ cạnh ô ngày giờ phải là **giờ Việt Nam (GMT+7)**. Nếu là múi giờ khác thì 00:02 sẽ bị lệch.
7. **Vị trí địa lý (quan trọng):**
   - Xóa "Việt Nam" khỏi ô Vị trí. Nếu để lại, quảng cáo sẽ chạy cả nước.
   - Gõ [ĐỊA CHỈ CỬA HÀNG] hoặc bấm **Thả ghim** đúng chỗ cửa hàng, rồi đặt bán kính **20 km**.
   - Nếu thấy ô "Tiếp cận nhiều người hơn có khả năng phản hồi quảng cáo" (Reach more people likely to respond…), **bỏ tích**. Ô này đưa quảng cáo ra ngoài vòng 20 km.
   - Meta chỉ còn một kiểu vị trí là "người sống hoặc mới ở khu vực này", nên một số khách vãng lai cũng sẽ thấy quảng cáo.
8. **Đối tượng:** bật Đối tượng Advantage+ và không thêm gợi ý nào. Bấm "Hiển thị thêm tùy chọn" (kiểm soát đối tượng): tuổi tối thiểu **18**, ngôn ngữ để trống, không loại trừ ai.
   - Nếu tài khoản chỉ có "tùy chọn đối tượng ban đầu": tuổi 18 đến 65+, giới tính Tất cả, để trống Nhắm mục tiêu chi tiết.
   - Ghi lại con số **"Quy mô đối tượng ước tính"** (estimated audience size).
9. **Vị trí quảng cáo:**
   - Nếu có **Vị trí quảng cáo thủ công**: chỉ giữ Facebook (Bảng tin, Reels, Tin, video trong luồng) và bỏ Instagram, Threads, Messenger, Audience Network. Như vậy tiền chỉ chạy ra tương tác hiện trên Reel của Trang.
   - Nếu tài khoản không cho chọn (từ tháng 8/2026 Meta đang bỏ dần quyền này với chiến dịch Tương tác): giữ **Vị trí quảng cáo Advantage+**. Sau đó vào Cài đặt quảng cáo của tài khoản, chặn Audience Network. Khi đó "Kết quả" trong Ads Manager có cả tương tác trên Instagram, và phần này có thể không hiện trên Reel Facebook.
10. Bấm **Tiếp**.

**Bước 3: Quảng cáo đầu tiên (Reel số 1)**
1. Đặt tên `R01` (theo số thứ tự ở mục 3.5).
2. Danh tính: Trang Mế Nguyệt Nem Chua. Nếu có dòng Instagram, chọn **Sử dụng Trang Facebook**.
3. Thiết lập quảng cáo: chọn **Sử dụng bài viết hiện có** (Use existing post), bấm **Chọn bài viết**, mở tab Facebook. Cách tìm chắc nhất: mở link ở cột `Link Reel` trong Lark để biết đúng bài, rồi chọn theo ngày giờ đăng hoặc câu mở đầu (mục 3.5, cột "sau khi sửa"). Nếu phải nhập **ID bài viết**, thử video_id ghi trong cột `Log đăng Reel`. Nếu Meta không nhận, lấy ID trong Meta Business Suite > Nội dung.
4. **Cải tiến nội dung Advantage+**: tắt các mục làm đổi hình hoặc tiếng (thêm nhạc, chỉnh ảnh…). Nếu không chắc, tắt hết.
5. Xem bản xem trước ở vị trí Reels và Bảng tin.

**Bước 4: Thêm các Reel còn lại**
1. Ở cây chiến dịch bên trái, bấm **Nhân bản** cạnh quảng cáo `R01`, chọn **Nhóm quảng cáo hiện tại**, 1 bản.
2. Đổi tên bản sao thành `R02`, bấm **Thay đổi bài viết**, chọn Reel số 2.
3. Lặp lại cho đến hết 29 Reel.

**Bước 5: Đăng**
1. Kiểm tra lại 4 thứ: vị trí là ghim 20 km và không còn "Việt Nam"; ngân sách **trọn đời 700.000 đ**; ngày kết thúc đúng 7 ngày sau; số quảng cáo bằng số video đã đăng.
2. Bấm **Đăng**. Quảng cáo thường được duyệt trong vòng 24 giờ.
3. **Không** bấm "Quảng cáo bài viết" (đẩy bài) trên từng Reel. Làm vậy sẽ tạo ra nhiều chiến dịch lẻ, không gom về một chỗ.

---

## 2b. Đánh vào người dân tộc Mường

**Meta không cho nhắm theo dân tộc.** Từ 19/01/2022, Meta đã bỏ mọi lựa chọn đối tượng liên quan đến chủng tộc, dân tộc. Meta cũng không có tiếng Mường trong mục Ngôn ngữ. Vì vậy trong Ads Manager không có ô nào chọn "người Mường". Cách làm hợp lệ để quảng cáo đến được nhiều người Mường:

1. **Đặt vòng 20 km vào vùng người Mường sống đông.** Người Mường sống chủ yếu ở Hòa Bình cũ (nay thuộc tỉnh Phú Thọ), miền núi Thanh Hóa (Cẩm Thủy, Bá Thước, Ngọc Lặc, Thạch Thành cũ), Phú Thọ, Sơn La và phía tây Hà Nội.
   - Nếu cửa hàng Mế Nguyệt ở ngay vùng Mường: ghim tại cửa hàng, vòng 20 km đã phủ phần lớn người Mường quanh đó.
   - Nếu cửa hàng ở rìa vùng Mường: dời ghim về phía các xã Mường mà vẫn trong khu vực giao hàng được. Bán kính vẫn giữ 20 km.
2. **Để video tự "gọi" người Mường.** Đây là cách hiệu quả nhất. Meta tự đẩy quảng cáo tới người giống những ai dừng xem và tương tác nhiều.
   - Mế nói **tiếng Mường** trong clip, hoặc chào bằng tiếng Mường ở 2 đến 3 giây đầu.
   - Có hình ảnh quen thuộc với người Mường: nhà sàn, bếp củi, lá gói nem quê, váy Mường.
   - Caption có thể thêm một câu tiếng Mường ngắn kèm nghĩa tiếng Việt.
3. **Nói về sản phẩm, không nói về người xem.**
   - Được: "Nem chua làm theo kiểu người Mường", "Mế gói nem theo cách của bản Mường" (chỉ viết nếu đúng sự thật).
   - **Không được:** "Bà con người Mường ơi…", "Bạn là người Mường?", "Dành cho người Mường". Chính sách **Thuộc tính cá nhân** của Meta cấm quảng cáo khẳng định hay ám chỉ dân tộc của người xem, nên quảng cáo sẽ bị từ chối.
4. **Sau tuần đầu:** Ads Manager không báo được bao nhiêu người xem là người Mường. Muốn biết quảng cáo có đến đúng người không thì xem phần **Phân tích > Vị trí địa lý** (xã, huyện nào nhiều kết quả) và đọc bình luận, tin nhắn (có ai nói tiếng Mường không).

---

## 3. Danh sách quảng cáo

### 3.1 Cách đưa video vào
- **Cách A (đề xuất): chọn bài viết hiện có.** Lượt thích, bình luận và chia sẻ cộng thẳng vào Reel trên Trang. Caption của quảng cáo chính là caption bài đăng, nên phải sửa xong trước khi đăng. **Không xóa** Reel đang chạy quảng cáo.
- **Cách B (chỉ khi cần chạy ngay mà chưa đăng bài):** chọn "Tạo quảng cáo", tải video lên, dán caption đã sửa (kèm dòng bắt buộc và hashtag) vào phần Văn bản chính. Nhược điểm: tương tác **không** cộng vào Reel trên Trang.

### 3.2 Đưa video nào vào, khi nào, xoay vòng ra sao
- **Mặc định cả 29 video đều vào quảng cáo**, sau khi đã sửa caption. Chỉ để một video ra ngoài khi Meta từ chối nó (thường vì nhạc bản quyền), hoặc video có bia rượu hay hình trận bóng, logo giải đấu. Anh/chị quyết định trước khi bỏ video nào, và ghi lại tổng số quảng cáo cuối cùng.
- Nếu Trang đã có Reel khác ngoài 29 bài này, đưa luôn vào cùng nhóm.
- **Thời điểm:** chiến dịch chỉ chạy 7 ngày, nên đưa **tất cả video đã có trên Trang vào ngay từ đầu, một lần**. Không thêm video giữa chừng: mỗi lần thêm, Meta phải học lại từ đầu và tuần chạy ngắn sẽ phí tiền.
- Meta sẽ dồn phần lớn tiền vào 2 đến 5 video tốt nhất. Hệ thống được thiết kế như vậy. Video gần như không được chi tiền không có nghĩa là video dở, chỉ là Meta chưa chọn nó. Hãy đánh giá kết quả ở cấp nhóm.
- **Không tách thành nhiều nhóm quảng cáo.** Với 700.000 đ/7 ngày, chia nhỏ thì nhóm nào cũng thiếu dữ liệu để Meta học. Giữ 1 nhóm duy nhất.
- **Tuần sau (nếu chạy tiếp):** muốn video khác cũng được chạy thì tắt 1 đến 2 video đã ăn nhiều tiền nhất, hoặc dùng **"Đẩy phân phối cho quảng cáo này"** (Push delivery to this ad, nếu tài khoản có).
- Meta coi các video có mở đầu giống nhau gần như là một quảng cáo. Vì vậy 2 đến 3 giây đầu của các clip nên khác nhau: cảnh gói nem, bóc nem, đĩa nem, Mế nói.

### 3.3 Dòng bắt buộc ở cuối caption (cả 29 bài)
Thêm dòng này vào cuối cột `Nội dung`:
```
Nem chua Mế Nguyệt – [TÊN CHỦ CƠ SỞ / HỘ KINH DOANH] – Địa chỉ: [ĐỊA CHỈ CỬA HÀNG]
```
*Lưu ý:* địa chỉ sẽ hiện công khai và lâu dài trên mọi bài. Nếu đây là địa chỉ nhà riêng, anh cân nhắc dùng địa chỉ đăng ký kinh doanh hoặc điểm nhận hàng (nếu có). Quảng cáo thực phẩm vẫn bắt buộc phải có địa chỉ (Nghị định 342/2025).

### 3.4 Những chỗ cần sửa (trong bảng Lark, trước khi đăng)

| # | Cột | Thay | Bằng |
|---|---|---|---|
| 1 | Nội dung | "cả nhà ngồi nhâm nhi, nói chuyện rôm rả" | "cả nhà quây quần, nói chuyện rôm rả" |
| 1 | Hastag | #nhamnhi | #buatoi |
| 4 | Nội dung (tùy chọn) | "Tối nay có bóng đá" | "Hôm nào có bóng đá" |
| 4 | Comment ebook | "mà thiếu đồ nhắm" | "mà thiếu đĩa nem chua ăn vặt" |
| 5 | Nội dung | "Sáng nay có đơn nem chua gửi đi xa, Mế gói kỹ lắm, sợ đi đường lâu." | "Sáng nay Mế gói đơn nem chua cho khách, gói kỹ lắm." |
| 5 | Comment ebook | cả câu | "Ai muốn đặt nem chua thì cứ nhắn Mế, Mế gói cẩn thận cho nhé." |
| 9 | Nội dung | "Nem chua nhà Mế ăn với tỏi, ớt với lá là đúng bài nhất." | "Nem chua nhà Mế thì Mế ăn với tỏi, ớt với lá." |
| 16 | Nội dung | cả 2 dòng | "Con nào đi làm cả ngày, tối về nhớ cơm mẹ nấu không? / Bữa tối thêm đĩa nem chua nhà làm là đủ vị." |
| 16 | Hastag | #nhoque | #buatoi |
| 16 | Comment ebook | cả câu | "Ai muốn có sẵn nem chua cho bữa tối thì nhắn Mế nhé." |
| 17 | Comment ebook | cả câu | "Nhà nào có con cháu về chơi sắp đi thì đặt Mế ít nem chua mang theo làm quà nhé." |
| 21 | Comment ebook | "là ngon nhất" | "là vừa" |
| 22 | Nội dung | "đảm bảo đĩa hết đầu tiên" | "đĩa nem thường hết sớm lắm" |
| 22 | Nội dung (tùy chọn) | "Cuối tuần rồi" | "Cuối tuần này" |
| 25 | Hastag | #monnhau | #nemchuangon |
| 20 (*) | Nội dung | "lên men tự nhiên" | "lên men" (chỉ sửa nếu có dùng men hoặc phụ gia) |
| 15 (*) | Comment ebook | "ai đặt thì Mế gửi luôn trong ngày" | "ai đặt thì nhắn Mế nhé" (chỉ sửa nếu không phải lúc nào cũng giao trong ngày) |
| 24 (*) | Comment ebook | "Ai đặt từ sáng thì chiều nay nhận được rồi nhé." | "Ai đặt rồi thì Mế đang chuẩn bị gửi nhé." (chỉ sửa nếu không phải lúc nào cũng giao kịp) |

Lý do sửa:
- Bài 1, 4, 25 gợi chuyện nhậu, có rủi ro với chính sách rượu bia.
- Bài 9, 21, 22 dùng "nhất" hoặc "đảm bảo".
- Bài 5, 16, 17 nói với người ở xa, trong khi quảng cáo chỉ chạy trong vòng 20 km.
- Hai mục "tùy chọn" giúp câu chữ không lệch ngày khi quảng cáo chạy hằng ngày, ví dụ "Tối nay có bóng đá" hiện vào hôm không có trận. Các câu "Sáng nay", "Trưa nay", "Tối nay" ở bài khác coi như kể chuyện, giữ nguyên được.

Nếu không sửa bài 16, 17 thì vẫn đưa vào quảng cáo được, nhưng sẽ kém hiệu quả với khách trong vòng 20 km. Phần viết lại cần khớp với video, anh đọc lại giúp.

### 3.5 Bảng 29 quảng cáo
"Giữ" nghĩa là giữ nguyên Nội dung và Hastag, chỉ thêm dòng ở mục 3.3. "Nhạc" là clip khung 20:00, cần kiểm tra bản quyền nhạc. Nên tìm bài theo `Link Reel` hoặc ngày giờ đăng. Cột câu mở đầu chỉ để đối chiếu.

| # | Đợt | Câu mở đầu (sau khi sửa) | Caption khi chạy QC | Kiểm tra trước khi chạy |
|---|---|---|---|---|
| 1 | 1 | Tối rồi, cả nhà đã ăn cơm chưa? | Sửa | Không có bia rượu; Nhạc |
| 2 | 1 | Mới 5 giờ sáng Mế đã ngồi gói nem chua rồi | Giữ | "5 giờ sáng", "gói từng cái một" là thật |
| 3 | 1 | Gần trưa rồi, ai đang ở văn phòng… | Giữ | Chuyện có thật (đơn cho cả phòng) |
| 4 | 1 | Tối nay có bóng đá… (hoặc "Hôm nào có bóng đá…") | Sửa bình luận đầu | Không có hình trận đấu, logo giải hay bia; Nhạc |
| 5 | 1 | Sáng nay Mế gói đơn nem chua cho khách… | Sửa | Không |
| 6 | 1 | Có người hỏi Mế: nem chua ngon thì nhìn thế nào? | Giữ | Không |
| 7 | 1 | Ai đi làm về muộn… | Giữ | Nhạc |
| 8 | 1 | Có cô khách hỏi Mế: nem chua biếu ông bà… | Giữ | Không |
| 9 | 1 | Nem chua nhà Mế thì Mế ăn với tỏi, ớt… | Sửa | Không |
| 10 | 1 | Cơm tối nhà Mế đơn giản lắm… | Giữ | Nhạc |
| 11 | 2 | Nem chua nhà Mế vẫn gói tay từng cái một | Giữ | Gói tay là thật |
| 12 | 2 | Nhiều người nhắn hỏi Mế mua nem chua ở đâu… | Giữ | Chuyện có thật |
| 13 | 2 | Tối nay ngồi gói nốt mẻ nem chua cuối… | Giữ | Nhạc |
| 14 | 2 | Sáng nào Mế cũng đi chợ sớm chọn thịt | Giữ | Là thật; giữ giấy tờ nguồn thịt |
| 15 | 2 | Bóc lớp lá ra mà thấy cái nem hồng hồng… | Giữ (*) | "Gửi luôn trong ngày" |
| 16 | 2 | Con nào đi làm cả ngày… | Sửa | Nhạc |
| 17 | 2 | Mấy đứa đi làm xa về quê… | Sửa bình luận đầu | Chuyện có thật |
| 18 | 2 | Nghe bảo ở văn phòng cứ mở hộp nem chua ra… | Giữ | Chuyện có thật |
| 19 | 2 | Làm nem chua vui nhất là lúc có người nhắn… | Giữ | Chuyện có thật; Nhạc |
| 20 | 3 | Nem chua Mế gói xong thì để chỗ thoáng… | Giữ (*) | "Tự nhiên" nghĩa là không dùng men hay phụ gia |
| 21 | 3 | Ai hỏi nem chua ăn kèm gì cho ngon… | Sửa bình luận đầu | Lá đinh lăng, lá sung là thật |
| 22 | 3 | Cuối tuần rồi (hoặc "Cuối tuần này"), nhà nào có hẹn tụ tập… | Sửa | Không có bia rượu; Nhạc |
| 23 | 3 | Sắp đến dịp lễ Tết… | Giữ | Có nhận đơn quà Tết thật; chuyện có thật |
| 24 | 3 | Trưa nay nắng, Mế ngồi trong bếp đếm nem… | Giữ (*) | Chuyện có thật; có giao trong khu vực; "chiều nay nhận được" |
| 25 | 3 | Tối nay nhà có khách… | Sửa hashtag | Không có bia rượu; chuyện có thật; Nhạc |
| 26 | 3 | Nem chua mang về thì các con cất ngăn mát… | Giữ | Không |
| 27 | 3 | Mế quý nhất là những người… | Giữ | Có khách quay lại thật |
| 28 | 3 | Một ngày lại qua… | Giữ | Nhạc |
| 29 | 3 | Sáng nay Mế gói nem chua từ sớm… | Giữ | Không |

---

## 4. Ngân sách và thời gian
*Mọi con số dưới đây là **ước tính** từ blog, agency và công cụ bên thứ ba, không phải số liệu chính thức của Meta. Sau 7 ngày chạy, anh thay bằng số thật trong tài khoản.*

**Ngân sách đã chốt: 700.000 đ trọn đời cho 7 ngày** (trung bình 100.000 đ/ngày). Meta tính thêm **10% thuế GTGT** (từ 01/07/2025), nên **tổng thực trả khoảng 770.000 đ**. Với ngân sách trọn đời, Meta chi không đều giữa các ngày nhưng không vượt 700.000 đ.

**Kết quả dự kiến cho cả 7 ngày:**

| Chỉ số | Ước tính | Cả 7 ngày |
|---|---|---|
| Giá 1.000 lượt hiển thị (CPM) | 25.000 đến 60.000 đ | khoảng 12.000 đến 28.000 lượt hiển thị |
| Chi phí mỗi lượt tương tác (mục tiêu mới, **chưa có số đo**) | 1.000 đến 5.000 đ, nhiều khả năng khoảng 2.000 đến 3.000 đ | 140 đến 700 lượt, nhiều khả năng **230 đến 350 lượt** |
| Chi phí mỗi ThruPlay (nếu đổi mục tiêu) | 150 đến 700 đ | 1.000 đến 4.700 lượt xem hết |

- **Cách tự ước tính:** chi phí mỗi lượt tương tác ≈ CPM ÷ (1.000 × tỷ lệ người tương tác). Ví dụ CPM 40.000 đ, cứ 100 người thấy có 1,5 người tương tác, thì khoảng 2.700 đ mỗi lượt. Các bảng giá "100 đến 500 đ/tương tác" trên blog Việt Nam là số của mục tiêu cũ (tính cả lượt xem video), không áp dụng ở đây.
- **Đủ để Meta học:** Meta cần khoảng 50 kết quả trong 7 ngày cho mỗi nhóm. Ở mức 5.000 đ/kết quả, cần khoảng 36.000 đ/ngày. Một nhóm chạy 100.000 đ/ngày là đủ.
- **Số người trong vòng 20 km:** từ khoảng 40 nghìn (vùng núi) đến vài triệu (Hà Nội, TP.HCM). Con số thật là "Quy mô đối tượng ước tính" hiện ra sau khi thả ghim. Với ngân sách này, mỗi người hầu như không thấy quảng cáo quá nhiều lần, trừ khi quy mô đối tượng dưới 20 đến 30 nghìn người.
- **Không cần cài giờ chạy:** để quảng cáo chạy cả ngày.
- **Thời gian:** 7 ngày như đã chốt. Một tuần là đủ để biết video nào hút tương tác, nhưng chưa đủ để đánh giá chắc chắn. Tháng 12 và tháng 1 (gần Tết) giá hiển thị thường tăng.

| Mốc | Việc cần làm |
|---|---|
| 16/11, trước 20:00 | Cấp quyền cho nick Hưng, kiểm tra caption các Reel, nạp MoMo ≥ 770.000 đ, cài Messenger, **đăng chiến dịch** để Meta duyệt |
| 17/11, 00:02 | Quảng cáo bắt đầu chạy |
| 19/11 (ngày 3) | Kiểm tra theo mục 5 |
| 23/11, 23:59 (ngày 7) | Kết thúc. Tổng kết theo mục 5, quyết định tuần sau |

---

## 5. Theo dõi và tối ưu

**Thêm cột trong Ads Manager:** vào Cột > Tùy chỉnh cột, thêm: Kết quả, Chi phí trên mỗi kết quả, Số tiền đã chi tiêu, Lượt hiển thị, CPM, Tần suất, Lượt phát video 3 giây, ThruPlay, Bình luận, Lượt chia sẻ, Lượt bắt đầu cuộc trò chuyện qua tin nhắn.
**Tỷ lệ giữ chân 3 giây (hook rate)** = Lượt phát video 3 giây ÷ Lượt hiển thị.
**Mức nền** = chi phí mỗi kết quả trung bình của cả nhóm trong ngày 1 đến 7. Dùng mức nền thay cho con số cố định, vì chưa có số đo cho mục tiêu mới.

| Chỉ số | Tốt | Tạm được | Cần xử lý |
|---|---|---|---|
| Chi phí mỗi kết quả (cả nhóm, từ ngày 8) | ≤ mức nền | đến 1,5 lần mức nền | > 2 lần mức nền trong 3 đến 4 ngày liền |
| CPM | ≤ 50.000 đ | 50.000 đến 80.000 đ | > 80.000 đến 100.000 đ |
| Tỷ lệ giữ chân 3 giây (video có từ 1.500 lượt hiển thị) | ≥ 30% | 20 đến 30% | < 20% |
| Tần suất trong 7 ngày | < 2 | 2 đến 2,5 | > 3 |
| Chi phí mỗi ThruPlay (chỉ khi dùng mục tiêu ThruPlay) | ≤ 300 đ | 300 đến 700 đ | > 1.000 đ |

**Chỉ số quan trọng nhất:** số bình luận và tin nhắn hỏi "giá", "đặt", "ship". Ghi tay mỗi ngày.

**Ngày 1 đến 3:** không sửa gì. Chỉ làm 3 việc: xử lý quảng cáo bị từ chối (đổi video hoặc sửa theo lý do Meta đưa ra), trả lời bình luận và tin nhắn thật nhanh, ẩn bình luận rác.

**Ngày 3:** chỉ xem ở cấp nhóm, không tắt video nào. Chiến dịch chỉ chạy 7 ngày, tắt sớm sẽ làm Meta học lại.
- Tiền có tiêu đều không? CPM có trong ngưỡng không? Tần suất có vượt 2,5 không? Nếu vượt thì vùng 20 km quá ít người so với ngân sách.
- Xem **Phân tích > Vị trí** để biết bao nhiêu kết quả đến từ Facebook và bao nhiêu từ Instagram.
- Ngoại lệ: video nào bị báo cáo, bị từ chối hoặc có bình luận xấu thì tắt ngay.

**Ngày 7 (kết thúc), tổng kết:**
- Ghi lại: tổng tiền đã chi, tổng kết quả (tương tác), chi phí mỗi kết quả, CPM, tần suất, số bình luận và tin nhắn hỏi mua, số đơn chốt được.
- Xếp hạng video: chỉ xét video có **từ 1.500 lượt hiển thị**. Ghi lại 3 video tốt nhất (chi phí mỗi kết quả thấp, tỷ lệ giữ chân 3 giây ≥ 30%) và các video có tỷ lệ giữ chân dưới 20%.
- Chi phí mỗi kết quả trung bình tuần này là **mức nền** cho tuần sau.

**Tuần sau, chọn một trong ba hướng:**
1. **Chạy tiếp tương tác**: nhân bản chiến dịch, chỉ giữ các video tốt và tắt video kém. Nếu chi phí ổn thì tăng ngân sách tối đa 20 đến 30%.
2. **Chuyển sang chiến dịch Tin nhắn** (mục 7). Nên chọn hướng này nếu tương tác nhiều mà ít người hỏi mua.
3. **Thử ThruPlay**: chạy một tuần mục tiêu ThruPlay với cùng ngân sách, rồi so chi phí và số bình luận hỏi mua với tuần này.

---

## 6. Lưu ý chính sách và pháp lý
*Phần này không phải tư vấn pháp lý. Các điều luật được tổng hợp từ nguồn thứ cấp (báo, blog luật, cổng thông tin tỉnh) và cần đối chiếu với văn bản gốc.*

**Chính sách của Meta**
- **Rượu bia:** quảng cáo nhắc tới hoặc có hình rượu bia phải nhắm người từ 18 tuổi. Vì vậy cấu hình đặt tuổi tối thiểu 18, các chữ "nhâm nhi", "đồ nhắm", "#monnhau" đã được sửa, và video không được có cảnh hay nhãn hiệu bia rượu.
- **Nhạc bản quyền:** bài hát thương mại ghép sẵn trong clip có thể bị tắt tiếng hoặc chặn, và quảng cáo có thể bị từ chối vì sở hữu trí tuệ. Dùng tiếng gốc hoặc nhạc từ Meta Sound Collection.
- **Không câu kéo tương tác** kiểu "Bình luận ĐẶT", "chấm", "ib để nhận giá". Meta giảm phân phối những bài này. Câu hỏi mở như "Kể Mế nghe với" thì không sao.
- **Không nói về sức khỏe, tuổi tác hay tiền bạc của người xem.** Caption hiện tại đều ổn ở điểm này.

**Pháp luật Việt Nam**
- **Thông tin bắt buộc trong quảng cáo thực phẩm** (Nghị định 342/2025/NĐ-CP, hiệu lực từ 15/02/2026): phải có tên thực phẩm, tên và địa chỉ của tổ chức hoặc cá nhân chịu trách nhiệm. Dòng ở mục 3.3 đáp ứng yêu cầu này.
- **Không dùng "nhất", "tốt nhất", "duy nhất", "số một"** cho sản phẩm khi không có tài liệu chứng minh (Luật Quảng cáo, Điều 8 khoản 11). Nên tránh cả "đảm bảo".
- **Nội dung phải đúng sự thật** (Luật Quảng cáo sửa đổi số 75/2025/QH15, hiệu lực từ 01/01/2026). Những câu Mế kể như gói tay, đi chợ sớm, khách quay lại đặt… phải đúng với người làm thật. Nếu "Mế" chỉ là nhân vật dựng lên, các câu này có thể bị coi là gây hiểu lầm.
- **Không nói tác dụng sức khỏe** như "tốt cho tiêu hóa", "sạch 100%", "không chất bảo quản" nếu không chứng minh được. Vi phạm có thể bị phạt tiền nặng theo Nghị định 87/2026/NĐ-CP (mức cụ thể cần tra văn bản gốc).
- **Không cần xin xác nhận nội dung quảng cáo:** nem chua là thực phẩm thông thường, theo Nghị định 15/2018 (vẫn áp dụng vì Nghị định 46/2026 đang bị tạm ngưng).
- **Giấy tờ an toàn thực phẩm (chưa rõ):** chưa xác định được cơ sở làm nem nhỏ tại nhà cần giấy chứng nhận, bản cam kết hay tự công bố sản phẩm. Nên hỏi UBND xã/phường hoặc cơ quan an toàn thực phẩm của tỉnh trước khi chi tiền quảng cáo. Luật An toàn thực phẩm sửa đổi đang được Quốc hội thảo luận, nên quy định có thể thay đổi.

---

## 7. Bước tiếp theo đề xuất
Sau tuần chạy tương tác này, khi đã có khoảng **1.000 người trở lên** xem hết video hoặc tương tác với Trang, tạo **chiến dịch thứ hai, chạy Tin nhắn** để chốt đơn:
- **Mục tiêu:** Lượt tương tác, vị trí chuyển đổi **Ứng dụng nhắn tin** (Messenger), mục tiêu hiệu quả **Tối đa hóa số cuộc trò chuyện**.
- **Đối tượng:** dùng tùy chọn đối tượng ban đầu (không dùng Advantage+). Chọn Đối tượng tùy chỉnh gồm người đã xem ThruPlay hoặc 50% video của Trang trong 30 đến 60 ngày, cộng người đã tương tác với Trang trong 90 ngày. Vẫn giữ vòng 20 km.
- **Ngân sách:** 50.000 đến 100.000 đ/ngày. Dưới 10.000 đ mỗi cuộc trò chuyện là tốt. Dừng nếu trên 25.000 đến 30.000 đ, hoặc cao hơn tiền lãi của một đơn.
- **Chuẩn bị:** dùng lại phần trả lời tự động và câu hỏi mẫu đã cài ở Bước 0. Thêm câu hỏi mẫu cho quảng cáo tin nhắn. Mế cần trả lời kịp, vì trả lời chậm là mất đơn.

---

## 8. Thông tin anh cần cung cấp
1. **[ĐỊA CHỈ CỬA HÀNG]**: địa chỉ đầy đủ, dùng làm tâm vòng 20 km và ghi vào dòng bắt buộc. Có đồng ý để địa chỉ này hiện công khai trên mọi bài không, hay có địa chỉ kinh doanh hoặc điểm nhận hàng khác?
2. **[TÊN CHỦ CƠ SỞ / HỘ KINH DOANH]**: tên đã đăng ký, hoặc tên người chịu trách nhiệm.
3. ~~Ngân sách~~ **Đã chốt:** 700.000 đ trọn đời, 7 ngày.
4. ~~Tài khoản quảng cáo~~ **Đã chốt:** tài khoản trong nick Hưng. Cần kiểm tra: đã có phương thức thanh toán, tiền tệ VND, múi giờ Việt Nam, nick Hưng đã có quyền Quảng cáo trên Trang Mế Nguyệt.
5. ~~Ngày chạy~~ **Đã chốt:** 17/11/2026 00:02 đến 23/11/2026 23:59. Thanh toán bằng tiền nạp MoMo.
6. **Tình trạng video:** đã gắn đủ 29 clip chưa, đã đăng bài nào, clip nào có nhạc (nhạc gì), có clip nào có hình bia rượu hoặc trận bóng không. Trang đã có video/Reel nào khác ngoài 29 bài này không? Nếu có thì đưa vào cùng nhóm.
7. **Xác nhận sự thật:** các mục ở cột "Kiểm tra trước khi chạy" (giờ gói nem, đi chợ, loại lá ăn kèm, các chuyện khách đặt, có giao trong ngày không, có nhận đơn quà Tết không, có dùng men hoặc phụ gia không).
8. **Mục tiêu ưu tiên:** muốn nhiều tương tác (cấu hình hiện tại) hay nhiều lượt xem (ThruPlay).
9. **Giá bán và tiền lãi mỗi đơn**, khu vực giao hàng: để ghi lên Trang và tính chi phí tối đa cho một tin nhắn ở mục 7.
10. **Người trực tin nhắn** trong thời gian chạy quảng cáo.

---

## Nguồn
*Phần lớn được đọc qua kết quả tìm kiếm, không mở được toàn văn. Tên nút tiếng Việt chưa được đối chiếu với Ads Manager thật.*
- Mục tiêu chiến dịch của Meta: https://www.facebook.com/business/help/1438417719786914
- "Interactions" thay "Post engagement": https://www.jonloomer.com/interactions-post-engagement/ , https://web.swipeinsight.app/posts/meta-is-changing-post-engagement-to-interactions-20109
- Quảng cáo Reels, dùng bài viết hiện có: https://www.facebook.com/business/ads/facebook-instagram-reels-ads , https://en-gb.facebook.com/business/help/374756690038600
- Nhạc bản quyền và quảng cáo Reels: https://help.bir.ch/en/articles/8892599-the-reel-can-t-be-boosted-reels-that-use-copyrighted-music-can-t-be-boosted-as-ads , https://musicbusinessworldwide.com/meta-offers-royalty-free-music-library-to-instagram-reels-advertisers
- Nhắm theo bán kính: https://developers.facebook.com/documentation/ads-commerce/marketing-api/audiences/reference/basic-targeting , https://www.jonloomer.com/big-change-to-meta-ads-location-targeting/
- Đối tượng Advantage+: https://www.facebook.com/business/ads/meta-advantage-plus/audience
- Meta bỏ quyền loại trừ vị trí quảng cáo: https://www.jonloomer.com/meta-removing-placement-controls-ad-sets/
- Ngân sách ngày có thể vượt tới 75%, tối đa 7 lần mỗi tuần: https://www.jonloomer.com/updates-to-meta-ads-budgeting/
- Một quảng cáo ăn hết ngân sách, "Push delivery": https://www.jonloomer.com/one-ad-gets-all-the-budget/ , https://www.jonloomer.com/hands-on-push-delivery-to-this-ad/
- Giai đoạn học của Meta: https://lebesgue.io/blog/facebook-ads-learning-phase/
- Chi phí tham khảo: https://www.adamigo.ai/blog/meta-ads-cpm-cpc-benchmarks-by-country-2026 , https://www.1clickreport.com/blog/cost-per-thruplay-meta-ads-benchmark-2026 , https://vpage.nhanh.vn/blog/chi-phi-quang-cao-tren-facebook-2026-cap-nhat-moi-chuan-nhat-a418.html
- VAT trên quảng cáo Meta: https://www.sapo.vn/blog/thue-chay-quang-cao-facebook
- Chính sách rượu bia của Meta: https://transparency.meta.com/policies/ad-standards/restricted-goods-services/alcohol/
- Câu kéo tương tác: https://transparency.meta.com/features/approach-to-ranking/content-distribution-guidelines/engagement-bait/
- Thông tin bắt buộc trong quảng cáo thực phẩm (Nghị định 342/2025): https://lsvn.vn/thong-tin-bat-buoc-doi-voi-noi-dung-quang-cao-thuc-pham-a167947.html
- Từ "nhất", "duy nhất": https://lsvn.vn/quy-dinh-ve-tai-lieu-chung-minh-khi-quang-cao-su-dung-tu-nhat-duy-nhat-tot-nhat-so-mot-a173667.html
- Luật Quảng cáo sửa đổi 2025: https://luatvietnam.vn/linh-vuc-khac/diem-moi-cua-luat-quang-cao-sua-doi-2025-883-102813-article.html
- Nghị định 87/2026 (mức phạt cụ thể chưa xác minh): https://thuvienphapluat.vn/van-ban/Thuong-mai/Nghi-dinh-87-2026-ND-CP-xu-phat-vi-pham-hanh-chinh-linh-vuc-van-hoa-va-quang-cao-700858.aspx
- Nghị định 46/2026 tạm ngưng, Nghị định 15/2018 vẫn áp dụng: https://pbgdpl.cantho.gov.vn/tam-ngung-hieu-luc-nghi-dinh-so-462026nd-cp-den-khi-co-luat-an-toan-thuc-pham-sua-doi-1
- Không cần xác nhận nội dung quảng cáo với thực phẩm thông thường: https://thuvienphapluat.vn/phap-luat/muon-quang-cao-thuc-pham-thit-heo-thi-can-tuan-thu-quy-dinh-nao-cua-phap-luat-cac-thuc-pham-phai-da-7335.html
- Đối tượng tùy chỉnh từ người xem video (mục 7): https://www.jonloomer.com/facebook-video-engagement-custom-audiences/
- Meta bỏ nhắm mục tiêu theo chủng tộc, dân tộc từ 19/01/2022 (mục 2b): https://www.axios.com/2021/11/09/meta-facebook-advertising-block , https://www.jonloomer.com/facebook-removed-thousands-of-detailed-targeting-options/
- Địa bàn cư trú của người Mường (mục 2b): https://vjol.info.vn/tapchiviendantochoc/article/download/127856/104866/ ; Hòa Bình nhập vào Phú Thọ từ 01/07/2025: https://en.wikipedia.org/wiki/H%C3%B2a_B%C3%ACnh_province
