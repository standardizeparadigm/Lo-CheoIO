import type { AchievementDef } from "../types";

/**
 * feast-3jars — FEAST 3 JARS
 *
 * Unlocks when: `run.mode === "feast" && run.jars >= 3`
 *
 * Why this one exists: mode-specific: the longest objective in the game
 */
export const FEAST_3JARS: AchievementDef = {
  id: "feast-3jars",
  name: "TẤM LÒNG TRẨY HỘI",
  description: "Đầy 3 hũ trong một ván Đại Tiệc Dưa.",
  glyph: "3 HŨ",
  tone: "brine",
};
