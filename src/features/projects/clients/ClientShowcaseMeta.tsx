'use client';

import { Badge } from '@/components/ui/badge';
import { TEAM_LABEL } from '@/features/projects/clients/shared/constants/client-config';
import type { ProjectCardLabels } from '@/features/projects/components/ProjectCard';
import { ProjectCtasLinks } from '@/features/projects/components/ProjectCtas';
import {
  formatProjectTimeline,
  projectTimelineDateTime
} from '@/features/projects/services/timeline';
import type { ProjectView } from '@/features/projects/types/project';
import { getLocalizedPath } from '@/i18n/utils';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

interface ClientShowcaseMetaProps {
  project: ProjectView;
  lang: LocaleKey;
  labels: ProjectCardLabels;
  className?: string;
}

/**
 * Data-driven text block of a client showcase tile: period, description, topics, credited
 * collaborators and CTAs. The product name lives in the section header, so no title here.
 */
export function ClientShowcaseMeta({ project, lang, labels, className }: ClientShowcaseMetaProps) {
  const detailsHref = getLocalizedPath(`/projects/${project.slug}`, lang);
  const timelineLabel = formatProjectTimeline(project.timeline, lang, {
    present: labels.present
  });

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <time
        className="text-muted-foreground text-xs"
        dateTime={projectTimelineDateTime(project.timeline)}
      >
        {timelineLabel}
      </time>

      <p className="text-foreground/90 text-sm leading-relaxed text-pretty">
        {project.description}
      </p>

      {project.topics.length > 0 ? (
        <ul className="flex flex-wrap gap-1" aria-label={labels.topics}>
          {project.topics.map((topic) => (
            <li key={topic}>
              <Badge variant="outline" className="h-6 rounded-md px-2 text-[11px] font-medium">
                {topic}
              </Badge>
            </li>
          ))}
        </ul>
      ) : null}

      {project.team.length > 0 ? (
        <p className="text-muted-foreground text-xs">
          {TEAM_LABEL[lang]}{' '}
          {project.team.map((member, index) => (
            <span key={member.name}>
              {index > 0 ? ', ' : null}
              {member.url ? (
                <a
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline-offset-2 hover:underline"
                >
                  {member.name}
                </a>
              ) : (
                member.name
              )}{' '}
              ({member.role})
            </span>
          ))}
        </p>
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
