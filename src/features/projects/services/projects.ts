import { getImage } from 'astro:assets';
import { getCollection, type CollectionEntry } from 'astro:content';
import {
  PROJECT_COVER_FORMAT,
  PROJECT_COVER_WIDTH,
  PROJECT_DOC_FALLBACK_LANG,
  PROJECT_DOCS_COLLECTION,
  PROJECTS_COLLECTION,
  type ProjectDocKind
} from '@/features/projects/constants/content';
import {
  PROJECT_SECTION_ORDER,
  type ProjectSectionId
} from '@/features/projects/constants/sections';
import {
  projectOverviewFrontmatterSchema,
  type ProjectMeta,
  type ProjectOverviewFrontmatter
} from '@/features/projects/schemas/content';
import { buildProjectCtas } from '@/features/projects/services/cta';
import type { ProjectCover, ProjectView } from '@/features/projects/types/project';
import type { LocaleKey } from '@/i18n/ui';

/** A resolved MDX document plus the language it was actually found in. */
export type ProjectDocRef = {
  entry: CollectionEntry<'projectDocs'>;
  lang: LocaleKey;
  /** True when the requested language was missing and the fallback language was used. */
  missingTranslation: boolean;
};

const docId = (slug: string, kind: ProjectDocKind, lang: LocaleKey) => `${slug}/${kind}.${lang}`;

function findDoc(
  docs: readonly CollectionEntry<'projectDocs'>[],
  slug: string,
  kind: ProjectDocKind,
  lang: LocaleKey
): ProjectDocRef | null {
  const requested = docs.find((doc) => doc.id === docId(slug, kind, lang));
  if (requested) return { entry: requested, lang, missingTranslation: false };

  const fallback = docs.find((doc) => doc.id === docId(slug, kind, PROJECT_DOC_FALLBACK_LANG));
  if (!fallback) return null;

  return {
    entry: fallback,
    lang: PROJECT_DOC_FALLBACK_LANG,
    missingTranslation: lang !== PROJECT_DOC_FALLBACK_LANG
  };
}

function parseOverview(ref: ProjectDocRef): ProjectOverviewFrontmatter {
  const result = projectOverviewFrontmatterSchema.safeParse(ref.entry.data);
  if (!result.success) {
    throw new Error(
      `[${PROJECT_DOCS_COLLECTION}] invalid overview frontmatter in "${ref.entry.id}": ${result.error.message}`
    );
  }
  return result.data;
}

async function resolveCover(cover: ProjectMeta['cover']): Promise<ProjectCover | null> {
  if (!cover) return null;
  const image = await getImage({
    src: cover,
    width: PROJECT_COVER_WIDTH,
    format: PROJECT_COVER_FORMAT
  });
  return {
    src: image.src,
    width: Number(image.attributes.width ?? PROJECT_COVER_WIDTH),
    height: Number(image.attributes.height ?? 0)
  };
}

async function toView(
  slug: string,
  meta: ProjectMeta,
  docs: readonly CollectionEntry<'projectDocs'>[],
  lang: LocaleKey
): Promise<ProjectView> {
  const overview = findDoc(docs, slug, 'overview', lang);
  if (!overview) {
    throw new Error(
      `[${PROJECTS_COLLECTION}] "${slug}" has no ${docId(slug, 'overview', PROJECT_DOC_FALLBACK_LANG)}.mdx`
    );
  }
  const front = parseOverview(overview);

  return {
    slug,
    section: meta.section,
    order: meta.order,
    title: front.title,
    tagline: front.tagline,
    description: front.description,
    role: front.role,
    topics: front.topics,
    keywords: front.keywords,
    metrics: front.metrics ?? [],
    timeline: { periods: meta.periods },
    visibility: meta.visibility,
    anonymized: meta.anonymized ?? false,
    team: meta.team ?? [],
    stack: meta.stack,
    ctas: buildProjectCtas(meta.links, meta.visibility),
    cover: await resolveCover(meta.cover),
    docLang: overview.lang,
    missingTranslation: overview.missingTranslation
  };
}

/**
 * Active (non-archived) projects for `lang`, sorted by section order then `order`.
 * Missing translations fall back to Spanish and set `missingTranslation`.
 */
export async function getActiveProjects(lang: LocaleKey): Promise<ProjectView[]> {
  const [projects, docs] = await Promise.all([
    getCollection(PROJECTS_COLLECTION, ({ data }) => !data.archived),
    getCollection(PROJECT_DOCS_COLLECTION)
  ]);

  const views = await Promise.all(
    projects.map((project) => toView(project.id, project.data, docs, lang))
  );

  return views.toSorted((a, b) => {
    const sectionDelta =
      PROJECT_SECTION_ORDER.indexOf(a.section) - PROJECT_SECTION_ORDER.indexOf(b.section);
    return sectionDelta !== 0 ? sectionDelta : a.order - b.order;
  });
}

/** Slugs of every active project (for `getStaticPaths`). */
export async function getActiveProjectSlugs(): Promise<string[]> {
  const projects = await getCollection(PROJECTS_COLLECTION, ({ data }) => !data.archived);
  return projects.map((project) => project.id);
}

/** One active project view, or `undefined` when the slug is unknown or archived. */
export async function getProjectBySlug(
  slug: string,
  lang: LocaleKey
): Promise<ProjectView | undefined> {
  const projects = await getActiveProjects(lang);
  return projects.find((project) => project.slug === slug);
}

/** MDX document for a project with Spanish fallback; `null` when no language exists. */
export async function getProjectDoc(
  slug: string,
  kind: ProjectDocKind,
  lang: LocaleKey
): Promise<ProjectDocRef | null> {
  const docs = await getCollection(PROJECT_DOCS_COLLECTION, ({ id }) => id.startsWith(`${slug}/`));
  return findDoc(docs, slug, kind, lang);
}

/** Groups projects by section, preserving their order. */
export function groupProjectsBySection(
  projects: readonly ProjectView[]
): Record<ProjectSectionId, ProjectView[]> {
  const groups: Record<ProjectSectionId, ProjectView[]> = { client: [], apps: [], side: [] };
  for (const project of projects) groups[project.section].push(project);
  return groups;
}
