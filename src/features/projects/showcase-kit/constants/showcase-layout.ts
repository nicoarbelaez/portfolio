import type { ShowcaseTileSpan } from '@/features/projects/showcase-kit/types/showcase-kit';

/** Showcase bento: 1 column on mobile, 3 on md+, fixed row height on md+. */
export const SHOWCASE_GRID_CLASS = 'grid grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3';

/** Column spans (mobile is always one column). */
export const TILE_SPAN_CLASS: Readonly<Record<ShowcaseTileSpan, string>> = {
  one: 'col-span-1',
  two: 'col-span-1 md:col-span-2',
  full: 'col-span-1 md:col-span-3'
};

/** Mobile gives each tile room (stacked); md+ rows are fixed by the grid. */
export const TILE_HEIGHT_CLASS = 'min-h-80 md:min-h-0';

export const TILE_BASE_CLASS = 'relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl';

/** Content area above the footer. */
export const TILE_STAGE_CLASS = 'relative flex min-h-[12rem] flex-1 overflow-hidden';

export const TILE_FOOTER_CLASS =
  'border-border/60 bg-card/90 relative z-40 space-y-1 border-t p-4 backdrop-blur-sm';

export const TILE_SPOTLIGHT_SIZE = 220;
export const TILE_SPOTLIGHT_OPACITY = 0.7;
export const TILE_SHINE_DURATION_S = 12;
export const TILE_SHINE_WIDTH_PX = 1;

/** Beam node diameters (Tailwind size classes). */
export const NODE_SIZE_CLASS = { md: 'size-11', lg: 'size-14' } as const;
