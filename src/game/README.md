# `src/game/`

Rules, storage and progression. **No React in this folder** — enforced by
`tests/barrels.test.ts`.

| File | Owns |
| --- | --- |
| `engine.ts` | The tick loop: spawn, move, collide, score |
| `spawn.ts` | Weighted spawn tables |
| `modes.ts` / `modesIndex.ts` | Mode ordering and lookup |
| `modes/*.ts` | The nine play modes, one file each |
| `settings.ts` | Settings schema, defaults, normalisation, persistence |
| `settingsIO.ts` | Import/export of a settings blob |
| `settingsPresets.ts` | The named presets in the settings panel |
| `runSave.ts` | The resumable run |
| `storage.ts` | Namespaced `localStorage` with a migration chain |
| `safeStorage.ts` | The wrapper that survives private mode and a full quota |
| `achievements.ts` | Definitions and the unlock check |
| `palette.ts` | Colour weights for the tiles |
| `audioLevels.ts` | The volume curve |

## Layering

```
settings / storage  ←  engine  ←  runSave
        ↑                ↑
     modes/*         palette / spawn
```

Nothing here imports a component, and nothing here reads `window` except through
`safeStorage` and `audio`. That keeps the whole folder runnable in a test with no
DOM, which is why the suite is fast.

## Reading old data

Nothing on disk is trusted. `loadSettings`, `loadSavedRun`, `loadScores` and
`loadProgress` all pass whatever came out of storage through a `normalize…`
function that returns a known-good value when the input is missing, the wrong
type, or from an older shape. There is no version number to branch on: the
normaliser simply fills in defaults for fields that are absent and drops fields
it does not recognise, so a blob written by 1.1.2 loads in 1.1.8 and a blob
written by 1.1.8 loads in 1.1.2 with the extra field ignored.

`tests/storage-migrate.test.ts` feeds each loader the shapes earlier releases
actually wrote, including truncated and hand-edited blobs.
