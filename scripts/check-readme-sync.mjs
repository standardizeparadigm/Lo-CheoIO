#!/usr/bin/env node
/**
 * README sync checker — guards the 10 localized READMEs against drift:
 *   1. version badge must match the current release (1.1.6)
 *   2. README must link docs/releases/v1.1.6.md
 *   3. README must embed assets/corner-menu.svg (v1.1.5 corner panels)
 *   4. README must embed assets/settings-sections.svg (v1.1.6 settings tour)
 *   5. historical release rows (v1.1.5 → 113 tests, v1.1.4 → 61 tests) keep
 *      their original claims — history must never be rewritten
 *   6. no stray previous-version badge anywhere
 * Exits non-zero with a per-file report on any violation (CI gate).
 */
import { readFileSync } from "node:fs";

const FILES = [
  "README.md", "README.en.md", "README.zh.md", "README.ja.md", "README.ko.md",
  "README.es.md", "README.fr.md", "README.th.md", "README.de.md", "README.pt.md",
];

let failures = 0;
for (const file of FILES) {
  const s = readFileSync(file, "utf8");
  const problems = [];
  if (!s.includes("version-1.1.6-f5a81c")) problems.push("badge is not 1.1.6");
  if (!s.includes("docs/releases/v1.1.6.md")) problems.push("missing v1.1.6 release link");
  if (!s.includes("assets/corner-menu.svg")) problems.push("missing corner-menu.svg embed");
  if (!s.includes("assets/settings-sections.svg")) problems.push("missing settings-sections.svg embed");
  if (s.includes("version-1.1.5-f5a81c") || s.includes("version-1.1.4-f5a81c")) problems.push("stale badge");
  const row115 = s.split("\n").find((l) => l.startsWith("| [v1.1.5](docs/releases/v1.1.5.md)"));
  if (!row115) problems.push("missing historical v1.1.5 releases row");
  else if (!/113/.test(row115)) problems.push("historical v1.1.5 row must keep 113 tests");
  const row114 = s.split("\n").find((l) => l.startsWith("| [v1.1.4](docs/releases/v1.1.4.md)"));
  if (!row114) problems.push("missing historical v1.1.4 releases row");
  else if (!/61/.test(row114)) problems.push("historical v1.1.4 row must keep 61 tests");
  if (problems.length) {
    failures += problems.length;
    console.error(`✗ ${file}: ${problems.join("; ")}`);
  } else {
    console.log(`✓ ${file}`);
  }
}
if (failures) {
  console.error(`\n${failures} problem(s) found`);
  process.exit(1);
}
console.log("\nAll 10 READMEs in sync.");
