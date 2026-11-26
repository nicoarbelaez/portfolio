import type { ComponentType } from 'react';

/** Accent tokens a client showcase may use. Always design-system tokens, never raw brand colors. */
export type ShowcaseAccent = 'primary' | 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5';

/** Column span of a tile inside the 3-column showcase grid. */
export type ShowcaseTileSpan = 'one' | 'two' | 'full';

/** Spacing and row height preset of a showcase (see `SHOWCASE_DENSITY`). */
export type ShowcaseDensity = 'compact' | 'comfortable' | 'roomy';

/** Stage background: `plain` shows the card, `inset` adds a subtle foreground wash. */
export type ShowcaseSurface = 'plain' | 'inset';

/** Icon component accepted by kit footers (lucide-compatible). */
export type ShowcaseIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>;

/** Resolved color strings for one accent (CSS values, theme-aware). */
export type ResolvedAccent = {
  /** Token reference, e.g. `var(--primary)`. */
  solid: string;
  /** Slightly deeper tone for gradients. */
  deep: string;
  /** Translucent glow for spotlight fills. */
  glow: string;
  /** Concrete oklch pair for SVG gradients (beams) where `var()` is unreliable. */
  beamStart: string;
  beamStop: string;
};
