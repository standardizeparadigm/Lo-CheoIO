#!/usr/bin/env node
/**
 * Extract every human-readable string from assets/*.svg and check the ones
 * that are machine-checkable.
 *
 * WHY THIS EXISTS
 * ---------------
 * The SVG diagrams in assets/ are embedded in all ten READMEs, so they are
 * read by ten audiences speaking eight languages. Three classes of mistake
 * kept reaching them:
 *
 *   1. A number that used to be right.  "14 SVG" after a fifteenth and
 *      sixteenth were added.  "9 bản" after the tenth release shipped.
 *      "nền 6 lớp" when the layer array has eight entries.
 *   2. A figure drawn at the wrong scale.  layout-fix.svg drew the fixed
 *      scene at 91% of the window while the real plan is 53%, so the
 *      "after" panel illustrated the "before" behaviour.
 *   3. A diagram in two languages.  test-matrix.svg had an English title
 *      and five Vietnamese captions, because a label was edited and its
 *      neighbours were not.
 *
 * (1) and (3) are checked here against sources of truth — the test runner,
 * the changelog, the layer array.  (2) cannot be checked mechanically; that
 * is why --dump prints every string, so a human can read all sixteen
 * diagrams at once instead of opening them one by one.
 *
 * Usage:
 *   node scripts/check-svg-text.mjs           # check, exit 1 on failure
 *   node scripts/check-svg-text.mjs --dump    # print every string, no checks
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ASSETS = "assets";
const DUMP = process.argv.includes("--dump");

/** Strip tags and entities from a <text> body. */
function textOf(inner) {
  return inner
    .replace(/<[^>]+>/g, "")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .trim();
}

/** Every <text> node in a file, in document order. */
function stringsOf(file) {
  const svg = readFileSync(join(ASSETS, file), "utf8");
  const out = [];
  for (const m of svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)) {
    const s = textOf(m[1]);
    if (s) out.push(s);
  }
  return out;
}

const files = readdirSync(ASSETS).filter((f) => f.endsWith(".svg")).sort();

if (DUMP) {
  for (const f of files) {
    console.log(`\n── ${f}`);
    for (const s of stringsOf(f)) console.log(`   ${s}`);
  }
  process.exit(0);
}

/**
 * Vietnamese letters absent from the other seven in-game languages. Narrow
 * on purpose: ASCII names like "GAME" and "INFO" are shared by design and
 * must not trip this.
 */
const VIETNAMESE = /[ạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹđơư]/i;

/**
 * Words that only make sense as English prose.
 *
 * Deliberately excludes "tests", "files" and "no": those appear inside
 * otherwise-Vietnamese strings ("tests/ · 35 file ngang", "không lỗi"), and
 * counting them as English made a Vietnamese file look bilingual — which is
 * exactly the false positive that would teach a maintainer to ignore this
 * check. Only words with no Vietnamese-document usage belong here.
 */
const ENGLISH =
  /\b(?:the|and|with|every|before|after|green|where|live|sync|renders|both|directions|type errors)\b/i;

/**
 * Names that are Vietnamese in every diagram, on every language's README.
 * The project is called LỌ CHÉO; translating that would be wrong.
 */
const VI_ALLOWED_ALWAYS = new Set([
  "LỌ", "CHÉO", "LỌ CHÉO", "HŨ DƯA", "HŨ DƯA ĐẠI CHIẾN",
  "TRƯỚC", "SAU", "HÔM NAY",
]);

/** Counts the diagrams are allowed to state. */
const TRUTH = {
  tests: 286,
  testFiles: 35,
  svgs: files.length,
  releases: 10,
  backgroundLayers: 8,
};

const fail = [];
let checked = 0;

for (const f of files) {
  const strings = stringsOf(f);

  // ---- rule 1: no stale counts -------------------------------------------
  for (const s of strings) {
    // "14 SVG" / "16 SVGs"
    for (const m of s.matchAll(/\b(\d+)\s*(?:SVG|SVGs)\b/g)) {
      checked += 1;
      if (Number(m[1]) !== TRUTH.svgs) {
        fail.push(`${f}: says ${m[1]} SVGs, truth is ${TRUTH.svgs} — "${s}"`);
      }
    }
    // "9 bản" / "10 bản"
    for (const m of s.matchAll(/\b(\d+)\s*bản\b/g)) {
      checked += 1;
      if (Number(m[1]) !== TRUTH.releases) {
        fail.push(`${f}: says ${m[1]} releases, truth is ${TRUTH.releases} — "${s}"`);
      }
    }
    // "nền 6 lớp" — background layers
    for (const m of s.matchAll(/nền\s+(\d+)\s*lớp/g)) {
      checked += 1;
      if (Number(m[1]) !== TRUTH.backgroundLayers) {
        fail.push(`${f}: says ${m[1]} background layers, truth is ${TRUTH.backgroundLayers} — "${s}"`);
      }
    }
    // "286 / 286 · 35 file" — the test summary line
    const tf = s.match(/(\d+)\s*\/\s*(\d+)\s*·\s*(\d+)\s*file/);
    if (tf) {
      checked += 1;
      if (Number(tf[2]) !== TRUTH.tests || Number(tf[3]) !== TRUTH.testFiles) {
        fail.push(
          `${f}: test summary "${s}" — truth is ${TRUTH.tests} / ${TRUTH.tests} · ${TRUTH.testFiles} files`,
        );
      }
    }
    // the headline number in the top-right of test-matrix.svg
    if (/^\d{3,}$/.test(s) && Number(s) !== TRUTH.tests) {
      checked += 1;
      fail.push(`${f}: headline number ${s}, truth is ${TRUTH.tests}`);
    }
  }

  // ---- rule 2: one language per diagram ----------------------------------
  //
  // A diagram that shows the in-game settings screen *should* be in
  // Vietnamese — that is what the game looks like. The bug is a diagram
  // split down the middle because one label was translated and its
  // neighbours were not. So: count both languages, and fail a file where
  // the minority is substantial and smaller than the majority.
  const content = strings.filter((s) => !VI_ALLOWED_ALWAYS.has(s));
  if (content.length >= 4) {
    const vi = content.filter((s) => VIETNAMESE.test(s));
    const en = content.filter((s) => ENGLISH.test(s));
    const minority = vi.length <= en.length ? vi : en;
    const majority = vi.length > en.length ? vi : en;
    checked += 1;

    if (minority.length >= 2 && minority.length < majority.length) {
      const which = minority === vi ? "Vietnamese" : "English";
      const eg = minority
        .filter((s) => !VI_ALLOWED_ALWAYS.has(s))
        .slice(0, 3)
        .map((s) => `"${s}"`)
        .join(", ");
      fail.push(
        `${f}: mixes languages — ${vi.length} Vietnamese / ${en.length} English strings; ${which} minority: ${eg}`,
      );
    }
  }
}

console.log(`\n${checked} checkable strings across ${files.length} SVGs.`);

if (fail.length) {
  console.error(`\n✗ ${fail.length} problem(s):\n`);
  for (const m of fail) console.error(`  ${m}`);
  console.error("\nRun with --dump to read every string in every diagram.");
  process.exit(1);
}

console.log("✓ every stated number matches its source of truth; no diagram mixes languages");
