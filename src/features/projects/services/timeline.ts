import type { ProjectPeriod, ProjectTimeline } from '@/features/projects/schemas/catalog';
import type { LocaleKey } from '@/i18n/ui';

const DATE_LOCALES: Record<LocaleKey, string> = {
  es: 'es-CO',
  en: 'en-US'
};

export type TimelineFormatLabels = {
  present: string;
};

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Format `YYYY` / `YYYY-MM` / `present` for card `<time>` labels. */
export function formatProjectDateToken(
  token: string,
  lang: LocaleKey,
  presentLabel: string
): string {
  if (token === 'present') return presentLabel;

  if (/^\d{4}$/.test(token)) return token;

  const match = /^(\d{4})-(\d{2})$/.exec(token);
  if (!match) return token;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const date = new Date(year, month - 1, 1);
  const formatted = new Intl.DateTimeFormat(DATE_LOCALES[lang], {
    month: 'short',
    year: 'numeric'
  }).format(date);

  return capitalize(formatted.replace(/\./g, ''));
}

function formatPeriod(
  period: ProjectPeriod,
  lang: LocaleKey,
  labels: TimelineFormatLabels
): string {
  const start = formatProjectDateToken(period.start, lang, labels.present);
  const end = formatProjectDateToken(period.end, lang, labels.present);
  return `${start} – ${end}`;
}

/** Join engagement windows under the project title (e.g. two spans with ·). */
export function formatProjectTimeline(
  timeline: ProjectTimeline,
  lang: LocaleKey,
  labels: TimelineFormatLabels
): string {
  return timeline.periods.map((period) => formatPeriod(period, lang, labels)).join(' · ');
}

/** Earliest start for `<time dateTime>` (machine-readable). */
export function projectTimelineDateTime(timeline: ProjectTimeline): string {
  return timeline.periods[0]?.start ?? '';
}
