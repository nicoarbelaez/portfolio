import { labels, defaultLang, type LocaleKey } from "@/i18n/ui";

export type Transitions = ReturnType<typeof useTranslations>;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in labels) return lang as LocaleKey;
  return defaultLang;
}

export function getCurrentLang(currentLocale: string | undefined): LocaleKey {
  return (currentLocale as LocaleKey | undefined) || defaultLang;
}

export function useTranslations(lang: LocaleKey) {
  return function t(key: keyof (typeof labels)[typeof defaultLang]) {
    return labels[lang][key] || labels[defaultLang][key];
  };
}
