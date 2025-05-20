import { z, defineCollection, reference } from 'astro:content';

const projectsMeta = defineCollection({
  type: 'data',
  schema: z.object({
    stack: z.array(z.string()).optional(),
    repo_url: z.union([z.string().url(), z.literal('')]).optional(),
    demo_url: z.string().url().optional(),
    screenshot: z.string().optional(), // Use this website https://shots.so
    priority: z.number().max(3).default(0)
  })
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    meta: reference('projects-meta')
  })
});

export const collections = {
  'projects-meta': projectsMeta,
  projects
};
