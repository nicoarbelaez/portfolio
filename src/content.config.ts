import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

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
    skills: z.array(z.string())
  })
});

export const collections = {
  experience
};
