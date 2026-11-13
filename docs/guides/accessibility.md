# Khả năng tiếp cận (a11y)

Trạng thái hiện tại của game về a11y — để contributor biết "đã có gì, thiếu gì".

## Đã có

- **`prefers-reduced-motion`** — v1.1.5: chặn toàn bộ animation/vừng CSS (`animation/transition: none !important`), tắt shimmer/marquee/aurora/bob/corner panels; engine giảm flash (`flashScale 0.25`) và cap screen shake (`trauma ≤ 0.12`); settings có công tắc **Giảm chuyển động** riêng (đôi khi người dùng muốn giảm mà không muốn tắt hết ở OS).
- **Keyboard-first** — mọi action của menu đều qua phím: Tab focus, Enter kích hoạt, Escape đóng modal; in-game: WASD/mũi tên + Space + P.
- **Focus trap v1.1.6** — `useFocusTrap` giữ Tab/Shift+Tab trong modal, nhớ phần tử đã focus trước khi mở và
  trả lại khi đóng. Trước đó Tab đi thẳng ra canvas phía sau.
- **Segmented control v1.1.6** — `role="group"` + `aria-labelledby`, `aria-pressed`, roving tabindex,
  ←/→/↑/↓/Home/End và focus đi theo lựa chọn.
- **OS defaults v1.1.6** — lần chạy đầu đọc `prefers-reduced-motion` để bật sẵn *Giảm chuyển động*;
  `prefers-contrast: more` gắn `data-contrast="more"` lên `<html>` và CSS nâng độ tương phản chữ mờ.
- **Canvas có nhãn** — `role="img"` + `aria-label` (thương hiệu + phím điều khiển) thay vì canvas câm.
- **Roles đúng ngữ nghĩa** — modal là `role="dialog" aria-modal="true"`, switch là `role="switch" aria-checked`, nút icon-only đều có `aria-label`, backdrop là `<button aria-label>` riêng.
- **`<html lang>`** đồng bộ khi đổi ngôn ngữ (screen reader đọc đúng giọng đọc).
- **Contra màu** — palette jade/clay/turmeric giữ tỉ lệ đọc tốt trên nền tối; text chính `clay-100` trên `jade-950` ≈ 12:1.
- **`focus-visible`** — viền focus vàng trên nền jade (xem `index.css`).
- **Touch target** ≥ 40px cho mọi nút in-game (pause/mute 40px).

## Còn hạn chế (biết để tránh ngạc nhiên)

- Canvas HUD (điểm số, combo) **vẫn** chưa có text-alternative đầy đủ cho screen reader — canvas chỉ được
  gắn `role="img"` + `aria-label` mô tả game và phím điều khiển (v1.1.6), không đọc được điểm số trực tiếp.
- Không có "reduce flash" riêng — gộp vào reduced motion.
- Chưa test với screen reader thật (NVDA/VoiceOver); mọi kiểm chứng hiện tại là thủ công + SSR smoke.

## Quy ước khi thêm UI mới

1. Nút icon-only → `aria-label` bắt buộc.
2. Modal mới → dùng `Modal` (đã có dialog semantics + Escape + swallow).
3. Toggle → `Switch` (đã có `role="switch"`).
4. Animation mới → thêm vào khối `prefers-reduced-motion` trong `index.css` **cùng commit**;
   animation chạy trong scene canvas thì thêm selector vào khối `[data-reduced-motion="true"]` (settings.reducedMotion).
5. Nhóm lựa chọn 2 chiều → dùng `SegmentedControl` (đã có roving tabindex), đừng tự viết lại.
6. Mọi chuỗi hiển thị → key trong `src/i18n/locales/*.ts` ×7, và chạy `npm run check:i18n`.
