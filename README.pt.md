<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Pickled Jar Showdown" width="100%" />

# LỌ CHÉO — PICKLED JAR SHOWDOWN

### 🫙 Arcade vietnamita de conserva rodando 100% no navegador — um único arquivo HTML autocontido, offline-first
### 🌐 UI no jogo em 5 idiomas — Tiếng Việt · English · 中文 · 日本語 · 한국어

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.3-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.3.md)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-instalar--rodar)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-build-de-produção)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-trocar-de-idioma)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo gameplay — o pote inclina na diagonal, captura ingredientes, despedaça bolor" width="100%" />

</div>

---

## 🥒 Sobre o projeto

> Lọ Chéo — Pickled Jar Showdown: um arcade de conserva que roda 100% no navegador, empacotado num único HTML autocontido, offline-first — sem CDN, sem servidor. O pote de cerâmica só sabe se mover na **diagonal**: segure duas teclas para inclinar, acelerar e despedaçar bolor, moscas e lagartas; depois encha o pote antes que a cerâmica rache em três. **7 modos de jogo · 14 ingredientes · 14 conquistas · ranking TOP 8 · interface em 5 idiomas.**

Isto é um **arcade de ação de tela única** inspirado nas singelas conservas vietnamitas. Sem fases lineares, sem menus poluídos — só o pote, uma chuva infinita de hortifruti e seus reflexos em chamas.

## 🆕 Novidades no v1.1.3

- 🌧️ **2 novos modos** — **Chuva de Conservas** (queda ×0.88 mais lenta, porém ~1.4× mais densa e ×1.5 mais perigos, ×0.75 pontos — uma gloriosa «enchente de conservas», níveis em velocidade luz) e **Cerâmica Fina** (uma única trinca e o pote estilhaça, ×2.0 pontos, ×1.3 perigos — só para mãos de diamante). Total: **7 modos**.
- 🏆 **2 novas conquistas** — **PÉ-D'ÁGUA** (60 conservas numa partida de Chuva de Conservas) & **CERÂMICA DE AÇO** (encher um pote em Cerâmica Fina). Total: **14 conquistas**.
- 🌐 **5 idiomas no jogo** — adicionados **日本語 (日)** e **한국어 (한)** ao lado de VI/EN/中: 193 chaves por idioma, sincroniza `<html lang>`, números por locale (vi-VN / en-US / zh-CN / ja-JP / ko-KR).
- 🚀 **Launchers multilíngues animados** — os três launchers (`play-linux.sh` · `play-mac.command` · `play-windows.bat`) trocam de idioma com a tecla `L` (VI→EN→中文), respeitam `LOCHEO_LANG` e trazem banner de triplo flash, spinner braille com % real e faíscas; o menu vietnamita mantém **todos os diacríticos**. Veja [scripts/README.md](scripts/README.md).
- ⭐ **Novo favicon** `favicon.ico` (multi-tamanho 16→256 px) + `assets/favicon.svg` animado (SMIL) & `public/` — pronto para a web, lindo em cada aba.
- 🐛 **Varredura completa de bugs** (veja [CHANGELOG](CHANGELOG.md), `[1.1.3]`); `npm run check` verde com **55 testes unitários**.

<img src="assets/modes.svg" alt="Os 7 modos — Classic · Zen · Inferno · 60-Second Rush · Gold Rush · Chuva de Conservas · Cerâmica Fina" width="100%" />

<div align="center"><img src="assets/favicon.svg" alt="Favicon do Lọ Chéo — pote de conservas inclinado com tampa dourada (animação SMIL)" width="150" /></div>

→ Detalhes completos: [docs/releases/v1.1.3.md](docs/releases/v1.1.3.md)

## ✨ Destaques

