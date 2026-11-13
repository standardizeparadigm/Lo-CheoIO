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
