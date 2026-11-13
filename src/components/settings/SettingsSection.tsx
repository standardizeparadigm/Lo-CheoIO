import type { ReactNode } from "react";

/**
 * Titled settings section — uppercase label with a tiny jade tick,
 * consistent with the corner-panel visual language.
 */
export default function SettingsSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-2 border-jade-800/80 bg-jade-950/40">
      <header className="flex items-center gap-2 border-b-2 border-jade-800/80 bg-jade-900/40 px-3 py-1.5">
        <span className="h-3 w-3 shrink-0 text-tumeric-500" aria-hidden="true">
          {icon ?? (
            <svg viewBox="0 0 12 12" fill="currentColor" className="h-full w-full">
              <path d="M2 2h8L6 10z" />
            </svg>
          )}
        </span>
        <h3 className="font-display text-[10px] tracking-[0.3em] text-brine-300 uppercase">{title}</h3>
      </header>
      <div className="flex flex-col gap-2 p-2.5">{children}</div>
    </section>
  );
}
