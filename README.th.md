<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Pickled Jar Showdown" width="100%" />

# LỌ CHÉO — PICKLED JAR SHOWDOWN

### 🫙 เกมอะเคดปีเคิลสัญชาติเวียดนามที่เล่นได้ 100% บนเบราว์เซอร์ — ไฟล์ HTML ไฟล์เดียวจบ ออฟไลน์ได้ทันที
### 🌐 อินเทอร์เฟซในเกม 7 ภาษา — Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.7-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.7.md)
[![Tier](https://img.shields.io/badge/tier-PATCH%20%C2%B7%20violet-9d6bff.svg?style=for-the-badge)]
[![Tests](https://img.shields.io/badge/tests-241%20%C2%B7%2031%20files-2bb48c.svg?style=for-the-badge&logo=vitest&logoColor=white)]
[![CI](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml/badge.svg)](https://github.com/standardizeparadigm/Lo-CheoIO/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-AGPL--3.0--only-e63b2e.svg?style=for-the-badge)](LICENSE)
[![Offline](https://img.shields.io/badge/offline--first-100%25-2bb48c.svg?style=for-the-badge)](#-ติดตั้ง--เริ่มเล่น)
[![Single File](https://img.shields.io/badge/single--file-HTML-8cc63f.svg?style=for-the-badge)](#-build-production)
[![Languages](https://img.shields.io/badge/UI-VI%20%C2%B7%20EN%20%C2%B7%20ZH%20%C2%B7%20JA%20%C2%B7%20KO%20%C2%B7%20ES%20%C2%B7%20FR-ffc94a.svg?style=for-the-badge&logo=googletranslate&logoColor=black)](#-สลับภาษา)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ffc94a.svg?style=for-the-badge)](CONTRIBUTING.md)

<img src="assets/demo.svg" alt="Lọ Chéo gameplay — ไหเอียงเฉียง รับวัตถุดิบ เฉือนเชื้อรา" width="100%" />

<img src="assets/languages.svg" alt="7 ภาษา — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

<img src="assets/palette-ribbon.svg" alt="จานสีของ Lọ Chéo — เจ็ดแถบหายใจสลับกัน (แอนิเมชัน SMIL)" width="100%" />

</div>

---

## 🥒 เกี่ยวกับโปรเจกต์

> Lọ Chéo — Pickled Jar Showdown: เกมอะเคดปีเคิลที่รันได้ 100% บนเบราว์เซอร์ แพ็กมาในไฟล์ HTML เดียวจบ ออฟไลน์เต็มรูปแบบ — ไม่มี CDN ไม่มีเซิร์ฟเวอร์ ไหเซรามิกขยับได้ทาง**เฉียง**เท่านั้น: กดสองปุ่มพร้อมกันเพื่อเอียง เร่งสปีด และเฉือนเชื้อรา แมลงวัน และหนอน แล้วเติมไหให้เต็มก่อนที่เซรามิกจะแตกเป็นสามซีก **9 โหมด · 14 วัตถุดิบ · 16 ความสำเร็จ · ตาราง TOP 8 · 7 ภาษาในเกม**

นี่คือ **เกมแอ็กชันจอเดียว** ที่ได้แรงบันดาลใจจากผักดองพื้นบ้านของเวียดนาม ไม่มีด่านเรียงลำดับ ไม่มีเมนูรกรุงรัง มีแค่ไห สายฝนวัตถุดิบที่ไม่สิ้นสุด และรีเฟล็กซ์สุดจี๊ดของคุณ

<img src="assets/divider.svg" alt="" width="100%" />

## 🆕 สิ่งใหม่ใน v1.1.7

> **แพตช์สุดท้าย**ก่อน 1.2.0 ไม่มีโหมดใหม่ — แก้เฉพาะสิ่งที่ยังรบกวนอยู่ ให้จบที่ต้นเหตุ

### 🌫️ พื้นหลังเมนูไม่เบลอแล้ว — แก้ที่ต้นเหตุ

ผู้เล่นพูดถูก: *«พื้นหลังหลังเมนูยังเบลออยู่»* ต้นเหตุไม่ใช่ชั้นเดียว แต่เป็น**สี่ชั้นซ้อนที่ขยายกันเอง**:

| ชั้น | ก่อน | หลัง | ทำไม |
| --- | --- | --- | --- |
| เนบิวลา `.nebula-*` | `blur(64px)` สูงสุด `1.0` | **`blur(22px)` สูงสุด `0.80`** | 64px เกินครึ่งรัศมีของก้อน 46vw — ขอบหายไปทั้งก้อนกลายเป็นหมอก |
| วิชเน็ตต์เมนู | อินไลน์ **เต็มจอ** `0.42 → 0.88 → 1.0` | **`.menu-vignette`** เฉพาะมุม `0.30 → 0.62` | จาก «มืดทั้งกรอบเท่ากัน» เป็น «มุมมืด กลางสว่าง» |
| กรอบ CRT | `inset 0 0 140px @ 0.9` | **`.app-vignette` 90px @ 0.55** | 140px กลืนเกือบทุกมุมเมื่อหน้าต่างเล็ก |
| พื้นกระเบื้อง | `opacity-45` | **`opacity-70`** | ที่ 45% พื้นเป็นแค่สัญญาณรบกวนสีเทา ไม่ใช่รายละเอียดที่จำได้ |

`.menu-vignette` และ `.app-vignette` ตอนนี้เป็น**กฎ CSS ที่มีชื่อ** ไม่ใช่ยูทิลิตี้ที่ฝังใน JSX — ปรับที่เดียว และ `prefers-reduced-motion` เข้าถึงได้

### 🏷️ ชั้นของ changelog — หนึ่งชั้นหนึ่งสี

| ชั้น | ป้าย | สี | ความหมาย | ตัวอย่าง |
| --- | --- | --- | --- | --- |
| `major` | **MAJOR** | 🩷 ชมพู `#ff5fb0` | เวอร์ชันใหญ่ — ระบบใหม่ | 1.0.0 |
| `minor` | **UPDATE** | 🟡 ทอง `#f5a81c` | อัปเกรด — เนื้อหาใหม่ | 1.1.0 |
| `patch` | **PATCH** | 🟣 ม่วง `#9d6bff` | แก้บั๊กและจัดระเบียบ | 1.1.1 → 1.1.7 |

ชั้นนี้**อนุมานจาก SemVer** ด้วย `tierFor(version)` ไม่มีการพิมพ์มือ — ป้ายจึงขัดกับเลขเวอร์ชันที่พิมพ์ข้าง ๆ ไม่ได้เลย แผงมี**ตัวกรอง**เพิ่ม: ทั้งหมด · MAJOR · UPDATE · PATCH พร้อมจำนวนแต่ละชั้น

<img src="assets/release-tiers.svg" alt="สามชั้น MAJOR/UPDATE/PATCH กับสี และเส้นเวลาของเก้าเวอร์ชัน (แอนิเมชัน SMIL)" width="100%" />

### 📖 แปดเวอร์ชันเก่า: จากหนึ่งบรรทัดเป็นหนึ่งหน้า

เก้าเวอร์ชันมีหกตัวที่**อาร์เรย์หัวข้อว่างเปล่า** — แผงแสดงได้แค่สรุปหนึ่งบรรทัด v1.1.7 เขียนใหม่ทั้งหมด:

- **96 หัวข้อภาษาเวียดนาม + 96 ภาษาอังกฤษ** เขียนใหม่หรือขยาย
- เนื้อหาจาก `docs/releases/v1.1.x.md` **และ**จากโค้ดจริง (9 โหมด 16 ความสำเร็จ)
- **จัดวันวางจำหน่ายใหม่**: 10-26 · 10-29 · 10-31 · 11-02 · 11-04 · 11-06 · 11-08 · 11-10 · **11-12** — ห่างกันสองวัน ไม่มีสองเวอร์ชันวันเดียวกัน

### 🗂️ โปรเจกต์แยกเป็นโฟลเดอร์มากขึ้น

```
src/game/changelog/        ← แทนไฟล์เดียว 300 บรรทัด
├── types.ts               ChangelogEntry · ReleaseTier · copyFor()
├── tiers.ts               tierFor() · TIER_ORDER · TIER_LABEL_KEY
├── entries/               หนึ่งไฟล์ต่อหนึ่งเวอร์ชัน — v1_0_0.ts … v1_1_7.ts
└── index.ts               CHANGELOG_ENTRIES + 5 ตัวช่วย
```

การเพิ่ม 1.2.0 ต่อไปคือ**ไฟล์ใหม่หนึ่งไฟล์**กับ import อีกหนึ่งบรรทัด

### 🐛 การแก้ไข

| # | บั๊ก | การแก้ |
| --- | --- | --- |
| 1 | พื้นหลังเมนูเบลอ/ขุ่น | สี่การเปลี่ยนแปลงข้างบน |
| 2 | พื้นกระเบื้องมองไม่เห็น | `opacity-45` → `opacity-70` |
| 3 | ป้าย changelog บอกผิด (`kind` พิมพ์มือ) | `tierFor(version)` อนุมานจาก SemVer |
| 4 | คำอธิบายบางเกินไป (6 เวอร์ชันมี `items: []`) | เขียนใหม่ 96 หัวข้อ |
| 5 | วันวางจำหน่ายซ้ำและไม่สมเหตุสมผล | เก้าวันต่อเนื่อง ไม่ซ้ำ |
| 6 | เอกสาร/SVG/ตัวเรียกเกมล้าหลังเวอร์ชัน | ตรวจทั้งหมด → 1.1.7 |
| 7 | คอมเมนต์ `check-readme-sync` ฝัง 1.1.6 | อ่านจาก `package.json` แทน |

→ รายละเอียดเต็ม: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md) · เวอร์ชันก่อน: [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md)

<img src="assets/settings-sections.svg" alt="การตั้งค่าหกส่วน (ตั้งแต่ v1.1.6) — สวิตช์ แถบระดับ และตัวเลือก (แอนิเมชัน SMIL)" width="100%" />

<img src="assets/corner-menu.svg" alt="แผง GAME (ล่างซ้าย) และ INFO (ล่างขวา) เลื่อนเข้า (แอนิเมชัน SMIL)" width="100%" />

## ✨ จุดเด่น

| หมวด | รายละเอียด |
| --- | --- |
| 🎮 **9 โหมด** | **ดองคลาสสิก**(สมดุล) · **ZEN**(ไม่มีอันตราย, ×0.5) · **อินเฟอร์โนพริก**(เร็ว +35%, ×1.5) · **60 วินาที**(time-attack 60s, ×1.25) · **โกลด์รัช**(ของทองหล่น ×2.6) · **พายุผักดอง**(หนาแน่น ~1.4×, ×0.75) · **เซรามิกบาง**(ร้าวรอยเดียวจบ, ×2.0) · **เทศกาลคอมโบ** (หน้าต่าง ×2, ×1.15) · **งานเลี้ยงใหญ่** (หนาแน่น ~×2, โถ ×2.5, ×0.6) |
| 🌐 **i18n ในเกม** | Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français — `src/i18n/` (โมดูลล้วน + สะพาน React), `t()` รองรับ interpolation ซิงก์ `<html lang>` ตัวเลขตาม locale (vi-VN / en-US / zh-CN / ja-JP / ko-KR / es-ES / fr-FR) |
| 🕹️ **กลไก CHÉO เฉพาะ** | กด 2 ปุ่ม/แกนแบบเฉียง — ไหเร่งสปีด เรืองแสง และเฉือนอันตราย มีหลอด stamina แยก พร้อม hysteresis กันกระพริบ |
| 🥬 **14 วัตถุดิบ** | มะเขือ พริก กระเทียม ขิง เกลือ ผัก · **ผักทอง** (เติมไหเร็ว) · เกลือ/กระเทียมทอง · พริกเพลิง · น้ำแข็ง · เชื้อรา แมลงวัน **หนอน** (อันตราย) |
| 🧄 **เกราะกระเทียมทอง** | พาวเวอร์อัพ: สะสมได้สูงสุด **2 ชาร์จ** กันรอยร้าว มีรัศมีหมุนโคจรรอบไห |
| 🏆 **16 ความสำเร็จ** | บันทึกข้ามรอบ (localStorage) พร้อม toast «ความสำเร็จใหม่!» บนหน้าจบเกม |
| 🔊 **ซาวด์ทำมือ** | เอฟเฟกต์ 11 แบบสังเคราะห์ด้วย Web Audio API (ไม่มีไฟล์) + บันไดเสียง pentatonic เปลี่ยนตามเลเวล กด `M` ปิดเสียง |
| 💾 **ตาราง TOP 8** | เก็บลงเครื่อง ตรวจสอบ/ปรับค่าเมื่ออ่าน ชื่อตัวพิมพ์ใหญ่ ไฮไลต์สถิติใหม่ |
| 🎨 **กราฟิก 60fps** | Canvas 2D งบอนุภาค ≤460 จำกัด DPR ≤ 2 พื้นกระเบื้องพรีเรนเดอร์ลง offscreen ดาวระยิบ + ออโรร่าในเมนู |
| 📴 **ออฟไลน์จริง** | ฟอนต์โฮสเอง (subset latin + vietnamese woff2) ไม่มี CDN ไม่มี API — ดับเบิลคลิก `dist/index.html` แล้วเล่นได้เลย |
| 🧪 **คุณภาพ** | 241 เทสต์ (vitest) ครอบคลุม modes / achievements / storage / i18n / settings — `npm run check` คือประตู CI |

<img src="assets/items.svg" alt="14 วัตถุดิบ — ผักดองให้รับ พลังทองให้คว้า อันตรายให้หลบ" width="100%" />

## 🌐 สลับภาษา

Lọ Chéo มาพร้อม **อินเทอร์เฟซ 7 ภาษา** เปลี่ยนแล้วมีผลทันที — ไม่ต้องรีโหลด ไม่เสียรอบที่เล่นอยู่:

<img src="assets/languages.svg" alt="7 ภาษา — VI · EN · 中文 · 日本語 · 한국어 · Español · Français" width="100%" />

| ภาษา | ที่ไหน | เก็บไว้ที่ |
| --- | --- | --- |
| 🇻🇳 Tiếng Việt | ปุ่ม **VI** (ค่าเริ่มต้น ถ้าไม่ตั้งจะตาม locale ของเบราว์เซอร์) | `locheo.lang.v1` |
| 🇬🇧 English | **EN** ปุ่ม | `locheo.lang.v1` |
| 🇨🇳 中文 | **中** ปุ่ม | `locheo.lang.v1` |
| 🇯🇵 日本語 | **日** ปุ่ม | `locheo.lang.v1` |
| 🇰🇷 한국어 | **한** ปุ่ม | `locheo.lang.v1` |
| 🇪🇸 Español | **ES** ปุ่ม | `locheo.lang.v1` |
| 🇫🇷 Français | **FR** ปุ่ม | `locheo.lang.v1` |

- เปลี่ยนภาษาใน **ตั้งค่า → ภาษา** (ตารางปุ่มธง 7 ปุ่ม) — จุดเดียว ไม่มีสวิตช์ลอยบนเมนูอีก
- string ทุกตัวที่ผู้ใช้เห็นอยู่ใน `src/i18n/locales/{vi,en,zh,ja,ko,es,fr}.ts` — canvas engine, screens, HUD, popup, ticker, คำแนะนำ
- ถ้าขาด key? `t()` จะ fallback เป็นเวียดนาม — ชุด key ของทั้งเจ็ด locale (และ placeholder) ถูกบังคับด้วยเทสต์

## 🕹️ การควบคุม

| การกระทำ | คีย์บอร์ด | ทัช |
| --- | --- | --- |
| เคลื่อนที่ | `W` `A` `S` `D` หรือ `← ↑ ↓ →` | ลากตรงไหนก็ได้ (floating joystick) |
| **เอียง (CHÉO)** | กดค้าง **2 ปุ่มพร้อมกัน** (เช่น `A`+`W`) | ลากที่ **45°** — วงแหวนจอยสติ๊กเปลี่ยนเป็นทอง |
| กระแทกไห (ช็อกเวฟ + ดูดเข้า) | `Space` | ปุ่ม **SLAM** สีแดง มุมขวาล่าง |
| หยุดชั่วคราว / เล่นต่อ | `P` หรือ `Esc` | ปุ่มหยุด มุมขวาบน |
| รีสตาร์ตทันที | `R` (แม้กำลัง paused/game-over) | ปุ่ม "Pickle again" |
| เริ่ม / ยืนยัน | `Enter` | ปุ่ม **ENTER THE KITCHEN** |
| ปิด/เปิดเสียง | `M` | ปุ่มลำโพง มุมขวาบน |
| สลับภาษา | — (ใช้ปุ่ม VI/EN/中/日/한/ES/FR) | ปุ่ม VI/EN/中/日/한/ES/FR ในเมนู / pause |

## 🚀 ติดตั้ง & เริ่มเล่น

### เล่นได้เลย (ไม่ต้อง build)

```bash
# ทุก release แจกไฟล์เดียวจบ:
open dist/index.html      # macOS
xdg-open dist/index.html  # Linux
start dist/index.html     # Windows
```

### Build Production

```bash
npm install        # ติดตั้ง dependency (Node ≥ 20.19)
npm run build      # → dist/index.html (ไฟล์เดียวจบ)
```

> `vite-plugin-singlefile` ยัด JS/CSS/ฟอนต์/รูปทั้งหมดลง **ไฟล์เดียว** `dist/index.html` (~700 KB, gzip ~355 KB) ไม่ต้องมีเซิร์ฟเวอร์ ไม่ต้องมีเน็ต

### Development

```bash
npm run dev        # dev server พร้อม HMR (http://localhost:5173)
npm run preview    # เสิร์ฟ production build ในเครื่อง
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals…)
npm run test       # vitest — 241 เทสต์ (modes / achievements / storage / i18n / settings)
npm run check      # typecheck + test + build (ประตูคุณภาพ CI)
```

## 🗂️ โครงสร้างโปรเจกต์

```
lo-cheoio/
├─ index.html              # entry, SEO/OG meta (ไม่มี CDN)
├─ package.json            # lo-cheoio v1.1.7, สคริปต์ dev/build/test/check
├─ .gitattributes          # *.bat/*.cmd → CRLF · posix → LF · binaries
├─ vite.config.ts          # vite + react + tailwind v4 + singlefile
├─ tsconfig.json           # strict; ครอบคลุม src + tests
├─ favicon.ico             # web icon (multi-size 16→256)
├─ public/                 # favicon.ico/png/svg served at web root
├─ assets/
│  ├─ banner.svg           # แบนเนอร์ README (SMIL animation)
│  ├─ demo.svg             # จำลอง gameplay (SMIL animation)
│  ├─ items.svg            # 14 วัตถุดิบ (SMIL animation)
│  ├─ modes.svg            # 9 โหมด (SMIL animation)
│  ├─ languages.svg        # 7 in-game languages (SMIL animation)
│  ├─ new-modes.svg        # the 2 new v1.1.4 modes (SMIL animation)
│  ├─ corner-menu.svg     # corner GAME/INFO panels (SMIL animation)
│  ├─ settings-sections.svg # 6-section settings tour (SMIL, v1.1.6)
│  ├─ divider.svg          # sparkle divider (SMIL animation)
│  ├─ license.svg          # ตรา copyleft AGPL-3.0 แบบเคลื่อนไหว (SMIL animation)
│  └─ favicon.svg          # favicon (SMIL animation)
├─ scripts/
│  ├─ play-mac.command     # ตัวเปิด macOS — ดับเบิลคลิก เมนูสีสันจัดเต็ม
│  ├─ play-windows.bat     # ตัวเปิด Windows — ดับเบิลคลิก เมนูสีสันจัดเต็ม
│  ├─ play-linux.sh        # ตัวเปิด Linux — ดับเบิลคลิก เมนูสีสันจัดเต็ม
│  └─ README.md            # คู่มือตัวเปิดสำหรับคนไม่ถนัดเทอร์มินัล
├─ docs/
│  ├─ README.md            # สารบัญเอกสาร (v1.1.5)
│  ├─ DESCRIPTION.md       # คำอธิบายโปรเจกต์หลายภาษา (vi/en/zh + SEO)
│  ├─ design/              # สเปก menu-corners / save-format / settings-format
│  ├─ guides/              # ภาพรวม engine · a11y · ประสิทธิภาพ · storage keys · ขั้นตอน release…
│  └─ releases/
│     ├─ v1.0.0.md         # release notes ฉบับแรก
│     ├─ v1.1.0.md         # release notes v1.1.0
│     ├─ v1.1.1.md         # release notes v1.1.1
│     ├─ v1.1.2.md         # v1.1.2
│     ├─ v1.1.3.md         # v1.1.3 release notes
│     ├─ v1.1.4.md         # release notes (1.1.4)
│     ├─ v1.1.5.md         # release notes (1.1.5)
│     ├─ v1.1.6.md         # release notes (1.1.6)
│     └─ v1.1.7.md         # current release notes (1.1.7)
├─ README.md               # 🇻🇳 Tiếng Việt
├─ README.en.md            # 🇬🇧 English
├─ README.zh.md            # 🇨🇳 中文
├─ README.ja.md            # 🇯🇵 日本語
├─ README.ko.md            # 🇰🇷 한국어
├─ README.es.md            # 🇪🇸 Español
├─ README.fr.md            # 🇫🇷 Français
├─ README.th.md            # 🇹🇭 ไทย (ไฟล์นี้)
├─ README.de.md            # 🇩🇪 Deutsch
├─ README.pt.md            # 🇵🇹 Português
├─ src/
│  ├─ main.tsx             # React root, StrictMode
│  ├─ App.tsx              # phase machine menu/playing/paused/gameover
│  ├─ version.ts           # APP_VERSION = "1.1.7" (แหล่งความจริงเดียว)
│  ├─ index.css            # tailwind v4 theme + แอนิเมชัน/ gradient ทั้งหมด
│  ├─ assets/fonts/        # woff2 subsets (Be Vietnam Pro ×6, Bungee)
│  ├─ styles/fonts.css     # @font-face + unicode-range, ออฟไลน์ 100%
│  ├─ i18n/
│  │  ├─ i18n.ts           # โมดูลล้วน: detect, persist, t() + interpolation
│  │  ├─ useI18n.ts        # React hook: useI18n/useLanguage
│  │  └─ locales/          # vi.ts (แหล่ง key) · en · zh · ja · ko · es · fr
│  ├─ components/
│  │  ├─ GameCanvas.tsx    # canvas + floating joystick + keyboard + visibility
│  │  ├─ StartScreen.tsx   # เมนู: ฮีโร่ + ฉากหลายชั้น + พาเนลมุม
│  │  ├─ menu/              # พาเนล GAME/INFO + โมดัล + icons/
│  │  ├─ ModeSelector.tsx  # การ์ด 9 โหมด (classic/zen/inferno/blitz/goldrush/storm/hardcore · combo · feast)
│  │  ├─ AchievementsPanel.tsx  # กำแพงป้าย locked/unlocked
│  │  ├─ GameOverScreen.tsx     # ไหแตก! + คะแนน + ความสำเร็จใหม่
│  │  ├─ PauseScreen.tsx        # หยุดชั่วคราว + สถิติรอบนี้
│  │  ├─ settings/           # โมดูลตั้งค่า 6 หมวด + คอนโทรล (v1.1.6)
│  │  └─ ui.tsx            # GameButton, Panel, Keycap, Stat, ScoreBoard…
│  ├─ game/
│  │  ├─ engine.ts         # การจำลอง + เรนเดอร์ canvas ทั้งหมด (ราว 2260 บรรทัด)
│  │  ├─ modes.ts          # โหมดเกม + สมดุล (pure)
│  │  ├─ achievements.ts   # 16 ป้าย + ตัวตรวจ (pure)
│  │  ├─ storage.ts        # localStorage: top 8, progress, achievements
│  │  ├─ audio.ts          # Web Audio synth: sfx + เพลง pentatonic
│  │  ├─ changelog.ts        # ข้อมูล changelog ในเกม
│  │  ├─ runSave.ts         # บันทึกเกมที่ค้างไว้
│  │  ├─ settings.ts        # สคีมาตั้งค่า ค่าเริ่มต้น normalize
│  │  ├─ settingsIO.ts      # โคเดกสำรอง/กู้คืน (v1.1.6)
│  │  ├─ settingsPresets.ts # พรีเซ็ตเร็ว 4 แบบ (v1.1.6)
│  │  └─ audioLevels.ts     # คำนวณเกนล้วน (v1.1.6)
│  └─ utils/
│     ├─ cn.ts             # clsx + tailwind-merge
│     └─ useFocusTrap.ts   # กักโฟกัสในโมดัล (v1.1.6)
└─ tests/                  # vitest — 31 ไฟล์ · 241 เทสต์ (modes · achievements · storage · i18n · runSave · settings · presets · audio…)
```

## 🧱 สถาปัตยกรรม & ประสิทธิภาพ
<img src="assets/architecture.svg" alt="สถาปัตยกรรม Lọ Chéo v1.1.7 — อินพุต → เอนจิน → สถานะ → เรนเดอร์ พร้อมชั้นบริการ (แอนิเมชัน SMIL)" width="100%" />


- **Game loop** บน `requestAnimationFrame` delta-time จำกัดที่ `1/20s` คูณ `timeScale` (สโลว์โมชันจากน้ำแข็ง) และ **hit-stop** แช่แข็งสั้น ๆ ทุกครั้งที่รับของ ให้ความรู้สึก "หนักแน่น"
- **Canvas HUD** วาดตรงทุกเฟรม React เรนเดอร์เฉพาะหน้าจอตาม `phase` — ไม่มี re-render ในลูปร้อน เมื่อเปลี่ยนภาษา HUD หยิบ dictionary ใหม่เฟรมถัดไปทันที
- **i18n แบบชั้น**: `src/i18n/i18n.ts` เป็นโมดูลล้วน (ไม่พึ่ง React) `useI18n` เพียงสะพาน re-render ผ่าน event `locheo:languagechange`; `t()` รองรับ `{param}` interpolation และ fallback เป็นภาษาเวียดนาม
- **พื้นกระเบื้อง** พรีเรนเดอร์ครั้งเดียวลง offscreen canvas (พร้อม vignette + แอ่งแสง) ดาวระยิบและฟองคำนวณแบบเรียลไทม์ — ถูกมาก
- **Budget**: ≤460 อนุภาค ≤70 ไอเทม ≤34 popup DPR ≤ 2; กวาด hitbox collision; รอยดองที่พื้นล้างตัวเองได้
- **localStorage** ตรวจ/ปรับข้อมูลเมื่ออ่าน — เรคคอร์ดเสียหนึ่งรายการไม่ทำตารางพัง; ถ้า storage ถูกบล็อก (Safari โหมดส่วนตัว) เกมเล่นต่อในหน่วยความจำ; ตัวเลือกภาษาแยกไว้ใน `locheo.lang.v1`
- **Motion chill**: `prefers-reduced-motion` ปิดออโรร่า/shimmer/การหมุน; ทั้งดาวพื้นหลังและหน้าจอเขย่าเคารพ media query

## ❓ FAQ

**ตัวเปิด Windows ฟ้องตัวอักษรเวียดนาม?**
แก้แล้วใน v1.1.4: `play-windows.bat` เป็น CRLF + UTF-8 BOM พร้อม `chcp 65001` วรรณยุกต์เวียดนามครบถ้วน — ข้อผิดพลาด `'Ọ' is not recognized...` หายไปถาวร หากแก้ไข .bat ด้วยเอดิเตอร์อื่น ให้คง CRLF และ BOM ไว้ (`.gitattributes` บังคับให้อัตโนมัติ)


**เล่นแบบไม่มีเน็ตได้ไหม?**
ได้ 100% — เปิด `dist/index.html` แล้วทุกอย่างทำงาน รวมฟอนต์และเสียง ไม่มี request ออกนอกเครื่องเลยแม้แต่ครั้งเดียว

**มีโฆษณาหรือ telemetry ไหม?**
ไม่มี ไม่มี tracking ไม่มี analytics — คะแนนของคุณไม่เคยออกจาก localStorage

**เปลี่ยนภาษาแล้วความคืบหน้าหายไหม?**
ไม่หาย คะแนน ความสำเร็จ progress และโหมดที่เลือก ทั้งหมดแยกจาก `locheo.lang.v1`

**คะแนน TOP 8 เก็บไว้ที่ไหน?**
`locheo.scores.v1` (คะแนน), `locheo.progress.v1` (จำนวนรอบ/ไห/การเฉือนรวม), `locheo.achievements.v1` (ป้าย) — ล้าง storage คือหายหมด ดังนั้นรักษาไหของคุณไว้!

**อยากเพิ่มภาษาอื่น?**
เพิ่ม `src/i18n/locales/xx.ts` ให้ mirror ชุด key ของ `vi.ts` อัปเดต `LANGUAGES` + tests แล้วเปิด PR — ดู [CONTRIBUTING.md](CONTRIBUTING.md)

**ไม่ถนัดเทอร์มินัล?**
ดับเบิลคลิก [`scripts/play-mac.command`](scripts/play-mac.command) (macOS), [`scripts/play-windows.bat`](scripts/play-windows.bat) (Windows) หรือ [`scripts/play-linux.sh`](scripts/play-linux.sh) (Linux) — เมนูสีสันจะเปิดขึ้น เลือก `1` เพื่อ build & เล่นทันที หรือ `2` สำหรับ dev server รายละเอียด: [scripts/README.md](scripts/README.md)

## 📦 รีลีส & เช็งต์ล็อก

| เวอร์ชัน | Tier | วันที่ | บันทึก |
| --- | --- | --- | --- |
| [v1.1.7](docs/releases/v1.1.7.md) | 🟣 **PATCH** | 2026-11-12 | **พื้นหลังเมนูหมอกหาย** (สี่ชั้นซ้อน: `blur 64→22px`, วิชเน็ตต์เฉพาะมุมแทนเต็มจอ, กรอบ CRT 140→90px, พื้น 45→70%) · **changelog แบ่งชั้นมีสี** · **96 หัวข้อใหม่** ให้ 8 เวอร์ชัน · จัดวันใหม่ · แยก `src/game/changelog/` · ทำ README 10 ภาษใหม่ · **241 เทสต์** |
| [v1.1.6](docs/releases/v1.1.6.md) | 🟣 **PATCH** | 2026-11-10 | **ตั้งค่า 6 หมวด** (พรีเซ็ต · เสียง · ภาพ · ภาษา · สำรอง · ข้อมูล) · ความดัง 0–100 · ความแรงสั่น · คุณภาพภาพ · หยุดเมื่อสลับแท็บ · ย้ายภาษาเข้าตั้งค่า · พรีเซ็ต 4 แบบ · นำเข้า/ส่งออก JSON · เมนูหลายชั้นเคลื่อนไหว · การ์ดผู้สร้างไล่ระดับ · กักโฟกัสในโมดัล · แก้เพลงหลังรีโหลด · **150 เทสต์** |
| [v1.1.5](docs/releases/v1.1.5.md) | 🟣 **PATCH** | 2026-11-08 | **เมนูมุม GAME/INFO**（เล่น · เล่นต่อ · โหมด · อันดับ · ความสำเร็จ · ตั้งค่า / เกี่ยวกับ · Changelog · ออก）· **บันทึก & เล่นเกมค้างต่อ**（`locheo.run.v1`）· ตั้งค่าในเกม（เสียง/เพลง/สั่น/ลดแอนิเมชัน）· แก้คีย์ลัดทะลุโมดัล · prefers-reduced-motion ครบทุกตัว · **113 เทสต์** |
| [v1.1.4](docs/releases/v1.1.4.md) | 🟣 **PATCH** | 2026-11-06 | **9 โหมด** (เทศกาลคอมโบ · งานเลี้ยงใหญ่) · **16 ความสำเร็จ** · **7 ภาษา** (เพิ่ม ES/FR) · แก้ play-windows.bat (CRLF+BOM) · ตัวเปิด 7 ภาษา · 61 เทสต์ |
| [v1.1.3](docs/releases/v1.1.3.md) | 🟣 **PATCH** | 2026-11-04 | 7 โหมด (พายุผักดอง · เซรามิกบาง) · 14 ความสำเร็จ · 5 ภาษา · favicon · ตัวเปิดหลายภาษา · 55 เทสต์ |
| [v1.1.2](docs/releases/v1.1.2.md) | 🟣 **PATCH** | 2026-11-02 | 5 โหมด (60-Second Rush · Gold Rush) · 12 ความสำเร็จ · คอมโบไฟ · ตัวเปิดดับเบิลคลิก · README 10 ภาษา · 49 เทสต์ |
| [v1.1.1](docs/releases/v1.1.1.md) | 🟣 **PATCH** | 2026-10-31 | i18n ในเกม VI/EN/ZH · README 7 ภาษา · กวาดบั๊กทั้งหมด · 45 เทสต์ |
| [v1.1.0](docs/releases/v1.1.0.md) | 🟡 **UPDATE** | 2026-10-29 | 3 โหมด · เกราะกระเทียมทอง · หนอน · ผักทอง · 10 ความสำเร็จ · ฟอนต์โฮสเอง |
| [v1.0.0](docs/releases/v1.0.0.md) | 🩷 **MAJOR** | 2026-10-26 | รีลีสแรก: เอนจินครบ 11 วัตถุดิบ JAR SLAM ×9 คอมโบ |

ดูเพิ่มเติมที่ [CHANGELOG.md](CHANGELOG.md)

## 🗺️ แผนงาน (ร่าง — อาจปรับเปลี่ยนตามฟีดแบ็ก)

| ไมล์สโตน | ETA | ไอเดีย |
| --- | --- | --- |
| **v1.2.0** | 2026 Q1 | เพลงประกอบแบบ procedural ต่อโหมด · visual regression tests (Playwright) ใน CI · ลดขนาดฟอนต์ subset ให้ลึกขึ้นเพื่อลด bundle |
| **v1.3.0** | 2026 Q1–Q2 | โหมดที่ 10 (ตัวเลือก: **พายุแมลงวัน** — มีแต่แมลงวัน ต้องฟันรอด) · โหมด seed สำหรับ daily challenge |
| **v1.4.0** | 2026 Q2 | กระดานออนไลน์แบบ **opt-in** (serverless, เข้ารหัส) — offline-first ยังเป็นค่าเริ่มต้นเสมอ |
| Backlog | — | Ghost replay ของรอบที่ดีที่สุด · โหมดถ่ายภาพ (ซ่อน HUD ส่งออก PNG) · กำลังพิจารณา locale ไทย |

*แผนงานไม่ใช่คำสัญญา — ลำดับความสำคัญคือ: เสถียร → เล่นง่ายขึ้น → เนื้อหาเยอะขึ้น*

## 📚 เอกสารเพิ่มเติม & นักพัฒนา

บันทึกการออกแบบและเอกสารเชิงลึกสำหรับนักพัฒนา:

| Doc | What it covers |
| --- | --- |
| [docs/releases/v1.1.6.md](docs/releases/v1.1.6.md) | รีลีส v1.1.6 — ตั้งค่า 6 หมวด, พรีเซ็ต, สำรอง, เมนูหลายชั้น |
| [docs/releases/v1.1.5.md](docs/releases/v1.1.5.md) | รีลีส v1.1.5 — เมนูมุม, บันทึก/เล่นต่อ, ตั้งค่า, แก้บัก |
| [docs/design/menu-corners.md](docs/design/menu-corners.md) | ดีไซน์เมนูมุม GAME/INFO — หลักการ, a11y, responsive |
| [docs/design/save-format.md](docs/design/save-format.md) | Spec `locheo.run.v1` — snapshot ของเกมค้าง (schema + วงจรชีวิต) |
| [docs/design/settings-format.md](docs/design/settings-format.md) | Spec `locheo.settings.v1` — ตั้งค่าเกม (schema + wiring) |
| [docs/guides/troubleshooting.md](docs/guides/troubleshooting.md) | ปัญหาที่พบบ่อย — จอดำ · ไม่มีเสียง · เล่นต่อ · launcher |
| [scripts/smoke-ssr.tsx](scripts/smoke-ssr.tsx) | สโมกเทสต์การเรนเดอร์แบบ headless (ทั้งต้น menu/modal) |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | CI: npm ci → npm run check (Node 22) |

## 🤝 ร่วมพัฒนา

1. Fork repo แล้วแตก branch ตามรูปแบบ `arena/<name>` หรือ `feat/<name>`
2. `npm run check` ต้องเขียวก่อนเปิด PR (typecheck + 241 เทสต์ + build)
3. เลี่ยงการเพิ่ม dependency ตอน runtime ถ้าไม่จำเป็นจริง ๆ — ปรัชญา: **ไฟล์เดียว ไม่มีเน็ต เล่นได้ตลอดกาล**
4. ใน PR ระบุหน้าจอ/โหมดที่ได้รับผลกระทบ และแนบคลิปถ้ามีการเปลี่ยน gameplay

## 📄 สัญญาอนุญาต & ผู้สร้าง

<img src="assets/license.svg" alt="AGPL-3.0-only — สัญญาอนุญาต copyleft" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — ดู [LICENSE](LICENSE) และ [assets/license.svg](assets/license.svg)
- ฟอนต์: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (โฮสเองเป็น woff2 subsets)
- ขออุทิศให้ไหดองทุกใบบนสำรับข้าวเวียดนามทุกจาน — ชนแก้ว 🫙🇻🇳
