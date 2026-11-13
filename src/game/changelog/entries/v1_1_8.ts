import type { ChangelogEntry } from "../types";

/**
 * v1.1.8 — released 2026-11-14 — tier: PATCH
 *
 * Bản vá cuối cùng trước 1.2.0: sửa lỗi tràn bố cục màn hình bắt đầu (chữ CHÉO
 * và chú lọ bị cắt ngang), tách achievements thành 16 file, và đồng bộ toàn bộ
 * tài liệu sang 1.1.8.
 *
 * 12 bullets (vi) / 12 (en). Keep the two lists the same length:
 * tests/changelog-tiers.test.ts asserts it, and the panel would show an
 * uneven list otherwise.
 */
export const V1_1_8: ChangelogEntry = {
  version: "1.1.8",
  date: "2026-11-14",
  kind: "fix",
  vi: "Bản vá cuối trước 1.2.0 — màn hình bắt đầu hết tràn bố cục (chữ CHÉO và chú lọ không còn bị cắt), achievements tách thành 16 file, toàn bộ tài liệu đồng bộ 1.1.8",
  en: "The final patch before 1.2.0 — the start screen no longer overflows (the CHÉO wordmark and the mascot jar are whole again), achievements split into 16 files, every doc synced to 1.1.8",
  itemsVi: [
    "FIX BỐ CỤC: hàng panel GAME/INFO và ticker từng là flex sibling `shrink-0`, chiếm 415px + 55px trong cửa sổ 720px nên scene chỉ còn 250px — chữ CHÉO và chú lọ bị cắt ngang ở y≈247px; nay cả hai nổi trên scene, scene giữ đủ chiều cao",
    "FIX BỐ CỤC: scene tự giữ chỗ bằng `padding-bottom` đúng bằng chiều cao hàng nổi (338px hoặc 458px) nên nội dung không bao giờ chui xuống dưới panel",
    "FIX MASCOT: chú lọ hết bị cắt thân — nguyên nhân là scene 250px chứ không phải lỗi SVG; ảnh SVG giữ nguyên",
    "FIX TICKER: dải chạy chữ cao cố định 48px, dòng bản quyền `v1.1.8 · AGPL-3.0 · …` nằm cùng hàng với marquee thay vì xuống dòng thứ hai và bị mép dưới cắt",
    "FIX SCROLLBAR: thanh cuộn teal 8px từng vẽ đè lên tinh vân ở mép phải; scene nay ẩn scrollbar và giữ chỗ bằng padding",
    "FIX MOBILE: dưới 520px hai panel xếp dọc thay vì đè nhau — trước đó 208 + 224px không thể vừa màn hình 375px",
    "FIX CHIỀU CAO CHỮ: `CHÉO` từng chỉ co theo chiều rộng (`17vw`) nên cửa sổ thấp mà rộng làm glyph cao 168px, tràn khỏi scene; nay chặn thêm theo `20vh`",
    "MỚI `src/components/menu/layout/` — metrics + fit + test: `planMenuLayout()` trả về reserve/density/bố cục góc, và 22 test khoá phép cộng từng gây lỗi",
    "MỚI `src/components/menu/ticker/` — dải chạy chữ tách riêng, 14 chuỗi nguyên liệu + hàm `tickerTone()` thuần",
    "TÁCH `src/game/achievements/` — 16 thành tựu thành 16 file, mỗi file ghi rõ điều kiện mở khoá và lý do tồn tại; API công khai không đổi",
    "Chiều cao mỗi dòng menu giờ khai báo bằng custom property (`--menu-row-h`, `--menu-row-rich-h`) nên sáu dòng luôn là 268px hoặc 388px ở mọi ngôn ngữ, không còn phụ thuộc độ dài bản dịch",
    "MỚI `scripts/check-svg-text.mjs` — cổng thứ 9: đọc mọi chuỗi trong 16 SVG, đối chiếu con số với nguồn sự thật (286 test · 10 bản · 16 SVG · 8 lớp nền) và chặn sơ đồ trộn hai ngôn ngữ; ba quy tắc đều được kiểm chứng bằng cách phá file rồi chạy lại",
  ],
  itemsEn: [
    "LAYOUT FIX: the GAME/INFO corner row and the ticker were `shrink-0` flex siblings taking 415px + 55px of a 720px window, leaving the scene 250px — the CHÉO wordmark and the mascot jar were sliced at y≈247px; both now float over the scene, which keeps its full height",
    "LAYOUT FIX: the scene reserves the floating row's height with `padding-bottom` (338px or 458px), so content can never scroll underneath the panels",
    "MASCOT FIX: the jar is whole again — the cause was a 250px scene, not the SVG; the artwork itself is untouched",
    "TICKER FIX: the band is a fixed 48px strip and the `v1.1.8 · AGPL-3.0 · …` line sits inline with the marquee instead of wrapping into a second row that the bottom edge sliced",
    "SCROLLBAR FIX: an 8px teal scrollbar was painted over the nebula at the right edge; the scene now hides it and reserves space instead",
    "MOBILE FIX: below 520px the two panels stack instead of overlapping — 208 + 224px never fit a 375px screen",
    "TYPE-HEIGHT FIX: `CHÉO` was sized only by width (`17vw`), so a short-but-wide window produced 168px glyphs that overflowed the scene; it is now also capped against `20vh`",
    "NEW `src/components/menu/layout/` — metrics, fitting rules and their test: `planMenuLayout()` returns the reserve, the row density and the corner arrangement, and 22 tests pin the addition that used to overflow",
    "NEW `src/components/menu/ticker/` — the scrolling band as its own module, fourteen ingredient strings plus a pure `tickerTone()`",
    "SPLIT `src/game/achievements/` — sixteen achievements into sixteen files, each stating its unlock condition and its rationale; the public API is unchanged",
    "Menu row heights are declared as custom properties (`--menu-row-h`, `--menu-row-rich-h`), so six rows are always 268px or 388px in every language instead of depending on how long a translation runs",
    "NEW `scripts/check-svg-text.mjs` — the ninth gate: reads every string in the 16 SVGs, checks each stated count against its source of truth (286 tests · 10 releases · 16 SVGs · 8 background layers) and rejects a diagram that mixes two languages; each of its three rules verified by breaking a file and re-running",
  ],
};
