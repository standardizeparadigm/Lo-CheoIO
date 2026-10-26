import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ScoreEntry } from "../game/storage";

/* ------------------------------------------------------------------ jar */

export function JarLogo({ className = "", mood = "happy" }: { className?: string; mood?: "happy" | "hurt" }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lc-glaze" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="55%" stopColor="#f3e3c8" />
          <stop offset="100%" stopColor="#d9c09c" />
        </linearGradient>
        <linearGradient id="lc-brine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b6e07a" />
          <stop offset="100%" stopColor="#5f9c33" />
        </linearGradient>
        <clipPath id="lc-body">
          <path d="M40 26C16 44 18 100 34 122h52c16-22 18-78-6-96z" />
        </clipPath>
      </defs>
      <ellipse cx="60" cy="128" rx="34" ry="6" fill="#04100f" opacity="0.35" />
      <path d="M40 26C16 44 18 100 34 122h52c16-22 18-78-6-96z" fill="url(#lc-glaze)" stroke="#0b2a28" strokeWidth="5" />
      <g clipPath="url(#lc-body)">
        <rect x="10" y="62" width="100" height="70" fill="url(#lc-brine)" opacity="0.85" />
        <path d="M10 62q12-7 25 0t25 0 25 0 25 0v8H10z" fill="#d9f2c8" opacity="0.6" />
        <rect x="10" y="92" width="100" height="9" fill="#10403a" opacity="0.85" />
        <circle cx="34" cy="80" r="4" fill="#fdf3e0" opacity="0.8" />
        <circle cx="72" cy="74" r="3.4" fill="#e63b2e" opacity="0.85" />
        <circle cx="86" cy="86" r="3" fill="#fdf3e0" opacity="0.7" />
      </g>
      <g fill="#f5a81c" stroke="#0b2a28" strokeWidth="4">
        <ellipse cx="60" cy="24" rx="22" ry="7" />
      </g>
      <ellipse cx="60" cy="24" rx="14" ry="4" fill="#0b2a28" opacity="0.55" />
      {mood === "happy" ? (
        <>
          <g fill="#fffdf6" stroke="#0b2a28" strokeWidth="3">
            <ellipse cx="49" cy="50" rx="6.4" ry="7.6" />
            <ellipse cx="71" cy="50" rx="6.4" ry="7.6" />
          </g>
          <circle cx="50.5" cy="51.5" r="3" fill="#0b2a28" />
          <circle cx="72.5" cy="51.5" r="3" fill="#0b2a28" />
          <path d="M52 62q8 8 16 0" stroke="#0b2a28" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <ellipse cx="40" cy="60" rx="5" ry="3" fill="#e63b2e" opacity="0.3" />
          <ellipse cx="80" cy="60" rx="5" ry="3" fill="#e63b2e" opacity="0.3" />
        </>
      ) : (
        <>
          <g stroke="#0b2a28" strokeWidth="3.4" strokeLinecap="round">
            <path d="M44 45l10 10M54 45l-10 10M66 45l10 10M76 45l-10 10" />
            <path d="M52 66q8-7 16 0" fill="none" />
          </g>
          <path d="M84 30l-8 16 6 2-9 18" stroke="#7a5b41" strokeWidth="2.6" fill="none" />
        </>
      )}
    </svg>
  );
}

/* --------------------------------------------------------------- panel */

export function Panel({
  children,
  className = "",
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
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

/* -------------------------------------------------------------- button */

type Variant = "primary" | "ghost" | "danger" | "brine" | "ink";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-tumeric-500 text-jade-950 border-jade-950 hover:bg-tumeric-400",
  brine: "bg-brine-500 text-jade-950 border-jade-950 hover:bg-brine-400",
  danger: "bg-chili-500 text-clay-100 border-jade-950 hover:bg-chili-400",
  ghost: "bg-jade-900/70 text-clay-100 border-jade-600 hover:bg-jade-800",
  ink: "bg-jade-950/85 text-tumeric-400 border-jade-700 hover:bg-jade-900",
};

const SIZES = {
  sm: "px-3 py-1.5 text-[11px] tracking-[0.14em]",
  md: "px-5 py-2.5 text-xs tracking-[0.16em]",
  lg: "px-7 py-3.5 text-sm tracking-[0.18em]",
};

export function GameButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: keyof typeof SIZES }) {
  return (
    <button
      {...rest}
      className={`press hard-shadow-sm inline-flex items-center justify-center gap-2 border-[3px] font-display uppercase ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------- keycap */

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

/* ------------------------------------------------------------ statline */

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

/* ----------------------------------------------------------- scoreboard */

const MEDALS = ["text-tumeric-400", "text-brine-300", "text-chili-400"];

export function ScoreBoard({
  entries,
  highlightId,
  rows = 8,
  title = "BẢNG VÀNG HŨ DƯA",
}: {
  entries: ScoreEntry[];
  highlightId?: string | null;
  rows?: number;
  title?: string;
}) {
  const list = entries.slice(0, rows);
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b-2 border-jade-800 px-3 py-2">
        <h3 className="font-display text-[11px] tracking-[0.12em] text-tumeric-400">{title}</h3>
        <span className="font-body text-[9px] font-bold tracking-[0.18em] text-jade-500">TOP {list.length}</span>
      </div>
      <ol className="flex-1 divide-y divide-jade-800/70 overflow-y-auto">
        {list.length === 0 && (
          <li className="px-3 py-6 text-center font-body text-xs text-jade-500">Chưa có ai muối dưa.</li>
        )}
        {list.map((e, i) => {
          const hot = highlightId === e.id;
          return (
            <li
              key={e.id}
              className={`flex items-center gap-2 px-2.5 py-1.5 transition-colors ${
                hot ? "anim-ring bg-tumeric-500/25" : i % 2 ? "bg-jade-900/25" : "bg-transparent"
              }`}
            >
              <span className={`w-6 shrink-0 font-display text-sm ${MEDALS[i] ?? "text-jade-500"}`}>{i + 1}</span>
              <span
                className={`min-w-0 flex-1 truncate font-body text-xs font-bold tracking-wide ${
                  hot ? "text-tumeric-400" : "text-clay-100"
                }`}
              >
                {e.name}
              </span>
              <span className="hidden shrink-0 font-body text-[9px] tracking-[0.14em] text-jade-500 sm:block">
                CẤP {e.level} · {e.jars} HŨ
              </span>
              <span className="w-16 shrink-0 text-right font-display text-sm text-brine-300 tabular-nums">
                {e.score.toLocaleString("vi-VN")}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
