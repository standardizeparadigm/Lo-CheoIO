import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { APP_VERSION } from "../src/version";

const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

describe("version coherence (release hygiene)", () => {
  it("APP_VERSION matches package.json", () => {
    const pkg = JSON.parse(read("package.json")) as { version: string };
    expect(APP_VERSION).toBe(pkg.version);
  });

  it("package-lock root version matches too", () => {
    const lock = JSON.parse(read("package-lock.json")) as {
      version?: string;
      packages: Record<string, { version?: string }>;
    };
    expect(lock.version).toBe(APP_VERSION);
    expect(lock.packages[""]?.version).toBe(APP_VERSION);
  });

  it("CHANGELOG.md documents the current version with a link definition", () => {
    const changelog = read("CHANGELOG.md");
    expect(changelog).toContain(`[${APP_VERSION}]`);
    expect(changelog).toMatch(new RegExp(`\\[${APP_VERSION.replace(/\./g, "\\.")}\\]: `));
  });

  it("every localized README badge advertises APP_VERSION", () => {
    const readmes = [
      "README.md", "README.en.md", "README.zh.md", "README.ja.md", "README.ko.md",
      "README.es.md", "README.fr.md", "README.th.md", "README.de.md", "README.pt.md",
    ];
    for (const file of readmes) {
      const s = read(file);
      expect(s, file).toContain(`version-${APP_VERSION}-`);
    }
  });

  it("release notes exist for the current version", () => {
    const s = read(`docs/releases/v${APP_VERSION}.md`);
    expect(s.length).toBeGreaterThan(500);
  });
});
