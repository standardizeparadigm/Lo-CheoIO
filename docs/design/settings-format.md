# Spec: `locheo.settings.v1` — Game Settings

Nguồn: `src/game/settings.ts`. Pattern giống `locheo.run.v1`: validate + merge, chịu dữ liệu rác.

## Schema

```jsonc
{
  "sfx": true,            // play() gate — chặn toàn bộ hiệu ứng âm
  "music": true,          // music bus gate — tắt + stopMusic()
  "shake": true,          // render shake ×0/×1
  "reducedMotion": false  // flash ×0.25, trauma cap 0.12 (gắt nhẹ hơn nữa cho người nhạy cảm)
}
```

## Mặc định & merge

- `DEFAULT_SETTINGS = { sfx: true, music: true, shake: true, reducedMotion: false }`
- `loadSettings()`: đọc key → merge từng field qua `Boolean(v ?? default)` — key thiếu/sai kiểu → default.
- `updateSettings(patch)`: merge patch vào bản đã load rồi persist; trả về bản đã persist.
- Lỗi storage (private mode…) → im lặng, trả DEFAULT/patch in-memory.

## Áp dụng (ai lắng nghe gì)

| Setting | App wiring | Engine/Audio |
| --- | --- | --- |
| `sfx` | `useEffect` → `audio.setSfxEnabled` | `play()` early-return |
| `music` | `useEffect` → `audio.setMusicEnabled` | bus gain → 0 + `stopMusic()` |
| `shake` | `useEffect` → `game.setShakeEnabled` (+ apply ở `onReady`) | `shakeScale` render |
| `reducedMotion` | `useEffect` → `game.setReducedMotion` (+ apply ở `onReady`) | `flashScale`, trauma cap |

## Test

`tests/settings.test.ts`: garbage normalize, default fill, load/save roundtrip, updateSettings merge.
`tests/runSave.test.ts` + `tests/storage.test.ts` chia sẻ pattern `memStorage()` + `vi.stubGlobal`.
