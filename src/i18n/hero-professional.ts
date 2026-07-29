import type { AnnotationAction } from '@/components/ui/highlighter';
import type { LocaleKey } from '@/i18n/ui';

export type ProfessionalMark = AnnotationAction;

export type ProfessionalSegment = {
  text: string;
  mark?: ProfessionalMark;
};

type ProfessionalPart = 'role' | 'ai' | 'automation' | 'enterprise';

type ProfessionalCopy = Record<ProfessionalPart, string>;

type ProfessionalMarks = Partial<Record<ProfessionalPart, ProfessionalMark>>;

type ProfessionalByViewport = {
  desktop: readonly ProfessionalSegment[];
  mobile: readonly ProfessionalSegment[];
};

const SEPARATOR = '  ·  ';

/** Shared copy per locale — marks are applied per viewport, not duplicated. */
const PROFESSIONAL_COPY = {
  es: {
    role: 'Ingeniero de Sistemas • ',
    ai: 'Soluciones IA',
    automation: 'Automatización',
    enterprise: 'Software Empresarial'
  },
  en: {
    role: 'Systems Engineer • ',
    ai: 'AI Solutions',
    automation: 'Automation',
    enterprise: 'Enterprise Software'
  }
} as const satisfies Record<LocaleKey, ProfessionalCopy>;

/**
 * Desktop: underline AI specialty, highlight enterprise.
 * Mobile: underline role + enterprise, highlight automation (less cramped beside avatar).
 */
const PROFESSIONAL_MARKS = {
  es: {
    desktop: { ai: 'underline', enterprise: 'highlight' },
    mobile: { role: 'underline', automation: 'highlight', enterprise: 'underline' }
  },
  en: {
    desktop: { ai: 'underline', enterprise: 'highlight' },
    mobile: { role: 'underline', automation: 'highlight', enterprise: 'underline' }
  }
} as const satisfies Record<LocaleKey, { desktop: ProfessionalMarks; mobile: ProfessionalMarks }>;

function buildProfessionalSegments(
  copy: ProfessionalCopy,
  marks: ProfessionalMarks
): ProfessionalSegment[] {
  const part = (key: ProfessionalPart): ProfessionalSegment => {
    const mark = marks[key];
    return mark ? { text: copy[key], mark } : { text: copy[key] };
  };

  return [
    part('role'),
    part('ai'),
    { text: SEPARATOR },
    part('automation'),
    { text: SEPARATOR },
    part('enterprise')
  ];
}

/**
 * Viewport choice is CSS (`md:`), not JS, to avoid hydration flash.
 */
export const heroProfessionalSegments = {
  es: {
    desktop: buildProfessionalSegments(PROFESSIONAL_COPY.es, PROFESSIONAL_MARKS.es.desktop),
    mobile: buildProfessionalSegments(PROFESSIONAL_COPY.es, PROFESSIONAL_MARKS.es.mobile)
  },
  en: {
    desktop: buildProfessionalSegments(PROFESSIONAL_COPY.en, PROFESSIONAL_MARKS.en.desktop),
    mobile: buildProfessionalSegments(PROFESSIONAL_COPY.en, PROFESSIONAL_MARKS.en.mobile)
  }
} as const satisfies Record<LocaleKey, ProfessionalByViewport>;

/** Plain string for SEO/title — desktop copy is canonical. */
export function getHeroProfessionalPlain(lang: LocaleKey): string {
  return heroProfessionalSegments[lang].desktop.map((segment) => segment.text).join('');
}
