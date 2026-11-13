import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, loadSettings, normalizeSettings, SETTINGS_KEY, resetSettingsKeepingLanguage } from "../src/game/settings";

const freshStorage = () => {
  const map = new Map<string, string>();
  const stub = {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, String(v)),
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear(),
  };
  return { map, stub };
};

describe("v1.1.6 settings — deep coverage", () => {
  it("defaults ship sane volumes (80 SFX / 60 music) and low-shake OFF-favouring toggles", () => {
    expect(DEFAULT_SETTINGS.sfxVolume).toBe(80);
    expect(DEFAULT_SETTINGS.musicVolume).toBe(60);
    expect(DEFAULT_SETTINGS.shakeLevel).toBe("high");
    expect(DEFAULT_SETTINGS.visualQuality).toBe("high");
    expect(DEFAULT_SETTINGS.autoPauseOnBlur).toBe(true);
    expect(DEFAULT_SETTINGS.reducedMotion).toBe(false);
    expect(DEFAULT_SETTINGS.shake).toBe(true);
  });

  it("updateSettings() persist path: load(reload) round-trips a full patch", () => {
    const { map, stub } = freshStorage();
    const g = globalThis as unknown as { localStorage?: typeof stub };
    g.localStorage = stub;
    try {
      const patched = { ...loadSettings("vi"), sfxVolume: 25, shakeLevel: "low" as const, visualQuality: "low" as const };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(patched));
      const back = loadSettings("en");
      expect(back.sfxVolume).toBe(25);
      expect(back.shakeLevel).toBe("low");
      expect(back.visualQuality).toBe("low");
    } finally {
      delete g.localStorage;
    }
  });

  it("older saves without v1.1.6 keys pick up the new defaults (not 0)", () => {
    const old = { sfx: true, music: false, shake: false, reducedMotion: true };
    const s = normalizeSettings(old, "fr");
    expect(s.sfxVolume).toBe(80);
    expect(s.musicVolume).toBe(60);
    expect(s.shakeLevel).toBe("high");
    expect(s.visualQuality).toBe("high");
    expect(s.autoPauseOnBlur).toBe(true);
    expect(s.language).toBe("fr");
  });

  it("non-numeric volume garbage falls back to defaults", () => {
    const s = normalizeSettings({ sfxVolume: "loud", musicVolume: NaN } as never, "vi");
    expect(s.sfxVolume).toBe(80);
    expect(s.musicVolume).toBe(60);
  });

  it("reset keeps language but restores everything else", () => {
    const prev = { ...DEFAULT_SETTINGS, sfxVolume: 5, musicVolume: 5, language: "ko" as const, shake: false, reducedMotion: true };
    const next = resetSettingsKeepingLanguage(prev);
    expect(next.language).toBe("ko");
    expect(next.sfxVolume).toBe(80);
    expect(next.musicVolume).toBe(60);
    expect(next.shake).toBe(true);
    expect(next.reducedMotion).toBe(false);
  });

  it("shakeLevel accepts exactly low|high; other strings fall back to high", () => {
    expect(normalizeSettings({ shakeLevel: "low" }).shakeLevel).toBe("low");
    expect(normalizeSettings({ shakeLevel: "high" }).shakeLevel).toBe("high");
    expect(normalizeSettings({ shakeLevel: "ultra" } as never).shakeLevel).toBe("high");
    expect(normalizeSettings({ shakeLevel: 3 } as never).shakeLevel).toBe("high");
  });

  it("visualQuality accepts exactly low|high; other strings fall back to high", () => {
    expect(normalizeSettings({ visualQuality: "low" }).visualQuality).toBe("low");
    expect(normalizeSettings({ visualQuality: "high" }).visualQuality).toBe("high");
    expect(normalizeSettings({ visualQuality: "4k" } as never).visualQuality).toBe("high");
  });

  it("corrupt JSON in storage never throws — falls back to defaults seeded with fallback language", () => {
    const { stub } = freshStorage();
    const g = globalThis as unknown as { localStorage?: typeof stub };
    g.localStorage = stub;
    try {
      localStorage.setItem(SETTINGS_KEY, "{not json");
      const s = loadSettings("ja");
      expect(s.language).toBe("ja");
      expect(s.sfxVolume).toBe(80);
    } finally {
      delete g.localStorage;
    }
  });

  it("every persisted value round-trips: normalize(normalize(x)) === normalize(x)", () => {
    const dirty = { sfxVolume: 101, musicVolume: -13, shakeLevel: "LOW", visualQuality: "LOW", language: "xx" } as never;
    const once = normalizeSettings(dirty, "vi");
    const twice = normalizeSettings({ ...once }, "vi");
    expect(twice).toEqual(once);
  });
});
