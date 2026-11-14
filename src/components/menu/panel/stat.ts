/**
 * The one-line summary strips under both corner panels.
 *
 * WHY THIS IS DATA
 * ----------------
 * v1.1.8 removed `justify-around` from the panel body (it spread three INFO
 * rows over a height sized for seven, which the report reads as "phần thông
 * tin tự nhiên bị chia ra"). Removing the spread leaves the leftover height
 * visible, and the report then asks for it to be filled: "phần ở dưới menu
 * vẫn còn hơi trống, thêm cái gì gì đó vào".
 *
 * Both answers live here as plain strings so they can be unit tested without
 * a DOM, and so the two panels stay symmetric:
 *
 *   GAME — a progress line: `achievements · modes`
 *   INFO — a status line:   `version · tier`
 *
 * Everything is derived from values the caller already has (no hardcoded
 * version, no hardcoded counts) so the strip can never contradict the panel
 * it sits under.
 */

/** A `label: value` pair rendered as two spaced halves of the strip. */
export interface PanelStat {
  label: string;
  value: string;
}

/**
 * GAME footer: how much of the catalogue the player has seen.
 *
 * `unlocked` is clamped to `[0, total]` — a corrupt localStorage record used
 * to be able to print "18/16", and a footer is a terrible place to discover
 * that the save file is lying.
 */
export function progressStat(unlocked: number, total: number, modeCount: number): PanelStat[] {
  const safeTotal = Math.max(0, Math.trunc(total));
  const safeUnlocked = Math.min(safeTotal, Math.max(0, Math.trunc(unlocked)));
  return [
    { label: "✓", value: `${safeUnlocked}/${safeTotal}` },
    { label: "◆", value: String(Math.max(0, Math.trunc(modeCount))) },
  ];
}

/**
 * INFO footer: what this build is.
 *
 * The tier comes from the changelog module (`tierFor`), so it is the same
 * `PATCH` chip the changelog panel shows — one source, two surfaces.
 */
export function buildStat(version: string, tier: string): PanelStat[] {
  return [
    { label: "v", value: version },
    { label: "◆", value: tier.toUpperCase() },
  ];
}

/** Join a stat pair the way the strip renders it — used by the tests. */
export function statText(stats: readonly PanelStat[]): string {
  return stats.map((s) => `${s.label}${s.value}`).join(" · ");
}
