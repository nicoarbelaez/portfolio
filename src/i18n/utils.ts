import { labels, defaultLang, locales, type LocaleKey, type LabelKey } from '@/i18n/ui';
import { replacePlaceholders } from '@/utils/placeholders';

export type Transitions = ReturnType<typeof useTranslations>;

const LOCALE_PREFIXES = new Set<string>(Object.keys(locales));

export function getLangFromUrl(url: URL): LocaleKey {
  const [, lang] = url.pathname.split('/');
  if (lang in labels) return lang as LocaleKey;
  return defaultLang;
}

export function getCurrentLang(currentLocale: string | undefined): LocaleKey {
  return (currentLocale as LocaleKey | undefined) || defaultLang;
}

/** Strip leading `/en` or `/es` so locale can be swapped cleanly. */
export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && LOCALE_PREFIXES.has(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest.length > 0 ? `/${rest}` : '/';
  }
  return pathname || '/';
}

/** Build locale-aware href; default locale (`en`) has no prefix. */
export function getLocalizedPath(pathname: string, targetLang: LocaleKey): string {
  const path = getPathWithoutLocale(pathname);
  if (targetLang === defaultLang) return path;
  return path === '/' ? `/${targetLang}` : `/${targetLang}${path}`;
}

export function useTranslations(lang: LocaleKey) {
  return (key: LabelKey): string => {
    const value = labels[lang][key] as string;

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    if (!value) return key;

    return replacePlaceholders(value);
  };
}
