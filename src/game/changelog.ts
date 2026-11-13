/**
 * Structured changelog for the in-game CHANGELOG panel.
 *
 * v1.1.7: `kind` is now a *release tier* rather than an arbitrary label, and
 * every historical entry carries real bullet lists instead of a one-liner.
 *
 *   major — a big feature wave (new game modes, a rebuilt subsystem)
 *   minor — a content/UX upgrade (the tag renders as UPDATE)
 *   patch — fixes, polish, docs, build work (the tag renders as PATCH)
 *
 * The tier is derived from SemVer in `tierFor()` so it can never disagree with
 * the version string above it — see tests/changelog-tiers.test.ts.
 */

/** SemVer-derived release tier. */
export type ReleaseTier = "major" | "minor" | "patch";

/** Historic `kind` values… */
export type LegacyKind = "feature" | "fix" | "polish";

export interface ChangelogEntry {
  version: string;
  /** ISO-8601 date */
  date: string;
  /**
   * @deprecated v1.1.7 — kept so old call sites keep compiling; the UI now
   * reads `tierFor(entry.version)`. Never render this directly.
   */
  kind: LegacyKind;
  vi: string;
  en: string;
  itemsVi: readonly string[];
  itemsEn: readonly string[];
}

/**
 * The tier implied by a SemVer string.
 *   1.0.0 / 2.0.0 → major
 *   1.1.0 / 1.2.0 → minor
 *   1.1.6 / 1.1.7 → patch
 */
export function tierFor(version: string): ReleaseTier {
  const parts = version.split(".").map((n) => Number.parseInt(n, 10));
  const [major, minor, patch] = parts;
  if (!Number.isFinite(major)) return "patch";
  if (!Number.isFinite(minor)) return "patch";
  if (!Number.isFinite(patch)) return "patch";
  if (patch !== 0) return "patch";
  if (minor !== 0) return "minor";
  return "major";
}

