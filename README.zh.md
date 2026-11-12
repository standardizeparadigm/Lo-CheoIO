<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — 酸菜腌罐大乱斗" width="100%" />

# LỌ CHÉO — 酸菜腌罐大乱斗

### 🫙 100% 在浏览器中运行的越式腌大戏 — 单个 HTML 文件，离线优先
### 🌐 游戏内置 3 种语言 — Tiếng Việt · English · 中文

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md)

[![Version](https://img.shields.io/badge/version-1.1.1-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.1.md)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-安装与运行)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-生产构建)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-切换语言)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo 实战演示 — 陶罐斜冲、接住腌菜、斩碎霉菌" width="100%" />

</div>

---

## 🥒 关于本项目

> Lọ Chéo — 酸菜腌罐大乱斗：100% 在浏览器中运行的腌菜街机，打包进单个自包含 HTML 文件，离线优先 —— 无 CDN，无服务器。这只陶罐只懂走**斜线**：按住两个方向键斜冲、加速、斩碎霉菌、苍蝇与菜虫，赶在陶罐裂成三瓣之前把它装满！**3 种模式 · 14 种食材 · 10 项成就 · TOP 8 名人堂 · 游戏内 3 种语言。**

这是一款致敬越南家常腌菜的**单屏动作游戏**。没有线性关卡，没有繁杂菜单 —— 只有陶罐、无尽的腌菜雨，和你燃烧的反应速度。

## 🆕 v1.1.1 新特性

- 🌐 **游戏内切换语言** — VI ⇄ EN ⇄ ZH，主菜单或暂停界面即时切换，通过 `locheo.lang.v1` 记忆；画布 HUD、弹字、横幅、菜单、暂停、结算、成就、跑马灯全部完成翻译。
- 📖 **README 扩充至 7 种语言**（新增 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇫🇷 Français），配备动态 banner、实战演示动画与 14 食材一览图。
- 🐛 **全面排查并修复遗留 BUG**（见 [CHANGELOG](CHANGELOG.md) `[1.1.1]`）；`npm run check` 全绿，**45 项单元测试**。
- 🖼️ **2 张全新动态 SVG** 文档素材：`assets/demo.svg`（实战循环）与 `assets/items.svg`（14 种食材）。

→ 完整说明：[docs/releases/v1.1.1.md](docs/releases/v1.1.1.md)

## ✨ 亮点功能

| 分类 | 详情 |
| --- | --- |
| 🎮 **3 种模式** | **经典腌制**（均衡）· **清心禅意**（无危险物，×0.5 得分）· **辣椒火焰**（速度 +35%，×1.5 得分） |
| 🌐 **游戏内 i18n** | Tiếng Việt · English · 中文 —— `src/i18n/`（纯模块 + React 桥接），`t()` 支持插值，同步 `<html lang>`，数字按 locale 分组（vi-VN / en-US / zh-CN） |
| 🕹️ **专属“斜切”机制** | 同时按住两个方向键/斜向轴 —— 陶罐加速、发光并斩碎危险物。配有独立耐力条与防闪烁回滞 |
| 🥬 **14 种食材** | 小茄子、辣椒、大蒜、生姜、盐、芥菜、**金卷心菜**（快速装罐）· 黄金盐/黄金蒜 · 魔鬼辣椒 · 寒冰 · 霉菌、苍蝇、**菜虫**（危险物） |
| 🧄 **黄金蒜护盾** | 道具：最多叠加 **2 层护盾**吸收裂痕；陶罐周围环绕旋转光环 |
| 🏆 **10 项成就** | **跨局累计**存档（localStorage），结算画面弹出“新成就！” |
| 🔊 **手工音效** | 11 种 Web Audio API 合成音效（零音频文件）+ 随等级变调的五声音阶背景乐，`M` 键静音 |
| 💾 **TOP 8 名人堂** | 本地存档，读取时校验并归一化，姓名自动大写，新纪录高亮 |
| 🎨 **60fps 画质** | Canvas 2D，粒子上限 460，DPR 上限 2，离屏预渲染花砖地板，星光闪烁 + 菜单极光 |
| 📴 **真·离线优先** | 自托管字体（latin + 越南文子集，woff2），无 CDN、无接口 —— 双击 `dist/index.html` 即玩 |
| 🧪 **质量保障** | 45 项单元测试（vitest）覆盖 modes / achievements / storage / i18n —— `npm run check` 为 CI 关卡 |

<img src="assets/items.svg" alt="14 种食材 — 要接的腌菜、要捡的黄金道具、要躲的危险物" width="100%" />

## 🌐 切换语言

Lọ Chéo 内置 **3 种界面语言**，即时生效 —— 无需刷新、不中断对局：

| 语言 | 入口 | 存储键 |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | **VI** 按钮（默认；未设置时跟随浏览器语言） | `locheo.lang.v1` |
| 🇬🇧 English | **EN** 按钮 | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** 按钮 | `locheo.lang.v1` |

- 在**主菜单**（右上角）或**暂停界面**（底部紧凑版）切换。
- 所有用户可见文案都在 `src/i18n/locales/{vi,en,zh}.ts` —— 画布引擎、各界面、HUD、弹字、跑马灯、提示。
- 缺少 key？`t()` 自动回退到越南语 —— 三套 locale 的 key 集合与占位符一致性由测试强制保证。

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
| 切换语言 | —（使用 VI/EN/中 按钮） | 菜单 / 暂停界面的 VI/EN/中 按钮 |

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

> `vite-plugin-singlefile` 会把所有 JS/CSS/字体/图片内联进**一个** `dist/index.html`（约 655 KB，gzip 约 330 KB）。不需要服务器，不需要网络。

### 开发

```bash
npm run dev        # 带 HMR 的开发服务器（http://localhost:5173）
npm run preview    # 本地预览生产构建
npm run typecheck  # tsc --noEmit（strict，noUnusedLocals…）
npm run test       # vitest — 45 项单元测试（modes / achievements / storage / i18n）
npm run check      # typecheck + test + build（CI 质量关卡）
```

## 🗂️ 项目结构

```
lo-cheoio/
├─ index.html              # 入口，SEO/OG 元信息（无 CDN）
├─ package.json            # lo-cheoio v1.1.1，dev/build/test/check 脚本
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict；包含 src + tests
├─ assets/
│  ├─ banner.svg           # README 横幅（SMIL 动画）
│  ├─ demo.svg             # 实战演示（SMIL 动画）
│  └─ items.svg            # 14 种食材（SMIL 动画）
├─ docs/
│  ├─ DESCRIPTION.md       # 多语言项目简介（vi/en/zh + SEO）
│  └─ releases/
│     ├─ v1.0.0.md         # 首发版本说明
│     ├─ v1.1.0.md         # v1.1.0 版本说明
│     └─ v1.1.1.md         # 当前版本说明
├─ README.md               # 🇻🇳 Tiếng Việt
├─ README.en.md            # 🇬🇧 English
├─ README.zh.md            # 🇨🇳 中文（本文件）
├─ README.ja.md            # 🇯🇵 日本語
├─ README.ko.md            # 🇰🇷 한국어
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français
├─ src/
│  ├─ main.tsx             # React 入口，StrictMode
│  ├─ App.tsx              # 阶段状态机 menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.1"（唯一版本来源）
│  ├─ index.css            # tailwind v4 主题 + 全部动画/渐变
│  ├─ assets/fonts/        # woff2 子集（Be Vietnam Pro ×6，Bungee）
│  ├─ styles/fonts.css     # @font-face + unicode-range，100% 离线
│  ├─ i18n/
│  │  ├─ i18n.ts           # 纯模块：检测、持久化、t() + 插值
│  │  ├─ useI18n.ts        # React hook：useI18n/useLanguage
│  │  └─ locales/          # vi.ts（key 源）· en.ts · zh.ts
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # 画布 + 浮动摇杆 + 键盘 + 可见性处理
│  │  ├─ StartScreen.tsx   # 主菜单：极光、流光字、选模式、成就
│  │  ├─ ModeSelector.tsx  # 3 张模式卡（渐变 + 模式主色）
│  │  ├─ AchievementsPanel.tsx  # 已锁/已解锁徽章墙
│  │  ├─ GameOverScreen.tsx     # 罐子碎了！+ 分数 + 新成就
│  │  ├─ PauseScreen.tsx        # 暂停 + 本局数据
│  │  ├─ LanguageSwitcher.tsx   # 通用 VI / EN / 中 切换器
│  │  └─ ui.tsx            # GameButton、Panel、Keycap、Stat、ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # 全部模拟与画布渲染（约 2100 行）
│  │  ├─ modes.ts          # 游戏模式 + 平衡公式（纯函数）
│  │  ├─ achievements.ts   # 10 枚徽章 + 纯校验器（纯函数）
│  │  ├─ storage.ts        # localStorage：TOP 8、进度、成就
│  │  └─ audio.ts          # Web Audio 合成：音效 + 五声音阶音乐
│  └─ utils/cn.ts          # clsx + tailwind-merge
└─ tests/                  # vitest — modes、achievements、storage、i18n
```

## 🧱 架构与性能

- **游戏主循环** `requestAnimationFrame`，增量时间钳制到 `1/20s`，乘以 `timeScale`（寒冰慢动作），每次接住还有几十毫秒 **hit-stop** 停顿带来打击感。
- **画布 HUD** 每帧直绘；React 只按 `phase` 渲染界面 —— 热循环中不重渲染 React；切换语言后 HUD 下一帧即读取新词典。
- **分层 i18n**：`src/i18n/i18n.ts` 为纯模块（不依赖 React），`useI18n` 仅通过 `locheo:languagechange` 事件桥接重渲染；`t()` 支持 `{param}` 插值并回退到越南语。
- **花砖地板** 一次离屏预渲染（含暗角与光池），星光闪烁与气泡实时计算 —— 极其廉价。
- **预算**：≤460 粒子，≤70 物品，≤34 弹字，DPR ≤ 2；按 hitbox 扫描碰撞；落地的腌菜印记会自行消失。
- **localStorage** 输入校验/归一化 —— 一条脏记录不会毁掉整个榜；存储被禁用（Safari 无痕模式）时照常在内存中游玩；语言选择单独存放在 `locheo.lang.v1`。
- **动效关怀**：`prefers-reduced-motion` 关闭极光/流光/旋转；背景星光与屏幕震动同样遵循媒体查询。

## ❓ 常见问题

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

## 📦 发行版与更新日志

| 版本 | 日期 | 说明 |
| --- | --- | --- |
| [v1.1.1](docs/releases/v1.1.1.md) | 2026-11-12 | 游戏内 i18n VI/EN/ZH · README 7 种语言 · 全面修 BUG · 45 项测试 |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3 种模式 · 黄金蒜护盾 · 菜虫 · 金卷心菜 · 10 项成就 · 自托管字体 |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | 首发：完整引擎，11 种食材，拍罐冲击波，×9 连击 |

另见 [CHANGELOG.md](CHANGELOG.md)。

## 🤝 贡献

1. Fork 仓库，按 `arena/<名称>` 或 `feat/<名称>` 规范创建分支。
2. 提 PR 前 `npm run check` 必须全绿（typecheck + 45 项测试 + build）。
3. 非必要不新增运行时依赖 —— 理念：**一个文件、不联网、永久可玩**。
4. PR 描述请注明受影响的界面/模式；若涉及玩法变更请附录屏。

## 📄 许可证与作者

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) —— 见 [LICENSE](LICENSE)。
- 字体：[Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) 与 [Bungee](https://fonts.google.com/specimen/Bungee) —— SIL Open Font License 1.1（自托管 woff2 子集）。
- 致敬越南每一桌饭上的那坛腌菜。🫙🇻🇳
