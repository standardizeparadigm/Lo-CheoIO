# Hero menu v1.1.8

`src/components/menu/hero/MenuHero.tsx` chỉ chứa wordmark và lọ trang trí cùng các vòng sáng. Hero được căn giữa trong vùng linh hoạt phía trên hai panel GAME/INFO. Menu cuộn trên viewport thấp; panel thu hẹp theo chiều rộng màn hình. Không đặt điều khiển có thể bấm trong lớp trang trí `aria-hidden`.

`GAME → Cách chơi` mở `HowToPlayModal`, tái sử dụng các chuỗi i18n hiện có cho cả bàn phím lẫn cảm ứng. Modal cố định theo viewport, giữ focus và đóng bằng Escape. Các lớp chuyển động tôn trọng cả cài đặt giảm chuyển động và `prefers-reduced-motion`.

Kiểm tra: `npm run test -- tests/menu-hero.test.tsx`, `npm run smoke`; bổ sung kiểm thử trực quan trên thiết bị nhỏ khi thay đổi layout.
