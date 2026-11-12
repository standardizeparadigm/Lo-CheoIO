<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Pickled Jar Showdown" width="100%" />

# LỌ CHÉO — PICKLED JAR SHOWDOWN

### 🫙 Vietnamese pickle arcade running 100% in the browser — one self-contained HTML file, offline-first
### 🌐 In-game UI in 5 languages — Tiếng Việt · English · 中文 · 日本語 · 한국어

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.3-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.3.md)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-install--run)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-production-build)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-switching-languages)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo gameplay — the jar slants diagonally, catches pickles, shreds moulds" width="100%" />

</div>

---

## 🥒 About the project

> Lọ Chéo — Pickled Jar Showdown: a pickle arcade that runs 100% in the browser, packed into a single self-contained HTML file, offline-first — no CDN, no server. The ceramic jar only knows how to move DIAGONALLY: hold two keys to slant, boost and shred moulds, flies and caterpillars, then fill the jar before the ceramic cracks in three. **7 game modes · 14 ingredients · 14 achievements · TOP 8 leaderboard · UI in 5 languages.**

This is a **single-screen action arcade** inspired by Vietnam's humble pickled vegetables. No linear levels, no cluttered menus — just the jar, an endless downpour of produce, and your blazing reflexes.

## 🆕 What's new in v1.1.3

- 🌧️ **2 new game modes** — **PICKLE RAIN** (falls ×0.88 slower but ~1.4× denser and ×1.5 more hazards, ×0.75 score — a glorious pickle flood and blazing level-ups) and **THIN CERAMIC** (a single crack and the jar shatters, ×2.0 score, ×1.3 hazards — for diamond hands only). That's **7 modes** in total.
- 🏆 **2 new achievements** — **DOWNPOUR** (catch 60 pickles in a Pickle Rain run) & **STEEL POTTERY** (fill a jar in a Thin Ceramic run). That's **14 achievements** in total.
- 🌐 **5 in-game languages** — added **日本語 (日)** and **한국어 (한)** alongside VI/EN/中: 193 translation keys per locale, `<html lang>` sync, locale-aware numbers (vi-VN / en-US / zh-CN / ja-JP / ko-KR).
- 🚀 **Multilingual, animated launchers** — all three launchers (`play-linux.sh` · `play-mac.command` · `play-windows.bat`) switch language with the `L` key (VI→EN→中文), honor the `LOCHEO_LANG` env var, and feature a triple-flash banner, a real braille spinner with live % and sparkle flourishes — the Vietnamese menu keeps **full diacritics**. See [scripts/README.md](scripts/README.md).
- ⭐ **New favicon** `favicon.ico` (multi-size 16→256 px) + animated `assets/favicon.svg` (SMIL) + `public/` — web-ready, gorgeous on every tab.
- 🐛 **Full sweep of remaining bugs** (see [CHANGELOG](CHANGELOG.md), `[1.1.3]`); `npm run check` green with **55 unit tests**.

<img src="assets/modes.svg" alt="The 7 game modes — Classic · Zen · Inferno · 60-Second Rush · Gold Rush · Pickle Rain · Thin Ceramic" width="100%" />

<div align="center"><img src="assets/favicon.svg" alt="Lọ Chéo favicon — a slanted pickle jar with a gold lid (SMIL animation)" width="150" /></div>

→ Full details: [docs/releases/v1.1.3.md](docs/releases/v1.1.3.md)

## ✨ Highlights

