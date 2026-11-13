/**
 * Achievement shapes (v1.1.8).
 *
 * Split out of `game/achievements.ts` so the definitions, the checker and the
 * types can be read — and committed — independently. `RunLike` and
 * `ProgressLike` are deliberately minimal: the checker never imports the
 * engine, so it stays a pure function that a unit test can drive with a
 * literal object.
 */
import type { ModeId } from "../modes";

/** Minimal run shape the checker needs — decoupled from the engine. */
export interface RunLike {
  score: number;
  catches: number;
  bestCombo: number;
  level: number;
  jars: number;
  sliced: number;
  time: number;
  mode: ModeId;
}

/** Lifetime counters the checker needs. */
export interface ProgressLike {
  /** Total finished runs across sessions */
  runs: number;
  /** Cumulative jars filled across sessions */
  totalJars: number;
  /** Cumulative hazards sliced across sessions */
  totalSliced: number;
  /** Best lifetime score */
  bestScore: number;
}

/** Which badge colour ramp an achievement uses. */
export type AchievementTone = "gold" | "brine" | "chili" | "jade";

/** One achievement, as the panel renders it. */
export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  /** Glyph drawn inside the badge — kept text-only so it themes cleanly */
  glyph: string;
  /** Palette key used by the panel to colour the badge */
  tone: AchievementTone;
}
