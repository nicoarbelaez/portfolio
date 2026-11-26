import type { ProjectVisibility } from '@/features/projects/constants/content';
import type { ProjectMeta } from '@/features/projects/schemas/content';
import type { ProjectCtas } from '@/features/projects/types/project';

/**
 * CTA visibility rules:
 * - Site/demo whenever `links.site` is set
 * - Repo only when the project is public (private projects never expose a repo link)
 */
export function buildProjectCtas(
  links: ProjectMeta['links'],
  visibility: ProjectVisibility
): ProjectCtas {
  return {
    siteUrl: links?.site ?? null,
    repoUrl: visibility === 'public' ? (links?.repo ?? null) : null
  };
}
