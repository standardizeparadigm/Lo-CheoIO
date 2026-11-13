import type { AchievementDef } from "../types";

/**
 * hardcore-jar — HARDCORE JAR
 *
 * Unlocks when: `run.mode === "hardcore" && run.jars >= 1`
 *
 * Why this one exists: mode-specific: one jar with a single crack
 */
export const HARDCORE_JAR: AchievementDef = {
  id: "hardcore-jar",
  name: "GỐM THÉP",
  description: "Đầy một hũ trong một ván Gốm Mỏng.",
  glyph: "1 VẾT",
  tone: "chili",
};
