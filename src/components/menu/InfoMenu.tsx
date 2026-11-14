import { useI18n } from "../../i18n/useI18n";
import { latestEntry, tierFor } from "../../game/changelog";
import CornerPanel from "./CornerPanel";
import { cornerRowHeight } from "./layout";
import type { MenuPlan } from "./layout";
import MenuItemButton from "./MenuItemButton";
import { InfoIcon, ScrollIcon, DoorIcon, GearIcon } from "./icons";
import { PanelStatStrip } from "./panel";
import { buildStat } from "./panel";
import { PanelSummary } from "./panel";
import { summaryLines } from "./panel";
import { PanelChallenge } from "./panel";
import { challengeLine } from "./panel";
import { challengeFor } from "../../game/daily";
import { MODE_LIST } from "../../game/modes";
import { APP_VERSION } from "../../version";
import { ACHIEVEMENTS } from "../../game/achievements";
import { KINDS } from "../../game/engine";

/**
 * INFO corner panel (bottom-right): project & author information.
 * Contains exactly: about the author, changelog, quit.
 *
 * v1.1.7: the changelog hint used to print the same version number as the
 * title-lockup badge right above it, so it carried no information. It now
 * reads the newest entry from the changelog data and shows its tier and date
 * — e.g. "PATCH · 2026-11-12" — which is what a player actually wants to know
 * before opening the panel. `latestEntry()` guarantees it tracks APP_VERSION
 * without a second hardcoded string.
 */
function changelogHint(vi: boolean): string {
  const latest = latestEntry();
  const tier = tierFor(latest.version).toUpperCase();
  const date = vi ? latest.date.split("-").reverse().join("/") : latest.date;
  return `${tier} · ${date}`;
}
export default function InfoMenu({
  onAbout,
  onChangelog,
  onShortcuts,
  onQuit,
  plan,
}: {
  onAbout: () => void;
  onChangelog: () => void;
  onShortcuts: () => void;
  onQuit: () => void;
  plan: MenuPlan;
}) {
  const { t, lang } = useI18n();

  return (
    <CornerPanel
      title={t("menu.info")}
      corner="right"
      height={cornerRowHeight(plan.dense, plan.tight)}
      width={plan.panelWidth}
      tight={plan.tight}
      footer={plan.footer ? <PanelStatStrip stats={buildStat(APP_VERSION, tierFor(latestEntry().version))} /> : undefined}
    >
      <MenuItemButton
        icon={<InfoIcon className="h-5 w-5" />}
        label={t("info.about")}
        hint={t("info.aboutHint")}
        rich={plan.dense}
        onClick={onAbout}
      />
      <MenuItemButton
        icon={<ScrollIcon className="h-5 w-5" />}
        label={t("info.changelog")}
        hint={changelogHint(lang === "vi")}
        rich={plan.dense}
        onClick={onChangelog}
      />
      {/*
        ROUND 5: the fourth row.

        INFO carried three rows in a panel sized for seven, so 160px of it was
        empty — visible in the round-5 screenshot as a large blank region under
        «THOÁT». The report asked for that space to be used. The shortcuts panel
        is the honest filler: it is information the menu should have had anyway
        (only movement was ever written down), and it is one row, not a
        redesigned panel.
      */}
      <MenuItemButton
        icon={<GearIcon className="h-5 w-5" />}
        label={t("info.shortcuts")}
        hint={t("info.shortcutsHint")}
        rich={plan.dense}
        onClick={onShortcuts}
      />
      <MenuItemButton
        icon={<DoorIcon className="h-5 w-5" />}
        label={t("info.quit")}
        variant="danger"
        rich={plan.dense}
        onClick={onQuit}
      />
      {/*
        The panel is sized for GAME's seven rows and INFO has four, so ~126px
        of it was blank. This fills it with the catalogue counts — the same
        numbers the modes list and achievements list already use, printed once,
        in the panel whose job is summarising. Not the rejected hero strip: no
        duplication on this screen, and not in the hero.
      */}
      {/*
        ROUND 6: the deck's challenge, as one line. The deck itself is gone
        (three columns cannot live in a fixed-height band), but the challenge is
        one number and one mode name, and it belongs somewhere the player can
        read it. See `panel/summary.ts#challengeLine`.
      */}
      {plan.footer && (
        <PanelChallenge
          line={(() => { const c = challengeFor(new Date(), MODE_LIST.map((m) => m.id)); return challengeLine(c.mode, c.target); })()}
        />
      )}
      {!plan.tight && (
        <PanelSummary
          lines={summaryLines({
            modes: MODE_LIST.length,
            ingredients: KINDS.length,
            achievements: ACHIEVEMENTS.length,
          })}
        />
      )}
    </CornerPanel>
  );
}
