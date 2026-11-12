# Đóng góp cho Lọ Chéo — Hũ Dưa Đại Chiến

Cảm ơn bạn đã quan tâm tới hũ dưa này! Dưới đây là quy tắc đóng góp ngắn gọn.

## Nguyên tắc vàng

1. **Một file — không mạng — chơi được mãi mãi.** Không thêm dependency runtime nếu không thực sự cần thiết. Game phải chạy offline 100% từ `dist/index.html`.
2. **Đúng hồn Việt mộc mạc**: ngôn ngữ trong game là tiếng Việt, giao diện theo phong cách gạch bông/ẩm thực miền Nam, màu chủ đạo ngọc bích – nghệ – ớt.
3. **Hiệu năng là tính năng**: giữ budget (≤460 particles, ≤70 items, DPR ≤ 2), không re-render React trong hot loop.

## Quy trình

1. Fork repo → tạo branch `arena/<tên>` hoặc `feat/<tên>`.
2. `npm install` rồi `npm run check` (typecheck + 36 tests + build) — tất cả phải xanh.
3. Nếu sửa logic thuần (`modes.ts`, `achievements.ts`, `storage.ts`): thêm/sửa test trong `tests/`.
4. Nếu sửa gameplay/cân bằng: ghi rõ chế độ ảnh hưởng (Cổ điển / Thảnh Thơi / Ớt Lửa) và đính clip trong PR.
5. Không commit `dist/` (đã có trong `.gitignore`) — artifact release được tạo bằng `npm run build`.

## Kiểm thử

- `npm run typecheck` — TypeScript strict, `noUnusedLocals`.
- `npm run test` — vitest.
- `npm run build` — phải ra đúng 1 file `dist/index.html`.

## Báo lỗi

Dùng GitHub Issues, ghi rõ: trình duyệt/OS, chế độ chơi, các bước tái hiện, và kèm console log nếu có.

## License

Đóng góp của bạn được cấp phép AGPL-3.0-only, cùng license với dự án.
