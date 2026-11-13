/**
 * The menu backdrop as data (v1.1.7).
 *
 * Before: nine `<div className="…"/>` lines inlined in StartScreen, in an
 * order that mattered but was only documented in `docs/design/menu-scene.md`.
 * Now the order, the class names and the opacity live in one array, so:
 *
 *   · `docs/design/menu-scene.md` and this file can be diffed against each other
 *   · tests/menu-background.test.ts can assert the safety rules from the
 *     1.1.7 contrast fix (no full-screen darkener, nebula opacity capped, …)
 *   · adding a layer without removing one trips the budget rule (max 8)
 *
 * Every layer is decorative: `pointer-events: none` is applied by the
 * renderer, never by the call sites.
 */

export interface BackgroundLayer {
  /** Stable id — also used as the React key. */
  id: string;
  /** CSS class(es) defined in src/index.css. */
  className: string;
  /**
   * Positioning utilities. Most layers fill the stage; the two nebulae are
   * anchored by their own CSS and must NOT be forced to `inset-0` (that would
   * stretch the 46vw blob across the viewport and undo the 1.1.7 fix).
   */
  layout?: string;
  /** Tailwind opacity utility, or "" for the class's own opacity. */
  opacity?: string;
  /** Short human note: what this layer contributes. */
  note: string;
}

/**
 * Painted bottom → top. Order is load-bearing; see menu-scene.md § Thứ tự lớp.
 *
 * v1.1.7 changes are marked. The four of them together are what un-fogged the
 * menu: blur 64→22, nebula peak 1.0→0.80, tile floor 45%→70% (here), and the
 * full-screen vignette replaced by `.menu-vignette` (last entry).
 */
export const MENU_BACKGROUND_LAYERS: readonly BackgroundLayer[] = [
  { id: "aurora", className: "aurora-bg", layout: "absolute inset-0", note: "static gradient base + drifting colour" },
  { id: "nebula-a", className: "nebula-a", layout: "", note: "brine glow, drifting (v1.1.7: blur 22px, peak 0.80)" },
  { id: "nebula-b", className: "nebula-b", layout: "", note: "turmeric glow, counter-drifting (v1.1.7: blur 22px, peak 0.78)" },
  { id: "light-ray", className: "light-ray", layout: "", note: "breathing god-ray from the top" },
  { id: "stars-far", className: "star-field-far", layout: "", note: "slow, dim parallax starfield" },
  { id: "stars-near", className: "star-field", layout: "", note: "fast, bright parallax starfield" },
  { id: "tile-floor", className: "tile-floor tile-floor-mask", layout: "absolute inset-0", opacity: "opacity-70", note: "diagonal tile floor (v1.1.7: 45% → 70%)" },
  { id: "vignette", className: "menu-vignette", layout: "absolute inset-0", note: "corner-only falloff (v1.1.7: replaces the full-screen one)" },
] as const;

/** Hard ceiling from the render budget — see docs/guides/performance.md. */
export const MENU_BACKGROUND_BUDGET = 8;
