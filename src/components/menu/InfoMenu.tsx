import { useI18n } from "../../i18n/useI18n";
import CornerPanel from "./CornerPanel";
import MenuItemButton from "./MenuItemButton";
import { InfoIcon, ScrollIcon, DoorIcon } from "./icons";

/**
 * INFO corner panel (bottom-right): project & author information.
 * Contains exactly: about the author, changelog, quit.
 */
export default function InfoMenu({
  onAbout,
  onChangelog,
  onQuit,
}: {
  onAbout: () => void;
  onChangelog: () => void;
  onQuit: () => void;
}) {
  const { t } = useI18n();

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
        hint="v1.1.5"
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
