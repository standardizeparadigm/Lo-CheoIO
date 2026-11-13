/**
 * Menu layout constants (v1.1.8) — the numbers behind the overflow fix.
 *
 * ## The bug these numbers exist to prevent
 *
 * The v1.1.7 start screen stacked everything in one flex column:
 *
 *     ┌──────────────────────────────────┐
 *     │ scene  flex-1 overflow-y-auto    │  ← got 250px, asked for ~700
 *     ├──────────────────────────────────┤
 *     │ corner row: GAME + INFO          │  ← 415px, shrink-0
 *     ├──────────────────────────────────┤
 *     │ ticker                           │  ←  55px, shrink-0
 *     └──────────────────────────────────┘
 *                                    viewport 720px
 *
 * Because the two `shrink-0` siblings were inflexible, the scene received only
 * `720 − 415 − 55 = 250px` and the CHÉO wordmark and the mascot jar were cut by
 * an invisible horizontal seam at `y ≈ 247px`. The corner row itself then
 * overflowed the column by 12px and was sliced by the bottom edge, the ticker
 * lost its last line, and on a 375px phone the two panels (208 + 224px) simply
 * did not fit sideways.
 *
 * ## How v1.1.8 fixes it
 *
 *   1. The corner row and the ticker **leave the flex column** and float over
 *      the scene (`position: absolute`), so the scene owns the full viewport.
 *   2. The scene reserves a *band* at the bottom, computed by
 *      {@link cornerRowReserve}, so scrolling content never hides underneath.
 *   3. Row heights are **fixed in CSS** (`--menu-row-h`) instead of emerging
 *      from padding + line-height, so these constants and the rendered pixel
 *      heights are the same number by construction — and a test can prove it.
 *
 * Every constant below is mirrored by a custom property in `src/index.css`.
 * `tests/menu-layout.test.ts` reads both and fails if they ever disagree.
 */

/** Height of one one-line menu row, px — `--menu-row-h`. */
export const MENU_ROW_HEIGHT = 34;

/** Height of one two-line (label + hint) menu row, px — `--menu-row-rich-h`. */
export const MENU_ROW_RICH_HEIGHT = 54;

/** Gap between stacked rows inside a panel, px (`gap-1`) — `--menu-row-gap`. */
export const MENU_ROW_GAP = 4;

/** Vertical padding inside a corner panel body, both sides, px (`p-1`). */
export const CORNER_BODY_PADDING = 16;

/** Height of the corner-panel header strip, px — `--menu-header-h`. */
export const CORNER_HEADER_HEIGHT = 22;

/** Border width of a corner panel, px (3px on two sides). */
export const CORNER_BORDER = 6;

/** Height of the ticker band, px — `--menu-ticker-h` (`h-12`). */
export const TICKER_HEIGHT = 48;

/** Gap between the floating corner row and the ticker, px. */
export const FLOATING_ROW_GAP = 10;

/** Outer margin the floating row keeps from the window edges, px. */
export const CORNER_ROW_MARGIN = 12;

/**
 * Tallest corner panel, in rows. GAME has six (Play · Continue · Modes ·
 * Leaderboard · Achievements · Settings) and is the taller of the two.
 */
export const CORNER_MAX_ROWS = 6;

/**
 * Height of a corner panel, px, given a row height.
 *
 * `rows × rowH + (rows−1) × gap + header + body padding + borders`
 */
export function cornerPanelHeight(rowHeight: number = MENU_ROW_HEIGHT, rows: number = CORNER_MAX_ROWS): number {
  return rows * rowHeight + (rows - 1) * MENU_ROW_GAP + CORNER_HEADER_HEIGHT + CORNER_BODY_PADDING + CORNER_BORDER;
}

/** Compact (one-line) panel: 6 × 34 + 5 × 4 + 22 + 16 + 6 = **268px**. */
export const CORNER_PANEL_HEIGHT = cornerPanelHeight(MENU_ROW_HEIGHT);

/** Rich (two-line, with hints) panel: 6 × 54 + 5 × 4 + 22 + 16 + 6 = **388px**. */
export const CORNER_PANEL_RICH_HEIGHT = cornerPanelHeight(MENU_ROW_RICH_HEIGHT);

/**
 * Bottom padding the scrollable scene must reserve so the floating corner row
 * never covers the last line of content.
 *
 * This single number replaced the v1.1.7 `shrink-0` flex row. The scene is free
 * to be the full 720px tall; it merely agrees not to *use* the last
 * `cornerRowReserve()` pixels for anything the player needs to read.
 */
export function cornerRowReserve(
  panelHeight: number = CORNER_PANEL_HEIGHT,
  tickerHeight: number = TICKER_HEIGHT,
): number {
  return panelHeight + FLOATING_ROW_GAP + tickerHeight + CORNER_ROW_MARGIN;
}

/** Compact reserve: 268 + 10 + 48 + 12 = **338px**. */
export const CORNER_ROW_RESERVE = cornerRowReserve();

/** Rich reserve: 388 + 10 + 48 + 12 = **458px**. */
export const CORNER_ROW_RICH_RESERVE = cornerRowReserve(CORNER_PANEL_RICH_HEIGHT);

/**
 * The scene must always keep at least this much usable height for the title
 * lockup, otherwise the layout switches to compact rows.
 */
export const MIN_SCENE_HEIGHT = 320;

/**
 * Viewport height at or above which two-line rows with hints are shown.
 *
 * 388 + 10 + 48 + 12 + 320 = 778 → rounded up to 800 so a 768px laptop keeps
 * the airy layout it can actually afford.
 */
export const RICH_ROW_BREAKPOINT = 800;

/**
 * Below this viewport width the two panels cannot sit abreast
 * (208 + 224 + margins > 375px phone), so they stack into one sheet.
 */
export const STACK_BREAKPOINT = 520;

/** Width of one corner panel, px (`w-52` = 208). */
export const CORNER_PANEL_WIDTH = 208;
