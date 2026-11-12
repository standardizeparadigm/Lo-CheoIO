# Changelog

Mọi thay đổi đáng chú ý của Lọ Chéo — Hũ Dưa Đại Chiến được ghi ở đây.
Định dạng theo [Keep a Changelog](https://keepachangelog.com/vi/1.1.0/), phiên bản theo [SemVer](https://semver.org/lang/vi/).

## [1.1.2] — 2026-11-12

Bản **sửa lỗi + mở rộng nội dung chơi**: **2 chế độ mới (Đua 60 Giây · Mùa Vàng) · 12 thành tựu · combo 12+ bốc lửa · launcher double-click cho macOS/Windows/Linux · README 10 ngôn ngữ · license asset mới · 49 unit tests**.

→ Chi tiết đầy đủ: [docs/releases/v1.1.2.md](docs/releases/v1.1.2.md)

### Added
- Chế độ **ĐUA 60 GIÂY** (`blitz`): time-attack 60 giây, dưa rơi dày hơn (`spawnMult 0.9`) và nhanh hơn (`speedMult 1.12`), hazard nhiều hơn một chút (`hazardMult 1.2`), đổi lại ×1.25 điểm. Khi hết giờ, ván chơi tự kết thúc (`timeLimit` trong `MODES`); HUD đổi nhãn `HŨ DƯA` thành đồng hồ đếm ngược (`hud.timeLeft` với `{n}`), **nhấp nháy đỏ** khi còn ≤ 10 giây
- Chế độ **MÙA VÀNG** (`goldrush`): Muối Vàng, Cải Vàng, Tỏi Vàng, Ớt Hiểm và Đá Lạnh ra nhiều hơn **~2.6×** (`goldMult`), cân bằng như Cổ điển (×1.0 điểm, `speedMult 1`, `hazardMult 1`, `spawnMult 0.95`)
- 2 thành tựu mới — **VUA ĐUA 60 GIÂY** (`blitz-3000`: 3.000 điểm một ván Đua 60 Giây) và **MÙA VÀNG BỘI THU** (`goldrush-2jars`: đầy 2 hũ một ván Mùa Vàng); tổng cộng **12 thành tựu**
- **Combo 12+ bốc lửa**: streak ≥ 12 thì engine sinh hạt lửa vàng/ớt quanh lọ (thuần thị giác, không đổi balancing)
- `hud.timeLeft` (vi/en/zh) + `mode.blitz.*`, `mode.goldrush.*`, `ach.blitz-3000.*`, `ach.goldrush-2jars.*` — mọi key mới đều có mặt trong cả 3 locale (ép bởi test i18n)
- Launcher **double-click** trong `scripts/`: `play-mac.command` (macOS), `play-windows.bat` (Windows), `play-linux.sh` (Linux) — menu full màu, đủ mọi lệnh production (build+preview/chơi) và development (dev/test/check/…); mọi file đều menu đầy đủ; hướng dẫn cho người không rành terminal ở `scripts/README.md`
- `assets/license.svg` — ấn phẩm AGPL-3.0 copyleft (SMIL); `assets/modes.svg` — showcase 5 chế độ (SMIL); banner hiển thị V1.1.2
- README thêm bản 🇹🇭 ไทย · 🇩🇪 Deutsch · 🇵🇹 Português (tổng **10 ngôn ngữ**), mỗi bản gồm đầy đủ mục: tổng quan mới, highlights, FAQ, cấu trúc cây thư mục v1.1.2, release table, license asset
- 4 unit tests mới (blitz/goldrush trong modes, 2 achievement mới) — tổng **49 tests**

### Fixed
- `zh.ts` thiếu dấu câu/diễn đạt ở một số chuỗi và **thiếu toàn bộ key mới** — đã bổ sung đầy đủ; parity test ép cả 3 locale
- `index.html` description/keywords, `package.json` description/keywords, `docs/DESCRIPTION.md` (mọi bản dịch) còn ghi "3 chế độ / 10 thành tựu" — cập nhật thành **5 chế độ / 12 thành tựu**
- Mọi README còn sót tham chiếu 1.1.1/45 tests/10 thành tựu/3 chế độ — đã rà quét và đồng bộ 1.1.2 trên **cả 10 ngôn ngữ**

### Changed
- `APP_VERSION` → **1.1.2**; `package.json`/lock, `src/version.ts`, `index.css` header comment, `index.html` theme/description, `assets/banner.svg` đều hiển thị V1.1.2
- ModeSelector grid: `grid-cols-3` → `grid-cols-2 md… lg:grid-cols-5` để vừa 5 thẻ chế độ mọi cỡ màn hình
- `npm run check` (typecheck + 49 tests + build) là gate bắt buộc trước khi mở PR

## [1.1.1] — 2026-11-12

Bản tập trung **sửa lỗi & mở rộng**: **chuyển đổi ngôn ngữ VI/EN/ZH ngay trong game · README 7 ngôn ngữ · banner/animation mới · rà quét và sửa toàn bộ lỗi tồn đọng · 45 unit tests**.

→ Chi tiết đầy đủ: [docs/releases/v1.1.1.md](docs/releases/v1.1.1.md)

### Added
- i18n trong game: `src/i18n/` (`i18n.ts` module thuần — detect/persist/`t()` có interpolation; `useI18n.ts` bridge React; `locales/vi|en|zh.ts` — key set đồng bộ bắt buộc)
- `LanguageSwitcher.tsx` — nút VI/EN/中 ở menu chính (đầy đủ) và màn Tạm nghỉ (compact); lựa chọn lưu ở `locheo.lang.v1`
- Localized: toàn bộ HUD canvas (điểm, kỷ lục, cấp, hũ/củ, combo, chip power, lắc hũ), banner, popup, ticker nguyên liệu, màn hình menu/pause/game over/thành tựu, `<html lang>` đồng bộ, số theo locale
- README thêm các bản 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇫🇷 Français (tổng 7 ngôn ngữ) + mục FAQ, mục "Chuyển ngôn ngữ"
- `assets/demo.svg` (mô phỏng gameplay SMIL) + `assets/items.svg` (bảng 14 nguyên liệu)
- 9 unit tests cho i18n (mirror key set, placeholder, interpolation, persistence) — tổng **45 tests**

### Fixed
- Toàn bộ chuỗi hiển thị tiếng Việt bị hardcode (HUD/popup/banner/menu/pause/game over/thành tựu/ticker) nay đi qua dictionary — không còn sót chuỗi cứng
- `t()` cho phép override ngôn ngữ khi gọi (dùng cho engine canvas), không phụ thuộc React state
- `ScoreBoard` dùng chung locale số của ngôn ngữ đang chọn thay vì luôn `vi-VN`

### Changed
- `APP_VERSION` → **1.1.1**; README badges/cấu trúc cập nhật; `assets/banner.svg` hiển thị V1.1.1

## [1.1.0] — 2026-11-12

Bản đại tu: **3 chế độ chơi · Khiên Tỏi Vàng · Sâu Rau & Cải Vàng mới · 10 thành tựu cộng dồn · menu gradient/aurora · README 3 ngôn ngữ có animation · fonts tự host (offline thật) · 6 lỗi logic được sửa · 36 unit tests**.

→ Chi tiết đầy đủ: [docs/releases/v1.1.0.md](docs/releases/v1.1.0.md)

### Added
- Chế độ chơi: MUỐI DƯA CỔ ĐIỂN / THẢNH THƠI / ỚT LỬA (lưu `locheo.mode.v1`)
- Nguyên liệu: CẢI VÀNG (fill boost), TỎI VÀNG (khiên ×2), SÂU RAU (hazard)
- Hệ thống 10 thành tựu + progress cộng dồn (`locheo.achievements.v1`, `locheo.progress.v1`), toast "THÀNH TỰU MỚI!"
- HUD: chip khiên `TỎI VÀNG ×N`, nhãn chế độ ở đáy giữa màn hình
- Menu: aurora background, title shimmer, halo xoay quanh mascot, sheen CTA, gradient-border panel
- `src/styles/fonts.css` + `src/assets/fonts/*` — fonts tự host 100%
- `src/game/modes.ts`, `src/game/achievements.ts` (pure, có test)
- `src/components/ModeSelector.tsx`, `src/components/AchievementsPanel.tsx`
- `src/version.ts`, `assets/banner.svg` (animation), docs/releases/v1.0.0.md + v1.1.0.md, CONTRIBUTING.md, .gitignore
- 36 unit tests (vitest) + script `npm run check`

### Fixed
- Frenzy bị nhân đôi hai lần (thực tế ×4 → ×2) trên mọi nguồn điểm
- Popup "+300 MUỐI VÀNG" không khớp số thực nhận
- Ớt Hiểm không thưởng điểm khi kích hoạt frenzy
- Đốm mốc vẽ ngẫu nhiên mỗi frame → cố định theo từng item
- Storage: 1 entry lỗi kéo sập cả bảng điểm; dữ liệu không được validate đầy đủ
- README mô tả sai hoàn toàn dự án; fonts CDN phá offline-first; package.json mặc định; theme-color lệch

## [1.0.0] — 2026-10-26

Phát hành đầu tiên: engine hoàn chỉnh, 11 nguyên liệu, cơ chế CHÉO, LẮC HŨ, combo ×9, bảng vàng TOP 8, âm thanh Web Audio procedural.

→ Chi tiết đầy đủ: [docs/releases/v1.0.0.md](docs/releases/v1.0.0.md)

[1.1.2]: https://github.com/standardizeparadigm/Lo-CheoIO/releases/tag/v1.1.2
[1.1.1]: https://github.com/standardizeparadigm/Lo-CheoIO/releases/tag/v1.1.1
[1.1.0]: https://github.com/standardizeparadigm/Lo-CheoIO/releases/tag/v1.1.0
[1.0.0]: https://github.com/standardizeparadigm/Lo-CheoIO/releases/tag/v1.0.0
