<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Hũ Dưa Đại Chiến" width="100%" />

# LỌ CHÉO — HŨ DƯA ĐẠI CHIẾN

### 🫙 Arcade muối dưa chạy 100% trong trình duyệt — một file HTML duy nhất, offline-first
### 🌐 Giao diện 7 ngôn ngữ ngay trong game — Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.6-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.6.md)
[![CI](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml/badge.svg)](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-cài-đặt--chạy)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-build-production)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO%20%C2%B7%20ES%20%C2%B7%20FR-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-chuyển-ngôn-ngữ)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Demo Lọ Chéo — lọ lướt chéo, hứng dưa, chém mốc" width="100%" />

<img src="assets/languages.svg" alt="7 ngôn ngữ trong game — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

</div>

---

## 🥒 Về dự án

> Lọ Chéo — Hũ Dưa Đại Chiến: arcade muối dưa chạy 100% trong trình duyệt, gói gọn trong một file HTML duy nhất, offline-first — không CDN, không server. Chiếc lọ gốm chỉ chịu đi đường CHÉO: giữ 2 phím để lượn xiên, tăng tốc chém tan mốc, ruồi, sâu rau, hứng đầy hũ trước khi gốm nứt làm ba. **9 chế độ chơi · 14 nguyên liệu · 16 thành tựu · bảng vàng TOP 8 · giao diện 7 ngôn ngữ.**

Đây là tựa **arcade hành động một màn hình** lấy cảm hứng từ hũ dưa món quê Việt Nam. Không có level tuyến tính, không có màn hình menu loằng ngoằng — chỉ có cái lọ, trận mưa dưa bất tận và phản xạ cháy rực của bạn.

<img src="assets/divider.svg" alt="" width="100%" />

## 🆕 Mới trong v1.1.6

- ⚙️ **Cài đặt chia 6 mục** — **Cấu hình nhanh** · **Âm thanh** · **Giao diện & chuyển động** · **Ngôn ngữ** · **Sao lưu** · **Dữ liệu** — ba kiểu điều khiển: công tắc bật/tắt, bộ chọn 2 lựa chọn, mức 0–100.
- 🔊 **Điều khiển thật, không còn chỉ bật/tắt** — âm lượng SFX và nhạc **0–100** (thanh 10 vạch nghiêng), **mức rung** nhẹ/mạnh, **chất lượng hình** thấp/cao (trần hạt 230 vs 460, tắt phát sáng), **tự tạm dừng khi đổi tab**.
- 🌐 **Ngôn ngữ dời hẳn vào Cài đặt** — bỏ nút nổi góc phải ở menu và thanh chọn ở màn tạm dừng; nay là lưới 2 cột 7 ngôn ngữ (cờ · tên bản ngữ · dấu check).
- 🎛️ **4 preset một chạm + sao lưu JSON** — **MƯỢT** · **CÂN BẰNG** · **ĐIỆN ẢNH** · **SPEEDRUN** (không bao giờ đổi ngôn ngữ) và xuất/nhập cấu hình để mang sang máy khác.
- ✨ **Menu là sân khấu** — tinh vân trôi, tia sáng thở, **2 lớp sao nhấp nháy**, vòng sáng xoay quanh lọ, quầng sáng lọ, vệt sáng chạy qua nút CHƠI; mục **giới thiệu tác giả** có viền gradient chạy vòng vô hạn.
- 🐛 **Sửa 5 lỗi thật** — nhạc nền phát to hơn mức đã đặt sau khi tải lại trang · Tab thoát khỏi modal · gợi ý changelog ghi cứng v1.1.5 · `updateSettings` trả giá trị chưa chuẩn hoá · focus không được giữ trong hộp thoại.
- 🧪 **150 unit tests** (18 file, tăng từ 113/14) — thêm test cho schema cài đặt, preset, sao lưu và phép tính âm lượng.

<img src="assets/settings-sections.svg" alt="Cài đặt v1.1.6 — 6 mục với công tắc, thanh mức và bộ chọn (hoạt họa SMIL)" width="100%" />

<img src="assets/corner-menu.svg" alt="Panel GAME (góc dưới-trái) & INFO (góc dưới-phải) trượt vào (hoạt họa SMIL)" width="100%" />