| Group | Details |
| --- | --- |
| 🎮 **7 game modes** | **CLASSIC PICKLE** (balanced) · **ZEN** (no hazards, ×0.5) · **INFERNO CHILI** (+35% speed, ×1.5) · **60-SECOND RUSH** (time-attack 60s, ×1.25) · **GOLD RUSH** (gold loot ×2.6 spawn) · **PICKLE RAIN** (~1.4× denser, ×0.75) · **THIN CERAMIC** (one crack is fatal, ×2.0) |
| 🌐 **In-game i18n** | Tiếng Việt · English · 中文 · 日本語 · 한국어 — `src/i18n/` (pure module + React bridge), `t()` with interpolation, syncs `<html lang>`, locale-aware numbers (vi-VN / en-US / zh-CN / ja-JP / ko-KR) |
| 🕹️ **Signature SLANT mechanic** | Hold 2 keys/axes diagonally — the jar boosts, glows and shreds hazards. Dedicated stamina bar with anti-flicker hysteresis |
| 🥬 **14 ingredients** | Eggplant, chili, garlic, ginger, salt, greens, **GOLD GREENS** (fills the jar fast) · GOLD SALT/GARLIC · FIERY CHILI · ICE · MOULD, FLY, **CATERPILLAR** (hazards) |
| 🧄 **Gold Garlic shield** | Power-up: stack up to **2 shield charges** that absorb cracks; a rotating halo orbits the jar |
| 🏆 **14 achievements** | Persist **across runs** (localStorage), with a "NEW ACHIEVEMENT!" toast on the game-over screen |
| 🔊 **Hand-built audio** | 11 synthesized Web Audio API effects (zero files) + pentatonic score that shifts with level; mute with `M` |
| 💾 **TOP 8 leaderboard** | Local storage, validated & normalised on read, auto upper-case names, highlight for freshly set records |
| 🎨 **60fps graphics** | Canvas 2D, 460-particle budget, DPR cap 2, pre-rendered offscreen tile floor, star twinkle + menu aurora |
| 📴 **Truly offline-first** | Self-hosted fonts (latin + vietnamese subsets, woff2), no CDN, no API — double-click `dist/index.html` and play |
| 🧪 **Quality gates** | 55 unit tests (vitest) for modes / achievements / storage / i18n — `npm run check` is the CI gate |

<img src="assets/items.svg" alt="The 14 ingredients — pickles to catch, golden powers to grab, hazards to dodge" width="100%" />

## 🌐 Switching languages

Lọ Chéo ships with **5 UI languages**, applied instantly — no reload, no lost run:

| Language | Where | Stored in |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | **VI** button (default; follows browser locale when unset) | `locheo.lang.v1` |
| 🇬🇧 English | **EN** button | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** button | `locheo.lang.v1` |
| 🇯🇵 日本語 | **日** button | `locheo.lang.v1` |
| 🇰🇷 한국어 | **한** button | `locheo.lang.v1` |

- Switch from the **main menu** (top-right) or the **pause screen** (bottom, compact mode).
- Every user-facing string lives in `src/i18n/locales/{vi,en,zh,ja,ko}.ts` — canvas engine, screens, HUD, popups, ticker, hints.
- Missing key? `t()` falls back to Vietnamese — the five locale key sets (and their placeholders) are enforced by tests.

## 🕹️ Controls

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | `W` `A` `S` `D` or `← ↑ ↓ →` | Drag anywhere (floating joystick) |
| **Slant (CHÉO)** | Hold **2 keys at once** (e.g. `A`+`W`) | Drag at **45°** — joystick ring turns gold |
| Jar slam (shockwave + vacuum) | `Space` | Red **SLAM** button, bottom-right |
| Pause / resume | `P` or `Esc` | Pause button, top-right |
| Instant restart | `R` (even while paused/game-over) | “Pickle again” button |
| Start / confirm | `Enter` | **ENTER THE KITCHEN** button |
| Mute / unmute | `M` | Speaker button, top-right |
| Switch language | — (use VI/EN/中/日/한 buttons) | VI/EN/中/日/한 buttons on menu / pause |

## 🚀 Install & run

### Play right away (no build)

