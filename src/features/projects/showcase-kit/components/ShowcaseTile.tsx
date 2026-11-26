'use client';

import type { ReactNode } from 'react';
import { MagicCard } from '@/components/ui/magic-card';
import { ShineBorder } from '@/components/ui/shine-border';
import { DEFAULT_SHOWCASE_ACCENT } from '@/features/projects/showcase-kit/constants/accents';
import {
  TILE_BASE_CLASS,
  TILE_HEIGHT_CLASS,
  TILE_SHINE_DURATION_S,
  TILE_SHINE_WIDTH_PX,
  TILE_SPAN_CLASS,
  TILE_SPOTLIGHT_OPACITY,
  TILE_SPOTLIGHT_SIZE
} from '@/features/projects/showcase-kit/constants/showcase-layout';
import type {
  ShowcaseAccent,
  ShowcaseTileSpan
} from '@/features/projects/showcase-kit/types/showcase-kit';
import { resolveAccent } from '@/features/projects/showcase-kit/utils/accent';
import { cn } from '@/lib/utils';

interface ShowcaseTileProps {
  /** Tile content: a stage area followed by a `TileFooter` (or a custom layout for heroes). */
  children: ReactNode;
  /** Design-system accent token; defaults to the primary token. */
  accent?: ShowcaseAccent;
  /** Column span on md+. */
  span?: ShowcaseTileSpan;
  /** Animated shine border, reserved for the hero tile. */
  shine?: boolean;
  className?: string;
}

/**
 * Tile shell: Magic Card spotlight tinted by `accent`, optional shine border. Colors derive
 * from tokens, so light and dark themes need no extra handling.
 * @see https://magicui.design/docs/components/magic-card
 */
export function ShowcaseTile({
  children,
  accent = DEFAULT_SHOWCASE_ACCENT,
  span = 'one',
  shine = false,
  className
}: ShowcaseTileProps) {
  const colors = resolveAccent(accent);

  return (
    <MagicCard
      className={cn(TILE_BASE_CLASS, TILE_HEIGHT_CLASS, TILE_SPAN_CLASS[span], className)}
      gradientSize={TILE_SPOTLIGHT_SIZE}
      gradientFrom={colors.solid}
      gradientTo={colors.deep}
      gradientColor={colors.glow}
      gradientOpacity={TILE_SPOTLIGHT_OPACITY}
    >
      {shine ? (
        <ShineBorder
          borderWidth={TILE_SHINE_WIDTH_PX}
          duration={TILE_SHINE_DURATION_S}
          shineColor={[colors.beamStart, colors.beamStop, colors.beamStart]}
          className="rounded-[inherit]"
        />
      ) : null}
      <article className="relative z-40 flex min-h-0 flex-1 flex-col">{children}</article>
    </MagicCard>
  );
}
