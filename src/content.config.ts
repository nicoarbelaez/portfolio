import { z, defineCollection, reference } from 'astro:content';

const projectsMeta = defineCollection({
  type: 'data',
  schema: z.object({
    stack: z.array(z.string()).optional(),
    repo_url: z.union([z.string().url(), z.literal('')]).optional(),
    demo_url: z.string().url().optional(),
    screenshot: z.string().optional(), // Use this website https://shots.so
    priority: z.number().max(5).default(0),
    show_repo: z.boolean().default(true),
    date: z
      .string()
      .optional()
      .refine(
        (s) => s === undefined || /^\d{4}-\d{2}-\d{2}$/.test(s),
        'La fecha debe estar en formato YYYY-MM-DD'
      )
      .transform((s) => {
        if (!s) return undefined;
        const [year, month, day] = s.split('-').map(Number);
        return new Date(year, month - 1, day);
      })
  })
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    meta: reference('projects-meta')
  })
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    skills: z.array(z.string())
  })
});

export const collections = {
  'projects-meta': projectsMeta,
  projects,
  experience
};
