import { APP_VERSION } from "../../version";
import { useI18n } from "../../i18n/useI18n";
import { CHANGELOG_ENTRIES } from "../../game/changelog";
import { Modal } from "../ui";

const KIND_STYLE: Record<string, string> = {
  feature: "border-brine-500/60 text-brine-300",
  fix: "border-chili-500/60 text-chili-300",
  polish: "border-tumeric-500/60 text-tumeric-300",
};

/**
 * In-game changelog — newest first. Vietnamese bullets are the source of
 * truth; English mirrors render for every locale (documented trade-off).
 */
export default function ChangelogModal({ onClose }: { onClose: () => void }) {
  const { t, lang } = useI18n();
  const vi = lang === "vi";

  return (
    <Modal title={t("changelog.title")} onClose={onClose} wide>
      <ol className="flex flex-col">
        {CHANGELOG_ENTRIES.map((entry) => {
          const isCurrent = entry.version === APP_VERSION;
          const summary = vi ? entry.vi : entry.en;
          const items = vi ? entry.itemsVi : entry.itemsEn;
          return (
            <li
              key={entry.version}
              className={`relative border-l-[3px] py-2 pl-4 ${
                isCurrent ? "border-tumeric-500 bg-tumeric-500/5" : "border-jade-800"
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="font-display text-sm text-clay-100">v{entry.version}</span>
                <time className="font-body text-[9px] font-bold tracking-[0.18em] text-jade-500">
                  {entry.date}
                </time>
                <span
                  className={`border px-1.5 py-0.5 font-body text-[8px] font-extrabold tracking-[0.22em] uppercase ${
                    KIND_STYLE[entry.kind] ?? "border-jade-700 text-jade-500"
                  }`}
                >
                  {entry.kind}
                </span>
                {isCurrent && (
                  <span className="font-body text-[8px] font-extrabold tracking-[0.22em] text-tumeric-400 uppercase">
                    ★ {t("changelog.current")}
                  </span>
                )}
              </div>
              <p className="mt-1 font-body text-[10px] leading-snug text-clay-100/80">{summary}</p>
              {items.length > 0 && (
                <ul className="mt-1 list-disc space-y-0.5 pl-4 font-body text-[9px] leading-snug text-clay-100/60">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </Modal>
  );
}
