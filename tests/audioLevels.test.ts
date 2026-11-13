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
