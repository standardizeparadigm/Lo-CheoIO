import type { ReleaseTier } from "./types";

/**
 * SemVer → release tier.
 *
 *   1.0.0 · 2.0.0   → major  (a feature wave; the rarest tier)
 *   1.1.0 · 1.2.0   → minor  (an upgrade; what the UI labels UPDATE)
 *   1.1.1 … 1.1.8   → patch  (fixes/polish; what the UI labels PATCH)
 *
 * The tag on screen is derived here rather than typed into each entry, so a
 * release tag can never contradict the version string printed beside it.
 * Junk input degrades to "patch" instead of throwing — this runs in render.
 */
export function tierFor(version: string): ReleaseTier {
  const [major, minor, patch] = version.split(".").map((n) => Number.parseInt(n, 10));
  if (!Number.isFinite(major) || !Number.isFinite(minor) || !Number.isFinite(patch)) return "patch";
  if (patch !== 0) return "patch";
  if (minor !== 0) return "minor";
  return "major";
}

/** Display order of the filter chips. */
export const TIER_ORDER: readonly ReleaseTier[] = ["major", "minor", "patch"];

/** i18n key that labels a tier in the UI. */
export const TIER_LABEL_KEY = {
  major: "changelog.tier.major",
  minor: "changelog.tier.minor",
  patch: "changelog.tier.patch",
} as const;
