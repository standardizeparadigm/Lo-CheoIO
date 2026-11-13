import type { ReactNode } from "react";

/**
 * Compact row button used inside the corner GAME/INFO panels.
 *
 * ## v1.1.8 — the row has a height, not a padding
 *
 * v1.1.7 let each row grow to whatever its label and hint needed. Six rows of
 * "Âm thanh · nhạc · rung · chuyển động" wrapped to three lines and the panel
 * came out 415px tall, which is what pushed the scene down to 250px and cut
 * the wordmark. The row now declares:
 *
 *   · `--menu-row-h`      (34px) one line  → label only
 *   · `--menu-row-rich-h` (54px) two lines → label + hint, hint clamped to 2
 *
 * so six rows are always 268px (compact) or 388px (rich) regardless of
 * language. `menu/layout/metrics.ts` computes with the same two numbers, so
 * the space the scene reserves for the floating row is always right.
 *
 * Long labels clamp to two lines instead of stretching the row; long hints
 * clamp to two lines inside the rich row. Nothing grows, nothing overflows.
 */
export default function MenuItemButton({
  icon,
  label,
  hint,
  onClick,
  disabled = false,
  variant = "ghost",
  trailing,
  shine = false,
  dense = false,
}: {
  icon: ReactNode;
  label: string;
  hint?: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost" | "brine" | "danger" | "ink";
  trailing?: ReactNode;
  /** v1.1.6: sweep a light band across the button (primary CTA) */
  shine?: boolean;
  /** v1.1.8: one-line row (no hint rendered) even when a hint is passed */
  dense?: boolean;
}) {
  const VARIANTS = {
    primary: "border-jade-950 bg-tumeric-500 text-jade-950 hover:bg-tumeric-400",
    brine: "border-jade-950 bg-brine-500 text-jade-950 hover:bg-brine-400",
    danger: "border-jade-950 bg-chili-500 text-clay-100 hover:bg-chili-400",
    ghost: "border-jade-600 bg-jade-900/70 text-clay-100 hover:bg-jade-800",
    ink: "border-jade-700 bg-jade-950/85 text-tumeric-400 hover:bg-jade-900",
  } as const;

  const showHint = Boolean(hint) && !dense;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      data-density={showHint ? "rich" : "compact"}
      className={`press hard-shadow-sm flex w-full items-center gap-2.5 overflow-hidden border-[3px] px-2.5 text-left transition-colors ${
        showHint ? "menu-row-rich" : "menu-row"
      } ${VARIANTS[variant]} ${shine ? "cta-shine " : ""}${disabled ? "cursor-not-allowed opacity-40 saturate-0" : ""}`}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="menu-row-label block truncate font-display text-[11px] leading-tight tracking-[0.14em]">
          {label}
        </span>
        {showHint && (
          <span className="menu-row-hint mt-0.5 block font-body text-[9px] leading-snug opacity-75">{hint}</span>
        )}
      </span>
      {trailing && <span className="shrink-0">{trailing}</span>}
    </button>
  );
}
