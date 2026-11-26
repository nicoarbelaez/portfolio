'use client';

import { SectionHeader } from '@/components/ui/section-header';
import { HOME_SECTION_STACK_CLASS } from '@/constants/home-layout';
import { ProjectCard, type ProjectCardLabels } from '@/features/projects/components/ProjectCard';
import { PROJECT_SHOWCASES } from '@/features/projects/components/showcase-registry';
import { PROJECT_GRID_OVERFLOW_GUTTER_CLASS } from '@/features/projects/constants/sections';
import type { ProjectView } from '@/features/projects/types/project';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

interface ProjectShowcaseBlockProps {
  lang: LocaleKey;
  /** Section header pill; omit when a parent (tabs) already labels the block. */
  label?: string;
  projects: ProjectView[];
  cardLabels: ProjectCardLabels;
  /** Accent strip on fallback cards (client section). */
  accent?: boolean;
}

type Block = { kind: 'showcase'; project: ProjectView } | { kind: 'grid'; projects: ProjectView[] };

/** Keeps catalog `order`: custom showcases stand alone, consecutive plain projects share a grid. */
function toBlocks(projects: readonly ProjectView[]): Block[] {
  const blocks: Block[] = [];

  for (const project of projects) {
    if (PROJECT_SHOWCASES[project.slug]) {
      blocks.push({ kind: 'showcase', project });
      continue;
    }
    const last = blocks.at(-1);
    if (last?.kind === 'grid') last.projects.push(project);
    else blocks.push({ kind: 'grid', projects: [project] });
  }

  return blocks;
}

/**
 * Section body shared by client projects, apps and side projects: header + one block per
 * project (custom showcase if registered, otherwise `ProjectCard` grid).
 */
export function ProjectShowcaseBlock({
  lang,
  label,
  projects,
  cardLabels,
  accent = false
}: ProjectShowcaseBlockProps) {
  if (projects.length === 0) return null;

  return (
    <div className={cn('w-full', HOME_SECTION_STACK_CLASS)}>
      {label ? <SectionHeader label={label} /> : null}
      {toBlocks(projects).map((block) => {
        if (block.kind === 'showcase') {
          const Showcase = PROJECT_SHOWCASES[block.project.slug];
          return Showcase ? (
            <Showcase
              key={block.project.slug}
              project={block.project}
              lang={lang}
              labels={cardLabels}
            />
          ) : null;
        }
        return (
          <div
            key={block.projects.map((project) => project.slug).join('+')}
            className={cn(
              'grid grid-cols-1 gap-5 sm:grid-cols-2',
              PROJECT_GRID_OVERFLOW_GUTTER_CLASS
            )}
          >
            {block.projects.map((project) => (
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
      })}
    </div>
  );
}
