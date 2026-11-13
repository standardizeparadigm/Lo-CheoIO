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

export default function DoorIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M14 21V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v17" />
      <path d="M3 21h18" />
      <path d="M10 12.5h.01" />
      <path d="M14 8l6-2v12l-6 2" />
    </svg>
  );
}
