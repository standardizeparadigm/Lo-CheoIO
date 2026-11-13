/**
 * Layout helpers for the start screen (v1.1.8).
 *
 * Pure functions only — no DOM access, no React — so the whole decision can be
 * unit-tested without a browser. This is how the v1.1.7 overflow regression is
 * locked: `tests/menu-layout.test.ts` asserts the arithmetic, and the CSS
 * custom properties keep the arithmetic honest.
 */
import {
  CORNER_MAX_ROWS,
  CORNER_PANEL_HEIGHT,
  CORNER_PANEL_RICH_HEIGHT,
  CORNER_ROW_MARGIN,
  CORNER_ROW_RESERVE,
  CORNER_ROW_RICH_RESERVE,
  CORNER_PANEL_WIDTH,
  FLOATING_ROW_GAP,
  MENU_ROW_HEIGHT,
  MENU_ROW_RICH_HEIGHT,
  MIN_SCENE_HEIGHT,
  RICH_ROW_BREAKPOINT,
  STACK_BREAKPOINT,
  TICKER_HEIGHT,
  cornerPanelHeight,
  cornerRowReserve,
} from "./metrics";

/** How the corner row arranges the GAME / INFO panels. */
export type CornerLayout = "side-by-side" | "stacked";

/** How tall each menu row is — one line, or label + hint. */
export type RowDensity = "compact" | "rich";

/** A viewport size in CSS pixels. */
export interface Viewport {
  width: number;
  height: number;
}

/**
 * Pick the corner-row arrangement for a viewport.
 *
 * Two 208px panels plus the 12px margins need 428px; below 520px they would
 * overlap the middle of the screen, so the row stacks instead.
 */
export function cornerLayoutFor(viewportWidth: number): CornerLayout {
  return viewportWidth >= STACK_BREAKPOINT ? "side-by-side" : "stacked";
}

/**
 * Row density for a viewport height.
 *
 * Below {@link RICH_ROW_BREAKPOINT} the two-line rows would push the reserve
 * past the point where the title lockup still gets {@link MIN_SCENE_HEIGHT}.
 */
export function rowDensityFor(viewportHeight: number): RowDensity {
  return viewportHeight >= RICH_ROW_BREAKPOINT ? "rich" : "compact";
}

/** Height of one panel at a given density, px. */
export function panelHeightFor(density: RowDensity): number {
  return density === "rich" ? CORNER_PANEL_RICH_HEIGHT : CORNER_PANEL_HEIGHT;
}

/** Height of one row at a given density, px. */
export function rowHeightFor(density: RowDensity): number {
  return density === "rich" ? MENU_ROW_RICH_HEIGHT : MENU_ROW_HEIGHT;
}

/** Bottom padding a scene must reserve at a given density, px. */
export function reserveFor(density: RowDensity): number {
  return density === "rich" ? CORNER_ROW_RICH_RESERVE : CORNER_ROW_RESERVE;
}

/** True when the reserve still leaves a readable title lockup. */
export function fitsTitleLockup(viewportHeight: number): boolean {
  const density = rowDensityFor(viewportHeight);
  return viewportHeight - reserveFor(density) >= MIN_SCENE_HEIGHT;
}

/**
 * Everything the start screen needs to lay itself out.
 *
 * `StartScreen` renders exactly what this returns and nothing else decides
 * geometry, so a viewport can be simulated in a unit test.
 */
export interface MenuLayoutPlan {
  /** side-by-side (>=520px) or stacked below that */
  corner: CornerLayout;
  /** one-line rows or label + hint */
  density: RowDensity;
  /** height the floating row occupies, px */
  panelHeight: number;
  /** space between the floating row and the ticker, px */
  gap: number;
  /** px the scene must keep clear at the bottom for the floating chrome */
  reserve: number;
  /** usable height left for the title lockup, px */
  scene: number;
  /** ticker band height, px */
  ticker: number;
  /** true when the floating row sits above the ticker instead of in corners */
  stacked: boolean;
  /** true when the scene is taller than the reserve (never negative) */
  fits: boolean;
}

/**
 * One call decides the whole start-screen layout.
 *
 * The v1.1.7 bug was that no single place knew the total: `shrink-0` on three
 * siblings made each individually reasonable and the sum impossible. Here the
 * sum is the return value, so it cannot be overlooked.
 */
export function planMenuLayout(viewport: Viewport): MenuLayoutPlan {
  const corner = cornerLayoutFor(viewport.width);
  const density = rowDensityFor(viewport.height);
  const panelHeight = panelHeightFor(density);
  const stacked = corner === "stacked";
  const reserve = reserveFor(density);
  const scene = viewport.height - reserve;
  return {
    corner,
    density,
    panelHeight,
    gap: FLOATING_ROW_GAP,
    reserve,
    scene,
    ticker: TICKER_HEIGHT,
    stacked,
    fits: scene >= MIN_SCENE_HEIGHT,
  };
}

/** Total width the side-by-side row needs, px — used to justify the breakpoint. */
export function cornerRowWidth(): number {
  return CORNER_PANEL_WIDTH * 2 + CORNER_ROW_MARGIN * 2 + 16;
}

/** Row count the metrics assume; exported so a test can recount the real UI. */
export const EXPECTED_MAX_ROWS = CORNER_MAX_ROWS;

/** Re-export the raw arithmetic so callers do not import two modules. */
export { cornerPanelHeight, cornerRowReserve, CORNER_PANEL_WIDTH, CORNER_ROW_MARGIN, TICKER_HEIGHT };
