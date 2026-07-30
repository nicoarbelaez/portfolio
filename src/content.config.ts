import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  EXPERIENCE_AVATAR_STYLE_DEFAULT,
  EXPERIENCE_AVATAR_STYLES
} from '@/features/experience/constants/avatar-style';

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

export const collections = {
  experience
};
