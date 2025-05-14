import { z, defineCollection } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    repo_name: z.string().optional(),
    demo_url: z.string().url().optional(),
    screenshot: z.string().optional(), // Use this website https://shots.so
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    priority: z.number().max(3).default(0),
  }),
});

export const collections = { projects };
