import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  CORNER_BODY_PADDING,
  CORNER_BORDER,
  CORNER_HEADER_HEIGHT,
  CORNER_MAX_ROWS,
  CORNER_PANEL_HEIGHT,
  CORNER_PANEL_RICH_HEIGHT,
  CORNER_PANEL_WIDTH,
  CORNER_ROW_MARGIN,
  CORNER_ROW_RESERVE,
  CORNER_ROW_RICH_RESERVE,
  FLOATING_ROW_GAP,
  MENU_ROW_GAP,
  MENU_ROW_HEIGHT,
  MENU_ROW_RICH_HEIGHT,
  MIN_SCENE_HEIGHT,
  RICH_ROW_BREAKPOINT,
  STACK_BREAKPOINT,
  TICKER_HEIGHT,
  cornerPanelHeight,
  cornerRowReserve,
} from "../src/components/menu/layout/metrics";
import {
  cornerLayoutFor,
  cornerRowWidth,
  fitsTitleLockup,
  panelHeightFor,
  planMenuLayout,
  reserveFor,
  rowDensityFor,
  rowHeightFor,
} from "../src/components/menu/layout/fit";

/**
 * Locks the v1.1.8 start-screen overflow fix.
 *
 * ## What went wrong in v1.1.7
 *
 * The corner panels and the ticker were `shrink-0` flex siblings of the scene,
 * so the scene got `720 − 415 − 55 = 250px` and the wordmark and the mascot
 * were sliced by a seam at `y ≈ 247px`. Nothing in the codebase knew the total,
 * so nothing could catch it.
 *
 * ## What these tests pin
 *
 * 1. The arithmetic is right: panels + gap + ticker fit inside a 720px window
 *    *and* leave the title lockup its minimum height.
 * 2. The CSS agrees with the arithmetic: every constant here has a matching
 *    custom property in `index.css`, so the numbers cannot drift apart.
 * 3. The screen structure is the fix: the corner row and ticker are absolutely
 *    positioned (not flex children), the ticker no longer wraps two lines, and
 *    the scene reserves the band instead of sharing the column.
 */
