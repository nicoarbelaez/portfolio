'use client';

import { Activity } from 'lucide-react';
import {
  BODY_HEAD,
  BODY_TORSO,
  BODY_VIEWBOX,
  MUSCLE_FADE_CLASS,
  MUSCLE_IDS,
  MUSCLE_SHAPES,
  MUSCLE_STEP_MS
} from '@/features/projects/clients/defi/constants/defi-config';
import type { DefiCopy } from '@/features/projects/clients/defi/constants/copy.types';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { useCycleIndex } from '@/features/projects/showcase-kit/hooks/useTileTicker';
import { cn } from '@/lib/utils';

/** Body silhouette whose muscles light up one by one, mirroring the colored SVG the API returns. */
export function MuscleMapTile({ copy }: { copy: DefiCopy['muscle'] }) {
  const { ref, value: activeIndex } = useCycleIndex(MUSCLE_IDS.length, MUSCLE_STEP_MS);
  const activeId = MUSCLE_IDS[activeIndex];

  return (
    <ShowcaseTile className="min-h-80" accent="chart-2">
      <TileStage stageRef={ref} className="items-center justify-center gap-4 p-4">
        <svg
          viewBox={BODY_VIEWBOX}
          className="h-full max-h-[13rem] w-auto"
          aria-hidden="true"
          focusable="false"
        >
          <circle {...BODY_HEAD} className="fill-muted" />
          <rect {...BODY_TORSO} rx={BODY_TORSO.radius} className="fill-muted/60" />
          {MUSCLE_IDS.map((id) =>
            MUSCLE_SHAPES[id].map((shape) => (
              <g key={`${id}-${shape.x}`}>
                <rect
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  rx={shape.radius}
                  className="fill-muted"
                />
                <rect
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  rx={shape.radius}
                  className={cn(
                    'fill-primary',
                    MUSCLE_FADE_CLASS,
                    id === activeId ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </g>
            ))
          )}
        </svg>
        <div className="flex flex-col gap-1.5 text-xs" aria-hidden="true">
          <code className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-[10px]">
            {copy.requestLabel}?{activeId}
          </code>
          <ul className="flex flex-col gap-0.5">
            {MUSCLE_IDS.map((id) => (
              <li
                key={id}
                className={cn(
                  'transition-colors duration-200',
                  id === activeId ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
              >
                {copy.muscles[id]}
              </li>
            ))}
          </ul>
        </div>
      </TileStage>
      <TileFooter icon={Activity} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