```bash
# every release ships a single self-contained file:
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### Production build

```bash
npm install        # install dependencies (Node ≥ 20.19)
npm run build      # → dist/index.html (one self-contained file)
```

> `vite-plugin-singlefile` inlines all JS/CSS/fonts/images into **one** `dist/index.html` (~655 KB, gzip ~330 KB). No server, no network.

### Development

```bash
npm run dev        # dev server with HMR (http://localhost:5173)
npm run preview    # serve the production build locally
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 55 unit tests (modes / achievements / storage / i18n)
npm run check      # typecheck + test + build (CI quality gate)
```

## 🗂️ Project structure

```
lo-cheoio/
├─ index.html              # entry, SEO/OG meta (no CDN)
├─ package.json            # lo-cheoio v1.1.3, scripts dev/build/test/check
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; includes src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # README banner (SMIL animation)
│  ├─ demo.svg             # gameplay simulation (SMIL animation)
│  ├─ items.svg            # the 14 ingredients (SMIL animation)
│  ├─ modes.svg            # the 7 modes (SMIL animation)
│  ├─ license.svg          # animated AGPL-3.0 copyleft seal (SMIL animation)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # macOS launcher — double-click, full colored menu
│  ├─ play-windows.bat     # Windows launcher — double-click, full colored menu
│  ├─ play-linux.sh        # Linux launcher — double-click, full colored menu
│  └─ README.md            # launcher guide for non-terminal folks
├─ docs/
│  ├─ DESCRIPTION.md       # multi-language project blurbs (vi/en/zh + SEO)
│  └─ releases/
│     ├─ v1.0.0.md         # first release notes
│     ├─ v1.1.0.md         # v1.1.0 release notes
│     ├─ v1.1.1.md         # v1.1.1 release notes
│     ├─ v1.1.2.md         # v1.1.2
│     └─ v1.1.3.md         # current release notes (1.1.3)
├─ README.md               # 🇻🇳 Tiếng Việt
├─ README.en.md            # 🇬🇧 English (this file)
├─ README.zh.md            # 🇨🇳 中文
├─ README.ja.md            # 🇯🇵 日本語
├─ README.ko.md            # 🇰🇷 한국어
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français
├─ README.th.md            # 🇹🇭 ไทย
├─ README.de.md            # 🇩🇪 Deutsch
├─ README.pt.md            # 🇵🇹 Português
├─ src/
│  ├─ main.tsx             # React root, StrictMode
│  ├─ App.tsx              # phase machine menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.3" (single source of truth)
│  ├─ index.css            # tailwind v4 theme + all animation/gradient
│  ├─ assets/fonts/        # woff2 subsets (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, 100% offline
│  ├─ i18n/
│  │  ├─ i18n.ts           # pure module: detect, persist, t() + interpolation
│  │  ├─ useI18n.ts        # React hook: useI18n/useLanguage
│  │  └─ locales/          # vi.ts (key source) · en · zh · ja · ko
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # canvas + floating joystick + keyboard + visibility
│  │  ├─ StartScreen.tsx   # menu: aurora, shimmer, mode picker, achievements
│  │  ├─ ModeSelector.tsx  # 7 mode cards (classic/zen/inferno/blitz/goldrush/storm/hardcore)
│  │  ├─ AchievementsPanel.tsx  # locked/unlocked badge wall
│  │  ├─ GameOverScreen.tsx     # JAR SHATTERED! + score + new achievements
│  │  ├─ PauseScreen.tsx        # PAUSED + run stats
│  │  ├─ LanguageSwitcher.tsx   # shared VI / EN / 中 / 日 / 한 switcher
│  │  └─ ui.tsx            # GameButton, Panel, Keycap, Stat, ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # entire simulation + canvas rendering (~2100 lines)
│  │  ├─ modes.ts          # game modes + balance math (pure)
│  │  ├─ achievements.ts   # 14 badges + pure checker (pure)
│  │  ├─ storage.ts        # localStorage: top 8, progress, achievements
│  │  └─ audio.ts          # Web Audio synth: sfx + pentatonic music
│  └─ utils/cn.ts          # clsx + tailwind-merge
└─ tests/                  # vitest — modes, achievements, storage, i18n
```

## 🧱 Architecture & performance

- **Game loop** on `requestAnimationFrame` with delta-time clamped to `1/20s`, multiplied by `timeScale` (ICE slow-mo) and a short **hit-stop** freeze on each catch for that “punch”.
- **Canvas HUD** drawn directly each frame; React only renders screens per `phase` — no React re-renders in the hot loop; on language change the HUD picks up the new dictionary on the very next frame.
- **Layered i18n**: `src/i18n/i18n.ts` is a pure module (no React), `useI18n` merely bridges re-renders via the `locheo:languagechange` event; `t()` supports `{param}` interpolation and falls back to Vietnamese.
- **Tile floor** pre-rendered once to an offscreen canvas (with vignette + light pools); star twinkle and bubbles are computed in real time — very cheap.
- **Budget**: ≤460 particles, ≤70 items, ≤34 popups, DPR ≤ 2; hitbox collision sweep; pickle splats on the floor clean themselves up.
- **localStorage** with input validation/normalisation — one bad record never corrupts the board; when storage is blocked (Safari private mode) the game keeps playing in memory; the language choice lives separately in `locheo.lang.v1`.
- **Motion chill**: `prefers-reduced-motion` disables aurora/shimmer/spin; both the background stars and screen shake respect media queries.

## ❓ FAQ

**Can I play without a network?**
Yes — 100%: open `dist/index.html` and everything works, fonts and audio included. There is not a single network request.

**Ads or telemetry?**
None. No tracking, no analytics — your scores never leave your localStorage.

**Does switching language lose my progress?**
No. Scores, achievements, progress and mode selection are all independent of `locheo.lang.v1`.

**Where are the TOP 8 scores stored?**
`locheo.scores.v1` (scores), `locheo.progress.v1` (lifetime runs/jars/shreds), `locheo.achievements.v1` (badges) — wiping storage wipes them, so cherish the jar!

**Want to add another language?**
Add `src/i18n/locales/xx.ts` mirroring `vi.ts` key set, update `LANGUAGES` + tests, open a PR — see [CONTRIBUTING.md](CONTRIBUTING.md).

**Not comfortable with a terminal?**
Double-click [`scripts/play-mac.command`](scripts/play-mac.command) (macOS), [`scripts/play-windows.bat`](scripts/play-windows.bat) (Windows) or [`scripts/play-linux.sh`](scripts/play-linux.sh) (Linux) — a colored menu appears; pick `1` to build & play instantly, `2` for the dev server. Details: [scripts/README.md](scripts/README.md).

## 📦 Releases & changelog

| Version | Date | Notes |
| --- | --- | --- |
| [v1.1.3](docs/releases/v1.1.3.md) | 2026-11-12 | 7 modes (Pickle Rain · Thin Ceramic) · 14 achievements · 5 languages · favicon · multilingual launchers · 55 tests |
| [v1.1.2](docs/releases/v1.1.2.md) | 2026-11-12 | 5 modes (60-Second Rush · Gold Rush) · 12 achievements · combo flames · double-click launchers · README in 10 languages · 49 tests |
| [v1.1.1](docs/releases/v1.1.1.md) | 2026-11-12 | In-game i18n VI/EN/ZH · README in 7 languages · full bug sweep · 45 tests |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3 game modes · Gold Garlic shield · Caterpillar · Gold Greens · 10 achievements · self-hosted fonts |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | First release: complete engine, 11 ingredients, JAR SLAM, ×9 combo |

See also [CHANGELOG.md](CHANGELOG.md).

## 🤝 Contributing

1. Fork the repo, branch with the `arena/<name>` or `feat/<name>` convention.
2. `npm run check` must be green before opening a PR (typecheck + 55 tests + build).
3. Avoid new runtime dependencies unless truly necessary — philosophy: **one file, no network, playable forever**.
4. In your PR, note the screens/modes affected and attach a clip if gameplay changes.

## 📄 License & author

<img src="assets/license.svg" alt="AGPL-3.0-only — copyleft license" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — see [LICENSE](LICENSE) & [assets/license.svg](assets/license.svg).
- Fonts: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (self-hosted woff2 subsets).
- To every pickled jar on every Vietnamese rice tray — cheers. 🫙🇻🇳
