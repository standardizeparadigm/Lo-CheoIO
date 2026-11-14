import { describe, expect, it } from "vitest";

import {
  COMBO_WINDOW,
  MAX_CRACKS,
  comboWindowFor,
  jarBonus,
  levelForCatches,
  multiplierForCombo,
} from "../src/game/modeMath";
import { MODES, MODE_LIST } from "../src/game/modesIndex";

/*
 * The four formulas the engine composes its score from. Pinned here rather than
 * inferred from an engine run, because a score that is wrong by 50 points is
 * invisible in play and obvious in a table.
 */

describe("multiplierForCombo", () => {
  it("starts at ×1 and climbs one step per 4 catches", () => {
    expect(multiplierForCombo(0, false)).toBe(1);
    expect(multiplierForCombo(3, false)).toBe(1);
    expect(multiplierForCombo(4, false)).toBe(2);
    expect(multiplierForCombo(7, false)).toBe(2);
    expect(multiplierForCombo(8, false)).toBe(3);
  });

  it("tops out at ×9 so a long run cannot run away", () => {
    expect(multiplierForCombo(32, false)).toBe(9);
    expect(multiplierForCombo(400, false)).toBe(9);
    expect(multiplierForCombo(Number.MAX_SAFE_INTEGER, false)).toBe(9);
  });

  it("doubles in frenzy, and doubling happens after the cap", () => {
    // The order matters: capping first keeps frenzy at ×18 max, not ×19.
    expect(multiplierForCombo(0, true)).toBe(2);
    expect(multiplierForCombo(400, true)).toBe(18);
  });

  it("treats a negative or fractional combo as zero-ish, never below ×1", () => {
    expect(multiplierForCombo(-5, false)).toBe(1);
    expect(multiplierForCombo(-5, true)).toBe(2);
    expect(multiplierForCombo(3.9, false)).toBe(1);
  });
});

describe("levelForCatches", () => {
  it("is level 1 until the tenth catch", () => {
    for (let n = 0; n < 10; n++) expect(levelForCatches(n)).toBe(1);
  });

  it("steps once per 10 catches", () => {
    expect(levelForCatches(10)).toBe(2);
    expect(levelForCatches(19)).toBe(2);
    expect(levelForCatches(20)).toBe(3);
    expect(levelForCatches(100)).toBe(11);
  });

  it("never returns a level below 1 for rubbish input", () => {
    expect(levelForCatches(-1)).toBe(1);
  });
});

describe("jarBonus", () => {
  it("is 250 at level 1 and +50 per level", () => {
    expect(jarBonus(1)).toBe(250);
    expect(jarBonus(2)).toBe(300);
    expect(jarBonus(10)).toBe(700);
  });

  it("floors the level at 1 rather than going negative", () => {
    // A zero or negative level can arrive from a corrupted save.
    expect(jarBonus(0)).toBe(250);
    expect(jarBonus(-4)).toBe(250);
  });
});

describe("comboWindowFor", () => {
  it("multiplies the shared window by the mode's own factor", () => {
    expect(comboWindowFor({})).toBeCloseTo(COMBO_WINDOW, 5);
    expect(comboWindowFor({ comboWindowMult: 2 })).toBeCloseTo(COMBO_WINDOW * 2, 5);
  });

  it("accepts a mode id as well as a record", () => {
    for (const id of Object.keys(MODES) as Array<keyof typeof MODES>) {
      const fromId = comboWindowFor(id);
      const fromRecord = comboWindowFor(MODES[id]);
      expect(fromId).toBeCloseTo(fromRecord, 5);
    }
  });

  it("never produces a zero or negative window", () => {
    for (const id of Object.keys(MODES) as Array<keyof typeof MODES>) {
      expect(comboWindowFor(id)).toBeGreaterThan(0);
    }
  });
});

describe("the mode table", () => {
  it("keeps MODES and MODE_LIST in the same order", () => {
    // The picker iterates MODE_LIST; everything else looks up MODES. Drifting
    // order means the picker shows one thing and the engine reads another.
    const fromRecord = Object.keys(MODES);
    const fromList = MODE_LIST.map((m) => m.id);
    expect(fromList).toEqual(fromRecord);
  });

  it("has nine modes, all with a unique id", () => {
    expect(MODE_LIST).toHaveLength(9);
    expect(new Set(MODE_LIST.map((m) => m.id)).size).toBe(9);
  });

  it("exports MAX_CRACKS as the default but lets a mode override it", () => {
    expect(MAX_CRACKS).toBe(3);
    for (const mode of MODE_LIST) {
      if (mode.maxCracks !== undefined) {
        expect(mode.maxCracks).toBeGreaterThan(0);
      }
    }
  });
});

describe("isModeId", () => {
  it("accepts every real mode id", async () => {
    const { isModeId } = await import("../src/game/modesIndex");
    for (const id of Object.keys(MODES)) expect(isModeId(id)).toBe(true);
  });

  it("rejects a name that only exists on the prototype chain", async () => {
    /*
     * Regression: the guard used to be `v in MODES`, and `in` walks the
     * prototype. `isModeId("constructor")` returned true, so a run save edited
     * to say `{"mode":"constructor"}` passed normalisation and handed `Object`
     * to the engine as a mode record.
     */
    const { isModeId } = await import("../src/game/modesIndex");
    for (const hostile of ["toString", "constructor", "__proto__", "valueOf", "hasOwnProperty"]) {
      expect(isModeId(hostile), `${hostile} must not be a mode`).toBe(false);
    }
  });

  it("rejects non-strings", async () => {
    const { isModeId } = await import("../src/game/modesIndex");
    for (const v of [null, undefined, 0, 1, {}, [], true, Symbol("classic")]) {
      expect(isModeId(v)).toBe(false);
    }
  });

  it("closes the hole at the disk boundary", async () => {
    // The guard is only worth fixing if the storage normaliser actually uses it.
    const { readFileSync } = await import("node:fs");
    const src = readFileSync("src/game/runSave.ts", "utf8");
    expect(src).toContain("isModeId(");
    const fn = (await import("../src/game/runSave")).normalizeSavedRun;
    expect(fn({ mode: "constructor", score: 10, level: 2, catches: 5 })).toBeNull();
  });
});
