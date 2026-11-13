/**
 * Achievements: sixteen definitions, one pure unlock checker (v1.1.8).
 *
 * Split out of `game/achievements.ts` — that file held the types, sixteen
 * records and the checker in 99 lines. Each record now lives in
 * `defs/<id>.ts` with a header saying *why* the achievement exists and which
 * expression grants it, which is the question the old one-liner table could
 * not answer.
 *
 * The public API is unchanged: `ACHIEVEMENTS`, `ACHIEVEMENT_MAP`,
 * `checkAchievements`, plus the three types. `src/game/achievements.ts` is
 * gone; every import of `game/achievements` resolves here.
 */
import type { AchievementDef, ProgressLike, RunLike } from "./types";
import { BLITZ_3000 } from "./defs/blitz_3000";
import { COMBO_10 } from "./defs/combo_10";
import { COMBO_20 } from "./defs/combo_20";
import { COMBO_40 } from "./defs/combo_40";
import { FEAST_3JARS } from "./defs/feast_3jars";
import { FIRST_CATCH } from "./defs/first_catch";
import { GOLDRUSH_2JARS } from "./defs/goldrush_2jars";
import { HARDCORE_JAR } from "./defs/hardcore_jar";
import { INFERNO_1500 } from "./defs/inferno_1500";
import { JAR_1 } from "./defs/jar_1";
import { LEVEL_6 } from "./defs/level_6";
import { RUNS_5 } from "./defs/runs_5";
import { SCORE_3000 } from "./defs/score_3000";
import { SCORE_6000 } from "./defs/score_6000";
import { SLICE_10 } from "./defs/slice_10";
import { STORM_60 } from "./defs/storm_60";

export type { AchievementDef, AchievementTone, ProgressLike, RunLike } from "./types";

/**
 * All sixteen, in the order the achievements panel shows them.
 *
 * The order is load-bearing: the panel renders a fixed 4×4 grid and the
 * "0/16 đã mở khoá" counter in the GAME menu reads `ACHIEVEMENTS.length`.
 * `tests/achievements-defs.test.ts` pins the order and the count.
 */
export const ACHIEVEMENTS: AchievementDef[] = [
  FIRST_CATCH,
  COMBO_10,
  COMBO_20,
  SLICE_10,
  JAR_1,
  LEVEL_6,
  SCORE_3000,
  SCORE_6000,
  RUNS_5,
  INFERNO_1500,
  BLITZ_3000,
  GOLDRUSH_2JARS,
  STORM_60,
  HARDCORE_JAR,
  COMBO_40,
  FEAST_3JARS,
];

/** O(1) lookup by id — used by the panel to resolve an unlocked-id list. */
export const ACHIEVEMENT_MAP: ReadonlyMap<string, AchievementDef> = new Map(
  ACHIEVEMENTS.map((a) => [a.id, a]),
);

/**
 * Pure check: given a finished run, lifetime progress and the set of already
 * unlocked ids — returns the ids that unlock right now (never duplicates).
 *
 * Each `grant` call mirrors exactly one `unlocks when` line in the matching
 * `defs/<id>.ts` header, so the two can be read against each other.
 */
export function checkAchievements(
  run: RunLike,
  progress: ProgressLike,
  unlocked: readonly string[],
): string[] {
  const have = new Set(unlocked);
  const next: string[] = [];
  const grant = (id: string, ok: boolean) => {
    if (ok && !have.has(id)) {
      have.add(id);
      next.push(id);
    }
  };

  grant("first-catch", run.catches >= 1);
  grant("combo-10", run.bestCombo >= 10);
  grant("combo-20", run.bestCombo >= 20);
  grant("slice-10", run.sliced >= 10);
  grant("jar-1", run.jars >= 1);
  grant("level-6", run.level >= 6);
  grant("score-3000", run.score >= 3000);
  grant("score-6000", run.score >= 6000);
  grant("runs-5", progress.runs >= 5);
  grant("inferno-1500", run.mode === "inferno" && run.score >= 1500);
  grant("blitz-3000", run.mode === "blitz" && run.score >= 3000);
  grant("goldrush-2jars", run.mode === "goldrush" && run.jars >= 2);
  grant("storm-60", run.mode === "storm" && run.catches >= 60);
  grant("hardcore-jar", run.mode === "hardcore" && run.jars >= 1);
  grant("combo-40", run.bestCombo >= 40);
  grant("feast-3jars", run.mode === "feast" && run.jars >= 3);

  return next;
}
