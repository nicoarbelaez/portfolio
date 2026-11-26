import type { Slug } from 'react-muscle-highlighter';
import type { MuscleId } from '@/features/projects/clients/defi/constants/defi-config';

/**
 * Maps each muscle query of the muscle-api to a slug of `react-muscle-highlighter`
 * (https://www.npmjs.com/package/react-muscle-highlighter, MIT), which draws the anatomical SVG.
 */
export const MUSCLE_SLUGS: Readonly<Record<MuscleId, Slug>> = {
  pectoral: 'chest',
  hombros: 'deltoids',
  biceps: 'biceps',
  abdomen: 'abs',
  cuadriceps: 'quadriceps',
  pantorrillas: 'calves'
};

/** Body model rendered by the map. */
export const BODY_SIDE = 'front';
export const BODY_GENDER = 'male';
/** The library draws a 200x400 body at scale 1; this fits the tile stage. */
export const BODY_SCALE = 0.42;

/** Native size of the library body at scale 1 (px); reserves the box before the lazy import lands. */
const BODY_NATIVE_WIDTH_PX = 200;
const BODY_NATIVE_HEIGHT_PX = 400;
export const BODY_BOX_STYLE = {
  width: BODY_NATIVE_WIDTH_PX * BODY_SCALE,
  height: BODY_NATIVE_HEIGHT_PX * BODY_SCALE
} as const;

/**
 * Fixed width of the text column next to the body. It fits the longest caption and label, so
 * changing the active muscle never resizes a box or re-centers the row.
 */
export const MUSCLE_TEXT_COLUMN_CLASS = 'w-32 shrink-0 whitespace-nowrap';

/** Token-based paints (CSS variables resolve per theme). */
export const BODY_ACTIVE_FILL = 'var(--chart-2)';
export const BODY_IDLE_FILL = 'color-mix(in oklab, var(--muted-foreground) 22%, var(--card))';
export const BODY_OUTLINE = 'color-mix(in oklab, var(--muted-foreground) 45%, transparent)';
