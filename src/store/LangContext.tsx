import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { en, type TranslationKey } from '../locales/en';
import { ar } from '../locales/ar';
import { he } from '../locales/he';

export type Lang = 'en' | 'ar' | 'he';

const LANG_KEY = 'recursiquest:language';

const translations: Record<Lang, Record<TranslationKey, string>> = { en, ar, he };

const RTL_LANGS: Set<Lang> = new Set(['ar', 'he']);

function loadLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored && stored in translations) return stored;
  } catch { /* ignore */ }
  return 'en';
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, vars?: Record<string, unknown>) => string;
  isRTL: boolean;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(loadLang);

  const isRTL = RTL_LANGS.has(lang);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }, [lang, isRTL]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try { localStorage.setItem(LANG_KEY, next); } catch { /* ignore */ }
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, unknown>): string => {
      const str = translations[lang][key] ?? en[key];
      if (!vars) return str;
      return Object.entries(vars).reduce<string>(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        str,
      );
    },
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
