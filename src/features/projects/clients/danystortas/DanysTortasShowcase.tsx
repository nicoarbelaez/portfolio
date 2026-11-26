'use client';

import { Cake } from 'lucide-react';
import { getDanysTortasCopy } from '@/features/projects/clients/danystortas/constants/copy';
import { AgentChatTile } from '@/features/projects/clients/danystortas/tiles/AgentChatTile';
import { PipelineTile } from '@/features/projects/clients/danystortas/tiles/PipelineTile';
import { RevenueTile } from '@/features/projects/clients/danystortas/tiles/RevenueTile';
import { VolumeTile } from '@/features/projects/clients/danystortas/tiles/VolumeTile';
import { ClientMark } from '@/features/projects/clients/shared/components/ClientMark';
import { ClientMetaTile } from '@/features/projects/clients/shared/components/ClientMetaTile';
import { ShowcaseSection } from '@/features/projects/showcase-kit/components/ShowcaseSection';
import type { ProjectShowcaseProps } from '@/features/projects/types/showcase';

const HEADING_ID = 'danystortas-heading';

/**
 * Danys Tortas showcase on the shared kit: the WhatsApp sales agent, the message pipeline and the
 * approved AI revenue and volume figures. Rows add to three columns.
 */
export function DanysTortasShowcase({ project, lang, labels }: ProjectShowcaseProps) {
  const copy = getDanysTortasCopy(lang);

  return (
    <ShowcaseSection
      headingId={HEADING_ID}
      name={project.title}
      tagline={project.tagline}
      logo={<ClientMark icon={Cake} />}
    >
      <ClientMetaTile project={project} lang={lang} labels={labels} />
      <AgentChatTile copy={copy.chat} lang={lang} />
      <PipelineTile copy={copy.pipeline} />
      <RevenueTile copy={copy.revenue} lang={lang} />
      <VolumeTile copy={copy.volume} />
    </ShowcaseSection>
  );
}
