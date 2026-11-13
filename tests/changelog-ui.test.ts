import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Static contract test for the changelog UI (v1.1.7).
 *
 * No jsdom in this repo, so — like the other UI tests here — we read the
 * source and assert the wiring rather than rendering. That is enough to
 * catch the failure mode this feature actually has: a tier whose colour
 * token is missing, or the deprecated `kind` sneaking back onto the render
 * path.
 */
const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");
const modal = read("src/components/menu/ChangelogModal.tsx");

describe("ChangelogModal — tier rendering", () => {
  it("imports the tier derivation instead of reading entry.kind", () => {
    expect(modal).toContain("tierFor");
    expect(modal).not.toMatch(/entry\.kind/);
  });

  it("maps every tier to its own colour family", () => {
    const tiers = [
      ["patch", "violet"],
      ["minor", "tumeric"],
      ["major", "pink"],
    ] as const;
    for (const [tier, hue] of tiers) {
      const block = modal.slice(modal.indexOf(`${tier}: {`));
      const style = block.slice(0, block.indexOf("},"));
      expect(style, `${tier} must use ${hue}-*`).toContain(`${hue}-500`);
    }
  });

  it("the three hues are distinct — PATCH purple, UPDATE gold, MAJOR pink", () => {
    const found = ["violet-500", "tumeric-500", "pink-500"].filter((h) => modal.includes(h));
    expect(new Set(found).size).toBe(3);
  });

  it("declares the violet and pink tokens in the Tailwind theme", () => {
    const css = read("src/index.css");
    expect(css).toContain("--color-violet-500");
    expect(css).toContain("--color-pink-500");
  });

  it("offers the tier filter with an accessible pressed state", () => {
    expect(modal).toContain("aria-pressed");
    expect(modal).toContain('role="group"');
    expect(modal).toContain("entriesForTier");
    expect(modal).toContain("tierCounts");
  });

  it("the menu hint reads the newest entry rather than hardcoding a version", () => {
    const info = read("src/components/menu/InfoMenu.tsx");
    expect(info).toContain("latestEntry");
    expect(info).not.toContain("hint={`v${APP_VERSION}`}");
  });
});
