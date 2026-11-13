import type { AchievementDef } from "../types";

/**
 * runs-5 — RUNS 5
 *
 * Unlocks when: `progress.runs >= 5`
 *
 * Why this one exists: lifetime counter — plays across days, not one session
 */
export const RUNS_5: AchievementDef = {
  id: "runs-5",
  name: "MUỐI 5 MẺ",
  description: "Hoàn thành 5 ván chơi (cộng dồn mọi chế độ).",
  glyph: "5 MẺ",
  tone: "jade",
};
