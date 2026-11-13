import { useI18n } from "../../i18n/useI18n";
import { LANGUAGES } from "../../i18n/useI18n";
import SettingsSection from "./SettingsSection";
import type { SettingLanguage } from "../../game/settings";

const FLAG: Record<SettingLanguage, string> = {
  vi: "🇻🇳",
  en: "🇬🇧",
  zh: "🇨🇳",
  ja: "🇯🇵",
  ko: "🇰🇷",
  es: "🇪🇸",
  fr: "🇫🇷",
};
const NATIVE: Record<SettingLanguage, string> = {
  vi: "Tiếng Việt",
  en: "English",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
};

/** Section NGÔN NGỮ — the language switcher lives here since v1.1.6. */
export default function LanguageSection({
  value,
  onChange,
}: {
  value: SettingLanguage;
  onChange: (lang: SettingLanguage) => void;
}) {
  const { t } = useI18n();
  return (
    <SettingsSection title={t("settings.section.language")}>
      <div className="grid grid-cols-2 gap-1.5" role="group" aria-label={t("settings.section.language")}>
        {LANGUAGES.map((code) => {
          const active = code === value;
          return (
            <button
              key={code}
              type="button"
              onClick={() => onChange(code as SettingLanguage)}
              aria-pressed={active}
              className={`press flex items-center gap-2 border-2 px-2.5 py-1.5 text-left transition-colors ${
                active
                  ? "border-tumeric-500 bg-tumeric-500/15"
                  : "border-jade-800 bg-jade-900/50 hover:border-jade-600"
              }`}
            >
              <span aria-hidden="true" className="text-base leading-none">{FLAG[code as SettingLanguage]}</span>
              <span className="min-w-0">
                <span className="block font-body text-[10px] font-extrabold tracking-wide text-clay-100">{NATIVE[code as SettingLanguage]}</span>
                <span className="block font-body text-[8px] font-bold tracking-[0.22em] text-jade-500 uppercase">{code}</span>
              </span>
              {active && (
                <svg viewBox="0 0 24 24" className="ml-auto h-4 w-4 shrink-0 text-tumeric-400" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </SettingsSection>
  );
}
