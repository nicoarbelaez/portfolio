/** Color tokens shown as swatches (CSS variable names from global.css). */
export const COLOR_TOKENS = [
  'background',
  'foreground',
  'card',
  'primary',
  'secondary',
  'muted',
  'muted-foreground',
  'border',
  'destructive',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5'
] as const;

/** The four font roles and their Tailwind classes. */
export const TYPE_ROLES = [
  { role: 'heading', family: 'Space Grotesk', className: 'font-heading', sample: 'Heading 28/600' },
  { role: 'sans', family: 'IBM Plex Sans', className: 'font-sans', sample: 'Sans body text' },
  {
    role: 'body',
    family: 'Onest',
    className: 'font-[family-name:var(--astro-font-body)]',
    sample: 'Body text'
  },
  { role: 'mono', family: 'Geist', className: 'font-mono', sample: 'const mono = true;' }
] as const;

/** Type scale steps. */
export const TYPE_SCALE = [
  { name: 'text-3xl', className: 'text-3xl font-heading font-semibold' },
  { name: 'text-xl', className: 'text-xl font-heading font-semibold' },
  { name: 'text-base', className: 'text-base' },
  { name: 'text-sm', className: 'text-sm' },
  { name: 'text-xs', className: 'text-xs' }
] as const;

/** Radius tokens (Tailwind class, rendered on a sample box). */
export const RADIUS_TOKENS = ['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl'] as const;

/** Spacing steps in Tailwind units (1 unit = 0.25rem). */
export const SPACING_STEPS = [1, 2, 3, 4, 6, 8] as const;
/** Pixels per spacing unit. */
export const SPACING_UNIT_PX = 4;
