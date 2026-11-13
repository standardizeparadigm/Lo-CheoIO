import { describe, expect, it } from "vitest";
import viLocale from "../src/i18n/locales/vi";
import en from "../src/i18n/locales/en";
import zh from "../src/i18n/locales/zh";
import ja from "../src/i18n/locales/ja";
import ko from "../src/i18n/locales/ko";
import es from "../src/i18n/locales/es";
import fr from "../src/i18n/locales/fr";

const LOCALES = { vi: viLocale, en, zh, ja, ko, es, fr } as const;

/** The 21 keys introduced in v1.1.6 (settings overhaul). */
const V116_KEYS = [
  "settings.section.audio",
  "settings.section.display",
  "settings.section.language",
  "settings.section.data",
  "settings.sfxVolume",
  "settings.sfxVolumeDesc",
  "settings.musicVolume",
  "settings.musicVolumeDesc",
  "settings.shakeLevel",
  "settings.shakeLevelDesc",
  "settings.shakeLevel.low",
  "settings.shakeLevel.high",
  "settings.visualQuality",
  "settings.visualQualityDesc",
  "settings.visualQuality.low",
  "settings.visualQuality.high",
  "settings.autoPauseOnBlur",
  "settings.autoPauseOnBlurDesc",
  "settings.resetDefaults",
  "settings.resetDefaultsDesc",
  "settings.resetDefaultsConfirm",
] as const;

describe("v1.1.6 settings keys (7 locales)", () => {
  for (const [lang, table] of Object.entries(LOCALES)) {
    it(`${lang}: all 21 v1.1.6 keys exist and are non-empty`, () => {
      for (const key of V116_KEYS) {
        const v = (table as Record<string, string | undefined>)[key];
        expect(v?.trim().length ?? 0, `${lang}:${key}`).toBeGreaterThan(0);
      }
    });
  }

  it("v1.1.6 keys carry no interpolation placeholders (static strings only)", () => {
    for (const [lang, table] of Object.entries(LOCALES)) {
      for (const key of V116_KEYS) {
        const v = (table as Record<string, string | undefined>)[key] ?? "";
        expect(v, `${lang}:${key}`).not.toMatch(/\{[a-zA-Z]+\}/);
      }
    }
  });
});