export const CHANGELOG_ENTRIES: readonly ChangelogEntry[] = [
  {
    version: "1.1.7",
    date: "2026-11-12",
    kind: "fix",
    vi: "Bản vá cuối trước 1.2.0 — nền menu hết mờ, changelog có tầng bản phát hành và mô tả đầy đủ cho cả 8 bản cũ, README làm mới toàn bộ",
    en: "The last patch before 1.2.0 — the foggy menu background is gone, the changelog gains release tiers and full descriptions for all 8 older releases, every README rebuilt",
    itemsVi: [
      "FIX NỀN MENU: ba lớp phủ chồng nhau biến cả scene thành một mảng xám — tinh vân blur 64px→22px và hạ đỉnh xuống 0.80, vignette toàn màn hình 0.42/0.88/1.0 → vignette góc 0.30/0.62, khung CRT 140px@0.9 → 90px@0.55",
      "FIX NỀN MENU: sàn gạch nâng từ 45% lên 70% opacity — dưới vignette cũ thì sàn gần như vô hình",
      "CHANGELOG: tag phiên bản theo tầng SemVer — PATCH màu tím, UPDATE màu vàng, MAJOR màu hồng; tầng suy ra từ chính số phiên bản nên không thể lệch",
      "CHANGELOG: cả 8 bản cũ (1.0.0 → 1.1.6) có danh sách thay đổi thật thay vì một dòng tóm tắt",
      "CHANGELOG: thêm thanh lọc theo tầng (TẤT CẢ · MAJOR · UPDATE · PATCH) kèm số bản mỗi tầng",
      "Ngày phát hành cả 9 bản được xếp lại thành một dòng thời gian liền mạch, không còn hai bản trùng ngày",
      "README: dải màu động theo palette, sơ đồ kiến trúc SVG, bảng so sánh 8 bản phát hành, mục kiểm chứng chất lượng",
      "Thêm tests/changelog-tiers.test.ts — khoá tầng SemVer, độ dài mô tả tối thiểu và tính duy nhất của từng gạch đầu dòng",
      "Dọn dẹp: bỏ `kind` khỏi đường render, giữ lại dưới dạng @deprecated để không phá call site cũ",
    ],
    itemsEn: [
      "MENU BACKGROUND FIX: three stacked overlays turned the whole scene into grey mush — nebula blur 64px→22px with peaks cut to 0.80, full-screen vignette 0.42/0.88/1.0 → corner vignette 0.30/0.62, CRT frame 140px@0.9 → 90px@0.55",
      "MENU BACKGROUND FIX: tile floor raised from 45% to 70% opacity — under the old vignette the floor was effectively invisible",
      "CHANGELOG: SemVer-tiered version tags — PATCH in violet, UPDATE in gold, MAJOR in pink; the tier is derived from the version string so it cannot drift",
      "CHANGELOG: all 8 older releases (1.0.0 → 1.1.6) now carry real change lists instead of a one-line summary",
      "CHANGELOG: tier filter (ALL · MAJOR · UPDATE · PATCH) with per-tier release counts",
      "All 9 release dates re-sequenced into one unbroken timeline — no two releases share a day any more",
      "README: animated palette ribbon, an SVG architecture map, an eight-release comparison table and a quality-gate section",
      "New tests/changelog-tiers.test.ts — locks the SemVer tier mapping, a minimum description length and bullet uniqueness",
      "Cleanup: `kind` is no longer read on the render path; it stays as @deprecated so older call sites keep compiling",
    ],
  },
  {
    version: "1.1.6",
    date: "2026-11-10",
    kind: "feature",
    vi: "Đại tu cài đặt thành 6 mục, ngôn ngữ dời hẳn vào Settings, nền menu nhiều lớp, 11 lỗi thật được sửa",
    en: "Settings rebuilt into six sections, language moved into Settings, a layered menu scene and eleven real fixes",
    itemsVi: [
      "Cài đặt chia 6 mục: Cấu hình nhanh · Âm thanh · Giao diện & chuyển động · Ngôn ngữ · Sao lưu · Dữ liệu",
      "Ba kiểu điều khiển trong một hộp thoại: công tắc bật/tắt, bộ chọn 2 lựa chọn, mức 0–100 với thanh 10 vạch nghiêng",
      "Âm lượng thật cho SFX và nhạc (0–100), áp dụng ngay không cần tải lại",
      "Mức rung nhẹ/mạnh (45% và 100% chấn động) và chất lượng hình thấp/cao (trần hạt 230 vs 460, tắt phát sáng)",
      "Tự tạm dừng khi đổi tab — bật/tắt được, mất focus là ván tự dừng",
      "4 preset một chạm: MƯỢT · CÂN BẰNG · ĐIỆN ẢNH · SPEEDRUN — không bao giờ đổi ngôn ngữ; lệch một mục là nhãn tự chuyển TUỲ CHỈNH",
      "Xuất/nhập cấu hình bằng JSON để mang cài đặt sang máy khác",
      "Ngôn ngữ dời hẳn vào Cài đặt — bỏ nút nổi góc phải ở menu và thanh chọn ở màn tạm dừng",
      "Nền menu nhiều lớp: tinh vân trôi, tia sáng thở, hai lớp sao nhấp nháy, vòng sáng xoay quanh lọ, vệt sáng chạy qua nút CHƠI",
      "Mục giới thiệu tác giả: viền gradient chạy vòng liên tục + quầng sáng xoay quanh logo",
      "FIX: nhạc nền sau khi tải lại trang phát to hơn mức đã đặt (bus nhạc mở ở 0.5 cố định)",
      "FIX: Tab không còn thoát ra khỏi modal đang mở; focus được giữ trong hộp thoại và trả lại khi đóng",
      "FIX: gợi ý changelog ở menu ghi cứng v1.1.5 thay vì đọc phiên bản hiện tại",
      "FIX: nút Xuất báo “đã copy” dù clipboard trống; toggle tự về mặc định khi storage bị chặn; âm thanh tự bật lại sau reload",
      "222 unit tests / 29 file — thêm 6 module thuần: safeStorage · palette · spawn · math · time · clipboard",
    ],
    itemsEn: [
      "Settings rebuilt into six sections: Quick presets · Audio · Display & motion · Language · Backup · Data",
      "Three control types in one dialog: on/off switches, two-way pickers, 0–100 levels with a ten-segment bar",
      "Real loudness for SFX and music (0–100), applied live without a reload",
      "Shake level low/high (45% and 100% of the trauma) and visual quality low/high (230 vs 460 particles, glow off)",
      "Auto-pause on tab switch — toggleable; losing focus suspends the run",
      "Four one-tap presets: SMOOTH · BALANCED · CINEMATIC · SPEEDRUN — never touching your language; tweak anything and the badge flips to CUSTOM",
      "Export/import the configuration as JSON to carry it between machines",
      "Language moved all the way into Settings — the floating corner switcher and the pause-screen row are gone",
      "Layered menu scene: drifting nebulae, a breathing light ray, two twinkling starfields, a rotating ring around the jar, a shine sweep across PLAY",
      "Author card: a perpetually panning gradient border plus a rotating halo around the logo",
      "FIX: music played louder than configured after a reload (the music bus opened at a flat 0.5)",
      "FIX: Tab can no longer escape an open modal; focus is trapped and restored on close",
      "FIX: the menu changelog hint was hardcoded to v1.1.5 instead of reading the current version",
      "FIX: export claimed “copied” with an empty clipboard; toggles reverted when storage was blocked; sound turned itself back on after a reload",
      "222 unit tests / 29 files — six new pure modules: safeStorage · palette · spawn · math · time · clipboard",
    ],
  },
  {
    version: "1.1.5",
    date: "2026-11-08",
    kind: "feature",
    vi: "Menu góc GAME/INFO, chế độ chọn riêng, lưu & chơi tiếp ván dở, cài đặt ngay trong game",
    en: "Corner GAME/INFO panels, a dedicated mode picker, save & resume, in-game settings",
    itemsVi: [
      "Menu chính gọn lại thành hai panel góc: GAME (dưới-trái) và INFO (dưới-phải)",
      "Panel GAME: Chơi · Chơi tiếp · Chế độ · Bảng xếp hạng · Thành tựu · Cài đặt",
      "Panel INFO: Giới thiệu tác giả · Changelog · Thoát",
      "Thêm nút «Chơi tiếp» — snapshot ván dở vào locheo.run.v1, khôi phục nguyên điểm/hũ/combo/cấp",
      "«Chơi tiếp» chỉ bật khi thật sự có ván đang dở, kèm gợi ý chế độ và điểm hiện tại",
      "Chế độ chơi dồn vào màn chọn riêng thay vì chiếm chỗ trên hero",
      "Cài đặt trong game: âm thanh, nhạc nền, rung màn hình, giảm chuyển động — áp dụng ngay",
      "FIX: prefers-reduced-motion còn thiếu trong CSS — giờ tôn trọng cài đặt của hệ điều hành",
      "FIX: chữ trong modal bị cắt khi cửa sổ thấp — modal giới hạn 86vh và tự cuộn",
      "Bộ icon SVG tự vẽ: 9 icon stroke nhất quán cho panel góc",
      "113 unit tests / 14 file",
    ],
    itemsEn: [
      "The main menu collapsed into two corner panels: GAME (bottom-left) and INFO (bottom-right)",
      "GAME panel: Play · Continue · Modes · Leaderboard · Achievements · Settings",
      "INFO panel: About the author · Changelog · Quit",
      "New “Continue” button — a suspended run is snapshotted into locheo.run.v1, restoring score/jars/combo/level as-is",
      "“Continue” only lights up when a suspended run actually exists, with a hint showing its mode and score",
      "Game modes moved into their own picker instead of taking over the hero area",
      "In-game settings: SFX, music, screen shake, reduced motion — applied instantly",
      "FIX: prefers-reduced-motion was missing from CSS — the OS setting is honoured now",
      "FIX: modal text was clipped at short window heights — modals cap at 86vh and scroll",
      "Hand-drawn SVG icon set: nine stroke-consistent icons for the corner panels",
      "113 unit tests / 14 files",
    ],
  },
  {
    version: "1.1.4",
    date: "2026-11-06",
    kind: "feature",
    vi: "Hai chế độ mới (Lễ Hội Combo · Đại Tiệc Dưa), đủ 16 thành tựu, thêm tiếng Tây Ban Nha và Pháp",
    en: "Two new modes (Combo Festival · Grand Feast), sixteen achievements, Spanish and French added",
    itemsVi: [
      "Chế độ mới «Lễ Hội Combo» — cửa sổ combo dài gấp đôi, thưởng chuỗi liên tục, dành cho ai thích giữ nhịp",
      "Chế độ mới «Đại Tiệc Dưa» — dưa rơi dày hơn, hũ đầy nhanh gấp 2.5 lần, điểm mỗi lần hũ đầy cũng ×2.5",
      "Tổng cộng 9 chế độ chơi, mỗi chế độ có màu nhấn và gradient riêng",
      "16 thành tựu thay vì 14 — thêm nhóm thành tựu cho hai chế độ mới",
      "Thêm tiếng Tây Ban Nha (es) và tiếng Pháp (fr) — nâng lên 7 ngôn ngữ giao diện",
      "Trình chạy (launcher) cho cả 7 ngôn ngữ, tự nhận theo locale của máy",
      "FIX: launcher Windows lưu sai xuống dòng — chuyển sang CRLF + UTF-8 BOM để tiếng Việt có dấu hiện đúng",
      "Bộ đếm combo hiển thị to dần theo chuỗi, đổi màu khi vượt ×6",
      "61 unit tests",
    ],
    itemsEn: [
      "New mode “Combo Festival” — the combo window is twice as long and chains pay more; built for players who like to keep a rhythm",
      "New mode “Grand Feast” — produce falls denser and filling the jar is 2.5× faster, with a 2.5× jar bonus",
      "Nine game modes in total, each with its own accent colour and gradient",
      "Sixteen achievements instead of fourteen — a new group for the two new modes",
      "Spanish (es) and French (fr) added — seven UI languages",
      "Launchers for all seven languages, auto-detecting the machine locale",
      "FIX: the Windows launcher saved the wrong line endings — switched to CRLF + UTF-8 BOM so Vietnamese diacritics render",
      "The combo counter scales up with the chain and turns colour past ×6",
      "61 unit tests",
    ],
  },
  {
    version: "1.1.3",
    date: "2026-11-04",
    kind: "feature",
    vi: "Mưa Dưa · Gốm Mỏng, thành tựu thứ 13–14, giao diện 5 ngôn ngữ, launcher có hoạt họa, favicon",
    en: "Storm · Thin Porcelain, achievements 13–14, five UI languages, animated launchers, a web favicon",
    itemsVi: [
      "Chế độ «Mưa Dưa» — dưa rơi dày ~1.4×, đồ hư ×1.5, đổi lại mỗi củ chỉ ×0.75 điểm; “lụt dưa” đúng nghĩa",
      "Chế độ «Gốm Mỏng» — chỉ chịu đúng MỘT vết nứt là vỡ hũ, đền bù ×2.0 điểm; chế độ hardcore thật sự",
      "Hai thành tựu mới (tổng 14): CƠN MƯA NẶNG HẠT và GỐM THÉP",
      "Giao diện 5 ngôn ngữ — thêm 日本語 và 한국어 bên cạnh Việt · English · 中文",
      "Launcher double-click nay đa ngôn ngữ (phím L: VI→EN→中) và có hoạt ảnh: banner đổi màu, spinner braille, thanh tiến trình build thật",
      "Favicon web hoàn chỉnh: favicon.ico nhiều kích thước + SVG động + data-URI nhúng",
      "Logo rơi vào lọ được vẽ bằng canvas, có nhịp thở riêng",
      "FIX: ngưỡng vỡ hũ giờ đọc theo chế độ (maxCracks) thay vì hằng số toàn cục",
      "55 unit tests",
    ],
    itemsEn: [
      "New mode “Storm” — produce falls ~1.4× denser and hazards ×1.5, but each pickle is worth only ×0.75; a proper pickle flood",
      "New mode “Thin Porcelain” — a single crack shatters the jar, paying ×2.0 per pickle; the real hardcore mode",
      "Two new achievements (14 total): HEAVY RAIN and STEEL PORCELAIN",
      "Five UI languages — 日本語 and 한국어 added beside Tiếng Việt · English · 中文",
      "Double-click launchers are now multilingual (key L: VI→EN→中) and animated: colour-cycling banner, braille spinner, real build progress",
      "A complete web favicon: multi-size favicon.ico + animated SVG + embedded data URI",
      "The logo now drops into the jar as canvas art with its own breathing rhythm",
      "FIX: the crack threshold now comes from the mode (maxCracks) instead of a global constant",
      "55 unit tests",
    ],
  },
  {
    version: "1.1.2",
    date: "2026-11-02",
    kind: "feature",
    vi: "Đua 60 Giây · Mùa Vàng, combo 12+ bốc lửa, launcher nhấn-đúp cho 3 hệ điều hành, README 10 ngôn ngữ",
    en: "60-Second Rush · Gold Rush, flaming 12+ combos, double-click launchers for three OSes, READMEs in ten languages",
    itemsVi: [
      "Chế độ «Đua 60 Giây» — đồng hồ đếm ngược trên HUD, còn ≤10 giây thì nhấp nháy đỏ; hết giờ là hết ván",
      "Chế độ «Mùa Vàng» — vật phẩm vàng xuất hiện dày hơn hẳn, hũ đầy nhanh, điểm mỗi củ cao hơn",
      "Hai thành tựu mới (tổng 12): VUA ĐUA 60 GIÂY và MÙA VÀNG BỘI THU",
      "Combo từ ×12 trở lên bốc lửa: vệt lửa theo sau lọ và hạt than hồng",
      "Bộ launcher nhấn-đúp cho macOS · Windows · Linux — không cần mở Terminal gõ lệnh",
      "Menu launcher có hoạt ảnh: banner đổi màu, spinner, thanh tiến trình build thật",
      "README mở rộng ra 10 ngôn ngữ, mỗi bản có banner và animation riêng",
      "FIX: phím tắt game không còn kích hoạt khi đang gõ tên trong ô nhập",
      "49 unit tests",
    ],
    itemsEn: [
      "New mode “60-Second Rush” — a countdown on the HUD that blinks red under ten seconds; when it hits zero, the run ends",
      "New mode “Gold Rush” — golden items appear far more often, the jar fills faster and each pickle scores more",
      "Two new achievements (12 total): 60-SECOND KING and GOLDEN HARVEST",
      "Combos from ×12 upward catch fire: a flame trail behind the jar and ember particles",
      "Double-click launchers for macOS · Windows · Linux — no Terminal, no typing",
      "The launcher menu is animated: colour-cycling banner, spinner, real build progress bar",
      "READMEs expanded to ten languages, each with its own banner and animation",
      "FIX: gameplay hotkeys no longer fire while typing a name in the input",
      "49 unit tests",
    ],
  },
  {
    version: "1.1.1",
    date: "2026-10-31",
    kind: "fix",
    vi: "Quét lỗi toàn dự án, i18n trong game (Việt · English · 中文), build một file, README 7 ngôn ngữ",
    en: "A project-wide bug sweep, in-game i18n (Việt · English · 中文), single-file build, READMEs in seven languages",
    itemsVi: [
      "Module i18n thuần, không phụ thuộc React: tự nhận ngôn ngữ (localStorage → navigator.language → vi), nội suy {param}, fallback về tiếng Việt",
      "Toàn bộ chuỗi hiển thị đi qua từ điển: HUD canvas, popup, banner, màn hình, ticker",
      "Nút chuyển ngôn ngữ VI · EN · 中 dùng chung ở menu và màn tạm dừng",
      "Số liệu định dạng theo từng locale — dấu phân cách nghìn đổi theo ngôn ngữ",
      "Chuyển sang build một file duy nhất: dist/index.html tự chứa mọi thứ, chép đi đâu cũng chạy",
      "Tự host font woff2 dạng subset, nạp bằng unicode-range — offline-first thật sự",
      "FIX: form nhập tên tự submit khi bấm Enter và nháy lại trang",
      "Bộ quét lỗi toàn dự án: sửa hàng loạt lỗi nhỏ ở HUD, modal, engine và docs",
      "README mở rộng ra 7 ngôn ngữ",
    ],
    itemsEn: [
      "A pure i18n module with no React dependency: it detects the language (localStorage → navigator.language → vi), interpolates {param} and falls back to Vietnamese",
      "Every visible string now goes through the dictionary: canvas HUD, popups, banners, screens, ticker",
      "A VI · EN · 中 switcher shared by the menu and the pause screen",
      "Numbers are formatted per locale — the thousands separator changes with the language",
      "Switched to a single-file build: dist/index.html carries everything and runs wherever you copy it",
      "Fonts self-hosted as woff2 subsets loaded via unicode-range — genuinely offline-first",
      "FIX: the name form no longer submits on Enter and reloads the page",
      "A project-wide bug sweep: batches of small fixes across the HUD, modals, engine and docs",
      "READMEs expanded to seven languages",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-10-29",
    kind: "feature",
    vi: "Ba chế độ chơi, nguyên liệu mới, thành tựu đầu tiên, menu aurora, font tự host, README 3 ngôn ngữ",
    en: "Three game modes, new ingredients, the first achievements, an aurora menu, self-hosted fonts, READMEs in three languages",
    itemsVi: [
      "Ba chế độ chơi chọn ngay trên menu: MUỐI DƯA CỔ ĐIỂN · THẢNH THƠI · ỚT LỬA",
      "Mỗi chế độ có thẻ gradient riêng, viền phát sáng theo màu nhấn, chọn xong lưu vào locheo.mode.v1",
      "THẢNH THƠI không bao giờ sinh đồ hư nhưng chỉ ×0.5 điểm; ỚT LỬA hazard ×1.8, đền ×1.5 điểm",
      "Thêm nguyên liệu mới và bảng thành tựu đầu tiên (10 mốc: hứng, chuỗi, chém, hũ, cấp, điểm, số ván)",
      "Làm lại menu theo phong cách gradient/aurora sống động, có chuyển động nền",
      "Tự host font — không còn tải font từ CDN, chạy được hoàn toàn offline",
      "Viết lại README thành 3 ngôn ngữ (Việt · English · 中文) kèm animation",
      "HUD hiển thị cấp, hũ, chuỗi combo và điểm cao nhất của chế độ đang chơi",
    ],
    itemsEn: [
      "Three modes you pick right on the menu: CLASSIC · CHILL · CHILI",
      "Each mode has its own gradient card and accent-coloured glow; the choice is saved to locheo.mode.v1",
      "CHILL never spawns hazards but pays only ×0.5; CHILI runs hazards at ×1.8 and pays ×1.5",
      "New ingredients and the first achievement board (10 milestones: catches, chains, slices, jars, level, score, runs)",
      "The menu rebuilt around a living gradient/aurora look with animated backgrounds",
      "Self-hosted fonts — no CDN font fetch, fully playable offline",
      "README rewritten in three languages (Việt · English · 中文) with animation",
      "The HUD shows level, jar fill, combo chain and the best score for the current mode",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-10-26",
    kind: "feature",
    vi: "Bản đầu tiên — Lọ Chéo: Hũ Dưa Đại Chiến",
    en: "The first release — Lọ Chéo: Pickle Jar War",
    itemsVi: [
      "Bản đầu tiên của Lọ Chéo: Hũ Dưa Đại Chiến",
      "Lọ dưa chỉ chịu đi đường chéo — cơ chế gốc của toàn bộ game",
      "Hứng dưa để đầy hũ, né mốc/ruồi/sâu, chém đồ hư bằng cú lướt chéo",
      "Cú SLAM lắc hũ để hút và đánh bay mọi thứ quanh lọ",
      "Hệ thống combo và nhân điểm theo chuỗi",
      "Vật phẩm đặc biệt: Đá Lạnh (làm chậm), Tỏi Vàng (khiên), Cải Vàng (đầy nhanh), Muối Vàng (bùng hũ)",
      "Đồ hoạ canvas vẽ tay, hoạt ảnh splat, hạt văng và rung màn hình",
      "Nhạc nền ngũ cung và hiệu ứng âm thanh tổng hợp bằng WebAudio — không cần file âm thanh",
      "Chơi được hoàn toàn offline, không gửi byte nào lên mạng",
    ],
    itemsEn: [
      "The first release of Lọ Chéo: Pickle Jar War",
      "The jar only moves diagonally — the core mechanic of the whole game",
      "Catch pickles to fill the jar, dodge mould/flies/worms, slice hazards with a diagonal swipe",
      "SLAM shakes the jar, pulling in and blasting away everything around it",
      "A combo system with chain-scaled score multipliers",
      "Special items: Ice Stone (slow-mo), Golden Garlic (shield), Golden Cabbage (fast fill), Golden Salt (jar burst)",
      "Hand-drawn canvas art with splat animations, particle bursts and screen shake",
      "A pentatonic soundtrack and synthesised SFX from WebAudio — no audio files at all",
      "Fully offline; not a single byte is sent over the network",
    ],
  },
] as const;


/** Versions in descending order (as declared). */
export function changelogVersions(): string[] {
  return CHANGELOG_ENTRIES.map((e) => e.version);
}

/** How many releases fall into each tier — drives the filter chips. */
export function tierCounts(): Record<ReleaseTier, number> {
  const counts: Record<ReleaseTier, number> = { major: 0, minor: 0, patch: 0 };
  for (const entry of CHANGELOG_ENTRIES) counts[tierFor(entry.version)] += 1;
  return counts;
}

/** Entries whose SemVer tier equals `tier` (or every entry for `null`). */
export function entriesForTier(tier: ReleaseTier | null): readonly ChangelogEntry[] {
  return tier === null ? CHANGELOG_ENTRIES : CHANGELOG_ENTRIES.filter((e) => tierFor(e.version) === tier);
}