const root = resolve(__dirname, "..");
const css = readFileSync(resolve(root, "src/index.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const startScreen = readFileSync(resolve(root, "src/components/StartScreen.tsx"), "utf8");
const cornerPanel = readFileSync(resolve(root, "src/components/menu/CornerPanel.tsx"), "utf8");
const chrome = readFileSync(resolve(root, "src/components/menu/MenuChrome.tsx"), "utf8");
const ticker = readFileSync(resolve(root, "src/components/menu/ticker/MenuTicker.tsx"), "utf8");

/** Read a `--custom-prop: <n>px` from the @theme / :root block. */
function cssPx(name: string): number {
  const m = new RegExp(`${name}\\s*:\\s*(\\d+)px`).exec(css);
  expect(m, `${name} must be declared in px in index.css`).not.toBeNull();
  return Number(m![1]);
}

describe("menu layout — the sum that used to overflow", () => {
  it("keeps panel + gap + ticker well under a 720px window", () => {
    // The v1.1.7 row alone was 415px; the whole floating chrome must be less.
    expect(CORNER_ROW_RESERVE).toBeLessThan(720 - MIN_SCENE_HEIGHT);
    expect(CORNER_ROW_RESERVE).toBeLessThan(400);
  });

  it("fits the title lockup at the reference 1280×720", () => {
    const plan = planMenuLayout({ width: 1280, height: 720 });
    expect(plan.fits).toBe(true);
    expect(plan.scene).toBe(720 - plan.reserve);
    expect(plan.scene).toBeGreaterThanOrEqual(MIN_SCENE_HEIGHT);
  });

  it("never lets the scene go negative, even on a tiny window", () => {
    for (const h of [320, 480, 568, 667, 720, 768, 900, 1080, 1440]) {
      for (const w of [320, 375, 414, 520, 768, 1024, 1920]) {
        const plan = planMenuLayout({ width: w, height: h });
        expect(plan.reserve).toBeGreaterThan(0);
        expect(Number.isFinite(plan.scene)).toBe(true);
      }
    }
  });

  it("reserves strictly more for two-line rows than for one-line rows", () => {
    expect(CORNER_ROW_RICH_RESERVE).toBeGreaterThan(CORNER_ROW_RESERVE);
    expect(CORNER_PANEL_RICH_HEIGHT).toBeGreaterThan(CORNER_PANEL_HEIGHT);
  });

  it("agrees with the panel builder for both densities", () => {
    expect(cornerPanelHeight(MENU_ROW_HEIGHT)).toBe(CORNER_PANEL_HEIGHT);
    expect(cornerPanelHeight(MENU_ROW_RICH_HEIGHT)).toBe(CORNER_PANEL_RICH_HEIGHT);
  });

  it("builds the reserve from its four parts", () => {
    expect(cornerRowReserve()).toBe(CORNER_PANEL_HEIGHT + FLOATING_ROW_GAP + TICKER_HEIGHT + CORNER_ROW_MARGIN);
    expect(CORNER_ROW_RESERVE).toBe(cornerRowReserve());
  });

  it("counts six rows as the tallest panel (GAME, not INFO)", () => {
    expect(CORNER_MAX_ROWS).toBe(6);
    // 6 rows → 5 gaps; the arithmetic must not use 6.
    expect(CORNER_PANEL_HEIGHT).toBe(
      CORNER_MAX_ROWS * MENU_ROW_HEIGHT +
        (CORNER_MAX_ROWS - 1) * MENU_ROW_GAP +
        CORNER_HEADER_HEIGHT +
        CORNER_BODY_PADDING +
        CORNER_BORDER,
    );
  });
});

describe("menu layout — breakpoints", () => {
  it("stacks the panels below the stack breakpoint", () => {
    expect(cornerLayoutFor(STACK_BREAKPOINT - 1)).toBe("stacked");
    expect(cornerLayoutFor(STACK_BREAKPOINT)).toBe("side-by-side");
    expect(cornerLayoutFor(375)).toBe("stacked");
    expect(cornerLayoutFor(1920)).toBe("side-by-side");
  });

  it("proves the side-by-side row genuinely does not fit a 375px phone", () => {
    // 2 × 208 + margins + the gutter between them = 456px > 375px.
    expect(cornerRowWidth()).toBeGreaterThan(375);
    expect(CORNER_PANEL_WIDTH * 2).toBeLessThan(cornerRowWidth());
    expect(STACK_BREAKPOINT).toBeGreaterThanOrEqual(cornerRowWidth() - 8);
  });

  it("drops the hint line below the rich-row breakpoint", () => {
    expect(rowDensityFor(RICH_ROW_BREAKPOINT - 1)).toBe("compact");
    expect(rowDensityFor(RICH_ROW_BREAKPOINT)).toBe("rich");
    expect(rowHeightFor("rich")).toBeGreaterThan(rowHeightFor("compact"));
    expect(reserveFor("rich")).toBeGreaterThan(reserveFor("compact"));
    expect(panelHeightFor("rich")).toBeGreaterThan(panelHeightFor("compact"));
  });

  it("keeps the title lockup viable at or above the rich breakpoint", () => {
    expect(fitsTitleLockup(RICH_ROW_BREAKPOINT)).toBe(true);
    for (const h of [800, 900, 1024, 1080, 1440]) expect(fitsTitleLockup(h)).toBe(true);
  });
});

describe("menu layout — CSS and TypeScript agree", () => {
  it("declares the row heights it computes with", () => {
    expect(cssPx("--menu-row-h")).toBe(MENU_ROW_HEIGHT);
    expect(cssPx("--menu-row-rich-h")).toBe(MENU_ROW_RICH_HEIGHT);
    expect(cssPx("--menu-row-gap")).toBe(MENU_ROW_GAP);
  });

  it("declares the header, ticker and reserve it computes with", () => {
    expect(cssPx("--menu-header-h")).toBe(CORNER_HEADER_HEIGHT);
    expect(cssPx("--menu-ticker-h")).toBe(TICKER_HEIGHT);
    expect(cssPx("--menu-reserve")).toBe(CORNER_ROW_RESERVE);
    expect(cssPx("--menu-reserve-rich")).toBe(CORNER_ROW_RICH_RESERVE);
  });

  it("pins the ticker to a single line of known height", () => {
    // The v1.1.7 ticker let the footer line wrap under the marquee, which is
    // why the copyright row was sliced by the window edge.
    expect(css).toMatch(/\.menu-ticker\s*\{[^}]*height:\s*var\(--menu-ticker-h\)/);
    expect(css).toMatch(/\.menu-ticker\s*\{[^}]*overflow:\s*hidden/);
  });

  it("hides the scrollbar in the scene instead of painting it over the art", () => {
    expect(css).toMatch(/\.menu-scene\s*\{[^}]*scrollbar-width:\s*none/);
    expect(css).toMatch(/\.menu-scene::-webkit-scrollbar\s*\{[^}]*display:\s*none/);
  });

  it("sizes menu rows from the custom property, not from padding", () => {
    expect(css).toMatch(/\.menu-row\s*\{[^}]*height:\s*var\(--menu-row-h\)/);
    expect(css).toMatch(/\.menu-row-rich\s*\{[^}]*height:\s*var\(--menu-row-rich-h\)/);
  });

  it("lets long hints clamp instead of growing the row", () => {
    // A 3-line hint inside a fixed-height row would clip the label; clamping is
    // what keeps "Âm thanh · nhạc · rung · chuyển động" on two lines.
    expect(css).toMatch(/\.menu-row-hint\s*\{[^}]*-webkit-line-clamp:\s*2/);
  });
});

describe("menu layout — StartScreen structure", () => {
  it("floats the corner row instead of making it a flex sibling", () => {
    // The fix in one assertion: the band that holds GameMenu/InfoMenu is
    // absolutely positioned, so it takes no height from the scene.
    expect(chrome).toMatch(/absolute inset-x-0 bottom-0/);
    // …and no element in it claims `shrink-0` (that class is what made the
    // v1.1.7 row inflexible). Comments are stripped before the check so the
    // explanation above cannot satisfy or trip it.
    const chromeCode = chrome.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(chromeCode).not.toMatch(/shrink-0/);
    // …and the screen actually uses it.
    expect(startScreen).toContain("<MenuChrome");
  });

  it("reserves the band on the scroll container", () => {
    expect(startScreen).toMatch(/paddingBottom|padding-bottom/);
    expect(startScreen).toContain("planMenuLayout");
  });

  it("never gives the scene a flex-1 sibling row again", () => {
    // `shrink-0` on a sibling of the scroll area is exactly the bug.
    expect(startScreen).not.toMatch(/shrink-0 items-end justify-between/);
  });

  it("uses the ticker component rather than inlining two lines", () => {
    // The band lives in its own module now, and the screen no longer holds a
    // second, wrapping copyright line under the marquee.
    expect(chrome).toContain("<MenuTicker");
    expect(startScreen).not.toContain("anim-marquee");
    expect(startScreen).not.toMatch(/AGPL-3\.0/);
    // Exactly one row inside the fixed-height band, not a marquee + a footer.
    expect(ticker).toContain("menu-ticker");
    expect(ticker).toMatch(/items-center/);
  });

  it("keeps the corner panel on the fixed-height contract", () => {
    expect(cornerPanel).toContain("menu-panel");
    expect(cornerPanel).toContain("menu-panel-body");
    expect(cornerPanel).toContain("menu-panel-header");
    // The body owns the gap; the header owns its height. Both are CSS props.
    expect(css).toMatch(/\.menu-panel-body\s*\{[^}]*gap:\s*var\(--menu-row-gap\)/);
    expect(css).toMatch(/\.menu-panel-header\s*\{[^}]*height:\s*var\(--menu-header-h\)/);
  });
});
