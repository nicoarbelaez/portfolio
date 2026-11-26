import type { ReactNode, RefObject } from 'react';
import { TILE_STAGE_CLASS } from '@/features/projects/showcase-kit/constants/showcase-layout';
import { cn } from '@/lib/utils';

interface TileStageProps {
  children: ReactNode;
  /** Attach the ref from `useTileTicker`/`useRevealCount`/`useCycleIndex` to autoplay in view. */
  stageRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}

/** Content area of a tile (everything above the footer). */
export function TileStage({ children, stageRef, className }: TileStageProps) {
  return (
    <div ref={stageRef} className={cn(TILE_STAGE_CLASS, className)}>
      {children}
    </div>
  );
}
