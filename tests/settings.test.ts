import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_SETTINGS,
  SETTINGS_KEY,
  loadSettings,
  normalizeSettings,
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

  it("keeps valid booleans and drops garbage", () => {
    expect(
      normalizeSettings({ sfx: false, music: "yes", shake: 0, reducedMotion: true, junk: "x" }),
    ).toEqual({ sfx: false, music: true, shake: true, reducedMotion: true });
  });
});

describe("load/save roundtrip", () => {
  it("persists and reloads settings", () => {
    saveSettings({ sfx: false, music: false, shake: true, reducedMotion: true });
    expect(loadSettings()).toEqual({ sfx: false, music: false, shake: true, reducedMotion: true });
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
});
