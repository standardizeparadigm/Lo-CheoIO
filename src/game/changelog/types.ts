/**
 * Shared vocabulary for the in-game changelog.
 *
 * v1.1.7: the changelog was a single 300-line file. It now lives in
 * `src/game/changelog/` — one module per concern, one file per release:
 *
 *   types.ts        this file — the data contract
 *   tiers.ts        SemVer → release tier, the colour mapping's backbone
 *   entries/*.ts    one file per release, newest-first order set by index.ts
 *   index.ts        the ordered list + query helpers
 *
 * Keeping the contract separate means the UI, the tests and the release docs
 * all agree on the same shape without importing the whole history.
 */

/** SemVer-derived release tier — also the tag colour selector. */
export type ReleaseTier = "major" | "minor" | "patch";

/**
 * The historic free-form label. Superseded by {@link ReleaseTier} in v1.1.7:
 * a hand-written "kind" could disagree with the version number, and three
 * colours cannot describe nine releases. Read `tierFor(version)` instead.
 *
 * @deprecated since 1.1.7 — kept only so older call sites keep compiling.
 */
export type LegacyKind = "feature" | "fix" | "polish";

export interface ChangelogEntry {
  /** SemVer, descending within the list. */
  version: string;
  /** ISO-8601 calendar date, `YYYY-MM-DD`. */
  date: string;
  /** @deprecated see {@link LegacyKind} — the UI reads `tierFor(version)`. */
  kind: LegacyKind;
  /** Vietnamese one-line summary (source of truth). */
  vi: string;
  /** English mirror of {@link vi}. */
  en: string;
  /** Vietnamese change bullets (source of truth). */
  itemsVi: readonly string[];
  /** English mirror of {@link itemsVi}. */
  itemsEn: readonly string[];
}

/** The copy a given locale should display for an entry. */
export function copyFor(entry: ChangelogEntry, vi: boolean) {
  return {
    summary: vi ? entry.vi : entry.en,
    items: vi ? entry.itemsVi : entry.itemsEn,
  };
}
