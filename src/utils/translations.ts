type Locale = 'en' | 'es';

interface Translations {
  [key: string]: unknown;
}

let translations: Record<Locale, Translations> = {
  en: {},
  es: {}
};

export function setTranslations(newTranslations: Record<Locale, Translations>) {
  translations = newTranslations;
}

export function getTranslations(locale: Locale) {
  return translations[locale];
}
