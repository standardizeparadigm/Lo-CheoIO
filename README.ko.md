<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — 절임항아리 대격전" width="100%" />

# LỌ CHÉO — 절임항아리 대격전

### 🫙 브라우저에서 100% 동작하는 베트남식 절임 아케이드 — 단일 HTML 파일, 오프라인 우선
### 🌐 게임 내 7개 언어 — Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.7-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.7.md)
[![Tier](https://img.shields.io/badge/tier-PATCH%20%C2%B7%20violet-9d6bff.svg?style=for-the-badge)]
[![Tests](https://img.shields.io/badge/tests-235%20%C2%B7%2030%20files-2bb48c.svg?style=for-the-badge&logo=vitest&logoColor=white)]
[![CI](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml/badge.svg)](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-설치--실행)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-프로덕션-빌드)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO%20%C2%B7%20ES%20%C2%B7%20FR-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-언어-전환)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo 플레이 장면 — 항아리가 대각선으로 돌진하고, 절임 재료를 받고, 곰팡이를 자른다" width="100%" />

<img src="assets/languages.svg" alt="7개 언어 — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

<img src="assets/palette-ribbon.svg" alt="Lọ Chéo 팔레트——일곱 밴드가 번갈아 숨 쉼 (SMIL 애니메이션)" width="100%" />

</div>

---

## 🥒 프로젝트 소개

> Lọ Chéo — 절임항아리 대격전: 브라우저에서 100% 실행되는 절임 아케이드. 하나의 자기완결적 HTML 파일에 담긴 오프라인 우선 설계 — CDN 없음, 서버 없음. 이 도자기 항아리는 **대각선**으로만 움직일 수 있습니다. 두 개의 키를 눌러 대각선으로 질주하고, 가속하고, 곰팡이·파리·배추벌레를 잘게 썰며, 항아리가 세 조각 나기 전에 가득 채워보세요! **9가지 모드 · 14가지 재료 · 16개 업적 · TOP 8 랭킹 · 게임 내 7개 언어.**

베트남의 소박한 절임 음식에서 영감을 받은 **단일 화면 액션 아케이드**입니다. 선형 레벨도, 복잡한 메뉴도 없습니다 — 오직 항아리와 끝없이 쏟아지는 절임 재료, 그리고 불꽃 같은 반사신경만 있을 뿐.

<img src="assets/divider.svg" alt="" width="100%" />

## 🆕 v1.1.7 새로운 점

> 1.2.0 이전의 **마지막 패치**. 새 게임 모드는 없습니다——아직 불편했던 것들을 근본부터 고쳤습니다.

### 🌫️ 메뉴 배경의 뿌연 느낌 제거——원인부터 수정

플레이어 말이 맞았습니다: *「메뉴 뒤 배경이 아직 흐릿해요」*. 원인은 한 겹이 아니라 **네 겹이 겹쳐 증폭된 것**이었습니다:

| 레이어 | 이전 | 이후 | 이유 |
| --- | --- | --- | --- |
| 성운 `.nebula-*` | `blur(64px)`, 최대 `1.0` | **`blur(22px)`, 최대 `0.80`** | 64px는 46vw 광원 반지름의 절반 이상——경계가 사라지고 덩어리 전체가 안개가 됨 |
| 메뉴 비네트 | 인라인, **전체 화면**, `0.42 → 0.88 → 1.0` | **`.menu-vignette`**, 모서리만, `0.30 → 0.62` | 「화면 전체를 고르게 어둡게」에서 「모서리는 어둡고 가운데는 밝게」로 |
| CRT 프레임 | `inset 0 0 140px @ 0.9` | **`.app-vignette` 90px @ 0.55** | 140px는 작은 창에서 네 모서리를 거의 삼켰음 |
| 타일 바닥 | `opacity-45` | **`opacity-70`** | 45%에서는 바닥이 회색 잡음일 뿐, 알아볼 수 있는 디테일이 아니었음 |

`.menu-vignette`와 `.app-vignette`는 이제 JSX에 박힌 유틸리티가 아니라 **이름 있는 CSS 규칙**입니다——한 곳만 조정하면 되고, `prefers-reduced-motion`도 적용됩니다.

### 🏷️ 변경 이력 계층——계층마다 한 가지 색

| 계층 | 라벨 | 색 | 의미 | 예 |
| --- | --- | --- | --- | --- |
| `major` | **MAJOR** | 🩷 핑크 `#ff5fb0` | 큰 버전——새 시스템 | 1.0.0 |
| `minor` | **UPDATE** | 🟡 골드 `#f5a81c` | 업그레이드——새 콘텐츠 | 1.1.0 |
| `patch` | **PATCH** | 🟣 바이올렛 `#9d6bff` | 수정과 정리 | 1.1.1 → 1.1.7 |

계층은 `tierFor(version)`이 **SemVer에서 도출**하며 손으로 적지 않습니다——그래서 라벨이 옆에 찍힌 버전과 어긋날 수 없습니다. 패널에는 **필터**(전체 · MAJOR · UPDATE · PATCH, 계층별 개수 포함)가 추가되었습니다.

<img src="assets/release-tiers.svg" alt="세 계층 MAJOR/UPDATE/PATCH와 색상, 아홉 릴리스 타임라인 (SMIL 애니메이션)" width="100%" />

### 📖 여덟 개의 예전 릴리스: 한 줄에서 한 페이지로

아홉 중 여섯 개는 항목 배열이 **비어 있어** 패널이 한 줄 요약만 보여줄 수 있었습니다. v1.1.7에서 전부 다시 썼습니다:

- **베트남어 96개 + 영어 96개** 항목을 새로 쓰거나 확장
- 내용은 `docs/releases/v1.1.x.md` **그리고** 소스 코드 자체(9 모드, 16 업적)에서
- **릴리스 날짜 재정렬**: 10-26 · 10-29 · 10-31 · 11-02 · 11-04 · 11-06 · 11-08 · 11-10 · **11-12**——이틀 간격, 같은 날 릴리스 없음

### 🗂️ 프로젝트가 더 많은 폴더로

```
src/game/changelog/        ← 300줄 단일 파일을 대체
├── types.ts               ChangelogEntry · ReleaseTier · copyFor()
├── tiers.ts               tierFor() · TIER_ORDER · TIER_LABEL_KEY
├── entries/               릴리스마다 1파일 —— v1_0_0.ts … v1_1_7.ts
└── index.ts               CHANGELOG_ENTRIES + 5 헬퍼
```

앞으로 1.2.0을 추가하는 일은 **새 파일 하나**와 import 한 줄뿐입니다.

### 🐛 수정

| # | 버그 | 수정 |
| --- | --- | --- |
| 1 | 메뉴 배경이 뿌옇고 탁함 | 위의 네 가지 변경 |
| 2 | 타일 바닥이 보이지 않음 | `opacity-45` → `opacity-70` |
| 3 | 이력 라벨이 실제와 다름 (`kind` 수기) | `tierFor(version)`이 SemVer에서 도출 |
| 4 | 이력 설명이 빈약함 (6개 릴리스가 `items: []`) | 96개 항목 재작성 |
| 5 | 릴리스 날짜 중복·비논리 | 아홉 개 연속 날짜, 중복 없음 |
| 6 | 문서/SVG/런처가 버전보다 뒤처짐 | 전수 점검 → 1.1.7 |
| 7 | `check-readme-sync` 주석이 1.1.6 고정 | `package.json`에서 읽도록 변경 |

→ 전체 내용: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md) · 이전 버전: [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md)

<img src="assets/settings-sections.svg" alt="여섯 구역 설정(v1.1.6부터)——스위치, 레벨 바, 피커 (SMIL 애니메이션)" width="100%" />

<img src="assets/corner-menu.svg" alt="GAME(왼쪽 아래)과 INFO(오른쪽 아래) 패널 슬라이드 인 (SMIL 애니메이션)" width="100%" />

## ✨ 하이라이트

| 분류 | 세부 |
| --- | --- |
| 🎮 **9가지 게임 모드** | **클래식 절임**(균형형) · **ZEN**(위험물 없음, ×0.5) · **인페르노 칠리**(속도 +35%, ×1.5) · **60초 스프린트**(60초 타임어택, ×1.25) · **골드 러시**(황금 등장률 ×2.6) · **절임비 대폭풍**(~1.4배 밀도, ×0.75) · **얇은 도자기**(금 한 줄이면 종료, ×2.0) · **콤보 축제**(콤보 창 ×2, ×1.15) · **절임 대잔치**(밀도 ~×2, 항아리 ×2.5, ×0.6) |
| 🌐 **게임 내 i18n** | Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français — `src/i18n/`(pure 모듈 + React 브리지), 보간을 지원하는 `t()`, `<html lang>` 동기화, 로케일별 숫자 표기(vi-VN / en-US / zh-CN / ja-JP / ko-KR / es-ES / fr-FR) |
| 🕹️ **시그니처 “대각 베기(CHÉO)”** | 2개의 키/대각 축을 동시에 누르면 — 항아리가 가속·발광하며 위험물을 잘라냅니다. 깜빡임 방지 히스테리시스가 적용된 전용 스태미나 바 |
| 🥬 **14가지 재료** | 가지, 고추, 마늘, 생강, 소금, 겨자채, **황금 겨자채**(항아리를 빠르게 채움) · 황금소금/황금마늘 · 불타는 고추 · 얼음 · 곰팡이, 파리, **배추벌레**(위험물) |
| 🧄 **황금마늘 실드** | 파워업: 최대 **2겹** 실드를 쌓아 금이 가는 것을 흡수. 항아리 주위를 도는 회전 후광 |
| 🏆 **16개 업적** | **판을 넘나드는** 누적 저장(localStorage), 게임 오버 화면에 “새 업적!” 토스트 |
| 🔊 **수제 오디오** | Web Audio API로 합성한 효과음 11종(파일 없음) + 레벨에 따라 변주되는 오음계 배경음, `M`으로 음소거 |
| 💾 **TOP 8 명예의 전당** | 로컬 저장, 읽기 시 검증·정규화, 이름 자동 대문자화, 신기록 하이라이트 |
| 🎨 **60fps 그래픽** | Canvas 2D, 파티클 상한 460, DPR 상한 2, 오프스크린에 사전 렌더링된 꽃문양 바닥, 별 반짝임 + 메뉴 오로라 |
| 📴 **진짜 오프라인 우선** | 셀프호스팅 폰트(latin + 베트남어 서브셋, woff2), CDN·API 없음 — `dist/index.html`을 더블클릭하기만 하면 끝 |
| 🧪 **품질 게이트** | modes / achievements / storage / i18n / settings을 커버하는 222개 단위 테스트(vitest) — `npm run check`가 CI 게이트 |

<img src="assets/items.svg" alt="14가지 재료 — 받아야 할 절임, 주워야 할 황금 파워, 피해야 할 위험물" width="100%" />

## 🌐 언어 전환

Lọ Chéo는 게임 내에서 **7개 언어 UI**를 지원합니다 — 새로고침 없이 즉시 적용, 진행 중인 판을 잃지 않습니다:

<img src="assets/languages.svg" alt="7개 언어 — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

| 언어 | 위치 | 저장 위치 |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | **VI** 버튼 (기본값; 미설정 시 브라우저 언어를 따름) | `locheo.lang.v1` |
| 🇬🇧 English | **EN** 버튼 | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** 버튼 | `locheo.lang.v1` |
| 🇯🇵 日本語 | **日** 버튼 | `locheo.lang.v1` |
| 🇰🇷 한국어 | **한** 버튼 | `locheo.lang.v1` |
| 🇪🇸 Español | **ES** 버튼 | `locheo.lang.v1` |
| 🇫🇷 Français | **FR** 버튼 | `locheo.lang.v1` |

- 언어 전환은 **설정 → 언어**(국기 버튼 7개 그리드)에서 — 단일 진입점, 메뉴 위 플로팅 스위처는 사라졌습니다.
- 사용자에게 보이는 모든 문자열은 `src/i18n/locales/{vi,en,zh,ja,ko,es,fr}.ts`에 있습니다 — Canvas 엔진, 화면, HUD, 팝업, 티커, 힌트.
- 키가 없으면? `t()`가 베트남어로 폴백 — 7개 locale의 키 집합과 플레이스홀더 일치는 테스트가 강제합니다.

## 🕹️ 조작 방법

| 동작 | 키보드 | 터치 |
| --- | --- | --- |
| 이동 | `W` `A` `S` `D` 또는 `← ↑ ↓ →` | 화면 아무 곳이나 드래그(플로팅 조이스틱) |
| **대각 베기 (CHÉO)** | **2개의 키를 동시에** 누르기(예: `A`+`W`) | **45° 대각선 드래그** — 조이스틱 링이 금색으로 |
| 항아리 내리치기 (충격파 + 흡인) | `Space` | 오른쪽 하단 빨간 **SLAM** 버튼 |
| 일시정지 / 계속 | `P` 또는 `Esc` | 오른쪽 상단 일시정지 버튼 |
| 즉시 재시작 | `R` (일시정지/게임 오버 중에도 가능) | “다시 절이기” 버튼 |
| 시작 / 확인 | `Enter` | **부엌으로** 버튼 |
| 음소거 / 해제 | `M` | 오른쪽 상단 스피커 버튼 |
| 언어 전환 | — (VI/EN/中/日/한/ES/FR 버튼 사용) | 메뉴 / 일시정지의 VI/EN/中/日/한/ES/FR 버튼 |

## 🚀 설치 · 실행

### 빌드 없이 바로 플레이

```bash
# 모든 릴리스에는 단일 자기완결 파일이 포함됩니다:
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### 프로덕션 빌드

```bash
npm install        # 의존성 설치 (Node ≥ 20.19)
npm run build      # → dist/index.html (단일 자기완결 파일)
```

> `vite-plugin-singlefile`이 모든 JS/CSS/폰트/이미지를 **하나의** `dist/index.html`(약 700 KB, gzip 약 355 KB)에 인라인합니다. 서버도 네트워크도 필요 없습니다.

### 개발

```bash
npm run dev        # HMR이 적용된 개발 서버 (http://localhost:5173)
npm run preview    # 프로덕션 빌드를 로컬에서 확인
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 222개 단위 테스트 (modes / achievements / storage / i18n / settings)
npm run check      # typecheck + test + build (CI 품질 게이트)
```

## 🗂️ 프로젝트 구조

```
lo-cheoio/
├─ index.html              # 엔트리, SEO/OG 메타 (CDN 없음)
├─ package.json            # lo-cheoio v1.1.6, dev/build/test/check 스크립트
├─ .gitattributes          # *.bat/*.cmd → CRLF · posix → LF · binaries
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; src + tests 포함
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # README 배너 (SMIL 애니메이션)
│  ├─ demo.svg             # 게임플레이 시뮬레이션 (SMIL 애니메이션)
│  ├─ items.svg            # 14가지 재료 (SMIL 애니메이션)
│  ├─ modes.svg            # 9가지 모드 (SMIL 애니메이션)
│  ├─ languages.svg        # 7 in-game languages (SMIL animation)
│  ├─ new-modes.svg        # the 2 new v1.1.4 modes (SMIL animation)
│  ├─ corner-menu.svg     # corner GAME/INFO panels (SMIL animation)
│  ├─ settings-sections.svg # 6-section settings tour (SMIL, v1.1.6)
│  ├─ divider.svg          # sparkle divider (SMIL animation)
│  ├─ license.svg          # AGPL-3.0 copyleft 인장 (SMIL 애니메이션)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # macOS 런처 — 더블클릭, 풀 컬러 메뉴
│  ├─ play-windows.bat     # Windows 런처 — 더블클릭, 풀 컬러 메뉴
│  ├─ play-linux.sh        # Linux 런처 — 더블클릭, 풀 컬러 메뉴
│  └─ README.md            # 터미널 초보자를 위한 런처 가이드
├─ docs/
│  ├─ README.md            # 문서 색인 (v1.1.5)
│  ├─ DESCRIPTION.md       # 다국어 프로젝트 소개 (vi/en/zh + SEO)
│  ├─ design/              # menu-corners / save-format / settings-format 스펙
│  ├─ guides/              # engine 개요 · a11y · 성능 · storage keys · 릴리스 절차…
│  └─ releases/
│     ├─ v1.0.0.md         # 첫 릴리스 노트
│     ├─ v1.1.0.md         # v1.1.0 릴리스 노트
│     ├─ v1.1.1.md         # v1.1.1 릴리스 노트
│     ├─ v1.1.2.md         # v1.1.2
│     ├─ v1.1.3.md         # v1.1.3 release notes
│     ├─ v1.1.4.md         # release notes (1.1.4)
│     ├─ v1.1.5.md         # release notes (1.1.5)
│     └─ v1.1.6.md         # current release notes (1.1.6)
├─ README.md               # 🇻🇳 Tiếng Việt
├─ README.en.md            # 🇬🇧 English
├─ README.zh.md            # 🇨🇳 中文
├─ README.ja.md            # 🇯🇵 日本語
├─ README.ko.md            # 🇰🇷 한국어 (이 파일)
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français
├─ README.th.md            # 🇹🇭 ไทย
├─ README.de.md            # 🇩🇪 Deutsch
├─ README.pt.md            # 🇵🇹 Português
├─ src/
│  ├─ main.tsx             # React 루트, StrictMode
│  ├─ App.tsx              # 페이즈 머신 menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.6" (단일 진실 공급원)
│  ├─ index.css            # tailwind v4 테마 + 모든 애니메이션/그라디언트
│  ├─ assets/fonts/        # woff2 서브셋 (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, 100% 오프라인
│  ├─ i18n/
│  │  ├─ i18n.ts           # pure 모듈: 감지, 저장, t() + 보간
│  │  ├─ useI18n.ts        # React 훅: useI18n/useLanguage
│  │  └─ locales/          # vi.ts (키 소스) · en · zh · ja · ko · es · fr
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # 캔버스 + 플로팅 조이스틱 + 키보드 + 가시성 처리
│  │  ├─ StartScreen.tsx   # 메뉴: 히어로 + 다층 애니메이션 + 코너 패널
│  │  ├─ menu/              # 코너 GAME/INFO 패널 + 모달 + icons/
│  │  ├─ ModeSelector.tsx  # 9개 모드 카드 (classic/zen/inferno/blitz/goldrush/storm/hardcore · combo · feast)
│  │  ├─ AchievementsPanel.tsx  # 잠김/해제 배지 벽
│  │  ├─ GameOverScreen.tsx     # 항아리가 깨졌다! + 점수 + 새 업적
│  │  ├─ PauseScreen.tsx        # 일시정지 + 판 통계
│  │  ├─ settings/           # 6개 섹션 설정 모듈 + 공용 컨트롤 (v1.1.6)
│  │  └─ ui.tsx            # GameButton, Panel, Keycap, Stat, ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # 시뮬레이션과 캔버스 렌더링 전부 (약 2260줄)
│  │  ├─ modes.ts          # 게임 모드 + 밸런스 수치 (pure)
│  │  ├─ achievements.ts   # 배지 14개 + pure 체커 (pure)
│  │  ├─ storage.ts        # localStorage: TOP 8, 진행도, 업적
│  │  ├─ audio.ts          # Web Audio 신스: 효과음 + 오음계 음악
│  │  ├─ changelog.ts        # 게임 내 변경 이력 데이터
│  │  ├─ runSave.ts         # 중단한 판 저장
│  │  ├─ settings.ts        # 설정 스키마·기본값·정규화
│  │  ├─ settingsIO.ts      # 백업/복원 코덱 (v1.1.6)
│  │  ├─ settingsPresets.ts # 빠른 프리셋 4종 (v1.1.6)
│  │  └─ audioLevels.ts     # 순수 게인 계산 (v1.1.6)
│  └─ utils/
│     ├─ cn.ts             # clsx + tailwind-merge
│     └─ useFocusTrap.ts   # 모달 포커스 가둠 (v1.1.6)
└─ tests/                  # vitest — 30개 파일 · 222개 테스트(modes · achievements · storage · i18n · runSave · settings · presets · audio…)
```

## 🧱 아키텍처 & 성능
<img src="assets/architecture.svg" alt="Lọ Chéo v1.1.7 아키텍처——입력 → 엔진 → 상태 → 렌더와 서비스 계층 (SMIL 애니메이션)" width="100%" />


- **게임 루프** `requestAnimationFrame`, 델타 타임을 `1/20초`로 클램프, `timeScale`(얼음 슬로모) 곱셈, 캐치마다 수십 ms의 **히트 스톱**으로 타격감.
- **Canvas HUD**를 매 프레임 직접 그립니다. React는 `phase`에 따라 화면만 그립니다 — 핫 루프에서 React 재렌더 없음. 언어를 바꾸면 HUD는 다음 프레임부터 새 사전을 읽습니다.
- **계층형 i18n**: `src/i18n/i18n.ts`는 pure 모듈(React 무의존), `useI18n`은 `locheo:languagechange` 이벤트로 재렌더만 중계. `t()`는 `{param}` 보간과 베트남어 폴백을 지원.
- **꽃문양 바닥**은 오프스크린 캔버스에 한 번만 사전 렌더링(비네팅 + 빛 웅덩이 포함). 별 반짝임과 기포는 실시간 계산 — 매우 저렴.
- **예산**: 파티클 ≤460, 아이템 ≤70, 팝업 ≤34, DPR ≤ 2. 히트박스 충돌 스윕. 바닥에 떨어진 절임 자국은 저절로 사라집니다.
- **localStorage**는 입력 검증/정규화 — 잘못된 레코드 하나가 보드를 망가뜨리지 않습니다. 저장소 차단(Safari 시크릿 모드) 시에도 메모리에서 계속 플레이. 언어 설정은 `locheo.lang.v1`에 별도 저장.
- **모션 배려**: `prefers-reduced-motion`이면 오로라/시머/회전을 끕니다. 배경 별과 화면 흔들림도 미디어 쿼리를 따릅니다.

## ❓ 자주 묻는 질문

**Windows 런처가 베트남어에서 오류를 내나요?**
v1.1.4에서 수정: `play-windows.bat`은 CRLF + UTF-8 BOM과 `chcp 65001`, 베트남어 성조 완전 보존 — `'Ọ' is not recognized...` 오류는 완전히 해결되었습니다. 다른 에디터로 .bat를 편집할 경우 CRLF와 BOM을 유지하세요(`.gitattributes`가 자동 강제).


**네트워크 없이 플레이할 수 있나요?**
네 — 100%: `dist/index.html`을 열면 폰트와 오디오까지 전부 동작합니다. 네트워크 요청은 단 하나도 없습니다.

**광고나 추적이 있나요?**
없습니다. 트래킹도 애널리틱스도 없습니다 — 점수는 로컬 localStorage에만 있습니다.

**언어를 바꾸면 진행 상황이 사라지나요?**
아닙니다. 점수, 업적, 진행도, 모드 선택은 모두 `locheo.lang.v1`과 무관하게 유지됩니다.

**TOP 8 순위는 어디에 저장되나요?**
`locheo.scores.v1`(점수), `locheo.progress.v1`(누적 판수/항아리/잘라낸 수), `locheo.achievements.v1`(배지) — 저장소를 지우면 사라지니 항아리를 아껴주세요!

**새 언어를 추가하고 싶다면?**
`src/i18n/locales/xx.ts`에 `vi.ts`의 키 집합을 미러링한 파일을 추가하고, `LANGUAGES`와 테스트를 갱신한 뒤 PR을 — [CONTRIBUTING.md](CONTRIBUTING.md) 참조.

**터미널이 어려운가요?**
[`scripts/play-mac.command`](scripts/play-mac.command)(macOS), [`scripts/play-windows.bat`](scripts/play-windows.bat)(Windows), [`scripts/play-linux.sh`](scripts/play-linux.sh)(Linux)를 더블클릭하세요 — 컬러 메뉴가 열리고 `1`을 고르면 빌드 후 바로 플레이, `2`는 개발 서버입니다. 자세한 내용: [scripts/README.md](scripts/README.md).

## 📦 릴리스 & 변경 이력

| 버전 | Tier | 날짜 | 노트 |
| --- | --- | --- | --- |
| [v1.1.7](docs/releases/v1.1.7.md) | 🟣 **PATCH** | 2026-11-12 | **메뉴 배경 안개 제거**(네 겹 중첩: `blur 64→22px`, 전체 화면 비네트를 모서리만으로, CRT 프레임 140→90px, 바닥 45→70%) · **계층별 컬러 이력** · 예전 8개 버전에 **설명 96개** · 날짜 재정렬 · `src/game/changelog/` 분리 · README 10개 재작성 · **235 테스트** |
| [v1.1.6](docs/releases/v1.1.6.md) | 🟣 **PATCH** | 2026-11-10 | **6개 섹션 설정**(프리셋 · 사운드 · 화면 · 언어 · 백업 · 데이터) · 0–100 음량 · 흔들림 세기 · 그래픽 품질 · 탭 전환 자동 일시정지 · 언어를 설정으로 이동 · 프리셋 4종 · JSON 내보내기/가져오기 · 다층 애니메이션 메뉴 · 제작자 카드 그라데이션 · 모달 포커스 가둠 · 새로고침 후 음악 버그 수정 · **150개 테스트** |
| [v1.1.5](docs/releases/v1.1.5.md) | 🟣 **PATCH** | 2026-11-08 | **모서리 GAME/INFO 메뉴**（플레이 · 이어하기 · 모드 · 랭킹 · 업적 · 설정 / 제작자 · 변경 이력 · 종료）· **중단한 판 저장 & 이어하기**（`locheo.run.v1`）· 게임 내 설정（효과음/음악/흔들림/동작 줄이기）· 모달 단축키 누출 수정 · prefers-reduced-motion 전면 적용 · **113개 테스트** |
| [v1.1.4](docs/releases/v1.1.4.md) | 🟣 **PATCH** | 2026-11-06 | **9가지 모드**(콤보 축제 · 절임 대잔치 추가) · **16개 업적** · **7개 언어**(ES/FR 추가) · play-windows.bat 수정(CRLF+BOM) · 7개 언어 런처 · 61개 테스트 |
| [v1.1.3](docs/releases/v1.1.3.md) | 🟣 **PATCH** | 2026-11-04 | 7가지 모드(절임비 대폭풍 · 얇은 도자기) · 14개 업적 · 5개 언어 · favicon · 다국어 런처 · 55개 테스트 |
| [v1.1.2](docs/releases/v1.1.2.md) | 🟣 **PATCH** | 2026-11-02 | 5가지 모드(60초 스프린트 · 골드 러시) · 12개 업적 · 콤보 불꽃 · 더블클릭 런처 · 10개 언어 README · 테스트 49개 |
| [v1.1.1](docs/releases/v1.1.1.md) | 🟣 **PATCH** | 2026-10-31 | 게임 내 i18n VI/EN/ZH · 7개 언어 README · 버그 전수 수정 · 테스트 45개 |
| [v1.1.0](docs/releases/v1.1.0.md) | 🟡 **UPDATE** | 2026-10-29 | 3가지 모드 · 황금마늘 실드 · 배추벌레 · 황금 겨자채 · 10 업적 · 셀프호스팅 폰트 |
| [v1.0.0](docs/releases/v1.0.0.md) | 🩷 **MAJOR** | 2026-10-26 | 첫 릴리스: 완성된 엔진, 11가지 재료, 항아리 내리치기, 콤보 ×9 |

[CHANGELOG.md](CHANGELOG.md)도 참고하세요.

## 🗺️ 로드맵 (초안 — 피드백에 따라 바뀔 수 있음)

| 마일스톤 | 시기 | 아이디어 |
| --- | --- | --- |
| **v1.2.0** | 2026 Q1 | 모드별 프로시저럴 배경음악 · CI의 시각 회귀 테스트 (Playwright) · 폰트 서브셋 심화로 번들 축소 |
| **v1.3.0** | 2026 Q1–Q2 | 10번째 모드 (후보: **파리 폭풍** — 파리만 등장, 베어내며 생존) · 일일 챌린지용 시드 모드 |
| **v1.4.0** | 2026 Q2 | **opt-in** 온라인 리더보드 (serverless, 암호화) — 오프라인 우선은 그대로 기본값 |
| Backlog | — | 최고 기록 고스트 리플레이 · 포토 모드 (HUD 숨기고 PNG 내보내기) · 태국어(ไทย) 로캘 검토 중 |

*로드맵은 약속이 아닙니다 — 우선순위는 항상: 안정성 → 더 재미있게 → 더 많은 콘텐츠.*

## 📚 더 읽기 & 개발 문서

설계 노트와 더 깊은 기술 문서:

| Doc | What it covers |
| --- | --- |
| [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md) | 릴리스 v1.1.6 — 6개 섹션 설정, 프리셋, 백업, 다층 메뉴 |
| [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md) | 릴리스 v1.1.5 — 모서리 메뉴, 저장/이어하기, 설정, 수정 |
| [docs/design/menu-corners.md](docs/design/menu-corners.md) | 모서리 GAME/INFO 메뉴 설계 — 원칙, a11y, 반응형 |
| [docs/design/save-format.md](docs/design/save-format.md) | Spec `locheo.run.v1` — 중단된 판 스냅샷 (schema + 라이프사이클) |
| [docs/design/settings-format.md](docs/design/settings-format.md) | Spec `locheo.settings.v1` — 게임 설정 (schema + wiring) |
| [docs/guides/troubleshooting.md](docs/guides/troubleshooting.md) | 자주 묻는 문제 — 검은 화면 · 소리 · 이어하기 · 런처 |
| [scripts/smoke-ssr.tsx](scripts/smoke-ssr.tsx) | 헤드리스 렌더 스모크 테스트 (전체 메뉴/모달) |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | CI: npm ci → npm run check (Node 22) |

## 🤝 기여하기

1. 리포지토리를 Fork하고 `arena/<이름>` 또는 `feat/<이름>` 규칙으로 브랜치를 만듭니다.
2. PR 전에 `npm run check`가 그린이어야 합니다 (typecheck + 테스트 113개 + build).
3. 정말 필요한 경우가 아니면 런타임 의존성을 추가하지 않습니다 — 철학: **단일 파일, 네트워크 없이, 영원히 플레이 가능**.
4. PR에 영향받는 화면/모드를 명시하고, 게임플레이 변경 시 클립을 첨부해 주세요.

## 📄 라이선스 & 만든 이

<img src="assets/license.svg" alt="AGPL-3.0-only — copyleft 라이선스" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — [LICENSE](LICENSE) 및 [assets/license.svg](assets/license.svg) 참조.
- 폰트: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (셀프호스팅 woff2 서브셋).
- 베트남 밥상의 모든 절임 항아리에 건배. 🫙🇻🇳
