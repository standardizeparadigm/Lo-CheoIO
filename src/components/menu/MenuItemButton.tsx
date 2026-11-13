import type { ReactNode } from "react";

/**
 * Compact row button used inside the corner GAME/INFO panels.
 * Icon slot on the left, label + hint stacked, optional trailing slot.
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
}) {
  const VARIANTS = {
    primary: "border-jade-950 bg-tumeric-500 text-jade-950 hover:bg-tumeric-400",
    brine: "border-jade-950 bg-brine-500 text-jade-950 hover:bg-brine-400",
    danger: "border-jade-950 bg-chili-500 text-clay-100 hover:bg-chili-400",
    ghost: "border-jade-600 bg-jade-900/70 text-clay-100 hover:bg-jade-800",
    ink: "border-jade-700 bg-jade-950/85 text-tumeric-400 hover:bg-jade-900",
  } as const;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`press hard-shadow-sm flex w-full items-center gap-2.5 border-[3px] px-2.5 py-2 text-left transition-colors ${VARIANTS[variant]} ${shine ? "cta-shine " : ""}${
        disabled ? "cursor-not-allowed opacity-40 saturate-0" : ""
      }`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[11px] leading-tight tracking-[0.14em]">{label}</span>
        {hint && <span className="mt-0.5 block font-body text-[9px] leading-snug opacity-75">{hint}</span>}
      </span>
      {trailing && <span className="shrink-0">{trailing}</span>}
    </button>
  );
}
