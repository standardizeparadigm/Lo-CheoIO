/** Inline menu icon — one stroke-consistent family (stroke width 2, round caps). */
import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function ContinueIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M4 12h9" />
      <path d="M9 7a5.5 5.5 0 1 1-2 4.2" />
      <path d="M13 12l7 0" stroke="none" />
      <path d="M16.5 8.5L21 12l-4.5 3.5" fill="currentColor" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
