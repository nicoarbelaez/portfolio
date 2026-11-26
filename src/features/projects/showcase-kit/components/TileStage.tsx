'use client';

import type { ReactNode, RefObject } from 'react';
import {
  SHOWCASE_DENSITY,
  SHOWCASE_SURFACE_CLASS,
  TILE_STAGE_CLASS
} from '@/features/projects/showcase-kit/constants/showcase-layout';
import { useShowcaseTuning } from '@/features/projects/showcase-kit/context/ShowcaseContext';
import { cn } from '@/lib/utils';

interface TileStageProps {
  children: ReactNode;
  /** Attach the ref from `useTileTicker`/`useRevealCount`/`useCycleIndex` to autoplay in view. */
  stageRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}

/** Content area of a tile (everything above the footer); height and tone follow the showcase tuning. */
export function TileStage({ children, stageRef, className }: TileStageProps) {
  const { density, surface } = useShowcaseTuning();
  return (
    <div
      ref={stageRef}
      className={cn(
        TILE_STAGE_CLASS,
        SHOWCASE_DENSITY[density].stage,
        SHOWCASE_SURFACE_CLASS[surface],
        className
      )}
    >
      {children}
    </div>
  );
}
