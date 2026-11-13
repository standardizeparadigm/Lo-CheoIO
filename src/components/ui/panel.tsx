/**
 * Panel — the bevelled container every screen sits in.
 *
 * One prop (`tone`) drives the border/glow pair; the hard 5px offset shadow
 * comes from `.hard-shadow` in index.css, so the depth is identical wherever
 * a panel appears. Prefer this over hand-rolling `border-2 border-jade-800`.
 *
 * Split out of `components/ui.tsx` in v1.1.7.
 */
import { ReactNode, Ref } from "react";

export function Panel({
  children,
  className = "",
  tilt = 0,
  panelRef,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  /** optional handle for the modal focus trap */
  panelRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={panelRef}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
      className={`relative border-[3px] border-jade-700/90 bg-jade-950/92 hard-shadow ${className}`}
    >
      <span className="pointer-events-none absolute -top-[3px] -left-[3px] h-3 w-3 border-t-[3px] border-l-[3px] border-tumeric-500" />
      <span className="pointer-events-none absolute -top-[3px] -right-[3px] h-3 w-3 border-t-[3px] border-r-[3px] border-tumeric-500" />
      <span className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-3 w-3 border-b-[3px] border-l-[3px] border-tumeric-500" />
      <span className="pointer-events-none absolute -right-[3px] -bottom-[3px] h-3 w-3 border-r-[3px] border-b-[3px] border-tumeric-500" />
      {children}
    </div>
  );
}
