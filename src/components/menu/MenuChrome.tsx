import type { SavedRun } from "../../game/runSave";
import { ACHIEVEMENTS } from "../../game/achievements";
import GameMenu from "./GameMenu";
import InfoMenu from "./InfoMenu";
import MenuTicker from "./ticker/MenuTicker";
import type { MenuLayoutPlan } from "./layout/fit";

/**
 * Everything pinned to the bottom of the start screen (v1.1.8).
 *
 * ## Why this is a component and why it is `absolute`
 *
 * In v1.1.7 the corner row and the ticker were two more children of the
 * screen's flex column. Both were `shrink-0`, so they took 415px and 55px out
 * of a 720px window and left the scene 250px — which is what sliced the CHÉO
 * wordmark and the mascot jar. The layout had no single owner: each piece was
 * reasonable and the sum was impossible.
 *
 * Here the whole bottom band is one absolutely-positioned node. It is taken
 * out of the flow, so it cannot shrink anything. The scene separately agrees
 * to keep `plan.reserve` pixels clear (see `StartScreen`), and because both
 * numbers come from `menu/layout/metrics.ts` they cannot disagree.
 *
 * ## Responsive behaviour
 *
 *   · ≥520px wide — GAME bottom-left, INFO bottom-right, ticker under both
 *   · <520px wide — the two panels stack into one sheet above the ticker,
 *     because 2 × 208px + margins = 456px does not fit a 375px phone
 *   · <800px tall — rows drop their hint line (54px → 34px each) so the
 *     panel shrinks from 388px to 268px and the lockup keeps its space
 */
export default function MenuChrome({
  plan,
  resume,
  achievementsUnlocked,
  onPlay,
  onResume,
  onModes,
  onLeaderboard,
  onAchievements,
  onSettings,
  onAbout,
  onChangelog,
  onQuit,
}: {
  plan: MenuLayoutPlan;
  resume: SavedRun | null;
  achievementsUnlocked: number;
  onPlay: () => void;
  onResume: () => void;
  onModes: () => void;
  onLeaderboard: () => void;
  onAchievements: () => void;
  onSettings: () => void;
  onAbout: () => void;
  onChangelog: () => void;
  onQuit: () => void;
}) {
  const game = (
    <GameMenu
      resume={resume}
      achievementsUnlocked={achievementsUnlocked}
      achievementsTotal={ACHIEVEMENTS.length}
      onPlay={onPlay}
      onResume={onResume}
      onModes={onModes}
      onLeaderboard={onLeaderboard}
      onAchievements={onAchievements}
      onSettings={onSettings}
      density={plan.density}
    />
  );
  const info = <InfoMenu onAbout={onAbout} onChangelog={onChangelog} onQuit={onQuit} density={plan.density} />;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30" data-layout={plan.corner} data-density={plan.density}>
      {/* soft band so the lockup fades behind the panels instead of colliding */}
      <div aria-hidden="true" className="menu-chrome-band pointer-events-none absolute inset-0" />

      <div className="relative">
        {plan.stacked ? (
          /* phone: one column, panels above the ticker, everything in reach */
          <div className="flex flex-col gap-2 px-2 pb-1">
            {game}
            {info}
          </div>
        ) : (
          /* desktop: the two corners, exactly as designed */
          <div className="flex items-end justify-between gap-2 px-2 pb-1 sm:px-3">
            {game}
            {info}
          </div>
        )}
        <MenuTicker />
      </div>
    </div>
  );
}
