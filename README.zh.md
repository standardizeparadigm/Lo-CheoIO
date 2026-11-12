<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — 越式酸菜腌罐大乱斗" width="100%" />

# LỌ CHÉO — 越式酸菜腌罐大乱斗

### 🫙 100% 在浏览器中运行的腌菜罐街机 — 单个 HTML 文件，离线优先

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md)

[![Version](https://img.shields.io/badge/version-1.1.0-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.0.md)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-安装与运行)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-生产构建)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

</div>

---

## 🥒 关于项目

> Lọ Chéo（斜切罐）— Hũ Dưa Đại Chiến（腌菜罐大乱斗）：一款 100% 在浏览器中运行的腌菜罐街机游戏，整个游戏打包在 **一个 HTML 文件** 中，离线优先 —— 无 CDN、无服务器。这只陶罐只会走**斜线**：同时按住两个方向键即可斜向冲刺、加速并斩碎霉菌、苍蝇和菜虫，趁陶罐还没裂成三瓣之前把它装满！3 种游戏模式，14 种食材，10 项成就，TOP 8 荣誉榜。

这是一款受越南家庭餐桌上的**酸菜腌罐**启发而来的**单屏动作街机**。没有线性关卡，没有花哨的菜单 —— 只有陶罐、一场无尽的酸菜雨，和你燃尽的反应力。

## ✨ 核心亮点

| 领域 | 详情 |
| --- | --- |
| 🎮 **3 种游戏模式** | **经典腌制**（均衡）· **清心禅意**（无危险物，×0.5 分）· **火辣辣椒**（速度 +35%，×1.5 分） |
| 🕹️ **独创「CHÉO」斜切机制** | 同时按住两个方向键 / 斜向拖动 —— 陶罐加速、发光并斩碎危险物。独立耐力条 + 迟滞设计，绝不闪烁 |
| 🥬 **14 种食材** | 小茄子、辣椒、大蒜、生姜、盐、芥菜、**金色卷心菜**（快速填满罐子）· 黄金盐/蒜 · 魔鬼辣椒 · 寒冰 · 霉菌、苍蝇、**菜虫**（危险物） |
| 🧄 **黄金蒜护盾** | 新强化道具：最多叠加 **2 层护盾** 抵挡裂痕，罐子周围有旋转光环 |
| 🏆 **10 项成就** | **跨局累计**保存（localStorage），游戏结束时会弹出「新成就！」提示，菜单内有成就墙 |
| 🔊 **手工合成音效** | 11 种 Web Audio API 合成音效（零音频文件）+ 随等级变调的五声音阶背景乐，`M` 键静音 |
| 💾 **TOP 8 荣誉榜** | 本地保存分数，读取时校验并标准化；名字自动大写；新上榜的条目会高亮显示 |
| 🎨 **60fps 画面** | Canvas 2D，460 粒子上限，DPR 上限 2，预渲染水磨石地砖背景，星光闪烁 + 极光菜单 |
| 📴 **真正的离线优先** | 自托管字体子集（拉丁 + 越南文，woff2），无 CDN、无 API —— 打开 `dist/index.html` 即可游玩 |

## 🕹️ 操作方式

| 动作 | 键盘 | 触屏 |
| --- | --- | --- |
| 移动 | `W` `A` `S` `D` 或 `← ↑ ↓ →` | 在屏幕任意位置拖动（漂浮摇杆） |
| **Chéo（斜切）** | 同时按住**两个方向键**（例如 `A`+`W`） | 沿 **45°** 拖动 —— 摇杆圆环变金色 |
| 拍罐（冲击波 + 磁吸） | `Space` | 右下角红色 **LẮC** 按钮 |
| 暂停 / 继续 | `P` 或 `Esc` | 右上角暂停按钮 |
| 立即重开 | `R`（暂停与结算画面中也可用） | 「再腌一坛」按钮 |
| 开始 / 确认 | `Enter` | **VÀO BẾP** 按钮 |
| 静音 / 取消静音 | `M` | 右上角扬声器按钮 |

## 🚀 安装与运行

### 直接开玩（无需构建）

```bash
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### 生产构建

```bash
npm install        # 安装依赖（Node ≥ 20.19）
npm run build      # → dist/index.html（所有资源均内联在一个文件中）
```

> `vite-plugin-singlefile` 会把全部 JS/CSS/字体/图片内联进**一个** `dist/index.html`（约 640 KB，gzip 后约 330 KB）。无需服务器，无需网络。

### 开发模式

```bash
npm run dev        # 开发服务器（HMR）(http://localhost:5173)
npm run preview    # 本地预览生产构建
npm run typecheck  # tsc --noEmit（strict 模式）
npm run test       # vitest —— 36 个单元测试（modes / achievements / storage）
npm run check      # typecheck + 测试 + 构建（CI 质量闸门）
```

## 🗂️ 项目结构

```
lo-cheoio/
├─ index.html              # 入口，SEO/OG meta（无 CDN）
├─ package.json            # lo-cheoio v1.1.0，scripts dev/build/test/check
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict；覆盖 src + tests
├─ assets/banner.svg       # README 横幅（SMIL 动画）
├─ docs/
│  ├─ DESCRIPTION.md       # 351 字符项目简介（中/英/越）
│  └─ releases/            # v1.0.0.md · v1.1.0.md
├─ src/
│  ├─ App.tsx              # 阶段状态机：menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.0"（唯一版本来源）
│  ├─ index.css            # tailwind v4 主题 + 全部动画/渐变
│  ├─ assets/fonts/        # woff2 子集（Be Vietnam Pro ×6，Bungee）
│  ├─ styles/fonts.css     # @font-face + unicode-range，100% 离线
│  ├─ components/          # GameCanvas、StartScreen、ModeSelector、
│  │                       # AchievementsPanel、GameOverScreen、PauseScreen、ui
│  ├─ game/
│  │  ├─ engine.ts         # 完整模拟 + canvas 渲染器（约 2100 行）
│  │  ├─ modes.ts          # 游戏模式 + 平衡公式（纯函数）
│  │  ├─ achievements.ts   # 10 枚徽章 + 纯函数解锁判定（纯函数）
│  │  ├─ storage.ts        # localStorage：TOP 8、进度、成就
│  │  └─ audio.ts          # Web Audio 合成器：音效 + 五声音阶背景乐
│  └─ utils/cn.ts
└─ tests/                  # vitest —— modes、achievements、storage
```

## 🧱 架构与性能

- **游戏主循环**基于 `requestAnimationFrame`，delta 时间夹在 `1/20s` 以内，由 `timeScale` 缩放（寒冰减速），每次接到食材时附带短促的**打击停顿**，手感扎实。
- **Canvas 绘制 HUD**，每帧直接绘制；React 只在阶段切换时渲染各界面 —— 热路径不会触发 React 重渲染。
- **水磨石地砖背景**只预渲染一次到离屏 canvas（含暗角与暖光池）；星光闪烁与盐水气泡均为廉价的时间函数绘制。
- **预算控制**：≤460 粒子、≤70 物品、≤34 飘字、DPR ≤ 2；扫掠式碰撞检测；溅射污渍自动淡出。
- **localStorage** 读取时做输入校验与标准化 —— 一行坏数据不会毁掉整个排行榜；存储被禁用时（如 Safari 无痕模式）自动降级为内存模式。
- **减少动态效果**：`prefers-reduced-motion` 时关闭极光/流光/旋转等装饰动画。

## 📦 发布记录与更新日志

| 版本 | 日期 | 说明 |
| --- | --- | --- |
| [v1.1.0](docs/releases/v1.1.0.md) | 2026-11-12 | 3 种模式 · 黄金蒜护盾 · 菜虫 · 金卷心菜 · 10 项成就 · 三语 README · 真正离线 · 修复 6 处逻辑缺陷 |
| [v1.0.0](docs/releases/v1.0.0.md) | 2026-10-26 | 首个版本：完整引擎、11 种食材、拍罐冲击波、×9 连击、TOP 8 榜 |

另见 [CHANGELOG.md](CHANGELOG.md)。

## 🤝 参与贡献

1. Fork 本仓库，分支命名为 `arena/<名称>` 或 `feat/<名称>`。
2. 提 PR 前 `npm run check` 必须全部通过（typecheck + 36 项测试 + 构建）。
3. 除非绝对必要，不新增运行时依赖 —— 我们的哲学是：**一个文件、无需网络、永远能玩**。
4. PR 描述中注明影响的模式/界面；若涉及玩法改动，请附上录屏。

## 📄 许可证与作者

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) —— 详见 [LICENSE](LICENSE)。
- 字体：[Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) 与 [Bungee](https://fonts.google.com/specimen/Bungee) —— SIL Open Font License 1.1（自托管子集）。
- 把这坛酸菜献给每一张越南家庭的饭桌。🫙🇻🇳
