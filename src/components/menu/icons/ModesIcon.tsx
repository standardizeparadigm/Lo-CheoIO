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

export default function ModesIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="3" y="4" width="8" height="8" rx="1" />
      <rect x="13" y="4" width="8" height="8" rx="1" />
      <rect x="3" y="14" width="8" height="8" rx="1" />
      <path d="M17 14v6M14 17h6" />
    </svg>
  );
}
