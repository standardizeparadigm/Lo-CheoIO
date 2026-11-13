import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_SETTINGS,
  SETTINGS_KEY,
  loadSettings,
  normalizeSettings,
  resetSettingsKeepingLanguage,
  saveSettings,
  updateSettings,
} from "../src/game/settings";

const store = new Map<string, string>();

function stubLocalStorage() {
  const localStorageMock = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  };
  (globalThis as { localStorage?: Storage }).localStorage = localStorageMock as unknown as Storage;
}

stubLocalStorage();
afterEach(() => store.clear());

describe("normalizeSettings", () => {
  it("returns defaults for non-object input", () => {
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings(undefined)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings(42)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings("nope")).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings([])).toEqual(DEFAULT_SETTINGS);
  });

  it("keeps valid values and drops garbage", () => {
    expect(
      normalizeSettings({
        sfx: false,
        music: "yes",
        shake: 0,
        reducedMotion: true,
        junk: "x",
        sfxVolume: 55,
        musicVolume: "loud",
        shakeLevel: "hurricane",
        visualQuality: "ultra",
        autoPauseOnBlur: "no",
        language: "klingon",
      }),
    ).toEqual({
      ...DEFAULT_SETTINGS,
      sfx: false,
      shake: true,
      reducedMotion: true,
      sfxVolume: 55,
    });
  });

  it("clamps volumes into 0–100 integers", () => {
    expect(normalizeSettings({ sfxVolume: -20 }).sfxVolume).toBe(0);
    expect(normalizeSettings({ sfxVolume: 240 }).sfxVolume).toBe(100);
    expect(normalizeSettings({ musicVolume: 62.7 }).musicVolume).toBe(63);
    expect(normalizeSettings({ musicVolume: Number.NaN }).musicVolume).toBe(DEFAULT_SETTINGS.musicVolume);
  });

  it("validates language against the 7 supported ids", () => {
    expect(normalizeSettings({ language: "fr" }).language).toBe("fr");
    expect(normalizeSettings({ language: "TH" }).language).toBe(DEFAULT_SETTINGS.language);
    expect(normalizeSettings({ language: 12 }).language).toBe(DEFAULT_SETTINGS.language);
  });

  it("languageFallback seeds missing language from the i18n layer", () => {
    expect(normalizeSettings(null, "ja").language).toBe("ja");
    expect(normalizeSettings({}, "fr").language).toBe("fr");
    expect(normalizeSettings({ language: "en" }, "fr").language).toBe("en");
    expect(normalizeSettings(null, "not-a-lang").language).toBe(DEFAULT_SETTINGS.language);
  });

  it("accepts shakeLevel / visualQuality only from the allowed set", () => {
    expect(normalizeSettings({ shakeLevel: "low" }).shakeLevel).toBe("low");
    expect(normalizeSettings({ shakeLevel: "high" }).shakeLevel).toBe("high");
    expect(normalizeSettings({ shakeLevel: "off" }).shakeLevel).toBe(DEFAULT_SETTINGS.shakeLevel);
    expect(normalizeSettings({ visualQuality: "low" }).visualQuality).toBe("low");
    expect(normalizeSettings({ visualQuality: "medium" }).visualQuality).toBe(DEFAULT_SETTINGS.visualQuality);
  });
});

describe("load/save roundtrip", () => {
  it("persists and reloads settings", () => {
    saveSettings({ ...DEFAULT_SETTINGS, sfx: false, music: false, sfxVolume: 35 });
    expect(loadSettings()).toEqual({ ...DEFAULT_SETTINGS, sfx: false, music: false, sfxVolume: 35 });
    expect(store.get(SETTINGS_KEY)).toContain('"sfx":false');
  });

  it("falls back to defaults when storage holds garbage", () => {
    store.set(SETTINGS_KEY, "{not json");
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
    store.set(SETTINGS_KEY, JSON.stringify({ sfx: "loud" }));
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it("updateSettings patches a subset", () => {
    saveSettings({ ...DEFAULT_SETTINGS });
    const next = updateSettings({ music: false });
    expect(next.music).toBe(false);
    expect(next.sfx).toBe(true);
    expect(loadSettings().music).toBe(false);
  });

  it("resetSettingsKeepingLanguage restores defaults but keeps language", () => {
    saveSettings({ ...DEFAULT_SETTINGS, language: "ja", sfx: false, sfxVolume: 10 });
    const next = resetSettingsKeepingLanguage({ ...DEFAULT_SETTINGS, language: "ja", sfx: false, sfxVolume: 10 });
    expect(next.language).toBe("ja");
    expect(next.sfx).toBe(true);
    expect(next.sfxVolume).toBe(DEFAULT_SETTINGS.sfxVolume);
    expect(loadSettings().language).toBe("ja");
  });
});

describe("loadSettings — first-run OS defaults", () => {
  it("uses OS defaults only when nothing is stored", () => {
    expect(loadSettings("vi", { reducedMotion: true }).reducedMotion).toBe(true);
    expect(loadSettings("vi")).toEqual(DEFAULT_SETTINGS);
  });

  it("stored settings always beat OS defaults (even a partial object)", () => {
    saveSettings({ ...DEFAULT_SETTINGS, reducedMotion: false });
    expect(loadSettings("vi", { reducedMotion: true }).reducedMotion).toBe(false);
  });
});

describe("updateSettings — explicit base", () => {
  it("patches the provided base instead of re-reading blocked storage", () => {
    // simulate storage that refuses writes (Safari private mode)
    const blocked = {
      getItem: () => null,
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {},
      clear: () => {},
    };
    const original = globalThis.localStorage;
    (globalThis as { localStorage?: Storage }).localStorage = blocked as unknown as Storage;
    try {
      const base = { ...DEFAULT_SETTINGS, sfxVolume: 40, music: false };
      const next = updateSettings({ musicVolume: 20 }, base);
      expect(next.sfxVolume).toBe(40); // base kept, not defaults
      expect(next.music).toBe(false);
      expect(next.musicVolume).toBe(20);
    } finally {
      (globalThis as { localStorage?: Storage }).localStorage = original;
    }
  });
});
