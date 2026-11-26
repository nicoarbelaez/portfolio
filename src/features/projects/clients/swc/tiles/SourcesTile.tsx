'use client';

import { Database, FileText, Globe, LayoutGrid, ListChecks, Newspaper, Zap } from 'lucide-react';
import { BeamDiagramTile } from '@/features/projects/clients/shared/components/BeamDiagramTile';
import type { BeamEdgeSpec, BeamNodeSpec } from '@/features/projects/clients/shared/types/diagram';
import {
  SOURCE_IDS,
  SOURCE_NAMES,
  SOURCES_COLUMNS,
  type SourceId
} from '@/features/projects/clients/swc/constants/swc-config';
import type { SwcCopy } from '@/features/projects/clients/swc/constants/copy.types';
import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';

const SOURCE_ICONS: Readonly<Record<SourceId, ShowcaseIcon>> = {
  datos: Database,
  secop: FileText,
  worldbank: Globe,
  xm: Zap,
  rss: Newspaper
};

const EDGES: readonly BeamEdgeSpec[] = [
  ...SOURCE_IDS.map((id) => ({ from: id, to: 'rules' })),
  { from: 'rules', to: 'pestel' },
  { from: 'rules', to: 'briefing' }
];

/** Sources beam: open data and news feed the rule engine, which outputs PESTEL and a briefing. */
export function SourcesTile({ copy }: { copy: SwcCopy['sources'] }) {
  const sources: BeamNodeSpec[] = SOURCE_IDS.map((id) => {
    const name = id === 'rss' ? copy.rss : SOURCE_NAMES[id];
    return { id, label: name, caption: name, icon: SOURCE_ICONS[id], kind: 'pill' };
  });
  const nodes: BeamNodeSpec[] = [
    ...sources,
    { id: 'rules', ...copy.rules, icon: ListChecks, emphasized: true },
    { id: 'pestel', ...copy.pestel, icon: LayoutGrid },
    { id: 'briefing', ...copy.briefing, icon: FileText }
  ];

  return (
    <BeamDiagramTile
      span="full"
      nodes={nodes}
      columns={SOURCES_COLUMNS}
      edges={EDGES}
      title={copy.title}
      description={copy.description}
    />
  );
}
