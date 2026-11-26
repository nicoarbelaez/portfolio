import { Dumbbell, Scissors, Shield, Sparkles, Trophy } from 'lucide-react';
import danystortasMark from '@/assets/brands/danystortas.svg';
import mecateoMark from '@/assets/brands/mecateo.webp';
import readiaMark from '@/assets/brands/readia.webp';
import swcMark from '@/assets/brands/swc.svg';
import type { ProjectMarkDefinition } from '@/features/projects/types/project-mark';

/**
 * One identity mark per project slug.
 *
 * Sources (all owned by the author, no third-party client branding):
 * - danystortas: `apps/landing/public/images/logo.svg` of the danystortas repo.
 * - mecateo: current brand favicon of the mecateo landing (`apps/landing/public/favicon.svg`).
 * - swc: product icon of Smart Work Core (`public/icon.svg`), fixed to the light-mode stroke.
 * - readia: brain mark cropped from the repo `public/favicon.svg` (wordmark removed).
 * - defi, appsalon, living-sports, claude-identity, invictus: Lucide icons (ISC license) because
 *   the repos only ship framework defaults (Laravel / Expo) or no logo.
 */
export const PROJECT_MARKS: Record<string, ProjectMarkDefinition> = {
  mecateo: { kind: 'image', image: mecateoMark, plate: 'bleed' },
  danystortas: { kind: 'image', image: danystortasMark, plate: 'white' },
  swc: { kind: 'image', image: swcMark, plate: 'white' },
  readia: { kind: 'image', image: readiaMark, plate: 'white' },
  defi: { kind: 'icon', icon: Dumbbell },
  appsalon: { kind: 'icon', icon: Scissors },
  'living-sports': { kind: 'icon', icon: Trophy },
  'claude-identity': { kind: 'icon', icon: Sparkles },
  invictus: { kind: 'icon', icon: Shield }
};

/** Fallback for slugs without a registered mark. */
export const DEFAULT_PROJECT_MARK: ProjectMarkDefinition = { kind: 'icon', icon: Sparkles };

/** Rendered size (px box) per mark size token; also drives the icon glyph size. */
export const PROJECT_MARK_SIZES = {
  sm: { box: 'size-8 rounded-md', glyph: 'size-4', px: 32 },
  md: { box: 'size-10 rounded-lg', glyph: 'size-5', px: 40 },
  lg: { box: 'size-14 rounded-xl', glyph: 'size-7', px: 56 }
} as const;

export type ProjectMarkSize = keyof typeof PROJECT_MARK_SIZES;
