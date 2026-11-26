/** Strong ease-out for entrances (see docs/design-system/showcase-kit.md, motion rules). */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Autoplay only while the tile is within the viewport (inset margin). */
export const IN_VIEW_MARGIN = '-10% 0px';

export const ENTER_DURATION_S = 0.28;
export const STAGGER_S = 0.06;
/** Extra ticks a revealed sequence stays complete before restarting. */
export const SEQUENCE_HOLD_TICKS = 3;
export const DEFAULT_TICK_MS = 1400;
/** Blur bridges two states of a crossfade (kept small). */
export const CROSSFADE_BLUR_PX = 4;
export const ENTER_OFFSET_PX = 8;
