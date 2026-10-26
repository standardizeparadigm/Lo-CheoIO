# Lọ Chéo — Neon Arcade v2.0

A self-contained, offline-first HTML5 canvas roguelite. The only production artifact is **`dist/index.html`**: its HTML, JavaScript, CSS, six font subsets, and SVG graphics are inlined. No CDN, API, network, audio asset, or backend is needed.

## Play

- **WASD / arrow keys**: move. Hold a horizontal and a vertical key for Chéo — a faster slanted attack.
- **Touch**: hold a floating joystick anywhere on the arena. Drag diagonally to Chéo.
- **Space / LẮC**: shockwave and magnetic pull. Cooldown and range are improved by the Phantom perk.
- **P / Escape**: pause and resume. The entire simulation, wave countdown and power durations freeze.
- **R**: instant restart, including during pause and game over.
- **M**: mute/unmute.
- **1 / 2 / 3**: select a roguelite perk when a wave ends.

## Content

- Endless 20-second waves: Chéo Rush, Grid Lock, Zig-Zag, Time Fracture, Crossfire, and Neon Overdrive.
- Matrix-style time dilation at each wave boundary, followed by three unique perk choices.
- At most three active perks. Additional picks upgrade occupied slots; tiers keep increasing.
- Magnetic Pull, Shield Capacitor, Double Score, Phantom Dash, and Bullet Time perks.
- Collectible shield, instant Chéo-Blast, and 50% Time-Warp, with concentric cooldown indicators.
- Neon shards bank immediately. Three cosmetic skins can be unlocked and equipped across sessions.
- Five achievements, a local top-eight board, and a complete results screen.
- Procedural Web Audio synthesis, with a dedicated low-pass pause sweep and automatic graph disposal.

## Architecture

The fixed 120Hz simulation is independent of the rendered frame rate. React HUD snapshots publish at 10Hz, so the canvas loop does not rerender React on every frame. The renderer caches the tiled neon background and glow sprites, reuses particles, caps particle/entity budgets, and limits device-pixel ratio to 2. Reduced-motion mode reduces shake and particle counts. Touch, keyboard, focus changes and window resizing are handled centrally.

A 100ms buffer preserves rapid diagonal inputs and cooldown-bound actions. Collision checks are swept against the player's hitbox, allowing precise 5px near-miss achievements.

Score, cosmetics and achievement state are validated and saved in localStorage. If browser storage is unavailable, play continues in-memory and the lobby displays a warning.

## Build

Use `npm run build`. `vite-plugin-singlefile` embeds all assets in the production HTML. Open or deploy `dist/index.html` directly — no additional files are required.

## Regression checks

The `tests/` directory contains deterministic engine regressions and real-browser checks for offline loading, keyboard/touch input, wave drafts, perk limits, local score saving, restarts, purchases and mobile/desktop layouts. Browser tests use Playwright. The generated engine bundles are not part of the production artifact.
