import { useI18n } from "../../i18n/useI18n";
import type { MessageKey } from "../../i18n/i18n";
import { Keycap, Modal } from "../ui";

const RULE_IDS = ["0", "1", "2", "3", "4", "5"] as const;

/** Keyboard and touch instructions are available regardless of input device. */
export default function HowToPlayModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  return (
    <Modal title={t("menu.howtoOpen")} onClose={onClose} wide>
      <p className="mb-4 font-body text-sm leading-relaxed text-clay-100/80">
        {t("menu.desc1")}<b className="text-brine-300">{t("menu.descStrong")}</b>{t("menu.desc2")}
      </p>
      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-3 font-body text-xs font-bold text-clay-100/80">
        <span className="flex flex-wrap items-center gap-1">{t("keys.move")} <Keycap>W</Keycap><Keycap>A</Keycap><Keycap>S</Keycap><Keycap>D</Keycap> / <Keycap wide>↑ ← ↓ →</Keycap></span>
        <span className="flex items-center gap-1">{t("keys.slam")} <Keycap wide>SPACE</Keycap></span>
        <span className="flex items-center gap-1">{t("keys.pause")} <Keycap>P</Keycap></span>
      </div>
      <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-jade-800 pt-3 font-body text-xs text-brine-300">
        <span>{t("touch.drag")}</span><span>{t("touch.diagonal")}</span><span>{t("touch.slam")}</span>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {RULE_IDS.map((n, i) => (
          <li key={n} className="flex gap-3">
            <span className="font-display text-lg leading-none text-tumeric-500">0{i + 1}</span>
            <span><span className="block font-display text-[11px] tracking-[0.12em] text-brine-300">{t(`rule.${n}.t` as MessageKey)}</span>
              <span className="block font-body text-xs leading-relaxed text-clay-100/70">{t(`rule.${n}.d` as MessageKey)}</span></span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
