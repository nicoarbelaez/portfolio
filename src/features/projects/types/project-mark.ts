import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';

/** Image metadata as produced by Astro asset imports. */
export type ProjectMarkImage = { src: string; width: number; height: number };

/**
 * How a project mark is drawn.
 * - `image`: brand artwork. `plate: 'white'` pads it on a white tile (transparent logos stay
 *   legible in dark mode); `plate: 'bleed'` fills the tile edge to edge (artwork has its own bg).
 * - `icon`: Lucide icon on the token primary plate.
 */
export type ProjectMarkDefinition =
  | { kind: 'image'; image: ProjectMarkImage; plate: 'white' | 'bleed' }
  | { kind: 'icon'; icon: ShowcaseIcon };
