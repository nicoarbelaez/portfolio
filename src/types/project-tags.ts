/**
 * Canonical list of project tags in desired order
 */
export const PROJECT_TAGS = ['production', 'projects', 'practices'] as const;

/**
 * Type representing a valid project tag from the list
 */
export type CoreProjectTag = (typeof PROJECT_TAGS)[number];

/**
 * Full project tag type including 'other'
 */
export type ProjectTag = CoreProjectTag | 'other' | 'all';

/**
 * Display order for tags in tabs
 */
export const TAG_ORDER: ProjectTag[] = ['all', ...PROJECT_TAGS, 'other'];

/**
 * Helper to extract unique tags from an array of tag arrays
 */
export function getUniqueTags(tags: (ProjectTag[] | undefined)[]): ProjectTag[] {
  const allTags = tags.flatMap((t) => t || []);
  return [...new Set(allTags)];
}