→ Chi tiết đầy đủ: [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md)

→ Bản trước: [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md)

## ✨ Tính năng nổi bật

| Nhóm | Chi tiết |
| --- | --- |
| 🎮 **9 chế độ chơi** | **MUỐI DƯA CỔ ĐIỂN** (cân bằng) · **THẢNH THƠI** (không đồ hư, ×0.5) · **ỚT LỬA** (nhanh +35%, ×1.5) · **ĐUA 60 GIÂY** (time-attack 60s, ×1.25) · **MÙA VÀNG** (đồ vàng ×2.6) · **MƯA DƯA** (dày ~1.4×, ×0.75) · **GỐM MỎNG** (1 vết nứt là vỡ, ×2.0) · **LỄ HỘI COMBO** (cửa sổ combo ×2, ×1.15) · **ĐẠI TIỆC DƯA** (dưa dày ~×2, hũ thưởng ×2.5, ×0.6) |
| 🌐 **i18n trong game** | Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français — `src/i18n/` (module thuần + context), `t()` có interpolation, đồng bộ `<html lang>`, số theo locale (vi-VN / en-US / zh-CN / ja-JP / ko-KR / es-ES / fr-FR) |
| 🕹️ **Cơ chế CHÉO độc quyền** | Giữ 2 phím/trục chéo — lọ tăng tốc, phát sáng, chém tan đồ hư. Có thanh stamina riêng với hysteresis chống nhấp nháy |
| 🥬 **14 nguyên liệu** | Cà pháo, ớt, tỏi, gừng, muối, cải, **CẢI VÀNG** (làm đầy hũ cực nhanh) · MUỐI/TỎI VÀNG · ỚT HIỂM · ĐÁ LẠNH · MỐC, RUỒI, **SÂU RAU** (hazard) |
| 🧄 **Khiên Tỏi Vàng** | Power-up: tích tối đa **2 lớp khiên** chặn vết nứt, vòng hào quang xoay quanh lọ |
| 🏆 **16 thành tựu** | Lưu **cộng dồn qua các ván** (localStorage), toast "THÀNH TỰU MỚI!" ở màn thua |
| 🔊 **Âm thanh thủ công** | 11 hiệu ứng Web Audio API tổng hợp thuần (không file) + nền pentatonic đổi tông theo cấp, mute bằng `M` |
| 💾 **Bảng vàng TOP 8** | Điểm lưu cục bộ, validate & chuẩn hoá khi đọc, tên tự viết hoa, highlight dòng vừa lập kỷ lục |
| 🎨 **Đồ hoạ 60fps** | Canvas 2D, particle budget 460, DPR cap 2, nền gạch bông pre-render offscreen, star twinkle + aurora menu |
| 📴 **Offline-first thật sự** | Fonts tự host (subset latin + vietnamese, woff2), không CDN, không API — mở `dist/index.html` là chơi |
| 🧪 **Chất lượng** | 150 unit tests (vitest) cho modes / achievements / storage / i18n / settings — `npm run check` là cổng CI |

<img src="assets/items.svg" alt="14 nguyên liệu Lọ Chéo — nhóm hứng, nhóm power, nhóm né" width="100%" />

## 🌐 Chuyển ngôn ngữ

Lọ Chéo hỗ trợ **7 ngôn ngữ giao diện** ngay trong game — không cần tải lại trang, không mất ván đang chơi:

<img src="assets/languages.svg" alt="7 ngôn ngữ — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

| Ngôn ngữ | Ở đâu | Lưu vào |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | nút **VI** (mặc định, theo trình duyệt nếu có) | `locheo.lang.v1` |
| 🇬🇧 English | nút **EN** | `locheo.lang.v1` |
| 🇨🇳 中文 | nút **中** | `locheo.lang.v1` |
| 🇯🇵 日本語 | nút **日** | `locheo.lang.v1` |
| 🇰🇷 한국어 | nút **한** | `locheo.lang.v1` |
| 🇪🇸 Español | nút **ES** | `locheo.lang.v1` |
| 🇫🇷 Français | nút **FR** | `locheo.lang.v1` |

