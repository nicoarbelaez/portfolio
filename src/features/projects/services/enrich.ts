import { APIError } from '@/api/handler';
import { fetchRepoCoverAsset, resolveRepoCoverPath } from '@/api/github/assets';
import { getRepoDoc } from '@/api/github/docs';
import { extractMarkdownTitle, getRepository } from '@/api/github/repository';
import { PROJECT_CATALOG } from '@/features/projects/constants/catalog';
import { PROJECT_SECTION_ORDER } from '@/features/projects/constants/sections';
import { buildProjectCtas } from '@/features/projects/services/cta';
import type { ProjectCatalogEntry } from '@/features/projects/schemas/catalog';
import type { EnrichedProject, ResolvedProjectImage } from '@/features/projects/types/project';
import type { LocaleKey } from '@/i18n/ui';

/** Sync fallback used when the network fetch is skipped or the repo fetch already failed. */
function placeholderImage(entry: ProjectCatalogEntry): ResolvedProjectImage {
  const strategy = entry.image?.strategy ?? 'placeholder';

  if (strategy === 'local' && entry.image?.path) {
    return { strategy, src: entry.image.path, discoveredPath: entry.image.path };
  }

  if (strategy === 'github-asset') {
    return { strategy, src: null, discoveredPath: resolveRepoCoverPath(entry.image?.path) };
  }

  return { strategy: 'placeholder', src: null, discoveredPath: null };
}

async function resolveImage(entry: ProjectCatalogEntry): Promise<ResolvedProjectImage> {
  const strategy = entry.image?.strategy ?? 'placeholder';

  if (strategy !== 'github-asset') {
    return placeholderImage(entry);
  }

  const { owner, repo } = entry.github;
  const asset = await fetchRepoCoverAsset({ owner, repo, path: entry.image?.path });

  return {
    strategy,
    src: asset?.downloadUrl ?? null,
    discoveredPath: asset?.path ?? resolveRepoCoverPath(entry.image?.path)
  };
}

async function enrichOne(entry: ProjectCatalogEntry, lang: LocaleKey): Promise<EnrichedProject> {
  const { owner, repo } = entry.github;

  try {
    const [repository, overviewResult, technicalResult, image] = await Promise.all([
      getRepository(owner, repo),
      getRepoDoc(owner, repo, 'readme', lang).catch((error: unknown) => {
        if (error instanceof APIError && error.status === 404) return null;
        throw error;
      }),
      getRepoDoc(owner, repo, 'technical', lang).catch((error: unknown) => {
        if (error instanceof APIError && error.status === 404) return null;
        throw error;
      }),
      resolveImage(entry)
    ]);

    const overview = overviewResult
      ? { path: overviewResult.path, content: overviewResult.content, lang: overviewResult.lang }
      : repository.readme
        ? { path: 'README.md', content: repository.readme, lang: 'es' as const }
        : null;

    const title =
      entry.title ?? (overview ? extractMarkdownTitle(overview.content) : null) ?? repository.title;

    return {
      entry,
      section: entry.section,
      slug: entry.slug,
      title,
      description: repository.description,
      topics: repository.topics,
      private: repository.private,
      ctas: buildProjectCtas({
        homepage: repository.website,
        htmlUrl: repository.htmlUrl,
        isPrivate: repository.private
      }),
      image,
      overview,
      technical: technicalResult
        ? {
            path: technicalResult.path,
            content: technicalResult.content,
            lang: technicalResult.lang
          }
        : null,
      degraded: false
    };
  } catch {
    return {
      entry,
      section: entry.section,
      slug: entry.slug,
      title: entry.title ?? entry.slug,
      description: null,
      topics: [],
      private: true,
      ctas: { siteUrl: null, repoUrl: null },
      image: placeholderImage(entry),
      overview: null,
      technical: null,
      degraded: true
    };
  }
}

/**
 * Build-time enrichment for all catalog entries.
 * Soft-fails per repo via settled promises + catch in `enrichOne`.
 */
export async function enrichProjects(lang: LocaleKey): Promise<EnrichedProject[]> {
  const results = await Promise.all(PROJECT_CATALOG.map((entry) => enrichOne(entry, lang)));

  return results.toSorted((a, b) => {
    const sectionDelta =
      PROJECT_SECTION_ORDER.indexOf(a.section) - PROJECT_SECTION_ORDER.indexOf(b.section);
    if (sectionDelta !== 0) return sectionDelta;
    return a.entry.order - b.entry.order;
  });
}

export function groupProjectsBySection(
  projects: readonly EnrichedProject[]
): Record<(typeof PROJECT_SECTION_ORDER)[number], EnrichedProject[]> {
  const groups = {
    client: [] as EnrichedProject[],
    apps: [] as EnrichedProject[],
    side: [] as EnrichedProject[]
  };

  for (const project of projects) {
    groups[project.section].push(project);
  }

  return groups;
}

export function getCatalogSlugs(): string[] {
  return PROJECT_CATALOG.map((entry) => entry.slug);
}

export function findCatalogEntry(slug: string): ProjectCatalogEntry | undefined {
  return PROJECT_CATALOG.find((entry) => entry.slug === slug);
}
