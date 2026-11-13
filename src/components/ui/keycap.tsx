/**
 * Keycap — a keyboard key chip.
 *
 * Split out of the monolithic `components/ui.tsx` in v1.1.7: one primitive
 * per file so a change to, say, the modal shell cannot touch the scoreboard.
 */
import { ReactNode } from "react";

export function Keycap({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <kbd
      className={`inline-flex h-7 items-center justify-center border-2 border-jade-600 bg-jade-900 px-1.5 font-display text-[10px] text-brine-300 shadow-[2px_2px_0_0_rgba(6,26,26,0.8)] ${
        wide ? "min-w-16" : "min-w-7"
      }`}
    >
      {children}
    </kbd>
  );
}
