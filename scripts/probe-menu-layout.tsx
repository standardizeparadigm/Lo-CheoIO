/**
 * Static-render probe for the v1.1.8 start-screen layout fix.
 *
 * Renders `StartScreen` to markup with react-dom/server and asserts the
 * structural properties that make the overflow bug impossible — the same
 * claims `tests/menu-layout.test.ts` makes on source, but checked on the
 * actual DOM output. Run: npx vite-node scripts/probe-menu-layout.tsx
 */
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import StartScreen from "../src/components/StartScreen";
import { DEFAULT_SETTINGS } from "../src/game/settings";
import { planMenuLayout } from "../src/components/menu/layout";

const noop = () => {};
const html = renderToString(
  createElement(StartScreen as never, {
    scores: [],
    best: 12345,
    touchMode: false,
    achievements: [],
    mode: "classic",
    onModeChange: noop,
    onStart: noop,
    resume: null,
    onResume: noop,
    settings: DEFAULT_SETTINGS,
    onPatchSettings: noop,
    onChangeLanguage: noop,
    onQuickSettings: noop,
    onResetDefaults: noop,
    onClearAllData: noop,
  }),
);

const checks: Array<[string, boolean]> = [
  ["scene exists", /class="[^"]*menu-scene/.test(html)],
  ["scene reserves the band", /padding-bottom:\s*338px/.test(html)],
  ["chrome is absolutely positioned", /class="[^"]*absolute inset-x-0 bottom-0/.test(html)],
  ["chrome band gradient present", /menu-chrome-band/.test(html)],
  ["ticker band present", /menu-ticker/.test(html)],
  ["both corner panels keep fixed body", (html.match(/menu-panel-body/g) ?? []).length === 2],
  ["both corner panels keep fixed header", (html.match(/menu-panel-header/g) ?? []).length === 2],
  ["rows carry a fixed height class", (html.match(/menu-row(-rich)?/g) ?? []).length >= 18],
  ["wordmark is height-capped", /menu-wordmark/.test(html)],
  ["no shrink-0 corner row remains", !/flex shrink-0 items-end justify-between/.test(html)],
  ["no second inline copyright row", (html.match(/AGPL-3\.0/g) ?? []).length === 1],
];

let ok = true;
for (const [label, pass] of checks) {
  console.log(`${pass ? "✓" : "✗"} ${label}`);
  if (!pass) ok = false;
}

console.log("\nlayout plans:");
for (const [w, h] of [[1280, 720], [1920, 1080], [1366, 768], [375, 667], [768, 1024]] as const) {
  const p = planMenuLayout({ width: w, height: h });
  console.log(`  ${w}×${h}`.padEnd(12), `reserve ${p.reserve}`.padEnd(14), `scene ${p.scene}`.padEnd(12), `${p.corner}/${p.density}`);
}

console.log(`\nmarkup ${html.length} chars — ${ok ? "MENU LAYOUT OK" : "MENU LAYOUT FAILED"}`);
process.exit(ok ? 0 : 1);
