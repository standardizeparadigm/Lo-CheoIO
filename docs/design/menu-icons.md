# Icon family — `src/components/menu/icons/`

9 icon dùng chung toàn bộ menu góc + modal. Thiết kế một họ **stroke-consistent**:

- `stroke: currentColor`, `strokeWidth: 2`, `strokeLinecap: round`, `strokeLinejoin: round`
- `fill: none` — mọi icon là outline, không fill đặc (trừ `DotIcon` không tồn tại; nếu cần dot dùng `<circle fill>` rời)
- `viewBox="0 0 24 24"` — grid 24, padding thị giác 2px
- `aria-hidden: true` — icon luôn đi kèm text label hoặc `aria-label` ở nút cha
- Mỗi icon một file default-export; `icons/index.ts` barrel re-export + export `IconProps`

## Bảng 9 icon

| Icon | Dùng cho | Hình học |
| --- | --- | --- |
| `PlayIcon` | GAME → Chơi | Tam giác tròn viền |
| `ContinueIcon` | GAME → Chơi tiếp | Nút play + nét ngang "resume" |
| `ModesIcon` | GAME → Chế độ | 2×2 grid rounded |
| `TrophyIcon` | GAME → Bảng xếp hạng | Cúp + chân đế |
| `MedalIcon` | GAME → Thành tựu | Huy chương tròn + dây |
| `GearIcon` | GAME → Cài đặt | Bánh răng 8 răng |
| `InfoIcon` | INFO → Giới thiệu | i trong vòng tròn |
| `ScrollIcon` | INFO → Changelog | Cuộn giấy |
| `DoorIcon` | INFO → Thoát | Cửa + tay nắm |

## Quy tắc thêm icon mới

1. Một file, một default export, tên `FooIcon.tsx`.
2. Kế thừa `base` (import từ `./PlayIcon` không — copy 8 dòng `base` local để icon tự chứa; tránh dependency chéo).
3. Test thị giác: mở cả 9 trên nền `jade-950` ở 24px & 16px — mọi stroke phải rõ, không rung viền (even-width stroke, tròn đầu).
4. Cập nhật bảng này + `src/components/menu/README.md` cùng commit.
