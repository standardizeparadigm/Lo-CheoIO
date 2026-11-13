# Khả năng tiếp cận (a11y)

Trạng thái hiện tại của game về a11y — để contributor biết "đã có gì, thiếu gì".

## Đã có

- **`prefers-reduced-motion`** — v1.1.5: chặn toàn bộ animation/vừng CSS (`animation/transition: none !important`), tắt shimmer/marquee/aurora/bob/corner panels; engine giảm flash (`flashScale 0.25`) và cap screen shake (`trauma ≤ 0.12`); settings có công tắc **Giảm chuyển động** riêng (đôi khi người dùng muốn giảm mà không muốn tắt hết ở OS).
- **Keyboard-first** — mọi action của menu đều qua phím: Tab focus, Enter kích hoạt, Escape đóng modal; in-game: WASD/mũi tên + Space + P.
- **Roles đúng ngữ nghĩa** — modal là `role="dialog" aria-modal="true"`, switch là `role="switch" aria-checked`, nút icon-only đều có `aria-label`, backdrop là `<button aria-label>` riêng.
- **`<html lang>`** đồng bộ khi đổi ngôn ngữ (screen reader đọc đúng giọng đọc).
- **Contra màu** — palette jade/clay/turmeric giữ tỉ lệ đọc tốt trên nền tối; text chính `clay-100` trên `jade-950` ≈ 12:1.
- **`focus-visible`** — viền focus vàng trên nền jade (xem `index.css`).
- **Touch target** ≥ 40px cho mọi nút in-game (pause/mute 40px).

## Còn hạn chế (biết để tránh ngạc nhiên)

- Canvas HUD (điểm số, combo) chưa có text-alternative cho screen reader.
- Không có "reduce flash" riêng — gộp vào reduced motion.
- Chưa test với screen reader thật (NVDA/VoiceOver); mọi kiểm chứng hiện tại là thủ công + SSR smoke.

## Quy ước khi thêm UI mới

1. Nút icon-only → `aria-label` bắt buộc.
2. Modal mới → dùng `Modal` (đã có dialog semantics + Escape + swallow).
3. Toggle → `Switch` (đã có `role="switch"`).
4. Animation mới → thêm vào khối `prefers-reduced-motion` trong `index.css` **cùng commit**.
