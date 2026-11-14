/**
 * Turn a viewport size into a layout plan.
 *
 * Pure functions, no DOM, no React — so the entire decision can be unit
 * tested and printed in a table. `tests/menu-layout.test.ts` pins the
 * arithmetic; `scripts/probe-menu-layout.tsx` prints the table for five real
 * viewports.
 *
 * THE RULE THAT CHANGED IN ROUND 3
 * --------------------------------
 * "Menu không được cuộn được" — the menu must not scroll. Not "hide the
 * scrollbar": actually fit.
 *
 * v1.1.8 rounds 1–2 enforced a 320px floor on the hero with `Math.max`, and
 * then *allowed* the column to be taller than the window (the overflow was
 * hidden by `.menu-scroll`). That is why the same bug kept coming back in a
 * new costume: any viewport whose height was under `reserve + 320` got a
 * column taller than itself, and every round moved the overflow somewhere
 * else — a cut wordmark, a missing copyright line, a scrollbar.
 *
 * The plan now has a single invariant, and it is checked:
 *
 *     scene + reserve === viewport.height      (for every viewport)
 *
 * `scene` is whatever the chrome leaves: shrunk toward
 * `PREFERRED_SCENE_HEIGHT`, never below `MIN_SCENE_HEIGHT`. Only a viewport
 * that cannot seat `MIN_SCENE_HEIGHT + reserve` — a 320px-tall window, or a
 * landscape phone — reports `crop`, and even then the column is exactly the
 * window height and the *chrome* is what gets clipped, never the other way
 * round.
 */
import {
  CORNER_PANEL_WIDTH,
  CORNER_ROW_MARGIN,
  MIN_SCENE_HEIGHT,
  PREFERRED_SCENE_HEIGHT,
  RICH_ROW_BREAKPOINT,
  STACK_BREAKPOINT,
  TIGHT_SCENE_HEIGHT,
  FOOTER_HIDE_HEIGHT,
  PANEL_FOOTER_HEIGHT,
  TICKER_HIDE_HEIGHT,
  cornerRowReserve,
} from "./metrics";

/** How the corner row arranges GAME and INFO. */
export type CornerLayout = "side-by-side" | "stacked";

/** How tall each menu row is — one line, or label + hint. */
export type RowDensity = "compact" | "rich";

/**
 * What the plan had to do to make the window fit.
 *
 *   "none"    the hero kept PREFERRED_SCENE_HEIGHT or better
 *   "squeeze" the hero was shortened, but is still >= MIN_SCENE_HEIGHT
 *   "crop"    even MIN_SCENE_HEIGHT does not fit; the hero is cropped
 *
 * The three states exist so the probe and the tests can assert *why* a plan
 * looks the way it does, instead of inferring it from two numbers.
 */
export type FitMode = "none" | "squeeze" | "crop";

/** A viewport size in CSS pixels. */
export interface Viewport {
  width: number;
  height: number;
}

/** Everything the start screen needs to know before it paints. */
export interface MenuPlan {
  /** Rows carry a hint line. */
  dense: boolean;
  /** Rows use the 26px landscape height instead of 34px. */
  tight: boolean;
  /**
   * The hero shows the wordmark only — no tagline, no deck, no mascot.
   *
   * True in landscape-phone territory, where 220px of hero does not exist and
   * a 140px one does. See TIGHT_SCENE_HEIGHT for the order of sacrifice.
   */
  minimal: boolean;
  /** Panels stack in one column instead of sitting side by side. */
  stacked: boolean;
  /** Height the floating chrome reserves at the bottom, px. */
  reserve: number;
  /** Height the hero gets, px. `scene + reserve === viewport.height`, always. */
  scene: number;
  /**
   * The ticker is rendered.
   *
   * False on very short windows, where the 48px it costs is the difference
   * between a 220px hero and no hero at all. See TICKER_HIDE_HEIGHT.
   */
  ticker: boolean;
  /**
   * The panels render their one-line stat footer.
   *
   * False in landscape-phone territory, where 30px of footer is 30px of hero.
   * See FOOTER_HIDE_HEIGHT.
   */
  footer: boolean;
  /** What had to give for the window to fit. */
  fit: FitMode;
  /** Width of one corner panel, px. */
  panelWidth: number;
}

/**
 * Two 224px panels plus the gap need 456px. Below STACK_BREAKPOINT they would
 * overlap the middle of the screen, so the row stacks instead.
 */
export function cornerLayoutFor(viewportWidth: number): CornerLayout {
  return viewportWidth >= STACK_BREAKPOINT ? "side-by-side" : "stacked";
}

/**
 * Rich rows cost 20px each — 140px across seven rows. Below
 * RICH_ROW_BREAKPOINT that would leave the hero under PREFERRED_SCENE_HEIGHT,
 * so the rows drop their hint line first; the hints remain available as
 * `title` attributes.
 */
export function rowDensityFor(viewportHeight: number): RowDensity {
  return viewportHeight >= RICH_ROW_BREAKPOINT ? "rich" : "compact";
}

/**
 * The height the hero actually gets, given what the chrome needs.
 *
 * This is the function the whole round-3 fix hangs on: it never returns a
 * number that makes `scene + reserve` exceed the viewport, so the column can
 * never be taller than the window, so there is nothing to scroll.
 */
