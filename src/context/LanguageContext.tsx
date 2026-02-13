import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Locale = 'en' | 'es';

interface Translations {
  [key: string]: unknown;
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

let translations: Record<Locale, Translations> = {
  en: {},
  es: {}
};

export function setTranslations(newTranslations: Record<Locale, Translations>) {
  translations = newTranslations;
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  
  const stored = localStorage.getItem('locale') as Locale | null;
  if (stored && (stored === 'en' || stored === 'es')) {
    return stored;
  }
  
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[locale];
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value) && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else if (Array.isArray(value)) {
        const index = parseInt(k, 10);
        if (!isNaN(index) && index < value.length) {
          value = value[index];
        } else {
          return key;
        }
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