- Đổi ngôn ngữ trong **Cài đặt → NGÔN NGỮ** (lưới 7 nút có cờ) — một chỗ duy nhất, không còn nút nổi ngoài menu.
- Toàn bộ chuỗi hiển thị đều qua dictionary `src/i18n/locales/{vi,en,zh,ja,ko,es,fr}.ts` — engine canvas, màn hình, HUD, popup, ticker, mẹo.
- Thiếu key? `t()` tự fallback về tiếng Việt — key set 7 locale luôn được test đồng bộ (placeholder included).

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
| Đổi ngôn ngữ | — (dùng nút VI/EN/中/日/한/ES/FR) | Nút VI/EN/中/日/한/ES/FR ở menu / pause |

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

> `vite-plugin-singlefile` inline toàn bộ JS/CSS/fonts/ảnh vào **một** file `dist/index.html` (~700 KB, gzip ~355 KB). Không cần server, không cần mạng.

### Development

```bash
npm run dev        # dev server với HMR (http://localhost:5173)
npm run preview    # xem thử bản build bằng server tĩnh
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 150 unit tests (modes / achievements / storage / i18n / settings)
npm run check      # typecheck + test + build (cổng chất lượng ci)
```

## 🗂️ Cấu trúc project

```
lo-cheoio/
├─ index.html              # entry, meta SEO/OG (không CDN)
├─ package.json            # lo-cheoio v1.1.6, scripts dev/build/test/check
├─ .gitattributes          # *.bat/*.cmd → CRLF · posix scripts → LF · binary
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; include src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # banner README (SMIL animation)
│  ├─ demo.svg             # mô phỏng gameplay (SMIL animation)
│  ├─ items.svg            # 14 nguyên liệu (SMIL animation)
│  ├─ modes.svg            # 9 chế độ chơi (SMIL animation)
│  ├─ languages.svg        # 7 ngôn ngữ trong game (SMIL animation)
│  ├─ new-modes.svg        # 2 chế độ mới v1.1.4 (SMIL animation)
│  ├─ corner-menu.svg     # corner GAME/INFO panels (SMIL animation, v1.1.5)
│  ├─ settings-sections.svg # 6-section settings tour (SMIL, v1.1.6)
│  ├─ divider.svg          # divider lóe sáng (SMIL animation)
│  ├─ license.svg          # dấu AGPL-3.0 copyleft (SMIL animation)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # trình chạy macOS — 7 ngôn ngữ, menu màu có hoạt ảnh
│  ├─ play-windows.bat     # trình chạy Windows — CRLF + UTF-8 BOM, 7 ngôn ngữ
│  ├─ play-linux.sh        # trình chạy Linux — 7 ngôn ngữ, menu màu có hoạt ảnh
│  ├─ smoke-ssr.tsx        # headless SSR smoke toàn bộ menu/modal (v1.1.5)
│  ├─ check-readme-sync.mjs # gate lệch version giữa 10 README (CI) (v1.1.5)
│  └─ README.md            # hướng dẫn trình chạy cho người không rành terminal
├─ docs/
│  ├─ README.md            # mục lục toàn bộ tài liệu (v1.1.5)
│  ├─ DESCRIPTION.md       # mô tả dự án đa ngôn ngữ (vi/en/zh + SEO)
│  ├─ design/              # spec menu-corners / save-format / settings-format
│  ├─ guides/              # engine overview · a11y · performance · storage keys · release playbook…
│  └─ releases/
│     ├─ v1.0.0.md         # release notes bản đầu tiên
│     ├─ v1.1.0.md         # release notes v1.1.0
│     ├─ v1.1.1.md         # release notes v1.1.1
│     ├─ v1.1.2.md         # release notes v1.1.2
│     ├─ v1.1.3.md         # release notes v1.1.3
│     ├─ v1.1.4.md         # release notes (1.1.4)
│     ├─ v1.1.5.md         # release notes (1.1.5)
│     └─ v1.1.6.md         # current release notes (1.1.6)
├─ README.md               # 🇻🇳 Tiếng Việt (file này)
├─ README.en.md            # 🇬🇧 English
├─ README.zh.md            # 🇨🇳 中文
├─ README.ja.md            # 🇯🇵 日本語
├─ README.ko.md            # 🇰🇷 한국어
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français
├─ README.th.md            # 🇹🇭 ไทย
├─ README.de.md            # 🇩🇪 Deutsch
├─ README.pt.md            # 🇵🇹 Português
├─ src/
│  ├─ main.tsx             # React root, StrictMode
│  ├─ App.tsx              # phase machine menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.6" (nguồn duy nhất)
│  ├─ index.css            # tailwind v4 theme + toàn bộ animation/gradient
│  ├─ assets/fonts/        # woff2 subset (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, offline 100%
│  ├─ i18n/
│  │  ├─ i18n.ts           # module thuần: detect, persist, t() + interpolation
│  │  ├─ useI18n.ts        # React hook: useI18n/useLanguage
│  │  └─ locales/          # vi.ts (nguồn key) · en · zh · ja · ko · es · fr
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # canvas + joystick nổi + bàn phím + visibility
│  │  ├─ StartScreen.tsx   # menu: hero + hiện trường nhiều lớp + corner panels
│  │  ├─ menu/              # corner GAME/INFO panels + modals + icons/
│  │  ├─ ModeSelector.tsx  # 9 thẻ chế độ (classic… hardcore · combo · feast)
│  │  ├─ AchievementsPanel.tsx  # tường huy hiệu locked/unlocked
│  │  ├─ GameOverScreen.tsx     # VỠ HŨ! + điểm + new achievements
│  │  ├─ PauseScreen.tsx        # TẠM NGHỈ + stats ván
│  │  ├─ settings/           # 6 mục cài đặt + control tái dùng (v1.1.6)
│  │  └─ ui.tsx            # GameButton, Panel, Keycap, Stat, ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # toàn bộ simulation + render canvas (~2260 dòng)
│  │  ├─ modes.ts          # chế độ chơi + công thức cân bằng (pure)
│  │  ├─ achievements.ts   # 16 huy hiệu + checker thuần (pure)
│  │  ├─ storage.ts        # localStorage: top 8, progress, achievements
│  │  ├─ audio.ts          # Web Audio synth: sfx + pentatonic music
│  │  ├─ changelog.ts        # in-game changelog data
│  │  ├─ runSave.ts         # suspended-run persistence
│  │  ├─ settings.ts        # game settings schema + normalize
│  │  ├─ settingsIO.ts      # settings backup/restore codec (v1.1.6)
│  │  ├─ settingsPresets.ts # 4 quick presets (v1.1.6)
│  │  └─ audioLevels.ts     # phép tính gain thuần (v1.1.6)
│  └─ utils/
│     ├─ cn.ts             # clsx + tailwind-merge
│     └─ useFocusTrap.ts   # trap Tab trong modal (v1.1.6)
└─ tests/                  # vitest — 18 files · 150 tests (modes · achievements · storage · i18n · runSave · settings · presets · audio…)
```

