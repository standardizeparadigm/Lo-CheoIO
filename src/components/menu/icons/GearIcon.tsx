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

export default function GearIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8l1.5 3 3.3-.4 1.3 3 3 1.5-1.6 3 1.6 3-3 1.5-1.3 3-3.3-.4-1.5 3-1.5-3-3.3.4-1.3-3-3-1.5 1.6-3-1.6-3 3-1.5 1.3-3 3.3.4z" strokeLinejoin="round" />
    </svg>
  );
}
