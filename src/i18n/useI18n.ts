/* =====================================================================
   Lọ Chéo — useI18n hook: re-renders subscribers on language change.
   ===================================================================== */

import { useEffect, useState } from "react";
import {
  getLanguage,
  LANGUAGE_CHANGE_EVENT,
  t,
  LANGUAGES,
  setLanguage,
  type Language,
  type MessageKey,
  type Params,
} from "./i18n";

export function useLanguage(): Language {
  const [lang, setLang] = useState<Language>(() => getLanguage());
  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent<Language>).detail;
      if (next && LANGUAGES.includes(next)) setLang(next);
      else setLang(getLanguage());
    };
    window.addEventListener(LANGUAGE_CHANGE_EVENT, handler);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, handler);
  }, []);
  return lang;
}

export interface I18n {
  lang: Language;
  t: (key: MessageKey, params?: Params) => string;
}

/** Returns the active language + a `t` bound to it (reactive). */
export function useI18n(): I18n {
  const lang = useLanguage();
  return { lang, t: (key, params) => t(key, params, lang) };
}

export { setLanguage, LANGUAGES, t };
export type { MessageKey, Language };
