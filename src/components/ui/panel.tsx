/**
 * Panel — the bevelled container used by every screen.
 *
 * Split out of the monolithic `components/ui.tsx` in v1.1.7: one primitive
 * per file so a change to, say, the modal shell cannot touch the scoreboard.
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
