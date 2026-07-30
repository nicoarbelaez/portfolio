/** Showcase section ids — SEO labels live in i18n (`projects.section.*`). */
export const PROJECT_SECTIONS = ['client', 'apps', 'side'] as const;

export type ProjectSectionId = (typeof PROJECT_SECTIONS)[number];

/** Home display order: client → apps → side. */
export const PROJECT_SECTION_ORDER = PROJECT_SECTIONS;

export const PROJECT_IMAGE_STRATEGIES = ['github-asset', 'placeholder', 'local'] as const;

export type ProjectImageStrategy = (typeof PROJECT_IMAGE_STRATEGIES)[number];

/**
 * Mobile sticky offset for project tabs under FloatingNav
 * (`pt-3` + nav bar ≈ 4rem). Desktop does not stick.
 */
export const PROJECT_TABS_STICKY_TOP_CLASS = 'top-16';

/**
 * Gutter inside overflow parents (Animate UI TabsContents uses overflow:hidden).
 * Prevents subpixel clipping of card rings/shadows at the pane edge.
 */
export const PROJECT_GRID_OVERFLOW_GUTTER_CLASS = 'p-px';

/**
 * Default cover candidates under the GitHub repo for `github-asset` strategy.
 * First existing file wins. Dark variants are optional companions.
 */
export const PROJECT_COVER_CANDIDATES = [
  'docs/assets/cover.webp',
  'docs/assets/cover.png',
  'docs/assets/cover.jpg',
  'docs/assets/cover.jpeg'
] as const;

export const PROJECT_COVER_DARK_CANDIDATES = [
  'docs/assets/cover.dark.webp',
  'docs/assets/cover.dark.png',
  'docs/assets/cover.dark.jpg',
  'docs/assets/cover.dark.jpeg'
] as const;
