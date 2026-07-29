import type { LocaleKey } from '@/i18n/ui';

/** Display order in the language switcher UI. */
export const LOCALE_ORDER: readonly LocaleKey[] = ['es', 'en'] as const;

/** Compact locale codes shown in the select trigger/items. */
export const LOCALE_SHORT: Record<LocaleKey, string> = {
  es: 'ES',
  en: 'EN'
};
