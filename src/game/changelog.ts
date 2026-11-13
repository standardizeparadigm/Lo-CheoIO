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
    date: "2026-11-13",
    kind: "fix",
    vi: "Bản vá cuối trước 1.2.0 — nền menu hết mờ, changelog có tầng bản phát hành và mô tả đầy đủ cho cả 8 bản cũ, README làm mới toàn bộ",
    en: "Last patch before 1.2.0 — the menu background is no longer foggy, the changelog gains release tiers and full descriptions for all 8 older versions, every README rebuilt",
    itemsVi: [
      "FIX NỀN MENU: ba lớp phủ chồng nhau làm cả scene thành một mảng xám — tinh vân blur 64px→22px và hạ đỉnh xuống 0.80, vignette toàn màn hình 0.42/0.88/1.0 → vignette góc 0.30/0.62, khung CRT 140px@0.9 → 90px@0.55",
      "FIX NỀN MENU: sàn gạch nâng từ 45% lên 70% opacity — có vignette cũ thì sàn gần như vô hình",
      "CHANGELOG: tag phiên bản theo tầng SemVer — PATCH màu tím, UPDATE màu vàng, MAJOR màu hồng; tầng suy ra từ chính số phiên bản nên không thể lệch",
      "CHANGELOG: cả 8 bản cũ (1.0.0 → 1.1.6) có danh sách thay đổi thật thay vì một dòng tóm tắt — 96 gạch đầu dòng mới",
      "CHANGELOG: thêm thanh chọn tầng (Tất cả · MAJOR · UPDATE · PATCH) và đếm số bản mỗi tầng",
      "Ngày phát hành của cả 8 bản cũ được chỉnh lại thành chuỗi tự nhiên: 1.0.0 → 1.1.6 trải từ 26/10 tới 13/11/2026",
      "README: thêm dải màu động theo palette, sơ đồ kiến trúc SVG, bảng so sánh 8 bản phát hành, mục kiểm chứng chất lượng",
      "Thêm tests/changelog-tiers.test.ts — khoá tầng SemVer, độ dài mô tả tối thiểu và tính duy nhất của từng gạch đầu dòng",
      "Dọn dẹp: bỏ `kind` khỏi đường render, giữ lại dưới dạng @deprecated để không phá vỡ call site cũ",
    ],
    itemsEn: [
      "MENU BACKGROUND FIX: three stacked overlays turned the whole scene into grey mush — nebula blur 64px→22px with peaks cut to 0.80, full-screen vignette 0.42/0.88/1.0 → corner vignette 0.30/0.62, CRT frame 140px@0.9 → 90px@0.55",
      "MENU BACKGROUND FIX: tile floor raised from 45% to 70% opacity — under the old vignette the floor was effectively invisible",
      "CHANGELOG: SemVer-tiered version tags — PATCH in purple, UPDATE in gold, MAJOR in pink; the tier is derived from the version string so it cannot drift",
      "CHANGELOG: all 8 older releases (1.0.0 → 1.1.6) now carry real change lists instead of a one-line summary — 96 new bullets",
      "CHANGELOG: tier filter (All · MAJOR · UPDATE · PATCH) with per-tier release counts",
      "Release dates for all 8 older versions re-sequenced into a natural timeline: 1.0.0 → 1.1.6 now spans 26 Oct to 13 Nov 2026",
      "README: animated palette ribbon, an SVG architecture map, an eight-release comparison table, and a quality-gate section",
      "New tests/changelog-tiers.test.ts — locks the SemVer tier mapping, a minimum description length and bullet uniqueness",
      "Cleanup: `kind` is no longer read on the render path; it stays as @deprecated so older call sites keep compiling",
    ],
  },
  {
    version: "1.1.6",
    date: "2026-11-12",
    kind: "feature",
    vi: "Đại tu cài đặt 6 mục, ngôn ngữ dời hẳn vào Settings, nền menu nhiều lớp, 11 lỗi thật được sửa",
    en: "Six-section settings rebuild, language moved into Settings, layered menu scene, eleven real fixes",
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
      "FIX: vật phẩm trọng số 0 lọt vào cấp thấp; điểm in ra “NaN”; nút xác nhận xoá dữ liệu chỉ có dấu ←",
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
      "FIX: zero-weight items spawned at low levels; scores printed “NaN”; the danger-zone confirm button was a bare ← glyph",
      "222 unit tests / 29 files — six new pure modules: safeStorage · palette · spawn · math · time · clipboard",
    ],
  },
  {
    version: "1.1.5",
    date: "2026-11-12",
    kind: "fix",
    vi: "Menu góc GAME/INFO, chế độ tách riêng, lưu & chơi tiếp ván dở, cài đặt trong game",
    en: "Corner GAME/INFO panels, dedicated mode picker, save & resume, in-game settings",
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
    date: "2026-11-11",
    kind: "feature",
    vi: "Hai chế độ mới (Lễ Hội Combo · Đại Tiệc Dưa), đủ 16 thành tựu, thêm tiếng Tây Ban Nha và Pháp",
    en: "Two new modes (Combo Festival · Grand Feast), sixteen achievements, Spanish and French added",
    itemsVi: [
      "Chế độ mới «Lễ Hội Combo» — cửa sổ combo dài gấp đôi, thưởng chuỗi liên tục, dành cho ai thích giữ nhịp",
      "Chế độ mới «Đại Tiệc Dưa» — dưa rơi dày hơn, hũ đầy nhanh gấp 2.5 lần, điểm mỗi lần hũ đầy cũng ×2.5",
      "Tổng cộng 9 chế độ chơi, mỗi chế độ có màu nhấn và gradient riêng",
      "16 thành tựu thay vì 12 — thêm nhóm thành tựu cho hai chế độ mới",
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
      "Sixteen achievements instead of twelve — a new group for the two new modes",
      "Spanish (es) and French (fr) added — seven UI languages",
      "Launchers for all seven languages, auto-detecting the machine locale",
      "FIX: the Windows launcher saved the wrong line endings — switched to CRLF + UTF-8 BOM so Vietnamese diacritics render",
      "The combo counter scales up with the chain and turns colour past ×6",
      "61 unit tests",
    ],
  },
  {
    version: "1.1.3",
    date: "2026-11-09",
    kind: "feature",
    vi: "Bốn chế độ mới, hệ thống thành tựu, lưu tiến trình trọn đời, bảng vàng top 8",
    en: "Four new modes, an achievement system, lifetime progress and a top-8 board",
    itemsVi: [
      "Bốn chế độ mới: Đua 60 Giây · Bão Tố · Gốm Mỏng · Mẻ Vàng",
      "Đua 60 Giây có đồng hồ đếm ngược trên HUD, hết giờ là kết thúc ván",
      "Bão Tố tăng mật độ đồ hư; Gốm Mỏng vỡ ngay từ vết nứt đầu tiên; Mẻ Vàng nhân đôi vật phẩm vàng",
      "Hệ thống thành tựu: mở khoá theo mốc, hiện huy hiệu ngay trên màn kết thúc ván",
      "Lưu tiến trình trọn đời: tổng số ván, tổng hũ, tổng đồ đã chém, điểm cao nhất",
      "Bảng vàng top 8 lưu trên máy, tô sáng hàng vừa ghi khi kết thúc ván",
      "Màn kết thúc ván mới: hiện thành tựu vừa mở, thứ hạng và điểm cao nhất",
      "Bộ đếm combo có thanh thời gian cạn dần, hết thanh là mất chuỗi",
    ],
    itemsEn: [
      "Four new modes: 60-Second Dash · Storm · Thin Porcelain · Golden Batch",
      "60-Second Dash puts a countdown on the HUD and ends the run when the clock hits zero",
      "Storm raises the hazard density; Thin Porcelain breaks on the first crack; Golden Batch doubles golden items",
      "Achievement system: unlocked at milestones, badges shown on the game-over screen",
      "Lifetime progress: total runs, jars, hazards sliced and best score",
      "A local top-8 board that highlights the row you just posted",
      "New game-over screen: freshly unlocked achievements, rank and personal best",
      "The combo meter gained a draining timer — when it empties, the chain is gone",
    ],
  },
  {
    version: "1.1.2",
    date: "2026-11-07",
    kind: "fix",
    vi: "Sửa launcher Windows, launcher cho 7 ngôn ngữ, hướng dẫn chơi ngay không cần gõ lệnh",
    en: "Windows launcher fix, launchers for seven languages, a no-terminal way to play",
    itemsVi: [
      "Trình chạy nhấn-đúp cho macOS, Windows và Linux — không cần mở Terminal gõ lệnh",
      "Menu launcher có hoạt ảnh: banner đổi màu, spin-loader braille, thanh tiến trình build thật",
      "FIX: play-windows.bat hiển thị sai tiếng Việt — thêm chcp 65001 và lưu UTF-8",
      "Menu launcher dịch theo 7 ngôn ngữ, tự nhận LOCHEO_LANG từ biến môi trường",
      "Launcher tự kiểm tra Node.js và báo lỗi thân thiện nếu thiếu",
      "Launcher tự chạy npm install khi node_modules chưa tồn tại",
    ],
    itemsEn: [
      "Double-click launchers for macOS, Windows and Linux — no Terminal, no typing commands",
      "The launcher menu is animated: a colour-cycling banner, a braille spinner and a real build progress bar",
      "FIX: play-windows.bat mangled Vietnamese — added chcp 65001 and saved as UTF-8",
      "The launcher menu speaks seven languages and honours LOCHEO_LANG",
      "The launcher checks for Node.js itself and explains the problem kindly",
      "It runs npm install automatically when node_modules is missing",
    ],
  },
  {
    version: "1.1.1",
    date: "2026-11-04",
    kind: "polish",
    vi: "Build một file, sửa hành vi form, dọn dẹp bộ máy build",
    en: "Single-file build, form behaviour fixes, build pipeline cleanup",
    itemsVi: [
      "Chuyển sang build một file duy nhất: dist/index.html tự chứa mọi thứ, chép đi đâu cũng chạy",
      "FIX: form nhập tên tự submit khi bấm Enter, không còn nháy lại trang",
      "FIX: phím tắt game không còn kích hoạt khi đang gõ tên trong ô nhập",
      "Nhúng font woff2 dạng subset, nạp bằng unicode-range để chỉ tải phần cần",
      "Dọn cấu hình Vite: bỏ plugin thừa, gộp cấu hình Tailwind vào một chỗ",
      "README thêm hướng dẫn build và mục xử lý sự cố",
    ],
    itemsEn: [
      "Switched to a single-file build: dist/index.html carries everything and runs wherever you copy it",
      "FIX: the name form submits on Enter without reloading the page",
      "FIX: gameplay hotkeys no longer fire while typing a name in the input",
      "Fonts embedded as woff2 subsets loaded via unicode-range",
      "Vite config cleaned up: redundant plugins dropped, Tailwind config consolidated",
      "README gained a build guide and a troubleshooting section",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-11-02",
    kind: "feature",
    vi: "Đa ngôn ngữ (VI/EN/ZH/JA/KO), chọn được chế độ chơi, màn tạm dừng",
    en: "Multi-language support (VI/EN/ZH/JA/KO), selectable game modes, pause screen",
    itemsVi: [
      "Hỗ trợ 5 ngôn ngữ: Tiếng Việt · English · 中文 · 日本語 · 한국어",
      "Nút đổi ngôn ngữ ngay trên menu, lưu lựa chọn vào locheo.lang.v1",
      "Tự nhận ngôn ngữ theo locale của trình duyệt, mặc định luôn là tiếng Việt",
      "Chọn chế độ chơi ngay trên menu: Cổ Điển · Cuồng Nhiệt · Đêm Khuya · Hỗn Loạn",
      "Màn tạm dừng có đầy đủ số liệu ván đang chơi và nút chơi lại",
      "Phím tắt: WASD/mũi tên di chuyển, Space lắc hũ, P tạm dừng, M tắt tiếng",
      "Điểm số và bảng vàng định dạng theo từng ngôn ngữ",
    ],
    itemsEn: [
      "Five languages: Tiếng Việt · English · 中文 · 日本語 · 한국어",
      "A language switcher on the menu; the choice is saved to locheo.lang.v1",
      "Language auto-detected from the browser locale, always defaulting to Vietnamese",
      "Pick a mode right on the menu: Classic · Frenzy · Midnight · Chaos",
      "The pause screen shows full run statistics and a restart button",
      "Hotkeys: WASD/arrows to move, Space to slam, P to pause, M to mute",
      "Scores and the leaderboard are formatted per language",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-10-26",
    kind: "feature",
    vi: "Bản đầu tiên — Lọ Chéo: Hũ Dưa Đại Chiến",
    en: "First release — Lọ Chéo: Pickle Jar War",
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
