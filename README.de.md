<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Pickled Jar Showdown" width="100%" />

# LỌ CHÉO — PICKLED JAR SHOWDOWN

### 🫙 Vietnamesisches Pickle-Arcade, zu 100% im Browser — eine einzige, in sich geschlossene HTML-Datei, offline-first
### 🌐 In-Game-UI in 5 Sprachen — Tiếng Việt · English · 中文 · 日本語 · 한국어

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.3-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.3.md)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-installieren--starten)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-produktions-build)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-sprachen-wechseln)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo Gameplay — das Glas schrägt sich diagonal, fängt Gurken, zerfetzt Schimmel" width="100%" />

</div>

---

## 🥒 Worum es geht

> Lọ Chéo — Pickled Jar Showdown: ein Pickle-Arcade, der zu 100% im Browser läuft, verpackt in einer einzigen, in sich geschlossenen HTML-Datei, offline-first — kein CDN, kein Server. Das Keramikglas kennt nur EINE Bewegungsrichtung: diagonal. Halte zwei Tasten, um schräg zu laufen, zu beschleunigen und Schimmel, Fliegen und Raupen zu zerfetzten — und fülle das Glas, bevor die Keramik in drei Stücken platzt. **7 Spielmodi · 14 Zutaten · 14 Erfolge · TOP-8-Bestenliste · Oberfläche in 5 Sprachen.**

Das hier ist ein **Ein-Bildschirm-Action-Arcade** nach dem Vorbild des schlichten vietnamesischen eingelegtes Gemüses. Keine linearen Level, keine überladenen Menüs — nur das Glas, ein endloser Regen aus Gemüse und deine feurigen Reflexe.

## 🆕 Neu in v1.1.3

- 🌧️ **2 neue Spielmodi** — **Eingelegter Regen** (fällt ×0.88 langsamer, dafür ~1.4× dichter und ×1.5 mehr Gefahren, ×0.75 Punkte — eine glorreiche «eingelegte Flut», Level steigen blitzschnell) und **Dünnes Keramik** (ein einziger Riss und der Krug zerspringt, ×2.0 Punkte, ×1.3 Gefahren — nur für Diamanthände). Insgesamt **7 Modi**.
- 🏆 **2 neue Erfolge** — **Wolkenbruch** (60 Gemüse in einer Eingelegter-Regen-Runde) & **Stahlkeramik** (Krug in Dünnes Keramik füllen). Insgesamt **14 Erfolge**.
- 🌐 **5 In-Game-Sprachen** — **日本語 (日)** und **한국어 (한)** zusätzlich zu VI/EN/中: 193 Schlüssel pro Sprache, `<html lang>`-Sync, locale-Zahlen (vi-VN / en-US / zh-CN / ja-JP / ko-KR).
- 🚀 **Mehrsprachige animierte Launcher** — die drei Launcher (`play-linux.sh` · `play-mac.command` · `play-windows.bat`) wechseln mit der Taste `L` die Sprache (VI→EN→中文), beachten `LOCHEO_LANG` und bieten Dreifach-Blitz-Banner, Braille-Spinner mit echter Prozentanzeige und Funken; das vietnamesische Menü behält **alle diakritischen Zeichen**. Siehe [scripts/README.md](scripts/README.md).
- ⭐ **Neues Favicon** `favicon.ico` (Multi-Size 16→256 px) + animiertes `assets/favicon.svg` (SMIL) & `public/` — webfertig, schön in jedem Tab.
- 🐛 **Vollständiger Bug-Sweep** (siehe [CHANGELOG](CHANGELOG.md), `[1.1.3]`); `npm run check` grün mit **55 Unit-Tests**.

<img src="assets/modes.svg" alt="Die 7 Modi — Classic · Zen · Inferno · 60-Second Rush · Gold Rush · Eingelegter Regen · Dünnes Keramik" width="100%" />

<div align="center"><img src="assets/favicon.svg" alt="Lọ-Chéo-Favicon — schräger Pickle-Krug mit goldenem Deckel (SMIL-Animation)" width="150" /></div>

→ Alle Details: [docs/releases/v1.1.3.md](docs/releases/v1.1.3.md)

## ✨ Die Highlights

