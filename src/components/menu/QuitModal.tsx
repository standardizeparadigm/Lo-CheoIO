import { useEffect, useState } from "react";
import { APP_VERSION } from "../../version";
import { useI18n } from "../../i18n/useI18n";
import { Modal, GameButton, JarLogo } from "../ui";

/**
 * Quit flow. Browsers block window.close() for tabs they didn't open, so the
 * modal always shows the keyboard fallback hint (Ctrl+W / Cmd+W).
 */
export default function QuitModal({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    // Best effort — will silently no-op on most tabs; the hint covers us.
    window.close();
    setAttempted(true);
  }, []);

  return (
    <Modal title={t("quit.title")} onClose={onBack}>
      <div className="flex flex-col items-center py-2 text-center">
        <JarLogo mood="happy" className="anim-bob h-20 w-auto drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]" />
        <p className="mt-3 font-body text-xs text-clay-100/85">{t("quit.thanks")}</p>
        <p className="mt-1 font-display text-[10px] tracking-[0.3em] text-jade-600 uppercase">
          v{APP_VERSION} · AGPL-3.0
        </p>
        <p className="mt-3 max-w-xs font-body text-[9px] leading-relaxed text-clay-100/55">
          {t("quit.hint")}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <GameButton variant="brine" onClick={onBack}>
            {t("quit.back")}
          </GameButton>
          <GameButton variant="danger" onClick={() => window.close()}>
            {t("quit.close")}
          </GameButton>
        </div>
        {attempted && (
          <span className="sr-only" role="status">
            window.close attempted
          </span>
        )}
      </div>
    </Modal>
  );
}
