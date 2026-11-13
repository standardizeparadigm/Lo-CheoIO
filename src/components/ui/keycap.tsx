/**
 * Keycap — a keyboard key chip, e.g. `W` or `Space`.
 *
 * `wide` widens the cap for named keys so the row stays optically balanced.
 * Purely presentational: it is always wrapped in a `<kbd>`-ish context by the
 * caller, never bound to a real key handler.
 *
 * Split out of `components/ui.tsx` in v1.1.7.
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
