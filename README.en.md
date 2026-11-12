<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Hũ Dưa Đại Chiến (Pickle Jar Arcade)" width="100%" />

# LỌ CHÉO — PICKLE JAR SHOWDOWN

### 🫙 A 100% in-browser pickle-jar arcade — a single HTML file, offline-first

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md)

[![Version](https://img.shields.io/badge/version-1.1.0-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.0.md)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-install--run)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-production-build)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

</div>

---

## 🥒 About

> Lọ Chéo — Hũ Dưa Đại Chiến: a pickle-jar arcade that runs 100% in the browser, packaged as one single HTML file, offline-first — no CDN, no server. The little clay jar only knows how to move **diagonally**: hold two keys to swerve, speed up, and slash through moulds, flies and caterpillars, and fill the jar before the ceramic cracks. 3 game modes, 14 ingredients, 10 achievements, a TOP-8 hall of fame.

An **action single-screen arcade** inspired by Vietnam's beloved jar of pickled vegetables. No linear levels, no cluttered menus — just the jar, an endless rain of produce and your reflexes on full flame.

## ✨ Highlights

| Area | Details |
| --- | --- |
| 🎮 **3 game modes** | **CLASSIC PICKLE** (balanced) · **ZEN** (no hazards, ×0.5 score) · **INFERNO CHILI** (+35% speed, ×1.5 score) |
| 🕹️ **Signature CHÉO (diagonal) mechanic** | Hold two keys / a diagonal drag — the jar speeds up, glows and shreds hazards. Dedicated stamina bar with hysteresis so it never flickers |
| 🥬 **14 ingredients** | White eggplant, chili, garlic, ginger, salt, mustard greens, **GOLDEN CABBAGE** (fills the jar fast) · GOLDEN SALT/GARLIC · FIERY CHILI · ICE · MOULD, FLY, **CATERPILLAR** (hazards) |
| 🧄 **Golden Garlic Shield** | New power-up: stack up to **2 shield charges** that absorb cracks, with a rotating halo around the jar |
| 🏆 **10 achievements** | Saved **cumulatively across runs** (localStorage), a "NEW ACHIEVEMENT!" toast on the game-over screen, and a badge wall in the menu |
| 🔊 **Hand-made audio** | 11 pure Web Audio API synthesized effects (zero files) + a pentatonic bed that re-tunes per level, mute with `M` |
| 💾 **TOP 8 hall of fame** | Scores persist locally with input validation & normalization; names auto-uppercase; the beaten entry is highlighted |
| 🎨 **60fps graphics** | Canvas 2D, 460-particle budget, DPR cap 2, pre-rendered cement-tile background, star twinkles + aurora menu |
| 📴 **Truly offline-first** | Self-hosted font subsets (latin + vietnamese, woff2), no CDN, no API — open `dist/index.html` and play |

## 🕹️ Controls

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | `W` `A` `S` `D` or `← ↑ ↓ →` | Drag anywhere — a floating joystick appears |
| **Chéo (diagonal slash)** | Hold **two keys at once** (e.g. `A`+`W`) | Drag at **45°** — the joystick ring turns gold |
| Jar slam (shockwave + magnet) | `Space` | Red **LẮC** button, bottom-right |
| Pause / resume | `P` or `Esc` | Pause button, top-right |
| Instant restart | `R` (works mid-pause and on game over) | "Muối lại ngay" button |
| Start / confirm | `Enter` | **VÀO BẾP** button |
| Mute / unmute | `M` | Speaker button, top-right |

## 🚀 Install & run

### Play right now (no build needed)

```bash
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### Production build

```bash
npm install        # install dependencies (Node ≥ 20.19)
npm run build      # → dist/index.html (everything inlined in one file)
```

> `vite-plugin-singlefile` inlines all JS/CSS/fonts/images into **one** `dist/index.html` (~640 KB, ~330 KB gzipped). No server, no network.

### Development

```bash
npm run dev        # dev server with HMR (http://localhost:5173)
npm run preview    # serve the production build locally
npm run typecheck  # tsc --noEmit (strict)
npm run test       # vitest — 36 unit tests (modes / achievements / storage)
npm run check      # typecheck + test + build (CI quality gate)
```

## 🗂️ Project layout

```
lo-cheoio/
├─ index.html              # entry, SEO/OG meta (no CDN)
├─ package.json            # lo-cheoio v1.1.0, scripts dev/build/test/check
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; covers src + tests
├─ assets/banner.svg       # README banner (SMIL animation)
├─ docs/
│  ├─ DESCRIPTION.md       # 351-char project description (vi/en/zh)
│  └─ releases/            # v1.0.0.md · v1.1.0.md
├─ src/
│  ├─ App.tsx              # phase machine: menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.0" (single source of truth)
│  ├─ index.css            # tailwind v4 theme + all animations/gradients
│  ├─ assets/fonts/        # woff2 subsets (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, 100% offline
│  ├─ components/          # GameCanvas, StartScreen, ModeSelector,
│  │                       # AchievementsPanel, GameOverScreen, PauseScreen, ui
│  ├─ game/
│  │  ├─ engine.ts         # full simulation + canvas renderer (~2100 lines)
│  │  ├─ modes.ts          # game modes + balance math (pure)
│  │  ├─ achievements.ts   # 10 badges + pure unlock checker (pure)
│  │  ├─ storage.ts        # localStorage: top 8, progress, achievements
│  │  └─ audio.ts          # Web Audio synth: sfx + pentatonic bed
│  └─ utils/cn.ts
└─ tests/                  # vitest — modes, achievements, storage
```

## 🧱 Architecture & performance

- **Game loop** on `requestAnimationFrame` with delta clamped to `1/20s`, scaled by `timeScale` (slow-mo during ICE) and short **hit-stop** freezes on every catch for that punchy feel.
- **Canvas-drawn HUD** every frame; React only renders screens on phase changes — the hot loop never re-renders React.
- **Cement-tile background** is pre-rendered once to an offscreen canvas (vignette + warm pool); star twinkles and brine bubbles are cheap time-based draws.
- **Budgets**: ≤460 particles, ≤70 items, ≤34 popups, DPR ≤ 2; hitbox-swept collisions; splat decals fade on their own.
- **localStorage** with input validation & normalization — one corrupt row can't poison the board; blocked storage (Safari private mode) degrades to in-memory play.
- **Reduced motion**: `prefers-reduced-motion` disables aurora/shimmer/spin flourishes.

## 📦 Releases & changelog

| Version | Date | Notes |
| --- | --- | --- |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3 game modes · Golden Garlic Shield · Caterpillar · Golden Cabbage · 10 achievements · trilingual README · truly offline · 6 logic fixes |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | First release: complete engine, 11 ingredients, jar slam, ×9 combo, TOP 8 board |

See also [CHANGELOG.md](CHANGELOG.md).

## 🤝 Contributing

1. Fork, branch as `arena/<name>` or `feat/<name>`.
2. `npm run check` must be green before a PR (typecheck + 36 tests + build).
3. No new runtime dependencies unless truly necessary — philosophy: **one file, no network, playable forever**.
4. Describe which mode/screen is affected; attach a clip for gameplay changes.

## 📄 License & author

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — see [LICENSE](LICENSE).
- Fonts: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (self-hosted subsets).
- With love to every jar of pickles gracing Vietnamese family meals. 🫙🇻🇳
