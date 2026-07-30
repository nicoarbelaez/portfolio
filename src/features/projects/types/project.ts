import type { LocaleKey } from '@/i18n/ui';
import type { ProjectCatalogEntry } from '@/features/projects/schemas/catalog';
import type { ProjectSectionId } from '@/features/projects/constants/sections';

/** Locale-aware markdown document fetched from GitHub. */
export type ProjectDoc = {
  path: string;
  content: string;
  /** Effective language after fallback (Badge when !== requested). */
  lang: LocaleKey;
};

/** Resolved image for UI (MVP: placeholder until asset fetch is wired). */
export type ResolvedProjectImage = {
  strategy: 'github-asset' | 'placeholder' | 'local';
  /** Public URL or null when using placeholder UI. */
  src: string | null;
  /** Repo-relative path that would be used once assets ship. */
  discoveredPath: string | null;
};

export type ProjectCtas = {
  siteUrl: string | null;
  /** Null when repo is private or URL unavailable. */
  repoUrl: string | null;
};

/** Build-time enriched project for home cards and detail pages. */
export type EnrichedProject = {
  entry: ProjectCatalogEntry;
  section: ProjectSectionId;
  slug: string;
  title: string;
  description: string | null;
  topics: string[];
  private: boolean;
  ctas: ProjectCtas;
  image: ResolvedProjectImage;
  overview: ProjectDoc | null;
  technical: ProjectDoc | null;
  /** True when enrichment failed soft for this repo. */
  degraded: boolean;
};
