import type { LocaleKey } from "@/i18n/ui";

export const stripLocalePrefix = (path: string, localesKeys: LocaleKey[]): string => {
  const parts = path.split("/").filter(Boolean);
  const [first, ...rest] = parts;
  return "/" + (localesKeys.includes(first as LocaleKey) ? rest : parts).join("/");
};

export const getLocaleHref = (
  localeLang: LocaleKey,
  defaultLang: LocaleKey,
  pathname: string,
  localesKeys: LocaleKey[]
): string => {
  const normalizedPath = stripLocalePrefix(pathname, localesKeys);
  return localeLang === defaultLang ? normalizedPath : `/${localeLang}${normalizedPath}`;
};
