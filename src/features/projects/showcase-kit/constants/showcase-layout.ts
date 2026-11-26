import type {
  ShowcaseDensity,
  ShowcaseSurface,
  ShowcaseTileSpan
} from '@/features/projects/showcase-kit/types/showcase-kit';

/** Showcase bento: 1 column on mobile, 3 on md+. Row height comes from the density preset. */
export const SHOWCASE_GRID_BASE_CLASS = 'grid grid-cols-1 md:grid-cols-3';

/**
 * Per-density classes. Rows have a minimum height and grow with their content, so footers never
 * clip. Class names stay literal so the Tailwind compiler sees them.
 */
export const SHOWCASE_DENSITY: Readonly<
  Record<ShowcaseDensity, { grid: string; tile: string; stage: string; footer: string }>
> = {
  compact: {
    grid: 'gap-3 md:auto-rows-[minmax(17rem,auto)]',
    tile: 'min-h-72 md:min-h-0',
    stage: 'min-h-[10rem]',
    footer: 'p-3'
  },
  comfortable: {
    grid: 'gap-4 md:auto-rows-[minmax(20rem,auto)]',
    tile: 'min-h-80 md:min-h-0',
    stage: 'min-h-[12rem]',
    footer: 'p-4'
  },
  roomy: {
    grid: 'gap-5 md:auto-rows-[minmax(23rem,auto)]',
    tile: 'min-h-96 md:min-h-0',
    stage: 'min-h-[14rem]',
    footer: 'p-5'
  }
};

export const DEFAULT_SHOWCASE_DENSITY: ShowcaseDensity = 'comfortable';
export const DEFAULT_SHOWCASE_SURFACE: ShowcaseSurface = 'plain';

/** Stage background per surface. */
export const SHOWCASE_SURFACE_CLASS: Readonly<Record<ShowcaseSurface, string>> = {
  plain: '',
  inset: 'bg-foreground/[0.035]'
};

/** Column spans (mobile is always one column). */
export const TILE_SPAN_CLASS: Readonly<Record<ShowcaseTileSpan, string>> = {
  one: 'col-span-1',
  two: 'col-span-1 md:col-span-2',
  full: 'col-span-1 md:col-span-3'
};

export const TILE_BASE_CLASS = 'relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl';

/** Content area above the footer: fills the tile and keeps the density minimum height. */
export const TILE_STAGE_CLASS = 'relative flex flex-1 overflow-hidden';

/** Footer shell; padding comes from the density preset. It never shrinks, so text is not clipped. */
export const TILE_FOOTER_CLASS =
  'border-border/60 bg-card relative z-40 shrink-0 space-y-1 border-t';

export const TILE_SPOTLIGHT_SIZE = 220;
export const TILE_SPOTLIGHT_OPACITY = 0.7;
export const TILE_SHINE_DURATION_S = 12;
export const TILE_SHINE_WIDTH_PX = 1;

/** Beam node diameters (Tailwind size classes). */
export const NODE_SIZE_CLASS = { md: 'size-11', lg: 'size-14' } as const;
