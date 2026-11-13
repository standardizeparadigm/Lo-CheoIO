# Phím tắt trong Lọ Chéo

| Phím | Hành động | Ngữ cảnh |
| --- | --- | --- |
| `W` `A` `S` `D` | Di chuyển lọ theo trục | In-game |
| `↑` `←` `↓` `→` | Di chuyển lọ theo trục | In-game |
| `Space` | **SLAM** — sóng xung kích hút/đánh mọi thứ gần lọ | In-game |
| `P` hoặc `Esc` | Tạm dừng / tiếp tục | In-game, Pause |
| `Enter` | Bắt đầu ván mới (menu) / chơi lại (game over) | Menu, Game over |
| `R` | Chơi lại ngay | Game over |
| `M` | Bật/tắt mute toàn bộ âm thanh | Mọi màn hình |
| `Esc` | Đóng modal đang mở (ưu tiên hơn pause) | Modal mở |
| `Tab` / `Shift`+`Tab` | Đi tới/lùi giữa các control — **bị giữ trong modal** từ v1.1.6 | Modal mở |
| `↑` `↓` `←` `→` | Chọn trong bộ chọn 2 lựa chọn (mức rung, chất lượng hình) | Settings |
| `Home` / `End` | Nhảy về lựa chọn đầu / cuối của bộ chọn | Settings |

## Modal chặn phím rò rỉ

Từ v1.1.5, khi một modal đang mở (menu hoặc cài đặt...), toàn bộ phím trên **không** kích hoạt game phía sau — `Modal` chặn `Enter`/`Space`/`P`/`R`/`M` ở capture phase. Nút trong modal vẫn dùng được `Enter`/`Space` như hành vi mặc định của trình duyệt.

## Settings (v1.1.6)

Hộp thoại cài đặt dùng **roving tabindex**: mỗi bộ chọn chỉ có **một** điểm dừng Tab (lựa chọn đang bật),
bên trong di chuyển bằng phím mũi tên — đúng mẫu WAI-ARIA cho nhóm nút. `Home`/`End` nhảy về đầu/cuối.
Focus đi theo lựa chọn nên bấm → liên tục không bị mất dấu.

`Tab` không thể thoát ra canvas phía sau: `useFocusTrap` quấn vòng từ control cuối về control đầu và trả
focus về nút đã mở hộp thoại khi đóng.

## Touch

- **Kéo** bằng 1 ngón: di chuyển lọ.
- **Vuốt chéo nhanh**: CHÉO (lướt tăng tốc chém).
- **Nút SLAM đỏ** ở góc dưới-phải màn hình cảm ứng.
