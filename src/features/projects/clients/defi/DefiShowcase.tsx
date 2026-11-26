'use client';

import { getDefiCopy } from '@/features/projects/clients/defi/constants/copy';
import { ArchTile } from '@/features/projects/clients/defi/tiles/ArchTile';
import { MuscleMapTile } from '@/features/projects/clients/defi/tiles/MuscleMapTile';
import { SheetTile } from '@/features/projects/clients/defi/tiles/SheetTile';
import { ProjectMark } from '@/features/projects/clients/shared/components/ClientMark';
import { ClientMetaTile } from '@/features/projects/clients/shared/components/ClientMetaTile';
import { ShowcaseSection } from '@/features/projects/showcase-kit/components/ShowcaseSection';
import type { ProjectShowcaseProps } from '@/features/projects/types/showcase';

const HEADING_ID = 'defi-heading';

/**
 * DeFi showcase on the shared kit: the Google Sheets routine view with dependent dropdowns, the
 * muscle-map API and the Sheets, Apps Script and Vercel architecture. Rows add to three columns.
 */
export function DefiShowcase({ project, lang, labels }: ProjectShowcaseProps) {
  const copy = getDefiCopy(lang);

  return (
    <ShowcaseSection
      headingId={HEADING_ID}
      name={project.title}
      tagline={project.tagline}
      logo={<ProjectMark slug="defi" />}
      accent="chart-2"
      density="compact"
    >
      <ClientMetaTile project={project} lang={lang} labels={labels} />
      <MuscleMapTile copy={copy.muscle} />
      <SheetTile copy={copy.sheet} lang={lang} />
      <ArchTile copy={copy.arch} />
    </ShowcaseSection>
  );
}
