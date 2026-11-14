import { describe, expect, it } from "vitest";
import { MASTER_GAIN, MUSIC_BUS_BASE, masterGain, musicBusGain, sfxPeak, unit } from "../src/game/audioLevels";

describe("audio gain math (v1.1.6)", () => {
  it("unit() clamps and rejects garbage", () => {
    expect(unit(0.5)).toBe(0.5);
    expect(unit(-3)).toBe(0);
    expect(unit(9)).toBe(1);
    expect(unit(NaN, 0.7)).toBe(0.7);
    expect(unit("x", 0.2)).toBe(0.2);
  });

  it("musicBusGain is base × volume, and exactly 0 when disabled", () => {
    expect(musicBusGain(true, 1)).toBe(MUSIC_BUS_BASE);
    expect(musicBusGain(true, 0.6)).toBeCloseTo(0.3, 10);
    expect(musicBusGain(true, 0)).toBe(0);
    expect(musicBusGain(false, 1)).toBe(0);
  });

  it("music volume 0 produces silence even when the gate is open", () => {
    expect(musicBusGain(true, 0)).toBe(0);
  });

  it("sfxPeak scales the base gain and never goes negative", () => {
    expect(sfxPeak(0.2, 0.5)).toBeCloseTo(0.1, 10);
    expect(sfxPeak(-1, 1)).toBe(0);
    expect(sfxPeak(1, 2)).toBe(1); // volume clamped to 1
  });

  it("masterGain honours the mute flag", () => {
    expect(masterGain(true)).toBe(0);
    expect(masterGain(false)).toBe(MASTER_GAIN);
  });

  it("regression: default volume 0.6 ≠ the old flat 0.5 bus — the reload bug", () => {
    // Before the fix, unlock() hard-wired 0.5 and ignored settings until a
    // later setter ran; now the first note already respects musicVolume.
    expect(musicBusGain(true, 0.6)).not.toBe(0.5);
  });
});

describe("the base gain is clamped, not merely floored", () => {
  /*
   * `unit()` clamps its argument and `volume` went through it — but the *base*
   * gain only had `Math.max(0, x)`, and `Math.max(0, Infinity)` is Infinity.
   * So `sfxPeak(Infinity, 1)` returned Infinity into `GainNode.gain.value`.
   *
   * WebAudio does not reject that: it clips to full scale and, on some
   * implementations, latches the node so later ramps cannot recover — which
   * presents as "the effects stopped after one loud frame" and is impossible
   * to reproduce without the exact value that caused it.
   *
   * Clamping at 1 is also the correct audio answer: a peak above unity is
   * digital clipping by definition, so nothing above it is worth preserving.
   */
  it("returns 0 for an infinite base gain instead of Infinity", () => {
    expect(Number.isFinite(sfxPeak(Infinity, 1))).toBe(true);
    expect(sfxPeak(Infinity, 1)).toBe(0);
  });

  it("returns 0 for a NaN base gain instead of NaN", () => {
    expect(Number.isFinite(sfxPeak(NaN, 1))).toBe(true);
    expect(sfxPeak(NaN, 1)).toBe(0);
  });

  it("clamps a base gain above unity to unity", () => {
    // 2.0 is a plausible typo for "louder"; the correct result is full scale.
    expect(sfxPeak(2, 1)).toBe(1);
    expect(sfxPeak(100, 0.5)).toBe(0.5);
  });

  it("still scales normally for real input", () => {
    expect(sfxPeak(0.8, 0.5)).toBeCloseTo(0.4, 6);
    expect(sfxPeak(0.8, 0)).toBe(0);
    expect(sfxPeak(0, 1)).toBe(0);
  });

  it("never produces a value outside 0..1 from any input", () => {
    for (const base of [0, 0.3, 1, 2, -1, Infinity, -Infinity, NaN]) {
      for (const vol of [0, 0.5, 1, 2, -1, Infinity, NaN]) {
        const out = sfxPeak(base, vol);
        expect(Number.isFinite(out), `sfxPeak(${base}, ${vol})`).toBe(true);
        expect(out, `sfxPeak(${base}, ${vol}) out of range`).toBeGreaterThanOrEqual(0);
        expect(out).toBeLessThanOrEqual(1);
      }
    }
  });
});
