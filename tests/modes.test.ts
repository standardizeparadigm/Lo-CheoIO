import { describe, expect, it } from "vitest";
import {
  COMBO_WINDOW,
  MAX_CRACKS,
  MODES,
  MODE_LIST,
  isModeId,
  jarBonus,
  levelForCatches,
  multiplierForCombo,
} from "../src/game/modes";

describe("multiplierForCombo", () => {
  it("starts at ×1 with no combo", () => {
    expect(multiplierForCombo(0, false)).toBe(1);
  });

  it("steps up every 4 catches", () => {
    expect(multiplierForCombo(3, false)).toBe(1);
    expect(multiplierForCombo(4, false)).toBe(2);
    expect(multiplierForCombo(8, false)).toBe(3);
    expect(multiplierForCombo(12, false)).toBe(4);
  });

  it("caps at ×9", () => {
    expect(multiplierForCombo(400, false)).toBe(9);
  });

  it("doubles during frenzy (and can reach ×18)", () => {
    expect(multiplierForCombo(0, true)).toBe(2);
    expect(multiplierForCombo(36, true)).toBe(18);
  });

  it("tolerates negative combo defensively", () => {
    expect(multiplierForCombo(-5, false)).toBe(1);
  });
});

describe("levelForCatches", () => {
  it("is level 1 until 10 catches", () => {
    expect(levelForCatches(0)).toBe(1);
    expect(levelForCatches(9)).toBe(1);
  });

  it("grows one level per 10 catches", () => {
    expect(levelForCatches(10)).toBe(2);
    expect(levelForCatches(57)).toBe(6);
  });
});

describe("jarBonus", () => {
  it("scales with level", () => {
    expect(jarBonus(1)).toBe(250);
    expect(jarBonus(4)).toBe(400);
  });

  it("never drops below the level-1 bonus", () => {
    expect(jarBonus(0)).toBe(250);
  });
});

describe("MODES", () => {
  it("ships exactly seven modes in a stable order", () => {
    expect(MODE_LIST.map((m) => m.id)).toEqual([
      "classic",
      "zen",
      "inferno",
      "blitz",
      "goldrush",
      "storm",
      "hardcore",
    ]);
  });

  it("blitz is a 60-second time attack worth ×1.25", () => {
    expect(MODES.blitz.timeLimit).toBe(60);
    expect(MODES.blitz.scoreMult).toBe(1.25);
    expect(MODES.blitz.speedMult).toBeGreaterThan(1);
    expect(MODES.blitz.spawnMult).toBeLessThanOrEqual(1);
  });

  it("storm pours dense slow rain at a discount", () => {
    expect(MODES.storm.spawnMult).toBeLessThan(0.8);
    expect(MODES.storm.speedMult).toBeLessThan(1);
    expect(MODES.storm.scoreMult).toBe(0.75);
    expect(MODES.storm.hazardMult).toBeGreaterThan(1);
    expect(MODES.storm.timeLimit).toBeUndefined();
  });

  it("hardcore ends the run after a single crack but pays double", () => {
    expect(MODES.hardcore.maxCracks).toBe(1);
    expect(MODES.hardcore.scoreMult).toBe(2);
    expect(MODES.hardcore.hazardMult).toBeGreaterThan(1);
    expect(MODES.classic.maxCracks).toBeUndefined();
  });

  it("goldrush boosts golden powers without touching hazards or score", () => {
    expect(MODES.goldrush.goldMult).toBeGreaterThan(2);
    expect(MODES.goldrush.hazardMult).toBe(1);
    expect(MODES.goldrush.scoreMult).toBe(1);
    expect(MODES.goldrush.timeLimit).toBeUndefined();
  });

  it("zen disables hazards entirely and pays half", () => {
    expect(MODES.zen.hazardMult).toBe(0);
    expect(MODES.zen.scoreMult).toBe(0.5);
    expect(MODES.zen.speedMult).toBeLessThan(1);
  });

  it("inferno is faster, hotter and worth more", () => {
    expect(MODES.inferno.speedMult).toBeGreaterThan(1);
    expect(MODES.inferno.hazardMult).toBeGreaterThan(1);
    expect(MODES.inferno.scoreMult).toBe(1.5);
  });

  it("classic is the neutral baseline", () => {
    expect(MODES.classic.scoreMult).toBe(1);
    expect(MODES.classic.speedMult).toBe(1);
    expect(MODES.classic.hazardMult).toBe(1);
    expect(MODES.classic.tint).toBeNull();
  });

  it("balance constants are sane", () => {
    expect(MAX_CRACKS).toBe(3);
    expect(COMBO_WINDOW).toBeCloseTo(2.7);
  });
});

describe("isModeId", () => {
  it("accepts the seven known modes", () => {
    expect(isModeId("classic")).toBe(true);
    expect(isModeId("zen")).toBe(true);
    expect(isModeId("inferno")).toBe(true);
    expect(isModeId("blitz")).toBe(true);
    expect(isModeId("goldrush")).toBe(true);
    expect(isModeId("storm")).toBe(true);
    expect(isModeId("hardcore")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isModeId("chaos")).toBe(false);
    expect(isModeId("")).toBe(false);
    expect(isModeId(undefined)).toBe(false);
    expect(isModeId(null)).toBe(false);
    expect(isModeId(42)).toBe(false);
  });
});
