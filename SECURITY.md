# Security Policy

## Scope

Lọ Chéo là game **offline-first**: chạy trong trình duyệt/WebView, không backend, không tài khoản, không thu thập dữ liệu. Bề mặt tấn công gần như chỉ là: dữ liệu `localStorage` bị giả mạo, và nội dung được build vào bundle.

## Báo cáo lỗ hổng

- Email: **standardizeparadigm@donuco.com** (tiêu đề `[security]`).
- Vui lòng KHÔNG mở issue public cho lỗ hổng đã xác nhận trước khi có bản vá.
- Phản hồi trong vòng 7 ngày; bản vá thường ra trong release kế tiếp.

## Lưu ý an toàn hiện có

- Mọi `localStorage` reader đều validate + clamp (xem `docs/guides/storage-keys.md`); dữ liệu hỏng không bao giờ crash game.
- Không `eval`, không `dangerouslySetInnerHTML`, không external script/style.
- Single-file build — không CDN, không SRI cần thiết, không supply-chain runtime.
- CI (`npm run check`) là cổng bắt buộc cho PR.
