import type { AchievementDef } from "../types";

/**
 * first-catch — FIRST CATCH
 *
 * Unlocks when: `run.catches >= 1`
 *
 * Why this one exists: the very first jar catch, so the panel is never empty
 */
export const FIRST_CATCH: AchievementDef = {
  id: "first-catch",
  name: "MẺ MUỐI ĐẦU TIÊN",
  description: "Hứng được củ dưa đầu tiên trong sự nghiệp.",
  glyph: "CÀ",
  tone: "brine",
};
