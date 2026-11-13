# Spec: `locheo.settings.v1` — Game Settings (v1.1.6 schema)

Nguồn: `src/game/settings.ts`. Pattern giống `locheo.run.v1`: validate + merge, chịu dữ liệu rác.
**Key không đổi** từ v1.1.5 — chỉ bổ sung field, bản lưu cũ vẫn đọc được (field thiếu → default).

## Schema

```jsonc
{
  "sfx": true,                // play() gate — chặn toàn bộ hiệu ứng âm
  "sfxVolume": 80,            // 0..100 — âm lượng SFX (nhân vào peak từng tiếng)
  "music": true,              // music bus gate — tắt + stopMusic()
  "musicVolume": 60,          // 0..100 — âm lượng nhạc nền (×0.5 bus gốc)
  "shake": true,              // công tắc tổng của rung màn hình
  "shakeLevel": "high",       // "low" = ×0.45 chấn động · "high" = ×1
  "reducedMotion": false,     // flash ×0.25, trauma cap 0.12
  "visualQuality": "high",    // "low" = trần 230 hạt + tắt shadowBlur glow
  "autoPauseOnBlur": true,    // rời tab → tự pause ván đang chơi
  "language": "vi"            // nguồn sự thật duy nhất cho i18n (7 mã)
}
```

## Mặc định & merge

- `DEFAULT_SETTINGS = { sfx: true, sfxVolume: 80, music: true, musicVolume: 60, shake: true, shakeLevel: "high", reducedMotion: false, visualQuality: "high", autoPauseOnBlur: true, language: "vi" }`
- `normalizeSettings(value, languageFallback?)`: từng field được validate **theo kiểu** —
  boolean qua `Boolean`, số kẹp `0..100` (`Number.isFinite` chặn `NaN`), chuỗi chỉ nhận trong tập cho phép
  (`shakeLevel ∈ {low, high}`, `visualQuality ∈ {low, high}`, `language ∈ 7 mã`). Giá trị lạ → default.
- `loadSettings(languageFallback?)`: đọc key → `normalizeSettings` → thiếu/hỏng → DEFAULT + seed ngôn ngữ.
- `updateSettings(patch)`: merge patch vào bản đã load **rồi normalize lại** → persist; trả bản đã persist.
- `resetSettingsKeepingLanguage(prev)`: `DEFAULT_SETTINGS` + giữ `prev.language` → dùng cho nút "Khôi phục mặc định".
- Lỗi storage (private mode…) → im lặng, trả DEFAULT/patch in-memory.

## Áp dụng (ai lắng nghe gì)

| Setting | App wiring | Engine/Audio |
| --- | --- | --- |
| `sfx` | `useEffect` → `audio.setSfxEnabled` | `play()` early-return |
| `sfxVolume` | `useEffect` → `audio.setSfxVolume(v/100)` | peak/gain × volume |
| `music` | `useEffect` → `audio.setMusicEnabled` | bus gain → 0 + `stopMusic()` |
| `musicVolume` | `useEffect` → `audio.setMusicVolume(v/100)` | bus gain = `0.5 × volume` (live) |
| `shake` | `useEffect` → `game.setShakeEnabled` (+ `onReady`) | `shakeScale` render |
| `shakeLevel` | `useEffect` → `game.setShakeLevel` (+ `onReady`) | `shakeAmount` 0.45/1 × trauma² |
| `visualQuality` | `useEffect` → `game.setQuality` (+ `onReady`) | trần hạt 230/460, glow on/off |
| `reducedMotion` | `useEffect` → `game.setReducedMotion` (+ `onReady`) | `flashScale`, trauma cap |
| `autoPauseOnBlur` | prop → `GameCanvas` | `visibilitychange` gate |
| `language` | `useEffect` → `setLanguage` | `LANGUAGE_CHANGE_EVENT` cho mọi subscriber |

## UI (v1.1.6)

`src/components/settings/` — `SettingsModal` chia **6 section**, xếp từ "ăn liền" tới "vùng nguy hiểm":

| # | Section | Control |
| --- | --- | --- |
| 1 | CẤU HÌNH NHANH | `PresetsSection` — 4 preset (MƯỢT · CÂN BẰNG · ĐIỆN ẢNH · SPEEDRUN) + nhãn TUỲ CHỈNH khi lệch |
| 2 | ÂM THANH | 2 `Switch` (sfx/music) + 2 `VolumeStepper` (0–100, bước 10) |
| 3 | GIAO DIỆN & CHUYỂN ĐỘNG | `Switch` shake · `SegmentedControl` level · `Switch` reduced-motion · `SegmentedControl` quality · `Switch` auto-pause |
| 4 | NGÔN NGỮ | `LanguageSection` — 7 cờ, 2 cột, đọc từ `languageMeta` |
| 5 | SAO LƯU | `BackupSection` — xuất/nhập JSON (xem `settingsIO.ts`) |
| 6 | DỮ LIỆU | `DataSection` — khôi phục mặc định (giữ ngôn ngữ) · xoá dữ liệu 2 bước |

Control tái dùng: `Switch` (toggle có `role="switch"`), `SegmentedControl` (2 lựa chọn, roving tabindex,
←/→/↑/↓/Home/End, `aria-pressed`), `VolumeStepper` (−/+ + 10 vạch nghiêng + readout). Ngôn ngữ chuyển
từ menu (đã xoá `LanguageSwitcher`) vào Settings và **không bao giờ** bị preset ghi đè.

## Test

- `tests/settings.test.ts` — normalize/load/save/updateSettings, clamps, tập giá trị, reset-keep-language,
  OS-default chỉ áp dụng lần chạy đầu.
- `tests/settings-v116.test.ts` — round-trip persist, save cũ thiếu field, JSON hỏng, idempotent normalize.
- `tests/settingsPresets.test.ts` — 4 preset, không chạm language, idempotent, `matchPreset` phát hiện tuỳ chỉnh.
- `tests/settingsIO.test.ts` — envelope xuất/nhập, bare object, JSON rác, object lạ.
- `tests/settings-wiring.test.ts` — guard tĩnh: mọi setting thực sự chạm audio/engine/canvas.
