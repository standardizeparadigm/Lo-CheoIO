<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Hũ Dưa Đại Chiến" width="100%" />

# LỌ CHÉO — HŨ DƯA ĐẠI CHIẾN

### 🫙 Arcade muối dưa chạy 100% trong trình duyệt — một file HTML duy nhất, offline-first

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md)

[![Version](https://img.shields.io/badge/version-1.1.0-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.0.md)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-cài-đặt--chạy)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-build-production)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

</div>

---

## 🥒 Về dự án

> Lọ Chéo — Hũ Dưa Đại Chiến: arcade muối dưa chạy 100% trong trình duyệt, gói gọn trong một file HTML duy nhất, offline-first — không CDN, không server. Chiếc lọ gốm chỉ chịu đi đường CHÉO: giữ 2 phím để lượn xiên, tăng tốc chém tan mốc, ruồi, sâu rau, hứng đầy hũ trước khi gốm nứt làm ba. 3 chế độ chơi, 14 nguyên liệu, 10 thành tựu, bảng vàng TOP 8.

Đây là tựa **arcade hành động một màn hình** lấy cảm hứng từ hũ dưa món quê Việt Nam. Không có level tuyến tính, không có màn hình menu loằng ngoằng — chỉ có cái lọ, trận mưa dưa bất tận và phản xạ cháy rực của bạn.

## ✨ Tính năng nổi bật

| Nhóm | Chi tiết |
| --- | --- |
| 🎮 **3 chế độ chơi** | **MUỐI DƯA CỔ ĐIỂN** (cân bằng) · **THẢNH THƠI** (không đồ hư, ×0.5 điểm) · **ỚT LỬA** (nhanh +35%, ×1.5 điểm) |
| 🕹️ **Cơ chế CHÉO độc quyền** | Giữ 2 phím/trục chéo — lọ tăng tốc, phát sáng, chém tan đồ hư. Có thanh stamina riêng với hysteresis chống nhấp nháy |
| 🥬 **14 nguyên liệu** | Cà pháo, ớt, tỏi, gừng, muối, cải, **CẢI VÀNG** (làm đầy hũ cực nhanh) · MUỐI/TỎI VÀNG · ỚT HIỂM · ĐÁ LẠNH · MỐC, RUỒI, **SÂU RAU** (hazard) |
| 🧄 **Khiên Tỏi Vàng** | Power-up mới: tích tối đa **2 lớp khiên** chặn vết nứt, vòng hào quang xoay quanh lọ |
| 🏆 **10 thành tựu** | Lưu **cộng dồn qua các ván** (localStorage), toast "THÀNH TỰU MỚI!" ở màn thua, bảng thành tựu trên menu |
| 🔊 **Âm thanh thủ công** | 11 hiệu ứng Web Audio API tổng hợp thuần (không file) + nền pentatonic đổi tông theo cấp, mute bằng `M` |
| 💾 **Bảng vàng TOP 8** | Điểm lưu cục bộ, validate & chuẩn hoá khi đọc, tên tự viết hoa, highlight dòng vừa lập kỷ lục |
| 🎨 **Đồ hoạ 60fps** | Canvas 2D, particle budget 460, DPR cap 2, nền gạch bông vẽ trước ra offscreen canvas, star twinkle + aurora menu |
| 📴 **Offline-first thật sự** | Fonts tự host (subset latin + vietnamese, woff2), không CDN, không API — mở `dist/index.html` là chơi |

## 🕹️ Điều khiển

| Hành động | Bàn phím | Cảm ứng |
| --- | --- | --- |
| Di chuyển | `W` `A` `S` `D` hoặc `← ↑ ↓ →` | Kéo ngón tay bất kỳ đâu trên màn hình (joystick nổi) |
| **Chéo (CHÉO)** | Giữ **2 phím cùng lúc** (vd. `A`+`W`) | Kéo **chéo 45°** — vòng joystick chuyển vàng |
| Lắc hũ (shockwave + hút đồ) | `Space` | Nút **LẮC** đỏ góc phải dưới |
| Tạm nghỉ / tiếp tục | `P` hoặc `Esc` | Nút pause góc trên phải |
| Chơi lại ngay | `R` (kể cả khi đang pause/game over) | Nút "Muối lại ngay" |
| Bắt đầu / xác nhận | `Enter` | Nút **VÀO BẾP** |
| Tắt / bật âm | `M` | Nút loa góc trên phải |

## 🚀 Cài đặt & chạy

### Chơi ngay (không cần build)

```bash
# mọi bản release đều đính kèm một file duy nhất:
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### Build production

```bash
npm install        # cài dependencies (Node ≥ 20.19)
npm run build      # → dist/index.html (một file tự chứa mọi thứ)
```

> `vite-plugin-singlefile` inline toàn bộ JS/CSS/fonts/ảnh vào **một** file `dist/index.html` (~640 KB, gzip ~330 KB). Không cần server, không cần mạng.

### Development

```bash
npm run dev        # dev server với HMR (http://localhost:5173)
npm run preview    # xem thử bản build bằng server tĩnh
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 36 unit tests cho modes / achievements / storage
npm run check      # typecheck + test + build (cổng chất lượng ci)
```

## 🗂️ Cấu trúc project

```
lo-cheoio/
├─ index.html              # entry, meta SEO/OG (không CDN)
├─ package.json            # lo-cheoio v1.1.0, scripts dev/build/test/check
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; include src + tests
├─ assets/
│  └─ banner.svg           # banner README (SMIL animation)
├─ docs/
│  ├─ DESCRIPTION.md       # mô tả 351 ký tự (vi/en/zh) + nơi dùng
│  └─ releases/
│     ├─ v1.0.0.md         # release notes bản đầu tiên
│     └─ v1.1.0.md         # release notes bản hiện tại
├─ public/                 # (trống — không asset mạng)
├─ src/
│  ├─ main.tsx             # React root, StrictMode
│  ├─ App.tsx              # phase machine menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.0" (nguồn duy nhất)
│  ├─ index.css            # tailwind v4 theme + toàn bộ animation/gradient
│  ├─ assets/fonts/        # woff2 subset (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, offline 100%
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # canvas + joystick nổi + bàn phím + visibility
│  │  ├─ StartScreen.tsx   # menu: aurora, shimmer, chọn chế độ, thành tựu
│  │  ├─ ModeSelector.tsx  # 3 thẻ chế độ (gradient, accent theo mode)
│  │  ├─ AchievementsPanel.tsx  # tường 10 huy hiệu locked/unlocked
│  │  ├─ GameOverScreen.tsx     # VỠ HŨ! + điểm + new achievements
│  │  ├─ PauseScreen.tsx        # TẠM NGHỈ + stats ván
│  │  └─ ui.tsx            # GameButton, Panel, Keycap, Stat, ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # toàn bộ simulation + render canvas (~2100 dòng)
│  │  ├─ modes.ts          # chế độ chơi + công thức cân bằng (pure)
│  │  ├─ achievements.ts   # 10 huy hiệu + checker thuần (pure)
│  │  ├─ storage.ts        # localStorage: top 8, progress, achievements
│  │  └─ audio.ts          # Web Audio synth: sfx + pentatonic music
│  └─ utils/cn.ts          # clsx + tailwind-merge
└─ tests/                  # vitest — modes, achievements, storage
```

## 🧱 Kiến trúc & hiệu năng

- **Vòng lặp game** trên `requestAnimationFrame` với delta-time kẹp `1/20s`, nhân `timeScale` (slow-mo khi ĐÁ LẠNH) và **hit-stop** `freeze` vài chục ms trên mỗi catch để cảm giác "nện".
- **Canvas HUD** vẽ trực tiếp mỗi frame; React chỉ render các màn hình theo `phase` — không re-render React trong hot loop.
- **Nền gạch bông** pre-render một lần ra offscreen canvas (kèm vignette + pool ánh sáng), star twinkle và bubble tính theo thời gian thực, rất rẻ.
- **Budget**: ≤460 particles, ≤70 items, ≤34 popups, DPR ≤ 2; va chạm quét theo hitbox; decal dưa văng trên nền tự dọn.
- **localStorage** với validate/chuẩn hoá đầu vào — 1 bản ghi lỗi không làm hỏng cả bảng; storage bị chặn (Safari private) thì chơi tiếp bộ nhớ.
- **Giảm chấn motion**: `prefers-reduced-motion` tắt aurora/shimmer/spin; sao nền và shake đều có thể tắt theo media query.

## 📦 Releases & changelog

| Phiên bản | Ngày | Ghi chú |
| --- | --- | --- |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3 chế độ chơi · Khiên Tỏi Vàng · Sâu Rau · Cải Vàng · 10 thành tựu · README 3 ngôn ngữ · offline 100% · sửa 6 lỗi logic |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | Phát hành đầu tiên: engine hoàn chỉnh, 11 nguyên liệu, LẮC HŨ, combo ×9, bảng vàng TOP 8 |

Xem thêm [CHANGELOG.md](CHANGELOG.md).

## 🤝 Đóng góp

1. Fork repo, tạo branch theo quy ước `arena/<tên>` hoặc `feat/<tên>`.
2. `npm run check` phải xanh trước khi mở PR (typecheck + 36 tests + build).
3. Không thêm dependency runtime nếu không thực sự cần — triết lý: **một file, không mạng, chơi được mãi mãi**.
4. Mô tả PR ghi rõ chế độ/màn hình bị ảnh hưởng và kèm clip nếu thay đổi gameplay.

## 📄 License & tác giả

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — xem [LICENSE](LICENSE).
- Fonts: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (subset woff2 tự host).
- Vòng tay ôm dịu dàng gửi tới những hũ dưa trên khắp các mâm cơm Việt Nam. 🫙🇻🇳
