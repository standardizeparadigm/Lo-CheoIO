import { describe, expect, it } from "vitest";
import { CHANGELOG_ENTRIES, changelogVersions } from "../src/game/changelog";

const SEMVER = /^\d+\.\d+\.\d+$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("in-game changelog data", () => {
  it("versions are unique and strictly descending", () => {
    const versions = changelogVersions();
    expect(new Set(versions).size).toBe(versions.length);
    const sorted = [...versions].sort((a, b) => {
      const [a1, a2, a3] = a.split(".").map(Number);
      const [b1, b2, b3] = b.split(".").map(Number);
      return b1 - a1 || b2 - a2 || b3 - a3;
    });
    expect(versions).toEqual(sorted);
  });

  it("every entry has valid semver, ISO date, kind and non-empty summaries", () => {
    for (const entry of CHANGELOG_ENTRIES) {
      expect(entry.version).toMatch(SEMVER);
      expect(Number.isNaN(Date.parse(entry.date))).toBe(false);
      expect(entry.date).toMatch(ISO_DATE);
      expect(["feature", "fix", "polish"]).toContain(entry.kind);
      expect(entry.vi.trim().length).toBeGreaterThan(0);
      expect(entry.en.trim().length).toBeGreaterThan(0);
    }
  });
});
