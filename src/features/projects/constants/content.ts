/** Content-collection contract constants (see `src/content.config.ts`). */
export const PROJECTS_COLLECTION = 'projects';
export const PROJECT_DOCS_COLLECTION = 'projectDocs';

/** Disk layout of the collections (relative to the repo root). */
export const PROJECTS_CONTENT_BASE = './src/content/projects';
export const PROJECT_META_PATTERN = '*/meta.yaml';
export const PROJECT_DOCS_PATTERN = '*/*.mdx';

/** Document kinds stored as `<slug>/<kind>.<lang>.mdx`. */
export const PROJECT_DOC_KINDS = ['overview', 'technical'] as const;
export type ProjectDocKind = (typeof PROJECT_DOC_KINDS)[number];

/** Language every project must have; other languages fall back to it. */
export const PROJECT_DOC_FALLBACK_LANG = 'es';

export const PROJECT_VISIBILITIES = ['public', 'private'] as const;
export type ProjectVisibility = (typeof PROJECT_VISIBILITIES)[number];

export const PROJECT_STACK_CATEGORIES = [
  'frontend',
  'backend',
  'data',
  'ai',
  'infra',
  'testing',
  'tooling'
] as const;
export type ProjectStackCategory = (typeof PROJECT_STACK_CATEGORIES)[number];

/** `YYYY` or `YYYY-MM`. */
export const PROJECT_DATE_TOKEN_REGEX = /^\d{4}(-\d{2})?$/;
export const PROJECT_DATE_PRESENT = 'present';
export const PROJECT_DATE_FORMAT_MESSAGE = 'Use YYYY or YYYY-MM';

/** Frontmatter limits (S2). */
export const PROJECT_TAGLINE_MAX = 120;
export const PROJECT_DESCRIPTION_MAX = 200;
export const PROJECT_TOPICS_MAX = 8;

/** schema.org type used for the detail page JSON-LD. */
export const PROJECT_JSON_LD_TYPE = 'CreativeWork';
