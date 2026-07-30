import { z } from 'zod';
import { PROJECT_IMAGE_STRATEGIES, PROJECT_SECTIONS } from '@/features/projects/constants/sections';

/** `YYYY`, `YYYY-MM`, or open-ended `present`. */
const projectDateTokenSchema = z.union([
  z.literal('present'),
  z.string().regex(/^\d{4}(-\d{2})?$/, 'Use YYYY, YYYY-MM, or present')
]);

export const projectPeriodSchema = z.object({
  start: z.string().regex(/^\d{4}(-\d{2})?$/, 'start must be YYYY or YYYY-MM'),
  end: projectDateTokenSchema
});

export const projectTimelineSchema = z.object({
  periods: z.array(projectPeriodSchema).min(1)
});

export const projectImageSchema = z.object({
  /**
   * How to resolve the cover image.
   * - `github-asset`: search `docs/assets/cover.*` in the repo (see cover candidates)
   * - `placeholder`: always use local placeholder UI
   * - `local`: use `path` under `public/`
   */
  strategy: z.enum(PROJECT_IMAGE_STRATEGIES),
  /** Explicit asset path override (repo-relative for github-asset, public path for local). */
  path: z.string().min(1).optional()
});

export const projectGithubRefSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1)
});

export const projectCatalogEntrySchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be kebab-case'),
  github: projectGithubRefSchema,
  section: z.enum(PROJECT_SECTIONS),
  order: z.number().int().nonnegative(),
  image: projectImageSchema.optional(),
  /** Optional display title override (else README H1 / repo name). */
  title: z.string().min(1).optional(),
  /** Engagement windows shown under the card title. */
  timeline: projectTimelineSchema
});

export const projectCatalogSchema = z
  .array(projectCatalogEntrySchema)
  .superRefine((entries, ctx) => {
    const seen = new Set<string>();
    for (const [index, entry] of entries.entries()) {
      if (seen.has(entry.slug)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate project slug: ${entry.slug}`,
          path: [index, 'slug']
        });
      }
      seen.add(entry.slug);
    }
  });

export type ProjectPeriod = z.infer<typeof projectPeriodSchema>;
export type ProjectTimeline = z.infer<typeof projectTimelineSchema>;
export type ProjectImageConfig = z.infer<typeof projectImageSchema>;
export type ProjectGithubRef = z.infer<typeof projectGithubRefSchema>;
export type ProjectCatalogEntry = z.infer<typeof projectCatalogEntrySchema>;
export type ProjectCatalog = z.infer<typeof projectCatalogSchema>;
