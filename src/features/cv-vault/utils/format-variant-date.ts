import { CV_VAULT_DATE_LOCALE } from '../constants/cv-vault';

const formatter = new Intl.DateTimeFormat(CV_VAULT_DATE_LOCALE, {
  dateStyle: 'long',
  timeZone: 'UTC'
});

/** `2026-11-14` → "14 de noviembre de 2026" (date-only, so it must not shift with the timezone). */
export function formatVariantDate(isoDate: string): string {
  return formatter.format(new Date(`${isoDate}T00:00:00Z`));
}
