<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Pickled Jar Showdown" width="100%" />

# LỌ CHÉO — PICKLED JAR SHOWDOWN

### 🫙 Vietnamesisches Pickle-Arcade, zu 100% im Browser — eine einzige, in sich geschlossene HTML-Datei, offline-first
### 🌐 Spiel-UI in 7 Sprachen — Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.5-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.5.md)
[![CI](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml/badge.svg)](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-installieren--starten)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-produktions-build)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO%20%C2%B7%20ES%20%C2%B7%20FR-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-sprachen-wechseln)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo Gameplay — das Glas schrägt sich diagonal, fängt Gurken, zerfetzt Schimmel" width="100%" />

<img src="assets/languages.svg" alt="7 Sprachen — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

</div>

---

## 🥒 Worum es geht

> Lọ Chéo — Pickled Jar Showdown: ein Pickle-Arcade, der zu 100% im Browser läuft, verpackt in einer einzigen, in sich geschlossenen HTML-Datei, offline-first — kein CDN, kein Server. Das Keramikglas kennt nur EINE Bewegungsrichtung: diagonal. Halte zwei Tasten, um schräg zu laufen, zu beschleunigen und Schimmel, Fliegen und Raupen zu zerfetzten — und fülle das Glas, bevor die Keramik in drei Stücken platzt. **9 Modi · 14 Zutaten · 16 Erfolge · TOP-8-Rangliste · UI in 7 Sprachen.**

Das hier ist ein **Ein-Bildschirm-Action-Arcade** nach dem Vorbild des schlichten vietnamesischen eingelegtes Gemüses. Keine linearen Level, keine überladenen Menüs — nur das Glas, ein endloser Regen aus Gemüse und deine feurigen Reflexe.

<img src="assets/divider.svg" alt="" width="100%" />

## 🆕 Neu in v1.1.5

- 🧭 **Das Hauptmenü, endlich aufgeräumt** — alles rund ums Spiel steckt im **GAME-Panel unten links**: **Spielen** · **Fortsetzen** · **Spielmodi** · **Rangliste** (TOP 8) · **Erfolge** (16) · **Einstellungen**. Alles rund ums Projekt steckt im **INFO-Panel unten rechts**: **Über den Autor** · **Changelog** (in-game einsehbar) · **Beenden**.
- ⏸️ **„Fortsetzen“ — dein pausiertes Spiel nur einen Klick entfernt** — wenn du mitten im Spiel ins Menü zurückkehrst (Pause → Menü), landet der Stand als Snapshot in `locheo.run.v1`; **Fortsetzen** stellt ihn 1:1 wieder her: Punkte, Krüge, Risse, Stamina, Kombo, Schilde. Nur verfügbar, wenn wirklich ein Spiel pausiert wurde.
- ⚙️ **In-game-Einstellungen** — **SFX** · **Musik** · **Bildschirm-Shake** · **Reduzierte Bewegung** — sofort aktiv, ohne Neuladen; plus eine doppelte-Bestätigung-**Gefahrenzone „Gespeicherte Daten löschen“**.
- 🐛 **Shortcuts leckten durch Modals** — Enter/R/P/M/Space lösen das Spiel hinter einem Modal nicht mehr aus; **Stale Closure bei „Fortsetzen“**; **`prefers-reduced-motion` deaktiviert jetzt alle Animationen**.
- 📖 **READMEs noch schöner** — V1.1.5-Banner, neue Eck-Panel-SMIL-Animation, mehr Details in allen 10 Sprachen.
- 🧪 **107 Unit-Tests** (vorher 61) — grünes `npm run check`; neue **GitHub-Actions-CI** (npm ci → npm run check).

<img src="assets/corner-menu.svg" alt="GAME- (unten links) und INFO-Panel (unten rechts) gleiten herein (SMIL-Animation)" width="100%" />

→ Alle Details: [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md)

## ✨ Die Highlights

