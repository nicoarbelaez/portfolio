'use client';

import {
  Bot,
  Layers,
  MessageCircle,
  Send,
  ShieldCheck,
  Users,
  Webhook,
  Workflow
} from 'lucide-react';
import { BeamDiagramTile } from '@/features/projects/clients/shared/components/BeamDiagramTile';
import type { BeamEdgeSpec, BeamNodeSpec } from '@/features/projects/clients/shared/types/diagram';
import { BEAM_CURVATURE } from '@/features/projects/clients/shared/constants/client-config';
import {
  PIPELINE_COLUMNS,
  PIPELINE_IDS,
  type PipelineId
} from '@/features/projects/clients/danystortas/constants/danystortas-config';
import type { DanysTortasCopy } from '@/features/projects/clients/danystortas/constants/copy.types';
import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';

const NODE_ICONS: Readonly<Record<PipelineId, ShowcaseIcon>> = {
  whatsapp: MessageCircle,
  kommo: Users,
  webhook: Webhook,
  queue: Layers,
  agent: Bot,
  guards: ShieldCheck,
  reply: Send
};

/** Processing order; the last stage closes the loop back to the customer. */
const EDGES: readonly BeamEdgeSpec[] = [
  { from: 'whatsapp', to: 'kommo' },
  { from: 'kommo', to: 'webhook' },
  { from: 'webhook', to: 'queue' },
  { from: 'queue', to: 'agent' },
  { from: 'agent', to: 'guards' },
  { from: 'guards', to: 'reply' },
  { from: 'reply', to: 'whatsapp', curvature: BEAM_CURVATURE }
];

/** Message pipeline as a beam diagram: WhatsApp, Kommo, webhook, queue, agent, guards, reply. */
export function PipelineTile({ copy }: { copy: DanysTortasCopy['pipeline'] }) {
  const nodes: BeamNodeSpec[] = PIPELINE_IDS.map((id) => ({
    id,
    label: copy.nodes[id].label,
    caption: copy.nodes[id].caption,
    icon: NODE_ICONS[id],
    emphasized: id === 'agent'
  }));

  return (
    <BeamDiagramTile
      span="full"
      nodes={nodes}
      columns={PIPELINE_COLUMNS}
      edges={EDGES}
      title={copy.title}
      description={copy.description}
      footerIcon={Workflow}
    />
  );
}