export function sceneFor(viewportHeight: number, reserve: number, floor = MIN_SCENE_HEIGHT): number {
  const available = viewportHeight - reserve;
  /*
   * Only the *bottom* is clamped. An earlier draft also clamped the top at
   * PREFERRED_SCENE_HEIGHT, which capped a 1080p hero at 320 and handed the
   * remaining 242px to nobody — the "empty band under the menu" complaint, in
   * a new place. Above the preference the hero simply keeps the space, which
   * is what `flex: 1 0 auto` used to do implicitly.
   *
   * Below MIN_SCENE_HEIGHT the answer is the minimum and the plan reports
   * "crop" — the planner says out loud that the window is too short rather
   * than inventing a scene that does not fit.
   */
  return Math.max(floor, available);
}

/**
 * The plan for a viewport.
 *
 * Both `width` and `height` are clamped to sane positive integers first: a
 * `visualViewport` report of 0 during a rotation would otherwise produce a
 * negative scene and a panel narrower than its own border.
 */
export function planMenuLayout(viewport: Viewport): MenuPlan {
  const width = Math.max(1, Math.trunc(viewport.width));
  const height = Math.max(1, Math.trunc(viewport.height));

  const dense = rowDensityFor(height) === "rich";
  const stacked = cornerLayoutFor(width) === "stacked";
  const ticker = height >= TICKER_HIDE_HEIGHT;
  const footer = height >= FOOTER_HIDE_HEIGHT;
  /*
   * Three things can give, and they give in this order:
   *
   *   1. `tight`  rows drop from 34px to 26px (bulk win: 56px over 7 rows)
   *   2. ticker   the strip goes away entirely (48px + margin)
   *   3. footer   the panels' one-line stat strip goes away (30px)
   *
   * Order matters. Shrinking the rows first keeps both panels *complete* —
   * every button still on screen — which is the only property that must never
   * be traded away. The ticker and the footer are both decoration, so they go
   * later, and in the order that costs the player least (the ticker's content
   * is repeated in the how-to modal; the footer's number is repeated in a row).
   *
   * `tight` is chosen by the same inequality the plan is checked against:
   * can this viewport seat a MIN_SCENE_HEIGHT hero at 34px rows? If not, try
   * 26px before dropping anything.
   */
  const tight =
    !dense && height - cornerRowReserve(false) < MIN_SCENE_HEIGHT;
  /*
   * Dropping the ticker buys back its 48px *and* the margin above it, which
   * is the only reason a 568px phone can seat both a usable hero and both
   * panels. `cornerRowReserve()` includes the ticker, so it is subtracted
   * rather than recomputed — one source for the number.
   */
  const reserve =
    cornerRowReserve(dense, tight, ticker) - (footer ? 0 : PANEL_FOOTER_HEIGHT);
  const available = height - reserve;
  /*
   * The floor the scene aims at. Normally MIN_SCENE_HEIGHT (220). When even
   * the full economy cannot seat that, the hero drops to wordmark-only and the
   * floor becomes TIGHT_SCENE_HEIGHT (140) — a landscape phone lands here.
   */
  const minimal = available < MIN_SCENE_HEIGHT;
  const floor = minimal ? TIGHT_SCENE_HEIGHT : MIN_SCENE_HEIGHT;
  const scene = sceneFor(height, reserve, floor);

  const fit: FitMode =
    available >= PREFERRED_SCENE_HEIGHT ? "none" : available >= floor ? "squeeze" : "crop";

  return {
    dense,
    tight,
    minimal,
    stacked,
    reserve,
    scene,
    ticker,
    footer,
    fit,
    // Only a viewport narrower than the panel itself needs a shrink; the
    // stack decision is about the *pair*, not about one panel.
    panelWidth: Math.min(CORNER_PANEL_WIDTH, width - CORNER_ROW_MARGIN * 2),
  };
}

/**
 * Does the plan fit its viewport without cropping the hero?
 *
 * True for every viewport from `MIN_SCENE_HEIGHT + reserve` upward — the
 * probe asserts that on all five real sizes, and the test asserts that the
 * one size below it reports `crop` instead of quietly overflowing.
 */
export function planFits(plan: MenuPlan, viewport: Viewport): boolean {
  return plan.fit !== "crop" && plan.scene + plan.reserve === Math.max(1, Math.trunc(viewport.height));
}

/**
 * The single promise round 3 makes: the column never exceeds the window.
 *
 * A separate function because it is the assertion worth grepping for, and
 * because it is the one thing `tests/menu-no-scroll.test.ts` checks across
 * every viewport in a sweep.
 */
export function occupiesExactly(plan: MenuPlan, viewport: Viewport): boolean {
  return plan.scene + plan.reserve === Math.max(1, Math.trunc(viewport.height));
}

/** Re-exported so callers need one import, not two. */
export {
  CORNER_PANEL_WIDTH,
  MIN_SCENE_HEIGHT,
  PREFERRED_SCENE_HEIGHT,
  RICH_ROW_BREAKPOINT,
  PANEL_FOOTER_HEIGHT,
  STACK_BREAKPOINT,
  cornerRowHeight,
  cornerRowReserve,
} from "./metrics";
