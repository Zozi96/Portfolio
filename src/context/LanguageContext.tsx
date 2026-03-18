import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getTranslations } from '../utils/translations';

type Locale = 'en' | 'es';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  
  const stored = localStorage.getItem('locale') as Locale | null;
  if (stored && (stored === 'en' || stored === 'es')) {
    return stored;
  }
  
  return 'en';
}

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce((acc: Record<string, string>, k: string) => {
    const pre = prefix.length ? prefix + '.' : '';
    const value = obj[k];
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value as Record<string, unknown>, pre + k));
    } else if (Array.isArray(value)) {
      value.forEach((item: unknown, index: number) => {
        if (typeof item === 'object' && item !== null) {
          Object.assign(acc, flattenObject(item as Record<string, unknown>, `${pre}${k}.${index}`));
        } else {
          acc[`${pre}${k}.${index}`] = String(item);
        }
      });
    } else {
      acc[pre + k] = String(value);
    }
    return acc;
  }, {});
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const rawTranslations = getTranslations(locale);
  
  const flattenedTranslations = useMemo(() => {
    return rawTranslations ? flattenObject(rawTranslations) : {};
  }, [rawTranslations]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t = useCallback((key: string): string => {
    return flattenedTranslations[key] || key;
  }, [flattenedTranslations]);

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
