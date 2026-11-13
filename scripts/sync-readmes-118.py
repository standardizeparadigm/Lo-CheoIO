#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sync the nine translated READMEs to v1.1.8 (one-shot helper, 1.1.8).

Run from the repo root:  python3 scripts/sync-readmes-118.py

Why a script and not ten hand edits: every README needs the *same* structural
change (new "what's new" block, new release row, new SVGs, bumped counts) in
*its own* language, and a hand edit is how v1.1.7 ended up with nine files at
slightly different versions of the truth. The block text below is the only
per-language input.
"""

import io
import re
import sys

# ---------------------------------------------------------------- translations

WHATSNEW = {
"en": """## 🆕 What's new in v1.1.8

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

<img src="assets/layout-fix.svg" alt="v1.1.7 vs v1.1.8 layout — a 250px scene cut in half against a 720px scene with floating chrome (SMIL animation)" width="100%" />

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

### 🧪 44 new tests lock it down

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

→ Full detail: [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · Previous: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)""",

"zh": """## 🆕 v1.1.8 新内容

> **1.2.0 之前的最后一个补丁**。不新增玩法——修复开始界面的布局溢出，新增三个目录，并同步全部文档。

### 📐 开始界面不再溢出

截图中**四类错误同时出现**：`CHÉO` 标题被拦腰截断、吉祥物罐子只剩下半身、GAME 面板底部被切、ticker 下方的版权行被裁掉。四者**同一个原因**——一个没人负责的加法。

```
1280×720 下的旧 flex 列：
  scene      flex-1     →  只拿到 250px （需要约 700px）
  panel row  shrink-0   →      415px
  ticker     shrink-0   →       55px
                          ─────────────
                          720 − 415 − 55 = 250
```

`shrink-0` 让后两项无法收缩，scene 只剩 **250px**；比它高的一切（标题、罐子）都被 `overflow-y-auto` 在 `y≈247px` 处切掉。截图中量到的切缝是 **247.3px**，算式给出 **250.0px**，相差 2.7px。

<img src="assets/layout-fix.svg" alt="v1.1.7 与 v1.1.8 布局对比——250px 的 scene 被截断 vs 720px 的 scene 与浮动 chrome（SMIL 动画）" width="100%" />

**修法**——把 chrome 移出文档流，让"总和"有负责人：

| 改动 | 效果 |
| --- | --- |
| `MenuChrome` 改为 `position: absolute` | 无法压缩 scene——scene 总是拿到完整 720px |
| scene `padding-bottom: plan.reserve` | 内容不会藏到面板下，但 scene *可以*占满高度 |
| `.menu-ticker` 固定 48px + `overflow: hidden` | 版权行与跑马灯同行，不再折到第二行 |

在截图那个尺寸下，scene 从 **250px 变成 382px**。罐子和标题完整——并且**没有改动任何 SVG**：`jar.tsx` 一直画满 `viewBox 0 0 120 140`，只是下半身落在了可见区域之外。

### 🔍 测量时额外发现的四个错误

| # | 错误 | 原因 | 修法 |
| --- | --- | --- | --- |
| 1 | 右边缘的**青色滚动条**压在星云上 | 内容溢出时 scene 露出 8px 轨道 | 隐藏滚动条，用 `padding-bottom` 保留空间 |
| 2 | 手机上**两个面板重叠** | `208 + 224px` 装不进 `375px` | 520px 以下改为纵向排列 |
| 3 | 矮而宽的窗口里 **`CHÉO` 过高** | 字号只随 `17vw` 缩放，不看高度 | `clamp(3.4rem, min(17vw, 20vh), 10.5rem)` |
| 4 | **面板高度随语言变化** | 一行的高度等于提示换行后的高度；越南语/德语占三行 | 固定 `--menu-row-h`，提示最多两行 |

### 🗂️ 三个新目录——22 个文件

每个成就现在有**独立文件**，写明解锁条件与存在理由——旧的十六行表格回答不了这个问题：

```ts
/**
 * hardcore-jar — HARDCORE JAR
 *
 * Unlocks when: `run.mode === "hardcore" && run.jars >= 1`
 *
 * Why this one exists: mode-specific: one jar with a single crack
 */
```

### 🧪 新增 44 项测试锁住

| 文件 | 测试 | 锁定内容 |
| --- | --- | --- |
| `tests/menu-layout.test.ts` | **22** | 曾经溢出的加法；CSS 与 TypeScript 每个常量一致；浮动行不再有 `shrink-0` |
| `tests/achievements-split.test.ts` | **8** | 拆成十六个文件后 id 顺序不变、每个 id 仍会被 `grant` |
| `scripts/probe-menu-layout.tsx` | **11** | 同样这些性质，但检查 `react-dom/server` 生成的**真实 DOM** |

