<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Pickled Jar Showdown" width="100%" />

# LỌ CHÉO — PICKLED JAR SHOWDOWN

### 🫙 Vietnamese pickle arcade running 100% in the browser — one self-contained HTML file, offline-first
### 🌐 In-game UI in 7 languages — Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.8-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.8.md)
[![Tier](https://img.shields.io/badge/tier-PATCH%20%C2%B7%20violet-9d6bff.svg?style=for-the-badge)](#-changelog-tiers--one-colour-per-tier)
[![Tests](https://img.shields.io/badge/tests-286%20%C2%B7%2035%20files-2bb48c.svg?style=for-the-badge&logo=vitest&logoColor=white)](#-quality-gates)
[![CI](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml/badge.svg)](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-install--run)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-production-build)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO%20%C2%B7%20ES%20%C2%B7%20FR-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-switching-languages)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo gameplay — the jar slants diagonally, catches pickles, shreds moulds" width="100%" />

<img src="assets/languages.svg" alt="7 in-game languages — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

<img src="assets/palette-ribbon.svg" alt="The Lọ Chéo palette — seven bands breathing in turn (SMIL animation)" width="100%" />

</div>

---

## 🥒 About the project

> Lọ Chéo — Pickled Jar Showdown: a pickle arcade that runs 100% in the browser, packed into a single self-contained HTML file, offline-first — no CDN, no server. The ceramic jar only knows how to move DIAGONALLY: hold two keys to slant, boost and shred moulds, flies and caterpillars, then fill the jar before the ceramic cracks in three. **9 game modes · 14 ingredients · 16 achievements · TOP 8 leaderboard · UI in 7 languages.**

This is a **single-screen action arcade** inspired by Vietnam's humble pickled vegetables. No linear levels, no cluttered menus — just the jar, an endless downpour of produce, and your blazing reflexes.

## 🆕 What's new in v1.1.8

> The **final patch** before 1.2.0. No new game mode — the start screen stops overflowing, three folders are added, and every doc is synced.

### 📐 The start screen no longer overflows

The screenshot showed **four defects at once**: the `CHÉO` wordmark cut through the middle, the mascot jar missing its lower half, the GAME panel sliced at the bottom, and the copyright line under the ticker cut off. All four had **one cause** — an addition nobody owned.

```
the old flex column at 1280×720:
  scene      flex-1     →  got 250px   (needed ~700px)
  panel row  shrink-0   →     415px
  ticker     shrink-0   →      55px
                          ─────────────
                          720 − 415 − 55 = 250
```

`shrink-0` made the last two inflexible, so the scene kept only **250px** and anything taller — the wordmark, the jar — was clipped by `overflow-y-auto` at `y≈247px`. The seam measured in the image is **247.3px**; the arithmetic says **250.0px**. They agree to within 2.7px.

<img src="assets/layout-fix.svg" alt="v1.1.7 vs v1.1.8 layout — a 250px scene cut in half against a 382px scene plus 338px reserve with floating chrome (SMIL animation)" width="100%" />

**The fix** — take the chrome out of the flow and give the total an owner:

| Change | Effect |
| --- | --- |
| `MenuChrome` is `position: absolute` | it cannot shrink the scene — the scene always gets all 720px |
| scene `padding-bottom: plan.reserve` | content never hides under the panels, yet the scene *may* be full height |
| `.menu-ticker` fixed at 48px + `overflow: hidden` | the copyright sits inline with the marquee instead of wrapping to a second row |

At the exact size in the screenshot the scene goes **250px → 382px**. The jar and the wordmark are whole — and **no SVG was touched**, because `jar.tsx` still draws the full `viewBox 0 0 120 140`; the lower half was simply outside the visible area.

### 🔍 Four secondary bugs found while measuring

| # | Bug | Cause | Fix |
| --- | --- | --- | --- |
| 1 | **Teal scrollbar** painted over the nebula at the right edge | the scene exposed an 8px track while content overflowed | hide it, reserve space with `padding-bottom` |
| 2 | **Panels overlapping** on phones | `208 + 224px` does not fit a `375px` screen | stack them below 520px |
| 3 | **`CHÉO` too tall** on a short-but-wide window | the size only scaled with `17vw`, never with height | `clamp(3.4rem, min(17vw, 20vh), 10.5rem)` |
| 4 | **Panel height depended on the language** | a row was as tall as its hint wrapped; Vietnamese/German took three lines | fixed `--menu-row-h` plus a two-line hint clamp |

### 🗂️ Three new folders — 22 files

```
src/components/menu/layout/     src/components/menu/ticker/     src/game/achievements/
├── metrics.ts                  ├── keys.ts                    ├── types.ts
├── fit.ts                      ├── MenuTicker.tsx             ├── defs/  ← 16 files
├── index.ts                    └── index.ts                   └── index.ts
└── README.md
```

Each achievement now has **its own file** stating the unlock condition and why it exists — the question the old sixteen-row table could not answer:

```ts
/**
 * hardcore-jar — HARDCORE JAR
 *
 * Unlocks when: `run.mode === "hardcore" && run.jars >= 1`
 *
 * Why this one exists: mode-specific: one jar with a single crack
 */
```

### 🧪 30 new tests lock it down

| File | Tests | What it pins |
| --- | --- | --- |
| `tests/menu-layout.test.ts` | **22** | the addition that used to overflow; CSS ↔ TypeScript agree on every constant; the floating row has no `shrink-0` |
| `tests/achievements-split.test.ts` | **8** | the sixteen-file split preserves id order and every id is still granted |
| `scripts/probe-menu-layout.tsx` | **11** | the same properties, checked against the **real DOM** produced by `react-dom/server` |

### 🐛 Fixes

| # | Bug | Fix |
| --- | --- | --- |
| 1 | `CHÉO` cut through | chrome out of the flow + the scene reserves its own space |
| 2 | Mascot jar half missing | same cause — **not** the SVG |
| 3 | GAME panel sliced at the bottom | a 732px flex column in a 720px box |
| 4 | Copyright line cut off | the ticker is a fixed 48px single row |
| 5 | Teal scrollbar over the art | `scrollbar-width: none` |
| 6 | Panels overlapping on mobile | stack below 520px |
| 7 | `CHÉO` taller than its box | also cap against `20vh` |
| 8 | Panel height changed per language | fixed `--menu-row-h` + hint clamp |

→ Full detail: [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · Previous: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)

<img src="assets/settings-sections.svg" alt="Six-section settings (since v1.1.6) — switches, level bars and pickers (SMIL animation)" width="100%" />

<img src="assets/corner-menu.svg" alt="Corner GAME (bottom-left) & INFO (bottom-right) panels sliding in (SMIL animation)" width="100%" />

## ✨ Highlights

| Group | Details |
| --- | --- |
| 🎮 **9 game modes** | **CLASSIC PICKLE** (balanced) · **ZEN** (no hazards, ×0.5) · **INFERNO CHILI** (+35% speed, ×1.5) · **60-SECOND RUSH** (time-attack 60s, ×1.25) · **GOLD RUSH** (gold loot ×2.6 spawn) · **PICKLE RAIN** (~1.4× denser, ×0.75) · **THIN CERAMIC** (one crack is fatal, ×2.0) · **COMBO FESTIVAL** (combo window ×2, ×1.15) · **GRAND FEAST** (~×2 dense rain, jar bonus ×2.5, ×0.6) |
| 🌐 **In-game i18n** | Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français — `src/i18n/` (pure module + React bridge), `t()` with interpolation, syncs `<html lang>`, locale-aware numbers (vi-VN / en-US / zh-CN / ja-JP / ko-KR / es-ES / fr-FR) |
| 🕹️ **Signature SLANT mechanic** | Hold 2 keys/axes diagonally — the jar boosts, glows and shreds hazards. Dedicated stamina bar with anti-flicker hysteresis |
| 🥬 **14 ingredients** | Eggplant, chili, garlic, ginger, salt, greens, **GOLD GREENS** (fills the jar fast) · GOLD SALT/GARLIC · FIERY CHILI · ICE · MOULD, FLY, **CATERPILLAR** (hazards) |
| 🧄 **Gold Garlic shield** | Power-up: stack up to **2 shield charges** that absorb cracks; a rotating halo orbits the jar |
| 🏆 **16 achievements** | Persist **across runs** (localStorage), with a "NEW ACHIEVEMENT!" toast on the game-over screen |
| 🔊 **Hand-built audio** | 11 synthesized Web Audio API effects (zero files) + pentatonic score that shifts with level; mute with `M` |
| 💾 **TOP 8 leaderboard** | Local storage, validated & normalised on read, auto upper-case names, highlight for freshly set records |
| 🎨 **60fps graphics** | Canvas 2D, 460-particle budget, DPR cap 2, pre-rendered offscreen tile floor, star twinkle + menu aurora |
| 📴 **Truly offline-first** | Self-hosted fonts (latin + vietnamese subsets, woff2), no CDN, no API — double-click `dist/index.html` and play |
| 🧪 **Quality gates** | 286 unit tests (vitest) for modes / achievements / storage / i18n / settings — `npm run check` is the CI gate |

<img src="assets/items.svg" alt="The 14 ingredients — pickles to catch, golden powers to grab, hazards to dodge" width="100%" />

## 🌐 Switching languages

Lọ Chéo ships with **7 UI languages**, applied instantly — no reload, no lost run:

<img src="assets/languages.svg" alt="7 languages — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

| Language | Where | Stored in |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | **VI** button (default; follows browser locale when unset) | `locheo.lang.v1` |
| 🇬🇧 English | **EN** button | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** button | `locheo.lang.v1` |
| 🇯🇵 日本語 | **日** button | `locheo.lang.v1` |
| 🇰🇷 한국어 | **한** button | `locheo.lang.v1` |
| 🇪🇸 Español | **ES** button | `locheo.lang.v1` |
| 🇫🇷 Français | **FR** button | `locheo.lang.v1` |

- Switch language in **Settings → LANGUAGE** (a grid of 7 flag buttons) — one place only, no more floating widget over the menu.
- Every user-facing string lives in `src/i18n/locales/{vi,en,zh,ja,ko,es,fr}.ts` — canvas engine, screens, HUD, popups, ticker, hints.
- Missing key? `t()` falls back to Vietnamese — the seven locale key sets (and their placeholders) are enforced by tests.

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
| Switch language | — (use VI/EN/中/日/한/ES/FR buttons) | VI/EN/中/日/한/ES/FR buttons on menu / pause |

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

> `vite-plugin-singlefile` inlines all JS/CSS/fonts/images into **one** `dist/index.html` (~700 KB, gzip ~355 KB). No server, no network.

### Development

```bash
npm run dev        # dev server with HMR (http://localhost:5173)
npm run preview    # serve the production build locally
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 286 unit tests (modes / achievements / storage / i18n / settings)
npm run check      # typecheck + test + build (CI quality gate)
```

## 🗂️ Project structure

```
lo-cheoio/
├─ index.html              # entry, SEO/OG meta (no CDN)
├─ package.json            # lo-cheoio v1.1.8, scripts dev/build/test/check
├─ .gitattributes          # *.bat/*.cmd → CRLF · posix scripts → LF · binaries
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; includes src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # README banner (SMIL animation)
│  ├─ demo.svg             # gameplay simulation (SMIL animation)
│  ├─ items.svg            # the 14 ingredients (SMIL animation)
│  ├─ modes.svg            # the 9 modes (SMIL animation)
│  ├─ languages.svg        # the 7 in-game languages (SMIL animation)
│  ├─ new-modes.svg        # the 2 new v1.1.4 modes (SMIL animation)
│  ├─ corner-menu.svg      # corner GAME/INFO panels (SMIL animation, v1.1.5)
│  ├─ settings-sections.svg # 6-section settings tour (SMIL, v1.1.6)
│  ├─ palette-ribbon.svg   # 7-slice palette ribbon, sheen sweep (SMIL, v1.1.7)
│  ├─ architecture.svg     # architecture + data flow diagram (SMIL, v1.1.7)
│  ├─ release-tiers.svg    # 3 tiers + 10-release timeline (SMIL, v1.1.7)
│  ├─ layout-fix.svg       # v1.1.7 vs v1.1.8 layout, side by side (SMIL, v1.1.8)
│  ├─ test-matrix.svg      # 8 gates · 286 tests · distribution (SMIL, v1.1.8)
│  ├─ divider.svg          # sparkle divider (SMIL animation)
│  ├─ license.svg          # animated AGPL-3.0 copyleft seal (SMIL animation)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # macOS launcher — double-click, full colored menu
│  ├─ play-windows.bat     # Windows launcher — CRLF + UTF-8 BOM, 7 languages
│  ├─ play-linux.sh        # Linux launcher — double-click, full colored menu
│  └─ README.md            # launcher guide for non-terminal folks
├─ docs/
│  ├─ README.md            # docs index (v1.1.5)
│  ├─ DESCRIPTION.md       # multi-language project blurbs (vi/en/zh + SEO)
│  ├─ design/              # menu-corners / save-format / settings-format specs
│  ├─ guides/              # engine overview · a11y · performance · storage keys · release playbook…
│  └─ releases/
│     ├─ v1.0.0.md         # first release notes
│     ├─ v1.1.0.md         # v1.1.0 release notes
│     ├─ v1.1.1.md         # v1.1.1 release notes
│     ├─ v1.1.2.md         # v1.1.2
│     ├─ v1.1.3.md         # v1.1.3 release notes
│     ├─ v1.1.4.md         # release notes (1.1.4)
│     ├─ v1.1.5.md         # release notes (1.1.5)
│     ├─ v1.1.6.md         # release notes (1.1.6)
│     ├─ v1.1.7.md         # release notes (1.1.7)
│     └─ v1.1.8.md         # current release notes (1.1.8)
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
│  ├─ version.ts           # APP_VERSION = "1.1.7" (single source of truth)
│  ├─ index.css            # tailwind v4 theme + all animation/gradient
│  ├─ assets/fonts/        # woff2 subsets (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, 100% offline
│  ├─ i18n/
│  │  ├─ i18n.ts           # pure module: detect, persist, t() + interpolation
│  │  ├─ useI18n.ts        # React hook: useI18n/useLanguage
│  │  └─ locales/          # vi.ts (key source) · en · zh · ja · ko · es · fr
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # canvas + floating joystick + keyboard + visibility
│  │  ├─ StartScreen.tsx   # menu: hero + layered animated scene + corner panels
│  │  ├─ menu/              # corner GAME/INFO panels + modals + icons/
│  │  │  ├─ background/     # 8 background layers as data (v1.1.7)
│  │  │  ├─ layout/         # metrics · fit · planMenuLayout, 22 tests (v1.1.8)
│  │  │  └─ ticker/         # bottom ticker band, 14 strings (v1.1.8)
│  │  ├─ ModeSelector.tsx  # 9 mode cards (classic… hardcore · combo · feast)
│  │  ├─ AchievementsPanel.tsx  # locked/unlocked badge wall
│  │  ├─ GameOverScreen.tsx     # JAR SHATTERED! + score + new achievements
│  │  ├─ PauseScreen.tsx        # PAUSED + run stats
│  │  ├─ settings/           # six-section settings module + controls (v1.1.6)
│  │  └─ ui/               # eight primitives, one file each (v1.1.7 — split from ui.tsx)
│  ├─ game/
│  │  ├─ engine.ts         # entire simulation + canvas rendering (~2260 lines)
│  │  ├─ modeTypes.ts      # ModeId · ModeConfig (types-only, v1.1.7)
│  │  ├─ modes/            # 9 balance records — classic.ts … feast.ts (v1.1.7)
│  │  ├─ modesIndex.ts     # MODES · MODE_LIST · isModeId (v1.1.7)
│  │  ├─ modeMath.ts       # multiplierForCombo · jarBonus · comboWindowFor… (v1.1.7)
│  │  ├─ modes.ts          # barrel — keeps every old import working
│  │  ├─ achievements/      # 16 defs + types + checker (v1.1.8)
│  │  │  └─ defs/           # one file per achievement
│  │  ├─ storage.ts        # localStorage: top 8, progress, achievements
│  │  ├─ audio.ts          # Web Audio synth: sfx + pentatonic music
│  │  ├─ changelog/          # in-game changelog (v1.1.7 — split from one file)
│  │  │  ├─ types.ts        #   ChangelogEntry · ReleaseTier · copyFor()
│  │  │  ├─ tiers.ts        #   tierFor() · TIER_ORDER · TIER_LABEL_KEY
│  │  │  ├─ entries/        #   1 file per release — v1_0_0.ts … v1_1_8.ts
│  │  │  └─ index.ts        #   ordered list + 5 helpers
│  │  ├─ runSave.ts         # suspended-run persistence
│  │  ├─ settings.ts        # settings schema, defaults, normalize
│  │  ├─ settingsIO.ts      # backup/restore codec (v1.1.6)
│  │  ├─ settingsPresets.ts # four quick presets (v1.1.6)
│  │  └─ audioLevels.ts     # pure gain math (v1.1.6)
│  └─ utils/
│     ├─ cn.ts             # clsx + tailwind-merge
│     └─ useFocusTrap.ts   # modal focus containment (v1.1.6)
└─ tests/                  # vitest — 35 files · 286 tests (modes · achievements · storage · i18n · runSave · settings · presets · audio…)
```

## 🧱 Architecture & performance
<img src="assets/architecture.svg" alt="Lọ Chéo v1.1.8 architecture — input → engine → state → render plus services (SMIL animation)" width="100%" />


- **Game loop** on `requestAnimationFrame` with delta-time clamped to `1/20s`, multiplied by `timeScale` (ICE slow-mo) and a short **hit-stop** freeze on each catch for that “punch”.
- **Canvas HUD** drawn directly each frame; React only renders screens per `phase` — no React re-renders in the hot loop; on language change the HUD picks up the new dictionary on the very next frame.
- **Layered i18n**: `src/i18n/i18n.ts` is a pure module (no React), `useI18n` merely bridges re-renders via the `locheo:languagechange` event; `t()` supports `{param}` interpolation and falls back to Vietnamese.
- **Data-driven modes**: each mode is a record in `src/game/modes.ts` (scoreMult/speedMult/hazardMult/spawnMult + optional timeLimit/goldMult/maxCracks/**comboWindowMult**/**jarBonusMult**) — adding a mode never touches the engine.
- **Tile floor** pre-rendered once to an offscreen canvas (with vignette + light pools); star twinkle and bubbles are computed in real time — very cheap.
- **Budget**: ≤460 particles, ≤70 items, ≤34 popups, DPR ≤ 2; hitbox collision sweep; pickle splats on the floor clean themselves up.
- **localStorage** with input validation/normalisation — one bad record never corrupts the board; when storage is blocked (Safari private mode) the game keeps playing in memory; the language choice lives separately in `locheo.lang.v1`.
- **Motion chill**: `prefers-reduced-motion` disables aurora/shimmer/spin; both the background stars and screen shake respect media queries.

## ✅ Quality gates

Every change must clear **six gates** before it reaches `main` — one command runs them all:

```console
$ npm run check        # typecheck + every test
$ npm run check:readme # 10 READMEs in version + release-link sync
$ npm run check:i18n   # 7 locales × 302 keys, nothing missing or extra
$ npm run check:assets # 14 SVGs — no orphans, no broken references
$ npm run smoke        # SSR smoke: every menu/modal renders
$ npx vite-node scripts/probe-menu-layout.tsx   # 11 layout checks on the real DOM
```

<img src="assets/test-matrix.svg" alt="v1.1.8 test matrix — eight green gates, 286 tests across 35 files, grouped by area (SMIL animation)" width="100%" />

| Gate | Scope | 1.1.8 status |
| --- | --- | --- |
| `typecheck` | `src/` + `tests/` (TypeScript strict) | ✅ |
| `vitest run` | **286 tests / 35 files** | ✅ |
| `smoke-ssr` | menu, 6 settings sections, changelog, 9 modals | ✅ |
| `check-readme-sync` | 10 READMEs × badge/link/SVG | ✅ |
| `check-i18n` | 7 locales × 302 keys | ✅ |
| `check-assets` | 14 SVGs, references checked both ways | ✅ |
| `probe-menu-layout` | 11 layout checks on the real DOM | ✅ |
| `build` | `dist/index.html` ~840 KB · gzip ~391 KB | ✅ |

The v1.1.8 highlight is **`tests/menu-layout.test.ts`**: one assertion — `CORNER_ROW_RESERVE < 720 − 320` — is enough to catch the v1.1.7 overflow, and the rest pins the CSS constants to their TypeScript twins. The closest runner-up is **`tests/changelog-tiers.test.ts`**: it locks the `tierFor()` mapping (junk input included), demands **≥5 bullets** per release, rejects duplicate bullets and enforces a **strictly ordered date timeline** — that test is what caught 1.1.5 and 1.1.6 sharing a day.

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

**The Windows launcher complains about Vietnamese characters?**
Fixed in v1.1.4: `play-windows.bat` is CRLF + UTF-8 BOM with `chcp 65001` and the Vietnamese diacritics are fully intact — the `'Ọ' is not recognized...` error is gone for good. If you edit the `.bat` with another editor, keep the CRLF & BOM (`.gitattributes` enforces this automatically).

**Not comfortable with a terminal?**
Double-click [`scripts/play-mac.command`](scripts/play-mac.command) (macOS), [`scripts/play-windows.bat`](scripts/play-windows.bat) (Windows) or [`scripts/play-linux.sh`](scripts/play-linux.sh) (Linux) — a colored menu appears; pick `1` to build & play instantly, `2` for the dev server, `L` to switch language (7 available). Details: [scripts/README.md](scripts/README.md).

<img src="assets/release-tiers.svg" alt="Three tiers MAJOR/UPDATE/PATCH with their colours and a ten-release timeline (SMIL animation)" width="100%" />

## 📦 Releases & changelog

| Version | Tier | Date | Notes |
| --- | --- | --- | --- |
| [v1.1.8](docs/releases/v1.1.8.md) | 🟣 **PATCH** | 2026-11-14 | **Start screen stops overflowing** (chrome out of the flex flow: scene `250px → 382px`; wordmark and jar intact) · **fixed 48px ticker** · **scrollbar hidden instead of painted over the art** · **panels stack on mobile** · **`menu/layout/` + `menu/ticker/` + `achievements/` in 16 files** · **30 new tests** · everything synced to 1.1.8 · **286 tests** |
| [v1.1.7](docs/releases/v1.1.7.md) | 🟣 **PATCH** | 2026-11-12 | **Menu background un-fogged** (four compounding overlays: `blur 64→22px`, corner vignette instead of full-screen, CRT frame 140→90px, floor 45→70%) · **tiered colour changelog** · **96 new description bullets** for 8 older releases · dates re-sequenced · `src/game/changelog/` split · 10 READMEs rebuilt · **286 tests** |
| [v1.1.6](docs/releases/v1.1.6.md) | 🟣 **PATCH** | 2026-11-10 | **Six-section settings** (presets · audio · display · language · backup · data) · 0–100 volumes · shake level · visual quality · auto-pause on blur · language moved into Settings · 4 presets · JSON export/import · layered animated menu scene · looping gradient on the author card · modal focus trap · music-after-reload fix · **150 tests** |
| [v1.1.5](docs/releases/v1.1.5.md) | 🟣 **PATCH** | 2026-11-08 | **Corner GAME/INFO menus** (Play · Continue · Modes · Leaderboard · Achievements · Settings / About · Changelog · Quit) · **save & resume suspended run** (`locheo.run.v1`) · in-game settings (SFX/music/shake/reduced motion) · modal shortcut-leak fix · prefers-reduced-motion everywhere · **113 tests** |
| [v1.1.4](docs/releases/v1.1.4.md) | 🟣 **PATCH** | 2026-11-06 | **9 modes** (Combo Festival · Grand Feast) · **16 achievements** · **7 languages** (ES/FR added) · play-windows.bat fix (CRLF+BOM) · 7-language launchers · 61 tests |
| [v1.1.3](docs/releases/v1.1.3.md) | 🟣 **PATCH** | 2026-11-04 | 7 modes · 14 achievements · 5 languages · favicon · multilingual launchers · 55 tests |
| [v1.1.2](docs/releases/v1.1.2.md) | 🟣 **PATCH** | 2026-11-02 | 5 modes (60-Second Rush · Gold Rush) · 12 achievements · combo flames · double-click launchers · README in 10 languages · 49 tests |
| [v1.1.1](docs/releases/v1.1.1.md) | 🟣 **PATCH** | 2026-10-31 | In-game i18n VI/EN/ZH · README in 7 languages · full bug sweep · 45 tests |
| [v1.1.0](docs/releases/v1.1.0.md) | 🟡 **UPDATE** | 2026-10-29 | 3 game modes · Gold Garlic shield · Caterpillar · Gold Greens · 10 achievements · self-hosted fonts |
| [v1.0.0](docs/releases/v1.0.0.md) | 🩷 **MAJOR** | 2026-10-26 | First release: complete engine, 11 ingredients, JAR SLAM, ×9 combo |

See also [CHANGELOG.md](CHANGELOG.md).

## 🗺️ Roadmap (draft — subject to change with feedback)

| Milestone | ETA | Ideas |
| --- | --- | --- |
| **v1.2.0** | 2026 Q1 | Procedural soundtrack per mode · visual regression tests (Playwright) in CI · deeper font subsetting to shrink the bundle |
| **v1.3.0** | 2026 Q1–Q2 | 10th game mode (candidate: **FLY SWARM** — flies only, survive by slashing) · seeded mode for daily challenges |
| **v1.4.0** | 2026 Q2 | **Opt-in** online leaderboard (serverless, encrypted) — offline-first stays the default |
| Backlog | — | Ghost replay of your best run · photo mode (hide HUD, export PNG) · Thai (ไทย) locale under consideration |

*A roadmap is not a promise — priority order is always: stability → easier to play → more content.*

## 📚 Further reading & dev docs

Design notes and deeper technical docs:

| Doc | What it covers |
| --- | --- |
| [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md) | Release v1.1.7 — background un-fogged (four-layer diagnosis), tiered changelog, 96 new bullets |
| [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md) | Release v1.1.6 — six-section settings, presets, backup, layered menu scene |
| [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md) | Release v1.1.5 — corner menus, save/resume, settings, fixes |
| [docs/design/menu-corners.md](docs/design/menu-corners.md) | Corner GAME/INFO menu design — principles, a11y, responsive |
| [docs/design/save-format.md](docs/design/save-format.md) | Spec `locheo.run.v1` — suspended-run snapshot (schema + lifecycle) |
| [docs/design/settings-format.md](docs/design/settings-format.md) | Spec `locheo.settings.v1` — game settings (schema + wiring) |
| [docs/guides/troubleshooting.md](docs/guides/troubleshooting.md) | Common issues — black screen · audio · Continue · launcher |
| [scripts/smoke-ssr.tsx](scripts/smoke-ssr.tsx) | Headless render smoke test (full menu/modal tree) |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | CI: npm ci → npm run check (Node 22) |

## 🤝 Contributing

1. Fork the repo, branch with the `arena/<name>` or `feat/<name>` convention.
2. `npm run check` must be green before opening a PR (typecheck + 286 tests + build).
3. Avoid new runtime dependencies unless truly necessary — philosophy: **one file, no network, playable forever**.
4. In your PR, note the screens/modes affected and attach a clip if gameplay changes.

## 📄 License & author

<img src="assets/license.svg" alt="AGPL-3.0-only — copyleft license" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — see [LICENSE](LICENSE) & [assets/license.svg](assets/license.svg).
- Fonts: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (self-hosted woff2 subsets).
- To every pickled jar on every Vietnamese rice tray — cheers. 🫙🇻🇳
