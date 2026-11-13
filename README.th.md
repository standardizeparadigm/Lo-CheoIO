<div align="center">

<img src="assets/banner.svg" alt="Lọ Chéo — Pickled Jar Showdown" width="100%" />

# LỌ CHÉO — PICKLED JAR SHOWDOWN

### 🫙 เกมอะเคดปีเคิลสัญชาติเวียดนามที่เล่นได้ 100% บนเบราว์เซอร์ — ไฟล์ HTML ไฟล์เดียวจบ ออฟไลน์ได้ทันที
### 🌐 อินเทอร์เฟซในเกม 7 ภาษา — Tiếng Việt · English · 中文 · 日本語 · 한국어 · Español · Français

[🇻🇳 Tiếng Việt](README.md) · [🇬🇧 English](README.en.md) · [🇨🇳 中文](README.zh.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇪🇸 Español](README.es.md) · [🇫🇷 Français](README.fr.md) · [🇹🇭 ไทย](README.th.md) · [🇩🇪 Deutsch](README.de.md) · [🇵🇹 Português](README.pt.md)

[![Version](https://img.shields.io/badge/version-1.1.8-f5a81c.svg?style=for-the-badge&logo=semver&logoColor=black)](docs/releases/v1.1.8.md)
[![Tier](https://img.shields.io/badge/tier-PATCH%20%C2%B7%20violet-9d6bff.svg?style=for-the-badge)]
[![Tests](https://img.shields.io/badge/tests-286%20%C2%B7%2035%20files-2bb48c.svg?style=for-the-badge&logo=vitest&logoColor=white)]
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

## 🆕 มีอะไรใหม่ใน v1.1.8

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

<img src="assets/layout-fix.svg" alt="เทียบเลย์เอาต์ v1.1.7 กับ v1.1.8 — ฉาก 250px ที่ถูกตัด เทียบกับฉาก 382px + reserve 338px พร้อม chrome ลอย (แอนิเมชัน SMIL)" width="100%" />

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

### 🧪 เทสต์ใหม่ 30 รายการล็อกไว้

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

→ รายละเอียดเต็ม: [docs/releases/v1.1.8.md](docs/releases/v1.1.8.md) · ก่อนหน้า: [docs/releases/v1.1.7.md](docs/releases/v1.1.7.md)

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
| 🧪 **คุณภาพ** | 286 เทสต์ (vitest) ครอบคลุม modes / achievements / storage / i18n / settings — `npm run check` คือประตู CI |

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
npm run test       # vitest — 286 เทสต์ (modes / achievements / storage / i18n / settings)
npm run check      # typecheck + test + build (ประตูคุณภาพ CI)
```

## 🗂️ โครงสร้างโปรเจกต์

```
lo-cheoio/
├─ index.html              # entry, SEO/OG meta (ไม่มี CDN)
├─ package.json            # lo-cheoio v1.1.8, สคริปต์ dev/build/test/check
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
│  ├─ corner-menu.svg      # corner GAME/INFO panels (SMIL animation)
│  ├─ settings-sections.svg # 6-section settings tour (SMIL, v1.1.6)
│  ├─ palette-ribbon.svg   # 7-slice palette ribbon, sheen sweep (SMIL, v1.1.7)
│  ├─ architecture.svg     # architecture + data flow diagram (SMIL, v1.1.7)
│  ├─ release-tiers.svg    # 3 tiers + 10-release timeline (SMIL, v1.1.7)
│  ├─ layout-fix.svg       # v1.1.7 vs v1.1.8 layout, side by side (SMIL, v1.1.8)
│  ├─ test-matrix.svg      # 8 gates · 286 tests · distribution (SMIL, v1.1.8)
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
│     ├─ v1.1.7.md         # release notes (1.1.7)
│     └─ v1.1.8.md         # current release notes (1.1.8)
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
│  │  │  ├─ background/     # 8 background layers as data (v1.1.7)
│  │  │  ├─ layout/         # metrics · fit · planMenuLayout, 22 tests (v1.1.8)
│  │  │  └─ ticker/         # bottom ticker band, 14 strings (v1.1.8)
│  │  ├─ ModeSelector.tsx  # การ์ด 9 โหมด (classic/zen/inferno/blitz/goldrush/storm/hardcore · combo · feast)
│  │  ├─ AchievementsPanel.tsx  # กำแพงป้าย locked/unlocked
│  │  ├─ GameOverScreen.tsx     # ไหแตก! + คะแนน + ความสำเร็จใหม่
│  │  ├─ PauseScreen.tsx        # หยุดชั่วคราว + สถิติรอบนี้
│  │  ├─ settings/           # โมดูลตั้งค่า 6 หมวด + คอนโทรล (v1.1.6)
│  │  └─ ui/               # แปดพรีมิทีฟ ไฟล์ละตัว (v1.1.7 — แยกจาก ui.tsx)
│  ├─ game/
│  │  ├─ engine.ts         # การจำลอง + เรนเดอร์ canvas ทั้งหมด (ราว 2260 บรรทัด)
│  │  ├─ modeTypes.ts      # ModeId · ModeConfig (types-only, v1.1.7)
│  │  ├─ modes/            # 9 balance records — classic.ts … feast.ts (v1.1.7)
│  │  ├─ modesIndex.ts     # MODES · MODE_LIST · isModeId (v1.1.7)
│  │  ├─ modeMath.ts       # multiplierForCombo · jarBonus · comboWindowFor… (v1.1.7)
│  │  ├─ modes.ts          # barrel — keeps every old import working
│  │  ├─ achievements/      # 16 ป้าย + ตัวตรวจ (pure, v1.1.8)
│  │  │  └─ defs/           # one file per achievement
│  │  ├─ storage.ts        # localStorage: top 8, progress, achievements
│  │  ├─ audio.ts          # Web Audio synth: sfx + เพลง pentatonic
│  │  ├─ changelog/          # in-game changelog (v1.1.7 — split from one file)
│  │  │  ├─ types.ts        #   ChangelogEntry · ReleaseTier · copyFor()
│  │  │  ├─ tiers.ts        #   tierFor() · TIER_ORDER · TIER_LABEL_KEY
│  │  │  ├─ entries/        #   1 file per release — v1_0_0.ts … v1_1_8.ts
│  │  │  └─ index.ts        #   ordered list + 5 helpers
│  │  ├─ runSave.ts         # บันทึกเกมที่ค้างไว้
│  │  ├─ settings.ts        # สคีมาตั้งค่า ค่าเริ่มต้น normalize
│  │  ├─ settingsIO.ts      # โคเดกสำรอง/กู้คืน (v1.1.6)
│  │  ├─ settingsPresets.ts # พรีเซ็ตเร็ว 4 แบบ (v1.1.6)
│  │  └─ audioLevels.ts     # คำนวณเกนล้วน (v1.1.6)
│  └─ utils/
│     ├─ cn.ts             # clsx + tailwind-merge
│     └─ useFocusTrap.ts   # กักโฟกัสในโมดัล (v1.1.6)
└─ tests/                  # vitest — 35 ไฟล์ · 286 เทสต์ (modes · achievements · storage · i18n · runSave · settings · presets · audio…)
```

## 🧱 สถาปัตยกรรม & ประสิทธิภาพ
<img src="assets/architecture.svg" alt="สถาปัตยกรรม Lọ Chéo v1.1.8 — อินพุต → เอนจิน → สถานะ → เรนเดอร์ พร้อมชั้นบริการ (แอนิเมชัน SMIL)" width="100%" />


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

<img src="assets/release-tiers.svg" alt="Three tiers MAJOR/UPDATE/PATCH with their colours and a ten-release timeline (SMIL animation)" width="100%" />

<img src="assets/test-matrix.svg" alt="เมทริกซ์เทสต์ v1.1.8 — แปดด่านผ่าน 286 เทสต์ใน 35 ไฟล์ แบ่งตามหมวด (แอนิเมชัน SMIL)" width="100%" />

## 📦 รีลีส & เช็งต์ล็อก

| เวอร์ชัน | Tier | วันที่ | บันทึก |
| --- | --- | --- | --- |
| [v1.1.8](docs/releases/v1.1.8.md) | 🟣 **PATCH** | 2026-11-14 | **หน้าเริ่มเกมไม่ล้นอีก** (chrome ออกจากโฟลว์ flex: ฉาก `250px → 382px` โลโก้และหม้อสมบูรณ์) · **ticker สูงคงที่ 48px** · **ซ่อนแถบเลื่อน** · **เรียงแผงแนวตั้งบนมือถือ** · **`menu/layout/` + `menu/ticker/` + `achievements/` 16 ไฟล์** · **เทสต์ใหม่ 30 รายการ** · ซิงก์ทั้งหมดเป็น 1.1.8 · **286 เทสต์** |
| [v1.1.7](docs/releases/v1.1.7.md) | 🟣 **PATCH** | 2026-11-12 | **พื้นหลังเมนูหมอกหาย** (สี่ชั้นซ้อน: `blur 64→22px`, วิชเน็ตต์เฉพาะมุมแทนเต็มจอ, กรอบ CRT 140→90px, พื้น 45→70%) · **changelog แบ่งชั้นมีสี** · **96 หัวข้อใหม่** ให้ 8 เวอร์ชัน · จัดวันใหม่ · แยก `src/game/changelog/` · ทำ README 10 ภาษใหม่ · **286 เทสต์** |
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
2. `npm run check` ต้องเขียวก่อนเปิด PR (typecheck + 286 เทสต์ + build)
3. เลี่ยงการเพิ่ม dependency ตอน runtime ถ้าไม่จำเป็นจริง ๆ — ปรัชญา: **ไฟล์เดียว ไม่มีเน็ต เล่นได้ตลอดกาล**
4. ใน PR ระบุหน้าจอ/โหมดที่ได้รับผลกระทบ และแนบคลิปถ้ามีการเปลี่ยน gameplay

## 📄 สัญญาอนุญาต & ผู้สร้าง

<img src="assets/license.svg" alt="AGPL-3.0-only — สัญญาอนุญาต copyleft" width="400" />

- **AGPL-3.0-only** © 2026 [Standardize Paradigm](mailto:standardizeparadigm@donuco.com) — ดู [LICENSE](LICENSE) และ [assets/license.svg](assets/license.svg)
- ฟอนต์: [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) & [Bungee](https://fonts.google.com/specimen/Bungee) — SIL Open Font License 1.1 (โฮสเองเป็น woff2 subsets)
- ขออุทิศให้ไหดองทุกใบบนสำรับข้าวเวียดนามทุกจาน — ชนแก้ว 🫙🇻🇳
