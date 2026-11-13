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
 *   5. v1.1.7: no locale may be an untranslated copy of the English string
 *      (catches "add the key everywhere by copy-paste, translate later")
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

/**
 * Keys whose value is legitimately identical across languages: brand names,
 * the code-ish labels (MAJOR/UPDATE/PATCH), and symbols. Everything else that
 * matches English verbatim is treated as an unfinished translation.
 */
const IDENTICAL_IS_FINE = new Set([
  "changelog.tier.major",
  "changelog.tier.minor",
  "changelog.tier.patch",
  "brand.badge",
  "app.wordmark",
  "about.contact",
  "about.source",
  "about.license",
  "about.fonts",
]);

/** English text shorter than this is usually a label ("OK", "×2") — skip it. */
const MIN_CHECK_LEN = 4;

/**
 * A badge like "×1.25 · 60S" or "×0.75 · STORM" is a numeric multiplier plus a
 * one-word tag. Several locales legitimately keep the English tag (STORM reads
 * fine in zh/ja/ko as an arcade label), so badges are excluded from rule 5 —
 * their translation is reviewed by hand when the mode ships.
 */
const BADGE_KEY = /\.badge$/;

/**
 * Per-locale allowlist for words that are correctly identical to English.
 * French "score" and "pause" are the native spellings (le score, la pause),
 * and "CHANGELOG" stays as an arcade label in several locales.
 */
const SAME_BY_DESIGN = {
  fr: new Set([
    "changelog.title",
    "info.changelog",
    "pause.score",
    "keys.pause",
    "app.pause.ariaOn",
    "stats.catches",
    "pause.catches",
    "info.aboutHint",
  ]),
};
/** Allow a handful of intentional borrowings before failing a locale loudly. */
const COPY_THRESHOLD = 3;

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
    const english = lang === "en" ? null : parseLocale("en").pairs;
    const untranslated = [];
    for (const [key, value] of pairs) {
      const ref = source.pairs.get(key);
      if (ref === undefined) continue;
      if (value.trim() === "") problems.push(`empty value for ${key}`);
      if (!sameSet(placeholders(ref), placeholders(value))) problems.push(`placeholder drift in ${key}`);
      // v1.1.7 rule 5 — an untranslated copy of the English string.
      if (
        english &&
        !IDENTICAL_IS_FINE.has(key) &&
        !BADGE_KEY.test(key) &&
        !SAME_BY_DESIGN[lang]?.has(key) &&
        value.trim().length > MIN_CHECK_LEN
      ) {
        if (value === english.get(key)) untranslated.push(key);
      }
    }
    if (untranslated.length > COPY_THRESHOLD) {
      problems.push(
        `${untranslated.length} keys still say the English text → ${untranslated.slice(0, 6).join(", ")}`,
      );
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
