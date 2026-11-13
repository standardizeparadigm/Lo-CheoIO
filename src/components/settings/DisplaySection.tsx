import { useI18n } from "../../i18n/useI18n";
import { Switch } from "../ui";
import SettingsSection from "./SettingsSection";
import SegmentedControl from "./SegmentedControl";
import type { GameSettings } from "../../game/settings";

/** Section GIAO DIỆN & CHUYỂN ĐỘNG — shake, motion, quality, focus behaviour. */
export default function DisplaySection({
  settings,
  onPatch,
}: {
  settings: GameSettings;
  onPatch: (patch: Partial<GameSettings>) => void;
}) {
  const { t } = useI18n();
  return (
    <SettingsSection title={t("settings.section.display")}>
      <Switch
        id="set-shake"
        checked={settings.shake}
        onChange={(v) => onPatch({ shake: v })}
        label={t("settings.shake")}
        desc={t("settings.shakeDesc")}
      />
      <SegmentedControl
        id="set-shakelevel"
        label={t("settings.shakeLevel")}
        desc={t("settings.shakeLevelDesc")}
        value={settings.shakeLevel}
        options={[
          { value: "low", label: t("settings.shakeLevel.low") },
          { value: "high", label: t("settings.shakeLevel.high") },
        ]}
        onChange={(v) => onPatch({ shakeLevel: v })}
      />
      <Switch
        id="set-motion"
        checked={settings.reducedMotion}
        onChange={(v) => onPatch({ reducedMotion: v })}
        label={t("settings.reducedMotion")}
        desc={t("settings.reducedMotionDesc")}
      />
      <SegmentedControl
        id="set-quality"
        label={t("settings.visualQuality")}
        desc={t("settings.visualQualityDesc")}
        value={settings.visualQuality}
        options={[
          { value: "low", label: t("settings.visualQuality.low") },
          { value: "high", label: t("settings.visualQuality.high") },
        ]}
        onChange={(v) => onPatch({ visualQuality: v })}
      />
      <Switch
        id="set-autopause"
        checked={settings.autoPauseOnBlur}
        onChange={(v) => onPatch({ autoPauseOnBlur: v })}
        label={t("settings.autoPauseOnBlur")}
        desc={t("settings.autoPauseOnBlurDesc")}
      />
    </SettingsSection>
  );
}
