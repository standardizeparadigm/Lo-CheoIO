import { useI18n } from "../../i18n/useI18n";
import { Modal } from "../ui";
import AudioSection from "./AudioSection";
import DisplaySection from "./DisplaySection";
import LanguageSection from "./LanguageSection";
import DataSection from "./DataSection";
import PresetsSection from "./PresetsSection";
import BackupSection from "./BackupSection";
import { applyPreset, type PresetId } from "../../game/settingsPresets";
import type { GameSettings, SettingLanguage } from "../../game/settings";

/**
 * Settings v1.1.6 — six sections, ordered from "quick wins" to "danger zone":
 *   Cấu hình nhanh (presets) · Âm thanh (audio) · Giao diện & chuyển động
 *   (display) · Ngôn ngữ (language) · Sao lưu (backup) · Dữ liệu (data)
 * Replaces the flat 4-switch panel from v1.1.5; the language switcher moved
 * in from the old top-right floating widget. Everything applies instantly.
 */
export default function SettingsModal({
  settings,
  onPatch,
  onChangeLanguage,
  onQuickSettings,
  onClearAllData,
  onResetDefaults,
  onClose,
}: {
  settings: GameSettings;
  onPatch: (patch: Partial<GameSettings>) => void;
  onChangeLanguage: (lang: SettingLanguage) => void;
  /** bulk patch, used by presets and settings import */
  onQuickSettings: (patch: Partial<GameSettings>) => void;
  onClearAllData: () => void;
  onResetDefaults: () => void;
  onClose: () => void;
}) {
  const { t } = useI18n();

  return (
    <Modal title={t("settings.title")} onClose={onClose} wide>
      <div className="flex flex-col gap-3">
        <PresetsSection settings={settings} onApply={(id: PresetId) => onQuickSettings(applyPreset(settings, id))} />
        <AudioSection settings={settings} onPatch={onPatch} />
        <DisplaySection settings={settings} onPatch={onPatch} />
        <LanguageSection value={settings.language} onChange={onChangeLanguage} />
        <BackupSection settings={settings} onImport={onQuickSettings} />
        <DataSection onClearAllData={onClearAllData} onResetDefaults={onResetDefaults} />
      </div>
    </Modal>
  );
}
