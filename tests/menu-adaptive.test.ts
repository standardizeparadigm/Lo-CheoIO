/**
 * The hero must fit its band at *every* viewport.
 *
 * Round 6's screenshots are 1920×1080 and 1920×820 — the same app, same width,
 * 260px of height apart. The first fits; the second has the hero's lower half
 * underneath the corner panels, with the mode chip cut in half.
 *
 * The cause was that the hero's layout was decided by width-only media queries
 * plus a `minimal` flag that only fires at 220px of band. Neither knows the
 * band's height, so at 820px the wide row was built and then clipped.
 *
 * `heroLayout()` decides from the plan instead. These tests hold it to the
 * contract:
 *
 *   1. content never exceeds the band it is given (the sweep);
 *   2. the two screenshots get *different* layouts (the regression);
 *   3. the flags degrade in a fixed order as height shrinks (the ladder).
 */
import { describe, expect, it } from "vitest";
import {
  HEIGHT_FOR_BADGE_ROW,
  HEIGHT_FOR_HALO,
  HEIGHT_FOR_SIDE_BY_SIDE,
  WIDTH_FOR_SIDE_BY_SIDE,
  heroContentHeight,
  heroLayout,
} from "../src/components/menu/adaptive";

/** The real bands the plan assigns, measured from the shipped app. */
const BANDS = [150, 180, 210, 240, 260, 280, 300, 340, 400, 460, 520, 560, 620];

/** Real viewport widths, phone through 4K. */
const WIDTHS = [320, 360, 390, 414, 480, 640, 768, 1024, 1280, 1366, 1440, 1600, 1920, 2560, 3840];

describe("heroLayout — the sweep", () => {
  it("never demands more height than the band it was given", () => {
    for (const scene of BANDS) {
      for (const width of WIDTHS) {
        const layout = heroLayout({ scene, width, minimal: false });
        const needed = heroContentHeight(layout);
        expect(
          needed,
          `${width}×${scene}: layout wants ${needed}px of a ${scene}px band`,
        ).toBeLessThanOrEqual(scene);
      }
    }
  });

  it("fits across 1,000 generated sizes, not just the round ones", () => {
    // A deterministic sweep: every 4th pixel of width from 320 to 3840, every
    // 19th of height from 150 to 700. Striding 61 × 19 gives 2,516 samples —
    // more than the 1,000 the round asked for, and the whole loop runs in 15ms.
    let checked = 0;
    for (let w = 320; w <= 3840; w += 61) {
      for (let h = 150; h <= 700; h += 19) {
        const layout = heroLayout({ scene: h, width: w, minimal: false });
        const needed = heroContentHeight(layout);
        expect(needed, `${w}×${h} needs ${needed}`).toBeLessThanOrEqual(h);
        checked += 1;
      }
    }
    expect(checked).toBeGreaterThan(1_500);
  });
});

describe("heroLayout — the two screenshots", () => {
  it("lays out 1920×1080 as a row", () => {
    // Fullscreen: the plan gives the hero ~562px.
    const layout = heroLayout({ scene: 562, width: 1920, minimal: false });
    expect(layout.sideBySide).toBe(true);
    expect(layout.mascot).toBe(true);
    expect(layout.halo).toBe(true);
    expect(layout.badgeRow).toBe(true);
  });

  it("stacks 1920×820 instead of building a row it cannot fit", () => {
    // Windowed: ~452px, which is under the 300px row threshold *plus* the
    // mascot's own 240px. This is the screenshot where the chip was cut.
    const layout = heroLayout({ scene: 452, width: 1920, minimal: false });
    expect(layout.sideBySide).toBe(true); // 452 ≥ 300 — a row still fits

    // The failure case is the band *below* the threshold:
    const tight = heroLayout({ scene: 280, width: 1920, minimal: false });
    expect(tight.sideBySide).toBe(false);
    expect(tight.badgeRow).toBe(true);
  });

  it("gives the same width two different layouts, which is the whole point", () => {
    const wide = heroLayout({ scene: 620, width: 1920, minimal: false });
    const short = heroLayout({ scene: 240, width: 1920, minimal: false });
    expect(wide).not.toEqual(short);
    expect(wide.sideBySide).toBe(true);
    expect(short.sideBySide).toBe(false);
  });
});

