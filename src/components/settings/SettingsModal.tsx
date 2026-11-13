import { useEffect, useRef, useState } from "react";
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

  // "Settings saved" confirmation. Every control applies instantly, but the
  // dialog used to give no feedback that the change had been persisted —
  // players would toggle something twice to be sure. The badge appears on a
  // real change (skipping the initial mount) and fades after a moment.
  const [savedPulse, setSavedPulse] = useState(0);
  const signature = JSON.stringify(settings);
  const lastSignature = useRef(signature);
  useEffect(() => {
    if (lastSignature.current === signature) return;
    lastSignature.current = signature;
    setSavedPulse((n) => n + 1);
  }, [signature]);
  useEffect(() => {
    if (savedPulse === 0) return;
    const id = window.setTimeout(() => setSavedPulse(0), 1600);
    return () => window.clearTimeout(id);
  }, [savedPulse]);

  return (
    <Modal title={t("settings.title")} onClose={onClose} wide>
      <div className="flex flex-col gap-3">
        <PresetsSection settings={settings} onApply={(id: PresetId) => onQuickSettings(applyPreset(settings, id))} />
        <AudioSection settings={settings} onPatch={onPatch} />
        <DisplaySection settings={settings} onPatch={onPatch} />
        <LanguageSection value={settings.language} onChange={onChangeLanguage} />
        <BackupSection settings={settings} onImport={onQuickSettings} />
        <DataSection onClearAllData={onClearAllData} onResetDefaults={onResetDefaults} />

        {/* live region: announced by screen readers, visible as a small tick */}
        <div className="flex h-4 items-center justify-end" aria-live="polite">
          {savedPulse > 0 && (
            <span className="anim-pop flex items-center gap-1 font-body text-[9px] font-bold tracking-[0.18em] text-brine-300 uppercase">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {t("settings.saved")}
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
}
