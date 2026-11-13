import { APP_VERSION } from "../../version";
import { useI18n } from "../../i18n/useI18n";
import { Modal, JarLogo } from "../ui";

/** Author & project card: role, craft philosophy, contact, license, thanks. */
export default function AboutModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();

  return (
    <Modal title={t("about.title")} onClose={onClose}>
      <div className="flex items-start gap-4">
        <JarLogo className="anim-bob h-20 w-auto shrink-0 drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]" />
        <div className="min-w-0">
          <p className="font-display text-lg leading-none text-clay-100">
            Lọ <span className="text-tumeric-400">Chéo</span>
            <span className="ml-2 align-middle font-body text-[10px] font-bold tracking-[0.2em] text-jade-500">
              v{APP_VERSION}
            </span>
          </p>
          <p className="mt-1 font-body text-[10px] font-bold tracking-[0.18em] text-brine-300 uppercase">
            {t("about.role")}
          </p>
        </div>
      </div>

      <p className="mt-3 font-body text-[11px] leading-relaxed text-clay-100/80">{t("about.craft")}</p>

      <dl className="mt-3 space-y-1.5 border-t-2 border-dashed border-jade-800 pt-3 font-body text-[10px]">
        {[
          ["about.contact", t("about.contact")],
          ["about.source", t("about.source")],
          ["about.license", t("about.license")],
          ["about.fonts", t("about.fonts")],
        ].map(([key, value]) => (
          <div key={key as string} className="flex items-baseline gap-2">
            <dt className="shrink-0 text-jade-600" aria-hidden="true">▸</dt>
            <dd className="break-all text-clay-100/75">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-3 border-2 border-tumeric-500/40 bg-tumeric-500/10 px-3 py-2 text-center font-body text-[10px] font-bold text-tumeric-400">
        {t("about.thanks")}
      </p>
    </Modal>
  );
}
