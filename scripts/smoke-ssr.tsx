/**
 * Headless render smoke test — renders every menu modal + the StartScreen
 * to static HTML with react-dom/server. Catches runtime render crashes that
 * tsc can't (bad hooks order, undefined lookups, broken i18n keys).
 * Not wired into the bundle; run with: npx vite-node scripts/smoke-ssr.tsx
 */
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import StartScreen from "../src/components/StartScreen";
import GameMenu from "../src/components/menu/GameMenu";
import InfoMenu from "../src/components/menu/InfoMenu";
import ModeSelectModal from "../src/components/menu/ModeSelectModal";
import SettingsModal from "../src/components/settings/SettingsModal";
import LeaderboardModal from "../src/components/menu/LeaderboardModal";
import AchievementsModal from "../src/components/menu/AchievementsModal";
import AboutModal from "../src/components/menu/AboutModal";
import ChangelogModal from "../src/components/menu/ChangelogModal";
import QuitModal from "../src/components/menu/QuitModal";
import { DEFAULT_SETTINGS } from "../src/game/settings";

const noop = () => {};
const scores = [
  { id: "1", name: "TEST", score: 9999, level: 6, jars: 3, combo: 21, date: Date.now() },
];

const html = renderToString(
  createElement(StartScreen as never, {
    scores,
    best: 12345,
    touchMode: false,
    achievements: ["first-catch"],
    mode: "classic",
    onModeChange: noop,
    onStart: noop,
    resume: null,
    onResume: noop,
    settings: DEFAULT_SETTINGS,
    onPatchSettings: noop,
    onChangeLanguage: noop,
    onResetDefaults: noop,
    onClearAllData: noop,
  } as never),
);
console.log("StartScreen html length:", html.length, html.includes("LỌ") || html.includes("L") ? "contains title" : "TITLE MISSING?");

const pieces: Array<[string, () => string]> = [
  ["GameMenu", () => renderToString(createElement(GameMenu as never, { resume: null, achievementsUnlocked: 1, achievementsTotal: 16, onPlay: noop, onResume: noop, onModes: noop, onLeaderboard: noop, onAchievements: noop, onSettings: noop } as never))],
  ["InfoMenu", () => renderToString(createElement(InfoMenu as never, { onAbout: noop, onChangelog: noop, onQuit: noop } as never))],
  ["ModeSelectModal", () => renderToString(createElement(ModeSelectModal as never, { mode: "classic", onChange: noop, onClose: noop } as never))],
  ["SettingsModal", () => renderToString(createElement(SettingsModal as never, { settings: DEFAULT_SETTINGS, onPatch: noop, onChangeLanguage: noop, onResetDefaults: noop, onClearAllData: noop, onClose: noop } as never))],
  ["LeaderboardModal", () => renderToString(createElement(LeaderboardModal as never, { scores, onClose: noop } as never))],
  ["AchievementsModal", () => renderToString(createElement(AchievementsModal as never, { unlocked: ["first-catch"], onClose: noop } as never))],
  ["AboutModal", () => renderToString(createElement(AboutModal as never, { onClose: noop } as never))],
  ["ChangelogModal", () => renderToString(createElement(ChangelogModal as never, { onClose: noop } as never))],
  ["QuitModal", () => renderToString(createElement(QuitModal as never, { onBack: noop } as never))],
];
for (const [name, fn] of pieces) {
  const out = fn();
  console.log("ok", name, out.length, "chars");
}
console.log("SMOKE OK");
