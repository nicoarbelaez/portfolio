import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import {
  EXPERIENCE_AVATAR_STYLE_DEFAULT,
  EXPERIENCE_AVATAR_STYLES
} from '@/features/experience/constants/avatar-style';
import {
  PROJECT_DOCS_PATTERN,
  PROJECT_META_PATTERN,
  PROJECTS_CONTENT_BASE
} from '@/features/projects/constants/content';
import {
  createProjectMetaSchema,
  projectDocFrontmatterSchema
} from '@/features/projects/schemas/content';

const stripExt = ({ entry }: { entry: string }) => entry.replace(/\.[^./\\]+$/, '');

const experience = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/experience',
    generateId: stripExt
  }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    logoKey: z.enum(['davivienda']),
    /** `default` = circular + border; `none` = no border chrome. */
    avatarStyle: z.enum(EXPERIENCE_AVATAR_STYLES).default(EXPERIENCE_AVATAR_STYLE_DEFAULT),
    skills: z.array(z.string())
  })
});

/** Folder slug is the project id: `danystortas/meta.yaml` → `danystortas`. */
const projectSlugFromEntry = ({ entry }: { entry: string }) => entry.split('/')[0] ?? entry;

const projects = defineCollection({
  loader: glob({
    pattern: PROJECT_META_PATTERN,
    base: PROJECTS_CONTENT_BASE,
    generateId: projectSlugFromEntry
  }),
  schema: ({ image }) => createProjectMetaSchema(image)
});

/** `<slug>/<kind>.<lang>.mdx` → id `<slug>/<kind>.<lang>`. */
const projectDocs = defineCollection({
  loader: glob({
    pattern: PROJECT_DOCS_PATTERN,
    base: PROJECTS_CONTENT_BASE,
    generateId: stripExt
  }),
  schema: projectDocFrontmatterSchema
});

export const collections = {
  experience,
  projects,
  projectDocs
};
