import type { ShowcaseAccent } from '@/features/projects/showcase-kit/types/showcase-kit';
import type { ProjectStackCategory } from '@/features/projects/constants/content';

/**
 * Project cover pipeline constants. Covers are rendered by the dev-only page
 * `/dev/cover/<slug>` (see `src/pages/dev/cover/[slug].astro`), screenshotted and converted to
 * WebP; docs: `docs/design-system/README.md#project-covers`.
 */

/** Cover canvas in CSS pixels (also the Open Graph size). */
export const COVER_WIDTH = 1200;
export const COVER_HEIGHT = 630;

/** Output encoding of the generated covers. */
export const COVER_WEBP_QUALITY = 82;
/** Hard ceiling per generated file; lower the quality or simplify the fragment when exceeded. */
export const COVER_MAX_BYTES = 90 * 1024;

/** File names inside `src/content/projects/<slug>/`. */
export const COVER_FILE_NAME = 'cover.webp';
export const COVER_DARK_FILE_NAME = 'cover.dark.webp';

/** Dev route that renders one cover (`?theme=dark` for the dark variant). */
export const COVER_DEV_ROUTE_PREFIX = '/dev/cover';
export const COVER_THEME_PARAM = 'theme';
export const COVER_DARK_THEME_VALUE = 'dark';

/** Stack chips shown on the cover: one per category in this order, up to the cap. */
export const COVER_CHIP_MAX = 5;
export const COVER_CHIP_CATEGORY_ORDER: readonly ProjectStackCategory[] = [
  'ai',
  'backend',
  'frontend',
  'data',
  'infra'
];

/** Accent token per project; every value is a `global.css` token. */
export const COVER_ACCENTS: Readonly<Record<string, ShowcaseAccent>> = {
  mecateo: 'primary',
  danystortas: 'chart-1',
  swc: 'chart-2',
  defi: 'chart-3',
  readia: 'chart-1',
  'living-sports': 'chart-2',
  appsalon: 'chart-3',
  'claude-identity': 'primary'
};
export const COVER_DEFAULT_ACCENT: ShowcaseAccent = 'primary';

/** Card media aspect ratio while a project has no cover yet. */
export const PROJECT_CARD_FALLBACK_ASPECT = '16 / 10';

/** Browser-frame address shown over the real screenshots (public pages only). */
export const COVER_SITE_FRAME_TITLES: Readonly<Record<string, string>> = {
  mecateo: 'mecateo.co',
  readia: 'readia.arbelaeznicolas.dev'
};

/** Frame width (px) of each screenshot fragment, chosen from the crop's aspect ratio. */
export const COVER_SITE_FRAME_WIDTHS: Readonly<Record<string, number>> = {
  mecateo: 470,
  readia: 640
};
export const COVER_SITE_FRAME_DEFAULT_WIDTH = 640;

/**
 * Satori cannot decode WebP, so the dark cover is also exported as a JPEG that only the OG route
 * reads at build time (`src/pages/og/[lang]/[slug].png.ts`); it is never served to visitors.
 */
export const COVER_OG_FILE_NAME = 'cover.og.jpg';
export const COVER_OG_JPEG_QUALITY = 86;
