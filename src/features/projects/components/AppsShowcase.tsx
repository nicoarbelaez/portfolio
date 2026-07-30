'use client';

import { SectionHeader } from '@/components/ui/section-header';
import { MECATEO_SLUG } from '@/features/projects/apps/mecateo/constants';
import { MecateoShowcase } from '@/features/projects/apps/mecateo/MecateoShowcase';
import { ProjectCard, type ProjectCardLabels } from '@/features/projects/components/ProjectCard';
import { PROJECT_GRID_OVERFLOW_GUTTER_CLASS } from '@/features/projects/constants/sections';
import { NAV_SECTION_SCROLL_MARGIN_CLASS } from '@/features/nav/constants/sections';
import { HOME_SECTION_STACK_CLASS } from '@/constants/home-layout';
import type { EnrichedProject } from '@/features/projects/types/project';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

interface AppsShowcaseProps {
  lang: LocaleKey;
  projects: EnrichedProject[];
  labels: {
    apps: string;
    card: ProjectCardLabels;
  };
}

/** Standalone Apps section — same vertical rhythm as other home sections. */
export function AppsShowcase({ lang, projects, labels }: AppsShowcaseProps) {
  if (projects.length === 0) return null;

  const otherApps = projects.filter((project) => project.slug !== MECATEO_SLUG);
  const hasMecateo = projects.some((project) => project.slug === MECATEO_SLUG);

  return (
    <section
      id="apps"
      aria-label={labels.apps}
      className={cn('w-full', HOME_SECTION_STACK_CLASS, NAV_SECTION_SCROLL_MARGIN_CLASS)}
    >
      <SectionHeader label={labels.apps} />
      {hasMecateo ? <MecateoShowcase lang={lang} /> : null}
      {otherApps.length > 0 ? (
        <div
          className={cn(
            'grid grid-cols-1 gap-5 sm:grid-cols-2',
            PROJECT_GRID_OVERFLOW_GUTTER_CLASS
          )}
        >
          {otherApps.map((project) => (
            <ProjectCard key={project.slug} project={project} lang={lang} labels={labels.card} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
