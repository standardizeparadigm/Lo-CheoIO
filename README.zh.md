<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — 酸菜腌罐大乱斗" width="100%" />

# LỌ CHÉO — 酸菜腌罐大乱斗

### 🫙 100% 在浏览器中运行的越式腌大戏 — 单个 HTML 文件，离线优先
### 🌐 游戏内置 7 种语言 — Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.7-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.7.md)
[![Tier](https://img.shields.io/badge/tier-PATCH%20%C2%B7%20violet-9d6bff.svg?style=for-the-badge)]
[![Tests](https://img.shields.io/badge/tests-241%20%C2%B7%2031%20files-2bb48c.svg?style=for-the-badge&logo=vitest&logoColor=white)]
[![CI](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml/badge.svg)](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-安装与运行)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-生产构建)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO%20%C2%B7%20ES%20%C2%B7%20FR-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-切换语言)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo 实战演示 — 陶罐斜冲、接住腌菜、斩碎霉菌" width="100%" />

<img src="assets/languages.svg" alt="7 种语言 — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

<img src="assets/palette-ribbon.svg" alt="Lọ Chéo 调色板——七条色带轮流呼吸（SMIL 动画）" width="100%" />

</div>

---

## 🥒 关于本项目

> Lọ Chéo — 酸菜腌罐大乱斗：100% 在浏览器中运行的腌菜街机，打包进单个自包含 HTML 文件，离线优先 —— 无 CDN，无服务器。这只陶罐只懂走**斜线**：按住两个方向键斜冲、加速、斩碎霉菌、苍蝇与菜虫，赶在陶罐裂成三瓣之前把它装满！**9 种模式 · 14 种食材 · 16 项成就 · TOP 8 名人堂 · 游戏内 7 种语言。**

这是一款致敬越南家常腌菜的**单屏动作游戏**。没有线性关卡，没有繁杂菜单 —— 只有陶罐、无尽的腌菜雨，和你燃烧的反应速度。

<img src="assets/divider.svg" alt="" width="100%" />

## 🆕 v1.1.7 新特性

> 1.2.0 之前的**最后一个补丁版本**。没有新增游戏模式——只把还让人不舒服的地方彻底修好。

### 🌫️ 菜单背景不再模糊——从根源修复

玩家说得对：*「菜单后面的背景还是糊的」*。原因不是一层，而是**四层叠加互相放大**：

| 图层 | 之前 | 之后 | 原因 |
| --- | --- | --- | --- |
| 星云 `.nebula-*` | `blur(64px)`，峰值 `1.0` | **`blur(22px)`，峰值 `0.80`** | 64px 超过 46vw 光斑半径的一半——边缘消失了，整块变成雾 |
| 菜单暗角 | 行内样式，**铺满全屏**，`0.42 → 0.88 → 1.0` | **`.menu-vignette`**，只压暗角落，`0.30 → 0.62` | 从「整幅均匀压暗」改成「角落暗、中间亮」 |
| CRT 边框 | `inset 0 0 140px @ 0.9` | **`.app-vignette` 90px @ 0.55** | 140px 在小窗口上几乎吃掉四个角 |
| 地面砖纹 | `opacity-45` | **`opacity-70`** | 45% 时地面只是一片灰噪点，不再是可辨识的细节 |

`.menu-vignette` 与 `.app-vignette` 现在是**有名字的 CSS 规则**，不再是埋在 JSX 里的工具类——只需调一处，而且 `prefers-reduced-motion` 也能作用到它们。

### 🏷️ 更新日志分层——每层一种颜色

| 层级 | 标签 | 颜色 | 含义 | 示例 |
| --- | --- | --- | --- | --- |
| `major` | **MAJOR** | 🩷 粉色 `#ff5fb0` | 大版本——新增系统 | 1.0.0 |
| `minor` | **UPDATE** | 🟡 金色 `#f5a81c` | 升级——新增内容 | 1.1.0 |
| `patch` | **PATCH** | 🟣 紫色 `#9d6bff` | 修复与清理 | 1.1.1 → 1.1.7 |

层级由 `tierFor(version)` **从 SemVer 推导**，绝不手写——因此标签永远不会和它旁边的版本号冲突。面板新增**筛选**：全部 · MAJOR · UPDATE · PATCH，并显示各层版本数。

<img src="assets/release-tiers.svg" alt="三个层级 MAJOR/UPDATE/PATCH 及其配色，以及九个版本的发布时间轴（SMIL 动画）" width="100%" />

### 📖 八个旧版本：从一行变成一页

九个版本里有六个的条目数组是**空的**——面板只能显示一行摘要。v1.1.7 全部重写：

- **96 条越南语条目 + 96 条英语条目**，新写或扩写
- 内容取自 `docs/releases/v1.1.x.md` **以及**源码本身（9 个模式、16 个成就）
- **发布日期重新排列**：10-26 · 10-29 · 10-31 · 11-02 · 11-04 · 11-06 · 11-08 · 11-10 · **11-12**——两天一版，没有任何两个版本同一天

### 🗂️ 项目拆成更多目录

```
src/game/changelog/        ← 取代原来的 300 行单文件
├── types.ts               ChangelogEntry · ReleaseTier · copyFor()
├── tiers.ts               tierFor() · TIER_ORDER · TIER_LABEL_KEY
├── entries/               每个版本一个文件 —— v1_0_0.ts … v1_1_7.ts
└── index.ts               CHANGELOG_ENTRIES + 5 个辅助函数
```

以后加 1.2.0 只需**一个新文件**加一行 import。

### 🐛 修复

| # | 问题 | 修复 |
| --- | --- | --- |
| 1 | 菜单背景模糊发闷 | 上面四处修改 |
| 2 | 地面砖纹看不见 | `opacity-45` → `opacity-70` |
| 3 | 日志标签名不副实（`kind` 手写） | `tierFor(version)` 从 SemVer 推导 |
| 4 | 日志描述太单薄（6 个版本 `items: []`） | 重写 96 条 |
| 5 | 发布日期重复且不合理 | 九个连续日期，无重复 |
| 6 | 文档/SVG/启动器版本滞后 | 全量扫描 → 1.1.7 |
| 7 | `check-readme-sync` 注释写死 1.1.6 | 改为读取 `package.json` |

→ 完整详情：[docs/releases/v1.1.7.md](docs/releases/v1.1.7.md) · 上一版：[docs/releases/v1.1.6.md](docs/releases/v1.1.6.md)

<img src="assets/settings-sections.svg" alt="六段设置（自 v1.1.6）——开关、等级条与选择器（SMIL 动画）" width="100%" />

<img src="assets/corner-menu.svg" alt="GAME（左下）与 INFO（右下）面板滑入（SMIL 动画）" width="100%" />

## ✨ 亮点功能

| 分类 | 详情 |
| --- | --- |
| 🎮 **9 种模式** | **经典腌制**（均衡）· **清心禅意**（无危险物，×0.5）· **辣椒火焰**（速度 +35%，×1.5）· **60秒冲刺**（限时 60s，×1.25）· **黄金丰收**（黄金掉落 ×2.6）· **腌菜暴雨**（密度 ~1.4×，×0.75）· **薄瓷**（一裂即碎，×2.0） · **连击节庆**（连击窗口 ×2，×1.15）· **腌菜盛宴**（密度 ~×2，满罐 ×2.5，×0.6） |
| 🌐 **游戏内 i18n** | Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français —— `src/i18n/`（纯模块 + React 桥接），`t()` 支持插值，同步 `<html lang>`，数字按 locale 分组（vi-VN / en-US / zh-CN / ja-JP / ko-KR / es-ES / fr-FR） |
| 🕹️ **专属“斜切”机制** | 同时按住两个方向键/斜向轴 —— 陶罐加速、发光并斩碎危险物。配有独立耐力条与防闪烁回滞 |
| 🥬 **14 种食材** | 小茄子、辣椒、大蒜、生姜、盐、芥菜、**金卷心菜**（快速装罐）· 黄金盐/黄金蒜 · 魔鬼辣椒 · 寒冰 · 霉菌、苍蝇、**菜虫**（危险物） |
| 🧄 **黄金蒜护盾** | 道具：最多叠加 **2 层护盾**吸收裂痕；陶罐周围环绕旋转光环 |
| 🏆 **16 项成就** | **跨局累计**存档（localStorage），结算画面弹出“新成就！” |
| 🔊 **手工音效** | 11 种 Web Audio API 合成音效（零音频文件）+ 随等级变调的五声音阶背景乐，`M` 键静音 |
| 💾 **TOP 8 名人堂** | 本地存档，读取时校验并归一化，姓名自动大写，新纪录高亮 |
| 🎨 **60fps 画质** | Canvas 2D，粒子上限 460，DPR 上限 2，离屏预渲染花砖地板，星光闪烁 + 菜单极光 |
| 📴 **真·离线优先** | 自托管字体（latin + 越南文子集，woff2），无 CDN、无接口 —— 双击 `dist/index.html` 即玩 |
| 🧪 **质量保障** | 222 项单元测试（vitest）覆盖 modes / achievements / storage / i18n / settings —— `npm run check` 为 CI 关卡 |

<img src="assets/items.svg" alt="14 种食材 — 要接的腌菜、要捡的黄金道具、要躲的危险物" width="100%" />

## 🌐 切换语言

Lọ Chéo 内置 **7 种界面语言**，即时生效 —— 无需刷新、不中断对局：

<img src="assets/languages.svg" alt="7 种语言 — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

| 语言 | 入口 | 存储键 |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | **VI** 按钮（默认；未设置时跟随浏览器语言） | `locheo.lang.v1` |
| 🇬🇧 English | **EN** 按钮 | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** 按钮 | `locheo.lang.v1` |
| 🇯🇵 日本語 | **日** 按钮 | `locheo.lang.v1` |
| 🇰🇷 한국어 | **한** 按钮 | `locheo.lang.v1` |
| 🇪🇸 Español | **ES** 按钮 | `locheo.lang.v1` |
| 🇫🇷 Français | **FR** 按钮 | `locheo.lang.v1` |

- 在**设置 → 语言**中切换（7 个国旗按钮的网格）—— 唯一入口，菜单上不再有浮动切换器。
- 所有用户可见文案都在 `src/i18n/locales/{vi,en,zh,ja,ko,es,fr}.ts` —— 画布引擎、各界面、HUD、弹字、跑马灯、提示。
- 缺少 key？`t()` 自动回退到越南语 —— 七套 locale 的 key 集合与占位符一致性由测试强制保证。

## 🕹️ 操作方式

| 操作 | 键盘 | 触屏 |
| --- | --- | --- |
| 移动 | `W` `A` `S` `D` 或 `← ↑ ↓ →` | 任意位置拖动（浮动摇杆） |
| **斜切（CHÉO）** | 同时按住**两个键**（如 `A`+`W`） | **45° 斜向拖动** —— 摇杆圆环变金色 |
| 拍罐（冲击波 + 吸附腌菜） | `Space` | 右下角红色**拍罐**按钮 |
| 暂停 / 继续 | `P` 或 `Esc` | 右上角暂停按钮 |
| 立即重开 | `R`（暂停/结算时也可） | “再腌一坛”按钮 |
| 开始 / 确认 | `Enter` | **进厨房**按钮 |
| 静音 / 取消静音 | `M` | 右上角扬声器按钮 |
| 切换语言 | —（使用 VI/EN/中/日/한/ES/FR 按钮） | 菜单 / 暂停界面的 VI/EN/中/日/한/ES/FR 按钮 |

## 🚀 安装与运行

### 免构建直接玩

```bash
# 每个发行版都附带单个自包含文件：
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### 生产构建

```bash
npm install        # 安装依赖（Node ≥ 20.19）
npm run build      # → dist/index.html（单个自包含文件）
```

> `vite-plugin-singlefile` 会把所有 JS/CSS/字体/图片内联进**一个** `dist/index.html`（约 700 KB，gzip 约 355 KB）。不需要服务器，不需要网络。

### 开发

```bash
npm run dev        # 带 HMR 的开发服务器（http://localhost:5173）
npm run preview    # 本地预览生产构建
npm run typecheck  # tsc --noEmit（strict，noUnusedLocals…）
npm run test       # vitest — 222 项单元测试（modes / achievements / storage / i18n / settings）
npm run check      # typecheck + test + build（CI 质量关卡）
```

## 🗂️ 项目结构

```
lo-cheoio/
├─ index.html              # 入口，SEO/OG 元信息（无 CDN）
├─ package.json            # lo-cheoio v1.1.7，dev/build/test/check 脚本
├─ .gitattributes          # *.bat/*.cmd → CRLF · posix → LF · binaries
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict；包含 src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # README 横幅（SMIL 动画）
│  ├─ demo.svg             # 实战演示（SMIL 动画）
│  ├─ items.svg            # 14 种食材（SMIL 动画）
│  ├─ modes.svg            # 9 种模式（SMIL 动画）
│  ├─ languages.svg        # 7 in-game languages (SMIL animation)
│  ├─ new-modes.svg        # the 2 new v1.1.4 modes (SMIL animation)
│  ├─ corner-menu.svg     # corner GAME/INFO panels (SMIL animation, v1.1.5)
│  ├─ settings-sections.svg # 6-section settings tour (SMIL, v1.1.6)
│  ├─ divider.svg          # sparkle divider (SMIL animation)
│  ├─ license.svg          # 动态 AGPL-3.0 copyleft 印章（SMIL 动画）
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # macOS 启动器 — 双击弹出全彩菜单
│  ├─ play-windows.bat     # Windows 启动器 — 双击弹出全彩菜单
│  ├─ play-linux.sh        # Linux 启动器 — 双击弹出全彩菜单
│  └─ README.md            # 给不熟悉终端用户的启动器指南
├─ docs/
│  ├─ README.md            # 文档目录（v1.1.5）
│  ├─ DESCRIPTION.md       # 多语言项目简介（vi/en/zh + SEO）
│  ├─ design/              # menu-corners / save-format / settings-format 规范
│  ├─ guides/              # engine 概览 · a11y · 性能 · storage keys · 发布流程…
│  └─ releases/
│     ├─ v1.0.0.md         # 首发版本说明
│     ├─ v1.1.0.md         # v1.1.0 版本说明
│     ├─ v1.1.1.md         # v1.1.1 版本说明
│     ├─ v1.1.2.md         # v1.1.2
│     ├─ v1.1.3.md         # v1.1.3 release notes
│     ├─ v1.1.4.md         # release notes (1.1.4)
│     ├─ v1.1.5.md         # release notes (1.1.5)
│     ├─ v1.1.6.md         # release notes (1.1.6)
│     └─ v1.1.7.md         # current release notes (1.1.7)
├─ README.md               # 🇻🇳 Tiếng Việt
├─ README.en.md            # 🇬🇧 English
├─ README.zh.md            # 🇨🇳 中文（本文件）
├─ README.ja.md            # 🇯🇵 日本語
├─ README.ko.md            # 🇰🇷 한국어
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français
├─ README.th.md            # 🇹🇭 ไทย
├─ README.de.md            # 🇩🇪 Deutsch
├─ README.pt.md            # 🇵🇹 Português
├─ src/
│  ├─ main.tsx             # React 入口，StrictMode
│  ├─ App.tsx              # 阶段状态机 menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.7"（唯一版本来源）
│  ├─ index.css            # tailwind v4 主题 + 全部动画/渐变
│  ├─ assets/fonts/        # woff2 子集（Be Vietnam Pro ×6，Bungee）
│  ├─ styles/fonts.css     # @font-face + unicode-range，100% 离线
│  ├─ i18n/
│  │  ├─ i18n.ts           # 纯模块：检测、持久化、t() + 插值
│  │  ├─ useI18n.ts        # React hook：useI18n/useLanguage
│  │  └─ locales/          # vi.ts（key 源）· en · zh · ja · ko · es · fr
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # 画布 + 浮动摇杆 + 键盘 + 可见性处理
│  │  ├─ StartScreen.tsx   # 菜单：主视觉 + 多层动效 + 角落面板
│  │  ├─ menu/              # 角落 GAME/INFO 面板 + 弹窗 + icons/
│  │  ├─ ModeSelector.tsx  # 9 张模式卡（classic/zen/inferno/blitz/goldrush/storm/hardcore · combo · feast）
│  │  ├─ AchievementsPanel.tsx  # 已锁/已解锁徽章墙
│  │  ├─ GameOverScreen.tsx     # 罐子碎了！+ 分数 + 新成就
│  │  ├─ PauseScreen.tsx        # 暂停 + 本局数据
│  │  ├─ settings/           # 六个分区设置模块 + 控件（v1.1.6）
│  │  └─ ui.tsx            # GameButton、Panel、Keycap、Stat、ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # 全部模拟与画布渲染（约 2100 行）
│  │  ├─ modes.ts          # 游戏模式 + 平衡公式（纯函数）
│  │  ├─ achievements.ts   # 16 枚徽章 + 纯校验器（纯函数）
│  │  ├─ storage.ts        # localStorage：TOP 8、进度、成就
│  │  ├─ audio.ts          # Web Audio 合成：音效 + 五声音阶音乐
│  │  ├─ changelog.ts        # 游戏内更新日志数据
│  │  ├─ runSave.ts         # 中断对局持久化
│  │  ├─ settings.ts        # 设置 schema、默认值、归一化
│  │  ├─ settingsIO.ts      # 备份/恢复编解码（v1.1.6）
│  │  ├─ settingsPresets.ts # 四个快速预设（v1.1.6）
│  │  └─ audioLevels.ts     # 纯音频增益计算（v1.1.6）
│  └─ utils/
│     ├─ cn.ts             # clsx + tailwind-merge
│     └─ useFocusTrap.ts   # 弹窗焦点捕获（v1.1.6）
└─ tests/                  # vitest — 31 个文件 · 222 项测试（modes · achievements · storage · i18n · runSave · settings · presets · audio…）
```

## 🧱 架构与性能
<img src="assets/architecture.svg" alt="Lọ Chéo v1.1.7 架构——输入 → 引擎 → 状态 → 渲染，另含服务层（SMIL 动画）" width="100%" />


- **游戏主循环** `requestAnimationFrame`，增量时间钳制到 `1/20s`，乘以 `timeScale`（寒冰慢动作），每次接住还有几十毫秒 **hit-stop** 停顿带来打击感。
- **画布 HUD** 每帧直绘；React 只按 `phase` 渲染界面 —— 热循环中不重渲染 React；切换语言后 HUD 下一帧即读取新词典。
- **分层 i18n**：`src/i18n/i18n.ts` 为纯模块（不依赖 React），`useI18n` 仅通过 `locheo:languagechange` 事件桥接重渲染；`t()` 支持 `{param}` 插值并回退到越南语。
- **花砖地板** 一次离屏预渲染（含暗角与光池），星光闪烁与气泡实时计算 —— 极其廉价。
- **预算**：≤460 粒子，≤70 物品，≤34 弹字，DPR ≤ 2；按 hitbox 扫描碰撞；落地的腌菜印记会自行消失。
- **localStorage** 输入校验/归一化 —— 一条脏记录不会毁掉整个榜；存储被禁用（Safari 无痕模式）时照常在内存中游玩；语言选择单独存放在 `locheo.lang.v1`。
- **动效关怀**：`prefers-reduced-motion` 关闭极光/流光/旋转；背景星光与屏幕震动同样遵循媒体查询。

## ❓ 常见问题

**Windows 启动器遇到越南文报错？**
v1.1.4 已修复：`play-windows.bat` 为 CRLF + UTF-8 BOM、`chcp 65001`，越南语声调完整 —— `'Ọ' is not recognized...` 错误彻底消失。若用其他编辑器修改 .bat，请保持 CRLF 与 BOM（`.gitattributes` 自动强制）。


**没有网络可以玩吗？**
可以 —— 100% 可以：打开 `dist/index.html` 即可完整游玩，包括字体与音效，没有任何网络请求。

**有广告或追踪吗？**
没有。无追踪、无分析 —— 你的分数只存在本机 localStorage 里。

**切换语言会丢档吗？**
不会。分数、成就、进度、模式选择都与 `locheo.lang.v1` 相互独立。

**TOP 8 名人堂存在哪里？**
`locheo.scores.v1`（分数）、`locheo.progress.v1`（累计局数/罐数/斩碎数）、`locheo.achievements.v1`（徽章）—— 清空存储就会丢失，所以请珍惜这只陶罐！

**想新增一种语言？**
添加 `src/i18n/locales/xx.ts` 并镜像 `vi.ts` 的 key 集合，更新 `LANGUAGES` 与测试，然后提交 PR —— 详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

**不会敲命令？**
双击 [`scripts/play-mac.command`](scripts/play-mac.command)（macOS）、[`scripts/play-windows.bat`](scripts/play-windows.bat)（Windows）或 [`scripts/play-linux.sh`](scripts/play-linux.sh)（Linux）—— 全彩菜单会弹出；选 `1` 即构建并立刻游玩，选 `2` 进入开发模式。详见 [scripts/README.md](scripts/README.md)。

## 📦 发行版与更新日志

| 版本 | Tier | 日期 | 说明 |
| --- | --- | --- | --- |
| [v1.1.7](docs/releases/v1.1.7.md) | 🟣 **PATCH** | 2026-11-12 | **菜单背景去雾**（四层叠加：`blur 64→22px`、角落暗角替换全屏、CRT 边框 140→90px、地面 45→70%）· **分层彩色日志** · 8 个旧版 **96 条新描述** · 日期重排 · `src/game/changelog/` 拆分 · 10 个 README 重做 · **241 测试** |
| [v1.1.6](docs/releases/v1.1.6.md) | 🟣 **PATCH** | 2026-11-10 | **六分区设置**（预设 · 音频 · 画面 · 语言 · 备份 · 数据）· 0–100 音量 · 震动强度 · 画质 · 切标签自动暂停 · 语言移入设置 · 4 个预设 · JSON 导入导出 · 多层动态菜单 · 作者卡片渐变流动 · 弹窗焦点捕获 · 修复刷新后音乐 · **150 项测试** |
| [v1.1.5](docs/releases/v1.1.5.md) | 🟣 **PATCH** | 2026-11-08 | **双角 GAME/INFO 菜单**（开始 · 继续 · 模式 · 排行榜 · 成就 · 设置 / 关于 · 更新日志 · 退出）· **保存并恢复未完成对局**（`locheo.run.v1`）· 游戏内设置（音效/音乐/震动/减少动态）· 修复快捷键穿透弹窗 · prefers-reduced-motion 全覆盖 · **113 项测试** |
| [v1.1.4](docs/releases/v1.1.4.md) | 🟣 **PATCH** | 2026-11-06 | **9 种模式**（新增连击节庆 · 腌菜盛宴）· **16 项成就** · **7 种语言**（新增 ES/FR）· 修复 play-windows.bat（CRLF+BOM）· 7 语言启动器 · 61 项测试 |
| [v1.1.3](docs/releases/v1.1.3.md) | 🟣 **PATCH** | 2026-11-04 | 7 种模式（新增腌菜暴雨 · 薄瓷）· 14 项成就 · 5 种语言 · favicon · 多语言启动器 · 55 项测试 |
| [v1.1.2](docs/releases/v1.1.2.md) | 🟣 **PATCH** | 2026-11-02 | 5 种模式（60秒冲刺 · 黄金丰收）· 12 项成就 · 连击火焰 · 双击启动器 · README 10 种语言 · 49 项测试 |
| [v1.1.1](docs/releases/v1.1.1.md) | 🟣 **PATCH** | 2026-10-31 | 游戏内 i18n VI/EN/ZH · README 7 种语言 · 全面修 BUG · 45 项测试 |
| [v1.1.0](docs/releases/v1.1.0.md) | 🟡 **UPDATE** | 2026-10-29 | 3 种模式 · 黄金蒜护盾 · 菜虫 · 金卷心菜 · 10 项成就 · 自托管字体 |
| [v1.0.0](docs/releases/v1.0.0.md) | 🩷 **MAJOR** | 2026-10-26 | 首发：完整引擎，11 种食材，拍罐冲击波，×9 连击 |

另见 [CHANGELOG.md](CHANGELOG.md)。

## 🗺️ 路线图（草案 — 可能随反馈调整）

| 里程碑 | 预期 | 创意 |
| --- | --- | --- |
| **v1.2.0** | 2026 Q1 | 每种玩法的程序化配乐 · CI 中的视觉回归测试（Playwright）· 更深入的字体子集化以压缩体积 |
| **v1.3.0** | 2026 Q1–Q2 | 第 10 个玩法（候选：**蜂群风暴** —— 全是苍蝇，靠斩杀求生）· 每日挑战的 seed 玩法 |
| **v1.4.0** | 2026 Q2 | **可选（opt-in）** 在线排行榜（serverless，加密）—— 离线优先依然是默认 |
| Backlog | — | 最佳对局幽灵回放 · 摄影模式（隐藏 HUD，导出 PNG）· 泰语（ไทย）译本评估中 |

*路线图不是承诺 — 优先级永远是：稳定 → 更好玩 → 更多内容。*

## 📚 延伸阅读与开发文档

设计说明与更深入的技术文档：

| Doc | What it covers |
| --- | --- |
| [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md) | 发行版 v1.1.6 —— 六分区设置、预设、备份、多层菜单场景 |
| [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md) | 发行版 v1.1.5 — 四角菜单、保存/继续、设置、修复 |
| [docs/design/menu-corners.md](docs/design/menu-corners.md) | 四角 GAME/INFO 菜单设计 — 原则、a11y、响应式 |
| [docs/design/save-format.md](docs/design/save-format.md) | Spec `locheo.run.v1` — 暂停对局快照（schema + 生命周期） |
| [docs/design/settings-format.md](docs/design/settings-format.md) | Spec `locheo.settings.v1` — 游戏设置（schema + 接线） |
| [docs/guides/troubleshooting.md](docs/guides/troubleshooting.md) | 常见问题 — 黑屏 · 无声音 · 继续游戏 · 启动器 |
| [scripts/smoke-ssr.tsx](scripts/smoke-ssr.tsx) | 无头渲染冒烟测试（完整菜单/弹窗树） |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | CI: npm ci → npm run check (Node 22) |

## 🤝 贡献

1. Fork 仓库，按 `arena/<名称>` 或 `feat/<名称>` 规范创建分支。
2. 提 PR 前 `npm run check` 必须全绿（typecheck + 113 项测试 + build）。
3. 非必要不新增运行时依赖 —— 理念：**一个文件、不联网、永久可玩**。
4. PR 描述请注明受影响的界面/模式；若涉及玩法变更请附录屏。

## 📄 许可证与作者

<img src="assets/license.svg" alt="AGPL-3.0-only — copyleft 许可证" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) —— 见 [LICENSE](LICENSE) 与 [assets/license.svg](assets/license.svg)。
- 字体：[Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) 与 [Bungee](https://fonts.google.com/specimen/Bungee) —— SIL Open Font License 1.1（自托管 woff2 子集）。
- 致敬越南每一桌饭上的那坛腌菜。🫙🇻🇳
