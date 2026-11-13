# `tests/` — unit tests (vitest)

107 tests / 13 files. Pure logic only — engine/canvas được phủ bởi `npm run check` (build) + `scripts/smoke-ssr.tsx` (SSR render smoke).

| File | Phủ | Pattern |
| --- | --- | --- |
| `modes.test.ts` | balance math 9 chế độ, multiplier/combo, isModeId | pure |
| `achievements.test.ts` | checkAchievements + normalize | pure |
| `storage.test.ts` | scores/progress/achievements roundtrip, clearAllProgress, seed fallback | `memStorage()` + `vi.stubGlobal` |
| `settings.test.ts` | normalize/load/save/updateSettings garbage handling | `memStorage()` |
| `runSave.test.ts` | normalizeSavedRun (clamp/garbage), roundtrip, clearSavedRun | `memStorage()` |
| `i18n.test.ts` | parity 7 locale × 260 keys + placeholders + number formats | import trực tiếp dict |
| `i18n-v115.test.ts` | 53 key v1.1.5 tồn tại + placeholder khớp VI | import trực tiếp dict |
| `changelog.test.ts` | CHANGELOG_ENTRIES descending semver, unique, ISO dates | pure |
| `modes-balance.test.ts` | mode catalogue invariants (unique ids, positive mults, blitz timed-only, hardcore cracks-only, combo/feast math) | pure |
| `achievements-defs.test.ts` | catalogue integrity — unique ids, 16 entries, glyph/tone rules, MAP 1:1 | pure |
| `version-bump.test.ts` | version coherence — APP_VERSION = pkg = lock = changelog = README badges = release notes | fs |
| `storage-seed.test.ts` | SEED board trả về bản sao sâu khi trống / sau clearAllProgress | `memStorage()` |
| `i18n-modes.test.ts` | 9 chế độ × 4 key (name/tagline/desc/badge) hiện diện ở cả 7 locale + vi names unique | import trực tiếp dict |

## Thêm test mới

1. Logic pure → test thẳng, không mock.
2. Cần localStorage → copy pattern `memStorage()` ở `storage.test.ts`, `vi.stubGlobal("localStorage", mem)` trong test, `vi.unstubAllGlobals()` ở `afterEach`.
3. Assert dữ liệu người dùng thật (điểm, combo) → luôn qua `normalize*` — đừng tin input.

Chạy một file: `npx vitest run tests/<file>.test.ts`. Toàn bộ: `npm test` hoặc `npm run check`.
