import type { ProjectVisibility } from '@/features/projects/constants/content';
import type { ProjectSectionId } from '@/features/projects/constants/sections';
import type {
  ProjectMetric,
  ProjectStackItem,
  ProjectTeamMember,
  ProjectTimeline
} from '@/features/projects/schemas/content';
import type { LocaleKey } from '@/i18n/ui';

/** Call-to-action links; `repoUrl` is null unless the repository is public. */
export type ProjectCtas = {
  siteUrl: string | null;
  repoUrl: string | null;
};

/** Cover optimized through `astro:assets`, serializable for React islands. */
export type ProjectCover = {
  src: string;
  width: number;
  height: number;
};

/**
 * Build-time view of one project: `meta.yaml` + the overview frontmatter of the effective
 * language. Consumed by the landing, cards, showcases and the detail page.
 */
export type ProjectView = {
  slug: string;
  section: ProjectSectionId;
  order: number;
  title: string;
  tagline: string;
  description: string;
  role: string;
  topics: string[];
  keywords: string[];
  metrics: ProjectMetric[];
  timeline: ProjectTimeline;
  visibility: ProjectVisibility;
  anonymized: boolean;
  team: ProjectTeamMember[];
  stack: ProjectStackItem[];
  ctas: ProjectCtas;
  cover: ProjectCover | null;
  /** Dark-theme variant of `cover`; null when the project has only one cover. */
  coverDark: ProjectCover | null;
  /** Language of the overview actually used (after fallback). */
  docLang: LocaleKey;
  /** True when the requested language has no overview and the fallback was used. */
  missingTranslation: boolean;
};
