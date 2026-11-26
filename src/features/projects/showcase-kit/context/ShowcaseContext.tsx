'use client';

import { createContext, useContext } from 'react';
import { DEFAULT_SHOWCASE_ACCENT } from '@/features/projects/showcase-kit/constants/accents';
import {
  DEFAULT_SHOWCASE_DENSITY,
  DEFAULT_SHOWCASE_SURFACE
} from '@/features/projects/showcase-kit/constants/showcase-layout';
import type {
  ShowcaseAccent,
  ShowcaseDensity,
  ShowcaseSurface
} from '@/features/projects/showcase-kit/types/showcase-kit';

/** Per-showcase tuning inherited by every tile, stage and footer inside a `ShowcaseSection`. */
export type ShowcaseTuning = {
  accent: ShowcaseAccent;
  density: ShowcaseDensity;
  surface: ShowcaseSurface;
};

const ShowcaseContext = createContext<ShowcaseTuning>({
  accent: DEFAULT_SHOWCASE_ACCENT,
  density: DEFAULT_SHOWCASE_DENSITY,
  surface: DEFAULT_SHOWCASE_SURFACE
});

/** Provider used by `ShowcaseSection`. */
export const ShowcaseTuningProvider = ShowcaseContext.Provider;

/** Read the current showcase tuning (defaults apply outside a section). */
export function useShowcaseTuning(): ShowcaseTuning {
  return useContext(ShowcaseContext);
}
