'use client';

import { createRef, useRef, type RefObject } from 'react';
import { Share2 } from 'lucide-react';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { DotPattern } from '@/components/ui/dot-pattern';
import {
  BEAM_DURATION_S,
  BEAM_STAGGER_S
} from '@/features/projects/clients/shared/constants/client-config';
import type { BeamEdgeSpec, BeamNodeSpec } from '@/features/projects/clients/shared/types/diagram';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileNode } from '@/features/projects/showcase-kit/components/TileNode';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { useShowcaseTuning } from '@/features/projects/showcase-kit/context/ShowcaseContext';
import type {
  ShowcaseAccent,
  ShowcaseIcon,
  ShowcaseTileSpan
} from '@/features/projects/showcase-kit/types/showcase-kit';
import { resolveAccent } from '@/features/projects/showcase-kit/utils/accent';
import { cn } from '@/lib/utils';

interface BeamDiagramTileProps {
  nodes: readonly BeamNodeSpec[];
  /** Node ids laid out left to right; ids inside a column stack top to bottom. */
  columns: readonly (readonly string[])[];
  edges: readonly BeamEdgeSpec[];
  title: string;
  description: string;
  footerIcon?: ShowcaseIcon;
  accent?: ShowcaseAccent;
  span?: ShowcaseTileSpan;
  className?: string;
}

/**
 * Generic architecture/pipeline tile: nodes arranged in columns and joined by animated beams.
 * Circle nodes carry a caption underneath; `pill` nodes are compact capsules for long lists.
 */
export function BeamDiagramTile({
  nodes,
  columns,
  edges,
  title,
  description,
  footerIcon = Share2,
  accent,
  span = 'one',
  className
}: BeamDiagramTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Refs live outside `nodes` identity: callers rebuild the array each render (localized copy).
  const refStore = useRef(new Map<string, RefObject<HTMLDivElement | null>>());
  const getRef = (id: string): RefObject<HTMLDivElement | null> => {
    const existing = refStore.current.get(id);
    if (existing) return existing;
    const created = createRef<HTMLDivElement>();
    refStore.current.set(id, created);
    return created;
  };
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const tuning = useShowcaseTuning();
  const resolvedAccent = accent ?? tuning.accent;
  const colors = resolveAccent(resolvedAccent);

  const renderNode = (id: string) => {
    const node = byId.get(id);
    if (!node) return null;
    const nodeRef = getRef(id);
    const Icon = node.icon;
    if (node.kind === 'pill') {
      return (
        <div
          key={id}
          ref={nodeRef}
          role="img"
          aria-label={node.label}
          className="bg-background border-foreground/20 dark:border-border/50 z-10 flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] leading-none shadow-sm"
        >
          <Icon className="size-3 shrink-0" aria-hidden="true" />
          <span aria-hidden="true">{node.caption}</span>
        </div>
      );
    }
    return (
      <TileNode
        key={id}
        nodeRef={nodeRef}
        label={node.label}
        caption={node.caption}
        emphasized={node.emphasized}
      >
        <Icon className="size-4" aria-hidden="true" />
      </TileNode>
    );
  };

  return (
    <ShowcaseTile span={span} accent={resolvedAccent} className={className}>
      <TileStage className="min-h-[14rem] items-center justify-center p-4">
        <div ref={containerRef} className="relative flex h-full w-full items-center justify-center">
          <DotPattern
            width={18}
            height={18}
            cr={1}
            className={cn(
              'text-foreground/25',
              '[mask-image:radial-gradient(320px_circle_at_center,white,transparent)]'
            )}
          />
          <div className="relative flex h-full w-full max-w-xl items-stretch justify-between px-2">
            {columns.map((column) => (
              <div key={column.join('+')} className="flex flex-col justify-around gap-2">
                {column.map(renderNode)}
              </div>
            ))}
          </div>
          {edges.map((edge, index) => {
            if (!byId.has(edge.from) || !byId.has(edge.to)) return null;
            return (
              <AnimatedBeam
                key={`${edge.from}>${edge.to}`}
                containerRef={containerRef}
                fromRef={getRef(edge.from)}
                toRef={getRef(edge.to)}
                curvature={edge.curvature}
                reverse={edge.reverse}
                delay={index * BEAM_STAGGER_S}
                duration={BEAM_DURATION_S}
                gradientStartColor={colors.beamStart}
                gradientStopColor={colors.beamStop}
              />
            );
          })}
        </div>
      </TileStage>
      <TileFooter icon={footerIcon} title={title} description={description} />
    </ShowcaseTile>
  );
}
