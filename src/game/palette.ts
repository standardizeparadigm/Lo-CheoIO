/* =====================================================================
   Lọ Chéo — one palette, two renderers (v1.1.6)

   The canvas scene and the React UI used to carry the same nine colours in
   two places: `@theme` in `src/index.css` and a private `const C` inside
   `engine.ts`. Every palette tweak meant editing both, and nothing caught
   the two drifting apart — a stale canvas colour just looked slightly off.

   Now the hex values live here. The CSS keeps its `--color-*` custom
   properties (Tailwind needs them for utilities), and
   `tests/palette.test.ts` asserts the two lists still match, so a change in
   one place fails the suite instead of quietly desynchronising.
   ===================================================================== */

/** Semantic names used by the canvas renderer. */
export const PALETTE = {
  /** deepest background — `--color-jade-950` */
  void: "#061a1a",
  /** panel / ink — `--color-jade-900` */
  ink: "#0b2a28",
  /** structural outline — `--color-jade-800` */
  jadeDeep: "#10403a",
  /** brand jade — `--color-jade-500` */
  jade: "#2bb48c",
  /** gold accent — `--color-tumeric-500` */
  gold: "#f5a81c",
  /** gold highlight — `--color-tumeric-400` */
  goldLight: "#ffc94a",
  /** danger / hazard — `--color-chili-500` */
  chili: "#e63b2e",
  /** brine green — `--color-brine-400` */
  brine: "#b6e07a",
  /** body copy / highlight text — `--color-clay-100` */
  cream: "#fdf3e0",
} as const;

export type PaletteName = keyof typeof PALETTE;

/** Same colours, widened to `string` for anything that mutates a colour field. */
export const CANVAS_COLORS: Record<PaletteName, string> = { ...PALETTE };

/** CSS custom properties the canvas colours are mirrored in (`src/index.css`). */
export const PALETTE_CSS_TOKENS: Record<PaletteName, string> = {
  void: "--color-jade-950",
  ink: "--color-jade-900",
  jadeDeep: "--color-jade-800",
  jade: "--color-jade-500",
  gold: "--color-tumeric-500",
  goldLight: "--color-tumeric-400",
  chili: "--color-chili-500",
  brine: "--color-brine-400",
  cream: "--color-clay-100",
};
