'use client';

import { createRef, useMemo, type RefObject } from 'react';

import { AnimatedBeam } from '@/components/ui/animated-beam';
import { DotPattern } from '@/components/ui/dot-pattern';
import {
  BEAM_ASYNC_DASH_CLASS,
  BEAM_COLORS,
  BEAM_DURATION_S,
  BEAM_PATH_OPACITY,
  BEAM_PATH_WIDTH,
  BEAM_STAGGER_S
} from '../constants/doc-block-motion';
import { useReveal } from '../hooks/use-reveal';
import { ArchitectureEdgeList } from '../parts/ArchitectureEdgeList';
import { ArchitectureNodeCard } from '../parts/ArchitectureNodeCard';
import type { ArchitectureProps } from '../schemas/doc-block-schemas';
import { cn } from '@/lib/utils';

/**
 * System map: layers are columns (stacked rows on mobile), nodes are tinted by kind and
 * edges are animated beams (dashed when `async`). The server render is a readable
 * nested list plus a connection list; beams are added after hydration.
 */
export function ArchitectureView({ layers, edges }: ArchitectureProps) {
  const nodeCount = layers.reduce((total, layer) => total + layer.nodes.length, 0);
  const { ref, animated, settled, itemProps } = useReveal<HTMLDivElement>(nodeCount);

  const nodeKey = layers.flatMap((layer) => layer.nodes.map((node) => node.id)).join('|');
  const nodeRefs = useMemo(() => {
    const map = new Map<string, RefObject<HTMLLIElement | null>>();
    nodeKey.split('|').forEach((id) => map.set(id, createRef<HTMLLIElement>()));
    return map;
  }, [nodeKey]);

  let nodeIndex = 0;

  return (
    <figure className="my-8">
      <div
        ref={ref}
        className="bg-card border-border/50 relative overflow-hidden rounded-xl border p-4 md:p-6"
      >
        <DotPattern className="fill-muted-foreground/30 text-muted-foreground/30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <ol className="relative mt-0 flex flex-col gap-8 ps-0 md:flex-row md:gap-12">
          {layers.map((layer) => (
            <li key={layer.id} className="mt-0 flex min-w-0 flex-1 flex-col gap-3">
              <h4 className="text-muted-foreground mt-0 text-xs font-medium tracking-wide uppercase">
                {layer.label}
              </h4>
              <ul className="mt-0 flex flex-1 flex-col justify-center gap-4 ps-0">
                {layer.nodes.map((node) => (
                  <ArchitectureNodeCard
                    key={node.id}
                    node={node}
                    nodeRef={nodeRefs.get(node.id)}
                    reveal={itemProps(nodeIndex++)}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ol>
        {settled
          ? edges.flatMap((edge, index) => {
              const fromRef = nodeRefs.get(edge.from);
              const toRef = nodeRefs.get(edge.to);
              if (!fromRef || !toRef) return [];
              return [
                <AnimatedBeam
                  key={`${edge.from}-${edge.to}`}
                  containerRef={ref}
                  fromRef={fromRef}
                  toRef={toRef}
                  className={cn(edge.async && BEAM_ASYNC_DASH_CLASS)}
                  pathColor={BEAM_COLORS.path}
                  pathOpacity={BEAM_PATH_OPACITY}
                  pathWidth={BEAM_PATH_WIDTH}
                  gradientStartColor={BEAM_COLORS.start}
                  gradientStopColor={BEAM_COLORS.stop}
                  duration={animated ? BEAM_DURATION_S : 0}
                  repeat={animated ? Infinity : 0}
                  delay={index * BEAM_STAGGER_S}
                />
              ];
            })
          : null}
      </div>
      <ArchitectureEdgeList layers={layers} edges={edges} />
    </figure>
  );
}