| Bereich | Details |
| --- | --- |
| 🎮 **9 Spielmodi** | **KLASSISCH EINGELEGT** (ausgewogen) · **ZEN** (keine Gefahren, ×0.5) · **CHILI-INFERNO** (+35% Tempo, ×1.5) · **60-SEKUNDEN-RUSH** (Time-Attack 60s, ×1.25) · **GOLDRAUSCH** (goldene Beute ×2.6) · **Eingelegter Regen** (~1.4× dichter, ×0.75) · **Dünnes Keramik** (ein Riss genügt, ×2.0) · **COMBO-FESTIVAL** (Fenster ×2, ×1.15) · **GROSSES GELAGE** (Dichte ~×2, Glas ×2.5, ×0.6) |
| 🌐 **i18n im Spiel** | Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français — `src/i18n/` (reines Modul + React-Brücke), `t()` mit Interpolation, synchronisiert `<html lang>`, länderspezifische Zahlen (vi-VN / en-US / zh-CN / ja-JP / ko-KR / es-ES / fr-FR) |
| 🕹️ **Signatur-SLANT-Mechanik** | 2 Tasten/Achsen diagonal gedrückt halten — das Glas beschleunigt, glüht und zerfetzt Gefahren. Eigener Ausdauerbalken mit Anti-Flacker-Hysterese |
| 🥬 **14 Zutaten** | Aubergine, Chili, Knoblauch, Ingwer, Salz, Gemüse, **GOLDGEMÜSE** (füllt das Glas schnell) · GOLDSALZ/-KNOBLAUCH · INFERNO-CHILI · EIS · SCHIMMEL, FLIEGE, **RAUPE** (Gefahren) |
| 🧄 **Goldknoblauch-Schild** | Power-up: bis zu **2 Schild-Ladungen** stapelbar, die Risse abfangen; ein rotierender Heiligenschein umkreist das Glas |
| 🏆 **16 Erfolge** | Über Läufe hinweg gespeichert (localStorage), mit „NEUER ERFOLG!“-Toast auf dem Game-Over-Bildschirm |
| 🔊 **Handgemachter Sound** | 11 synthetisierte Web-Audio-API-Effekte (null Dateien) + pentatonische Skala, die mit dem Level moduliert; stummschalten mit `M` |
| 💾 **TOP-8-Bestenliste** | Lokal gespeichert, beim Lesen validiert & normalisiert, Namen automatisch großgeschrieben, Highlight für frisch gesetzte Rekorde |
| 🎨 **60fps-Grafik** | Canvas 2D, 460-Partikel-Budget, DPR-Cap 2, vorgerenderter Offscreen-Boden, funkelnde Sterne + Aurora im Menü |
| 📴 **Echt offline-first** | Selbst gehostete Fonts (latein + vietnamesisch, woff2), kein CDN, keine API — `dist/index.html` doppelklicken und spielen |
| 🧪 **Qualitätstor** | 107 Unit-Tests (vitest) für modes / achievements / storage / i18n — `npm run check` ist das CI-Tor |

<img src="assets/items.svg" alt="Die 14 Zutaten — Pickles zum Fangen, goldene Power-ups zum Greifen, Gefahren zum Ausweichen" width="100%" />

## 🌐 Sprachen wechseln

Lọ Chéo bringt **7 Oberflächensprachen** mit — sofort wirksam, ohne Neuladen, ohne laufende Runde zu verlieren:

<img src="assets/languages.svg" alt="7 Sprachen — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

| Sprache | Wo | Gespeichert in |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | **VI**-Taste (Standard; sonst Browser-Sprache) | `locheo.lang.v1` |
| 🇬🇧 English | **EN** Taste | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** Taste | `locheo.lang.v1` |
| 🇯🇵 日本語 | **日** Taste | `locheo.lang.v1` |
| 🇰🇷 한국어 | **한** Taste | `locheo.lang.v1` |
| 🇪🇸 Español | **ES** Taste | `locheo.lang.v1` |
| 🇫🇷 Français | **FR** Taste | `locheo.lang.v1` |

- Wechsle im **Hauptmenü** (oben rechts) oder im **Pausenbildschirm** (unten, Kompaktmodus).
- Jeder sichtbare String lebt in `src/i18n/locales/{vi,en,zh,ja,ko,es,fr}.ts` — Canvas-Engine, Screens, HUD, Popups, Ticker, Hinweise.
- Schlüssel fehlt? `t()` fällt auf Vietnamesisch zurück — die sieben Key-Sets (inkl. Placeholder) werden per Test erzwungen.

