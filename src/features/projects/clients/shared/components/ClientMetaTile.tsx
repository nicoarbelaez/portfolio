'use client';

import { ClientShowcaseMeta } from '@/features/projects/clients/ClientShowcaseMeta';
import type { ProjectShowcaseProps } from '@/features/projects/types/showcase';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import type { ShowcaseAccent } from '@/features/projects/showcase-kit/types/showcase-kit';

interface ClientMetaTileProps extends ProjectShowcaseProps {
  accent?: ShowcaseAccent;
}

/** Pitch tile at the start of a client showcase: period, description, topics, credits, CTAs. */
export function ClientMetaTile({ project, lang, labels, accent }: ClientMetaTileProps) {
  return (
    <ShowcaseTile span="two" accent={accent} shine className="min-h-72">
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-7">
        <ClientShowcaseMeta project={project} lang={lang} labels={labels} />
      </div>
    </ShowcaseTile>
  );
}
