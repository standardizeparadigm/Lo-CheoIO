# 🫙 Trình chạy Lọ Chéo — không cần gõ lệnh

Chỉ cần **nhấn đúp** vào file tương ứng với hệ điều hành của bạn — menu màu đẹp sẽ hiện ra, bạn chọn số rồi nhấn <kbd>Enter</kbd>. Không cần mở Terminal và gõ tay bất kỳ lệnh nào.

| Hệ điều hành | File | Cách mở |
| --- | --- | --- |
| 🍎 **macOS** | [`play-mac.command`](play-mac.command) | Nhấn đúp trong Finder (tự mở Terminal) |
| 🪟 **Windows** | [`play-windows.bat`](play-windows.bat) | Nhấn đúp trong File Explorer (chạy bằng cmd) |
| 🐧 **Linux** | [`play-linux.sh`](play-linux.sh) | Nhấn đúp (chọn *Run* / *Execute* trong trình quản lý file) hoặc `./play-linux.sh` |

> **Linux:** nếu nhấn đúp chỉ mở file bằng trình soạn thảo, hãy cấp quyền chạy một lần:
> ```bash
> chmod +x scripts/play-linux.sh
> ```
> sau đó thử lại, hoặc chạy `bash scripts/play-linux.sh`.

## Yêu cầu

- **Node.js LTS ≥ 20.19** và **npm** ([nodejs.org](https://nodejs.org), `brew install node`, `winget install OpenJS.NodeJS.LTS`, hoặc `sudo apt-get install nodejs npm`).
- Lần chạy đầu file sẽ tự lo phần còn lại.

## Menu có gì

| Mục | Lệnh nền | Tác dụng |
| --- | --- | --- |
| **1) Chơi ngay (Production)** | `npm run build` → mở `dist/index.html` | Build bản tự chứa rồi mở game bằng trình duyệt mặc định |
| **2) Dev mode** | `npm run dev` | Server HMR tại <http://localhost:5173>, sửa code thấy ngay; <kbd>Ctrl</kbd>+<kbd>C</kbd> để dừng |
| **3) Build production** | `npm run build` | Tạo đúng 1 file `dist/index.html` (single-file) |
| **4) Chạy tests** | `npm run test` | vitest — 49 tests |
| **5) Kiểm tra toàn bộ** | `npm run check` | typecheck + tests + build — cổng chất lượng |
| **6) Cài đặt dependencies** | `npm install` | Cài/cập nhật `node_modules` |
| **7) Dọn dẹp** | xoá `node_modules/` và `dist/` | Yêu cầu gõ `YES` để xác nhận; không đụng mã nguồn |
| **8) Thông tin & hướng dẫn** | — | Phiên bản, tác giả, nơi lưu dữ liệu |
| **0) Thoát** | — | Đóng trình chạy |

Các mục **1, 2, 3, 4, 5** tự kiểm tra Node.js và tự chạy `npm install` nếu `node_modules/` chưa tồn tại — bạn không bao giờ phải lo thứ tự bước.

## Ghi chú nền tảng

- **macOS / Linux:** menu dùng mã màu ANSI; terminal nào cũng hiển thị ổn. File `.command` nhờ Finder tự gán vào Terminal.
- **Windows:** menu dùng ANSI escape (Windows 10/11 Terminal/cmd hiển thị màu tốt). Nếu console quá cũ và không hiện màu, menu vẫn chạy bình thường — chỉ là chữ trắng đen. Chữ trong menu Windows cố ý bỏ dấu tiếng Việt để không lỗi font ở locale khác UTF-8.
- Cả 3 file đều tự `cd` về **gốc repo** dù được mở từ đâu, kiểm tra `node`/`npm` và báo lỗi thân thiện nếu thiếu.
