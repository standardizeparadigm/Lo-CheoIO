import { describe, expect, it } from "vitest";
import { MODES, MODE_LIST, isModeId, type ModeId } from "../src/game/modes";

/**
 * Guards the v1.1.7 split of `game/modes.ts` (schema-lite, no fixtures).
 *
 * The refactor moved nine balance records into nine files and the formulas
 * into `modeMath.ts`. These checks would have caught a dropped field or a
 * reordered picker; `modes-balance.test.ts` already pins the numbers.
 */
describe("modes split (v1.1.7)", () => {
  const IDS: ModeId[] = [
    "classic", "zen", "inferno", "blitz", "goldrush", "storm", "hardcore", "combo", "feast",
  ];

  it("MODES covers exactly the nine ids, in picker order", () => {
    expect(Object.keys(MODES)).toEqual(IDS);
  });

  it("MODE_LIST mirrors MODES one-to-one", () => {
    expect(MODE_LIST.map((m) => m.id)).toEqual(IDS);
    for (const m of MODE_LIST) expect(MODES[m.id]).toBe(m);
  });

  it("every record repeats its own id (a copy-paste hazard across files)", () => {
    for (const id of IDS) expect(MODES[id].id, id).toBe(id);
  });

  it("every record carries the full required surface", () => {
    const required = ["name", "tagline", "description", "badge", "accent", "gradient"] as const;
    const numeric = ["scoreMult", "speedMult", "hazardMult", "spawnMult"] as const;
    for (const m of MODE_LIST) {
      for (const k of required) expect(typeof m[k], `${m.id}.${k}`).toBe("string");
      expect(m.name.length, `${m.id}.name`).toBeGreaterThan(0);
      for (const k of numeric) {
        expect(Number.isFinite(m[k]), `${m.id}.${k}`).toBe(true);
        expect(m[k], `${m.id}.${k}`).toBeGreaterThanOrEqual(0);
      }
      expect(m.tint === null || typeof m.tint === "string").toBe(true);
    }
  });

  it("optional knobs stay optional and, when present, sane", () => {
    for (const m of MODE_LIST) {
      if (m.timeLimit !== undefined) expect(m.timeLimit).toBeGreaterThan(0);
      if (m.maxCracks !== undefined) expect(m.maxCracks).toBeGreaterThanOrEqual(1);
      for (const k of ["goldMult", "comboWindowMult", "jarBonusMult"] as const) {
        if (m[k] !== undefined) expect(m[k]).toBeGreaterThan(0);
      }
    }
  });

  it("isModeId accepts the nine and rejects everything else", () => {
    for (const id of IDS) expect(isModeId(id)).toBe(true);
    for (const bad of ["", "Classic", "CLASSIC", "mode10", null, undefined, 0, {}, []]) {
      expect(isModeId(bad)).toBe(false);
    }
  });
});
