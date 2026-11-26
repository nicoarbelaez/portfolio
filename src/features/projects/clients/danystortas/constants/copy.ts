import { DANYSTORTAS_COPY_EN } from '@/features/projects/clients/danystortas/constants/copy.en';
import { DANYSTORTAS_COPY_ES } from '@/features/projects/clients/danystortas/constants/copy.es';
import type { DanysTortasCopy } from '@/features/projects/clients/danystortas/constants/copy.types';
import type { LocaleKey } from '@/i18n/ui';

const COPY = {
  es: DANYSTORTAS_COPY_ES,
  en: DANYSTORTAS_COPY_EN
} satisfies Record<LocaleKey, DanysTortasCopy>;

/** Copy for the Danys Tortas showcase in the given locale. */
export function getDanysTortasCopy(lang: LocaleKey): DanysTortasCopy {
  return COPY[lang];
}