## 🧱 Kiến trúc & hiệu năng

- **Vòng lặp game** trên `requestAnimationFrame` với delta-time kẹp `1/20s`, nhân `timeScale` (slow-mo khi ĐÁ LẠNH) và **hit-stop** `freeze` vài chục ms trên mỗi catch để cảm giác "nện".
- **Canvas HUD** vẽ trực tiếp mỗi frame; React chỉ render các màn hình theo `phase` — không re-render React trong hot loop; khi đổi ngôn ngữ, HUD tự đọc dictionary ở frame kế tiếp.
- **i18n tách lớp**: `src/i18n/i18n.ts` là module thuần (không phụ thuộc React), `useI18n` chỉ là cầu nối đăng ký re-render qua sự kiện `locheo:languagechange`; `t()` hỗ trợ nội suy `{param}` và fallback vi.
- **Chế độ chơi khai báo thuần**: mỗi mode là một record trong `src/game/modes.ts` (scoreMult/speedMult/hazardMult/spawnMult + tuỳ chọn timeLimit/goldMult/maxCracks/**comboWindowMult**/**jarBonusMult**) — thêm chế độ mới không cần đụng engine.
- **Nền gạch bông** pre-render một lần ra offscreen canvas (kèm vignette + pool ánh sáng), star twinkle và bubble tính theo thời gian thực, rất rẻ.
- **Budget**: ≤460 particles, ≤70 items, ≤34 popups, DPR ≤ 2; va chạm quét theo hitbox; decal dưa văng trên nền tự dọn.
- **localStorage** với validate/chuẩn hoá đầu vào — 1 bản ghi lỗi không làm hỏng cả bảng; storage bị chặn (Safari private) thì chơi tiếp bộ nhớ; lựa chọn ngôn ngữ lưu riêng ở `locheo.lang.v1`.
- **Giảm chấn motion**: `prefers-reduced-motion` tắt aurora/shimmer/spin; sao nền và shake đều có thể tắt theo media query.

