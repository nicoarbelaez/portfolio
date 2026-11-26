import { SWC_COPY_EN } from '@/features/projects/clients/swc/constants/copy.en';
import { SWC_COPY_ES } from '@/features/projects/clients/swc/constants/copy.es';
import type { SwcCopy } from '@/features/projects/clients/swc/constants/copy.types';
import type { LocaleKey } from '@/i18n/ui';

const COPY = {
  es: SWC_COPY_ES,
  en: SWC_COPY_EN
} satisfies Record<LocaleKey, SwcCopy>;

/** Copy for the SWC showcase in the given locale. */
export function getSwcCopy(lang: LocaleKey): SwcCopy {
  return COPY[lang];
}
