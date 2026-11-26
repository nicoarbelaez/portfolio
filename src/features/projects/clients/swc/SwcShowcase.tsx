'use client';

import { ProjectMark } from '@/features/projects/clients/shared/components/ClientMark';
import { ClientMetaTile } from '@/features/projects/clients/shared/components/ClientMetaTile';
import { getSwcCopy } from '@/features/projects/clients/swc/constants/copy';
import { AssistantTile } from '@/features/projects/clients/swc/tiles/AssistantTile';
import { RadarTile } from '@/features/projects/clients/swc/tiles/RadarTile';
import { SourcesTile } from '@/features/projects/clients/swc/tiles/SourcesTile';
import { TrmChartTile } from '@/features/projects/clients/swc/tiles/TrmChartTile';
import { ShowcaseSection } from '@/features/projects/showcase-kit/components/ShowcaseSection';
import type { ProjectShowcaseProps } from '@/features/projects/types/showcase';

const HEADING_ID = 'swc-heading';

/**
 * Smart Work Core showcase on the shared kit: alert radar, exchange-rate chart against a
 * threshold, the tool-calling assistant and the public-data sources. The client stays anonymous.
 */
export function SwcShowcase({ project, lang, labels }: ProjectShowcaseProps) {
  const copy = getSwcCopy(lang);

  return (
    <ShowcaseSection
      headingId={HEADING_ID}
      name={project.title}
      tagline={project.tagline}
      logo={<ProjectMark slug="swc" />}
      accent="chart-3"
      density="compact"
      surface="inset"
    >
      <ClientMetaTile project={project} lang={lang} labels={labels} />
      <AssistantTile copy={copy.assistant} lang={lang} />
      <RadarTile copy={copy.radar} lang={lang} />
      <TrmChartTile copy={copy.chart} lang={lang} />
      <SourcesTile copy={copy.sources} />
    </ShowcaseSection>
  );
}
