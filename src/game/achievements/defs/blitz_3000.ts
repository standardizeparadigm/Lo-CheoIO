import type { AchievementDef } from "../types";

/**
 * blitz-3000 — BLITZ 3000
 *
 * Unlocks when: `run.mode === "blitz" && run.score >= 3000`
 *
 * Why this one exists: mode-specific: 60-second sprint, rewards speed
 */
export const BLITZ_3000: AchievementDef = {
  id: "blitz-3000",
  name: "VUA ĐUA 60 GIÂY",
  description: "Ghi 3.000 điểm trong một ván Đua 60 Giây.",
  glyph: "60S",
  tone: "gold",
};
