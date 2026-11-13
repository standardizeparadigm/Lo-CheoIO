import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import MenuHero from "../src/components/menu/hero/MenuHero";
import GameMenu from "../src/components/menu/GameMenu";
import HowToPlayModal from "../src/components/menu/HowToPlayModal";
import { CHANGELOG_ENTRIES } from "../src/game/changelog";
import { APP_VERSION } from "../src/version";

const noop = () => {};
describe("1.1.8 menu and release", () => {
  it("renders a single accessible centered wordmark and decorative jar", () => {
    const html = renderToStaticMarkup(<MenuHero />);
    expect(html).toContain('aria-label="LỌ CHÉO"');
    expect(html).toContain("menu-wordmark");
    expect(html).toContain("menu-mascot");
    expect(html).toContain('aria-hidden="true"');
  });
  it("offers instructions from GAME and retains the existing actions", () => {
    const html = renderToStaticMarkup(<GameMenu resume={null} achievementsUnlocked={0} achievementsTotal={16} onHowTo={noop} onPlay={noop} onResume={noop} onModes={noop} onLeaderboard={noop} onAchievements={noop} onSettings={noop} />);
    expect(html).toContain("Cách chơi");
    expect(html).toContain("GAME");
    expect(html).toContain("disabled");
  });
  it("keeps keyboard, touch and all six rules in the dialog", () => {
    const html = renderToStaticMarkup(<HowToPlayModal onClose={noop} />);
    expect(html).toContain('role="dialog"');
    expect(html).toContain("SPACE");
    expect(html).toContain("KÉO NGÓN TAY");
    expect(html.match(/<li/g)).toHaveLength(6);
  });
  it("advertises the current version in the in-game changelog", () => {
    expect(CHANGELOG_ENTRIES[0].version).toBe(APP_VERSION);
    expect(CHANGELOG_ENTRIES[0].date).toBe("2026-11-13");
  });
});
