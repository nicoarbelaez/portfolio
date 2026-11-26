import { MECATEO_COPY_EN } from '@/features/projects/apps/mecateo/constants/copy.en';
import { MECATEO_COPY_ES } from '@/features/projects/apps/mecateo/constants/copy.es';
import type { MecateoCopy } from '@/features/projects/apps/mecateo/constants/copy.types';
import type { LocaleKey } from '@/i18n/ui';

const MECATEO_COPY: Readonly<Record<LocaleKey, MecateoCopy>> = {
  es: MECATEO_COPY_ES,
  en: MECATEO_COPY_EN
};

/** Copy for the Mecateo showcase in the given locale. */
export function getMecateoCopy(lang: LocaleKey): MecateoCopy {
  return MECATEO_COPY[lang];
}
