<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — 酢漬け壺大戦争" width="100%" />

# LỌ CHÉO — 酢漬け壺大戦争

### 🫙 ブラウザで100%動くベトナム漬物アーケード — 単一HTMLファイル・オフラインファースト
### 🌐 ゲーム内UIは3言語 — Tiếng Việt · English · 中文

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.2-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.2.md)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-インストールと実行)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-プロダクションビルド)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-言語の切り替え)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo プレイ画面 — 壺が斜めに突進し、漬物をキャッチし、カビを斬る" width="100%" />

</div>

---

## 🥒 プロジェクトについて

> Lọ Chéo — 酢漬け壺大戦争：ブラウザで100%動く漬物アーケード。単一の自己完結HTMLファイルに詰め込まれた、オフラインファースト設計 — CDNなし、サーバーなし。この陶壺は**斜め移動**しかできません。2つのキーを押して斜めに疾走し、加速し、カビ・ハエ・青虫を斬り刻み、陶壺が三つに割れる前に満杯にしましょう！**5モード · 14種の食材 · 12個の実績 · TOP 8 ランキング · ゲーム内3言語。**

これはベトナムの家庭的な漬物にインスパイアされた**ワン画面アクション**です。直線的なレベルも煩雑なメニューもありません — あるのは壺と、無限に降り注ぐ漬物と、燃えるような反射神経だけ。

## 🆕 v1.1.2 の新機能

- 🎮 **2つの新モード** — **60秒ダッシュ**（タイムアタック60秒・降ってくる量が増え・スコア×1.25・HUDの残り時間が最後の10秒は赤く点滅）と **ゴールドラッシュ**（黄金塩、黄金芥菜、黄金ニンニク、猛火チリ、氷の雫が出現率×2.6、バランスはクラシック同等）。合計 **5モード**。
- 🏆 **2つの新実績** — **60秒キング**（1回のランで3,000点）＆ **ゴールデンハウル**（1回のランで2つ満タン）。合計 **12実績**。
- 🔥 **コンボ12以上で炎上** — ストリークが12を超えると金/赤の炎オーラが壺に纏わりつく（純粋な演出のみ、バランスは不変）。
- 🚀 **ダブルクリック起動ランチャー** `scripts/`：`play-mac.command`（macOS）· `play-windows.bat`（Windows）· `play-linux.sh`（Linux）—— ダブルクリックで**フルカラーメニュー**が開き、Production（ビルド＆プレイ）か Dev（HMR・localhost:5173）を選ぶだけ。コマンド入力不要。詳しくは [scripts/README.md](scripts/README.md)。
- 🪪 **新しいライセンスアセット** `assets/license.svg`（AGPL-3.0 copyleft のアニメーション印章）＆ **5モードショーケース** `assets/modes.svg`（SMIL アニメーション）—— 直下に埋め込み済み。
- 📖 **README が10言語に**（🇹🇭 ไทย · 🇩🇪 Deutsch · 🇵🇹 Português を新規追加）。
- 🐛 **残存バグをすべて洗い出して修正**（[CHANGELOG](CHANGELOG.md) の `[1.1.2]` 参照）。`npm run check` がグリーン、**49件のユニットテスト**。

<img src="assets/modes.svg" alt="5つのモード — Classic · Zen · Inferno · 60秒ダッシュ · ゴールドラッシュ" width="100%" />

→ 詳細は [docs/releases/v1.1.2.md](docs/releases/v1.1.2.md)

## ✨ ハイライト

