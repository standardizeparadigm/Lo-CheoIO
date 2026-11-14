/**
 * The INFO panel's filler: a compact read-out of what the build contains.
 *
 * WHY IT IS HERE
 * --------------
 * INFO holds four rows. Its panel is sized for seven, because GAME needs seven
 * and the two panels share a height so the corner row reads as one band. That
 * leaves ~126px of empty panel — plainly visible in the round-5 screenshot as a
 * blank rectangle under «THOÁT».
 *
 * Round 2 filled a similar gap in the *hero* with three counters (9 · 14 · 16)
 * and the report rejected it, twice: once because it repeated the tagline, and
 * once because it was in the wrong place entirely. The lesson was not "never
 * show counts" — it was "do not show them where they duplicate something the
 * player just read".
 *
 * This is a different address. The counts are not in the hero any more (the
 * tagline that stated them moved into the about modal), and this is a *panel*,
 * whose job is exactly to summarise. Three rows, one line each, derived from
 * the same catalogue the rest of the app reads, so they cannot disagree with
 * the modes list or the achievements list.
 */

/** One line of the summary: a number, and what it counts. */
export interface SummaryLine {
  /** The count. Always an integer — clamped, never NaN. */
  count: number;
  /** i18n key naming what is counted. */
  key: "summary.modes" | "summary.ingredients" | "summary.achievements";
}

/** Everything the summary needs, all of it already known to the caller. */
export interface SummaryInput {
  modes: number;
  ingredients: number;
  achievements: number;
}

/** Clamp a count to a non-negative integer; NaN becomes 0. */
function safeCount(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.trunc(n));
}

/**
 * The three lines, in the order they appear in the game: what you can play,
 * what falls into the jar, what you can earn.
 */
export function summaryLines(input: SummaryInput): readonly SummaryLine[] {
  return [
    { count: safeCount(input.modes), key: "summary.modes" },
    { count: safeCount(input.ingredients), key: "summary.ingredients" },
    { count: safeCount(input.achievements), key: "summary.achievements" },
  ];
}

/** Join a line the way the DOM renders it — used by the tests. */
export function summaryText(line: SummaryLine): string {
  return `${line.count} ${line.key}`;
}
