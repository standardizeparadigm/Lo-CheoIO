import { useState } from "react";
import { useI18n } from "../../i18n/useI18n";
import { Modal, Switch, GameButton } from "../ui";
import type { GameSettings } from "../../game/settings";

/**
 * In-game settings: SFX / music / screen shake / reduced motion + danger zone
 * (wipe all locally stored data). Changes apply instantly and persist.
 */
export default function SettingsModal({
  settings,
  onPatch,
  onClearAllData,
  onClose,
}: {
  settings: GameSettings;
  onPatch: (patch: Partial<GameSettings>) => void;
  onClearAllData: () => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <Modal title={t("settings.title")} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <Switch
          id="set-sfx"
          checked={settings.sfx}
          onChange={(v) => onPatch({ sfx: v })}
          label={t("settings.sfx")}
          desc={t("settings.sfxDesc")}
        />
        <Switch
          id="set-music"
          checked={settings.music}
          onChange={(v) => onPatch({ music: v })}
          label={t("settings.music")}
          desc={t("settings.musicDesc")}
        />
        <Switch
          id="set-shake"
          checked={settings.shake}
          onChange={(v) => onPatch({ shake: v })}
          label={t("settings.shake")}
          desc={t("settings.shakeDesc")}
        />
        <Switch
          id="set-motion"
          checked={settings.reducedMotion}
          onChange={(v) => onPatch({ reducedMotion: v })}
          label={t("settings.reducedMotion")}
          desc={t("settings.reducedMotionDesc")}
        />
      </div>

      <div className="mt-4 border-t-2 border-dashed border-jade-800 pt-3">
        {!confirmClear ? (
          <div className="flex items-center justify-between gap-3">
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
                ←
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
      </div>
    </Modal>
  );
}
