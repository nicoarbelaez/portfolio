import type { ProjectCatalog } from '@/features/projects/schemas/catalog';
import { projectCatalogSchema } from '@/features/projects/schemas/catalog';

/**
 * Curated projects catalog — GitHub is the source of truth for copy/docs.
 * Timelines are curated here (start/end engagement windows).
 */
const RAW_PROJECT_CATALOG = [
  // —— Client ——
  {
    slug: 'danystortas',
    github: { owner: 'nicoarbelaez', repo: 'danystortas' },
    section: 'client',
    order: 1,
    title: 'Danys Tortas',
    image: { strategy: 'github-asset' },
    timeline: { periods: [{ start: '2026-02', end: 'present' }] }
  },
  {
    slug: 'invictus',
    github: { owner: 'nicoarbelaez', repo: 'invictus' },
    section: 'client',
    order: 2,
    title: 'Invictus Joyas',
    image: { strategy: 'github-asset' },
    timeline: { periods: [{ start: '2026-06', end: 'present' }] }
  },
  {
    slug: 'defi',
    github: { owner: 'nicoarbelaez', repo: 'defi' },
    section: 'client',
    order: 3,
    title: 'DeFi',
    image: { strategy: 'github-asset' },
    timeline: {
      periods: [{ start: '2024-08', end: '2025-01' }]
    }
  },

  // —— Apps ——
  {
    slug: 'mecateo',
    github: { owner: 'nicoarbelaez', repo: 'mecateo' },
    section: 'apps',
    order: 1,
    title: 'Mecateo',
    image: { strategy: 'github-asset' },
    timeline: { periods: [{ start: '2026', end: 'present' }] }
  },

  // —— Side ——
  {
    slug: 'readia',
    github: { owner: 'nicoarbelaez', repo: 'readia' },
    section: 'side',
    order: 1,
    title: 'ReadIA',
    image: { strategy: 'github-asset' },
    timeline: {
      periods: [
        { start: '2025-08', end: '2025-11' },
        { start: '2026-02', end: 'present' }
      ]
    }
  },
  {
    slug: 'living-sports',
    github: { owner: 'nicoarbelaez', repo: 'living-sports-app' },
    section: 'side',
    order: 2,
    title: 'Living Sports',
    image: { strategy: 'github-asset' },
    timeline: { periods: [{ start: '2026-02', end: '2026-06' }] }
  },
  {
    slug: 'appsalon',
    github: { owner: 'nicoarbelaez', repo: 'appsalon' },
    section: 'side',
    order: 3,
    title: 'AppSalon',
    image: { strategy: 'github-asset' },
    timeline: { periods: [{ start: '2026-02', end: '2026-06' }] }
  }
] as const satisfies ProjectCatalog;

/** Validated catalog (throws at import if invalid). */
export const PROJECT_CATALOG: ProjectCatalog = projectCatalogSchema.parse(RAW_PROJECT_CATALOG);
