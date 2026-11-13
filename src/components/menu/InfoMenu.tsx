import { useI18n } from "../../i18n/useI18n";
import { latestEntry, tierFor } from "../../game/changelog";
import CornerPanel from "./CornerPanel";
import MenuItemButton from "./MenuItemButton";
import { InfoIcon, ScrollIcon, DoorIcon } from "./icons";

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
  onQuit,
}: {
  onAbout: () => void;
  onChangelog: () => void;
  onQuit: () => void;
}) {
  const { t, lang } = useI18n();

  return (
    <CornerPanel title={t("menu.info")} corner="right">
      <MenuItemButton
        icon={<InfoIcon className="h-5 w-5" />}
        label={t("info.about")}
        hint={t("info.aboutHint")}
        onClick={onAbout}
      />
      <MenuItemButton
        icon={<ScrollIcon className="h-5 w-5" />}
        label={t("info.changelog")}
        hint={changelogHint(lang === "vi")}
        onClick={onChangelog}
      />
      <MenuItemButton
        icon={<DoorIcon className="h-5 w-5" />}
        label={t("info.quit")}
        variant="danger"
        onClick={onQuit}
      />
    </CornerPanel>
  );
}
