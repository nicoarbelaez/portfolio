import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    repo_url: z.string().optional(),
    demo_url: z.string().url().optional(),
    screenshot: z.string().optional(), // Use this website https://shots.so
    priority: z.number().max(3).default(0)
  })
});

export const collections = { projects };
