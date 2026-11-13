import { useI18n } from "../../i18n/useI18n";
import { Switch } from "../ui";
import SettingsSection from "./SettingsSection";
import VolumeStepper from "./VolumeStepper";
import type { GameSettings } from "../../game/settings";

/** Section ÂM THANH — SFX/music gates + loudness levels. */
export default function AudioSection({
  settings,
  onPatch,
}: {
  settings: GameSettings;
  onPatch: (patch: Partial<GameSettings>) => void;
}) {
  const { t } = useI18n();
  return (
    <SettingsSection title={t("settings.section.audio")}>
      <Switch
        id="set-sfx"
        checked={settings.sfx}
        onChange={(v) => onPatch({ sfx: v })}
        label={t("settings.sfx")}
        desc={t("settings.sfxDesc")}
      />
      <VolumeStepper
        id="set-sfxvol"
        label={t("settings.sfxVolume")}
        desc={t("settings.sfxVolumeDesc")}
        value={settings.sfxVolume}
        onChange={(v) => onPatch({ sfxVolume: v })}
      />
      <Switch
        id="set-music"
        checked={settings.music}
        onChange={(v) => onPatch({ music: v })}
        label={t("settings.music")}
        desc={t("settings.musicDesc")}
      />
      <VolumeStepper
        id="set-musicvol"
        label={t("settings.musicVolume")}
        desc={t("settings.musicVolumeDesc")}
        value={settings.musicVolume}
        onChange={(v) => onPatch({ musicVolume: v })}
      />
    </SettingsSection>
  );
}
