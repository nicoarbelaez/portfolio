/** Showcase section ids — SEO labels live in i18n (`projects.section.*`). */
export const PROJECT_SECTIONS = ['client', 'apps', 'side'] as const;

export type ProjectSectionId = (typeof PROJECT_SECTIONS)[number];

/** Home display order: client → apps → side. */
export const PROJECT_SECTION_ORDER = PROJECT_SECTIONS;

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
