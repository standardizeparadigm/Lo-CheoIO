# Troubleshooting — các sự cố thường gặp

## Game không mở / màn hình đen

1. Thử **trình duyệt khác** (Chrome/Edge/Firefox/Safari bản gần đây — game cần ES2020+).
2. Xóa **bộ nhớ đệm** và tải lại (`Ctrl/Cmd+Shift+R`).
3. Kiểm tra console (F12 → Console) — nếu có lỗi đỏ, chụp lại và báo issue kèm `npm run check` output.
4. Game **offline hoàn toàn** — nếu máy mất mạng game vẫn chạy; nếu copy `dist/index.html` từ máy khác sang, đảm bảo file copy **nguyên vẹn** (1 file duy nhất, không cần folder assets).

## Không nghe được âm thanh

1. Browser chặn audio cho đến khi có **tương tác người dùng** — hãy bấm một nút (Chơi/phím bất kỳ) một lần.
2. Kiểm tra công tắc **âm thanh** trong Cài đặt (trong game) và nút **M** (mute toàn cục).
3. Nhạc nền vs SFX là 2 cổng riêng — một trong hai có thể bị tắt.
4. Mở đầu ván (hoặc Resume) game tự gọi `audio.unlock()` — cần ít nhất một lần click/tap trước đó.

## «Chơi tiếp» không bật

- Nút này chỉ sáng khi `localStorage["locheo.run.v1"]` tồn tại — tức bạn đã từng **rời màn giữa chừng** (pause → menu).
- Ván **kết thúc** (game over) hoặc **bắt đầu ván mới** sẽ xóa snapshot — «Chơi tiếp» đúng là không còn gì để tiếp.
- Chế độ **private/incognito** hoặc storage bị chặn → không lưu được giữa phiên — đây là giới hạn cố hữu, không phải bug.

## Điểm / thành tựu mất sạch

- Kiểm tra bạn có bấm **«Xóa dữ liệu đã lưu»** trong Cài đặt không (vùng nguy hiểm, 2 bước xác nhận).
- Second device / profile trình duyệt khác → dữ liệu nằm ở máy đó, không sync đám mây.
- `localStorage` bị xóa tự động (một số trình duyệt dọn khi hết dung lượng/incognito).

## Launcher (double-click) lỗi trên Windows

- Nếu thấy lỗi font/chữ lạ: đảm bảo dùng bản `.bat` **mới nhất** (CRLF + UTF-8 BOM từ v1.1.4).
- `chcp 65001` đã được đặt sẵn trong launcher — không xóa dòng đó.
- Vẫn lỗi → chạy trực tiếp: `npx vite preview` sau `npm run build` để xác nhận game chạy bình thường ở trình duyệt; sau đó báo issue launcher.

## Build fail với `vite-plugin-singlefile`

- `npm ci` lại từ đầu (lockfile có thể lệch sau khi pull).
- Node **≥ 20** (CI dùng 22 — xem `.nvmrc`).
- Xóa `dist/` rồi build lại.
