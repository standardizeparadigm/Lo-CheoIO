import { describe, expect, it } from "vitest";
import vi from "../src/i18n/locales/vi";
import en from "../src/i18n/locales/en";
import zh from "../src/i18n/locales/zh";
import ja from "../src/i18n/locales/ja";
import ko from "../src/i18n/locales/ko";
import es from "../src/i18n/locales/es";
import fr from "../src/i18n/locales/fr";
import { PRESET_LIST } from "../src/game/settingsPresets";
import { SUPPORTED_LANGUAGES } from "../src/game/settings";

const TABLES = { vi, en, zh, ja, ko, es, fr } as const;
type Table = Record<string, string>;

/** Every key the v1.1.6 settings UI actually calls t() with. */
function settingsUiKeys(): string[] {
  return [
    // section headers
    "settings.section.presets",
    "settings.section.audio",
    "settings.section.display",
    "settings.section.language",
    "settings.section.data",
    "settings.backupTitle",
    // toggles
    "settings.sfx",
    "settings.sfxDesc",
    "settings.music",
    "settings.musicDesc",
    "settings.shake",
    "settings.shakeDesc",
    "settings.reducedMotion",
    "settings.reducedMotionDesc",
    "settings.autoPauseOnBlur",
    "settings.autoPauseOnBlurDesc",
    // levels
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
    "settings.decrease",
    "settings.increase",
    // backup
    "settings.backupDesc",
    "settings.backupExport",
    "settings.backupImport",
    "settings.backupPlaceholder",
    "settings.backupBad",
    "settings.backupOk",
    "settings.backupCopied",
    // data
    "settings.resetDefaults",
    "settings.resetDefaultsDesc",
    "settings.resetDefaultsConfirm",
    "settings.clearData",
    "settings.clearDataDesc",
    "settings.clearDataConfirm",
    // shared confirm/cancel wording used by the two-step danger zone
    "common.cancel",
    // presets (generated from the catalogue — stays in sync automatically)
    ...PRESET_LIST.flatMap((p) => [`settings.preset.${p.id}`, `settings.preset.${p.id}Desc`]),
    "settings.preset.custom",
  ];
}

describe("settings UI ↔ i18n contract (v1.1.6)", () => {
  it("every key the settings UI renders exists in every locale", () => {
    for (const [lang, table] of Object.entries(TABLES)) {
      for (const key of settingsUiKeys()) {
        expect((table as Table)[key]?.trim().length ?? 0, `${lang}:${key}`).toBeGreaterThan(0);
      }
    }
  });

  it("covers all seven supported languages", () => {
    expect(Object.keys(TABLES).sort()).toEqual([...SUPPORTED_LANGUAGES].sort());
  });

  it("level/preset labels are SHORT enough for a two-column grid (≤ 14 chars)", () => {
    for (const [lang, table] of Object.entries(TABLES)) {
      for (const p of PRESET_LIST) {
        expect((table as Table)[`settings.preset.${p.id}`].length, `${lang}:${p.id}`).toBeLessThanOrEqual(14);
      }
    }
  });

  it("no settings-UI key leaks an interpolation placeholder", () => {
    for (const [lang, table] of Object.entries(TABLES)) {
      for (const key of settingsUiKeys()) {
        expect((table as Table)[key], `${lang}:${key}`).not.toMatch(/\{[a-zA-Z]+\}/);
      }
    }
  });
});
