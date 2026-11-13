#!/usr/bin/env node
/**
 * i18n parity checker — the CI-side twin of tests/i18n.test.ts.
 *
 * The vitest suite already enforces key parity, but it does that by importing
 * the TypeScript modules (slow, and it only protects people who run the test
 * suite). This script reads the locale files as text so it can run in the
 * "readme-sync" CI job — no build, no dependencies, ~40 ms.
 *
 * Checks per locale (en, zh, ja, ko, es, fr) against the vi source of truth:
 *   1. identical key set (no missing, no extra)
 *   2. identical `{placeholder}` set per key
 *   3. no empty strings
 *   4. no duplicated keys inside one file
 * Exits non-zero with a per-file report.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["vi", "en", "zh", "ja", "ko", "es", "fr"];
const SOURCE = "vi";

/** Pull `"key": "value"` pairs out of a locale table (values may contain \"). */
function parseLocale(lang) {
  const file = path.join(root, "src", "i18n", "locales", `${lang}.ts`);
  const text = readFileSync(file, "utf8");
  const pairs = new Map();
  const dupes = [];
  const re = /^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm;
  let m;
  while ((m = re.exec(text)) !== null) {
    const key = m[1];
    if (pairs.has(key)) dupes.push(key);
    pairs.set(key, m[2]);
  }
  return { pairs, dupes };
}

const placeholders = (s) => new Set([...s.matchAll(/\{(\w+)\}/g)].map((x) => x[1]));
const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

const source = parseLocale(SOURCE);
let failures = 0;

if (source.dupes.length) {
  failures += source.dupes.length;
  console.error(`✗ ${SOURCE}: duplicate keys → ${source.dupes.join(", ")}`);
}

for (const lang of LOCALES) {
  const problems = [];
  if (lang === SOURCE) {
    if (source.pairs.size === 0) problems.push("no keys parsed — parser out of sync with the file format");
  } else {
    const { pairs, dupes } = parseLocale(lang);
    if (dupes.length) problems.push(`duplicate keys → ${dupes.join(", ")}`);
    const missing = [...source.pairs.keys()].filter((k) => !pairs.has(k));
    const extra = [...pairs.keys()].filter((k) => !source.pairs.has(k));
    if (missing.length) problems.push(`${missing.length} missing → ${missing.slice(0, 6).join(", ")}`);
    if (extra.length) problems.push(`${extra.length} extra → ${extra.slice(0, 6).join(", ")}`);
    for (const [key, value] of pairs) {
      const ref = source.pairs.get(key);
      if (ref === undefined) continue;
      if (value.trim() === "") problems.push(`empty value for ${key}`);
      if (!sameSet(placeholders(ref), placeholders(value))) problems.push(`placeholder drift in ${key}`);
    }
  }
  if (problems.length) {
    failures += problems.length;
    console.error(`✗ ${lang}: ${problems.join("; ")}`);
  } else {
    console.log(`✓ ${lang} — ${source.pairs.size} keys`);
  }
}

if (failures) {
  console.error(`\n${failures} i18n problem(s) found`);
  process.exit(1);
}
console.log("\nAll 7 locales in parity.");
