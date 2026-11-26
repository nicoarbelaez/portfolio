import type { ComponentType } from 'react';
import type { ProjectCardLabels } from '@/features/projects/components/ProjectCard';
import type { EnrichedProject } from '@/features/projects/types/project';
import type { LocaleKey } from '@/i18n/ui';

/** Props every custom project showcase receives. Showcases may declare only the subset they use. */
export type ProjectShowcaseProps = {
  project: EnrichedProject;
  lang: LocaleKey;
  labels: ProjectCardLabels;
};

export type ProjectShowcaseComponent = ComponentType<ProjectShowcaseProps>;
