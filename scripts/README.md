# 🫙 Trình chạy Lọ Chéo — không cần gõ lệnh

Chỉ cần **nhấn đúp** file tương ứng với hệ điều hành của bạn — menu màu **nhiều màu, có hoạt ảnh** sẽ hiện ra; bạn **chọn số** rồi nhấn <kbd>Enter</kbd>. Không cần mở Terminal và gõ tay bất kỳ lệnh nào.

| Hệ điều hành | File | Cách mở |
| --- | --- | --- |
| 🍎 **macOS** | [`play-mac.command`](play-mac.command) | Nhấn đúp trong Finder (tự mở Terminal) |
| 🪟 **Windows** | [`play-windows.bat`](play-windows.bat) | Nhấn đúp trong File Explorer (chạy bằng cmd) |
| 🐧 **Linux** | [`play-linux.sh`](play-linux.sh) | Nhấn đúp (chọn *Run* / *Execute*) hoặc `./play-linux.sh` |

> **Linux:** nếu nhấn đúp chỉ mở file bằng trình soạn thảo, hãy cấp quyền chạy một lần:
> ```bash
> chmod +x scripts/play-linux.sh
> ```
> sau đó thử lại, hoặc chạy `bash scripts/play-linux.sh`.

## 🌐 Đa ngôn ngữ — đổi ngay trong menu bằng phím `L`

| Ngôn ngữ | Ghi chú |
| --- | --- |
| 🇻🇳 **Tiếng Việt (gốc, có dấu đầy đủ)** | Mặc định — root language |
| 🇬🇧 **English** | Available instantly |
| 🇨🇳 **中文** | 按 `L` 键切换 |

- Thứ tự chuyển: **VI → EN → 中文 → VI**…
- Tự nhận theo locale của máy (`$LANG` / Windows UI) nếu có; mặc định luôn là **Tiếng Việt**.
- Ép ngôn ngữ bằng biến môi trường: `LOCHEO_LANG=vi` / `LOCHEO_LANG=en` / `LOCHEO_LANG=zh` (ví dụ `LOCHEO_LANG=en ./scripts/play-linux.sh`).

## ✨ Hoạt ảnh & hiệu ứng

- **Banner nhấp nháy** 3 khung màu (vàng → vàng sáng → hồng) khi vào menu — Terminal thật sẽ thấy khung đổi màu mượt.
- **Spin-loader braille** (⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏) kèm **% tiến trình thật** khi build production (chạy nền, không treo terminal).
- **Sparkle line** `✦ ·˚ ·✦…` trang trí menu; khung viền vàng double-line.
- Mọi thông báo đều có emoji/biểu tượng (▶ 🛠 📦 🧪 ✅ 📥 🧹 ℹ️ 🚪) và màu sắc riêng theo trạng thái (vàng=hành động, xanh lá=thành công, đỏ=lỗi, cyan=thông tin).

## Yêu cầu

- **Node.js LTS ≥ 20.19** và **npm** ([nodejs.org](https://nodejs.org), `brew install node`, `winget install OpenJS.NodeJS.LTS`, hoặc `sudo apt-get install nodejs npm`).
- Lần chạy đầu file sẽ tự lo phần còn lại.

## Menu có gì

| Mục | Lệnh nền | Tác dụng |
| --- | --- | --- |
| **1) Chơi ngay (Production)** | `npm run build` → mở `dist/index.html` | Build bản tự chứa rồi mở game bằng trình duyệt mặc định |
| **2) Dev mode** | `npm run dev` | Server HMR tại <http://localhost:5173>; <kbd>Ctrl</kbd>+<kbd>C</kbd> để dừng |
| **3) Build production** | `npm run build` | Tạo đúng 1 file `dist/index.html` (single-file) |
| **4) Chạy tests** | `npm run test` | vitest — **55 tests** |
| **5) Kiểm tra toàn bộ** | `npm run check` | typecheck + tests + build — cổng chất lượng |
| **6) Cài đặt dependencies** | `npm install` | Cài/cập nhật `node_modules` |
| **7) Dọn dẹp** | xoá `node_modules/` và `dist/` | Yêu cầu gõ `YES` để xác nhận; không đụng mã nguồn |
| **8) Thông tin & hướng dẫn** | — | Phiên bản v1.1.3, tác giả, nơi lưu dữ liệu |
| **0) Thoát** | — | Đóng trình chạy |
| **L) Đổi ngôn ngữ** | — | VI ⇄ EN ⇄ 中文 (hint hiển thị ngay cạnh mục 0) |

Các mục **1, 2, 3, 4, 5** tự kiểm tra Node.js và tự chạy `npm install` nếu `node_modules/` chưa tồn tại — bạn không bao giờ phải lo thứ tự bước.

## Ghi chú nền tảng

- **macOS / Linux:** menu dùng mã màu ANSI + clear-screen; terminal nào cũng hiển thị ổn. File `.command` nhờ Finder tự gán vào Terminal.
- **Windows:** menu dùng `chcp 65001` (UTF-8) nên **tiếng Việt có dấu hiển thị đầy đủ**, ANSI colors bật sẵn trên Windows 10/11 (Terminal & cmd). Trên console đời cũ không hiện màu, menu vẫn chạy bình thường.
- Cả 3 file đều tự `cd` về **gốc repo** dù được mở từ đâu, kiểm tra `node`/`npm` và báo lỗi thân thiện (VI/EN/中文) nếu thiếu.
- Nội dung hiển thị gốc là **Tiếng Việt có dấu**; hai bản dịch EN/ZH tương đương 100% về mặt chức năng.
