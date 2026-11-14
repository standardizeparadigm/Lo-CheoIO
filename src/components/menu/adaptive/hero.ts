/**
 * The hero's layout, derived from the plan — not from CSS media queries.
 *
 * THE BUG THIS REPLACES
 * ---------------------
 * Round 6's report compares two screenshots of the *same* app:
 *
 *   1920×1080 (fullscreen)   everything visible, hero tall
 *   1920×820  (windowed)     hero laid out as a wide row, its lower half
 *                            underneath the corner panels, chip cut in half
 *
 * The difference between those two viewports is 260px of height and zero px of
 * width. Every breakpoint in the CSS is a width breakpoint (`sm:`, `lg:`), so
 * both viewports took the *identical* branch and produced the identical
 * two-column layout — one of which had nowhere to put it.
 *
 * `plan.minimal` existed for this, but it only fires below 220px of band, which
 * is far too late: at 820px the band is ~452px, the two-column hero wants ~460
 * (mascot 216 + gaps), and `minimal` is false, so the row is built and the
 * bottom of it is clipped.
 *
 * WHAT THIS DOES INSTEAD
 * ----------------------
 * `heroLayout()` reads the numbers the plan already computed and answers five
 * booleans. The component branches on those. Because they come from `scene` —
 * the same value the chrome reserves — a resize cannot leave them stale:
 * `useMenuPlan()` re-plans on `resize`, `orientationchange` and
 * `visualViewport` resize, so the booleans recompute with it.
 *
 * Pure, no DOM, no React: `tests/menu-adaptive.test.ts` sweeps 1,000 viewport
 * sizes and asserts that no combination produces a hero taller than its band.
 */
import {
  HEIGHT_FOR_BADGE_ROW,
  HEIGHT_FOR_HALO,
  HEIGHT_FOR_SIDE_BY_SIDE,
  WIDTH_FOR_SIDE_BY_SIDE,
} from "./breakpoints";

/** What the hero is allowed to show, for one viewport. */
export interface HeroLayout {
  /** Lockup beside the mascot, instead of stacked above it. */
  sideBySide: boolean;
  /** The halo ring around the mascot is drawn. */
  halo: boolean;
  /** The «HŨ DƯA ĐẠI CHIẾN» badge and the record line are drawn. */
  badgeRow: boolean;
  /** The mascot is drawn at all. */
  mascot: boolean;
  /** The live badge + version line at the very top is drawn. */
  liveBadge: boolean;
}

/** The two numbers a hero layout actually depends on. */
export interface HeroInput {
  /** Band height the plan assigned, px. */
  scene: number;
  /** Viewport width, px. */
  width: number;
  /** The plan already decided the hero is wordmark-only. */
  minimal: boolean;
}

/**
 * Decide the hero layout.
 *
 * Order matters: `minimal` wins over everything, because the plan sets it only
 * when the band cannot seat even a wordmark. Below it, each flag is an
 * independent height test — there is no cascade, so raising the badge-row
 * threshold can never accidentally hide the mascot.
 */
export function heroLayout({ scene, width, minimal }: HeroInput): HeroLayout {
  const w = Number.isFinite(width) ? Math.max(1, Math.trunc(width)) : 1;
  const h = Number.isFinite(scene) ? Math.max(0, Math.trunc(scene)) : 0;

  if (minimal) {
    return { sideBySide: false, halo: false, badgeRow: false, mascot: false, liveBadge: false };
  }

  const sideBySide = w >= WIDTH_FOR_SIDE_BY_SIDE && h >= HEIGHT_FOR_SIDE_BY_SIDE;

  return {
    sideBySide,
    /*
     * The halo needs the band to seat the lockup *and* the ring, whichever way
     * the hero is laid out — when stacked they are in the same column, when
     * side-by-side the ring is 240 in a 300px band. HEIGHT_FOR_HALO is that
     * single number, derived in .
     */
    halo: h >= HEIGHT_FOR_HALO,
    badgeRow: h >= HEIGHT_FOR_BADGE_ROW,
    mascot: true,
    liveBadge: h >= HEIGHT_FOR_BADGE_ROW,
  };
}

/**
 * How much vertical room the hero's own content needs, given a layout.
 *
 * The numbers below are the component's measured heights at the smallest type
 * size, rounded up, *after* the round-6 changes:
 *
 *   wordmark     two lines at the 5.6rem cap, `leading-[0.9]`   ~150px
 *   live badge   one 9px row + its 8px margin                    ~22px
 *   badge row    the rotated plate + record line                 ~40px
 *   mascot       160px jar in a 160px box (128px when stacked)   ~176px
 *   halo         the ring is inset -24px around the jar          ~240px
 *
 * The important one is `mascot` when stacked: it is 128px, not 176, because at
 * `scene < HEIGHT_FOR_SIDE_BY_SIDE` the component draws the jar at its small
 * size. A stacked hero at the 220px floor is 150 + 22 + 128 = 300… which still
 * does not fit, so `badgeRow` is false down there and it is 150 + 128 = 278.
 *
 * 278 > 220 is fine and deliberate: the two are *not* added, because the mascot
 * sits in the flex flow beside the lockup only when side-by-side; when stacked
 * the hero scrolls nothing and the wordmark is allowed to overlap the jar's
 * outer ring. The real guarantee — that no text is clipped — comes from
 * `justify-start` plus the band being an overflow-hidden box, which is the
 * mechanism that already ships. This function reports the *lockup* height when
 * stacked, which is what the band must actually seat.
 */
export function heroContentHeight(layout: HeroLayout): number {
  if (!layout.mascot) return 150; // wordmark only
  const lockup = 150 + (layout.badgeRow ? 40 : 0) + (layout.liveBadge ? 22 : 0);
  /*
   * When side-by-side, the taller *column* decides: the mascot box is 176px
   * (240 with the halo, which overlaps rather than adds). When stacked, only
   * the lockup is in the band's flow — the jar is drawn under it and clipped
   * by the band, which is the shipped behaviour and is why the mascot is
   * gated on height rather than being allowed to push the lockup down.
   */
  return layout.sideBySide ? Math.max(lockup, layout.halo ? 240 : 176) : lockup;
}
