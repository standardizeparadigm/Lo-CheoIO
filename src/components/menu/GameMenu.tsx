import { useI18n } from "../../i18n/useI18n";
import type { SavedRun } from "../../game/runSave";
import { MODE_LIST } from "../../game/modes";
import { fmtNum } from "../../i18n/i18n";
import type { MessageKey } from "../../i18n/i18n";
import CornerPanel from "./CornerPanel";
import MenuItemButton from "./MenuItemButton";
import { PlayIcon, ContinueIcon, ModesIcon, TrophyIcon, MedalIcon, GearIcon } from "./icons";

/**
 * GAME corner panel (bottom-left): everything related to playing.
 * «Chơi tiếp» is enabled only when a suspended run snapshot exists.
 */
export default function GameMenu({
  resume,
  achievementsUnlocked,
  achievementsTotal,
  onHowTo,
  onPlay,
  onResume,
  onModes,
  onLeaderboard,
  onAchievements,
  onSettings,
}: {
  resume: SavedRun | null;
  achievementsUnlocked: number;
  achievementsTotal: number;
  onHowTo: () => void;
  onPlay: () => void;
  onResume: () => void;
  onModes: () => void;
  onLeaderboard: () => void;
  onAchievements: () => void;
  onSettings: () => void;
}) {
  const { t, lang } = useI18n();
  const resumeHint = resume
    ? t("game.continueHint", {
        mode: t(`mode.${resume.mode}.name` as MessageKey),
        score: fmtNum(resume.stats.score, lang),
        jars: resume.stats.jars,
      })
    : t("game.continueNone");

  return (
    <CornerPanel title={t("menu.game")} corner="left">
      <MenuItemButton icon={<PlayIcon className="h-5 w-5" />} label={t("game.play")} variant="primary" shine onClick={onPlay} />
      <MenuItemButton
        icon={<ContinueIcon className="h-5 w-5" />}
        label={t("game.continue")}
        hint={resumeHint}
        variant="brine"
        disabled={!resume}
        onClick={onResume}
      />
      <MenuItemButton
        icon={<ModesIcon className="h-5 w-5" />}
        label={t("game.modes")}
        hint={t("game.modesHint")}
        onClick={onModes}
        trailing={
          <span className="font-display text-[9px] text-brine-400/80 tabular-nums">{MODE_LIST.length}</span>
        }
      />
      <MenuItemButton icon={<span aria-hidden="true" className="font-display text-lg">?</span>} label={t("menu.howtoOpen")} onClick={onHowTo} />
      <MenuItemButton
        icon={<TrophyIcon className="h-5 w-5" />}
        label={t("game.leaderboard")}
        hint={t("game.leaderboardHint")}
        onClick={onLeaderboard}
      />
      <MenuItemButton
        icon={<MedalIcon className="h-5 w-5" />}
        label={t("game.achievements")}
        hint={t("game.achievementsHint", { n: achievementsUnlocked, total: achievementsTotal })}
        onClick={onAchievements}
      />
      <MenuItemButton
        icon={<GearIcon className="h-5 w-5" />}
        label={t("game.settings")}
        hint={t("game.settingsHint")}
        onClick={onSettings}
      />
    </CornerPanel>
  );
}
