import { describe, expect, it } from "vitest";
import viLocale, { type MessageKey } from "../src/i18n/locales/vi";
import en from "../src/i18n/locales/en";
import zh from "../src/i18n/locales/zh";
import ja from "../src/i18n/locales/ja";
import ko from "../src/i18n/locales/ko";
import es from "../src/i18n/locales/es";
import fr from "../src/i18n/locales/fr";
import { MODE_LIST } from "../src/game/modes";

const LOCALES = { vi: viLocale, en, zh, ja, ko, es, fr } as const;
const SUFFIXES = ["name", "tagline", "desc", "badge"] as const;

describe("mode keys exist in every locale", () => {
  for (const [lang, table] of Object.entries(LOCALES)) {
    it(`${lang}: all 9 modes × (name/tagline/desc/badge) are non-empty`, () => {
      for (const mode of MODE_LIST) {
        for (const suffix of SUFFIXES) {
          const key = `mode.${mode.id}.${suffix}` as MessageKey;
          expect(table[key]?.trim().length ?? 0, key).toBeGreaterThan(0);
        }
      }
    });
  }

  it("mode names in vi are unique across the 9 modes", () => {
    const names = MODE_LIST.map((m) => viLocale[`mode.${m.id}.name` as MessageKey]);
    expect(new Set(names).size).toBe(names.length);
  });
});
