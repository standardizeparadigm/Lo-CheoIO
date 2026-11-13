import { useI18n } from "../../i18n/useI18n";
import { Modal } from "../ui";
import AudioSection from "./AudioSection";
import DisplaySection from "./DisplaySection";
import LanguageSection from "./LanguageSection";
import DataSection from "./DataSection";
import type { GameSettings, SettingLanguage } from "../../game/settings";

/**
 * Settings v1.1.6 — four sections:
 *   Âm thanh (audio) · Giao diện & chuyển động (display) · Ngôn ngữ (language) · Dữ liệu (data)
 * Replaces the flat 4-switch panel from v1.1.5. Language moved in from the
 * old top-right switcher. Changes apply instantly and persist.
 */
export default function SettingsModal({
  settings,
  onPatch,
  onChangeLanguage,
  onClearAllData,
  onResetDefaults,
  onClose,
}: {
  settings: GameSettings;
  onPatch: (patch: Partial<GameSettings>) => void;
  onChangeLanguage: (lang: SettingLanguage) => void;
  onClearAllData: () => void;
  onResetDefaults: () => void;
  onClose: () => void;
}) {
  const { t } = useI18n();

  return (
    <Modal title={t("settings.title")} onClose={onClose} wide>
      <div className="flex flex-col gap-3">
        <AudioSection settings={settings} onPatch={onPatch} />
        <DisplaySection settings={settings} onPatch={onPatch} />
        <LanguageSection value={settings.language} onChange={onChangeLanguage} />
        <DataSection onClearAllData={onClearAllData} onResetDefaults={onResetDefaults} />
      </div>
    </Modal>
  );
}
