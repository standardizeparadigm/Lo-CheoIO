# Spec: `locheo.run.v1` — Suspended Run Snapshot

Lưu ván đang dở để nút **«Chơi tiếp»** khôi phục. Viết bởi `saveSavedRun()` (`src/game/runSave.ts`), chụp bởi `LoCheoGame.captureRun()`.

## Schema (version 1)

```jsonc
{
  "version": 1,               // bắt buộc, !== 1 → bỏ qua toàn bộ
  "savedAt": 1762950000000,   // epoch ms, clamp ≥ 0
  "mode": "feast",            // phải ∈ ModeId (isModeId)
  "stats": {                  // mọi số finite; âm → kẹp 0
    "score": 3820, "catches": 118, "bestCombo": 24,
    "level": 5,               // ≥ 1
    "jars": 2, "sliced": 9, "time": 95.5   // time ≥ 0 (giây)
  },
  "fill": 0.65,               // 0..1
  "cracks": 1,                // 0..MAX_CRACKS (3; Gốm Mỏng: 1)
  "stamina": 0.82,            // 0..1
  "frenzy": 0,                // giây còn lại của frenzy, 0..60
  "slow": 0,                  // giây còn lại của đá-lạnh, 0..60
  "shield": 1,                // số khiên còn
  "slamCd": 2.4,              // giây cooldown SLAM, 0..60
  "combo": 11,                // combo hiện tại
  "comboT": 2.1,              // giây còn lại của combo window, 0..60
  "px": 320.5, "py": 470.0    // vị trí lọ (clamp trong restoreRun theo W/H hiện tại)
}
```

## Normalize (defense-in-depth)

`normalizeSavedRun(untrusted)`:

1. `version !== 1` → `null`; `mode` không hợp lệ → `null`; `stats` không phải object / `score` không finite → `null`.
2. Field số: `NaN`/`Infinity`/thiếu → fallback (0 hoặc default), kẹp biên như bảng trên.
3. `cracks` kẹp theo `MODES[mode].maxCracks ?? 3` ở phía restore.
4. JSON hỏng / localStorage ném lỗi → `null` (menu coi như không có ván dở — không crash).

## Vòng đời

| Sự kiện | snapshot |
| --- | --- |
| Rời màn (pause → VỀ MENU) | **tạo/ghi đè** |
| «Chơi tiếp» | đọc → `restoreRun()` → **xóa** |
| Game over | **xóa** |
| Ván mới (CHƠI NGAY, Enter, R) | **xóa** |
| Settings → xóa dữ liệu | **xóa** |
| `restoreRun()` | inject state + invuln 1.2s + spawn stagger 1.1s, phase `playing` |

## Không lưu

- Field vật thể đang rơi/hazards — thiết kế chủ đích (xem `docs/design/menu-corners.md` và release notes Fixed #9).
- RNG state, camera shake, modal đang mở, cài đặt.
