import type { ProjectCtas } from '@/features/projects/types/project';

/**
 * Home/detail CTA visibility rules:
 * - Site/demo when homepage is present
 * - Repo only when the GitHub repo is public
 * - Private + no homepage → both null (no CTA buttons)
 */
export function buildProjectCtas(input: {
  homepage: string | null | undefined;
  htmlUrl: string;
  isPrivate: boolean;
}): ProjectCtas {
  const siteUrl = input.homepage?.trim() ? input.homepage.trim() : null;
  const repoUrl = input.isPrivate ? null : input.htmlUrl;

  return { siteUrl, repoUrl };
}