| Grupo | Detalhes |
| --- | --- |
| 🎮 **7 modos de jogo** | **CONSERVA CLÁSSICA** (equilibrado) · **ZEN** (sem perigos, ×0.5) · **INFERNO DA PIMENTA** (+35% velocidade, ×1.5) · **CORRIDA DE 60 SEGUNDOS** (time-attack 60 s, ×1.25) · **FEBRE DE OURO** (butim dourado ×2.6) · **Chuva de Conservas** (densidade ~1.4×, ×0.75) · **Cerâmica Fina** (uma trinca basta, ×2.0) |
| 🌐 **i18n no jogo** | Tiếng Việt · English · 中文 · 日本語 · 한국어 — `src/i18n/` (módulo puro + ponte React), `t()` com interpolação, sincroniza `<html lang>`, números por locale (vi-VN / en-US / zh-CN / ja-JP / ko-KR) |
| 🕹️ **Mecânica CHÉO exclusiva** | Segure 2 teclas/eixos na diagonal — o pote acelera, brilha e despedaça perigos. Barra de stamina dedicada com histerese anti-flicker |
| 🥬 **14 ingredientes** | Berinjela, pimenta, alho, gengibre, sal, mostarda · **MOSTARDA DOURADA** (enche o pote rápido) · SAL/ALHO DOURADO · PIMENTA INFERNO · GELO · MOFO, MOSCA, **LAGARTA** (perigos) |
| 🧄 **Escudo de Alho Dourado** | Power-up: empilha até **2 cargas** que absorvem rachaduras; uma auréola giratória orbita o pote |
| 🏆 **14 conquistas** | Salvas **entre partidas** (localStorage), com aviso «NOVA CONQUISTA!» na tela de fim de jogo |
| 🔊 **Áudio artesanal** | 11 efeitos sintetizados com Web Audio API (zero arquivos) + escala pentatônica que muda com o nível; silenciar com `M` |
| 💾 **Ranking TOP 8** | Salvo localmente, validado e normalizado na leitura, nomes em maiúsculas, destaque para recorde recém-batido |
| 🎨 **Gráficos 60fps** | Canvas 2D, orçamento de 460 partículas, DPR limitado a 2, chão de ladrilho pré-renderizado offscreen, estrelas cintilantes + aurora no menu |
| 📴 **Offline-first de verdade** | Fontes auto-hospedadas (subsets latin + vietnamita, woff2), sem CDN, sem API — duplo clique em `dist/index.html` e jogue |
| 🧪 **Portões de qualidade** | 55 testes unitários (vitest) para modes / achievements / storage / i18n — `npm run check` é o portão de CI |

<img src="assets/items.svg" alt="Os 14 ingredientes — conservas para pegar, poderes dourados para agarrar, perigos para desviar" width="100%" />

## 🌐 Trocar de idioma

O Lọ Chéo vem com **5 idiomas de interface**, aplicados na hora — sem reload, sem perder a partida:

| Idioma | Onde | Guardado em |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | botão **VI** (padrão; segue o locale do navegador) | `locheo.lang.v1` |
| 🇬🇧 English | botão **EN** | `locheo.lang.v1` |
| 🇨🇳 中文 | botão **中** | `locheo.lang.v1` |
| 🇯🇵 日本語 | botão **日** | `locheo.lang.v1` |
| 🇰🇷 한국어 | botão **한** | `locheo.lang.v1` |

- Troque pelo **menu principal** (canto superior direito) ou pela **tela de pausa** (embaixo, modo compacto).
- Toda string visível vive em `src/i18n/locales/{vi,en,zh,ja,ko}.ts` — engine de canvas, telas, HUD, popups, ticker, dicas.
- Chave faltando? `t()` cai de volta para vietnamita — os cinco conjuntos de chaves (e seus placeholders) são impostos por testes.

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
| Trocar idioma | — (botões VI/EN/中/日/한) | Botões VI/EN/中/日/한 no menu / pausa |

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

> O `vite-plugin-singlefile` injeta todo JS/CSS/fontes/imagens em **um único** `dist/index.html` (~655 KB, gzip ~330 KB). Sem servidor, sem rede.

### Desenvolvimento

```bash
npm run dev        # dev server com HMR (http://localhost:5173)
npm run preview    # serve o build de produção localmente
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 55 testes unitários (modes / achievements / storage / i18n)
npm run check      # typecheck + test + build (portão de qualidade CI)
```

## 🗂️ Estrutura do projeto

```
lo-cheoio/
├─ index.html              # entry, meta SEO/OG (sem CDN)
├─ package.json            # lo-cheoio v1.1.3, scripts dev/build/test/check
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; inclui src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # banner do README (animação SMIL)
│  ├─ demo.svg             # simulação de gameplay (animação SMIL)
│  ├─ items.svg            # os 14 ingredientes (animação SMIL)
│  ├─ modes.svg            # os 7 modos (animação SMIL)
│  ├─ license.svg          # selo copyleft AGPL-3.0 animado (animação SMIL)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # lançador macOS — duplo clique, menu colorido
│  ├─ play-windows.bat     # lançador Windows — duplo clique, menu colorido
│  ├─ play-linux.sh        # lançador Linux — duplo clique, menu colorido
│  └─ README.md            # guia de lançadores para quem não curte terminal
├─ docs/
│  ├─ DESCRIPTION.md       # textos do projeto em vários idiomas (vi/en/zh + SEO)
│  └─ releases/
│     ├─ v1.0.0.md         # notas da primeira release
│     ├─ v1.1.0.md         # notas da v1.1.0
│     ├─ v1.1.1.md         # notas da v1.1.1
│     ├─ v1.1.2.md         # v1.1.2
│     └─ v1.1.3.md         # notas da release atual (1.1.3)
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
│  ├─ version.ts           # APP_VERSION = "1.1.3" (fonte única da verdade)
│  ├─ index.css            # tema tailwind v4 + todas as animações/gradientes
│  ├─ assets/fonts/        # subsets woff2 (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, 100% offline
│  ├─ i18n/
│  │  ├─ i18n.ts           # módulo puro: detect, persist, t() + interpolação
│  │  ├─ useI18n.ts        # hook React: useI18n/useLanguage
│  │  └─ locales/          # vi.ts (fonte das chaves) · en · zh · ja · ko
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # canvas + joystick flutuante + teclado + visibility
│  │  ├─ StartScreen.tsx   # menu: aurora, shimmer, seletor de modo, conquistas
│  │  ├─ ModeSelector.tsx  # 7 cartões de modo (classic/zen/inferno/blitz/goldrush/storm/hardcore)
│  │  ├─ AchievementsPanel.tsx  # mural de emblemas locked/unlocked
│  │  ├─ GameOverScreen.tsx     # POTE PARTIDO! + pontos + conquistas novas
│  │  ├─ PauseScreen.tsx        # PAUSADO + estatísticas da partida
│  │  ├─ LanguageSwitcher.tsx   # switcher VI / EN / 中 / 日 / 한 compartilhado
│  │  └─ ui.tsx            # GameButton, Panel, Keycap, Stat, ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # toda a simulação + renderização canvas (~2100 linhas)
│  │  ├─ modes.ts          # modos de jogo + matemática de equilíbrio (pure)
│  │  ├─ achievements.ts   # 14 emblemas + checker puro (pure)
│  │  ├─ storage.ts        # localStorage: top 8, progress, conquistas
│  │  └─ audio.ts          # Web Audio synth: sfx + música pentatônica
│  └─ utils/cn.ts          # clsx + tailwind-merge
└─ tests/                  # vitest — modes, achievements, storage, i18n
```

