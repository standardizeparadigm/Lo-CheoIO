import { describe, expect, it, vi as vitestVi } from "vitest";
import viLocale, { type MessageKey } from "../src/i18n/locales/vi";
import en from "../src/i18n/locales/en";
import zh from "../src/i18n/locales/zh";
import ja from "../src/i18n/locales/ja";
import ko from "../src/i18n/locales/ko";
import es from "../src/i18n/locales/es";
import fr from "../src/i18n/locales/fr";
import {
  detectInitialLanguage,
  localeTable,
  numberLocale,
  setLanguage,
  t,
  getLanguage,
  LANG_STORAGE_KEY,
  LANGUAGES,
} from "../src/i18n/i18n";

const viKeys = Object.keys(viLocale) as MessageKey[];

describe("locale key parity", () => {
  it("en mirrors every vi key exactly", () => {
    expect(Object.keys(en).sort()).toEqual([...viKeys].sort());
  });

  it("zh mirrors every vi key exactly", () => {
    expect(Object.keys(zh).sort()).toEqual([...viKeys].sort());
  });

  it("ja mirrors every vi key exactly", () => {
    expect(Object.keys(ja).sort()).toEqual([...viKeys].sort());
  });

  it("ko mirrors every vi key exactly", () => {
    expect(Object.keys(ko).sort()).toEqual([...viKeys].sort());
  });

  it("es mirrors every vi key exactly", () => {
    expect(Object.keys(es).sort()).toEqual([...viKeys].sort());
  });

  it("fr mirrors every vi key exactly", () => {
    expect(Object.keys(fr).sort()).toEqual([...viKeys].sort());
  });

  it("no message is empty in any locale", () => {
    for (const lang of LANGUAGES) {
      const table = localeTable(lang);
      for (const key of viKeys) {
        expect(table[key].trim().length, `${lang}:${key}`).toBeGreaterThan(0);
      }
    }
  });

  it("placeholders match between vi and other locales", () => {
    const ph = (s: string) => (s.match(/\{[a-zA-Z]+\}/g) ?? []).sort();
    for (const key of viKeys) {
      expect(ph(en[key]), `en:${key}`).toEqual(ph(viLocale[key]));
      expect(ph(zh[key]), `zh:${key}`).toEqual(ph(viLocale[key]));
      expect(ph(ja[key]), `ja:${key}`).toEqual(ph(viLocale[key]));
      expect(ph(ko[key]), `ko:${key}`).toEqual(ph(viLocale[key]));
      expect(ph(es[key]), `es:${key}`).toEqual(ph(viLocale[key]));
      expect(ph(fr[key]), `fr:${key}`).toEqual(ph(viLocale[key]));
    }
  });
});

describe("t()", () => {
  it("interpolates params", () => {
    expect(t("hud.level", { n: 7 }, "en")).toBe("LEVEL 7");
    expect(t("popup.mult", { n: 3 }, "vi")).toBe("NHÂN ×3");
  });

  it("leaves unknown params untouched", () => {
    expect(t("hud.combo", {}, "vi")).toBe("{n} CHUỖI");
  });

  it("number locale maps per language", () => {
    expect(numberLocale("vi")).toBe("vi-VN");
    expect(numberLocale("en")).toBe("en-US");
    expect(numberLocale("zh")).toBe("zh-CN");
    expect(numberLocale("ja")).toBe("ja-JP");
    expect(numberLocale("ko")).toBe("ko-KR");
    expect(numberLocale("es")).toBe("es-ES");
    expect(numberLocale("fr")).toBe("fr-FR");
  });
});

describe("language persistence", () => {
  it("persists to locheo.lang.v1 and updates the active language", () => {
    const map = new Map<string, string>();
    const fakeWindow = {
      localStorage: {
        getItem: (k: string) => map.get(k) ?? null,
        setItem: (k: string, v: string) => void map.set(k, String(v)),
        removeItem: (k: string) => void map.delete(k),
      },
      dispatchEvent: () => true,
      navigator: { language: "en-US" },
    };
    vitestVi.stubGlobal("window", fakeWindow);
    try {
      setLanguage("en");
      expect(map.get(LANG_STORAGE_KEY)).toBe("en");
      expect(getLanguage()).toBe("en");
      expect(detectInitialLanguage()).toBe("en");
      map.set(LANG_STORAGE_KEY, "zh");
      expect(detectInitialLanguage()).toBe("zh");
      setLanguage("vi");
      expect(map.get(LANG_STORAGE_KEY)).toBe("vi");
      expect(getLanguage()).toBe("vi");
    } finally {
      vitestVi.unstubAllGlobals();
      setLanguage("vi"); // reset module state for other test files sharing the worker
    }
  });

  it("detectInitialLanguage returns a supported language", () => {
    expect(LANGUAGES).toContain(detectInitialLanguage());
  });
});
