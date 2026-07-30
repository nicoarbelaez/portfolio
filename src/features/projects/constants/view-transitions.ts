/**
 * Shared View Transition names for project card ↔ detail morphs.
 * Apply names only on the active card (click) — naming the whole grid
 * creates unmatched exits that look like a sideways slide.
 *
 * Astro detail: `transition:name={...}`
 * React card: set `element.style.viewTransitionName` on navigate click
 *
 * @see https://docs.astro.build/en/guides/view-transitions/
 */
export const PROJECT_VT_SESSION_KEY = 'portfolio:project-vt';

export function projectImageTransitionName(slug: string): string {
  return `project-image-${slug}`;
}

export function projectTitleTransitionName(slug: string): string {
  return `project-title-${slug}`;
}
