import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ACHIEVEMENTS, ACHIEVEMENT_MAP, checkAchievements } from "../src/game/achievements";

/**
 * Locks the v1.1.8 achievement split.
 *
 * The check that matters is *equivalence*: pulling sixteen records out of one
 * array into sixteen modules must not change the array. The order, the ids and
 * the count are what the achievements panel renders and what the GAME menu
 * counter reads, so they are pinned here rather than trusted.
 */
const root = resolve(__dirname, "..");
const defsDir = resolve(root, "src/game/achievements/defs");
const defFiles = readdirSync(defsDir).filter((f) => f.endsWith(".ts"));
const indexSrc = readFileSync(resolve(root, "src/game/achievements/index.ts"), "utf8");

/** The order the panel has always rendered, kept verbatim. */
const EXPECTED_ORDER = [
  "first-catch",
  "combo-10",
  "combo-20",
  "slice-10",
  "jar-1",
  "level-6",
  "score-3000",
  "score-6000",
  "runs-5",
  "inferno-1500",
  "blitz-3000",
  "goldrush-2jars",
  "storm-60",
  "hardcore-jar",
  "combo-40",
  "feast-3jars",
];

describe("achievements split — equivalence with the old single file", () => {
  it("keeps the exact sixteen ids in the exact order", () => {
    expect(ACHIEVEMENTS.map((a) => a.id)).toEqual(EXPECTED_ORDER);
  });

  it("has one definition file per achievement, and no extras", () => {
    expect(defFiles.length).toBe(16);
    // blitz-3000 -> blitz_3000.ts
    for (const id of EXPECTED_ORDER) {
      expect(defFiles).toContain(`${id.replace(/-/g, "_")}.ts`);
    }
  });

  it("keeps the map in lockstep with the array", () => {
    expect(ACHIEVEMENT_MAP.size).toBe(ACHIEVEMENTS.length);
    for (const a of ACHIEVEMENTS) expect(ACHIEVEMENT_MAP.get(a.id)).toBe(a);
  });

  it("keeps every field well-formed", () => {
    for (const a of ACHIEVEMENTS) {
      expect(a.name.length).toBeGreaterThan(3);
      expect(a.description.length).toBeGreaterThan(10);
      expect(a.glyph.length).toBeGreaterThan(0);
      expect(["gold", "brine", "chili", "jade"]).toContain(a.tone);
      // Vietnamese copy: no unaccented fallbacks ("HONG" instead of "HỒNG")
      expect(a.name).not.toMatch(/^(HONG|CHUA|DUA)/);
    }
  });

  it("documents the grant expression inside each definition file", () => {
    // Each def must say *when* it unlocks, or the split lost the reason it exists.
    for (const f of defFiles) {
      const src = readFileSync(resolve(defsDir, f), "utf8");
      expect(src, `${f} must state its unlock condition`).toMatch(/Unlocks when:/);
      expect(src, `${f} must state why it exists`).toMatch(/Why this one exists:/);
    }
  });

  it("keeps the checker's grants aligned with the definition files", () => {
    // A def whose id never appears in the checker can never unlock — the exact
    // class of bug a 16-file split invites.
    for (const id of EXPECTED_ORDER) {
      expect(indexSrc, `${id} must be granted somewhere`).toContain(`"${id}"`);
    }
  });

  it("still unlocks the same things for the same run", () => {
    const run = { score: 6000, catches: 60, bestCombo: 40, level: 6, jars: 3, sliced: 10, time: 60, mode: "feast" as const };
    const progress = { runs: 5, totalJars: 3, totalSliced: 10, bestScore: 6000 };
    const unlocked = checkAchievements(run, progress, []);
    // every non-mode-specific gate is met, plus feast-3jars
    expect(unlocked).toEqual([
      "first-catch",
      "combo-10",
      "combo-20",
      "slice-10",
      "jar-1",
      "level-6",
      "score-3000",
      "score-6000",
      "runs-5",
      "combo-40",
      "feast-3jars",
    ]);
  });

  it("never re-grants what is already unlocked", () => {
    const run = { score: 6000, catches: 60, bestCombo: 40, level: 6, jars: 3, sliced: 10, time: 60, mode: "classic" as const };
    const progress = { runs: 5, totalJars: 3, totalSliced: 10, bestScore: 6000 };
    const all = checkAchievements(run, progress, []);
    expect(checkAchievements(run, progress, all)).toEqual([]);
  });
});
