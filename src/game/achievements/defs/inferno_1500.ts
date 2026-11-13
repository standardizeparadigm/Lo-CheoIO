import type { AchievementDef } from "../types";

/**
 * inferno-1500 — INFERNO 1500
 *
 * Unlocks when: `run.mode === "inferno" && run.score >= 1500`
 *
 * Why this one exists: mode-specific: proves the player can survive Ớt Lửa
 */
export const INFERNO_1500: AchievementDef = {
  id: "inferno-1500",
  name: "ĂN ỚT KHÔNG CAY",
  description: "Ghi 1.500 điểm ở chế độ Ớt Lửa.",
  glyph: "ỚT",
  tone: "chili",
};
