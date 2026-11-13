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

export default function TrophyIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4a1 1 0 0 0-1 1c0 2.4 1.5 4.3 4 4.3M17 6h3a1 1 0 0 1 1 1c0 2.4-1.5 4.3-4 4.3" />
    </svg>
  );
}
