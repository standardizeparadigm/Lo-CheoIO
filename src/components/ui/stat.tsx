/**
 * Stat — a label/value stat row.
 *
 * Split out of the monolithic `components/ui.tsx` in v1.1.7: one primitive
 * per file so a change to, say, the modal shell cannot touch the scoreboard.
 */
import { ReactNode } from "react";

export function Stat({
  label,
  value,
  accent = "text-clay-100",
  big = false,
}: {
  label: string;
  value: ReactNode;
  accent?: string;
  big?: boolean;
}) {
  return (
    <div className="border-2 border-jade-800 bg-jade-900/60 px-3 py-2">
      <div className="font-body text-[9px] font-bold tracking-[0.2em] text-jade-500 uppercase">{label}</div>
      <div className={`font-display leading-tight ${accent} ${big ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"}`}>
        {value}
      </div>
    </div>
  );
}
