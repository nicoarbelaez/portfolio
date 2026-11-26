import type { ShowcaseAccent } from '@/features/projects/showcase-kit/types/showcase-kit';

/** Accent used when a showcase does not pick one: the portfolio primary token. */
export const DEFAULT_SHOWCASE_ACCENT: ShowcaseAccent = 'primary';

/** Percentage of the accent mixed into the spotlight glow. */
export const ACCENT_GLOW_PERCENT = 28;
/** Percentage of the accent kept when deriving the deeper gradient tone. */
export const ACCENT_DEEP_PERCENT = 78;

/**
 * Concrete oklch values mirroring `src/styles/global.css` tokens. Only used for SVG beam
 * gradients; everything else references the CSS variables directly.
 */
export const ACCENT_BEAM_COLORS: Readonly<Record<ShowcaseAccent, readonly [string, string]>> = {
  primary: ['oklch(0.8426 0.2256 129.6486)', 'oklch(0.7709 0.2156 132.4509)'],
  'chart-1': ['oklch(0.8441 0.1425 165.2301)', 'oklch(0.7019 0.1577 160.4375)'],
  'chart-2': ['oklch(0.7019 0.1577 160.4375)', 'oklch(0.6031 0.1344 160.9226)'],
  'chart-3': ['oklch(0.6031 0.1344 160.9226)', 'oklch(0.5128 0.11 163.5649)'],
  'chart-4': ['oklch(0.5128 0.11 163.5649)', 'oklch(0.4336 0.0901 165.866)'],
  'chart-5': ['oklch(0.4336 0.0901 165.866)', 'oklch(0.5128 0.11 163.5649)']
};

/** Static Tailwind classes per accent (must stay literal so the compiler sees them). */
export const ACCENT_TEXT_CLASS: Readonly<Record<ShowcaseAccent, string>> = {
  primary: 'text-primary',
  'chart-1': 'text-chart-1',
  'chart-2': 'text-chart-2',
  'chart-3': 'text-chart-3',
  'chart-4': 'text-chart-4',
  'chart-5': 'text-chart-5'
};

export const ACCENT_SOFT_BG_CLASS: Readonly<Record<ShowcaseAccent, string>> = {
  primary: 'bg-primary/10',
  'chart-1': 'bg-chart-1/10',
  'chart-2': 'bg-chart-2/10',
  'chart-3': 'bg-chart-3/10',
  'chart-4': 'bg-chart-4/10',
  'chart-5': 'bg-chart-5/10'
};

export const ACCENT_BORDER_CLASS: Readonly<Record<ShowcaseAccent, string>> = {
  primary: 'border-primary/40',
  'chart-1': 'border-chart-1/40',
  'chart-2': 'border-chart-2/40',
  'chart-3': 'border-chart-3/40',
  'chart-4': 'border-chart-4/40',
  'chart-5': 'border-chart-5/40'
};
