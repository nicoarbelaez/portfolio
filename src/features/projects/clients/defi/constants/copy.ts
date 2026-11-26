import { DEFI_COPY_EN } from '@/features/projects/clients/defi/constants/copy.en';
import { DEFI_COPY_ES } from '@/features/projects/clients/defi/constants/copy.es';
import type { DefiCopy } from '@/features/projects/clients/defi/constants/copy.types';
import type { LocaleKey } from '@/i18n/ui';

const COPY = {
  es: DEFI_COPY_ES,
  en: DEFI_COPY_EN
} satisfies Record<LocaleKey, DefiCopy>;

/** Copy for the DeFi showcase in the given locale. */
export function getDefiCopy(lang: LocaleKey): DefiCopy {
  return COPY[lang];
}
