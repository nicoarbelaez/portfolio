import type { LocaleKey } from '@/i18n/ui';

/** Curvature (px) applied to beams that must bend around a neighbor. */
export const BEAM_CURVATURE = 36;
/** Delay between consecutive beams so they do not pulse in unison (seconds). */
export const BEAM_STAGGER_S = 0.4;
/** Beam travel time (seconds). */
export const BEAM_DURATION_S = 4;

/** Intl locale per UI language, used by every numeric formatter in client showcases. */
export const NUMBER_LOCALE: Readonly<Record<LocaleKey, string>> = {
  es: 'es-CO',
  en: 'en-US'
};

/** Localized label of the "illustrative data" badge shown inside UI replicas. */
export const SAMPLE_BADGE_LABEL: Readonly<Record<LocaleKey, string>> = {
  es: 'Datos de ejemplo',
  en: 'Sample data'
};

/** Localized label above the credited collaborators in the meta tile. */
export const TEAM_LABEL: Readonly<Record<LocaleKey, string>> = {
  es: 'Con',
  en: 'With'
};
