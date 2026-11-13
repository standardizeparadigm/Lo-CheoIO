import { describe, expect, it } from "vitest";
import vi from "../src/i18n/locales/vi";
import en from "../src/i18n/locales/en";
import zh from "../src/i18n/locales/zh";
import ja from "../src/i18n/locales/ja";
import ko from "../src/i18n/locales/ko";
import es from "../src/i18n/locales/es";
import fr from "../src/i18n/locales/fr";

const V115_KEYS = [
  "banner.resume.title",
  "banner.resume.sub",
  "menu.game",
  "menu.info",
  "game.play",
  "game.continue",
  "game.continueNone",
  "game.continueHint",
  "game.modes",
  "game.modesHint",
  "game.leaderboard",
  "game.leaderboardHint",
  "game.achievements",
  "game.achievementsHint",
  "game.settings",
  "game.settingsHint",
  "info.about",
  "info.aboutHint",
  "info.changelog",
  "info.quit",
  "close.aria",
  "modes.title",
  "modes.subtitle",
  "modes.back",
  "modes.playing",
  "settings.title",
  "settings.sfx",
  "settings.sfxDesc",
  "settings.music",
  "settings.musicDesc",
  "settings.shake",
  "settings.shakeDesc",
  "settings.reducedMotion",
  "settings.reducedMotionDesc",
  "settings.clearData",
  "settings.clearDataDesc",
  "settings.clearDataConfirm",
  "settings.saved",
  "about.title",
  "about.role",
  "about.craft",
  "about.contact",
  "about.source",
  "about.license",
  "about.fonts",
  "about.thanks",
  "changelog.title",
  "changelog.current",
  "quit.title",
  "quit.thanks",
  "quit.hint",
  "quit.back",
  "quit.close",
] as const;

const LOCALES: Record<string, Record<string, string>> = { vi, en, zh, ja, ko, es, fr };

const PLACEHOLDER = /\{(\w+)\}/g;
const placeholders = (s: string) => [...s.matchAll(PLACEHOLDER)].map((m) => m[1]).sort();

describe("v1.1.5 i18n keys", () => {
  it("all 53 keys exist in all 7 locales", () => {
    for (const [lang, table] of Object.entries(LOCALES)) {
      for (const key of V115_KEYS) {
        expect(typeof table[key as keyof typeof table], `${lang}:${key}`).toBe("string");
        expect((table[key as keyof typeof table] as string).trim().length, `${lang}:${key}`).toBeGreaterThan(0);
      }
    }
  });

  it("placeholders match the Vietnamese source of truth", () => {
    for (const key of V115_KEYS) {
      const expected = placeholders(vi[key as keyof typeof vi] as string);
      for (const [lang, table] of Object.entries(LOCALES)) {
        expect(placeholders(table[key as keyof typeof table] as string), `${lang}:${key}`).toEqual(expected);
      }
    }
  });
});
