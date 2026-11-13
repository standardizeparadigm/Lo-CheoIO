/**
 * Structured changelog for the in-game CHANGELOG panel.
 * Newest first. `vi` is the source of truth with `en` as the mirror —
 * other locales fall back to `en`. Keep versions descending, SemVer.
 */

export interface ChangelogEntry {
  version: string;
  /** ISO-8601 date */
  date: string;
  kind: "feature" | "fix" | "polish";
  vi: string;
  en: string;
  itemsVi: readonly string[];
  itemsEn: readonly string[];
}

export const CHANGELOG_ENTRIES: readonly ChangelogEntry[] = [
  {
    version: "1.1.6",
    date: "2026-11-13",
    kind: "feature",
    vi: "Cài đặt chia 6 mục, ngôn ngữ dời vào cài đặt, nền menu động nhiều lớp, gradient chạy vòng ở mục tác giả",
    en: "Six-section settings, language moved into settings, layered animated menu scene, looping gradient on the author card",
    itemsVi: [
      "Cài đặt làm lại thành 6 mục: Cấu hình nhanh · Âm thanh · Giao diện & chuyển động · Ngôn ngữ · Sao lưu · Dữ liệu",
      "MỚI: âm lượng SFX và nhạc 0–100, mức rung (nhẹ/mạnh), chất lượng hình (thấp/cao), tự tạm dừng khi đổi tab",
      "MỚI: 4 cấu hình nhanh — MƯỢT · CÂN BẰNG · ĐIỆN ẢNH · SPEEDRUN — đổi ngôn ngữ không bị ảnh hưởng",
      "MỚI: xuất/nhập cài đặt bằng JSON để mang sang máy khác",
      "Ngôn ngữ dời hẳn vào Cài đặt — bỏ nút nổi góc phải ở menu và thanh chọn ở màn tạm dừng",
      "Nền menu nhiều lớp: tinh vân trôi, tia sáng, hai lớp sao nhấp nháy, vòng sáng xoay quanh lọ, vệt sáng chạy qua nút CHƠI",
      "Mục giới thiệu tác giả: viền gradient chạy vòng liên tục + quầng sáng xoay quanh logo",
      "FIX: nhạc nền sau khi tải lại trang phát to hơn mức đã đặt (bus nhạc mở ở 0.5 cố định)",
      "FIX: Tab không còn thoát ra khỏi modal đang mở; focus được giữ trong hộp thoại và trả lại khi đóng",
      "FIX: gợi ý changelog ở menu ghi cứng v1.1.5 thay vì đọc phiên bản hiện tại",
      "150 unit tests / 18 file — thêm test cho schema cài đặt, preset, sao lưu và phép tính âm lượng",
      "README 10 ngôn ngữ làm mới: nhiều hoạt họa SVG hơn, chi tiết hơn, đầy đủ hơn",
    ],
    itemsEn: [
      "Settings rebuilt into six sections: Quick presets · Audio · Display & motion · Language · Backup · Data",
      "NEW: SFX and music loudness 0–100, shake level (low/high), visual quality (low/high), auto-pause on tab switch",
      "NEW: four quick presets — SMOOTH · BALANCED · CINEMATIC · SPEEDRUN — never touching your language",
      "NEW: export/import settings as JSON to carry them between machines",
      "Language now lives inside Settings — the floating top-right switcher and the pause-screen row are gone",
      "Layered menu scene: drifting nebulae, a light ray, two twinkling starfields, a rotating glow ring around the jar, a shine sweep across PLAY",
      "Author card: perpetually panning gradient border + rotating halo around the logo",
      "FIX: music played louder than configured after a reload (the music bus opened at a flat 0.5)",
      "FIX: Tab can no longer escape an open modal; focus is trapped and restored on close",
      "FIX: the menu changelog hint was hardcoded to v1.1.5 instead of reading the current version",
      "150 unit tests / 18 files — new coverage for the settings schema, presets, backup codec and audio gain math",
      "All 10 READMEs refreshed: more SMIL animation, more detail, more complete",
    ],
  },
  {
    version: "1.1.5",
    date: "2026-11-12",
    kind: "fix",
    vi: "Menu góc GAME/INFO, chế độ tách riêng, lưu & tiếp tục ván dở, cài đặt trong game",
    en: "Corner GAME/INFO menus, dedicated mode picker, save & resume, in-game settings",
    itemsVi: [
      "Menu chính gọn lại: panel GAME góc dưới-trái (chơi · chơi tiếp · chế độ · bảng xếp hạng · thành tựu · cài đặt), panel INFO góc dưới-phải (giới thiệu tác giả · changelog · thoát)",
      "«Chơi tiếp» chỉ bật khi có ván đang dở — snapshot vào locheo.run.v1, khôi phục nguyên trạng điểm/hũ/combo",
      "Cài đặt trong game: âm thanh, nhạc nền, rung màn hình, giảm chuyển động (áp dụng ngay, lưu locheo.settings.v1)",
      "FIX: prefers-reduced-motion còn thiếu trong CSS — giờ tôn trọng cài đặt của hệ điều hành",
      "README 10 ngôn ngữ làm mới với animation, banner 1.1.5",
    ],
    itemsEn: [
      "Main menu slimmed down: GAME panel bottom-left (play · continue · modes · leaderboard · achievements · settings), INFO panel bottom-right (about · changelog · quit)",
      "Continue only enabled with a suspended run — snapshot in locheo.run.v1, restored as-is (score/jars/combo)",
      "In-game settings: SFX, music, screen shake, reduced motion (applied instantly, saved to locheo.settings.v1)",
      "FIX: prefers-reduced-motion was missing from CSS — now honored",
      "READMEs refreshed with animations, banner bumped to 1.1.5",
    ],
  },
  {
    version: "1.1.4",
    date: "2026-11-12",
    kind: "feature",
    vi: "2 chế độ mới (Combo Festival · Đại Tiệc Dưa), 16 thành tựu, 7 ngôn ngữ",
    en: "2 new modes (Combo Festival · Grand Feast), 16 achievements, 7 languages",
    itemsVi: [],
    itemsEn: [],
  },
  {
    version: "1.1.3",
    date: "2026-11-12",
    kind: "feature",
    vi: "4 chế độ mới, hệ thống thành tựu, lưu tiến trình",
    en: "4 new modes, achievement system, progress persistence",
    itemsVi: [],
    itemsEn: [],
  },
  {
    version: "1.1.2",
    date: "2026-11-12",
    kind: "fix",
    vi: "Sửa launcher Windows (CRLF + BOM), launcher 7 ngôn ngữ",
    en: "Windows launcher fix (CRLF + BOM), 7-language launchers",
    itemsVi: [],
    itemsEn: [],
  },
  {
    version: "1.1.1",
    date: "2026-11-12",
    kind: "polish",
    vi: "Tối ưu build một file, sửa hành vi form",
    en: "Single-file build polish, form behavior fixes",
    itemsVi: [],
    itemsEn: [],
  },
  {
    version: "1.1.0",
    date: "2026-11-12",
    kind: "feature",
    vi: "Đa ngôn ngữ (VI/EN/ZH/JA/KO), chọn được chế độ chơi",
    en: "Multi-language (VI/EN/ZH/JA/KO), selectable game modes",
    itemsVi: [],
    itemsEn: [],
  },
  {
    version: "1.0.0",
    date: "2026-10-26",
    kind: "feature",
    vi: "Bản đầu tiên — Lọ Chéo: Hũ Dưa Đại Chiến",
    en: "First release — Lọ Chéo: Pickle Jar War",
    itemsVi: [],
    itemsEn: [],
  },
] as const;

/** Versions in descending order (as declared). */
export function changelogVersions(): string[] {
  return CHANGELOG_ENTRIES.map((e) => e.version);
}
