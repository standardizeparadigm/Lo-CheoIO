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
  onPlay,
  onResume,
  onModes,
  onLeaderboard,
  onAchievements,
  onSettings,
  density = "compact",
}: {
  resume: SavedRun | null;
  achievementsUnlocked: number;
  achievementsTotal: number;
  onPlay: () => void;
  onResume: () => void;
  onModes: () => void;
  onLeaderboard: () => void;
  onAchievements: () => void;
  onSettings: () => void;
  /** v1.1.8: `rich` shows each row's hint, `compact` drops it to fit short windows */
  density?: "compact" | "rich";
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
    <CornerPanel title={t("menu.game")} corner="left" density={density}>
      <MenuItemButton icon={<PlayIcon className="h-5 w-5" />} label={t("game.play")} variant="primary" shine dense={density === "compact"} onClick={onPlay} />
      <MenuItemButton
        icon={<ContinueIcon className="h-5 w-5" />}
        label={t("game.continue")}
        hint={resumeHint}
        variant="brine"
        disabled={!resume}
        dense={density === "compact"}
        onClick={onResume}
      />
      <MenuItemButton
        icon={<ModesIcon className="h-5 w-5" />}
        label={t("game.modes")}
        hint={t("game.modesHint")}
        dense={density === "compact"}
        onClick={onModes}
        trailing={
          <span className="font-display text-[9px] text-brine-400/80 tabular-nums">{MODE_LIST.length}</span>
        }
      />
      <MenuItemButton
        icon={<TrophyIcon className="h-5 w-5" />}
        label={t("game.leaderboard")}
        hint={t("game.leaderboardHint")}
        dense={density === "compact"}
        onClick={onLeaderboard}
      />
      <MenuItemButton
        icon={<MedalIcon className="h-5 w-5" />}
        label={t("game.achievements")}
        hint={t("game.achievementsHint", { n: achievementsUnlocked, total: achievementsTotal })}
        dense={density === "compact"}
        onClick={onAchievements}
      />
      <MenuItemButton
        icon={<GearIcon className="h-5 w-5" />}
        label={t("game.settings")}
        hint={t("game.settingsHint")}
        dense={density === "compact"}
        onClick={onSettings}
      />
    </CornerPanel>
  );
}
