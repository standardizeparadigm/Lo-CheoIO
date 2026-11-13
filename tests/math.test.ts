import { describe, expect, it } from "vitest";
import { clamp, clamp01, damp, lerp } from "../src/utils/math";

describe("clamp", () => {
  it("bounds on both sides and passes through in range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });

  it("maps NaN to the lower bound (NaN comparisons are false)", () => {
    expect(clamp(NaN, 2, 8)).toBe(2);
  });

  it("clamp01 is the 0..1 case", () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(0.42)).toBe(0.42);
    expect(clamp01(7)).toBe(1);
  });
});

describe("lerp", () => {
  it("interpolates and does not clamp t", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 2)).toBe(30);
  });
});

describe("damp", () => {
  it("moves towards the target without overshooting", () => {
    const mid = damp(0, 1, 6, 1 / 60);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
  });

  it("is frame-rate independent: 2 × 1/120s lands where 1 × 1/60s does", () => {
    let a = 0;
    a = damp(a, 1, 6, 1 / 60);
    let b = 0;
    b = damp(b, 1, 6, 1 / 120);
    b = damp(b, 1, 6, 1 / 120);
    expect(b).toBeCloseTo(a, 10);
  });

  it("never overshoots on a very long frame (the old Math.min clamp did less)", () => {
    expect(damp(0, 1, 6, 100)).toBeCloseTo(1, 10);
  });

  it("is inert for zero/negative rate or dt, and for junk", () => {
    expect(damp(0.3, 1, 0, 1 / 60)).toBe(0.3);
    expect(damp(0.3, 1, -2, 1 / 60)).toBe(0.3);
    expect(damp(0.3, 1, 6, 0)).toBe(0.3);
    expect(damp(0.3, 1, 6, -1)).toBe(0.3);
  });
});
