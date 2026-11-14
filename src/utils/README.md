# `src/utils/`

Small, dependency-free helpers. Nothing here imports from `src/game/` or
`src/components/` — the point of the folder is that any layer can use it without
dragging the next layer in. `tests/barrels.test.ts` enforces the React half of
that rule for `src/game/`; this folder follows it by convention.

| File | What it is |
| --- | --- |
| `math.ts` | `clamp`, `clamp01`, `lerp`, `damp` — the four numeric operations the game repeats |
| `time.ts` | `fmtTime`, `fmtCountdown` — clock formatting for the HUD and the run summary |
| `mediaQuery.ts` | Safe wrappers around `window.matchMedia`, which throws in some webviews |
| `clipboard.ts` | `copyText` with the `execCommand` fallback |
| `useFocusTrap.ts` | Keeps Tab inside a modal |
| `cn.ts` | Tailwind class joining, without a dependency |

## Why `mediaQuery.ts` exists

`window.matchMedia` is not guaranteed to exist — it is absent in SSR and jsdom,
and it throws outright in a few embedded webviews. Every call site used to wrap
it in its own `try/catch` or sprinkle `?.`, which meant six different fallbacks
with three different behaviours. One module now owns the answer, and
`tests/mediaQuery.test.ts` covers the missing-API path.

## Conventions

- No default exports in this folder. A default export can be renamed at the
  import site, which makes a grep for the helper lie.
- No side effects at module scope. Everything here is a pure function or a hook.
- If a helper needs more than one import from outside this folder, it is
  probably not a util.
