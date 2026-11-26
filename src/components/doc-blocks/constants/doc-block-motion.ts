/**
 * Motion tokens shared by every doc block.
 * Rules (see docs/design-system/README.md): ease-out entrances, short stagger,
 * play once when visible, static final state under `prefers-reduced-motion`.
 */

/** Strong ease-out (cubic-bezier 0.23, 1, 0.32, 1) for entrances. */
export const DOC_BLOCK_EASE = [0.23, 1, 0.32, 1] as const;

/** Duration of one item entrance, in seconds. */
export const REVEAL_DURATION_S = 0.4;

/** Delay between consecutive items of one block, in seconds (30-80ms band). */
export const REVEAL_STAGGER_S = 0.06;

/** Vertical offset an item travels while entering, in pixels. */
export const REVEAL_OFFSET_PX = 8;

/** Scale an item starts from (never from 0). */
export const REVEAL_START_SCALE = 0.97;

/** Items past this index share the last stagger slot, so long lists never feel slow. */
export const MAX_STAGGERED_ITEMS = 10;

/** Milliseconds in a second (timer conversion). */
export const MS_PER_SECOND = 1000;

/** Viewport margin that delays the reveal until the block is clearly visible. */
export const REVEAL_VIEW_MARGIN = '-80px';

/** Beam sweep duration, in seconds. */
export const BEAM_DURATION_S = 4;

/** Delay between the start of consecutive beams, in seconds. */
export const BEAM_STAGGER_S = 0.5;

/** Opacity of the resting beam path. */
export const BEAM_PATH_OPACITY = 0.35;

/** Stroke width of beams, in pixels. */
export const BEAM_PATH_WIDTH = 2;

/** Dash pattern applied to asynchronous edges. */
export const BEAM_ASYNC_DASH_CLASS = '[&>path:first-child]:[stroke-dasharray:4_4]';

/** Beam colors, resolved from design tokens. */
export const BEAM_COLORS = {
  path: 'var(--muted-foreground)',
  start: 'var(--primary)',
  stop: 'var(--chart-2)'
} as const;
