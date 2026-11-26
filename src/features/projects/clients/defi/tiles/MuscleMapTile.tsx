'use client';

import { Activity } from 'lucide-react';
import { useEffect, useState, type ComponentProps, type ComponentType } from 'react';
import type BodyComponent from 'react-muscle-highlighter';
import type { ExtendedBodyPart } from 'react-muscle-highlighter';
import type { DefiCopy } from '@/features/projects/clients/defi/constants/copy.types';
import { MUSCLE_IDS, MUSCLE_STEP_MS } from '@/features/projects/clients/defi/constants/defi-config';
import {
  BODY_ACTIVE_FILL,
  BODY_BOX_STYLE,
  BODY_GENDER,
  BODY_IDLE_FILL,
  BODY_OUTLINE,
  BODY_SCALE,
  BODY_SIDE,
  MUSCLE_SLUGS,
  MUSCLE_TEXT_COLUMN_CLASS
} from '@/features/projects/clients/defi/constants/muscle-map';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { useCycleIndex } from '@/features/projects/showcase-kit/hooks/useTileTicker';
import { cn } from '@/lib/utils';

type BodyType = typeof BodyComponent;

/**
 * Loads the body component on the client only. The package ships extensionless ESM imports that
 * Node cannot resolve during SSR, and the SVG is decorative, so it is fetched after mount.
 */
function useBody(): ComponentType<ComponentProps<BodyType>> | null {
  const [Body, setBody] = useState<BodyType | null>(null);
  useEffect(() => {
    let active = true;
    void import('react-muscle-highlighter').then((module) => {
      if (active) setBody(() => module.default);
    });
    return () => {
      active = false;
    };
  }, []);
  return Body;
}

/**
 * Anatomical body (react-muscle-highlighter) whose muscles light up one by one, mirroring the
 * colored body SVG the muscle API returns per query. Reduced motion shows the first muscle only.
 */
export function MuscleMapTile({ copy }: { copy: DefiCopy['muscle'] }) {
  const { ref, value: activeIndex } = useCycleIndex(MUSCLE_IDS.length, MUSCLE_STEP_MS);
  const activeId = MUSCLE_IDS[activeIndex];
  const Body = useBody();
  const data: readonly ExtendedBodyPart[] = [
    { slug: MUSCLE_SLUGS[activeId], styles: { fill: BODY_ACTIVE_FILL } }
  ];

  return (
    <ShowcaseTile>
      <TileStage stageRef={ref} className="items-center justify-center gap-3 p-3">
        <div className="shrink-0" style={BODY_BOX_STYLE} aria-hidden="true">
          {Body ? (
            <Body
              data={data}
              side={BODY_SIDE}
              gender={BODY_GENDER}
              scale={BODY_SCALE}
              defaultFill={BODY_IDLE_FILL}
              border={BODY_OUTLINE}
            />
          ) : null}
        </div>
        <div
          className={cn('flex flex-col gap-1.5 text-xs', MUSCLE_TEXT_COLUMN_CLASS)}
          aria-hidden="true"
        >
          <code className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-[10px]">
            <span className="block">{copy.requestLabel}</span>
            <span className="block">?{activeId}</span>
          </code>
          <ul className="flex flex-col gap-0.5">
            {MUSCLE_IDS.map((id) => (
              <li
                key={id}
                className={cn(
                  'transition-colors duration-200',
                  id === activeId ? 'text-chart-2 font-semibold' : 'text-muted-foreground'
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
