import { describe, expect, it } from "vitest";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_MAP,
  checkAchievements,
  type ProgressLike,
  type RunLike,
} from "../src/game/achievements";

const baseRun: RunLike = {
  score: 0,
  catches: 0,
  bestCombo: 0,
  level: 1,
  jars: 0,
  sliced: 0,
  time: 30,
  mode: "classic",
};

const baseProgress: ProgressLike = {
  runs: 1,
  totalJars: 0,
  totalSliced: 0,
  bestScore: 0,
};

describe("achievement catalogue", () => {
  it("has 14 unique ids", () => {
    expect(ACHIEVEMENTS).toHaveLength(14);
    expect(new Set(ACHIEVEMENTS.map((a) => a.id)).size).toBe(14);
    expect(ACHIEVEMENT_MAP.size).toBe(14);
  });

  it("every achievement has display copy", () => {
    for (const a of ACHIEVEMENTS) {
      expect(a.name.length).toBeGreaterThan(0);
      expect(a.description.length).toBeGreaterThan(0);
      expect(a.glyph.length).toBeGreaterThan(0);
    }
  });
});

describe("checkAchievements", () => {
  it("unlocks nothing for a zero run with runs=1 progress", () => {
    expect(checkAchievements(baseRun, baseProgress, [])).toEqual([]);
  });

  it("grants first-catch after a single catch", () => {
    expect(checkAchievements({ ...baseRun, catches: 1 }, baseProgress, [])).toContain("first-catch");
  });

  it("grants combo milestones", () => {
    expect(checkAchievements({ ...baseRun, bestCombo: 10 }, baseProgress, [])).toContain("combo-10");
    expect(checkAchievements({ ...baseRun, bestCombo: 20 }, baseProgress, [])).toEqual(
      expect.arrayContaining(["combo-10", "combo-20"]),
    );
  });

  it("grants slice-10, jar-1, level-6 and score badges", () => {
    const ids = checkAchievements(
      { ...baseRun, sliced: 12, jars: 2, level: 6, score: 6500 },
      baseProgress,
      [],
    );
    expect(ids).toEqual(expect.arrayContaining(["slice-10", "jar-1", "level-6", "score-3000", "score-6000"]));
  });

  it("grants runs-5 only after 5 lifetime runs", () => {
    expect(checkAchievements(baseRun, { ...baseProgress, runs: 4 }, [])).not.toContain("runs-5");
    expect(checkAchievements(baseRun, { ...baseProgress, runs: 5 }, [])).toContain("runs-5");
  });

  it("grants inferno-1500 only in inferno mode", () => {
    expect(checkAchievements({ ...baseRun, score: 2000, mode: "classic" }, baseProgress, [])).not.toContain("inferno-1500");
    expect(checkAchievements({ ...baseRun, score: 2000, mode: "inferno" }, baseProgress, [])).toContain("inferno-1500");
    expect(checkAchievements({ ...baseRun, score: 1499, mode: "inferno" }, baseProgress, [])).not.toContain("inferno-1500");
  });

  it("grants blitz-3000 only in blitz mode with 3,000+", () => {
    expect(checkAchievements({ ...baseRun, score: 3000, mode: "blitz" }, baseProgress, [])).toContain("blitz-3000");
    expect(checkAchievements({ ...baseRun, score: 2999, mode: "blitz" }, baseProgress, [])).not.toContain("blitz-3000");
    expect(checkAchievements({ ...baseRun, score: 3000, mode: "classic" }, baseProgress, [])).not.toContain("blitz-3000");
  });

  it("grants storm-60 only in storm mode with 60+ catches", () => {
    expect(checkAchievements({ ...baseRun, catches: 60, mode: "storm" }, baseProgress, [])).toContain("storm-60");
    expect(checkAchievements({ ...baseRun, catches: 59, mode: "storm" }, baseProgress, [])).not.toContain("storm-60");
    expect(checkAchievements({ ...baseRun, catches: 60, mode: "classic" }, baseProgress, [])).not.toContain("storm-60");
  });

  it("grants hardcore-jar only in hardcore mode with a full jar", () => {
    expect(checkAchievements({ ...baseRun, jars: 1, mode: "hardcore" }, baseProgress, [])).toContain("hardcore-jar");
    expect(checkAchievements({ ...baseRun, jars: 0, mode: "hardcore" }, baseProgress, [])).not.toContain("hardcore-jar");
    expect(checkAchievements({ ...baseRun, jars: 1, mode: "zen" }, baseProgress, [])).not.toContain("hardcore-jar");
  });

  it("grants goldrush-2jars only in goldrush mode with 2+ jars", () => {
    expect(checkAchievements({ ...baseRun, jars: 2, mode: "goldrush" }, baseProgress, [])).toContain("goldrush-2jars");
    expect(checkAchievements({ ...baseRun, jars: 1, mode: "goldrush" }, baseProgress, [])).not.toContain("goldrush-2jars");
    expect(checkAchievements({ ...baseRun, jars: 2, mode: "inferno" }, baseProgress, [])).not.toContain("goldrush-2jars");
  });

  it("never re-grants an already unlocked id", () => {
    const ids = checkAchievements({ ...baseRun, catches: 50, score: 9999 }, baseProgress, [
      "first-catch",
      "score-3000",
      "score-6000",
    ]);
    expect(ids).not.toContain("first-catch");
    expect(ids).not.toContain("score-3000");
    expect(ids).not.toContain("score-6000");
  });
});
