# scripts/

Repo utilities — never shipped in the single-file bundle.

## `smoke-ssr.tsx`

Headless render smoke test for every screen and modal. Renders the whole
menu tree to static HTML with `react-dom/server`, which catches runtime
render crashes that `tsc --noEmit` cannot (bad hook order, missing context,
broken i18n lookups, undefined components).

```bash
npx vite-node scripts/smoke-ssr.tsx
# → prints "ok <Component> …" per piece and finally "SMOKE OK"
```

Exit code is non-zero on any render error, so it doubles as a CI gate
for the menu/modal layer.
