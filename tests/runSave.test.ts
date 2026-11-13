import { afterEach, describe, expect, it } from "vitest";
import {
  RUN_SAVE_KEY,
  clearSavedRun,
  loadSavedRun,
  normalizeSavedRun,
  saveSavedRun,
  type SavedRun,
} from "../src/game/runSave";

const store = new Map<string, string>();

function stubLocalStorage() {
  (globalThis as { localStorage?: Storage }).localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  } as unknown as Storage;
}

stubLocalStorage();
afterEach(() => store.clear());

const VALID: SavedRun = {
  version: 1,
  savedAt: 1_700_000_000_000,
  mode: "feast",
  stats: { score: 1234, catches: 42, bestCombo: 18, level: 5, jars: 2, sliced: 7, time: 95.5 },
  fill: 0.65,
  cracks: 1,
  stamina: 0.8,
  frenzy: 3,
  slow: 0,
  shield: 1,
  slamCd: 2.5,
  combo: 12,
  comboT: 1.2,
  px: 320,
  py: 480,
};

describe("normalizeSavedRun", () => {
  it("accepts a well-formed snapshot", () => {
    expect(normalizeSavedRun(VALID)).toEqual(VALID);
  });

  it("rejects wrong version / unknown mode / bad stats", () => {
    expect(normalizeSavedRun({ ...VALID, version: 2 })).toBeNull();
    expect(normalizeSavedRun({ ...VALID, mode: "nope" })).toBeNull();
    expect(normalizeSavedRun({ ...VALID, stats: null })).toBeNull();
    expect(normalizeSavedRun({ ...VALID, stats: { ...VALID.stats, score: Number.NaN } })).toBeNull();
    expect(normalizeSavedRun(null)).toBeNull();
    expect(normalizeSavedRun("junk")).toBeNull();
  });

  it("clamps out-of-range values instead of trusting them", () => {
    const out = normalizeSavedRun({
      ...VALID,
      fill: 7,
      cracks: -3,
      stamina: 99,
      comboT: 999,
      stats: { ...VALID.stats, level: 0, time: -5 },
    });
    expect(out).not.toBeNull();
    expect(out!.fill).toBe(1);
    expect(out!.cracks).toBe(0);
    expect(out!.stamina).toBe(1);
    expect(out!.comboT).toBeLessThanOrEqual(60);
    expect(out!.stats.level).toBe(1);
    expect(out!.stats.time).toBe(0);
  });
});

describe("load/save/clear roundtrip", () => {
  it("persists and reloads a run", () => {
    saveSavedRun(VALID);
    expect(loadSavedRun()).toEqual(VALID);
  });

  it("returns null on garbage and after clearSavedRun", () => {
    store.set(RUN_SAVE_KEY, "{broken");
    expect(loadSavedRun()).toBeNull();
    saveSavedRun(VALID);
    clearSavedRun();
    expect(loadSavedRun()).toBeNull();
    expect(store.has(RUN_SAVE_KEY)).toBe(false);
  });
});
