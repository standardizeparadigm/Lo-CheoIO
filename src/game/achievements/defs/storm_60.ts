import type { AchievementDef } from "../types";

/**
 * storm-60 — STORM 60
 *
 * Unlocks when: `run.mode === "storm" && run.catches >= 60`
 *
 * Why this one exists: mode-specific: catch volume under Mưa Dưa
 */
export const STORM_60: AchievementDef = {
  id: "storm-60",
  name: "CƠN MƯA NẶNG HẠT",
  description: "Hứng được 60 củ trong một ván Mưa Dưa.",
  glyph: "60 CỦ",
  tone: "jade",
};
