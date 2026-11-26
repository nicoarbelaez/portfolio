import { NUMBER_LOCALE } from '@/features/projects/clients/shared/constants/client-config';
import type { LocaleKey } from '@/i18n/ui';

/** Currency symbol prefixed to monetary figures (amounts are COP). */
const CURRENCY_SYMBOL = '$';

/** Formatter for whole numbers with locale thousands separators (`29.974.400` / `29,974,400`). */
export function createIntegerFormatter(lang: LocaleKey): (value: number) => string {
  const formatter = new Intl.NumberFormat(NUMBER_LOCALE[lang], { maximumFractionDigits: 0 });
  return (value) => formatter.format(Math.round(value));
}

/** Same as `createIntegerFormatter` with a leading currency symbol. */
export function createCurrencyFormatter(lang: LocaleKey): (value: number) => string {
  const format = createIntegerFormatter(lang);
  return (value) => `${CURRENCY_SYMBOL}${format(value)}`;
}
