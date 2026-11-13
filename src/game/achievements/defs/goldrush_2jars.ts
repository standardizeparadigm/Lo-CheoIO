import type { AchievementDef } from "../types";

/**
 * goldrush-2jars — GOLD RUSH 2 JARS
 *
 * Unlocks when: `run.mode === "goldrush" && run.jars >= 2`
 *
 * Why this one exists: mode-specific: Mùa Vàng dropping only gold
 */
export const GOLDRUSH_2JARS: AchievementDef = {
  id: "goldrush-2jars",
  name: "MÙA VÀNG BỘI THU",
  description: "Đầy 2 hũ trong một ván Mùa Vàng.",
  glyph: "2 HŨ",
  tone: "brine",
};