| グループ | 詳細 |
| --- | --- |
| 🎮 **5つのゲームモード** | **クラシック漬け**（バランス型）· **ZEN**（危険物なし、×0.5）· **インフェルノチリ**（速度+35%、×1.5）· **60秒ダッシュ**（タイムアタック60s、×1.25）· **ゴールドラッシュ**（黄金出現率×2.6） |
| 🌐 **ゲーム内 i18n** | Tiếng Việt · English · 中文 — `src/i18n/`（pureモジュール + Reactブリッジ）、補間対応の `t()`、`<html lang>` 同期、ロケール別数値表記（vi-VN / en-US / zh-CN） |
| 🕹️ **シグネチャ「斜め切り」** | 2キー/斜め軸を同時押し — 壺が加速・発光し、危険物を斬り刻む。ちらつき防止ヒステリシス付き専用スタミナバー |
| 🥬 **14種の食材** | 小茄子、唐辛子、ニンニク、生姜、塩、芥菜、**黄金芥菜**（素早く満タンに）· 黄金塩/黄金ニンニク · 鬼唐辛子 · アイス · カビ、ハエ、**青虫**（危険物） |
| 🧄 **黄金ニンニクシールド** | パワーアップ：最大**2層**のシールドでひび割れを吸収。壺の周りに回転する光輪 |
| 🏆 **12個の実績** | **ラン横断**の累計保存（localStorage）、ゲームオーバー画面に「新実績！」トースト |
| 🔊 **手作りオーディオ** | Web Audio API による11種のシンセ効果音（ファイル不使用）+ レベルに応じて変化する五音音階BGM、`M` でミュート |
| 💾 **TOP 8 ランキング** | ローカル保存、読み込み時に検証・正規化、名前は自動大文字化、新記録はハイライト |
| 🎨 **60fpsグラフィックス** | Canvas 2D、パーティクル上限460、DPR上限2、オフスクリーン事前描画の花柄床、星の瞬き + メニューオーロラ |
| 📴 **真のオフラインファースト** | 自己ホストフォント（latin + ベトナム語サブセット、woff2）、CDN・API不使用 — `dist/index.html` をダブルクリックするだけ |
| 🧪 **品質ゲート** | modes / achievements / storage / i18n をカバーする49件のユニットテスト（vitest）— `npm run check` がCIゲート |

<img src="assets/items.svg" alt="14種の食材 — キャッチすべき漬物、取るべき黄金パワー、避けるべき危険物" width="100%" />

## 🌐 言語の切り替え

Lọ Chéo は **3言語のUI** を内蔵 — リロード不要、プレイ中のランも失われません：

| 言語 | 場所 | 保存先 |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | **VI** ボタン（既定；未設定時はブラウザの言語に従う） | `locheo.lang.v1` |
| 🇬🇧 English | **EN** ボタン | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** ボタン | `locheo.lang.v1` |

- **メインメニュー**（右上）または**一時停止画面**（下部のコンパクト表示）から切り替え。
- ユーザー向け文字列はすべて `src/i18n/locales/{vi,en,zh}.ts` に集約 — Canvasエンジン、各画面、HUD、ポップアップ、ティッカー、ヒント。
- キーが足りない？ `t()` はベトナム語にフォールバック — 3ロケールのキー集合とプレースホルダの一致はテストで強制。

## 🕹️ 操作方法

| 操作 | キーボード | タッチ |
| --- | --- | --- |
| 移動 | `W` `A` `S` `D` または `← ↑ ↓ →` | 画面上のどこでもドラッグ（フローティングジョイスティック） |
| **斜め切り（CHÉO）** | **2キー同時押し**（例: `A`+`W`） | **45°の斜めドラッグ** — ジョイスティックリングが金色に |
| 壺叩き（衝撃波 + 吸い寄せ） | `Space` | 右下の赤い**叩き**ボタン |
| 一時停止 / 再開 | `P` または `Esc` | 右上の一時停止ボタン |
| 即座にリスタート | `R`（一時停止中/ゲームオーバー中も可） | 「もう一度漬ける」ボタン |
| 開始 / 確定 | `Enter` | **厨房へ**ボタン |
| ミュート / 解除 | `M` | 右上のスピーカーボタン |
| 言語切替 | —（VI/EN/中 ボタンを使用） | メニュー / 一時停止の VI/EN/中 ボタン |

## 🚀 インストールと実行

### ビルド不要で今すぐ遊ぶ