## 🕹️ Steuerung

| Aktion | Tastatur | Touch |
| --- | --- | --- |
| Bewegen | `W` `A` `S` `D` oder `← ↑ ↓ →` | Überall ziehen (schwebender Joystick) |
| **Schiefe (CHÉO)** | **2 Tasten gleichzeitig** halten (z. B. `A`+`W`) | Mit **45°** ziehen — Joystick-Ring wird golden |
| Glas-Slam (Schockwelle + Vakuum) | `Space` | Roter **SLAM**-Button unten rechts |
| Pause / Fortsetzen | `P` oder `Esc` | Pause-Button oben rechts |
| Sofortiger Neustart | `R` (auch in Pause/Game-Over) | „Noch ein Pickle“-Button |
| Start / Bestätigen | `Enter` | **BETRETEN DIE KÜCHE**-Button |
| Stumm / Ton an | `M` | Lautsprecher-Button oben rechts |
| Sprache wechseln | — (VI/EN/中/日/한/ES/FR-Buttons) | VI/EN/中/日/한/ES/FR-Buttons im Menü / Pause |

## 🚀 Installieren & Starten

### Sofort spielen (ohne Build)

```bash
# Jeder Release liefert eine einzige in sich geschlossene Datei:
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### Produktions-Build

```bash
npm install        # Abhängigkeiten installieren (Node ≥ 20.19)
npm run build      # → dist/index.html (eine in sich geschlossene Datei)
```

> `vite-plugin-singlefile` inlined sämtliches JS/CSS/Fonts/Bilder in **eine** `dist/index.html` (~700 KB, gzip ~355 KB). Kein Server, kein Netz.

### Entwicklung

```bash
npm run dev        # Dev-Server mit HMR (http://localhost:5173)
npm run preview    # Produktions-Build lokal ausliefern
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 107 Unit-Tests (modes / achievements / storage / i18n)
npm run check      # typecheck + test + build (CI-Qualitätstor)
```

## 🗂️ Projektstruktur

```
lo-cheoio/
├─ index.html              # Einstieg, SEO/OG-Meta (kein CDN)
├─ package.json            # lo-cheoio v1.1.5, dev/build/test/check-Skripte
├─ .gitattributes          # *.bat/*.cmd → CRLF · posix → LF · binaries
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; enthält src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # README-Banner (SMIL-Animation)
│  ├─ demo.svg             # Gameplay-Simulation (SMIL-Animation)
│  ├─ items.svg            # die 14 Zutaten (SMIL-Animation)
│  ├─ modes.svg            # die 9 Modi (SMIL-Animation)
│  ├─ languages.svg        # 7 in-game languages (SMIL animation)
│  ├─ new-modes.svg        # the 2 new v1.1.4 modes (SMIL animation)
│  ├─ corner-menu.svg     # corner GAME/INFO panels (SMIL animation, v1.1.5)
│  ├─ divider.svg          # sparkle divider (SMIL animation)
│  ├─ license.svg          # animiertes AGPL-3.0-Copyleft-Siegel (SMIL-Animation)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # macOS-Launcher — Doppelklick, farbiges Menü
│  ├─ play-windows.bat     # Windows-Launcher — Doppelklick, farbiges Menü
│  ├─ play-linux.sh        # Linux-Launcher — Doppelklick, farbiges Menü
│  └─ README.md            # Launcher-Anleitung für Terminal-Neulinge
├─ docs/
│  ├─ README.md            # Doku-Index (v1.1.5)
│  ├─ DESCRIPTION.md       # mehrsprachige Projektbeschreibungen (vi/en/zh + SEO)
│  ├─ design/              # menu-corners / save-format / settings-format Specs
│  ├─ guides/              # Engine-Überblick · a11y · Performance · storage keys · Release-Playbook…
│  └─ releases/
│     ├─ v1.0.0.md         # erste Release-Notes
│     ├─ v1.1.0.md         # v1.1.0 Release-Notes
│     ├─ v1.1.1.md         # v1.1.1 Release-Notes
│     ├─ v1.1.2.md         # v1.1.2
│     ├─ v1.1.3.md         # v1.1.3 release notes
│     ├─ v1.1.4.md         # release notes (1.1.4)
│     └─ v1.1.5.md         # current release notes (1.1.5)
├─ README.md               # 🇻🇳 Tiếng Việt
├─ README.en.md            # 🇬🇧 English
├─ README.zh.md            # 🇨🇳 中文
├─ README.ja.md            # 🇯🇵 日本語
├─ README.ko.md            # 🇰🇷 한국어
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français
├─ README.th.md            # 🇹🇭 ไทย
├─ README.de.md            # 🇩🇪 Deutsch (diese Datei)
├─ README.pt.md            # 🇵🇹 Português
├─ src/
│  ├─ main.tsx             # React-Wurzel, StrictMode
│  ├─ App.tsx              # Phasenmaschine menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.5" (einzige Wahrheitsquelle)
│  ├─ index.css            # tailwind v4-Theme + alle Animationen/Verläufe
│  ├─ assets/fonts/        # woff2-Subsets (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, 100% offline
│  ├─ i18n/
│  │  ├─ i18n.ts           # reines Modul: detect, persist, t() + Interpolation
│  │  ├─ useI18n.ts        # React-Hook: useI18n/useLanguage
│  │  └─ locales/          # vi.ts (Key-Quelle) · en · zh · ja · ko · es · fr
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # Canvas + schwebender Joystick + Tastatur + Visibility
│  │  ├─ StartScreen.tsx   # menu: hero + corner GAME/INFO panels (v1.1.5)
│  │  ├─ menu/              # corner GAME/INFO panels + modals (v1.1.5)
│  │  ├─ ModeSelector.tsx  # 9 Modus-Karten (classic/zen/inferno/blitz/goldrush/storm/hardcore · combo · feast)
│  │  ├─ AchievementsPanel.tsx  # gesperrtes/freigeschaltetes Badge-Tableau
│  │  ├─ GameOverScreen.tsx     # GLAS ZERBROCHEN! + Punkte + neue Erfolge
│  │  ├─ PauseScreen.tsx        # PAUSIERT + Run-Statistiken
│  │  ├─ LanguageSwitcher.tsx   # gemeinsamer VI/EN/中/日/한/ES/FR-Switcher
│  │  └─ ui.tsx            # GameButton, Panel, Keycap, Stat, ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # gesamte Simulation + Canvas-Rendering (~2170 Zeilen)
│  │  ├─ modes.ts          # Spielmodi + Balance-Mathematik (pure)
│  │  ├─ achievements.ts   # 16 Badges + pure Prüfung (pure)
│  │  ├─ storage.ts        # localStorage: TOP 8, Fortschritt, Erfolge
│  │  ├─ audio.ts          # Web Audio Synth: SFX + pentatonische Musik
│  │  ├─ changelog.ts       # in-game changelog data (v1.1.5)
│  │  ├─ runSave.ts         # suspended-run persistence (v1.1.5)
│  │  └─ settings.ts        # game settings persistence (v1.1.5)
│  └─ utils/cn.ts          # clsx + tailwind-merge
└─ tests/                  # vitest — 13 Dateien · 107 Tests (modes · achievements · storage · i18n · runSave · settings · changelog…)
```

## 🧱 Architektur & Performance

- **Spielschleife** auf `requestAnimationFrame` mit Delta-Time, geklemmt auf `1/20s`, multipliziert mit `timeScale` (Eis-Zeitlupe) und einem kurzen **Hit-Stop**-Einfrieren bei jedem Fang für das „Wucht"-Gefühl.
- **Canvas-HUD** wird jeden Frame direkt gezeichnet; React rendert nur Screens je `phase` — kein React-Re-Render im Hot-Loop; bei Sprachwechsel zieht sich das HUD das neue Wörterbuch schon im nächsten Frame.
- **Geschichtete i18n**: `src/i18n/i18n.ts` ist ein reines Modul (kein React), `useI18n` überbrückt nur das Re-Rendering über das `locheo:languagechange`-Event; `t()` unterstützt `{param}`-Interpolation und fällt auf Vietnamesisch zurück.
- **Fliesenboden** wird einmalig in ein Offscreen-Canvas vorgerendert (inkl. Vignette + Lichtpools); Sternfunkeln und Blasen werden in Echtzeit berechnet — sehr günstig.
- **Budget**: ≤460 Partikel, ≤70 Items, ≤34 Popups, DPR ≤ 2; Hitbox-Kollision sweep; Gurken-Splats am Boden räumen sich selbst auf.
- **localStorage** mit Eingabevalidierung/Normalisierung — ein Datensatzfehler korrumpiert nie die Bestenliste; ist der Speicher gesperrt (Safari Privatmodus), spielt das Spiel im Speicher weiter; die Sprachwahl lebt separat in `locheo.lang.v1`.
- **Motion chill**: `prefers-reduced-motion` deaktiviert Aurora/Shimmer/Rotation; sowohl die Hintergrundsterne als auch die Bildschirm-Erschütterung respektieren die Media Queries.

## ❓ FAQ

**Der Windows-Launcher meckert über vietnamesische Zeichen?**
In v1.1.4 behoben: `play-windows.bat` ist jetzt CRLF + UTF-8 BOM mit `chcp 65001` und vietnamesischen Diakritika vollständig erhalten — der Fehler `'Ọ' is not recognized...` ist Geschichte. Wenn du die .bat mit anderem Editor bearbeitest, CRLF & BOM beibehalten (`.gitattributes` erzwingt das automatisch).


**Kann ich ohne Netzwerk spielen?**
Ja — zu 100%: öffne `dist/index.html` und alles funktioniert, inklusive Fonts und Audio. Es gibt keinen einzigen Netzwerkaufruf.

**Werbung oder Telemetrie?**
Keine. Kein Tracking, keine Analyse — deine Punkte verlassen nie dein localStorage.

**Geht beim Sprachwechsel mein Fortschritt verloren?**
Nein. Punkte, Erfolge, Fortschritt und Modusauswahl sind alle unabhängig von `locheo.lang.v1`.

**Wo werden die TOP-8-Punkte gespeichert?**
`locheo.scores.v1` (Punkte), `locheo.progress.v1` (Gesamt-Runs/Gläser/Zerstörungen), `locheo.achievements.v1` (Badges) — wer den Speicher löscht, verliert auch sie — also hüte das Glas!

**Willst du eine weitere Sprache hinzufügen?**
Füge `src/i18n/locales/xx.ts` hinzu, spiegele das `vi.ts`-Key-Set, aktualisiere `LANGUAGES` + Tests und öffne einen PR — siehe [CONTRIBUTING.md](CONTRIBUTING.md).

**Kein Terminal-Mensch?**
Doppelklick auf [`scripts/play-mac.command`](scripts/play-mac.command) (macOS), [`scripts/play-windows.bat`](scripts/play-windows.bat) (Windows) oder [`scripts/play-linux.sh`](scripts/play-linux.sh) (Linux) — ein farbiges Menü erscheint; wähle `1` für Build & sofortiges Spielen, `2` für den Dev-Server. Details: [scripts/README.md](scripts/README.md).

## 📦 Releases & Änderungsprotokoll

| Version | Datum | Notizen |
| --- | --- | --- |
| [v1.1.5](docs/releases/v1.1.5.md) | 2026-11-12 | **Eck-Panels GAME/INFO** (Spielen · Fortsetzen · Modi · Rangliste · Erfolge · Einstellungen / Über den Autor · Changelog · Beenden) · **Speichern & Fortsetzen** (`locheo.run.v1`) · In-game-Einstellungen (SFX/Musik/Shake/Reduced Motion) · Modal-Shortcut-Leck gefixt · prefers-reduced-motion überall · **107 Tests** |
| [v1.1.4](docs/releases/v1.1.4.md) | 2026-11-12 | **9 Modi** (Combo-Festival · Großes Gelage) · **16 Erfolge** · **7 Sprachen** (ES/FR neu) · play-windows.bat Fix (CRLF+BOM) · Launcher in 7 Sprachen · 61 Tests |
| [v1.1.3](docs/releases/v1.1.3.md) | 2026-11-12 | 7 Modi (Eingelegter Regen · Dünnes Keramik) · 14 Erfolge · 5 Sprachen · Favicon · mehrsprachige Launcher · 55 Tests |
| [v1.1.2](docs/releases/v1.1.2.md) | 2026-11-12 | 5 Modi (60-Sekunden-Rush · Goldrausch) · 12 Erfolge · Combo-Flammen · Doppelklick-Launcher · README in 10 Sprachen · 49 Tests |
| [v1.1.1](docs/releases/v1.1.1.md) | 2026-11-12 | In-game i18n VI/EN/ZH · README in 7 Sprachen · komplette Bug-Ausmerzung · 45 Tests |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3 Spielmodi · Goldknoblauch-Schild · Raupe · Goldgemüse · 10 Erfolge · selbst gehostete Fonts |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | Erste Veröffentlichung: komplette Engine, 11 Zutaten, JAR SLAM, ×9 Combo |

Siehe auch [CHANGELOG.md](CHANGELOG.md).

## 🗺️ Roadmap (Entwurf — ändert sich mit Feedback)

| Meilenstein | ETA | Ideen |
| --- | --- | --- |
| **v1.2.0** | 2026 Q1 | Prozeduraler Soundtrack pro Modus · visuelle Regressionstests (Playwright) in der CI · tieferes Font-Subsetting zum Schrumpfen des Bundles |
| **v1.3.0** | 2026 Q1–Q2 | 10. Spielmodus (Kandidat: **FLIEGENSTURM** — nur Fliegen, nur durch Schlagen überleben) · Seed-Modus für Daily Challenges |
| **v1.4.0** | 2026 Q2 | **Opt-in**-Online-Rangliste (serverless, verschlüsselt) — Offline-first bleibt der Standard |
| Backlog | — | Ghost-Replay deines besten Laufs · Fotomodus (HUD ausblenden, PNG exportieren) · Thai (ไทย)-Locale in Prüfung |

*Eine Roadmap ist kein Versprechen — Priorität ist immer: Stabilität → einfacher zu spielen → mehr Inhalt.*

## 📚 Weiterführende Doku & Dev-Notes

Design-Notizen und tiefergehende technische Doku:

| Doc | What it covers |
| --- | --- |
| [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md) | Release v1.1.5 — menu góc, lưu/tiếp tục ván dở, cài đặt, fixes |
| [docs/design/menu-corners.md](docs/design/menu-corners.md) | Thiết kế menu góc GAME/INFO — nguyên tắc, a11y, responsive |
| [docs/design/save-format.md](docs/design/save-format.md) | Spec `locheo.run.v1` — snapshot ván dở (schema + lifecycle) |
| [docs/design/settings-format.md](docs/design/settings-format.md) | Spec `locheo.settings.v1` — cài đặt game (schema + wiring) |
| [scripts/smoke-ssr.tsx](scripts/smoke-ssr.tsx) | Headless render smoke test (toàn bộ menu/modal) |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | CI: npm ci → npm run check (Node 22) |

## 🤝 Mitwirken

1. Forke das Repo, Branch nach dem Schema `arena/<name>` oder `feat/<name>`.
2. `npm run check` muss grün sein, bevor du einen PR öffnest (typecheck + 107 Tests + build).
3. Vermeide neue Laufzeit-Abhängigkeiten, sofern nicht unbedingt nötig — Philosophie: **eine Datei, kein Netz, ewig spielbar**.
4. Nenne in deinem PR die betroffenen Screens/Modi und hänge bei Gameplay-Änderungen einen Clip an.

## 📄 Lizenz & Autor

<img src="assets/license.svg" alt="AGPL-3.0-only — Copyleft-Lizenz" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — siehe [LICENSE](LICENSE) & [assets/license.svg](assets/license.svg).
- Fonts: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (selbst gehostete woff2-Subsets).
- An jedes Picklglas auf jedem vietnamesischen Reistablett — auf euch. 🫙🇻🇳