| Bereich | Details |
| --- | --- |
| 🎮 **7 Spielmodi** | **KLASSISCH EINGELEGT** (ausgewogen) · **ZEN** (keine Gefahren, ×0.5) · **CHILI-INFERNO** (+35% Tempo, ×1.5) · **60-SEKUNDEN-RUSH** (Time-Attack 60s, ×1.25) · **GOLDRAUSCH** (goldene Beute ×2.6) · **Eingelegter Regen** (~1.4× dichter, ×0.75) · **Dünnes Keramik** (ein Riss genügt, ×2.0) |
| 🌐 **i18n im Spiel** | Tiếng Việt · English · 中文 · 日本語 · 한국어 — `src/i18n/` (reines Modul + React-Brücke), `t()` mit Interpolation, synchronisiert `<html lang>`, länderspezifische Zahlen (vi-VN / en-US / zh-CN / ja-JP / ko-KR) |
| 🕹️ **Signatur-SLANT-Mechanik** | 2 Tasten/Achsen diagonal gedrückt halten — das Glas beschleunigt, glüht und zerfetzt Gefahren. Eigener Ausdauerbalken mit Anti-Flacker-Hysterese |
| 🥬 **14 Zutaten** | Aubergine, Chili, Knoblauch, Ingwer, Salz, Gemüse, **GOLDGEMÜSE** (füllt das Glas schnell) · GOLDSALZ/-KNOBLAUCH · INFERNO-CHILI · EIS · SCHIMMEL, FLIEGE, **RAUPE** (Gefahren) |
| 🧄 **Goldknoblauch-Schild** | Power-up: bis zu **2 Schild-Ladungen** stapelbar, die Risse abfangen; ein rotierender Heiligenschein umkreist das Glas |
| 🏆 **14 Erfolge** | Über Läufe hinweg gespeichert (localStorage), mit „NEUER ERFOLG!“-Toast auf dem Game-Over-Bildschirm |
| 🔊 **Handgemachter Sound** | 11 synthetisierte Web-Audio-API-Effekte (null Dateien) + pentatonische Skala, die mit dem Level moduliert; stummschalten mit `M` |
| 💾 **TOP-8-Bestenliste** | Lokal gespeichert, beim Lesen validiert & normalisiert, Namen automatisch großgeschrieben, Highlight für frisch gesetzte Rekorde |
| 🎨 **60fps-Grafik** | Canvas 2D, 460-Partikel-Budget, DPR-Cap 2, vorgerenderter Offscreen-Boden, funkelnde Sterne + Aurora im Menü |
| 📴 **Echt offline-first** | Selbst gehostete Fonts (latein + vietnamesisch, woff2), kein CDN, keine API — `dist/index.html` doppelklicken und spielen |
| 🧪 **Qualitätstor** | 55 Unit-Tests (vitest) für modes / achievements / storage / i18n — `npm run check` ist das CI-Tor |

<img src="assets/items.svg" alt="Die 14 Zutaten — Pickles zum Fangen, goldene Power-ups zum Greifen, Gefahren zum Ausweichen" width="100%" />

## 🌐 Sprachen wechseln

Lọ Chéo kommt mit **5 UI-Sprachen**, sofort angewendet — kein Neuladen, kein verlorener Lauf:

| Sprache | Wo | Gespeichert in |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | **VI**-Button (Standard; folgt der Browser-Sprache falls nicht gesetzt) | `locheo.lang.v1` |
| 🇬🇧 English | **EN**-Button | `locheo.lang.v1` |
| 🇨🇳 中文 | **中**-Button | `locheo.lang.v1` |
| 🇯🇵 日本語 | **日**-Button | `locheo.lang.v1` |
| 🇰🇷 한국어 | **한**-Button | `locheo.lang.v1` |

- Wechsel im **Hauptmenü** (oben rechts) oder im **Pausenbildschirm** (unten, Kompaktmodus).
- Jeder sichtbare String lebt in `src/i18n/locales/{vi,en,zh,ja,ko}.ts` — Canvas-Engine, Screens, HUD, Popups, Ticker, Hinweise.
- Fehlt ein Key? `t()` fällt auf Vietnamesisch zurück — die fünf Locale-Key-Sets (und ihre Platzhalter) werden von Tests erzwungen.

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
| Sprache wechseln | — (VI/EN/中/日/한-Buttons) | VI/EN/中/日/한-Buttons im Menü / Pause |

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

> `vite-plugin-singlefile` inlined sämtliches JS/CSS/Fonts/Bilder in **eine** `dist/index.html` (~655 KB, gzip ~330 KB). Kein Server, kein Netz.

### Entwicklung

```bash
npm run dev        # Dev-Server mit HMR (http://localhost:5173)
npm run preview    # Produktions-Build lokal ausliefern
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 55 Unit-Tests (modes / achievements / storage / i18n)
npm run check      # typecheck + test + build (CI-Qualitätstor)
```

## 🗂️ Projektstruktur

