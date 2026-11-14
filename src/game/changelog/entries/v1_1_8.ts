import type { ChangelogEntry } from "../types";

/**
 * v1.1.8 — released 2026-11-12 — tier: PATCH
 *
 * Bản vá cuối cùng trước 1.2.0. Bốn lỗi trong ảnh chụp màn hình bắt nguồn từ
 * một phép cộng sai, và cả bốn đã được sửa bằng cách khai báo chiều cao thay
 * vì để nội dung tự quyết định.
 *
 * 31 bullets (vi) / 31 (en). Keep the two lists the same length:
 * tests/changelog-tiers.test.ts asserts it, and the panel would show an
 * uneven list otherwise.
 */
export const V1_1_8: ChangelogEntry = {
  version: "1.1.8",
  date: "2026-11-12",
  kind: "fix",
  vi: "Bản vá cuối trước 1.2.0 — màn hình bắt đầu hết tràn, dấu sắc của CHÉO được cứu, panel THÔNG TIN hết bị chia cắt, thanh cuộn biến mất, «Cách chơi» vào menu GAME và hero được trang trí",
  en: "The final patch before 1.2.0 — the start screen no longer overflows, the acute on CHÉO is preserved, the INFO panel stops spreading its rows, the scrollbar is gone, how-to-play moves into the GAME menu, and the hero is decorated",
  itemsVi: [
    "MENU KHÔNG CUỘN ĐƯỢC: hai vòng trước đều hỏi «giấu thanh cuộn thế nào», và chính câu hỏi đó sinh ra chuỗi lỗi — plan giữ sàn cứng 320px cho hero rồi *cho phép* cột cao hơn cửa sổ, nên mỗi lần sửa chỉ dời chỗ tràn đi. Nay bất biến là `scene + reserve === viewport.height` ở mọi viewport; khi không đủ chỗ, plan hạ cấp theo thứ tự: hàng 34 → 26px, bỏ ticker, bỏ footer, hero chỉ còn wordmark. `.menu-pane` dùng `overflow: clip` nên không tạo vùng cuộn nào",
    "FIX DẤU NẶNG `LỌ`: ba thứ đúng riêng lẻ cộng lại thành lỗi — `leading-[0.82]` làm hộp dòng ngắn hơn glyph nên dấu nặng thò ra ngoài, `-mt-1` trên CHÉO làm hai hộp chồng nhau ~14px, và `.text-shimmer::before` có `inset: -0.08em` nên dải vàng nhô lên đúng chỗ dấu nằm. Nay dải bắt đầu từ `top: 0`, `.wordmark-lo` giữ chỗ cho dấu trong hộp của nó — dấu không bị che vì hình học, không vì z-index",
    "DECK THAY DẢI ĐẾM: ba ô `9 · 14 · 16` bị bỏ (tagline ngay trên đã nói đúng ba con số đó); cùng hình dạng ba ô nay là chế độ đang chọn, thử thách hôm nay và luật chơi trong ngày",
    "THỬ THÁCH TÍNH THEO GIỜ ĐỊA PHƯƠNG: mốc UTC sẽ khiến thử thách đổi lúc 07:00 sáng ở Việt Nam, người chơi đọc thành «đổi hai lần hôm nay»; `mix()` thay phép chia lấy dư để chế độ không đi tuần tự, và tip xoay bằng bước nhảy 5 trên 6 ô nên cả sáu luật xuất hiện trước khi lặp",
    "THÊM `src/game/daily/` — `challenge.ts` · `tip.ts` · `index.ts`; 21 test (tách khỏi `menu/deck/` rồi xoá deck)",
    "XOÁ `src/components/menu/stage/` — dải đếm của vòng 2, theo yêu cầu bỏ chỗ chữ ở hình số 2",
    "FIX DẤU SẮC: `CHÉO` trong ảnh đọc thành `CHEO` — `.text-shimmer` vẽ gradient bằng `background-clip: text` + `color: transparent`, mà mask của cách đó dựng từ đường bao glyph nên dấu tổ hợp của `É` (E + U+0301) bị cắt mất; nay chữ tô vàng đặc, hiệu ứng chuyển sang lớp nền phía sau và `text-shadow`, dấu không thể rơi",
    "FIX PANEL THÔNG TIN: body panel dùng `justify-around` nên ba hàng INFO bị rải trên chiều cao dành cho bảy hàng — đúng câu «phần thông tin tự nhiên bị chia ra»; nay hàng xếp từ trên xuống và khoảng dư thuộc về một footer có chủ đích (GAME: tiến độ thành tựu · INFO: phiên bản + tầng)",
    "FIX THANH CUỘN: `.menu-scroll` từng có ba khối rule đánh nhau (`width: 8px`, rồi `width: 0`, rồi thumb màu ở cuối file thắng theo thứ tự nguồn) cộng một `::-webkit-scrollbar` toàn cục; nay thanh cuộn 0px ở cả ba engine nhưng vẫn cuộn được, còn rule toàn cục đổi thành `.game-scroll` để modal giữ thanh mảnh có style",
    "BỎ GỢI Ý ENTER: dòng «hoặc nhấn ENTER» dưới tagline bị gỡ — không có handler Enter nào trên màn hình bắt đầu (chỉ màn thua có), nên nhãn đó hứa một phím tắt không tồn tại",
    "LẤP KHOẢNG TRỐNG: `.menu-hero` đổi `min-height` thành `min-height` + `flex: 1 0 auto` nên hero nhận hết phần chiều cao còn lại thay vì để dư dưới tagline; thêm dải ba chỉ số (9 chế độ · 14 nguyên liệu · 16 thành tựu) lấy từ catalogue sống, ẩn dưới 640px",
    "NGÀY PHÁT HÀNH: chuỗi mười bản lùi 2 ngày để 1.1.8 rơi đúng 2026-11-12 thay vì một ngày trong tương lai — 24/10 · 27/10 · 29/10 · 31/10 · 02/11 · 04/11 · 06/11 · 08/11 · 10/11 · 12/11",
    "THÊM `src/components/menu/panel/` — `stat.ts` (kẹp 18/16 về 16/16, tier lấy từ `tierFor`) và `PanelStatStrip`; 12 test",
    "THÊM `src/components/menu/stage/` — `facts.ts` (ba số từ `MODE_LIST` · `KINDS` · `ACHIEVEMENTS`, `count()` chặn `NaN`) và `StageFacts`; 8 test",
    "FIX CUỘN: v1.1.7 lồng một khung `overflow-y-auto` bên trong cột flex và căn giữa nội dung bằng `min-h-full` + `justify-center` — khi nội dung cao hơn khung, phần đỉnh bị đẩy lên trên gốc cuộn nên `LỌ` không thể cuộn tới; nay cả màn hình chỉ còn MỘT vùng cuộn và nội dung neo ở đỉnh",
    "FIX BỐ CỤC: hàng panel góc và ticker từng là flex sibling `shrink-0` của hero, chiếm 415px + 55px trong cửa sổ 720px nên hero chỉ còn 250px; nay chúng là một khối `absolute inset-x-0 bottom-0` (MenuChrome) và hero tự giữ chỗ bằng `padding-bottom` do cùng một hàm tính ra",
    "FIX PANEL: `CornerPanel` tự cao bằng nội dung, nên chiều cao phụ thuộc độ dài bản dịch — tiếng Đức và tiếng Thái tràn trước tiếng Anh; nay chiều cao là tham số bắt buộc, bảy dòng luôn là 318px (gọn) hoặc 458px (đầy đủ) ở mọi ngôn ngữ",
    "FIX TICKER: dải chạy chữ cao cố định 48px, dòng bản quyền nằm cùng khối với marquee thay vì xuống dòng thứ hai và bị mép dưới cắt — đúng vệt cắt `V1.1.7 · AGPL-3.0 · …` trong ảnh",
    "FIX NÚT × LẠC: nút đóng của khung «Cách chơi» từng nổi giữa màn hình vì accordion chứa nó đã cuộn khỏi tầm nhìn; accordion được thay bằng modal nên không còn nút nào lạc chỗ",
    "CHUYỂN «CÁCH CHƠI» VÀO MENU GAME: sáu luật chơi và bảng phím không còn nằm trong hero (mở ra là đẩy chữ LỌ khỏi màn hình) mà thành một hàng trong panel GAME, mở ra modal — bố cục không nhúc nhích",
    "CHỮ LỌ CHÉO: đặt giữa hero rồi nhấc lên một chút theo đúng yêu cầu, cỡ chữ chặn cả theo chiều rộng lẫn chiều cao nên cửa sổ thấp không còn làm glyph tràn",
    "TRANG TRÍ HERO: 14 món trang trí (sao, tia, vòng, bong bóng, ớt, lá chanh, ruồi, giọt mắm) rải thành hai dải trên và dưới chữ, mỗi món một tốc độ và độ trễ riêng; toạ độ là dữ liệu trong `scene/decor.ts` nên kiểm được bằng test",
    "HALO QUANH CHÚ LỌ: một vòng xoay 14s đọc thành spinner nên thay bằng ba vòng 18s/26s/34s (gần như không bao giờ trùng pha) cộng một quầng sáng thở chậm phía sau",
    "MỚI `src/components/menu/layout/` — `metrics.ts` (mọi con số), `fit.ts` (`planMenuLayout()` thuần), `useMenuPlan()` (đọc cửa sổ thật, gộp resize vào một animation frame); 32 test khoá phép cộng",
    "MỚI `src/components/menu/scene/` — `decor.ts` (bộ trang trí + kiểm va chạm), `DecorGlyph.tsx` (tám hình vẽ tay), `HeroDecor.tsx`, `JarHalo.tsx`; 12 test",
    "MỚI `src/components/menu/ticker/` — dải chạy chữ tách thành module riêng: 14 chuỗi + `tickerTone()` thuần; 8 test",
    "Thêm 2 i18n key (`game.howtoHint`, `howto.goal`) cho cả 7 locale — 304 key, parity nguyên vẹn; test tăng từ 286 lên 308 trên 36 file",
    "Đồng bộ toàn bộ 10 README, docs, SVG và launcher sang 1.1.8; thêm `docs/releases/v1.1.8.md`",
    "XOÁ DẢI VÀNG SAU `CHÉO`: `.text-shimmer::before` là một gradient đặt sau chữ — mà gradient thì không phải hình dạng, nó là một cái hộp tô màu, nên trên màn hình nó hiện ra đúng như cái hộp («cái phần vuông vuông xung quanh chữ chéo»). Đã xoá pseudo-element, `@keyframes lc-shimmer-sweep` và 869 ký tự comment mô tả nó; còn lại vàng đặc + `text-shadow`, và `lc-gold-breathe` vẫn động vì bóng không có mép",
    "`CHÉO` KHÔNG CÒN TO HƠN `LỌ`: cỡ cũ là hai con số đặt độc lập (89.6px và 128px ở 1280px — từ ngắn hơn lại bằng 1.43 lần từ dài hơn, sáu glyph tràn lên đè `LỌ`); nay `CHÉO` suy ra từ `LỌ` qua một tỉ lệ khai báo, và test quét từng pixel từ 320 đến 3840 đòi tỉ lệ < 1 ở mọi điểm — gồm 320–375px, chỗ test cũ bỏ qua và chỗ sàn 2.9rem cũ làm `CHÉO` lớn hơn 12%",
    "LỖI TÌM THẤY KHI TÁCH MODULE: `isModeId(\"toString\")` trả về true (`in` đi qua prototype chain) nên một save sửa tay thành `{\"mode\":\"constructor\"}` lọt qua `runSave.ts` và engine nhận `Object` thay cho mode record; `metaFor()` và `t()` dính đúng lỗi đó — `t(\"toString\")` trả về một hàm, và ném TypeError khi có params",
  ],
  itemsEn: [
    "THE MENU CANNOT SCROLL: rounds 1 and 2 both asked «how do we hide the scrollbar», and that question is what produced the sequence of bugs — the plan kept a hard 320px floor on the hero and *allowed* the column to be taller than the window, so each fix only moved the overflow. The invariant is now `scene + reserve === viewport.height` for every viewport; when there is not enough room the plan steps down in a fixed order: rows 34 → 26px, drop the ticker, drop the footer, wordmark-only hero. `.menu-pane` uses `overflow: clip`, so it creates no scroll container at all",
    "THE NẶNG UNDER `LỌ`: three things that are each correct add up to the bug — `leading-[0.82]` makes the line box shorter than its glyphs so the dot hangs outside, `-mt-1` on CHÉO overlaps the two boxes by ~14px, and `.text-shimmer::before` had `inset: -0.08em` so the gold band grew into exactly that gap. The band now starts at `top: 0` and `.wordmark-lo` keeps the descender inside its own box — the accent survives by geometry, not by z-index",
    "DECK REPLACES THE COUNTERS: the `9 · 14 · 16` strip is gone (the tagline one paragraph above already states all three); the same three-cell shape now shows the current mode, today's challenge and the rule of the day",
    "THE CHALLENGE USES LOCAL TIME: a UTC boundary would flip it at 07:00 in Vietnam and read as «it changed twice today»; `mix()` replaces the modulo so modes do not walk in order, and the tip uses stride 5 over 6 so all six rules appear before any repeat",
    "NEW `src/game/daily/` — `challenge.ts` · `tip.ts` · `index.ts`; 21 tests (deck removed, date maths kept)",
    "REMOVED `src/components/menu/stage/` — the round-2 counters, per the request to drop the text in the second screenshot",
    "ACCENT FIX: `CHÉO` read as `CHEO` in the report — `.text-shimmer` painted with `background-clip: text` + `color: transparent`, and that mask is built from the glyph outline, so the composed mark of `É` (E + U+0301) was clipped away; the word is now solid gold, the sweep moved to a background layer and a `text-shadow`, and an accent cannot drop out of a text colour",
    "INFO PANEL FIX: the panel body used `justify-around`, so its three rows were spread over a height sized for seven — the report's «phần thông tin tự nhiên bị chia ra»; rows now stack from the top and the leftover belongs to one deliberate footer (GAME: achievement progress · INFO: version + tier)",
    "SCROLLBAR FIX: `.menu-scroll` had three competing rule blocks (`width: 8px`, then `width: 0`, then a coloured thumb later in the file that won on source order) plus a universal `::-webkit-scrollbar`; the bar is now 0px in all three engines while scrolling still works, and the universal rule became `.game-scroll` so modals keep their thin branded bar",
    "ENTER HINT REMOVED: the «hoặc nhấn ENTER» line under the tagline is gone — nothing on the start screen ever listened for Enter (only the game-over screen does), so the label promised a shortcut that did not exist",
    "DEAD SPACE FILLED: `.menu-hero` went from `min-height` to `min-height` + `flex: 1 0 auto`, so the hero takes the rest of the column instead of pooling emptiness under the tagline; a three-fact strip (9 modes · 14 ingredients · 16 achievements) sits there, read from the live catalogue and hidden below 640px",
    "RELEASE DATES: the ten-release sequence moved back two days so 1.1.8 lands on 2026-11-12 instead of a future date — 10-24 · 10-27 · 10-29 · 10-31 · 11-02 · 11-04 · 11-06 · 11-08 · 11-10 · 11-12",
    "NEW `src/components/menu/panel/` — `stat.ts` (clamps 18/16 down to 16/16, tier from `tierFor`) and `PanelStatStrip`; 12 tests",
    "NEW `src/components/menu/stage/` — `facts.ts` (three numbers from `MODE_LIST` · `KINDS` · `ACHIEVEMENTS`, with `count()` guarding `NaN`) and `StageFacts`; 8 tests",
    "SCROLL FIX: v1.1.7 nested an `overflow-y-auto` box inside a flex column and centred its content with `min-h-full` + `justify-center` — once the content was taller than the box its top sat above the scroll origin, so `LỌ` could not be reached by scrolling at all; the whole screen is now ONE scroll container with its content anchored to the top",
    "LAYOUT FIX: the corner row and the ticker were `shrink-0` flex siblings of the hero, taking 415px + 55px of a 720px window and leaving the hero 250px; they are now one absolutely-positioned band (MenuChrome) and the hero reserves their height with a `padding-bottom` computed by the same function",
    "PANEL FIX: `CornerPanel` used to be as tall as its contents, so its height depended on how long the translation ran — German and Thai overflowed before English did; the height is now a required argument, and seven rows are always 318px (compact) or 458px (rich) in every language",
    "TICKER FIX: a fixed 48px strip, with the copyright line inside the same block as the marquee instead of wrapping into a second row that the bottom edge sliced — the `V1.1.7 · AGPL-3.0 · …` cut visible in the screenshot",
    "STRAY × FIX: the close button of the «How to play» accordion floated in the middle of the screen because the accordion holding it had scrolled out of view; the accordion is a modal now, so nothing is left floating",
    "HOW-TO MOVED INTO THE GAME MENU: the six rules and the control legend no longer live in the hero (opening them pushed the wordmark off the screen) — they are a row in the GAME panel that opens a modal, and the layout does not move",
    "WORDMARK: centred in the hero and lifted a little, as asked, with its size capped against both width and height so a short window cannot overflow the glyph",
    "HERO DECORATION: fourteen items (stars, sparks, rings, bubbles, chilies, lime leaves, flies, fish-sauce drops) in two bands above and below the title, each on its own duration and delay; the coordinates are data in `scene/decor.ts`, so they can be tested",
    "JAR HALO: one 14s ring read as a spinner, so it is replaced by three rings on 18s/26s/34s (which almost never coincide) plus a slow breathing glow behind the ceramic",
    "NEW `src/components/menu/layout/` — `metrics.ts` (every declared height), `fit.ts` (pure `planMenuLayout()`), `useMenuPlan()` (reads the real viewport, coalesces resizes into one animation frame); 32 tests pin the arithmetic",
    "NEW `src/components/menu/scene/` — `decor.ts` (the decoration set plus collision checks), `DecorGlyph.tsx` (eight hand-drawn glyphs), `HeroDecor.tsx`, `JarHalo.tsx`; 12 tests",
    "NEW `src/components/menu/ticker/` — the strip as its own module: fourteen strings plus a pure `tickerTone()`; 8 tests",
    "Two new i18n keys (`game.howtoHint`, `howto.goal`) across all seven locales — 304 keys, parity intact; the suite grows from 286 to 308 across 36 files",
    "All ten READMEs, the docs, the SVGs and the launchers synced to 1.1.8; `docs/releases/v1.1.8.md` added",
    "THE GOLD BAND BEHIND `CHÉO` IS GONE: `.text-shimmer::before` was a gradient placed behind the word — and a gradient is not a shape, it is a coloured box, so on screen it read as exactly that («a little square around the word»). The pseudo-element, `@keyframes lc-shimmer-sweep` and 869 characters of comment describing it are deleted; what is left is a solid gold fill plus `text-shadow`, and `lc-gold-breathe` still moves because a shadow has no edge",
    "`CHÉO` IS NO LONGER LARGER THAN `LỌ`: the two sizes were independent numbers (89.6px and 128px at 1280px — the shorter word 1.43× the longer one, its six glyphs spilling up over `LỌ`); `CHÉO` now derives from `LỌ` through one declared ratio, and the test sweeps every pixel from 320 to 3840 demanding a ratio below 1 everywhere — including 320–375px, which the old breakpoint list skipped and where the old 2.9rem floor made `CHÉO` 12% larger",
    "BUGS FOUND WHILE SPLITTING THE MODULE: `isModeId(\"toString\")` returned true (`in` walks the prototype chain), so a hand-edited save saying `{\"mode\":\"constructor\"}` passed normalisation in `runSave.ts` and the engine received `Object` instead of a mode record; `metaFor()` and `t()` had the same bug — `t(\"toString\")` handed back a function, and threw a TypeError when called with params",
  ],
};
