import { useState } from "react";
import { useI18n } from "../../i18n/useI18n";
import { GameButton } from "../ui";
import SettingsSection from "./SettingsSection";

/**
 * Section DỮ LIỆU — two-step danger zone (wipe everything) +
 * "restore defaults" (keeps the language choice).
 */
export default function DataSection({
  onClearAllData,
  onResetDefaults,
}: {
  onClearAllData: () => void;
  onResetDefaults: () => void;
}) {
  const { t } = useI18n();
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <SettingsSection title={t("settings.section.data")}>
      {/* danger zone — wipe scores/progress/achievements/run */}
      {!confirmClear ? (
        <div className="flex items-center justify-between gap-3 border-2 border-chili-500/40 bg-chili-500/5 px-3 py-2">
          <span className="min-w-0">
            <span className="block font-body text-[10px] font-extrabold tracking-[0.14em] text-chili-400 uppercase">
              {t("settings.clearData")}
            </span>
            <span className="mt-0.5 block font-body text-[9px] leading-snug text-clay-100/55">
              {t("settings.clearDataDesc")}
            </span>
          </span>
          <GameButton size="sm" variant="danger" onClick={() => setConfirmClear(true)}>
            !
          </GameButton>
        </div>
      ) : (
        <div className="border-2 border-chili-500/60 bg-chili-500/10 p-3">
          <p className="font-body text-[10px] leading-snug font-bold text-chili-300">
            {t("settings.clearDataConfirm")}
          </p>
          <div className="mt-2 flex justify-end gap-2">
            <GameButton size="sm" variant="ghost" onClick={() => setConfirmClear(false)}>
              {t("common.cancel")}
            </GameButton>
            <GameButton
              size="sm"
              variant="danger"
              onClick={() => {
                onClearAllData();
                setConfirmClear(false);
              }}
            >
              {t("settings.clearData")}
            </GameButton>
          </div>
        </div>
      )}

      {/* restore defaults — keeps the chosen language */}
      {!confirmReset ? (
        <div className="flex items-center justify-between gap-3 px-1 py-1">
          <span className="min-w-0">
            <span className="block font-body text-[10px] font-extrabold tracking-[0.14em] text-brine-300 uppercase">
              {t("settings.resetDefaults")}
            </span>
            <span className="mt-0.5 block font-body text-[9px] leading-snug text-clay-100/55">
              {t("settings.resetDefaultsDesc")}
            </span>
          </span>
          <GameButton size="sm" variant="ghost" onClick={() => setConfirmReset(true)}>
            ↺
          </GameButton>
        </div>
      ) : (
        <div className="border-2 border-tumeric-500/50 bg-tumeric-500/10 p-3">
          <p className="font-body text-[10px] leading-snug font-bold text-tumeric-400">
            {t("settings.resetDefaultsConfirm")}
          </p>
          <div className="mt-2 flex justify-end gap-2">
            <GameButton size="sm" variant="ghost" onClick={() => setConfirmReset(false)}>
              {t("common.cancel")}
            </GameButton>
            <GameButton
              size="sm"
              variant="primary"
              onClick={() => {
                onResetDefaults();
                setConfirmReset(false);
              }}
            >
              ↺
            </GameButton>
          </div>
        </div>
      )}
    </SettingsSection>
  );
}
