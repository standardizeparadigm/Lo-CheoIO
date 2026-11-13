import { describe, expect, it } from "vitest";
import { LANGUAGE_META, LANGUAGE_META_MAP, metaFor } from "../src/i18n/languageMeta";
import { LANGUAGES } from "../src/i18n/i18n";
import { SUPPORTED_LANGUAGES } from "../src/game/settings";

describe("language display metadata (v1.1.6)", () => {
  it("covers LANGUAGES and SUPPORTED_LANGUAGES 1:1", () => {
    expect(LANGUAGE_META.map((m) => m.code).sort()).toEqual([...LANGUAGES].sort());
    expect(LANGUAGE_META.map((m) => m.code).sort()).toEqual([...SUPPORTED_LANGUAGES].sort());
  });

  it("every entry has a flag, a native name and a 2-letter short code", () => {
    for (const m of LANGUAGE_META) {
      expect(m.flag.length, m.code).toBeGreaterThan(0);
      expect(m.native.trim().length, m.code).toBeGreaterThan(1);
      expect(m.short, m.code).toMatch(/^[A-Z]{2}$/);
    }
  });

  it("short codes and native names are unique", () => {
    expect(new Set(LANGUAGE_META.map((m) => m.short)).size).toBe(LANGUAGE_META.length);
    expect(new Set(LANGUAGE_META.map((m) => m.native)).size).toBe(LANGUAGE_META.length);
  });

  it("metaFor() never throws for a known code and falls back for junk", () => {
    expect(metaFor("ja").native).toBe("日本語");
    expect(metaFor("zz" as never).code).toBe("vi");
  });

  it("the map agrees with the list", () => {
    for (const m of LANGUAGE_META) expect(LANGUAGE_META_MAP[m.code]).toEqual(m);
  });
});