### 🐛 修复清单

| # | 错误 | 修法 |
| --- | --- | --- |
| 1 | `CHÉO` 被拦腰截断 | chrome 移出文档流 + scene 自留空间 |
| 2 | 罐子少了半身 | 同一原因——**不是** SVG 的问题 |
| 3 | GAME 面板底部被切 | 720px 的盒子里塞了 732px 的 flex 列 |
| 4 | 版权行被裁 | ticker 固定 48px、单行 |
| 5 | 滚动条压住画面 | `scrollbar-width: none` |
| 6 | 手机上两个面板重叠 | 520px 以下纵向排列 |
| 7 | `CHÉO` 高出容器 | 额外用 `20vh` 封顶 |
| 8 | 面板高度随语言变化 | 固定 `--menu-row-h` + 提示截断 |

→ 完整细节：[docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · 上一版：[docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)""",

"ja": """## 🆕 v1.1.8 の新着

> **1.2.0 前の最後のパッチ**。新モードは追加せず、スタート画面のレイアウト崩れを修正し、3つのフォルダを追加し、全ドキュメントを同期しました。

### 📐 スタート画面のオーバーフローを解消

スクリーンショットには**4つの不具合が同時に**写っていました。`CHÉO` のロゴが真ん中で切れ、マスコットの壺は下半身を失い、GAME パネルは下端で切断され、ティッカーの著作権行も切られていました。4つとも**原因は1つ**——誰も管理していない足し算です。

```
1280×720 での旧 flex カラム：
  scene      flex-1     →  250px しか得られず（約 700px 必要）
  panel row  shrink-0   →      415px
  ticker     shrink-0   →       55px
                          ─────────────
                          720 − 415 − 55 = 250
```

`shrink-0` のため後ろ2つは縮まず、scene は **250px** だけ。それより高いもの（ロゴ、壺）は `overflow-y-auto` により `y≈247px` で切られます。画像で測った切れ目は **247.3px**、計算は **250.0px**。誤差 2.7px で一致します。

<img src="assets/layout-fix.svg" alt="v1.1.7 と v1.1.8 のレイアウト比較 — 250px で切れる scene と、浮遊する chrome を伴う 720px の scene（SMIL アニメーション）" width="100%" />

**修正内容**——chrome をフローから外し、合計に責任者を持たせる：

| 変更 | 効果 |
| --- | --- |
| `MenuChrome` を `position: absolute` に | scene を縮められない——常に 720px 全体を確保 |
| scene に `padding-bottom: plan.reserve` | 内容がパネルの下に隠れず、しかも scene は全高でいられる |
| `.menu-ticker` を 48px 固定 + `overflow: hidden` | 著作権行がマーキーと同じ行に入る |

スクリーンショットと同じサイズで、scene は **250px → 382px**。壺もロゴも完全なまま。**SVG は一切触っていません**——`jar.tsx` は `viewBox 0 0 120 140` 全体を描いており、下半身が単に見える範囲の外にあっただけです。

### 🔍 計測中に見つかった副次的な4件

| # | 不具合 | 原因 | 修正 |
| --- | --- | --- | --- |
| 1 | 右端の**青いスクロールバー**が星雲に重なる | 内容があふれ scene が 8px のトラックを露出 | 非表示にし、`padding-bottom` で余白を確保 |
| 2 | スマホで**パネルが重なる** | `208 + 224px` は `375px` に収まらない | 520px 未満は縦積み |
| 3 | 低くて広い窓で **`CHÉO` が高すぎる** | 文字サイズが `17vw` だけを見ていた | `clamp(3.4rem, min(17vw, 20vh), 10.5rem)` |
| 4 | **パネル高が言語で変わる** | 行の高さがヒントの折返し次第。ベトナム語/ドイツ語で3行 | `--menu-row-h` 固定 + ヒント2行クランプ |

### 🗂️ 新しい3フォルダ——22ファイル

各実績が**独立ファイル**になり、解除条件と存在理由を記述——旧16行の表では答えられなかった問いです。

### 🧪 新規44テストで固定

| ファイル | テスト | 固定する内容 |
| --- | --- | --- |
| `tests/menu-layout.test.ts` | **22** | かつてあふれた足し算、CSS と TypeScript の全定数一致、浮遊行に `shrink-0` がないこと |
| `tests/achievements-split.test.ts` | **8** | 16ファイル分割で id 順が変わらず、全 id が `grant` されること |
| `scripts/probe-menu-layout.tsx` | **11** | 同じ性質を `react-dom/server` が生成した**実 DOM** で検査 |

### 🐛 修正一覧

| # | 不具合 | 修正 |
| --- | --- | --- |
| 1 | `CHÉO` が途中で切れる | chrome をフロー外へ + scene が自前で余白を確保 |
| 2 | 壺の下半身が消える | 同じ原因——SVG ではない |
| 3 | GAME パネルが下端で切れる | 720px の箱に 732px の flex カラム |
| 4 | 著作権行が切れる | ティッカーを 48px 単一行に |
| 5 | スクロールバーが画面に重なる | `scrollbar-width: none` |
| 6 | スマホでパネルが重なる | 520px 未満は縦積み |
| 7 | `CHÉO` が枠より高い | `20vh` でも上限を設定 |
| 8 | パネル高が言語依存 | `--menu-row-h` 固定 + ヒントクランプ |

→ 詳細：[docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · 前版：[docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)""",

"ko": """## 🆕 v1.1.8 새 소식

> **1.2.0 전 마지막 패치**. 새 모드는 없습니다 — 시작 화면의 레이아웃 넘침을 고치고, 폴더 세 개를 추가하고, 모든 문서를 동기화했습니다.

### 📐 시작 화면이 더 이상 넘치지 않습니다

스크린샷에는 **네 가지 결함이 동시에** 찍혀 있었습니다. `CHÉO` 로고는 한가운데가 잘렸고, 마스코트 항아리는 아래 절반이 사라졌고, GAME 패널은 아래에서 잘렸고, 티커 아래 저작권 줄도 잘렸습니다. 넷 모두 **원인은 하나** — 아무도 책임지지 않던 덧셈입니다.

```
1280×720에서의 예전 flex 컬럼:
  scene      flex-1     →  250px만 받음 (약 700px 필요)
  panel row  shrink-0   →      415px
  ticker     shrink-0   →       55px
                          ─────────────
                          720 − 415 − 55 = 250
```

`shrink-0` 때문에 뒤의 둘은 줄지 않고, scene은 **250px**만 남습니다. 그보다 큰 것(로고, 항아리)은 `overflow-y-auto`에 의해 `y≈247px`에서 잘렸습니다. 이미지에서 잰 절단선은 **247.3px**, 계산은 **250.0px**. 오차 2.7px로 일치합니다.

<img src="assets/layout-fix.svg" alt="v1.1.7와 v1.1.8 레이아웃 비교 — 250px에서 잘리는 scene과, 떠 있는 chrome을 동반한 720px scene (SMIL 애니메이션)" width="100%" />

**해결** — chrome을 플로우에서 빼고, 합계에 주인을 만듭니다:

| 변경 | 효과 |
| --- | --- |
| `MenuChrome`을 `position: absolute`로 | scene을 줄일 수 없음 — 항상 720px 전체 |
| scene에 `padding-bottom: plan.reserve` | 내용이 패널 아래로 숨지 않으면서 scene은 전체 높이 가능 |
| `.menu-ticker` 48px 고정 + `overflow: hidden` | 저작권 줄이 마퀴와 같은 줄로 |

스크린샷과 같은 크기에서 scene은 **250px → 382px**. 항아리와 로고가 온전합니다. **SVG는 손대지 않았습니다** — `jar.tsx`는 `viewBox 0 0 120 140`을 그대로 그립니다. 아래 절반이 보이는 영역 밖에 있었을 뿐입니다.

### 🔍 측정 중 찾은 부수적인 네 가지

| # | 결함 | 원인 | 해결 |
| --- | --- | --- | --- |
| 1 | 오른쪽 끝 **청록 스크롤바**가 성운 위에 | 내용이 넘쳐 scene이 8px 트랙을 노출 | 숨기고 `padding-bottom`으로 공간 확보 |
| 2 | 휴대폰에서 **패널 겹침** | `208 + 224px`는 `375px`에 안 들어감 | 520px 미만에서 세로 배치 |
| 3 | 낮고 넓은 창에서 **`CHÉO`가 너무 큼** | 글자 크기가 `17vw`만 따름 | `clamp(3.4rem, min(17vw, 20vh), 10.5rem)` |
| 4 | **패널 높이가 언어에 따라 변함** | 행 높이가 힌트 줄 수에 따라 결정 | `--menu-row-h` 고정 + 힌트 2줄 클램프 |

### 🗂️ 새 폴더 세 개 — 파일 22개

각 업적이 **자기 파일**을 갖고 해금 조건과 존재 이유를 적습니다 — 예전 16행 표가 답하지 못한 질문입니다.

### 🧪 새 테스트 44개

| 파일 | 테스트 | 고정하는 것 |
| --- | --- | --- |
| `tests/menu-layout.test.ts` | **22** | 예전에 넘치던 덧셈, CSS ↔ TypeScript 상수 일치, 떠 있는 행에 `shrink-0` 없음 |
| `tests/achievements-split.test.ts` | **8** | 16파일 분할 후에도 id 순서 불변, 모든 id가 `grant`됨 |
| `scripts/probe-menu-layout.tsx` | **11** | 같은 속성을 `react-dom/server`가 만든 **실제 DOM**에서 검사 |

### 🐛 수정 목록

| # | 결함 | 해결 |
| --- | --- | --- |
| 1 | `CHÉO`가 중간에 잘림 | chrome을 플로우 밖으로 + scene이 자체 여백 확보 |
| 2 | 항아리 아래 절반 소실 | 같은 원인 — SVG 문제 아님 |
| 3 | GAME 패널 아래 잘림 | 720px 상자에 732px flex 컬럼 |
| 4 | 저작권 줄 잘림 | 티커를 48px 한 줄로 |
| 5 | 스크롤바가 화면 위에 | `scrollbar-width: none` |
| 6 | 휴대폰에서 패널 겹침 | 520px 미만 세로 배치 |
| 7 | `CHÉO`가 틀보다 큼 | `20vh`로도 상한 |
| 8 | 패널 높이가 언어 의존 | `--menu-row-h` 고정 + 힌트 클램프 |

→ 전체 내용: [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · 이전: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)""",

"es": """## 🆕 Novedades de la v1.1.8

> El **parche final** antes de 1.2.0. Sin modos nuevos: la pantalla de inicio deja de desbordarse, se añaden tres carpetas y toda la documentación queda sincronizada.

### 📐 La pantalla de inicio ya no se desborda

La captura mostraba **cuatro defectos a la vez**: el rótulo `CHÉO` cortado por la mitad, la vasija mascota sin su mitad inferior, el panel GAME cortado abajo y la línea de copyright bajo el ticker recortada. Los cuatro tenían **una sola causa**: una suma que nadie vigilaba.

```
la antigua columna flex a 1280×720:
  scene      flex-1     →  recibía 250px   (necesitaba ~700px)
  panel row  shrink-0   →       415px
  ticker     shrink-0   →        55px
                          ─────────────
                          720 − 415 − 55 = 250
```

`shrink-0` impedía que los dos últimos se encogieran, así que la escena conservaba solo **250px** y todo lo más alto —el rótulo, la vasija— quedaba recortado por `overflow-y-auto` en `y≈247px`. La costura medida en la imagen es **247.3px**; la aritmética da **250.0px**. Coinciden con 2.7px de margen.

<img src="assets/layout-fix.svg" alt="Comparación de maquetación v1.1.7 vs v1.1.8 — escena de 250px cortada frente a 720px con el chrome flotante (animación SMIL)" width="100%" />

**La solución** — sacar el chrome del flujo y darle dueño al total:

| Cambio | Efecto |
| --- | --- |
| `MenuChrome` es `position: absolute` | no puede encoger la escena: siempre recibe los 720px |
| escena con `padding-bottom: plan.reserve` | el contenido nunca se esconde bajo los paneles, pero la escena *puede* ocupar todo el alto |
| `.menu-ticker` fijo en 48px + `overflow: hidden` | el copyright va en línea con la marquesina, no en una segunda fila |

En el tamaño exacto de la captura la escena pasa de **250px a 382px**. La vasija y el rótulo quedan enteros, y **no se tocó ningún SVG**: `jar.tsx` ya dibujaba el `viewBox 0 0 120 140` completo; la mitad inferior simplemente quedaba fuera de la zona visible.

### 🔍 Cuatro fallos secundarios hallados al medir

| # | Fallo | Causa | Solución |
| --- | --- | --- | --- |
| 1 | **Barra de desplazamiento turquesa** sobre la nebulosa | la escena exponía una pista de 8px con contenido desbordado | ocultarla y reservar espacio con `padding-bottom` |
| 2 | **Paneles superpuestos** en móvil | `208 + 224px` no cabe en `375px` | apilarlos por debajo de 520px |
| 3 | **`CHÉO` demasiado alto** en ventanas bajas y anchas | el tamaño solo escalaba con `17vw`, nunca con la altura | `clamp(3.4rem, min(17vw, 20vh), 10.5rem)` |
| 4 | **Altura del panel según el idioma** | una fila medía lo que ocupara su pista; vietnamita/alemán ocupaban tres líneas | `--menu-row-h` fijo más recorte de la pista a dos líneas |

### 🗂️ Tres carpetas nuevas — 22 archivos

Cada logro tiene ahora **su propio archivo** con la condición de desbloqueo y el motivo de existir — la pregunta que la tabla de dieciséis filas no respondía.

### 🧪 44 pruebas nuevas lo fijan

| Archivo | Pruebas | Qué fija |
| --- | --- | --- |
| `tests/menu-layout.test.ts` | **22** | la suma que desbordaba; CSS ↔ TypeScript coinciden en cada constante; la fila flotante no lleva `shrink-0` |
| `tests/achievements-split.test.ts` | **8** | la división en dieciséis archivos conserva el orden de ids y todos siguen recibiéndose |
| `scripts/probe-menu-layout.tsx` | **11** | las mismas propiedades sobre el **DOM real** generado por `react-dom/server` |

### 🐛 Correcciones

| # | Fallo | Solución |
| --- | --- | --- |
| 1 | `CHÉO` cortado | chrome fuera del flujo y la escena reserva su espacio |
| 2 | Vasija a medias | misma causa — **no** era el SVG |
| 3 | Panel GAME cortado abajo | columna flex de 732px en una caja de 720px |
| 4 | Línea de copyright recortada | ticker fijo de 48px en una sola fila |
| 5 | Barra de desplazamiento sobre el arte | `scrollbar-width: none` |
| 6 | Paneles superpuestos en móvil | apilados por debajo de 520px |
| 7 | `CHÉO` más alto que su caja | tope adicional por `20vh` |
| 8 | Altura del panel según idioma | `--menu-row-h` fijo y recorte de la pista |

→ Detalle completo: [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · Anterior: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)""",

"fr": """## 🆕 Nouveautés de la v1.1.8

> Le **dernier correctif** avant 1.2.0. Aucun mode supplémentaire : l'écran d'accueil cesse de déborder, trois dossiers sont ajoutés et toute la documentation est synchronisée.

### 📐 L'écran d'accueil ne déborde plus

La capture montrait **quatre défauts à la fois** : le logotype `CHÉO` tranché en deux, la jarre mascotte privée de sa moitié inférieure, le panneau GAME coupé en bas et la ligne de copyright sous le ticker rognée. Les quatre avaient **une seule cause** : une addition que personne ne possédait.

```
l'ancienne colonne flex à 1280×720 :
  scene      flex-1     →  recevait 250px   (il en fallait ~700)
  panel row  shrink-0   →        415px
  ticker     shrink-0   →         55px
                          ─────────────
                          720 − 415 − 55 = 250
```

`shrink-0` empêchait les deux derniers de se réduire ; la scène ne gardait donc que **250px**, et tout ce qui était plus haut — le logotype, la jarre — était rogné par `overflow-y-auto` à `y≈247px`. La couture mesurée sur l'image fait **247.3px** ; le calcul donne **250.0px**. Ils concordent à 2.7px près.

<img src="assets/layout-fix.svg" alt="Comparaison de mise en page v1.1.7 / v1.1.8 — scène de 250px tranchée contre 720px avec le chrome flottant (animation SMIL)" width="100%" />

**La correction** — sortir le chrome du flux et donner un propriétaire au total :

| Changement | Effet |
| --- | --- |
| `MenuChrome` passe en `position: absolute` | il ne peut plus réduire la scène : elle obtient toujours les 720px |
| scène avec `padding-bottom: plan.reserve` | le contenu ne se cache jamais sous les panneaux, mais la scène *peut* occuper toute la hauteur |
| `.menu-ticker` fixé à 48px + `overflow: hidden` | le copyright s'aligne avec le bandeau au lieu de passer sur une deuxième ligne |

À la taille exacte de la capture, la scène passe de **250px à 382px**. La jarre et le logotype sont entiers — et **aucun SVG n'a été touché** : `jar.tsx` dessinait déjà tout le `viewBox 0 0 120 140`, sa moitié basse était simplement hors de la zone visible.

### 🔍 Quatre défauts secondaires trouvés en mesurant

| # | Défaut | Cause | Correction |
| --- | --- | --- | --- |
| 1 | **Barre de défilement turquoise** sur la nébuleuse | la scène exposait une piste de 8px avec du contenu débordant | la masquer et réserver l'espace par `padding-bottom` |
| 2 | **Panneaux superposés** sur mobile | `208 + 224px` ne tient pas dans `375px` | empilés sous 520px |
| 3 | **`CHÉO` trop haut** dans une fenêtre basse et large | la taille ne suivait que `17vw`, jamais la hauteur | `clamp(3.4rem, min(17vw, 20vh), 10.5rem)` |
| 4 | **Hauteur du panneau selon la langue** | une ligne mesurait la hauteur de son indice ; vietnamien/allemand prenaient trois lignes | `--menu-row-h` fixe et indice limité à deux lignes |

### 🗂️ Trois nouveaux dossiers — 22 fichiers

Chaque succès possède désormais **son propre fichier**, indiquant sa condition de déblocage et la raison de son existence — la question à laquelle le tableau de seize lignes ne répondait pas.

### 🧪 44 tests supplémentaires le verrouillent

| Fichier | Tests | Ce qui est verrouillé |
| --- | --- | --- |
| `tests/menu-layout.test.ts` | **22** | l'addition qui débordait ; CSS ↔ TypeScript d'accord sur chaque constante ; la rangée flottante n'a plus de `shrink-0` |
| `tests/achievements-split.test.ts` | **8** | la découpe en seize fichiers préserve l'ordre des ids et chacun est toujours attribué |
| `scripts/probe-menu-layout.tsx` | **11** | les mêmes propriétés, vérifiées sur le **DOM réel** produit par `react-dom/server` |

### 🐛 Corrections

| # | Défaut | Correction |
| --- | --- | --- |
| 1 | `CHÉO` tranché | chrome hors du flux + la scène réserve son espace |
| 2 | Jarre à moitié | même cause — **pas** le SVG |
| 3 | Panneau GAME coupé | colonne flex de 732px dans une boîte de 720px |
| 4 | Ligne de copyright rognée | ticker fixe de 48px sur une seule ligne |
| 5 | Barre de défilement sur l'illustration | `scrollbar-width: none` |
| 6 | Panneaux superposés sur mobile | empilés sous 520px |
| 7 | `CHÉO` plus haut que sa boîte | plafond supplémentaire par `20vh` |
| 8 | Hauteur du panneau selon la langue | `--menu-row-h` fixe + indice limité |

→ Détail complet : [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · Précédent : [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)""",

"th": """## 🆕 มีอะไรใหม่ใน v1.1.8

> **แพตช์สุดท้าย**ก่อน 1.2.0 ไม่มีโหมดใหม่ — หน้าเริ่มเกมหยุดล้น ทุกอย่างอยู่ในกรอบ เพิ่มสามโฟลเดอร์ และซิงก์เอกสารทั้งหมด

### 📐 หน้าเริ่มเกมไม่ล้นอีกต่อไป

ภาพหน้าจอแสดง **สี่อาการพร้อมกัน** โลโก้ `CHÉO` ถูกตัดกลาง หม้อมาสคอตหายครึ่งล่าง แผง GAME ถูกตัดที่ขอบล่าง และบรรทัดลิขสิทธิ์ใต้แถบเลื่อนก็ถูกตัด ทั้งสี่มี **สาเหตุเดียว** — การบวกที่ไม่มีใครรับผิดชอบ

```
คอลัมน์ flex เดิมที่ 1280×720:
  scene      flex-1     →  ได้เพียง 250px  (ต้องการ ~700px)
  panel row  shrink-0   →       415px
  ticker     shrink-0   →        55px
                          ─────────────
                          720 − 415 − 55 = 250
```

`shrink-0` ทำให้สองส่วนหลังหดไม่ได้ ฉากจึงเหลือเพียง **250px** อะไรที่สูงกว่านั้น — โลโก้ หม้อ — ถูกตัดโดย `overflow-y-auto` ที่ `y≈247px` รอยต่อที่วัดได้จากภาพคือ **247.3px** ส่วนการคำนวณให้ **250.0px** ต่างกันเพียง 2.7px

<img src="assets/layout-fix.svg" alt="เทียบเลย์เอาต์ v1.1.7 กับ v1.1.8 — ฉาก 250px ที่ถูกตัด เทียบกับฉาก 720px พร้อม chrome ลอย (แอนิเมชัน SMIL)" width="100%" />

**วิธีแก้** — ย้าย chrome ออกจากโฟลว์ และมอบหมายเจ้าของให้ผลรวม:

| การเปลี่ยน | ผลลัพธ์ |
| --- | --- |
| `MenuChrome` เป็น `position: absolute` | บีบฉากไม่ได้ — ฉากได้ 720px เต็มเสมอ |
| ฉากมี `padding-bottom: plan.reserve` | เนื้อหาไม่ซ่อนใต้แผง แต่ฉาก *สามารถ* สูงเต็มได้ |
| `.menu-ticker` สูงคงที่ 48px + `overflow: hidden` | บรรทัดลิขสิทธิ์อยู่ในแถวเดียวกับมาร์คี |

ที่ขนาดเดียวกับภาพ ฉากเปลี่ยนจาก **250px เป็น 382px** หม้อและโลโก้สมบูรณ์ — และ **ไม่ได้แตะ SVG เลย** เพราะ `jar.tsx` วาด `viewBox 0 0 120 140` เต็มอยู่แล้ว แค่ครึ่งล่างอยู่นอกพื้นที่มองเห็น

### 🔍 สี่บั๊กที่พบระหว่างวัด

| # | บั๊ก | สาเหตุ | วิธีแก้ |
| --- | --- | --- | --- |
| 1 | **แถบเลื่อนสีเขียวน้ำทะเล** ทับเนบิวลา | ฉากเผยราง 8px เมื่อเนื้อหาล้น | ซ่อน แล้วกันที่ด้วย `padding-bottom` |
| 2 | **แผงซ้อนกัน** บนมือถือ | `208 + 224px` ไม่พอดี `375px` | ต่ำกว่า 520px เรียงแนวตั้ง |
| 3 | **`CHÉO` สูงเกิน** ในหน้าต่างเตี้ยกว้าง | ขนาดอิงแค่ `17vw` ไม่ดูความสูง | `clamp(3.4rem, min(17vw, 20vh), 10.5rem)` |
| 4 | **ความสูงแผงขึ้นกับภาษา** | ความสูงแถวเท่ากับจำนวนบรรทัดของคำใบ้ | `--menu-row-h` คงที่ + จำกัดคำใบ้สองบรรทัด |

### 🗂️ สามโฟลเดอร์ใหม่ — 22 ไฟล์

ความสำเร็จแต่ละอันมี **ไฟล์ของตัวเอง** บอกเงื่อนไขปลดล็อกและเหตุผลที่มีอยู่ — คำถามที่ตารางสิบหกแถวเดิมตอบไม่ได้

### 🧪 เทสต์ใหม่ 44 รายการล็อกไว้

| ไฟล์ | เทสต์ | ล็อกอะไร |
| --- | --- | --- |
| `tests/menu-layout.test.ts` | **22** | การบวกที่เคยล้น, CSS ↔ TypeScript ตรงกันทุกค่าคงที่, แถวลอยไม่มี `shrink-0` |
| `tests/achievements-split.test.ts` | **8** | แยกเป็นสิบหกไฟล์แล้วลำดับ id ไม่เปลี่ยน ทุก id ยังถูก `grant` |
| `scripts/probe-menu-layout.tsx` | **11** | คุณสมบัติเดียวกัน ตรวจบน **DOM จริง** ที่ `react-dom/server` สร้าง |

### 🐛 รายการที่แก้

| # | บั๊ก | วิธีแก้ |
| --- | --- | --- |
| 1 | `CHÉO` ถูกตัดกลาง | chrome ออกจากโฟลว์ + ฉากกันที่เอง |
| 2 | หม้อหายครึ่งล่าง | สาเหตุเดียวกัน — **ไม่ใช่** SVG |
| 3 | แผง GAME ถูกตัดล่าง | คอลัมน์ flex 732px ในกล่อง 720px |
| 4 | บรรทัดลิขสิทธิ์ถูกตัด | ticker สูงคงที่ 48px แถวเดียว |
| 5 | แถบเลื่อนทับภาพ | `scrollbar-width: none` |
| 6 | แผงซ้อนบนมือถือ | ต่ำกว่า 520px เรียงแนวตั้ง |
| 7 | `CHÉO` สูงกว่ากล่อง | จำกัดเพิ่มด้วย `20vh` |
| 8 | ความสูงแผงขึ้นกับภาษา | `--menu-row-h` คงที่ + จำกัดคำใบ้ |

→ รายละเอียดเต็ม: [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · ก่อนหน้า: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)""",

"de": """## 🆕 Neu in v1.1.8

> Der **letzte Patch** vor 1.2.0. Kein neuer Spielmodus — der Startbildschirm läuft nicht mehr über, drei Ordner kommen hinzu, und die gesamte Doku ist synchronisiert.

### 📐 Der Startbildschirm läuft nicht mehr über

Der Screenshot zeigte **vier Fehler gleichzeitig**: der `CHÉO`-Schriftzug mitten durchgeschnitten, dem Maskottchen-Krug fehlte die untere Hälfte, das GAME-Panel war unten abgeschnitten und die Copyright-Zeile unter dem Ticker war gekappt. Alle vier hatten **eine Ursache** — eine Summe, für die niemand zuständig war.

```
die alte Flex-Spalte bei 1280×720:
  scene      flex-1     →  bekam 250px   (brauchte ~700px)
  panel row  shrink-0   →      415px
  ticker     shrink-0   →       55px
                          ─────────────
                          720 − 415 − 55 = 250
```

`shrink-0` machte die beiden unteren unflexibel, die Szene behielt nur **250px**, und alles Höhere — Schriftzug, Krug — wurde von `overflow-y-auto` bei `y≈247px` abgeschnitten. Die im Bild gemessene Naht liegt bei **247.3px**, die Rechnung bei **250.0px**. Abweichung: 2.7px.

<img src="assets/layout-fix.svg" alt="Layoutvergleich v1.1.7 gegen v1.1.8 — eine 250px hohe, zerschnittene Szene gegen 720px mit schwebendem Chrome (SMIL-Animation)" width="100%" />

**Die Lösung** — das Chrome aus dem Fluss nehmen und der Summe einen Eigentümer geben:

| Änderung | Wirkung |
| --- | --- |
| `MenuChrome` ist `position: absolute` | kann die Szene nicht schrumpfen — sie bekommt immer alle 720px |
| Szene mit `padding-bottom: plan.reserve` | Inhalt versteckt sich nie unter den Panels, die Szene *darf* aber die volle Höhe nutzen |
| `.menu-ticker` fest 48px + `overflow: hidden` | die Copyright-Zeile steht in derselben Zeile wie die Laufschrift |

Bei exakt der Größe aus dem Screenshot wächst die Szene von **250px auf 382px**. Krug und Schriftzug sind vollständig — und **kein SVG wurde angefasst**: `jar.tsx` zeichnete immer die volle `viewBox 0 0 120 140`, die untere Hälfte lag nur außerhalb des sichtbaren Bereichs.

### 🔍 Vier Nebenfehler beim Messen gefunden

| # | Fehler | Ursache | Lösung |
| --- | --- | --- | --- |
| 1 | **Türkisfarbene Scrollleiste** über dem Nebel | die Szene zeigte bei Überlauf eine 8px-Spur | ausblenden, Platz per `padding-bottom` reservieren |
| 2 | **Panels überlappen** auf dem Handy | `208 + 224px` passt nicht in `375px` | unter 520px gestapelt |
| 3 | **`CHÉO` zu hoch** im breiten, flachen Fenster | Größe skALierte nur mit `17vw`, nie mit der Höhe | `clamp(3.4rem, min(17vw, 20vh), 10.5rem)` |
| 4 | **Panelhöhe je nach Sprache** | eine Zeile war so hoch wie ihr Hinweis umbrach; Vietnamesisch/Deutsch drei Zeilen | feste `--menu-row-h` plus Hinweis auf zwei Zeilen begrenzt |

### 🗂️ Drei neue Ordner — 22 Dateien

Jede Errungenschaft hat jetzt **eine eigene Datei** mit Freischaltbedingung und Daseinsgrund — die Frage, die die alte Sechzehn-Zeilen-Tabelle nicht beantwortete.

### 🧪 44 neue Tests sichern das ab

| Datei | Tests | Was festgehalten wird |
| --- | --- | --- |
| `tests/menu-layout.test.ts` | **22** | die Addition, die überlief; CSS ↔ TypeScript stimmen in jeder Konstante überein; die schwebende Zeile hat kein `shrink-0` |
| `tests/achievements-split.test.ts` | **8** | die Aufteilung in sechzehn Dateien erhält die id-Reihenfolge, jeder id wird weiter vergeben |
| `scripts/probe-menu-layout.tsx` | **11** | dieselben Eigenschaften am **echten DOM** aus `react-dom/server` |

### 🐛 Korrekturen

| # | Fehler | Lösung |
| --- | --- | --- |
| 1 | `CHÉO` durchgeschnitten | Chrome aus dem Fluss + die Szene reserviert ihren Platz |
| 2 | Krug zur Hälfte weg | dieselbe Ursache — **nicht** das SVG |
| 3 | GAME-Panel unten abgeschnitten | 732px Flex-Spalte in einer 720px-Box |
| 4 | Copyright-Zeile gekappt | Ticker fest 48px, eine Zeile |
| 5 | Scrollleiste über der Grafik | `scrollbar-width: none` |
| 6 | Panels überlappen auf dem Handy | unter 520px gestapelt |
| 7 | `CHÉO` höher als die Box | zusätzlich auf `20vh` begrenzt |
| 8 | Panelhöhe je nach Sprache | feste `--menu-row-h` + Hinweisbegrenzung |

→ Vollständige Details: [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · Vorherige: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)""",

"pt": """## 🆕 Novidades na v1.1.8

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

<img src="assets/layout-fix.svg" alt="Comparação de layout v1.1.7 vs v1.1.8 — cena de 250px cortada contra 720px com o chrome flutuante (animação SMIL)" width="100%" />

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

### 🧪 44 testes novos a fixar tudo

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

→ Detalhe completo: [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · Anterior: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)""",
}

if __name__ == "__main__":
    print("loaded", len(WHATSNEW), "languages:", ", ".join(sorted(WHATSNEW)))