```
lo-cheoio/
├─ index.html              # Einstieg, SEO/OG-Meta (kein CDN)
├─ package.json            # lo-cheoio v1.1.3, dev/build/test/check-Skripte
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; enthält src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # README-Banner (SMIL-Animation)
│  ├─ demo.svg             # Gameplay-Simulation (SMIL-Animation)
│  ├─ items.svg            # die 14 Zutaten (SMIL-Animation)
│  ├─ modes.svg            # die 7 Modi (SMIL-Animation)
│  ├─ license.svg          # animiertes AGPL-3.0-Copyleft-Siegel (SMIL-Animation)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # macOS-Launcher — Doppelklick, farbiges Menü
│  ├─ play-windows.bat     # Windows-Launcher — Doppelklick, farbiges Menü
│  ├─ play-linux.sh        # Linux-Launcher — Doppelklick, farbiges Menü
│  └─ README.md            # Launcher-Anleitung für Terminal-Neulinge
├─ docs/
│  ├─ DESCRIPTION.md       # Projekttexte in mehreren Sprachen (vi/en/zh + SEO)
│  └─ releases/
│     ├─ v1.0.0.md         # erste Release-Notes
│     ├─ v1.1.0.md         # v1.1.0 Release-Notes
│     ├─ v1.1.1.md         # v1.1.1 Release-Notes
│     ├─ v1.1.2.md         # v1.1.2
│     └─ v1.1.3.md         # aktuelle Release-Notes (1.1.3)
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
│  ├─ version.ts           # APP_VERSION = "1.1.3" (einzige Wahrheitsquelle)
│  ├─ index.css            # tailwind v4-Theme + alle Animationen/Verläufe
│  ├─ assets/fonts/        # woff2-Subsets (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, 100% offline
│  ├─ i18n/
│  │  ├─ i18n.ts           # reines Modul: detect, persist, t() + Interpolation
│  │  ├─ useI18n.ts        # React-Hook: useI18n/useLanguage
│  │  └─ locales/          # vi.ts (Key-Quelle) · en · zh · ja · ko
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # Canvas + schwebender Joystick + Tastatur + Visibility
│  │  ├─ StartScreen.tsx   # Menü: Aurora, Shimmer, Modus-Wahl, Erfolge
│  │  ├─ ModeSelector.tsx  # 7 Modus-Karten (classic/zen/inferno/blitz/goldrush/storm/hardcore)
│  │  ├─ AchievementsPanel.tsx  # gesperrtes/freigeschaltetes Badge-Tableau
│  │  ├─ GameOverScreen.tsx     # GLAS ZERBROCHEN! + Punkte + neue Erfolge
│  │  ├─ PauseScreen.tsx        # PAUSIERT + Run-Statistiken
│  │  ├─ LanguageSwitcher.tsx   # gemeinsamer VI/EN/中/日/한-Switcher
│  │  └─ ui.tsx            # GameButton, Panel, Keycap, Stat, ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # gesamte Simulation + Canvas-Rendering (~2100 Zeilen)
│  │  ├─ modes.ts          # Spielmodi + Balance-Mathematik (pure)
│  │  ├─ achievements.ts   # 14 Badges + pure Prüfung (pure)
│  │  ├─ storage.ts        # localStorage: TOP 8, Fortschritt, Erfolge
│  │  └─ audio.ts          # Web Audio Synth: SFX + pentatonische Musik
│  └─ utils/cn.ts          # clsx + tailwind-merge
└─ tests/                  # vitest — modes, achievements, storage, i18n
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
| [v1.1.3](docs/releases/v1.1.3.md) | 2026-11-12 | 7 Modi (Eingelegter Regen · Dünnes Keramik) · 14 Erfolge · 5 Sprachen · Favicon · mehrsprachige Launcher · 55 Tests |
| [v1.1.2](docs/releases/v1.1.2.md) | 2026-11-12 | 5 Modi (60-Sekunden-Rush · Goldrausch) · 12 Erfolge · Combo-Flammen · Doppelklick-Launcher · README in 10 Sprachen · 49 Tests |
| [v1.1.1](docs/releases/v1.1.1.md) | 2026-11-12 | In-game i18n VI/EN/ZH · README in 7 Sprachen · komplette Bug-Ausmerzung · 45 Tests |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3 Spielmodi · Goldknoblauch-Schild · Raupe · Goldgemüse · 10 Erfolge · selbst gehostete Fonts |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | Erste Veröffentlichung: komplette Engine, 11 Zutaten, JAR SLAM, ×9 Combo |

Siehe auch [CHANGELOG.md](CHANGELOG.md).

## 🤝 Mitwirken

1. Forke das Repo, Branch nach dem Schema `arena/<name>` oder `feat/<name>`.
2. `npm run check` muss grün sein, bevor du einen PR öffnest (typecheck + 55 Tests + build).
3. Vermeide neue Laufzeit-Abhängigkeiten, sofern nicht unbedingt nötig — Philosophie: **eine Datei, kein Netz, ewig spielbar**.
4. Nenne in deinem PR die betroffenen Screens/Modi und hänge bei Gameplay-Änderungen einen Clip an.

## 📄 Lizenz & Autor

<img src="assets/license.svg" alt="AGPL-3.0-only — Copyleft-Lizenz" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — siehe [LICENSE](LICENSE) & [assets/license.svg](assets/license.svg).
- Fonts: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (selbst gehostete woff2-Subsets).
- An jedes Picklglas auf jedem vietnamesischen Reistablett — auf euch. 🫙🇻🇳
