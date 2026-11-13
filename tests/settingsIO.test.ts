import { describe, expect, it } from "vitest";
import { exportSettings, importSettings, looksLikeSettingsBackup, BACKUP_APP, BACKUP_KIND } from "../src/game/settingsIO";
import { DEFAULT_SETTINGS, normalizeSettings } from "../src/game/settings";

describe("settings backup codec (v1.1.6)", () => {
  it("export produces a readable envelope with app/kind/version/exportedAt", () => {
    const raw = exportSettings({ ...DEFAULT_SETTINGS, sfxVolume: 40 }, new Date("2026-11-13T00:00:00.000Z"));
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    expect(parsed.app).toBe(BACKUP_APP);
    expect(parsed.kind).toBe(BACKUP_KIND);
    expect(parsed.version).toBe(1);
    expect(parsed.exportedAt).toBe("2026-11-13T00:00:00.000Z");
    expect(raw).toContain("\n"); // pretty-printed
  });

  it("export → import round-trips every field", () => {
    const source = normalizeSettings({
      sfx: false, sfxVolume: 30, music: false, musicVolume: 10,
      shake: false, shakeLevel: "low", reducedMotion: true,
      visualQuality: "low", autoPauseOnBlur: false, language: "ko",
    });
    const back = importSettings(exportSettings(source));
    expect(back).toEqual(source);
  });

  it("import accepts a bare settings object (no envelope)", () => {
    const back = importSettings(JSON.stringify({ sfxVolume: 15, language: "es" }));
    expect(back?.sfxVolume).toBe(15);
    expect(back?.language).toBe("es");
    expect(back?.musicVolume).toBe(DEFAULT_SETTINGS.musicVolume);
  });

  it("import rejects: empty, invalid JSON, arrays, scalars, foreign JSON", () => {
    expect(importSettings("")).toBeNull();
    expect(importSettings("   ")).toBeNull();
    expect(importSettings("{oops")).toBeNull();
    expect(importSettings("[1,2,3]")).toBeNull();
    expect(importSettings('"just a string"')).toBeNull();
    expect(importSettings("null")).toBeNull();
    // a scoreboard has none of the settings keys
    expect(importSettings(JSON.stringify([{ id: "1", name: "A", score: 10 }]))).toBeNull();
    expect(importSettings(JSON.stringify({ unrelated: true }))).toBeNull();
  });

  it("import clamps hostile numbers instead of trusting them", () => {
    const back = importSettings(JSON.stringify({ sfxVolume: 9999, musicVolume: -42, shakeLevel: "MAXIMUM" }));
    expect(back?.sfxVolume).toBe(100);
    expect(back?.musicVolume).toBe(0);
    expect(back?.shakeLevel).toBe("high");
  });

  it("looksLikeSettingsBackup mirrors importSettings", () => {
    expect(looksLikeSettingsBackup(exportSettings(DEFAULT_SETTINGS))).toBe(true);
    expect(looksLikeSettingsBackup("{\"app\":\"other\"}")).toBe(false);
  });
});
