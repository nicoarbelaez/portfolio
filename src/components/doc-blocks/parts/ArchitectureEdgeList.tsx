import { ArrowRight } from 'lucide-react';

import type { ArchitectureEdge, ArchitectureLayer } from '../schemas/doc-block-schemas';

interface ArchitectureEdgeListProps {
  layers: ArchitectureLayer[];
  edges: ArchitectureEdge[];
}

/** Text alternative of the beams: every connection as "from -> to: label". */
export function ArchitectureEdgeList({ layers, edges }: ArchitectureEdgeListProps) {
  if (edges.length === 0) return null;
  const labels = new Map(layers.flatMap((layer) => layer.nodes.map((n) => [n.id, n.label])));

  return (
    <figcaption className="mt-3">
      <p className="sr-only">Connections</p>
      <ul className="text-muted-foreground mt-0 flex flex-col gap-1 ps-0 text-xs">
        {edges.map((edge) => (
          <li key={`${edge.from}-${edge.to}`} className="mt-0 flex flex-wrap items-center gap-1.5">
            <span className="text-foreground font-medium">{labels.get(edge.from)}</span>
            <ArrowRight aria-label="to" className="size-3 shrink-0" />
            <span className="text-foreground font-medium">{labels.get(edge.to)}</span>
            {edge.label ? <span>{edge.label}</span> : null}
            {edge.async ? (
              <span className="border-border/60 rounded-full border border-dashed px-1.5">
                async
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </figcaption>
  );
}
