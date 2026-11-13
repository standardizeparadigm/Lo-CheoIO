import { describe, expect, it } from "vitest";
import { PRESETS, PRESET_LIST, applyPreset, matchPreset } from "../src/game/settingsPresets";
import { DEFAULT_SETTINGS, normalizeSettings, type GameSettings } from "../src/game/settings";

const base: GameSettings = { ...DEFAULT_SETTINGS };

describe("settings presets (v1.1.6)", () => {
  it("ships exactly four presets with unique ids", () => {
    expect(PRESET_LIST).toHaveLength(4);
    expect(new Set(PRESET_LIST.map((p) => p.id)).size).toBe(4);
  });

  it("balanced reproduces the shipped defaults byte-for-byte", () => {
    expect(applyPreset(base, "balanced")).toEqual({ ...base });
  });

  it("no preset ever touches the language", () => {
    for (const preset of PRESET_LIST) {
      const out = applyPreset({ ...base, language: "ja" }, preset.id);
      expect(out.language, preset.id).toBe("ja");
    }
  });

  it("performance disables glow + halves particles via visualQuality low", () => {
    const out = applyPreset(base, "performance");
    expect(out.visualQuality).toBe("low");
    expect(out.shakeLevel).toBe("low");
    expect(out.reducedMotion).toBe(true);
  });

  it("cinematic pushes volumes up without exceeding the 0–100 clamp", () => {
    const out = normalizeSettings(applyPreset(base, "cinematic"));
    expect(out.sfxVolume).toBeGreaterThanOrEqual(80);
    expect(out.musicVolume).toBeGreaterThan(60);
    expect(out.sfxVolume).toBeLessThanOrEqual(100);
    expect(out.musicVolume).toBeLessThanOrEqual(100);
  });

  it("speedrun silences music and disables auto-pause", () => {
    const out = applyPreset(base, "speedrun");
    expect(out.music).toBe(false);
    expect(out.autoPauseOnBlur).toBe(false);
  });

  it("matchPreset reports the preset whose patch is fully satisfied", () => {
    expect(matchPreset(normalizeSettings(applyPreset(base, "performance")))).toBe("performance");
    expect(matchPreset(normalizeSettings(applyPreset(base, "cinematic")))).toBe("cinematic");
  });

  it("matchPreset returns null for a hand-tuned mix", () => {
    expect(matchPreset({ ...base, sfxVolume: 33, musicVolume: 11 })).toBeNull();
  });

  it("applying a preset is idempotent", () => {
    const once = applyPreset(base, PRESETS.cinematic.id);
    expect(applyPreset(once, "cinematic")).toEqual(once);
  });
});
