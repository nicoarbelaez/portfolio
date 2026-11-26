'use client';

import { useMemo, type ReactNode } from 'react';
import { ShowcaseHeader } from '@/features/projects/showcase-kit/components/ShowcaseHeader';
import { DEFAULT_SHOWCASE_ACCENT } from '@/features/projects/showcase-kit/constants/accents';
import {
  DEFAULT_SHOWCASE_DENSITY,
  DEFAULT_SHOWCASE_SURFACE,
  SHOWCASE_DENSITY,
  SHOWCASE_GRID_BASE_CLASS
} from '@/features/projects/showcase-kit/constants/showcase-layout';
import {
  ShowcaseTuningProvider,
  type ShowcaseTuning
} from '@/features/projects/showcase-kit/context/ShowcaseContext';
import type {
  ShowcaseAccent,
  ShowcaseDensity,
  ShowcaseSurface
} from '@/features/projects/showcase-kit/types/showcase-kit';
import { ThemeProvider } from '@/features/theme/components/ThemeProvider';
import { cn } from '@/lib/utils';

interface ShowcaseSectionProps {
  /** Unique id for the `h3`; the section is labelled by it. */
  headingId: string;
  name: string;
  tagline: string;
  /** Decorative brand mark rendered left of the name. */
  logo: ReactNode;
  /** Default accent of every tile (a tile can still override it). */
  accent?: ShowcaseAccent;
  /** Spacing and row height preset. */
  density?: ShowcaseDensity;
  /** Stage background tone. */
  surface?: ShowcaseSurface;
  /** Tiles (`ShowcaseTile`), laid out on the 3-column bento grid. */
  children: ReactNode;
}

/**
 * Root of a client showcase: mounts the theme provider once, labels the section, shares the
 * accent/density/surface tuning with its tiles and lays them on the bento grid. The page provides
 * the parent `h2`; the product name is the `h3`.
 */
export function ShowcaseSection({
  headingId,
  name,
  tagline,
  logo,
  accent = DEFAULT_SHOWCASE_ACCENT,
  density = DEFAULT_SHOWCASE_DENSITY,
  surface = DEFAULT_SHOWCASE_SURFACE,
  children
}: ShowcaseSectionProps) {
  const tuning = useMemo<ShowcaseTuning>(
    () => ({ accent, density, surface }),
    [accent, density, surface]
  );

  return (
    <ThemeProvider>
      <ShowcaseTuningProvider value={tuning}>
        <section aria-labelledby={headingId} className="space-y-6">
          <ShowcaseHeader logo={logo} name={name} tagline={tagline} headingId={headingId} />
          <div className={cn(SHOWCASE_GRID_BASE_CLASS, SHOWCASE_DENSITY[density].grid)}>
            {children}
          </div>
        </section>
      </ShowcaseTuningProvider>
    </ThemeProvider>
  );
}
