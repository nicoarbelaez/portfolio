'use client';

import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger
} from '@/components/animate-ui/components/animate/tabs';
import { ProjectCard, type ProjectCardLabels } from '@/features/projects/components/ProjectCard';
import {
  PROJECT_GRID_OVERFLOW_GUTTER_CLASS,
  PROJECT_TABS_STICKY_TOP_CLASS
} from '@/features/projects/constants/sections';
import { NAV_SECTION_SCROLL_MARGIN_CLASS } from '@/features/nav/constants/sections';
import { HOME_SECTION_STACK_CLASS } from '@/constants/home-layout';
import type { EnrichedProject } from '@/features/projects/types/project';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

const TAB_CLIENT = 'client';
const TAB_SIDE = 'side';

interface ProjectsShowcaseProps {
  lang: LocaleKey;
  groups: {
    client: EnrichedProject[];
    side: EnrichedProject[];
  };
  labels: {
    client: string;
    side: string;
    nav: string;
    headline: string;
    subtext: string;
    card: ProjectCardLabels;
  };
}

function ProjectGrid({
  projects,
  lang,
  cardLabels,
  accent = false
}: {
  projects: EnrichedProject[];
  lang: LocaleKey;
  cardLabels: ProjectCardLabels;
  accent?: boolean;
}) {
  if (projects.length === 0) return null;

  return (
    <div
      className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2', PROJECT_GRID_OVERFLOW_GUTTER_CLASS)}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          lang={lang}
          labels={cardLabels}
          accent={accent}
        />
      ))}
    </div>
  );
}

/** Client + personal projects (tabs). Apps live in AppsShowcase. */
export function ProjectsShowcase({ lang, groups, labels }: ProjectsShowcaseProps) {
  const hasClientTab = groups.client.length > 0;
  const hasSideTab = groups.side.length > 0;
  const defaultTab = hasClientTab ? TAB_CLIENT : TAB_SIDE;

  if (!hasClientTab && !hasSideTab) return null;

  return (
    <section
      id="projects"
      aria-label={labels.nav}
      className={cn('w-full', HOME_SECTION_STACK_CLASS, NAV_SECTION_SCROLL_MARGIN_CLASS)}
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <Badge
          variant="default"
          className="bg-foreground text-background hover:bg-foreground rounded-full px-3 py-1 text-xs tracking-wide"
        >
          {labels.nav}
        </Badge>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          {labels.headline}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed text-pretty md:text-base">
          {labels.subtext}
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full gap-8">
        <div
          className={cn(
            'z-40 flex justify-center py-2',
            'max-md:bg-background/80 max-md:sticky max-md:backdrop-blur-md',
            'max-md:supports-[backdrop-filter]:bg-background/70',
            'md:static md:bg-transparent md:py-0',
            PROJECT_TABS_STICKY_TOP_CLASS
          )}
        >
          <TabsList className={cn(!hasClientTab || !hasSideTab ? 'hidden' : undefined)}>
            {hasClientTab ? <TabsTrigger value={TAB_CLIENT}>{labels.client}</TabsTrigger> : null}
            {hasSideTab ? <TabsTrigger value={TAB_SIDE}>{labels.side}</TabsTrigger> : null}
          </TabsList>
        </div>

        <TabsContents>
          {hasClientTab ? (
            <TabsContent value={TAB_CLIENT}>
              <ProjectGrid projects={groups.client} lang={lang} cardLabels={labels.card} accent />
            </TabsContent>
          ) : null}

          {hasSideTab ? (
            <TabsContent value={TAB_SIDE}>
              <ProjectGrid projects={groups.side} lang={lang} cardLabels={labels.card} />
            </TabsContent>
          ) : null}
        </TabsContents>
      </Tabs>
    </section>
  );
}
