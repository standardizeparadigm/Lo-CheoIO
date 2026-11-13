import type { ReactNode } from "react";

/**
 * Small labeled corner panel that anchors GAME (bottom-left) or INFO (bottom-right).
 * Deliberately flat, uppercase header strip, orange corner ticks.
 */
export default function CornerPanel({
  title,
  corner,
  children,
}: {
  title: string;
  /** which screen corner to pin — controls slide-in direction */
  corner: "left" | "right";
  children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className={`pointer-events-auto relative w-[min(13rem,calc(50vw-0.75rem))] border-[3px] border-jade-700/90 bg-jade-950/92 hard-shadow sm:w-56 ${
        corner === "left" ? "anim-corner-left" : "anim-corner-right"
      }`}
    >
      <span className="pointer-events-none absolute -top-[3px] -left-[3px] h-2.5 w-2.5 border-t-[3px] border-l-[3px] border-tumeric-500" />
      <span className="pointer-events-none absolute -top-[3px] -right-[3px] h-2.5 w-2.5 border-t-[3px] border-r-[3px] border-tumeric-500" />
      <span className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-2.5 w-2.5 border-b-[3px] border-l-[3px] border-tumeric-500" />
      <span className="pointer-events-none absolute -right-[3px] -bottom-[3px] h-2.5 w-2.5 border-b-[3px] border-r-[3px] border-tumeric-500" />
      <h2 className="relative flex items-center justify-between gap-2 border-b-2 border-jade-800 bg-gradient-to-r from-jade-900/80 via-jade-900/30 to-jade-900/80 px-3 py-1 font-display text-[10px] tracking-[0.34em] text-tumeric-400 uppercase">
        {title}
        <span aria-hidden="true" className="anim-flicker h-1.5 w-1.5 rounded-full bg-tumeric-400" />
      </h2>
      <div className="flex flex-col gap-1.5 p-2">{children}</div>
    </section>
  );
}
