import type { TagEnum } from '@/content.config';
import { z } from 'astro:content';

/**
 * Project tags enum - must be kept in sync with content.config.ts
 * 'other' is a special tag for projects without any tags
 */
export type ProjectTag = z.infer<typeof TagEnum> | 'other';

/**
 * Helper to extract unique tags from an array of tag arrays
 */
export function getUniqueTags(tags: (ProjectTag[] | undefined)[]): ProjectTag[] {
  const allTags = tags.flatMap((t) => t || []);
  return [...new Set(allTags)];
}
