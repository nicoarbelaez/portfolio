'use client';

import { ArrowUpRight, Globe } from 'lucide-react';
import { RiGithubFill } from '@remixicon/react';
import { Badge } from '@/components/ui/badge';
import { BorderBeam } from '@/components/ui/border-beam';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useProjectSharedTransition } from '@/features/projects/hooks/use-project-shared-transition';
import {
  formatProjectTimeline,
  projectTimelineDateTime
} from '@/features/projects/services/timeline';
import type { EnrichedProject } from '@/features/projects/types/project';
import { getLocalizedPath } from '@/i18n/utils';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

export type ProjectCardLabels = {
  site: string;
  repo: string;
  details: string;
  present: string;
};

interface ProjectCardProps {
  project: EnrichedProject;
  lang: LocaleKey;
  labels: ProjectCardLabels;
  /** Visual accent on media (client section). */
  accent?: boolean;
}

export function ProjectCard({ project, lang, labels, accent = false }: ProjectCardProps) {
  const detailsHref = getLocalizedPath(`/projects/${project.slug}`, lang);
  const timelineLabel = formatProjectTimeline(project.entry.timeline, lang, {
    present: labels.present
  });
  const { imageRef, titleRef, reduceMotion, activateSharedTransition } = useProjectSharedTransition(
    project.slug
  );

  return (
    <Card
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-xl py-0 shadow-none',
        'ring-border/70 hover:ring-muted ring-1 transition-all duration-200 ring-inset hover:ring-2'
      )}
    >
      {!reduceMotion ? (
        <>
          <BorderBeam
            duration={6}
            size={400}
            className="via-primary from-transparent to-transparent"
          />
          <BorderBeam
            duration={6}
            delay={3}
            size={400}
            borderWidth={2}
            className="via-chart-2 from-transparent to-transparent"
          />
        </>
      ) : null}

      <div className="relative shrink-0">
        <a
          href={detailsHref}
          onClick={activateSharedTransition}
          className={cn(
            'bg-muted relative block aspect-[16/10] overflow-hidden',
            accent &&
              'before:bg-primary before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1'
          )}
          aria-label={project.title}
        >
          {project.image.src ? (
            <div ref={imageRef} className="size-full">
              <img
                src={project.image.src}
                alt=""
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                loading="lazy"
              />
            </div>
          ) : (
            <div
              ref={imageRef}
              className="from-muted via-background to-secondary/20 flex size-full items-center justify-center bg-gradient-to-br px-6 text-center"
            >
              <span className="text-muted-foreground font-heading text-sm font-medium tracking-wide">
                {project.title}
              </span>
            </div>
          )}
        </a>

        <div className="absolute top-2 right-2 z-10 flex flex-wrap justify-end gap-2">
          {project.ctas.siteUrl ? (
            <a
              href={project.ctas.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'xs' }),
                'bg-foreground text-background hover:bg-foreground/90 gap-1.5 rounded-md border-transparent shadow'
              )}
            >
              <Globe className="size-3" aria-hidden="true" />
              {labels.site}
            </a>
          ) : null}
          {project.ctas.repoUrl ? (
            <a
              href={project.ctas.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'xs' }),
                'bg-foreground text-background hover:bg-foreground/90 gap-1.5 rounded-md border-transparent shadow'
              )}
            >
              <RiGithubFill className="size-3" aria-hidden="true" />
              {labels.repo}
            </a>
          ) : null}
        </div>
      </div>

      <CardContent className="relative z-10 flex flex-1 flex-col gap-3 px-4 pt-4 pb-5 sm:px-6 sm:pt-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 ref={titleRef} className="font-heading text-base font-semibold tracking-tight">
              <a href={detailsHref} onClick={activateSharedTransition} className="hover:underline">
                {project.title}
              </a>
            </h3>
            <time
              className="text-muted-foreground text-xs"
              dateTime={projectTimelineDateTime(project.entry.timeline)}
            >
              {timelineLabel}
            </time>
          </div>
          <a
            href={detailsHref}
            onClick={activateSharedTransition}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring mt-0.5 shrink-0 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
            aria-label={labels.details}
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        {project.description ? (
          <p className="text-muted-foreground flex-1 text-xs leading-relaxed text-pretty">
            {project.description}
          </p>
        ) : null}

        {project.topics.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-1" aria-label="Topics">
            {project.topics.slice(0, 8).map((topic) => (
              <li key={topic}>
                <Badge
                  variant="outline"
                  className="bg-background h-6 w-fit rounded-md px-2 text-[11px] font-medium"
                >
                  {topic}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}