## ❓ FAQ

**Không có mạng thì chơi được không?**
Có — 100%: mở `dist/index.html` là chạy đầy đủ, kể cả font và âm thanh. Không có request mạng nào.

**Game có quảng cáo hay telemetry không?**
Không. Không tracking, không analytics — điểm số chỉ nằm trong localStorage máy bạn.

**Đổi ngôn ngữ có mất tiến trình không?**
Không. Điểm, thành tựu, tiến độ và chế độ chơi đều độc lập với `locheo.lang.v1`.

**Bảng vàng TOP 8 lưu ở đâu?**
`locheo.scores.v1` (điểm), `locheo.progress.v1` (tổng ván/hũ/chém), `locheo.achievements.v1` (huy hiệu) — xoá storage là mất, nên trân trọng cái lọ!

**Muốn thêm ngôn ngữ mới?**
Thêm `src/i18n/locales/xx.ts` mirror key set của `vi.ts`, cập nhật `LANGUAGES` + test, mở PR — xem [CONTRIBUTING.md](CONTRIBUTING.md).

**Trình chạy Windows báo lỗi tiếng Việt thì sao?**
Từ v1.1.4 `play-windows.bat` là CRLF + UTF-8 BOM với `chcp 65001` và dấu tiếng Việt nguyên vẹn — lỗi `'Ọ' is not recognized...` đã được sửa triệt để. Nếu tự sửa file .bat bằng editor khác, giữ nguyên CRLF & BOM (`.gitattributes` ép tự động).

**Không biết gõ lệnh thì chạy game kiểu gì?**
Nhấn đúp vào [`scripts/play-mac.command`](scripts/play-mac.command) (macOS), [`scripts/play-windows.bat`](scripts/play-windows.bat) (Windows) hoặc [`scripts/play-linux.sh`](scripts/play-linux.sh) (Linux) — menu 7 ngôn ngữ hiện ra, chọn `1` để build & chơi ngay, `2` để dev tại localhost:5173, nhấn `L` để đổi ngôn ngữ. Chi tiết: [scripts/README.md](scripts/README.md).

## 📦 Releases & changelog

| Phiên bản | Ngày | Ghi chú |
| --- | --- | --- |
| [v1.1.6](docs/releases/v1.1.6.md) | 2026-11-13 | **Cài đặt 6 mục** (nhanh · âm thanh · giao diện · ngôn ngữ · sao lưu · dữ liệu) · âm lượng 0–100 · mức rung · chất lượng hình · tự pause khi đổi tab · ngôn ngữ dời vào Cài đặt · 4 preset · xuất/nhập JSON · nền menu nhiều lớp · gradient chạy vòng ở mục tác giả · trap focus modal · fix nhạc reload · **150 tests** |
| [v1.1.5](docs/releases/v1.1.5.md) | 2026-11-12 | **Menu góc GAME/INFO** (Chơi · Chơi tiếp · Chế độ · BXH · Thành tựu · Cài đặt / About · Changelog · Thoát) · **lưu & Chơi tiếp ván dở** (`locheo.run.v1`) · cài đặt trong game (SFX/nhạc/rung/giảm chuyển động) · fix phím tắt rò rỉ modal · prefers-reduced-motion toàn bộ · **113 tests** |
| [v1.1.4](docs/releases/v1.1.4.md) | 2026-11-12 | **9 chế độ** (thêm Lễ Hội Combo · Đại Tiệc Dưa) · **16 thành tựu** · **7 ngôn ngữ** (thêm ES/FR) · sửa play-windows.bat (CRLF+BOM) · trình chạy 7 ngôn ngữ · 61 tests |
| [v1.1.3](docs/releases/v1.1.3.md) | 2026-11-12 | 7 chế độ · 14 thành tựu · 5 ngôn ngữ · favicon · trình chạy đa ngôn ngữ · 55 tests |
| [v1.1.2](docs/releases/v1.1.2.md) | 2026-11-12 | 5 chế độ · 12 thành tựu · combo lửa · trình chạy double-click · README 10 ngôn ngữ · 49 tests |
| [v1.1.1](docs/releases/v1.1.1.md) | 2026-11-12 | i18n VI/EN/ZH trong game · README 7 ngôn ngữ · sửa toàn bộ lỗi tồn đọng · 45 tests |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3 chế độ chơi · Khiên Tỏi Vàng · Sâu Rau · Cải Vàng · 10 thành tựu · fonts self-host |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | Phát hành đầu tiên: engine hoàn chỉnh, 11 nguyên liệu, LẮC HŨ, combo ×9 |

