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

export default function ScrollIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M7 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7" />
      <path d="M7 3a2 2 0 0 0-2 2v1h4M7 3v18" />
      <path d="M11 8h5M11 12h5M11 16h3" />
    </svg>
  );
}
