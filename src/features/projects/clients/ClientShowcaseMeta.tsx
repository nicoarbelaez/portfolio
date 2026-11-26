'use client';

import { Badge } from '@/components/ui/badge';
import type { ProjectCardLabels } from '@/features/projects/components/ProjectCard';
import { ProjectCtasLinks } from '@/features/projects/components/ProjectCtas';
import {
  formatProjectTimeline,
  projectTimelineDateTime
} from '@/features/projects/services/timeline';
import type { EnrichedProject } from '@/features/projects/types/project';
import { getLocalizedPath } from '@/i18n/utils';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

/** Max topics shown in a client showcase (same cap as `ProjectCard`). */
const MAX_TOPICS = 8;

interface ClientShowcaseMetaProps {
  project: EnrichedProject;
  lang: LocaleKey;
  labels: ProjectCardLabels;
  headingId: string;
  className?: string;
  /** Extra classes for the title (per-client typography). */
  titleClassName?: string;
}

/**
 * Data-driven text block shared by client showcases: title, timeline, description,
 * topics and CTAs. Only renders data already on the project — no hard-coded copy.
 */
export function ClientShowcaseMeta({
  project,
  lang,
  labels,
  headingId,
  className,
  titleClassName
}: ClientShowcaseMetaProps) {
  const detailsHref = getLocalizedPath(`/projects/${project.slug}`, lang);
  const timelineLabel = formatProjectTimeline(project.entry.timeline, lang, {
    present: labels.present
  });

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="space-y-1">
        <h3
          id={headingId}
          className={cn('font-heading text-2xl font-semibold tracking-tight', titleClassName)}
        >
          {project.title}
        </h3>
        <time
          className="text-muted-foreground text-xs"
          dateTime={projectTimelineDateTime(project.entry.timeline)}
        >
          {timelineLabel}
        </time>
      </div>

      {project.description ? (
        <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
          {project.description}
        </p>
      ) : null}

      {project.topics.length > 0 ? (
        <ul className="flex flex-wrap gap-1" aria-label="Topics">
          {project.topics.slice(0, MAX_TOPICS).map((topic) => (
            <li key={topic}>
              <Badge variant="outline" className="h-6 rounded-md px-2 text-[11px] font-medium">
                {topic}
              </Badge>
            </li>
          ))}
        </ul>
      ) : null}

      <ProjectCtasLinks
        ctas={project.ctas}
        detailsHref={detailsHref}
        labels={labels}
        className="pt-1"
      />
    </div>
  );
}
