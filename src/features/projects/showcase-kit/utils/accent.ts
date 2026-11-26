import {
  ACCENT_BEAM_COLORS,
  ACCENT_DEEP_PERCENT,
  ACCENT_GLOW_PERCENT
} from '@/features/projects/showcase-kit/constants/accents';
import type {
  ResolvedAccent,
  ShowcaseAccent
} from '@/features/projects/showcase-kit/types/showcase-kit';

/** Resolve an accent token into the CSS strings the kit components consume. */
export function resolveAccent(accent: ShowcaseAccent): ResolvedAccent {
  const solid = `var(--${accent})`;
  const [beamStart, beamStop] = ACCENT_BEAM_COLORS[accent];
  return {
    solid,
    deep: `color-mix(in oklab, ${solid} ${ACCENT_DEEP_PERCENT}%, var(--foreground))`,
    glow: `color-mix(in oklab, ${solid} ${ACCENT_GLOW_PERCENT}%, transparent)`,
    beamStart,
    beamStop
  };
}