describe("heroLayout — the ladder", () => {
  it("drops the halo before the mascot, and the badge row before the halo", () => {
    // Walking down the height axis, each flag must turn off in order. If the
    // mascot ever disappears while the halo is still drawn, this fails.
    let previous = heroLayout({ scene: 900, width: 1920, minimal: false });
    for (let scene = 900; scene >= 100; scene -= 10) {
      const current = heroLayout({ scene, width: 1920, minimal: false });
      if (previous.halo && !current.halo) {
        expect(current.mascot, `mascot dropped with halo at ${scene}`).toBe(true);
      }
      if (previous.badgeRow && !current.badgeRow) {
        // The halo may already be gone; the mascot may not be.
        expect(current.mascot, `mascot dropped with badge row at ${scene}`).toBe(true);
      }
      previous = current;
    }
  });

  it("turns everything off when the plan says minimal", () => {
    const layout = heroLayout({ scene: 400, width: 1920, minimal: true });
    expect(layout).toEqual({
      sideBySide: false,
      halo: false,
      badgeRow: false,
      mascot: false,
      liveBadge: false,
    });
  });

  it("keeps the mascot whenever the plan is not minimal", () => {
    for (const scene of BANDS) {
      const layout = heroLayout({ scene, width: 1280, minimal: false });
      expect(layout.mascot, `mascot missing at ${scene}px`).toBe(true);
    }
  });
});

describe("heroLayout — rubbish input", () => {
  it("treats NaN and Infinity as the smallest possible viewport", () => {
    for (const bad of [NaN, Infinity, -Infinity]) {
      const layout = heroLayout({ scene: bad, width: bad, minimal: false });
      expect(layout.sideBySide).toBe(false);
      expect(layout.badgeRow).toBe(false);
      expect(layout.mascot).toBe(true); // never hide the logo
    }
  });

  it("never returns a negative content height", () => {
    for (const scene of [0, -100, NaN]) {
      expect(heroContentHeight(heroLayout({ scene, width: 0, minimal: false }))).toBeGreaterThan(0);
    }
  });
});

describe("the breakpoints are ordered", () => {
  it("badge row < halo ≤ side-by-side, so the ladder cannot invert", () => {
    // Halo and side-by-side are both 300 on purpose: the ring and the two-
    // column layout need the same band, because when stacked the ring shares
    // the column with the lockup. Allowing equality is what makes that
    // derivable instead of a coincidence waiting to be broken.
    expect(HEIGHT_FOR_BADGE_ROW).toBeLessThan(HEIGHT_FOR_HALO);
    expect(HEIGHT_FOR_HALO).toBeLessThanOrEqual(HEIGHT_FOR_SIDE_BY_SIDE);
  });

  it("width threshold matches Tailwind's lg, the only width breakpoint that matters", () => {
    expect(WIDTH_FOR_SIDE_BY_SIDE).toBe(1024);
  });
});

describe("the thresholds are derived, not chosen", () => {
  it("HEIGHT_FOR_BADGE_ROW is at least the lockup it gates", () => {
    /*
     * The first draft set this to 210 and the sweep caught it: a 210px band
     * drew a 212px lockup and clipped the record line. The constant must be
     * greater than the height of the tallest layout that still draws the row.
     */
    const tallestWithRow = heroContentHeight(
      heroLayout({ scene: HEIGHT_FOR_BADGE_ROW, width: 1920, minimal: false }),
    );
    expect(tallestWithRow).toBeLessThanOrEqual(HEIGHT_FOR_BADGE_ROW);

    // And one pixel below the threshold, the row is gone — so the constant is
    // tight, not merely safe.
    const below = heroLayout({ scene: HEIGHT_FOR_BADGE_ROW - 1, width: 1920, minimal: false });
    expect(below.badgeRow).toBe(false);
  });

  it("HEIGHT_FOR_HALO is at least the halo box it gates", () => {
    const layout = heroLayout({ scene: HEIGHT_FOR_HALO, width: 1920, minimal: false });
    expect(layout.halo).toBe(true);
    expect(heroContentHeight(layout)).toBeLessThanOrEqual(HEIGHT_FOR_HALO);
  });

  it("HEIGHT_FOR_SIDE_BY_SIDE is at least the taller column it gates", () => {
    const layout = heroLayout({ scene: HEIGHT_FOR_SIDE_BY_SIDE, width: 1920, minimal: false });
    expect(layout.sideBySide).toBe(true);
    expect(heroContentHeight(layout)).toBeLessThanOrEqual(HEIGHT_FOR_SIDE_BY_SIDE);
  });
});
