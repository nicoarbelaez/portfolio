import { labels, defaultLang, type LocaleKey } from '@/i18n/ui';

export type Transitions = ReturnType<typeof useTranslations>;

export function getLangFromUrl(url: URL): LocaleKey {
  const [, lang] = url.pathname.split('/');
  if (lang in labels) return lang as LocaleKey;
  return defaultLang;
}

export function getCurrentLang(currentLocale: string | undefined): LocaleKey {
  return (currentLocale as LocaleKey | undefined) || defaultLang;
}

export function useTranslations(lang: LocaleKey) {
  return (key: string): string => {
    const value = labels[lang][key];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value || key;
  };
}
