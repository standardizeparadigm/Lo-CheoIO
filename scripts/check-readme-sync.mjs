#!/usr/bin/env node
/**
 * README sync checker — guards the 10 localized READMEs against drift:
 *   1. version badge must be 1.1.5
 *   2. README must link docs/releases/v1.1.5.md
 *   3. README must embed assets/corner-menu.svg
 *   4. historical v1.1.4 release row must keep its original claim of 61 tests
 *   5. no stray "version-1.1.4-f5a81c" badge anywhere
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
  if (!s.includes("version-1.1.5-f5a81c")) problems.push("badge is not 1.1.5");
  if (!s.includes("docs/releases/v1.1.5.md")) problems.push("missing v1.1.5 release link");
  if (!s.includes("assets/corner-menu.svg")) problems.push("missing corner-menu.svg embed");
  if (s.includes("version-1.1.4-f5a81c")) problems.push("stale 1.1.4 badge");
  const row = s.split("\n").find((l) => l.startsWith("| [v1.1.4](docs/releases/v1.1.4.md)"));
  if (!row) problems.push("missing historical v1.1.4 releases row");
  else if (!/61/.test(row)) problems.push("historical v1.1.4 row must keep 61 tests");
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
