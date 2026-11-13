#!/usr/bin/env node
/**
 * Asset reference checker — two directions:
 *   1. every `assets/<name>.svg` referenced in any README* exists on disk
 *   2. every SVG in assets/ is referenced in at least one README or index.html (no orphans)
 * Exits non-zero with a per-file report on any violation.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const root = resolve(new URL("..", import.meta.url).pathname);
const svgs = readdirSync(resolve(root, "assets")).filter((f) => f.endsWith(".svg"));

// gather corpus: READMEs + index.html + docs/**/*.md
const corpus = [];
for (const f of readdirSync(root)) {
  if (/^README(\.\w+)?\.md$/.test(f)) corpus.push(f);
}
corpus.push("index.html", "docs/DESCRIPTION.md", "docs/assets.md");
const docs = execSync("git ls-files docs", { cwd: root, encoding: "utf8" }).trim().split("\n");
for (const d of docs) if (d.endsWith(".md")) corpus.push(d);
const text = corpus.map((f) => {
  try { return readFileSync(resolve(root, f), "utf8"); } catch { return ""; }
}).join("\n");

let failures = 0;

// 1) referenced → exists
const referenced = new Set([...text.matchAll(/assets\/[\w.-]+\.svg/g)].map((m) => m[0]));
for (const ref of referenced) {
  if (!existsSync(resolve(root, ref))) {
    console.error(`✗ referenced but MISSING: ${ref}`);
    failures++;
  }
}

// 2) assets/ → referenced (orphans)
for (const svg of svgs) {
  if (!text.includes(`assets/${svg}`)) {
    console.error(`✗ orphan asset (never referenced): assets/${svg}`);
    failures++;
  }
}

if (failures) {
  console.error(`\n${failures} problem(s) found`);
  process.exit(1);
}
console.log(`✓ ${svgs.length} SVGs all referenced; every referenced asset exists`);