```bash
# すべてのリリースは単一の自己完結ファイルを同梱：
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### プロダクションビルド

```bash
npm install        # 依存関係をインストール（Node ≥ 20.19）
npm run build      # → dist/index.html（単一の自己完結ファイル）
```

> `vite-plugin-singlefile` が全 JS/CSS/フォント/画像を**1つの** `dist/index.html`（約655 KB、gzip約330 KB）にインライン化。サーバーもネットワークも不要です。

### 開発

```bash
npm run dev        # HMR付き開発サーバー（http://localhost:5173）
npm run preview    # プロダクションビルドをローカルで確認
npm run typecheck  # tsc --noEmit（strict、noUnusedLocals…）
npm run test       # vitest — 49件のユニットテスト（modes / achievements / storage / i18n）
npm run check      # typecheck + test + build（CI品質ゲート）
```

## 🗂️ プロジェクト構成

```
lo-cheoio/
├─ index.html              # エントリ、SEO/OGメタ（CDNなし）
├─ package.json            # lo-cheoio v1.1.2、dev/build/test/check スクリプト
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict；src + tests を含む
├─ assets/
│  ├─ banner.svg           # READMEバナー（SMILアニメーション）
│  ├─ demo.svg             # ゲームプレイシミュレーション（SMILアニメーション）
│  ├─ items.svg            # 14種の食材（SMILアニメーション）
│  ├─ modes.svg            # 5モード（SMILアニメーション）
│  └─ license.svg          # AGPL-3.0 copyleft 印章（SMILアニメーション）
├─ scripts/
│  ├─ play-mac.command     # macOS ランチャー — ダブルクリックでフルカラーメニュー
│  ├─ play-windows.bat     # Windows ランチャー — ダブルクリックでフルカラーメニュー
│  ├─ play-linux.sh        # Linux ランチャー — ダブルクリックでフルカラーメニュー
│  └─ README.md            # ターミナル初心者向けランチャーガイド
├─ docs/
│  ├─ DESCRIPTION.md       # 多言語のプロジェクト紹介文（vi/en/zh + SEO）
│  └─ releases/
│     ├─ v1.0.0.md         # 初回リリースノート
│     ├─ v1.1.0.md         # v1.1.0 リリースノート
│     ├─ v1.1.1.md         # v1.1.1 リリースノート
│     └─ v1.1.2.md         # 現在のリリースノート（1.1.2）
├─ README.md               # 🇻🇳 Tiếng Việt
├─ README.en.md            # 🇬🇧 English
├─ README.zh.md            # 🇨🇳 中文
├─ README.ja.md            # 🇯🇵 日本語（このファイル）
├─ README.ko.md            # 🇰🇷 한국어
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français
├─ README.th.md            # 🇹🇭 ไทย
├─ README.de.md            # 🇩🇪 Deutsch
├─ README.pt.md            # 🇵🇹 Português
├─ src/
│  ├─ main.tsx             # Reactルート、StrictMode
│  ├─ App.tsx              # フェーズマシン menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.2"（唯一の真実の源）
│  ├─ index.css            # tailwind v4 テーマ + 全アニメーション/グラデーション
│  ├─ assets/fonts/        # woff2サブセット（Be Vietnam Pro ×6、Bungee）
│  ├─ styles/fonts.css     # @font-face + unicode-range、100%オフライン
│  ├─ i18n/
│  │  ├─ i18n.ts           # pureモジュール：検出・永続化・t() + 補間
│  │  ├─ useI18n.ts        # Reactフック：useI18n/useLanguage
│  │  └─ locales/          # vi.ts（キー源）· en.ts · zh.ts
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # キャンバス + フローティングジョイスティック + キーボード
│  │  ├─ StartScreen.tsx   # メニュー：オーロラ、シマー、モード選択、実績
│  │  ├─ ModeSelector.tsx  # 5枚のモードカード（classic/zen/inferno/blitz/goldrush）
│  │  ├─ AchievementsPanel.tsx  # ロック/解除バッジウォール
│  │  ├─ GameOverScreen.tsx     # 壺が割れた！+ スコア + 新実績
│  │  ├─ PauseScreen.tsx        # 一時停止 + ラン統計
│  │  ├─ LanguageSwitcher.tsx   # 共通の VI / EN / 中 スイッチャー
│  │  └─ ui.tsx            # GameButton、Panel、Keycap、Stat、ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # シミュレーションとキャンバス描画のすべて（約2100行）
│  │  ├─ modes.ts          # ゲームモード + バランス計算（pure）
│  │  ├─ achievements.ts   # 12バッジ + pureチェッカー（pure）
│  │  ├─ storage.ts        # localStorage：TOP 8、進行度、実績
│  │  └─ audio.ts          # Web Audioシンセ：効果音 + 五音音階ミュージック
│  └─ utils/cn.ts          # clsx + tailwind-merge
└─ tests/                  # vitest — modes、achievements、storage、i18n
```

## 🧱 アーキテクチャとパフォーマンス

- **ゲームループ** `requestAnimationFrame`、デルタ時間を `1/20秒` にクランプ、`timeScale`（アイススローモー）を乗算し、キャッチ毎に数十msの **ヒットストップ** で「ズン」とした手応え。
- **Canvas HUD** を毎フレーム直描画。React は `phase` ごとに画面を描画するだけ — ホットループでReactは再レンダーされません。言語変更後、HUDは次のフレームから新しい辞書を参照します。
- **レイヤードi18n**：`src/i18n/i18n.ts` は pure モジュール（React非依存）、`useI18n` は `locheo:languagechange` イベントで再レンダーを橋渡しするだけ。`t()` は `{param}` 補間とベトナム語フォールバックをサポート。
- **花柄の床** はオフスクリーンキャンバスに一度だけ事前描画（ビネット + 光のプール付き）。星の瞬きと泡はリアルタイム計算で非常に軽量。
- **バジェット**：パーティクル ≤460、アイテム ≤70、ポップアップ ≤34、DPR ≤ 2。ヒットボックスによる衝突判定。床の漬物痕跡は自動で消えます。
- **localStorage** は入力検証・正規化付き — 1件の不正レコードがボード全体を壊すことはありません。ストレージがブロック（Safariプライベートモード）されてもメモリ上でプレイ継続。言語設定は `locheo.lang.v1` に分離。
- **モーション配慮**：`prefers-reduced-motion` でオーロラ/シマー/回転を無効化。背景の星と画面シェイクもメディアクエリに従います。

## ❓ よくある質問

**ネットワークなしで遊べますか？**
はい — 100%：`dist/index.html` を開くだけでフォントと音声を含めて完全に動作します。ネットワークリクエストは一切ありません。

**広告やテレメトリは？**
ありません。トラッキングもアナリティクスもなし — スコアがローカルのlocalStorageから出ることはありません。

**言語を変えると進行が消えますか？**
いいえ。スコア、実績、進行度、モード選択は `locheo.lang.v1` とは独立しています。

**TOP 8 ランキングはどこに保存されますか？**
`locheo.scores.v1`（スコア）、`locheo.progress.v1`（通算ラン/壺/撃破数）、`locheo.achievements.v1`（バッジ）— ストレージを消去すると失われます。壺を大切に！

**新しい言語を追加したい**
`src/i18n/locales/xx.ts` に `vi.ts` のキー集合をミラーしたファイルを追加し、`LANGUAGES` とテストを更新してPRを — [CONTRIBUTING.md](CONTRIBUTING.md) を参照。

**ターミナルが苦手？**
[`scripts/play-mac.command`](scripts/play-mac.command)（macOS）、[`scripts/play-windows.bat`](scripts/play-windows.bat)（Windows）、[`scripts/play-linux.sh`](scripts/play-linux.sh)（Linux）をダブルクリック —— カラーメニューが開き、`1` を選ぶとビルドしてすぐ遊べます。開発時は `2`。詳しくは [scripts/README.md](scripts/README.md)。

## 📦 リリースと変更履歴

| バージョン | 日付 | ノート |
| --- | --- | --- |
| [v1.1.2](docs/releases/v1.1.2.md) | 2026-11-12 | 5モード（60秒ダッシュ · ゴールドラッシュ）· 12実績 · コンボ炎 · ダブルクリックランチャー · 10言語README · 49テスト |
| [v1.1.1](docs/releases/v1.1.1.md) | 2026-11-12 | ゲーム内i18n VI/EN/ZH · 7言語README · バグ全掃除 · 49テスト |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3モード · 黄金ニンニクシールド · 青虫 · 黄金芥菜 · 10実績 · 自己ホストフォント |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | 初回リリース：完成したエンジン、11食材、壺叩き、コンボ×9 |

[CHANGELOG.md](CHANGELOG.md) も参照。

## 🤝 コントリビュート

1. リポジトリをForkし、`arena/<名前>` または `feat/<名前>` の命名規則でブランチを作成。
2. PRを出す前に `npm run check` をグリーンに（typecheck + 49テスト + build）。
3. 本当に必要な場合以外、ランタイム依存を追加しない — 理念：**1ファイル、ネットワーク不要、永遠に遊べる**。
4. PRには影響する画面/モードを明記し、ゲームプレイ変更時はクリップを添付してください。

## 📄 ライセンスと作者

<img src="assets/license.svg" alt="AGPL-3.0-only — copyleft ライセンス" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — [LICENSE](LICENSE) と [assets/license.svg](assets/license.svg) を参照。
- フォント：[Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) と [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1（自己ホストのwoff2サブセット）。
- ベトナムの食卓に並ぶすべての漬物壺に、乾杯。🫙🇻🇳
