/** Inline icon set for the corner menus — one stroke-consistent family, no deps. */
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PlayIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ContinueIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M4 12h9" />
      <path d="M9 7a5.5 5.5 0 1 1-2 4.2" />
      <path d="M13 12l7 0" stroke="none" />
      <path d="M16.5 8.5L21 12l-4.5 3.5" fill="currentColor" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ModesIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="3" y="4" width="8" height="8" rx="1" />
      <rect x="13" y="4" width="8" height="8" rx="1" />
      <rect x="3" y="14" width="8" height="8" rx="1" />
      <path d="M17 14v6M14 17h6" />
    </svg>
  );
}

export function TrophyIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4a1 1 0 0 0-1 1c0 2.4 1.5 4.3 4 4.3M17 6h3a1 1 0 0 1 1 1c0 2.4-1.5 4.3-4 4.3" />
    </svg>
  );
}

export function MedalIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="12" cy="14" r="5.5" />
      <path d="M8.5 9.5L5 3h5l2 4 2-4h5l-3.5 6.5" />
    </svg>
  );
}

export function GearIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8l1.5 3 3.3-.4 1.3 3 3 1.5-1.6 3 1.6 3-3 1.5-1.3 3-3.3-.4-1.5 3-1.5-3-3.3.4-1.3-3-3-1.5 1.6-3-1.6-3 3-1.5 1.3-3 3.3.4z" strokeLinejoin="round" />
    </svg>
  );
}

export function InfoIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.5h.01" />
    </svg>
  );
}

export function ScrollIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M7 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7" />
      <path d="M7 3a2 2 0 0 0-2 2v1h4M7 3v18" />
      <path d="M11 8h5M11 12h5M11 16h3" />
    </svg>
  );
}

export function DoorIcon(p: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M14 21V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v17" />
      <path d="M3 21h18" />
      <path d="M10 12.5h.01" />
      <path d="M14 8l6-2v12l-6 2" />
    </svg>
  );
}
