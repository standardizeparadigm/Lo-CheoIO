# Thiết kế: nền menu nhiều lớp (v1.1.6)

Menu v1.1.6 không dùng ảnh nền — **toàn bộ scene là CSS thuần**, xếp lớp từ xa tới gần, mỗi lớp có
tốc độ và chu kỳ riêng để mắt không bắt được "vòng lặp". Mục tiêu: menu **sống** nhưng không tranh
chấp sự chú ý với hai panel góc và nút CHƠI.

## Thứ tự lớp (z thấp → z cao)

| # | Lớp | Class (`src/index.css`) | Chuyển động | Chu kỳ |
| --- | --- | --- | --- | --- |
| 1 | Nền gradient tĩnh | `aurora-bg` | gradient không animate, làm nền tương phản | — |
| 2 | Tinh vân trôi | `nebula-a` · `nebula-b` | `lc-nebula-a` / `lc-nebula-b` — dịch + phóng nhẹ, ngược chiều nhau | 19 s / 26 s |
| 3 | Tia sáng chéo | `light-ray` | `lc-ray` — xoay rất chậm, opacity thở | 34 s |
| 4 | Sao xa | `star-field-far` | `lc-twinkle` chậm, mờ | 6 s |
| 5 | Sao gần | `star-field` | `lc-twinkle` nhanh hơn, sáng hơn | 3.4 s |
| 6 | Sàn gạch | `tile-floor` + `tile-floor-mask` | trôi dọc, mask mờ dần về đỉnh | 12 s |
| 7 | Vòng sáng quanh lọ | `glow-ring` · `jar-glow` | `lc-ring-rotate` + `lc-jar-glow` | 22 s / 4.5 s |
| 8 | Vệt sáng nút CHƠI | `cta-shine` (qua `MenuItemButton shine`) | `lc-cta-shine` — vệt trắng chạy ngang | 3.2 s |

## Quy tắc

1. **Chỉ `transform` + `opacity`** — không animate `width/height/top/left` (layout thrash trên máy yếu).
2. **Chu kỳ nguyên tố lệch nhau** (19/26/34/6/3.4/12/22/4.5) — không có bội số chung nhỏ nên mắt không
   nhận ra điểm lặp.
3. **Mọi lớp đều `pointer-events-none`** — không bao giờ chặn click của panel góc.
4. **`prefers-reduced-motion`** tắt sạch: mỗi class animation đều nằm trong khối `@media` ở cuối `index.css`.
   Thiếu một class ở đó là bug — xem checklist trong `docs/guides/accessibility.md`.
5. **Giới hạn GPU**: 8 lớp là mức trần. Thêm lớp thứ 9 phải bỏ một lớp cũ hoặc chứng minh được 60 fps
   trên máy tham chiếu (xem `docs/guides/performance.md`).

## Vì sao không dùng canvas/video?

- Canvas đã dành cho gameplay — thêm một vòng `requestAnimationFrame` cho menu là lãng phí pin.
- Video nền phá cam kết **single-file, offline, 0 asset ngoài**: bundle sẽ phình lên hàng MB.
- CSS thuần ở đây chỉ tốn ~4 KB trong bundle đã build (đo bằng `dist/index.html` trước/sau).

## Liên quan

- `docs/design/menu-icons.md` — bộ icon của panel góc.
- `docs/design/menu-corners.md` — bố cục hai panel GAME/INFO.
