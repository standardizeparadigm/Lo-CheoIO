import { describe, expect, it } from "vitest";
import { ACHIEVEMENTS, ACHIEVEMENT_MAP } from "../src/game/achievements";

const TONES = new Set(["gold", "brine", "chili", "jade"]);

describe("achievement catalogue integrity", () => {
  it("ids are unique", () => {
    const ids = ACHIEVEMENTS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ACHIEVEMENT_MAP mirrors the array 1:1", () => {
    expect(ACHIEVEMENT_MAP.size).toBe(ACHIEVEMENTS.length);
    for (const a of ACHIEVEMENTS) {
      expect(ACHIEVEMENT_MAP.get(a.id)).toBe(a);
    }
  });

  it("every def has non-empty name/description/glyph and a known tone", () => {
    for (const a of ACHIEVEMENTS) {
      expect(a.id.trim(), "id").not.toBe("");
      expect(a.name.trim(), `${a.id} name`).not.toBe("");
      expect(a.description.trim(), `${a.id} description`).not.toBe("");
      expect(a.glyph.trim(), `${a.id} glyph`).not.toBe("");
      expect(a.glyph.length, `${a.id} glyph ≤ 6 chars`).toBeLessThanOrEqual(6);
      expect(TONES.has(a.tone), `${a.id} tone`).toBe(true);
    }
  });

  it("catalogue has exactly 16 entries (matches CHANGELOG/README claims)", () => {
    expect(ACHIEVEMENTS.length).toBe(16);
  });

  it("mode-specific achievements use known mode ids in their ids", () => {
    const modeScoped = ACHIEVEMENTS.filter((a) =>
      /inferno|blitz|goldrush|storm|hardcore|feast/.test(a.id),
    );
    expect(modeScoped.length).toBeGreaterThanOrEqual(6);
    for (const a of modeScoped) expect(a.id.trim()).not.toBe("");
  });
});
