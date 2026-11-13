import type { ReactNode } from "react";

/**
 * The GAME (bottom-left) and INFO (bottom-right) corner panels.
 *
 * ## v1.1.8 — fixed geometry
 *
 * In v1.1.7 this panel sized itself from its contents: 6 two-line rows at
 * ~54px plus padding came to **415px**, which — because the panel was a
 * `shrink-0` flex sibling — left the scene only 250px and clipped the
 * wordmark and the mascot. Nothing in the component said "I am 415px tall";
 * the height was an accident of typography.
 *
 * Now every vertical dimension comes from a custom property that
 * `menu/layout/metrics.ts` also owns:
 *
 *   panel height = rows × --menu-row-h + (rows−1) × --menu-row-gap
 *                + --menu-header-h + 16px body padding + 6px borders
 *
 * so `cornerPanelHeight()` predicts the rendered box exactly, and the reserve
 * the scene keeps clear is therefore correct rather than approximate.
 *
 * `density` mirrors the layout plan: `rich` shows the hint line inside each
 * row, `compact` drops it and the panel shrinks to 268px.
 */
export default function CornerPanel({
  title,
  corner,
  density = "compact",
  children,
}: {
  title: string;
  /** which screen corner to pin — controls slide-in direction */
  corner: "left" | "right";
  /** `rich` = label + hint (≥800px tall), `compact` = label only */
  density?: "compact" | "rich";
  children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      data-corner={corner}
      data-density={density}
      className={`menu-panel pointer-events-auto relative w-52 border-[3px] border-jade-700/90 bg-jade-950/92 hard-shadow sm:w-56 ${
        corner === "left" ? "anim-corner-left" : "anim-corner-right"
      }`}
    >
      <span className="pointer-events-none absolute -top-[3px] -left-[3px] h-2.5 w-2.5 border-t-[3px] border-l-[3px] border-tumeric-500" />
      <span className="pointer-events-none absolute -top-[3px] -right-[3px] h-2.5 w-2.5 border-t-[3px] border-r-[3px] border-tumeric-500" />
      <span className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-2.5 w-2.5 border-b-[3px] border-l-[3px] border-tumeric-500" />
      <span className="pointer-events-none absolute -right-[3px] -bottom-[3px] h-2.5 w-2.5 border-b-[3px] border-r-[3px] border-tumeric-500" />
      <h2 className="menu-panel-header relative flex items-center justify-between gap-2 border-b-2 border-jade-800 bg-gradient-to-r from-jade-900/80 via-jade-900/30 to-jade-900/80 px-3 font-display text-[10px] tracking-[0.34em] text-tumeric-400 uppercase">
        <span className="truncate">{title}</span>
        <span aria-hidden="true" className="anim-flicker h-1.5 w-1.5 shrink-0 rounded-full bg-tumeric-400" />
      </h2>
      <div className="menu-panel-body">{children}</div>
    </section>
  );
}
