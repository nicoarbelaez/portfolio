import type { SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import {
  PROJECT_DATE_FORMAT_MESSAGE,
  PROJECT_DATE_PRESENT,
  PROJECT_DATE_TOKEN_REGEX,
  PROJECT_DESCRIPTION_MAX,
  PROJECT_STACK_CATEGORIES,
  PROJECT_TAGLINE_MAX,
  PROJECT_TOPICS_MAX,
  PROJECT_VISIBILITIES
} from '@/features/projects/constants/content';
import { PROJECT_SECTIONS } from '@/features/projects/constants/sections';

const dateTokenSchema = z.string().regex(PROJECT_DATE_TOKEN_REGEX, PROJECT_DATE_FORMAT_MESSAGE);

/** One engagement window: `start` is `YYYY`/`YYYY-MM`, `end` also accepts `present`. */
export const projectPeriodSchema = z.object({
  start: dateTokenSchema,
  end: z.union([z.literal(PROJECT_DATE_PRESENT), dateTokenSchema])
});

export const projectTimelineSchema = z.object({
  periods: z.array(projectPeriodSchema).min(1)
});

export const projectTeamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  url: z.url().optional()
});

export const projectStackItemSchema = z.object({
  name: z.string().min(1),
  category: z.enum(PROJECT_STACK_CATEGORIES),
  version: z.string().min(1).optional()
});

export const projectMetricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  context: z.string().min(1).optional()
});

/**
 * Language-neutral `meta.yaml`. A factory because `cover` needs the collection's `image()` helper.
 * @param image `image` from the collection schema context.
 */
export function createProjectMetaSchema(image: SchemaContext['image']) {
  return z.object({
    section: z.enum(PROJECT_SECTIONS),
    order: z.number().int().nonnegative(),
    /** Archived projects stay on disk but render nowhere (no card, page or OG image). */
    archived: z.boolean().optional(),
    periods: z.array(projectPeriodSchema).min(1),
    visibility: z.enum(PROJECT_VISIBILITIES),
    anonymized: z.boolean().optional(),
    links: z
      .object({
        site: z.url().optional(),
        /** Only for public repositories. */
        repo: z.url().optional()
      })
      .optional(),
    /** Collaborators credited on the project; the owner is implicit. */
    team: z.array(projectTeamMemberSchema).optional(),
    stack: z.array(projectStackItemSchema).min(1),
    /** Light cover (1200x630). Generated: docs/design-system/README.md#project-covers. */
    cover: image().optional(),
    /** Dark-theme variant of `cover`. */
    coverDark: image().optional()
  });
}

/** `overview.<lang>.mdx` frontmatter. */
export const projectOverviewFrontmatterSchema = z.object({
  title: z.string().min(1),
  tagline: z.string().min(1).max(PROJECT_TAGLINE_MAX),
  description: z.string().min(1).max(PROJECT_DESCRIPTION_MAX),
  role: z.string().min(1),
  topics: z.array(z.string().min(1)).max(PROJECT_TOPICS_MAX),
  keywords: z.array(z.string().min(1)),
  metrics: z.array(projectMetricSchema).optional()
});

/** `technical.<lang>.mdx` frontmatter. */
export const projectTechnicalFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

/**
 * Collection-level schema for `projectDocs`: overview-only keys are optional because both kinds
 * share one collection. `getProjectDoc` re-validates overviews with the strict schema.
 */
export const projectDocFrontmatterSchema = projectOverviewFrontmatterSchema
  .partial()
  .extend(projectTechnicalFrontmatterSchema.shape);

export type ProjectPeriod = z.infer<typeof projectPeriodSchema>;
export type ProjectTimeline = z.infer<typeof projectTimelineSchema>;
export type ProjectTeamMember = z.infer<typeof projectTeamMemberSchema>;
export type ProjectStackItem = z.infer<typeof projectStackItemSchema>;
export type ProjectMetric = z.infer<typeof projectMetricSchema>;
export type ProjectMeta = z.infer<ReturnType<typeof createProjectMetaSchema>>;
export type ProjectOverviewFrontmatter = z.infer<typeof projectOverviewFrontmatterSchema>;
export type ProjectTechnicalFrontmatter = z.infer<typeof projectTechnicalFrontmatterSchema>;
