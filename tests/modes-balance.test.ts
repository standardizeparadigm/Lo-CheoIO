import { describe, expect, it } from "vitest";
import {
  MODES,
  MODE_LIST,
  COMBO_WINDOW,
  MAX_CRACKS,
  comboWindowFor,
  jarBonusFor,
  multiplierForCombo,
  isModeId,
  type ModeId,
} from "../src/game/modes";

describe("mode catalogue invariants", () => {
  it("MODE_LIST has unique ids and covers the whole MODES registry", () => {
    const ids = MODE_LIST.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(Object.keys(MODES).sort());
  });

  it("every mode has sane positive multipliers", () => {
    for (const m of MODE_LIST) {
      expect(m.scoreMult, `${m.id} scoreMult`).toBeGreaterThan(0);
      expect(m.speedMult, `${m.id} speedMult`).toBeGreaterThan(0);
      expect(m.spawnMult, `${m.id} spawnMult`).toBeGreaterThan(0);
      expect(m.hazardMult, `${m.id} hazardMult`).toBeGreaterThanOrEqual(0);
      expect(m.goldMult ?? 1, `${m.id} goldMult`).toBeGreaterThan(0);
    }
  });

  it("blitz is the only timed mode (60s); hardcore is the only crack-limited mode (1)", () => {
    for (const m of MODE_LIST) {
      if (m.timeLimit !== undefined) expect(m.id).toBe("blitz");
      if (m.maxCracks !== undefined) expect(m.id).toBe("hardcore");
    }
    expect(MODES.blitz.timeLimit).toBe(60);
    expect(MODES.hardcore.maxCracks).toBe(1);
  });

  it("combo mode doubles the combo window; feast mode 2.5x jar bonus", () => {
    expect(MODES.combo.comboWindowMult).toBe(2);
    expect(MODES.feast.jarBonusMult).toBe(2.5);
  });

  it("accent colors are hex; gradients are CSS linear-gradients; tint is null or rgba", () => {
    for (const m of MODE_LIST) {
      expect(m.accent, m.id).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(m.gradient, m.id).toMatch(/linear-gradient/);
      if (m.tint !== null) expect(m.tint, m.id).toMatch(/rgba\(/);
    }
  });

  it("isModeId round-trips every catalogue id", () => {
    for (const m of MODE_LIST) expect(isModeId(m.id)).toBe(true);
    expect(isModeId("nope")).toBe(false);
    expect(isModeId(undefined)).toBe(false);
  });
});

describe("combo math", () => {
  it("multiplierForCombo is monotonic non-decreasing and capped", () => {
    let prev = 0;
    for (let c = 0; c <= 60; c++) {
      const m = multiplierForCombo(c, false);
      expect(m).toBeGreaterThanOrEqual(prev);
      prev = m;
    }
    // frenzy (Ớt Hiểm) doubles everything but the cap curve stays bounded
    for (let c = 0; c <= 60; c++) {
      expect(multiplierForCombo(c, true)).toBeGreaterThanOrEqual(multiplierForCombo(c, false));
    }
  });

  it("comboWindowFor accepts either a ModeId or a bare config, same result", () => {
    const byId = comboWindowFor("combo" as ModeId);
    const byCfg = comboWindowFor({ comboWindowMult: MODES.combo.comboWindowMult });
    expect(byId).toBe(byCfg);
    expect(byId).toBe(COMBO_WINDOW * 2);
    expect(comboWindowFor("classic" as ModeId)).toBe(COMBO_WINDOW);
  });

  it("jarBonusFor scales with level and mode multiplier", () => {
    expect(jarBonusFor(1, "classic" as ModeId)).toBeGreaterThan(0);
    expect(jarBonusFor(5, "classic" as ModeId)).toBeGreaterThan(jarBonusFor(1, "classic" as ModeId));
    expect(jarBonusFor(5, "feast" as ModeId)).toBeCloseTo(jarBonusFor(5, "classic" as ModeId) * 2.5, 5);
  });

  it("MAX_CRACKS default is 3 (jar shatters at 4th)", () => {
    expect(MAX_CRACKS).toBe(3);
  });
});
