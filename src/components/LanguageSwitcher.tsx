import { LANGUAGES, setLanguage, useI18n, type Language } from "../i18n/useI18n";

const SHORT: Record<Language, string> = { vi: "VI", en: "EN", zh: "中" };

/**
 * Segmented language switcher — switches instantly and persists the choice
 * under `locheo.lang.v1`. Reused on the menu (large) and pause screen (compact).
 */
export default function LanguageSwitcher({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const { lang, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={`inline-flex items-center border-[3px] border-jade-700 bg-jade-950/85 hard-shadow-sm ${className}`}
    >
      <span
        className={`items-center gap-1.5 border-r-[3px] border-jade-800 text-jade-500 ${
          compact ? "hidden sm:flex" : "flex"
        } ${compact ? "h-8 px-2" : "h-9 px-2.5"}`}
      >
        <svg viewBox="0 0 24 24" className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
        </svg>
        {!compact && (
          <span className="font-body text-[9px] font-extrabold tracking-[0.28em] uppercase">
            {t("lang.label")}
          </span>
        )}
      </span>
      {LANGUAGES.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={active}
            title={t(`lang.${code}`)}
            aria-label={t(`lang.${code}`)}
            className={`press font-display uppercase transition-colors ${
              compact ? "h-8 min-w-9 px-2 text-[10px]" : "h-9 min-w-11 px-3 text-[11px]"
            } ${
              active
                ? "bg-tumeric-500 text-jade-950"
                : "text-clay-100/75 hover:bg-jade-900 hover:text-clay-100"
            }`}
          >
            {SHORT[code]}
          </button>
        );
      })}
    </div>
  );
}