Xem thêm [CHANGELOG.md](CHANGELOG.md).

## 🗺️ Lộ trình (nháp — có thể thay đổi theo phản hồi)

| Mốc | Dự kiến | Ý tưởng |
| --- | --- | --- |
| **v1.2.0** | 2026 Q1 | Nhạc nền procedural theo từng chế độ · visual regression tests (Playwright) trong CI · bản thu nhỏ bundle (font subsetting sâu) |
| **v1.3.0** | 2026 Q1–Q2 | Chế độ chơi thứ 10 (đề cử: **BÃO RUỒI** — chỉ toàn ruồi, chém sạch để sống sót) · chế độ seed cho daily challenge |
| **v1.4.0** | 2026 Q2 | Bảng vàng online **opt-in** (serverless, mã hóa) — giữ nguyên triết lý offline-first mặc định |
| Backlog | — | Ghost replay của best run · photo mode (ẩn HUD, xuất PNG) · thêm locale ไทย (đang cân nhắc do chi phí bản dịch) |

*Lộ trình không phải cam kết — ưu tiên luôn nghiêng về: game ổn định → dễ chơi hơn → nhiều nội dung hơn.*

## 📚 Đọc thêm & tài liệu dev

Tài liệu thiết kế & hướng dẫn kỹ thuật sâu hơn:

| Doc | What it covers |
| --- | --- |
| [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md) | Release v1.1.6 — cài đặt 6 mục, preset, sao lưu, nền menu nhiều lớp |
| [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md) | Release v1.1.5 — menu góc, lưu/tiếp tục ván dở, cài đặt, fixes |
| [docs/design/menu-corners.md](docs/design/menu-corners.md) | Thiết kế menu góc GAME/INFO — nguyên tắc, a11y, responsive |
| [docs/design/save-format.md](docs/design/save-format.md) | Spec `locheo.run.v1` — snapshot ván dở (schema + lifecycle) |
| [docs/design/settings-format.md](docs/design/settings-format.md) | Spec `locheo.settings.v1` — cài đặt game (schema + wiring) |
| [docs/guides/troubleshooting.md](docs/guides/troubleshooting.md) | Sự cố thường gặp — đen màn hình · audio · «Chơi tiếp» · launcher |
| [scripts/smoke-ssr.tsx](scripts/smoke-ssr.tsx) | Headless render smoke test (toàn bộ menu/modal) |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | CI: npm ci → npm run check (Node 22) |

## 🤝 Đóng góp

1. Fork repo, tạo branch theo quy ước `arena/<tên>` hoặc `feat/<tên>`.
2. `npm run check` phải xanh trước khi mở PR (typecheck + 150 tests + build).
3. Không thêm dependency runtime nếu không thực sự cần — triết lý: **một file, không mạng, chơi được mãi mãi**.
4. Mô tả PR ghi rõ chế độ/màn hình bị ảnh hưởng và kèm clip nếu thay đổi gameplay.

## 📄 License & tác giả

<img src="assets/license.svg" alt="AGPL-3.0-only — giấy phép copyleft" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — xem [LICENSE](LICENSE) & [assets/license.svg](assets/license.svg).
- Fonts: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (subset woff2 tự host).
- Vòng tay ôm dịu dàng gửi tới những hũ dưa trên khắp các mâm cơm Việt Nam. 🫙🇻🇳
