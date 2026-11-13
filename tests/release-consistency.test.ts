import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { CHANGELOG_ENTRIES } from "../src/game/changelog";
import { APP_VERSION } from "../src/version";

const read = (path: string) => readFileSync(path, "utf8");
describe("release consistency", () => {
  it("matches each documented date to the in-game changelog", () => {
    const changelog = read("CHANGELOG.md");
    for (const entry of CHANGELOG_ENTRIES) {
      expect(changelog).toContain(`## [${entry.version}] — ${entry.date}`);
      expect(read(`docs/releases/v${entry.version}.md`)).toContain(entry.date);
    }
  });
  it("ships current metadata, launcher versions and SVGs without old version labels", () => {
    expect(read("index.html")).toContain(`name="version" content="${APP_VERSION}"`);
    for (const name of ["play-linux.sh", "play-mac.command", "play-windows.bat"]) {
      expect(read(`scripts/${name}`)).toContain(APP_VERSION);
    }
    for (const name of readdirSync("assets").filter((n) => n.endsWith(".svg"))) {
      expect(read(`assets/${name}`), name).not.toMatch(/\b1\.(?:0\.0|1\.[0-7])\b/);
    }
  });
});
