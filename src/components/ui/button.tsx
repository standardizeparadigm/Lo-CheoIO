/**
 * GameButton — the primary action button.
 *
 * Variants: `primary` (turmeric fill, the PLAY/restart treatment), `ghost`
 * (bordered, secondary actions) and `danger` (chili, destructive). It forwards
 * every native button attribute, so `disabled`, `aria-*` and `type` all pass
 * through untouched.
 *
 * Split out of `components/ui.tsx` in v1.1.7.
 */
import { ButtonHTMLAttributes } from "react";

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
