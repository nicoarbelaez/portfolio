'use client';

import {
  SHOWCASE_DENSITY,
  TILE_FOOTER_CLASS
} from '@/features/projects/showcase-kit/constants/showcase-layout';
import { useShowcaseTuning } from '@/features/projects/showcase-kit/context/ShowcaseContext';
import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';
import { cn } from '@/lib/utils';

interface TileFooterProps {
  icon: ShowcaseIcon;
  /** Rendered as an `h4`. */
  title: string;
  description: string;
}

/**
 * Title and short description under a tile stage. The text is the accessible summary of the
 * visual. It wraps freely and the tile grows to fit it, so it is never clipped.
 */
export function TileFooter({ icon: Icon, title, description }: TileFooterProps) {
  const { density } = useShowcaseTuning();
  return (
    <div className={cn(TILE_FOOTER_CLASS, SHOWCASE_DENSITY[density].footer)}>
      <div className="flex items-start gap-2">
        <Icon className="text-foreground mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <h4 className="font-heading min-w-0 text-base leading-snug font-semibold">{title}</h4>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed text-pretty">{description}</p>
    </div>
  );
}
