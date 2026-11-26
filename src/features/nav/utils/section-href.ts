/**
 * Href of a home section that works from any page: `/#about`, `/es#about`.
 * A bare `#about` resolves against the current route (`/cv#about`), which has no such section.
 */
export function sectionHref(homePath: string, hash: string): string {
  return `${homePath}${hash}`;
}
