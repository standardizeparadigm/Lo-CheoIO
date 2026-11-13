/* =====================================================================
   Lọ Chéo — language display metadata (v1.1.6)

   Flags and native names used by the settings language grid. Kept as pure
   data (no JSX) so the catalogue is unit-testable and can never drift from
   `LANGUAGES` — the test enforces 1:1 coverage.
   ===================================================================== */

import type { Language } from "./i18n";

export interface LanguageMeta {
  /** ISO code, matches `LANGUAGES` */
  code: Language;
  /** Flag emoji (may render as letters on Windows) */
  flag: string;
  /** Name in the language itself — never translated */
  native: string;
  /** Two-letter label used in compact contexts */
  short: string;
}

export const LANGUAGE_META: readonly LanguageMeta[] = [
  { code: "vi", flag: "🇻🇳", native: "Tiếng Việt", short: "VI" },
  { code: "en", flag: "🇬🇧", native: "English", short: "EN" },
  { code: "zh", flag: "🇨🇳", native: "中文", short: "ZH" },
  { code: "ja", flag: "🇯🇵", native: "日本語", short: "JA" },
  { code: "ko", flag: "🇰🇷", native: "한국어", short: "KO" },
  { code: "es", flag: "🇪🇸", native: "Español", short: "ES" },
  { code: "fr", flag: "🇫🇷", native: "Français", short: "FR" },
];

export const LANGUAGE_META_MAP: Record<Language, LanguageMeta> = Object.fromEntries(
  LANGUAGE_META.map((m) => [m.code, m]),
) as Record<Language, LanguageMeta>;

/** Look up display metadata for a language code (never throws). */
export function metaFor(code: Language): LanguageMeta {
  return LANGUAGE_META_MAP[code] ?? LANGUAGE_META[0];
}