## 🧱 Arquitetura & performance

- **Game loop** em `requestAnimationFrame` com delta-time limitado a `1/20s`, multiplicado por `timeScale` (slow-mo do GELO) e um breve **hit-stop** congelando a cada captura, para aquele "soco".
- **HUD de canvas** desenhado direto a cada frame; o React só renderiza telas conforme a `phase` — nenhum re-render no hot loop; ao trocar de idioma, o HUD pega o novo dicionário já no próximo frame.
- **i18n em camadas**: `src/i18n/i18n.ts` é um módulo puro (sem React), `useI18n` apenas faz a ponte de re-render via evento `locheo:languagechange`; `t()` suporta interpolação `{param}` e cai de volta para vietnamita.
- **Chão de ladrilhos** pré-renderizado uma vez num offscreen canvas (com vignette + poças de luz); estrelas cintilantes e bolhas são calculadas em tempo real — muito barato.
- **Orçamento**: ≤460 partículas, ≤70 itens, ≤34 popups, DPR ≤ 2; varredura de hitbox collision; os respingos de conserva no chão se limpam sozinhos.
- **localStorage** com validação/normalização de entrada — um registro ruim nunca corrompe o ranking; se o storage estiver bloqueado (modo privado do Safari), o jogo continua em memória; a escolha de idioma vive à parte em `locheo.lang.v1`.
- **Motion chill**: `prefers-reduced-motion` desliga aurora/shimmer/giro; tanto as estrelas de fundo quanto o tremor de tela respeitam as media queries.

## ❓ FAQ

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

## 📦 Releases & changelog

| Versão | Data | Notas |
| --- | --- | --- |
| [v1.1.3](docs/releases/v1.1.3.md) | 2026-11-12 | 7 modos (Chuva de Conservas · Cerâmica Fina) · 14 conquistas · 5 idiomas · favicon · launchers multilíngues · 55 testes |
| [v1.1.2](docs/releases/v1.1.2.md) | 2026-11-12 | 5 modos (60 Seconds Rush · Gold Rush) · 12 conquistas · combo em chamas · lançadores de duplo clique · README em 10 idiomas · 49 testes |
| [v1.1.1](docs/releases/v1.1.1.md) | 2026-11-12 | i18n no jogo VI/EN/ZH · README em 7 idiomas · caça geral a bugs · 45 testes |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3 modos de jogo · Escudo de Alho Dourado · Lagarta · Mostarda Dourada · 10 conquistas · fontes auto-hospedadas |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | Primeira release: engine completo, 11 ingredientes, JAR SLAM, combo ×9 |

Veja também [CHANGELOG.md](CHANGELOG.md).

## 🤝 Contribuindo

1. Faça fork do repo, crie a branch no padrão `arena/<nome>` ou `feat/<nome>`.
2. `npm run check` deve estar verde antes de abrir PR (typecheck + 55 testes + build).
3. Evite novas dependências de runtime salvo se realmente necessário — filosofia: **um arquivo, sem rede, jogável para sempre**.
4. No PR, indique as telas/modos afetados e anexe um clipe se o gameplay mudar.

## 📄 Licença & autor

<img src="assets/license.svg" alt="AGPL-3.0-only — licença copyleft" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — ver [LICENSE](LICENSE) & [assets/license.svg](assets/license.svg).
- Fontes: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (subsets woff2 auto-hospedados).
- A cada pote de conserva em cada bandeja de arroz vietnamita — um brinde. 🫙🇻🇳
