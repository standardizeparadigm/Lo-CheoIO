/**
 * How wide the viewport must be before the deck shows all three columns.
 *
 * Two columns fit in ~440px (two 210px cells plus the gap), so the deck grid
 * itself starts at Tailwind's `sm` (640px). The *middle* column needs another
 * ~200px on top of that before its note line stops wrapping to three lines.
 *
 * Exported so the probe and the tests assert the same number the component
 * branches on — the same discipline as `STAGE_MIN_WIDTH` before it (which
 * this file replaces).
 */
export const DECK_MIN_WIDTH = 840;

/**
 * Below this width the whole deck is hidden.
 *
 * Matches Tailwind's `sm`, which is also where `.deck` switches from `hidden`
 * to `grid`. Kept as a number so a test can prove the two agree.
 */
export const DECK_HIDE_WIDTH = 640;
