# Hiệu năng & ngân sách render

## Ngân sách hiện tại (giữ nghiêm túc khi chỉnh engine)

| Tài nguyên | Trần | Ghi chú |
| --- | --- | --- |
| Particles | ≤ 460 | splat/lấp lánh/văng nước muối |
| Items rơi cùng lúc | ≤ 70 | trần mềm — spawn rate thấp hơn |
| Popups (text điểm) | ≤ 34 | evict theo tuổi |
| DPR | ≤ 2 | `Math.min(devicePixelRatio, 2)` |
| Frame delta | clamp 1/20s | chống teleport sau tab switch |
| Tile floor | pre-render 1 lần | offscreen canvas, vignette + light pools |

## Tại sao alpha tĩnh mà vẫn nhanh

- `tile-floor` pre-render → mỗi frame chỉ `drawImage`.
- Va chạm: **spatial sweep** theo trục y, không O(n²) toàn cục.
- HUD canvas vẽ trực tiếp — không roundtrip React trong hot loop.
- `requestAnimationFrame` duy nhất, `timeScale` xử lý slow-mo (Đá Lạnh) + hit-stop (freeze 30–90ms mỗi lần hứng đúng — cảm giác "punch").

## Đo đạc nhanh

- Chrome DevTools → Performance → record 10s gameplay → tìm long frames > 16ms.
- `console.time("frame")` quanh loop nếu cần chi tiết hơn.
- Mục tiêu: sustained 60fps trên laptop phổ thông 2019+; DPR 2 không giảm khung.

## Tối ưu single-file

- Font woff2 subset + `font-display: swap` + unicode-range → phần lớn text Latin dùng 1 file.
- Build một file duy nhất (`vite-plugin-singlefile`) — artifact ~766 KB / gzip ~368 KB (v1.1.5).
- Không runtime dependency nào ngoài React/ReactDOM (clsx/tailwind-merge chỉ cho class names).
