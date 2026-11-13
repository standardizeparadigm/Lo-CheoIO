import { describe, expect, it } from "vitest";
import { DEFS, KINDS } from "../src/game/engine";
import { itemWeight, weightTable, weightedPick } from "../src/game/spawn";
import { MODES } from "../src/game/modes";

describe("itemWeight", () => {
  it("matches the raw definition curve when no modifiers apply", () => {
    const def = DEFS.ca;
    expect(itemWeight(def, { level: 3 })).toBe(def.weight(3));
  });

  it("scales hazards by hazardMult and golden items by goldMult", () => {
    const hazard = KINDS.find((k) => DEFS[k].hazard)!;
    const gold = KINDS.find((k) => DEFS[k].power || DEFS[k].fillBoost)!;
    expect(itemWeight(DEFS[hazard], { level: 5, mode: { hazardMult: 2 } })).toBeCloseTo(
      DEFS[hazard].weight(5) * 2,
    );
    expect(itemWeight(DEFS[gold], { level: 5, mode: { goldMult: 3 } })).toBeCloseTo(
      DEFS[gold].weight(5) * 3,
    );
  });

  it("calms decorative passes (hazard ×0.4, gold ×0.5)", () => {
    const hazard = KINDS.find((k) => DEFS[k].hazard)!;
    const gold = KINDS.find((k) => DEFS[k].power)!;
    expect(itemWeight(DEFS[hazard], { level: 4, deco: true })).toBeCloseTo(DEFS[hazard].weight(4) * 0.4);
    expect(itemWeight(DEFS[gold], { level: 4, deco: true })).toBeCloseTo(DEFS[gold].weight(4) * 0.5);
  });

  it("never returns a negative or non-finite weight", () => {
    const weird = { weight: () => NaN };
    expect(itemWeight(weird, { level: 1 })).toBe(0);
  });
});

describe("weightedPick", () => {
  it("is deterministic for a fixed random sequence", () => {
    const opts = { level: 2, mode: MODES.classic };
    expect(weightedPick(KINDS, opts, () => 0)).toBe(KINDS[0]);
    // the tail fallback must land on a kind that actually has weight —
    // `sau` weighs 0 below level 4 and must never be picked at level 2
    const tail = weightedPick(KINDS, opts, () => 0.999999);
    expect(tail).toBe("toivang"); // last kind with a non-zero weight at lvl 2
    const weights = weightTable(KINDS, opts);
    expect(weights[KINDS.indexOf(tail)]).toBeGreaterThan(0);
    expect(weights[KINDS.indexOf("sau")]).toBe(0);
  });

  it("never falls through to a zero-weight kind at low levels", () => {
    // every random value, at a level where several kinds weigh 0
    for (let i = 0; i < 200; i++) {
      const picked = weightedPick(KINDS, { level: 1, mode: MODES.classic }, () => i / 200);
      const w = weightTable(KINDS, { level: 1, mode: MODES.classic })[KINDS.indexOf(picked)];
      expect(w, `picked ${picked} at r=${i / 200}`).toBeGreaterThan(0);
    }
  });

  it("always returns a real kind, even when every weight is zero", () => {
    const zero = { level: 1, mode: { hazardMult: 0, goldMult: 0 } };
    expect(KINDS).toContain(weightedPick(KINDS, zero, () => 0.5));
  });

  it("clamps a random() that returns exactly 1 (Math.random never does, spies do)", () => {
    expect(KINDS).toContain(weightedPick(KINDS, { level: 1 }, () => 1));
  });

  it("storm is hazard-heavier than classic at the same level", () => {
    const idx = KINDS.findIndex((k) => DEFS[k].hazard);
    const classic = weightTable(KINDS, { level: 5, mode: MODES.classic })[idx];
    const storm = weightTable(KINDS, { level: 5, mode: MODES.storm })[idx];
    expect(storm).toBeGreaterThan(classic);
  });
});
