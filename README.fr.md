<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — La Grande Guerre du Bocal de Pickles" width="100%" />

# LỌ CHÉO — LA GRANDE GUERRE DU BOCAL

### 🫙 L'arcade de pickles vietnamienne qui tourne à 100% dans le navigateur — un seul HTML, offline-first
### 🌐 UI en jeu en 7 langues — Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.7-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.7.md)
[![Tier](https://img.shields.io/badge/tier-PATCH%20%C2%B7%20violet-9d6bff.svg?style=for-the-badge)]
[![Tests](https://img.shields.io/badge/tests-235%20%C2%B7%2030%20files-2bb48c.svg?style=for-the-badge&logo=vitest&logoColor=white)]
[![CI](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml/badge.svg)](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-installation--exécution)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-build-de-production)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO%20%C2%B7%20ES%20%C2%B7%20FR-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-changer-de-langue)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo en jeu — le bocal dévale en diagonale, attrape les pickles et lacère les moisissures" width="100%" />

<img src="assets/languages.svg" alt="7 langues — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

<img src="assets/palette-ribbon.svg" alt="La palette de Lọ Chéo — sept bandes qui respirent tour à tour (animation SMIL)" width="100%" />

</div>

---

## 🥒 À propos du projet

> Lọ Chéo — La Grande Guerre du Bocal : un arcade de pickles qui tourne à 100% dans le navigateur, emballé dans un unique fichier HTML auto-suffisant, offline-first — aucun CDN, aucun serveur. Le bocal en céramique ne sait se déplacer qu'en **diagonale** : maintenez deux touches pour slalomer, accélérer et lacérer moisissures, mouches et chenilles ; remplissez le bocal avant que la céramique ne se fende en trois. **9 modes · 14 ingrédients · 16 succès · classement TOP 8 · UI en 7 langues.**

C'est un **arcade d'action mono-écran** inspiré des pickles populaires vietnamiens. Pas de niveaux linéaires ni de menus surchargés — juste le bocal, une pluie infinie de pickles et vos réflexes en feu.

<img src="assets/divider.svg" alt="" width="100%" />

## 🆕 Nouveautés de v1.1.7

> Le **dernier correctif** avant 1.2.0. Aucun mode inédit — juste ce qui gênait encore, corrigé à la racine.

### 🌫️ Le fond du menu n'est plus flou — corrigé à la racine

Les joueurs avaient raison : *« le fond derrière le menu est encore flou »*. La cause n'était pas une couche mais **quatre superpositions qui s'amplifiaient** :

| Couche | Avant | Après | Pourquoi |
| --- | --- | --- | --- |
| Nébuleuse `.nebula-*` | `blur(64px)`, pic `1.0` | **`blur(22px)`, pic `0.80`** | 64px dépasse la moitié du rayon d'une tache de 46vw — le bord n'existe plus et tout devient brume |
| Vignette du menu | en ligne, **plein écran**, `0.42 → 0.88 → 1.0` | **`.menu-vignette`**, coins seulement, `0.30 → 0.62` | de « assombrir tout le cadre uniformément » à « sombre dans les coins, clair au centre » |
| Cadre CRT | `inset 0 0 140px @ 0.9` | **`.app-vignette` 90px @ 0.55** | 140px avalait presque tous les coins sur une petite fenêtre |
| Sol carrelé | `opacity-45` | **`opacity-70`** | à 45 %, le sol n'était qu'un bruit gris, plus un détail reconnaissable |

`.menu-vignette` et `.app-vignette` sont désormais des **règles CSS nommées** au lieu d'utilitaires enfouis dans le JSX — un seul endroit à régler, et `prefers-reduced-motion` peut les atteindre.

### 🏷️ Niveaux du changelog — une couleur par niveau

| Niveau | Étiquette | Couleur | Sens | Exemple |
| --- | --- | --- | --- | --- |
| `major` | **MAJOR** | 🩷 rose `#ff5fb0` | grande version — nouveaux systèmes | 1.0.0 |
| `minor` | **UPDATE** | 🟡 doré `#f5a81c` | mise à niveau — nouveau contenu | 1.1.0 |
| `patch` | **PATCH** | 🟣 violet `#9d6bff` | correctifs et nettoyage | 1.1.1 → 1.1.7 |

Le niveau est **dérivé du SemVer** par `tierFor(version)`, jamais saisi à la main — l'étiquette ne peut donc jamais contredire la version imprimée à côté. Le panneau gagne un **filtre** : TOUTES · MAJOR · UPDATE · PATCH avec le décompte par niveau.

<img src="assets/release-tiers.svg" alt="Les trois niveaux MAJOR/UPDATE/PATCH avec leurs couleurs et la chronologie des neuf versions (animation SMIL)" width="100%" />

### 📖 Huit anciennes versions : d'une ligne à une page

Six des neuf versions avaient une **liste de puces vide** — le panneau ne pouvait afficher qu'un résumé d'une ligne. v1.1.7 les a toutes réécrites :

- **96 puces en vietnamien + 96 en anglais** écrites ou enrichies
- Contenu tiré de `docs/releases/v1.1.x.md` **et** du code lui-même (9 modes, 16 succès)
- **Dates réordonnées** : 10-26 · 10-29 · 10-31 · 11-02 · 11-04 · 11-06 · 11-08 · 11-10 · **11-12** — tous les deux jours, jamais deux versions le même jour

### 🗂️ Le projet gagne des dossiers

```
src/game/changelog/        ← remplace un fichier unique de 300 lignes
├── types.ts               ChangelogEntry · ReleaseTier · copyFor()
├── tiers.ts               tierFor() · TIER_ORDER · TIER_LABEL_KEY
├── entries/               un fichier par version — v1_0_0.ts … v1_1_7.ts
└── index.ts               CHANGELOG_ENTRIES + 5 assistants
```

Ajouter 1.2.0 plus tard ne demande plus qu'**un fichier neuf** et une ligne d'import.

### 🐛 Correctifs

| # | Bug | Correctif |
| --- | --- | --- |
| 1 | Fond du menu flou / trouble | les quatre changements ci-dessus |
| 2 | Sol carrelé invisible | `opacity-45` → `opacity-70` |
| 3 | Étiquettes du changelog trompeuses (`kind` saisi à la main) | `tierFor(version)` le dérive du SemVer |
| 4 | Descriptions trop maigres (6 versions avec `items: []`) | 96 puces réécrites |
| 5 | Dates de sortie dupliquées et illogiques | neuf jours consécutifs, aucune collision |
| 6 | Docs/SVG/lanceurs en retard sur la version | balayage complet → 1.1.7 |
| 7 | Le commentaire de `check-readme-sync` figeait 1.1.6 | lit désormais `package.json` |

→ Détails complets : [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md) · Version précédente : [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md)

<img src="assets/settings-sections.svg" alt="Réglages en six sections (depuis v1.1.6) — interrupteurs, barres et sélecteurs (animation SMIL)" width="100%" />

<img src="assets/corner-menu.svg" alt="Panneaux GAME (en bas à gauche) et INFO (en bas à droite) qui glissent (animation SMIL)" width="100%" />

## ✨ Points forts

| Groupe | Détails |
| --- | --- |
| 🎮 **9 modes de jeu** | **PICKLE CLASSIQUE** (équilibré) · **ZEN** (sans dangers, ×0.5) · **ENFER DU PIMENT** (+35% vitesse, ×1.5) · **60 SECONDES** (contre-la-montre 60 s, ×1.25) · **RUÉE VERS L'OR** (butin doré ×2.6) · **Averse de pickles** (~1.4× plus dense, ×0.75) · **Céramique fine** (une fissure suffit, ×2.0) · **FESTIVAL DES COMBOS** (fenêtre ×2, ×1.15) · **GRAND FESTIN** (densité ~×2, bocal ×2.5, ×0.6) |
| 🌐 **i18n en jeu** | Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français — `src/i18n/` (module pur + pont React), `t()` avec interpolation, synchronise `<html lang>`, nombres par locale (vi-VN / en-US / zh-CN / ja-JP / ko-KR / es-ES / fr-FR) |
| 🕹️ **Mécanique LA DIAGONALE signature** | Maintenez 2 touches/axes en diagonale — le bocal accélère, brille et lacère les dangers. Barre de stamina dédiée avec hystérésis anti-scintillement |
| 🥬 **14 ingrédients** | Aubergine, piment, ail, gingembre, sel, moutarde, **MOUTARDE DORÉE** (remplit le bocal vite) · SEL/AIL DORÉ · PIMENT INFERNAL · GLACE · MOISISSURE, MOUCHE, **CHENILLE** (dangers) |
| 🧄 **Bouclier d'Ail Doré** | Power-up : accumulez jusqu'à **2 charges** absorbant les fissures ; un halo rotatif orbite autour du bocal |
| 🏆 **16 succès** | Sauvegardés **entre les parties** (localStorage), avec un toast « NOUVEAU SUCCÈS ! » sur l'écran de fin |
| 🔊 **Audio artisanal** | 11 effets synthétisés en Web Audio API (zéro fichier) + pentatonique qui module avec le niveau ; couper le son avec `M` |
| 💾 **TOP 8** | Sauvegarde locale, validée et normalisée à la lecture, noms en majuscules automatiques, surbrillance pour le record tout frais |
| 🎨 **60fps** | Canvas 2D, budget de 460 particules, DPR plafonné à 2, sol à carreaux pré-rendu offscreen, scintillement d'étoiles + aurore dans le menu |
| 📴 **Vraiment offline-first** | Polices auto-hébergées (sous-ensembles latin + vietnamien, woff2), aucun CDN ni API — ouvrez `dist/index.html` et jouez |
| 🧪 **Qualité** | 235 tests unitaires (vitest) pour modes / achievements / storage / i18n / settings — `npm run check` est la porte CI |

<img src="assets/items.svg" alt="Les 14 ingrédients — les pickles à attraper, les pouvoirs dorés à saisir, les dangers à éviter" width="100%" />

## 🌐 Changer de langue

Lọ Chéo embarque **7 langues d'interface**, appliquées instantanément — sans recharger, sans perdre ta partie :

<img src="assets/languages.svg" alt="7 langues — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

| Langue | Où | Stocké dans |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | bouton **VI** (par défaut ; suit la langue du navigateur) | `locheo.lang.v1` |
| 🇬🇧 English | **EN** bouton | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** bouton | `locheo.lang.v1` |
| 🇯🇵 日本語 | **日** bouton | `locheo.lang.v1` |
| 🇰🇷 한국어 | **한** bouton | `locheo.lang.v1` |
| 🇪🇸 Español | **ES** bouton | `locheo.lang.v1` |
| 🇫🇷 Français | **FR** bouton | `locheo.lang.v1` |

- Change de langue dans **Réglages → LANGUE** (grille de 7 boutons drapeau) — un seul endroit, plus de sélecteur flottant sur le menu.
- Toutes les chaînes visibles vivent dans `src/i18n/locales/{vi,en,zh,ja,ko,es,fr}.ts` — moteur canvas, écrans, HUD, popups, ticker, astuces.
- Une clé manquante ? `t()` retombe sur le vietnamien — les sept jeux de clés (et leurs placeholders) sont garantis par les tests.

## 🕹️ Contrôles

| Action | Clavier | Tactile |
| --- | --- | --- |
| Se déplacer | `W` `A` `S` `D` ou `← ↑ ↓ →` | Glissez n'importe où (joystick flottant) |
| **Diagonale (CHÉO)** | Maintenez **2 touches en même temps** (ex. `A`+`W`) | Glissez en **45°** — l'anneau du joystick vire à l'or |
| Choc du bocal (onde + aspiration) | `Space` | Bouton rouge **SLAM**, en bas à droite |
| Pause / reprise | `P` ou `Esc` | Bouton pause, en haut à droite |
| Recommencer aussitôt | `R` (même en pause/game over) | Bouton « Encore une fournée » |
| Démarrer / confirmer | `Enter` | Bouton **AUX FOURNEAUX** |
| Muet / son | `M` | Bouton haut-parleur, en haut à droite |
| Changer de langue | — (boutons VI/EN/中/日/한/ES/FR) | Boutons VI/EN/中/日/한/ES/FR sur le menu / la pause |

## 🚀 Installation & exécution

### Jouer tout de suite (sans build)

```bash
# chaque release embarque un unique fichier auto-suffisant :
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### Build de production

```bash
npm install        # installe les dépendances (Node ≥ 20.19)
npm run build      # → dist/index.html (un seul fichier auto-suffisant)
```

> `vite-plugin-singlefile` inline tout le JS/CSS/polices/images dans **un** `dist/index.html` (~700 Ko, gzip ~355 Ko). Ni serveur, ni réseau.

### Développement

```bash
npm run dev        # serveur de dev avec HMR (http://localhost:5173)
npm run preview    # sert le build de production en local
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 235 tests unitaires (modes / achievements / storage / i18n / settings)
npm run check      # typecheck + test + build (porte qualité CI)
```

## 🗂️ Structure du projet

```
lo-cheoio/
├─ index.html              # entrée, meta SEO/OG (sans CDN)
├─ package.json            # lo-cheoio v1.1.6, scripts dev/build/test/check
├─ .gitattributes          # *.bat/*.cmd → CRLF · posix → LF · binaries
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict ; inclut src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # bannière du README (animation SMIL)
│  ├─ demo.svg             # simulation de gameplay (animation SMIL)
│  ├─ items.svg            # les 14 ingrédients (animation SMIL)
│  ├─ modes.svg            # les 9 modes (animation SMIL)
│  ├─ languages.svg        # 7 in-game languages (SMIL animation)
│  ├─ new-modes.svg        # the 2 new v1.1.4 modes (SMIL animation)
│  ├─ corner-menu.svg     # corner GAME/INFO panels (SMIL animation)
│  ├─ settings-sections.svg # 6-section settings tour (SMIL, v1.1.6)
│  ├─ divider.svg          # sparkle divider (SMIL animation)
│  ├─ license.svg          # sceau copyleft AGPL-3.0 animé (animation SMIL)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # lanceur macOS — double-clic, menu coloré
│  ├─ play-windows.bat     # lanceur Windows — double-clic, menu coloré
│  ├─ play-linux.sh        # lanceur Linux — double-clic, menu coloré
│  └─ README.md            # guide des lanceurs pour novices du terminal
├─ docs/
│  ├─ README.md            # index de la documentation (v1.1.5)
│  ├─ DESCRIPTION.md       # descriptions multilingues (vi/en/zh + SEO)
│  ├─ design/              # specs menu-corners / save-format / settings-format
│  ├─ guides/              # vue d'ensemble engine · a11y · perf · storage keys · playbook release…
│  └─ releases/
│     ├─ v1.0.0.md         # notes de la première release
│     ├─ v1.1.0.md         # notes v1.1.0
│     ├─ v1.1.1.md         # notes v1.1.1
│     ├─ v1.1.2.md         # v1.1.2
│     ├─ v1.1.3.md         # v1.1.3 release notes
│     ├─ v1.1.4.md         # release notes (1.1.4)
│     ├─ v1.1.5.md         # release notes (1.1.5)
│     └─ v1.1.6.md         # current release notes (1.1.6)
├─ README.md               # 🇻🇳 Tiếng Việt
├─ README.en.md            # 🇬🇧 English
├─ README.zh.md            # 🇨🇳 中文
├─ README.ja.md            # 🇯🇵 日本語
├─ README.ko.md            # 🇰🇷 한국어
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français (ce fichier)
├─ README.th.md            # 🇹🇭 ไทย
├─ README.de.md            # 🇩🇪 Deutsch
├─ README.pt.md            # 🇵🇹 Português
├─ src/
│  ├─ main.tsx             # racine React, StrictMode
│  ├─ App.tsx              # machine à phases menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.6" (source unique de vérité)
│  ├─ index.css            # thème tailwind v4 + toutes les animations/dégradés
│  ├─ assets/fonts/        # sous-ensembles woff2 (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, 100% offline
│  ├─ i18n/
│  │  ├─ i18n.ts           # module pur : détection, persistance, t() + interpolation
│  │  ├─ useI18n.ts        # hook React : useI18n/useLanguage
│  │  └─ locales/          # vi.ts (source des clés) · en · zh · ja · ko · es · fr
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # canvas + joystick flottant + clavier + visibilité
│  │  ├─ StartScreen.tsx   # menu : hero + scène en couches + panneaux d'angle
│  │  ├─ menu/              # panneaux GAME/INFO + modales + icons/
│  │  ├─ ModeSelector.tsx  # 9 cartes de mode (classic/zen/inferno/blitz/goldrush/storm/hardcore · combo · feast)
│  │  ├─ AchievementsPanel.tsx  # mur de badges verrouillés/déverrouillés
│  │  ├─ GameOverScreen.tsx     # BOCAL BRISÉ ! + score + nouveaux succès
│  │  ├─ PauseScreen.tsx        # PAUSE + stats de la partie
│  │  ├─ settings/           # réglages en 6 sections + contrôles (v1.1.6)
│  │  └─ ui.tsx            # GameButton, Panel, Keycap, Stat, ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # toute la simulation + rendu canvas (~2260 lignes)
│  │  ├─ modes.ts          # modes + maths d'équilibrage (pur)
│  │  ├─ achievements.ts   # 16 badges + checker pur (pur)
│  │  ├─ storage.ts        # localStorage : top 8, progrès, succès
│  │  ├─ audio.ts          # synthèse Web Audio : sfx + musique pentatonique
│  │  ├─ changelog.ts        # données du changelog en jeu
│  │  ├─ runSave.ts         # sauvegarde de partie suspendue
│  │  ├─ settings.ts        # schéma des réglages, défauts, normalisation
│  │  ├─ settingsIO.ts      # codec de sauvegarde/restauration (v1.1.6)
│  │  ├─ settingsPresets.ts # quatre préréglages rapides (v1.1.6)
│  │  └─ audioLevels.ts     # calcul pur des gains (v1.1.6)
│  └─ utils/
│     ├─ cn.ts             # clsx + tailwind-merge
│     └─ useFocusTrap.ts   # confinement du focus (v1.1.6)
└─ tests/                  # vitest — 30 fichiers · 235 tests (modes · achievements · storage · i18n · runSave · settings · presets · audio…)
```

## 🧱 Architecture & performance
<img src="assets/architecture.svg" alt="Architecture de Lọ Chéo v1.1.7 — entrée → moteur → état → rendu et services (animation SMIL)" width="100%" />


- **Boucle de jeu** sur `requestAnimationFrame`, delta-temps clampé à `1/20s`, multiplié par `timeScale` (slow-mo GLACE) avec un court **hit-stop** à chaque capture pour ce petit « thunk ».
- **HUD canvas** dessiné directement chaque frame ; React ne rend que les écrans selon `phase` — aucun re-render dans la boucle chaude ; au changement de langue, le HUD lit le nouveau dictionnaire dès le frame suivant.
- **i18n en couches** : `src/i18n/i18n.ts` est un module pur (sans React), `useI18n` ne fait que relayer les re-renders via l'événement `locheo:languagechange` ; `t()` gère l'interpolation `{param}` et retombe sur le vietnamien.
- **Sol à carreaux** pré-rendu une fois dans un canvas offscreen (avec vignette + nappes de lumière) ; le scintillement des étoiles et les bulles sont calculés en temps réel — très léger.
- **Budget** : ≤460 particules, ≤70 items, ≤34 popups, DPR ≤ 2 ; collisions par hitbox ; les taches de pickles au sol s'effacent d'elles-mêmes.
- **localStorage** avec validation/normalisation des entrées — un enregistrement corrompu ne casse jamais le tableau ; si le stockage est bloqué (Safari privé), le jeu continue en mémoire ; la langue vit à part dans `locheo.lang.v1`.
- **Motion douce** : `prefers-reduced-motion` coupe aurore/shimmer/rotation ; étoiles de fond et screen shake respectent aussi les media queries.

## ❓ FAQ

**Le lanceur Windows se plaint des caractères vietnamiens ?**
Corrigé en v1.1.4 : `play-windows.bat` est désormais en CRLF + UTF-8 BOM avec `chcp 65001` et les diacritiques vietnamiens intacts — l'erreur `'Ọ' is not recognized...` appartient au passé. Si tu modifies le .bat avec un autre éditeur, conserve CRLF et BOM (`.gitattributes` l'impose automatiquement).


**Peut-on jouer sans réseau ?**
Oui — 100% : ouvre `dist/index.html` et tout fonctionne, polices et audio inclus. Pas une seule requête réseau.

**Des pubs ou de la télémétrie ?**
Aucune. Pas de tracking, pas d'analytics — tes scores ne quittent jamais ton localStorage.

**Changer de langue efface ma progression ?**
Non. Scores, succès, progrès et mode sont indépendants de `locheo.lang.v1`.

**Où est stocké le TOP 8 ?**
`locheo.scores.v1` (scores), `locheo.progress.v1` (parties/bocaux/lacérés cumulés), `locheo.achievements.v1` (badges) — effacer le stockage les efface, alors ménagez le bocal !

**Envie d'ajouter une langue ?**
Ajoute `src/i18n/locales/xx.ts` en miroir des clés de `vi.ts`, mets à jour `LANGUAGES` + les tests, ouvre une PR — voir [CONTRIBUTING.md](CONTRIBUTING.md).

**Le terminal te rebute ?**
Double-clique sur [`scripts/play-mac.command`](scripts/play-mac.command) (macOS), [`scripts/play-windows.bat`](scripts/play-windows.bat) (Windows) ou [`scripts/play-linux.sh`](scripts/play-linux.sh) (Linux) — un menu coloré s'ouvre ; choisis `1` pour compiler et jouer aussitôt, `2` pour le serveur de dev. Détails : [scripts/README.md](scripts/README.md).

## 📦 Releases & changelog

| Version | Tier | Date | Notes |
| --- | --- | --- | --- |
| [v1.1.7](docs/releases/v1.1.7.md) | 🟣 **PATCH** | 2026-11-12 | **Fond du menu débrumé** (quatre couches : `blur 64→22px`, vignette de coins au lieu du plein écran, cadre CRT 140→90px, sol 45→70%) · **changelog par niveaux colorés** · **96 puces neuves** pour 8 versions · dates réordonnées · `src/game/changelog/` découpé · 10 READMEs refaits · **235 tests** |
| [v1.1.6](docs/releases/v1.1.6.md) | 🟣 **PATCH** | 2026-11-10 | **Réglages en 6 sections** (rapides · audio · affichage · langue · sauvegarde · données) · volumes 0–100 · intensité des secousses · qualité visuelle · pause au changement d'onglet · langue dans les Réglages · 4 préréglages · export/import JSON · menu multicouche animé · dégradé sur la carte auteur · focus piégé dans les modales · fix musique après rechargement · **150 tests** |
| [v1.1.5](docs/releases/v1.1.5.md) | 🟣 **PATCH** | 2026-11-08 | **Menus d'angle GAME/INFO** (Jouer · Reprendre · Modes · Classement · Succès · Réglages / À propos · Changelog · Quitter) · **sauvegarde & reprise de partie** (`locheo.run.v1`) · réglages en jeu (SFX/musique/tremblement/animations) · fix raccourcis à travers les modales · prefers-reduced-motion partout · **113 tests** |
| [v1.1.4](docs/releases/v1.1.4.md) | 🟣 **PATCH** | 2026-11-06 | **9 modes** (Festival des Combos · Grand Festin) · **16 succès** · **7 langues** (ES/FR ajoutées) · fix play-windows.bat (CRLF+BOM) · lanceurs en 7 langues · 61 tests |
| [v1.1.3](docs/releases/v1.1.3.md) | 🟣 **PATCH** | 2026-11-04 | 7 modes (Averse de pickles · Céramique fine) · 14 succès · 5 langues · favicon · lanceurs multilingues · 55 tests |
| [v1.1.2](docs/releases/v1.1.2.md) | 🟣 **PATCH** | 2026-11-02 | 5 modes (60 Secondes · Ruée vers l'or) · 12 succès · combo en feu · lanceurs à double-clic · README en 10 langues · 49 tests |
| [v1.1.1](docs/releases/v1.1.1.md) | 🟣 **PATCH** | 2026-10-31 | i18n en jeu VI/EN/ZH · README en 7 langues · grand ménage de bugs · 49 tests |
| [v1.1.0](docs/releases/v1.1.0.md) | 🟡 **UPDATE** | 2026-10-29 | 3 modes · Bouclier d'Ail Doré · Chenille · Moutarde Dorée · 10 succès · polices auto-hébergées |
| [v1.0.0](docs/releases/v1.0.0.md) | 🩷 **MAJOR** | 2026-10-26 | Première release : moteur complet, 11 ingrédients, CHOC DU BOCAL, combo ×9 |

Voir aussi [CHANGELOG.md](CHANGELOG.md).

## 🗺️ Feuille de route (brouillon — susceptible de changer selon les retours)

| Étape | ETA | Idées |
| --- | --- | --- |
| **v1.2.0** | 2026 Q1 | Bande-son procédurale par mode · tests de régression visuelle (Playwright) dans la CI · sous-ensemblage de polices plus poussé pour alléger le bundle |
| **v1.3.0** | 2026 Q1–Q2 | 10e mode de jeu (candidat : **TEMPÊTE DE MOUCHES** — uniquement des mouches, survis en tranchant) · mode seedé pour les défis quotidiens |
| **v1.4.0** | 2026 Q2 | Tableau d'élite en ligne **opt-in** (serverless, chiffré) — le hors-ligne reste le défaut |
| Backlog | — | Ghost replay de votre meilleure run · mode photo (masquez le HUD, exportez en PNG) · locale thaï (ไทย) à l'étude |

*Une feuille de route n'est pas une promesse — la priorité est toujours : stabilité → plus facile à jouer → plus de contenu.*

## 📚 Pour aller plus loin & docs dev

Notes de conception et documentation technique approfondie :

| Doc | What it covers |
| --- | --- |
| [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md) | Release v1.1.6 — réglages en 6 sections, préréglages, sauvegarde, menu multicouche |
| [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md) | Release v1.1.5 — menus d'angle, sauvegarde/reprise, réglages, fixes |
| [docs/design/menu-corners.md](docs/design/menu-corners.md) | Design du menu d'angle GAME/INFO — principes, a11y, responsive |
| [docs/design/save-format.md](docs/design/save-format.md) | Spec `locheo.run.v1` — snapshot de partie en pause (schema + cycle de vie) |
| [docs/design/settings-format.md](docs/design/settings-format.md) | Spec `locheo.settings.v1` — réglages du jeu (schema + wiring) |
| [docs/guides/troubleshooting.md](docs/guides/troubleshooting.md) | Problèmes fréquents — écran noir · audio · Reprendre · launcher |
| [scripts/smoke-ssr.tsx](scripts/smoke-ssr.tsx) | Smoke test de rendu headless (tout l'arbre menu/modales) |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | CI: npm ci → npm run check (Node 22) |

## 🤝 Contribuer

1. Fork le repo, branche avec la convention `arena/<nom>` ou `feat/<nom>`.
2. `npm run check` doit être au vert avant d'ouvrir une PR (typecheck + 235 tests + build).
3. Évite les nouvelles dépendances runtime sauf nécessité réelle — philosophie : **un seul fichier, hors réseau, jouable pour toujours**.
4. Dans la PR, indique les écrans/modes touchés et joins un clip si le gameplay change.

## 📄 Licence & auteur

<img src="assets/license.svg" alt="AGPL-3.0-only — licence copyleft" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — voir [LICENSE](LICENSE) et [assets/license.svg](assets/license.svg).
- Polices : [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (sous-ensembles woff2 auto-hébergés).
- À chaque bocal de pickles sur chaque table vietnamienne — santé. 🫙🇻🇳
