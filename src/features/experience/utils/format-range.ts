import type { LocaleKey } from '@/i18n/ui';

const DATE_LOCALES: Record<LocaleKey, string> = {
  es: 'es-CO',
  en: 'en-US'
};

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Format ISO date / YYYY-MM for experience timeline labels. */
export function formatExperienceMonth(isoOrYm: string, lang: LocaleKey): string {
  const match = /^(\d{4})-(\d{2})/.exec(isoOrYm);
  if (!match) return isoOrYm;

  const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
  const formatted = new Intl.DateTimeFormat(DATE_LOCALES[lang], {
    month: 'long',
    year: 'numeric'
  }).format(date);

  return capitalize(formatted);
}

export function formatExperienceRange(
  startDate: string,
  endDate: string | undefined,
  lang: LocaleKey,
  presentLabel: string
): string {
  const start = formatExperienceMonth(startDate, lang);
  const end = endDate ? formatExperienceMonth(endDate, lang) : presentLabel;
  return `${start} – ${end}`;
}
