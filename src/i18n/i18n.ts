/* =====================================================================
   Lọ Chéo — i18n runtime.
   - Languages: vi (default), en, zh, ja, ko, es, fr
   - Persisted under storage key `locheo.lang.v1`
   - `t()` reads the module-level active language; call sites can pass
     their own snapshot via `t(key, params, lang)`.
   - React components should subscribe with `useMessages()` (see below)
     so switching language re-renders the tree.
   ===================================================================== */

import vi, { type MessageKey } from "./locales/vi";
import en from "./locales/en";
import zh from "./locales/zh";
import ja from "./locales/ja";
import ko from "./locales/ko";
import es from "./locales/es";
import fr from "./locales/fr";

export type Language = "vi" | "en" | "zh" | "ja" | "ko" | "es" | "fr";
export const LANGUAGES: Language[] = ["vi", "en", "zh", "ja", "ko", "es", "fr"];

export const LANG_STORAGE_KEY = "locheo.lang.v1";

const messages: Record<Language, Record<MessageKey, string>> = { vi, en, zh, ja, ko, es, fr };

/** Detect the best initial language: stored preference → browser → vi. */
export function detectInitialLanguage(): Language {
  try {
    const raw = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (LANGUAGES.includes(raw as Language)) return raw as Language;
  } catch {
    /* storage unavailable */
  }
  try {
    const nav = (window.navigator?.language || "").toLowerCase();
    if (nav.startsWith("zh")) return "zh";
    if (nav.startsWith("ja")) return "ja";
    if (nav.startsWith("ko")) return "ko";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("vi")) return "vi";
    if (nav) return "en"; // any other locale → English
  } catch {
    /* navigator unavailable */
  }
  return "vi";
}

/** Module-level active language — kept in sync by setLanguage(). */
let activeLanguage: Language =
  typeof window !== "undefined" ? detectInitialLanguage() : "vi";

export function getLanguage(): Language {
  return activeLanguage;
}

export const LANGUAGE_CHANGE_EVENT = "locheo:languagechange";

export function setLanguage(lang: Language): void {
  activeLanguage = lang;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage unavailable — keep in-memory only */
  }
  try {
    window.dispatchEvent(
      new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: lang }),
    );
  } catch {
    /* non-DOM environment */
  }
}

/** Param values may be string/number; everything is stringified. */
export type Params = Record<string, string | number>;

function interpolate(template: string, params?: Params): string {
  if (!params) return template;
  let out = template;
  for (const key of Object.keys(params)) {
    out = out.split(`{${key}}`).join(String(params[key]));
  }
  return out;
}

/**
 * Translate a key. Falls back to the vi message when missing (should never
 * happen — key sets are enforced by tests), then to the raw key.
 */
export function t(
  key: MessageKey,
  params?: Params,
  lang: Language = activeLanguage,
): string {
  const table = messages[lang] ?? messages.vi;
  const template = table[key] ?? messages.vi[key] ?? String(key);
  return interpolate(template, params);
}

export function hasKey(key: string): key is MessageKey {
  return key in messages.vi;
}

/** Helper to read an entire locale table (used by tests). */
export function localeTable(lang: Language): Record<MessageKey, string> {
  return messages[lang];
}

export type { MessageKey };

/** BCP-47-ish locale used for number grouping per language. */
export function numberLocale(lang: Language = activeLanguage): string {
  switch (lang) {
    case "en":
      return "en-US";
    case "zh":
      return "zh-CN";
    case "ja":
      return "ja-JP";
    case "ko":
      return "ko-KR";
    case "es":
      return "es-ES";
    case "fr":
      return "fr-FR";
    case "vi":
    default:
      return "vi-VN";
  }
}

/** Group a number for the active language (used for score readouts). */
export function fmtNum(n: number, lang: Language = activeLanguage): string {
  return Math.round(n).toLocaleString(numberLocale(lang));
}
