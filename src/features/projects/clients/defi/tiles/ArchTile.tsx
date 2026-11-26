'use client';

import { Cloud, Database, FileCode, Table2 } from 'lucide-react';
import { BeamDiagramTile } from '@/features/projects/clients/shared/components/BeamDiagramTile';
import type { BeamEdgeSpec, BeamNodeSpec } from '@/features/projects/clients/shared/types/diagram';
import {
  ARCH_COLUMNS,
  ARCH_IDS,
  type ArchId
} from '@/features/projects/clients/defi/constants/defi-config';
import type { DefiCopy } from '@/features/projects/clients/defi/constants/copy.types';
import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';

const NODE_ICONS: Readonly<Record<ArchId, ShowcaseIcon>> = {
  sheets: Table2,
  appsscript: FileCode,
  db: Database,
  api: Cloud
};

const EDGES: readonly BeamEdgeSpec[] = [
  { from: 'sheets', to: 'appsscript' },
  { from: 'appsscript', to: 'db' },
  { from: 'db', to: 'api' }
];

/** Architecture beams: Google Sheets, Apps Script, the JSON web app and the Vercel image API. */
export function ArchTile({ copy }: { copy: DefiCopy['arch'] }) {
  const nodes: BeamNodeSpec[] = ARCH_IDS.map((id) => ({
    id,
    label: copy.nodes[id].label,
    caption: copy.nodes[id].caption,
    icon: NODE_ICONS[id],
    emphasized: id === 'appsscript'
  }));

  return (
    <BeamDiagramTile
      accent="chart-2"
      nodes={nodes}
      columns={ARCH_COLUMNS}
      edges={EDGES}
      title={copy.title}
      description={copy.description}
    />
  );
}
