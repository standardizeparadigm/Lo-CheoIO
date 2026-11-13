<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Pickled Jar Showdown" width="100%" />

# LỌ CHÉO — PICKLED JAR SHOWDOWN

### 🫙 Arcade vietnamita de conserva rodando 100% no navegador — um único arquivo HTML autocontido, offline-first
### 🌐 UI do jogo em 7 idiomas — Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.8-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.8.md)
[![Tier](https://img.shields.io/badge/tier-PATCH%20%C2%B7%20violet-9d6bff.svg?style=for-the-badge)]
[![Tests](https://img.shields.io/badge/tests-286%20%C2%B7%2035%20files-2bb48c.svg?style=for-the-badge&logo=vitest&logoColor=white)]
[![CI](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml/badge.svg)](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-instalar--rodar)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-build-de-produção)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO%20%C2%B7%20ES%20%C2%B7%20FR-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-trocar-de-idioma)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo gameplay — o pote inclina na diagonal, captura ingredientes, despedaça bolor" width="100%" />

<img src="assets/languages.svg" alt="7 idiomas — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

<img src="assets/palette-ribbon.svg" alt="A paleta de Lọ Chéo — sete faixas respirando em turnos (animação SMIL)" width="100%" />

</div>

---

## 🥒 Sobre o projeto

> Lọ Chéo — Pickled Jar Showdown: um arcade de conserva que roda 100% no navegador, empacotado num único HTML autocontido, offline-first — sem CDN, sem servidor. O pote de cerâmica só sabe se mover na **diagonal**: segure duas teclas para inclinar, acelerar e despedaçar bolor, moscas e lagartas; depois encha o pote antes que a cerâmica rache em três. **9 modos · 14 ingredientes · 16 conquistas · ranking TOP 8 · UI em 7 idiomas.**

Isto é um **arcade de ação de tela única** inspirado nas singelas conservas vietnamitas. Sem fases lineares, sem menus poluídos — só o pote, uma chuva infinita de hortifruti e seus reflexos em chamas.

<img src="assets/divider.svg" alt="" width="100%" />

## 🆕 Novidades na v1.1.8

> O **último patch** antes da 1.2.0. Nenhum modo novo — o ecrã inicial deixa de transbordar, três pastas são adicionadas e toda a documentação fica sincronizada.

### 📐 O ecrã inicial já não transborda

A captura mostrava **quatro defeitos ao mesmo tempo**: o logótipo `CHÉO` cortado ao meio, o boião mascote sem a metade inferior, o painel GAME cortado em baixo e a linha de copyright sob o ticker cortada. Os quatro tinham **uma só causa**: uma soma que ninguém geria.

```
a antiga coluna flex a 1280×720:
  scene      flex-1     →  recebia 250px   (precisava de ~700px)
  panel row  shrink-0   →       415px
  ticker     shrink-0   →        55px
                          ─────────────
                          720 − 415 − 55 = 250
```

`shrink-0` impedia os dois últimos de encolher, pelo que a cena ficava apenas com **250px**, e tudo o que fosse mais alto — o logótipo, o boião — era cortado por `overflow-y-auto` em `y≈247px`. A costura medida na imagem é **247.3px**; a aritmética dá **250.0px**. Coincidem com 2.7px de diferença.

<img src="assets/layout-fix.svg" alt="Comparação de layout v1.1.7 vs v1.1.8 — cena de 250px cortada contra 382px + 338px de reserva com o chrome flutuante (animação SMIL)" width="100%" />

**A correção** — tirar o chrome do fluxo e dar dono ao total:

| Alteração | Efeito |
| --- | --- |
| `MenuChrome` passa a `position: absolute` | não pode encolher a cena — recebe sempre os 720px |
| cena com `padding-bottom: plan.reserve` | o conteúdo nunca se esconde sob os painéis, mas a cena *pode* ocupar a altura toda |
| `.menu-ticker` fixo em 48px + `overflow: hidden` | o copyright fica na mesma linha do letreiro |

No tamanho exato da captura a cena passa de **250px para 382px**. O boião e o logótipo ficam inteiros — e **nenhum SVG foi tocado**: o `jar.tsx` sempre desenhou o `viewBox 0 0 120 140` completo; a metade inferior estava apenas fora da área visível.

### 🔍 Quatro falhas secundárias encontradas ao medir

| # | Falha | Causa | Correção |
| --- | --- | --- | --- |
| 1 | **Barra de deslocamento turquesa** sobre a nebulosa | a cena expunha uma pista de 8px com conteúdo a transbordar | ocultar e reservar espaço com `padding-bottom` |
| 2 | **Painéis sobrepostos** no telemóvel | `208 + 224px` não cabe em `375px` | empilhados abaixo de 520px |
| 3 | **`CHÉO` demasiado alto** em janelas baixas e largas | o tamanho só escalava com `17vw`, nunca com a altura | `clamp(3.4rem, min(17vw, 20vh), 10.5rem)` |
| 4 | **Altura do painel dependia do idioma** | uma linha media o que a sua dica ocupasse; vietnamita/alemão chegavam a três linhas | `--menu-row-h` fixo e dica limitada a duas linhas |

### 🗂️ Três pastas novas — 22 ficheiros

Cada conquista tem agora **o seu próprio ficheiro** com a condição de desbloqueio e a razão de existir — a pergunta a que a tabela de dezasseis linhas não respondia.

### 🧪 30 testes novos a fixar tudo

| Ficheiro | Testes | O que fixa |
| --- | --- | --- |
| `tests/menu-layout.test.ts` | **22** | a soma que transbordava; CSS ↔ TypeScript concordam em cada constante; a linha flutuante já não tem `shrink-0` |
| `tests/achievements-split.test.ts` | **8** | a divisão em dezasseis ficheiros mantém a ordem dos ids e todos continuam a ser atribuídos |
| `scripts/probe-menu-layout.tsx` | **11** | as mesmas propriedades no **DOM real** gerado por `react-dom/server` |

### 🐛 Correções

| # | Falha | Correção |
| --- | --- | --- |
| 1 | `CHÉO` cortado | chrome fora do fluxo + a cena reserva o seu espaço |
| 2 | Boião a meio | mesma causa — **não** era o SVG |
| 3 | Painel GAME cortado em baixo | coluna flex de 732px numa caixa de 720px |
| 4 | Linha de copyright cortada | ticker fixo de 48px numa só linha |
| 5 | Barra de deslocamento sobre a arte | `scrollbar-width: none` |
| 6 | Painéis sobrepostos no telemóvel | empilhados abaixo de 520px |
| 7 | `CHÉO` mais alto que a caixa | limite adicional por `20vh` |
| 8 | Altura do painel por idioma | `--menu-row-h` fixo + limite da dica |

→ Detalhe completo: [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · Anterior: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)

<img src="assets/settings-sections.svg" alt="Ajustes em seis secções (desde v1.1.6) — interruptores, barras e seletores (animação SMIL)" width="100%" />

<img src="assets/corner-menu.svg" alt="Painéis GAME (canto inferior esquerdo) e INFO (inferior direito) deslizando (animação SMIL)" width="100%" />

## ✨ Destaques

| Grupo | Detalhes |
| --- | --- |
| 🎮 **9 modos de jogo** | **CONSERVA CLÁSSICA** (equilibrado) · **ZEN** (sem perigos, ×0.5) · **INFERNO DA PIMENTA** (+35% velocidade, ×1.5) · **CORRIDA DE 60 SEGUNDOS** (time-attack 60 s, ×1.25) · **FEBRE DE OURO** (butim dourado ×2.6) · **Chuva de Conservas** (densidade ~1.4×, ×0.75) · **Cerâmica Fina** (uma trinca basta, ×2.0) · **FESTIVAL DE COMBOS** (janela ×2, ×1.15) · **GRANDE FESTIM** (densidade ~×2, pote ×2.5, ×0.6) |
| 🌐 **i18n no jogo** | Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français — `src/i18n/` (módulo puro + ponte React), `t()` com interpolação, sincroniza `<html lang>`, números por locale (vi-VN / en-US / zh-CN / ja-JP / ko-KR / es-ES / fr-FR) |
| 🕹️ **Mecânica CHÉO exclusiva** | Segure 2 teclas/eixos na diagonal — o pote acelera, brilha e despedaça perigos. Barra de stamina dedicada com histerese anti-flicker |
| 🥬 **14 ingredientes** | Berinjela, pimenta, alho, gengibre, sal, mostarda · **MOSTARDA DOURADA** (enche o pote rápido) · SAL/ALHO DOURADO · PIMENTA INFERNO · GELO · MOFO, MOSCA, **LAGARTA** (perigos) |
| 🧄 **Escudo de Alho Dourado** | Power-up: empilha até **2 cargas** que absorvem rachaduras; uma auréola giratória orbita o pote |
| 🏆 **16 conquistas** | Salvas **entre partidas** (localStorage), com aviso «NOVA CONQUISTA!» na tela de fim de jogo |
| 🔊 **Áudio artesanal** | 11 efeitos sintetizados com Web Audio API (zero arquivos) + escala pentatônica que muda com o nível; silenciar com `M` |
| 💾 **Ranking TOP 8** | Salvo localmente, validado e normalizado na leitura, nomes em maiúsculas, destaque para recorde recém-batido |
| 🎨 **Gráficos 60fps** | Canvas 2D, orçamento de 460 partículas, DPR limitado a 2, chão de ladrilho pré-renderizado offscreen, estrelas cintilantes + aurora no menu |
| 📴 **Offline-first de verdade** | Fontes auto-hospedadas (subsets latin + vietnamita, woff2), sem CDN, sem API — duplo clique em `dist/index.html` e jogue |
| 🧪 **Portões de qualidade** | 286 testes unitários (vitest) para modes / achievements / storage / i18n / settings — `npm run check` é o portão de CI |

<img src="assets/items.svg" alt="Os 14 ingredientes — conservas para pegar, poderes dourados para agarrar, perigos para desviar" width="100%" />

## 🌐 Trocar de idioma

Lọ Chéo traz **7 idiomas de interface**, aplicados na hora — sem recarregar, sem perder a run em andamento:

<img src="assets/languages.svg" alt="7 idiomas — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

| Idioma | Onde | Guardado em |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | botão **VI** (padrão; segue o idioma do navegador) | `locheo.lang.v1` |
| 🇬🇧 English | **EN** botão | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** botão | `locheo.lang.v1` |
| 🇯🇵 日本語 | **日** botão | `locheo.lang.v1` |
| 🇰🇷 한국어 | **한** botão | `locheo.lang.v1` |
| 🇪🇸 Español | **ES** botão | `locheo.lang.v1` |
| 🇫🇷 Français | **FR** botão | `locheo.lang.v1` |

- Troque o idioma em **Ajustes → IDIOMA** (grade de 7 botões com bandeira) — um único lugar, sem seletor flutuante sobre o menu.
- Toda string visível vive em `src/i18n/locales/{vi,en,zh,ja,ko,es,fr}.ts` — engine de canvas, telas, HUD, popups, ticker, dicas.
- Falta uma chave? `t()` cai para o vietnamita — os sete conjuntos de chaves (e seus placeholders) são garantidos por testes.

## 🕹️ Controles

| Ação | Teclado | Toque |
| --- | --- | --- |
| Mover | `W` `A` `S` `D` ou `← ↑ ↓ →` | Arraste em qualquer lugar (joystick flutuante) |
| **Inclinar (CHÉO)** | Segure **2 teclas ao mesmo tempo** (ex.: `A`+`W`) | Arraste a **45°** — o anel do joystick fica dourado |
| Slam do pote (onda de choque + vácuo) | `Space` | Botão **SLAM** vermelho, canto inferior direito |
| Pausa / continuar | `P` ou `Esc` | Botão de pausa, canto superior direito |
| Reinício instantâneo | `R` (mesmo em pausa/game-over) | Botão "Pickle again" |
| Começar / confirmar | `Enter` | Botão **ENTRAR NA COZINHA** |
| Mudo / som | `M` | Botão de alto-falante, canto superior direito |
| Trocar idioma | — (botões VI/EN/中/日/한/ES/FR) | Botões VI/EN/中/日/한/ES/FR no menu / pausa |

## 🚀 Instalar & Rodar

### Jogue agora (sem build)

```bash
# toda release distribui um único arquivo autocontido:
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### Build de produção

```bash
npm install        # instala dependências (Node ≥ 20.19)
npm run build      # → dist/index.html (um arquivo autocontido)
```

> O `vite-plugin-singlefile` injeta todo JS/CSS/fontes/imagens em **um único** `dist/index.html` (~700 KB, gzip ~355 KB). Sem servidor, sem rede.

### Desenvolvimento

```bash
npm run dev        # dev server com HMR (http://localhost:5173)
npm run preview    # serve o build de produção localmente
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 286 testes unitários (modes / achievements / storage / i18n / settings)
npm run check      # typecheck + test + build (portão de qualidade CI)
```

## 🗂️ Estrutura do projeto

```
lo-cheoio/
├─ index.html              # entry, meta SEO/OG (sem CDN)
├─ package.json            # lo-cheoio v1.1.8, scripts dev/build/test/check
├─ .gitattributes          # *.bat/*.cmd → CRLF · posix → LF · binaries
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; inclui src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # banner do README (animação SMIL)
│  ├─ demo.svg             # simulação de gameplay (animação SMIL)
│  ├─ items.svg            # os 14 ingredientes (animação SMIL)
│  ├─ modes.svg            # os 9 modos (animação SMIL)
│  ├─ languages.svg        # 7 in-game languages (SMIL animation)
│  ├─ new-modes.svg        # the 2 new v1.1.4 modes (SMIL animation)
│  ├─ corner-menu.svg      # corner GAME/INFO panels (SMIL animation)
│  ├─ settings-sections.svg # 6-section settings tour (SMIL, v1.1.6)
│  ├─ palette-ribbon.svg   # 7-slice palette ribbon, sheen sweep (SMIL, v1.1.7)
│  ├─ architecture.svg     # architecture + data flow diagram (SMIL, v1.1.7)
│  ├─ release-tiers.svg    # 3 tiers + 10-release timeline (SMIL, v1.1.7)
│  ├─ layout-fix.svg       # v1.1.7 vs v1.1.8 layout, side by side (SMIL, v1.1.8)
│  ├─ test-matrix.svg      # 9 gates · 286 tests · distribution (SMIL, v1.1.8)
│  ├─ divider.svg          # sparkle divider (SMIL animation)
│  ├─ license.svg          # selo copyleft AGPL-3.0 animado (animação SMIL)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # lançador macOS — duplo clique, menu colorido
│  ├─ play-windows.bat     # lançador Windows — duplo clique, menu colorido
│  ├─ play-linux.sh        # lançador Linux — duplo clique, menu colorido
│  └─ README.md            # guia de lançadores para quem não curte terminal
├─ docs/
│  ├─ README.md            # índice de documentação (v1.1.5)
│  ├─ DESCRIPTION.md       # descrições multilíngues do projeto (vi/en/zh + SEO)
│  ├─ design/              # specs menu-corners / save-format / settings-format
│  ├─ guides/              # visão geral do engine · a11y · performance · storage keys · playbook de release…
│  └─ releases/
│     ├─ v1.0.0.md         # notas da primeira release
│     ├─ v1.1.0.md         # notas da v1.1.0
│     ├─ v1.1.1.md         # notas da v1.1.1
│     ├─ v1.1.2.md         # v1.1.2
│     ├─ v1.1.3.md         # v1.1.3 release notes
│     ├─ v1.1.4.md         # release notes (1.1.4)
│     ├─ v1.1.5.md         # release notes (1.1.5)
│     ├─ v1.1.6.md         # release notes (1.1.6)
│     ├─ v1.1.7.md         # release notes (1.1.7)
│     └─ v1.1.8.md         # current release notes (1.1.8)
├─ README.md               # 🇻🇳 Tiếng Việt
├─ README.en.md            # 🇬🇧 English
├─ README.zh.md            # 🇨🇳 中文
├─ README.ja.md            # 🇯🇵 日本語
├─ README.ko.md            # 🇰🇷 한국어
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français
├─ README.th.md            # 🇹🇭 ไทย
├─ README.de.md            # 🇩🇪 Deutsch
├─ README.pt.md            # 🇵🇹 Português (este arquivo)
├─ src/
│  ├─ main.tsx             # raiz React, StrictMode
│  ├─ App.tsx              # máquina de fases menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.7" (fonte única da verdade)
│  ├─ index.css            # tema tailwind v4 + todas as animações/gradientes
│  ├─ assets/fonts/        # subsets woff2 (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, 100% offline
│  ├─ i18n/
│  │  ├─ i18n.ts           # módulo puro: detect, persist, t() + interpolação
│  │  ├─ useI18n.ts        # hook React: useI18n/useLanguage
│  │  └─ locales/          # vi.ts (fonte das chaves) · en · zh · ja · ko · es · fr
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # canvas + joystick flutuante + teclado + visibility
│  │  ├─ StartScreen.tsx   # menu: hero + cena em camadas + painéis de canto
│  │  ├─ menu/              # painéis GAME/INFO + modais + icons/
│  │  │  ├─ background/     # 8 background layers as data (v1.1.7)
│  │  │  ├─ layout/         # metrics · fit · planMenuLayout, 22 tests (v1.1.8)
│  │  │  └─ ticker/         # bottom ticker band, 14 strings (v1.1.8)
│  │  ├─ ModeSelector.tsx  # 9 cartões de modo (classic/zen/inferno/blitz/goldrush/storm/hardcore · combo · feast)
│  │  ├─ AchievementsPanel.tsx  # mural de emblemas locked/unlocked
│  │  ├─ GameOverScreen.tsx     # POTE PARTIDO! + pontos + conquistas novas
│  │  ├─ PauseScreen.tsx        # PAUSADO + estatísticas da partida
│  │  ├─ settings/           # ajustes em 6 seções + controles (v1.1.6)
│  │  └─ ui/               # oito primitivas, um arquivo cada (v1.1.7 — separadas de ui.tsx)
│  ├─ game/
│  │  ├─ engine.ts         # toda a simulação + renderização canvas (~2260 linhas)
│  │  ├─ modeTypes.ts      # ModeId · ModeConfig (types-only, v1.1.7)
│  │  ├─ modes/            # 9 balance records — classic.ts … feast.ts (v1.1.7)
│  │  ├─ modesIndex.ts     # MODES · MODE_LIST · isModeId (v1.1.7)
│  │  ├─ modeMath.ts       # multiplierForCombo · jarBonus · comboWindowFor… (v1.1.7)
│  │  ├─ modes.ts          # barrel — keeps every old import working
│  │  ├─ achievements/      # 16 emblemas + checker puro (pure, v1.1.8)
│  │  │  └─ defs/           # one file per achievement
│  │  ├─ storage.ts        # localStorage: top 8, progress, conquistas
│  │  ├─ audio.ts          # Web Audio synth: sfx + música pentatônica
│  │  ├─ changelog/          # in-game changelog (v1.1.7 — split from one file)
│  │  │  ├─ types.ts        #   ChangelogEntry · ReleaseTier · copyFor()
│  │  │  ├─ tiers.ts        #   tierFor() · TIER_ORDER · TIER_LABEL_KEY
│  │  │  ├─ entries/        #   1 file per release — v1_0_0.ts … v1_1_8.ts
│  │  │  └─ index.ts        #   ordered list + 5 helpers
│  │  ├─ runSave.ts         # persistência de partida suspensa
│  │  ├─ settings.ts        # schema de ajustes, padrões, normalização
│  │  ├─ settingsIO.ts      # codec de backup/restauração (v1.1.6)
│  │  ├─ settingsPresets.ts # quatro presets rápidos (v1.1.6)
│  │  └─ audioLevels.ts     # matemática de ganho pura (v1.1.6)
│  └─ utils/
│     ├─ cn.ts             # clsx + tailwind-merge
│     └─ useFocusTrap.ts   # foco preso no modal (v1.1.6)
└─ tests/                  # vitest — 35 ficheiros · 286 testes (modes · achievements · storage · i18n · runSave · settings · presets · audio…)
```

## 🧱 Arquitetura & performance
<img src="assets/architecture.svg" alt="Arquitetura de Lọ Chéo v1.1.8 — entrada → motor → estado → render e serviços (animação SMIL)" width="100%" />


- **Game loop** em `requestAnimationFrame` com delta-time limitado a `1/20s`, multiplicado por `timeScale` (slow-mo do GELO) e um breve **hit-stop** congelando a cada captura, para aquele "soco".
- **HUD de canvas** desenhado direto a cada frame; o React só renderiza telas conforme a `phase` — nenhum re-render no hot loop; ao trocar de idioma, o HUD pega o novo dicionário já no próximo frame.
- **i18n em camadas**: `src/i18n/i18n.ts` é um módulo puro (sem React), `useI18n` apenas faz a ponte de re-render via evento `locheo:languagechange`; `t()` suporta interpolação `{param}` e cai de volta para vietnamita.
- **Chão de ladrilhos** pré-renderizado uma vez num offscreen canvas (com vignette + poças de luz); estrelas cintilantes e bolhas são calculadas em tempo real — muito barato.
- **Orçamento**: ≤460 partículas, ≤70 itens, ≤34 popups, DPR ≤ 2; varredura de hitbox collision; os respingos de conserva no chão se limpam sozinhos.
- **localStorage** com validação/normalização de entrada — um registro ruim nunca corrompe o ranking; se o storage estiver bloqueado (modo privado do Safari), o jogo continua em memória; a escolha de idioma vive à parte em `locheo.lang.v1`.
- **Motion chill**: `prefers-reduced-motion` desliga aurora/shimmer/giro; tanto as estrelas de fundo quanto o tremor de tela respeitam as media queries.

## ❓ FAQ

**O launcher do Windows reclama de caracteres vietnamitas?**
Corrigido na v1.1.4: `play-windows.bat` agora é CRLF + UTF-8 BOM com `chcp 65001` e os diacríticos vietnamitas intactos — o erro `'Ọ' is not recognized...` sumiu para sempre. Se editar o .bat com outro editor, preserve CRLF e BOM (`.gitattributes` força automaticamente).


**Dá para jogar sem rede?**
Sim — 100%: abra `dist/index.html` e tudo funciona, fontes e áudio incluídos. Não há uma única requisição de rede.

**Anúncios ou telemetria?**
Nenhum. Sem rastreamento, sem analytics — seus pontos nunca saem do seu localStorage.

**Trocar de idioma perde o progresso?**
Não. Pontuação, conquistas, progresso e modo selecionado são totalmente independentes do `locheo.lang.v1`.

**Onde ficam os pontos do TOP 8?**
`locheo.scores.v1` (pontos), `locheo.progress.v1` (partidas/potes/rachaduras totais), `locheo.achievements.v1` (emblemas) — apagar o storage apaga tudo, então cuide do pote!

**Quer adicionar outro idioma?**
Adicione `src/i18n/locales/xx.ts` espelhando o conjunto de chaves de `vi.ts`, atualize `LANGUAGES` + testes e abra um PR — ver [CONTRIBUTING.md](CONTRIBUTING.md).

**Não se vira com terminal?**
Duplo clique em [`scripts/play-mac.command`](scripts/play-mac.command) (macOS), [`scripts/play-windows.bat`](scripts/play-windows.bat) (Windows) ou [`scripts/play-linux.sh`](scripts/play-linux.sh) (Linux) — um menu colorido aparece; escolha `1` para buildar e jogar na hora, `2` para o dev server. Detalhes: [scripts/README.md](scripts/README.md).

<img src="assets/release-tiers.svg" alt="Three tiers MAJOR/UPDATE/PATCH with their colours and a ten-release timeline (SMIL animation)" width="100%" />

<img src="assets/test-matrix.svg" alt="Matriz de testes v1.1.8 — oito portas verdes, 286 testes em 35 ficheiros por área (animação SMIL)" width="100%" />

## 📦 Releases & changelog

| Versão | Tier | Data | Notas |
| --- | --- | --- | --- |
| [v1.1.8](docs/releases/v1.1.8.md) | 🟣 **PATCH** | 2026-11-14 | **O ecrã inicial deixa de transbordar** (chrome fora do fluxo flex: cena `250px → 382px`; logótipo e boião intactos) · **ticker fixo de 48px** · **barra de deslocamento oculta** · **painéis empilhados no telemóvel** · **`menu/layout/` + `menu/ticker/` + `achievements/` em 16 ficheiros** · **30 testes novos** · tudo sincronizado para 1.1.8 · **286 testes** |
| [v1.1.7](docs/releases/v1.1.7.md) | 🟣 **PATCH** | 2026-11-12 | **Fundo do menu sem névoa** (quatro camadas: `blur 64→22px`, vinheta de cantos em vez de tela inteira, moldura CRT 140→90px, piso 45→70%) · **changelog por níveis coloridos** · **96 itens novos** para 8 versões · datas reordenadas · `src/game/changelog/` dividido · 10 READMEs refeitos · **286 testes** |
| [v1.1.6](docs/releases/v1.1.6.md) | 🟣 **PATCH** | 2026-11-10 | **Ajustes em 6 seções** (presets · áudio · tela · idioma · backup · dados) · volumes 0–100 · intensidade do tremor · qualidade visual · pausa ao trocar de aba · idioma dentro dos Ajustes · 4 presets · exportar/importar JSON · menu multicamada animado · degradê no cartão do autor · foco preso nos modais · fix da música ao recarregar · **150 testes** |
| [v1.1.5](docs/releases/v1.1.5.md) | 🟣 **PATCH** | 2026-11-08 | **Menus de canto GAME/INFO** (Jogar · Continuar · Modos · Classificação · Conquistas · Ajustes / Sobre o autor · Changelog · Sair) · **salvar & retomar partida** (`locheo.run.v1`) · ajustes no jogo (SFX/música/tremor/movimento) · fix vazamento de atalhos nos modais · prefers-reduced-motion global · **113 testes** |
| [v1.1.4](docs/releases/v1.1.4.md) | 🟣 **PATCH** | 2026-11-06 | **9 modos** (Festival de Combos · Grande Festim) · **16 conquistas** · **7 idiomas** (ES/FR adicionados) · correção play-windows.bat (CRLF+BOM) · launchers em 7 idiomas · 61 testes |
| [v1.1.3](docs/releases/v1.1.3.md) | 🟣 **PATCH** | 2026-11-04 | 7 modos (Chuva de Conservas · Cerâmica Fina) · 14 conquistas · 5 idiomas · favicon · launchers multilíngues · 55 testes |
| [v1.1.2](docs/releases/v1.1.2.md) | 🟣 **PATCH** | 2026-11-02 | 5 modos (60 Seconds Rush · Gold Rush) · 12 conquistas · combo em chamas · lançadores de duplo clique · README em 10 idiomas · 49 testes |
| [v1.1.1](docs/releases/v1.1.1.md) | 🟣 **PATCH** | 2026-10-31 | i18n no jogo VI/EN/ZH · README em 7 idiomas · caça geral a bugs · 45 testes |
| [v1.1.0](docs/releases/v1.1.0.md) | 🟡 **UPDATE** | 2026-10-29 | 3 modos de jogo · Escudo de Alho Dourado · Lagarta · Mostarda Dourada · 10 conquistas · fontes auto-hospedadas |
| [v1.0.0](docs/releases/v1.0.0.md) | 🩷 **MAJOR** | 2026-10-26 | Primeira release: engine completo, 11 ingredientes, JAR SLAM, combo ×9 |

Veja também [CHANGELOG.md](CHANGELOG.md).

## 🗺️ Roadmap (rascunho — sujeito a mudança com feedback)

| Marco | ETA | Ideias |
| --- | --- | --- |
| **v1.2.0** | 2026 Q1 | Trilha sonora procedural por modo · testes de regressão visual (Playwright) no CI · subsetting de fontes mais profundo para reduzir o bundle |
| **v1.3.0** | 2026 Q1–Q2 | 10º modo de jogo (candidato: **TEMPESTADE DE MOSCAS** — só moscas, sobreviva decepando) · modo com seed para desafios diários |
| **v1.4.0** | 2026 Q2 | Ranking online **opt-in** (serverless, criptografado) — offline-first continua sendo o padrão |
| Backlog | — | Ghost replay da sua melhor partida · modo foto (oculta o HUD, exporta PNG) · locale tailandês (ไทย) em avaliação |

*Um roadmap não é uma promessa — a prioridade é sempre: estabilidade → mais fácil de jogar → mais conteúdo.*

## 📚 Leitura adicional & docs de dev

Notas de design e documentação técnica mais profunda:

| Doc | What it covers |
| --- | --- |
| [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md) | Release v1.1.6 — ajustes em 6 seções, presets, backup, menu multicamada |
| [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md) | Release v1.1.5 — menus de canto, salvar/continuar, ajustes, fixes |
| [docs/design/menu-corners.md](docs/design/menu-corners.md) | Design do menu de canto GAME/INFO — princípios, a11y, responsivo |
| [docs/design/save-format.md](docs/design/save-format.md) | Spec `locheo.run.v1` — snapshot de partida pausada (schema + ciclo de vida) |
| [docs/design/settings-format.md](docs/design/settings-format.md) | Spec `locheo.settings.v1` — ajustes do jogo (schema + wiring) |
| [docs/guides/troubleshooting.md](docs/guides/troubleshooting.md) | Problemas comuns — tela preta · áudio · Continuar · launcher |
| [scripts/smoke-ssr.tsx](scripts/smoke-ssr.tsx) | Smoke test de render headless (toda a árvore menu/modal) |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | CI: npm ci → npm run check (Node 22) |

## 🤝 Contribuindo

1. Faça fork do repo, crie a branch no padrão `arena/<nome>` ou `feat/<nome>`.
2. `npm run check` deve estar verde antes de abrir PR (typecheck + 286 testes + build).
3. Evite novas dependências de runtime salvo se realmente necessário — filosofia: **um arquivo, sem rede, jogável para sempre**.
4. No PR, indique as telas/modos afetados e anexe um clipe se o gameplay mudar.

## 📄 Licença & autor

<img src="assets/license.svg" alt="AGPL-3.0-only — licença copyleft" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — ver [LICENSE](LICENSE) & [assets/license.svg](assets/license.svg).
- Fontes: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (subsets woff2 auto-hospedados).
- A cada pote de conserva em cada bandeja de arroz vietnamita — um brinde. 🫙🇻🇳
