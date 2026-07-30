import type { NavSection } from '@/features/nav/types/nav';

/**
 * In-page section anchors — order matches home layout:
 * about → projects → apps → experience → contact.
 */
export const NAV_SECTIONS: readonly NavSection[] = [
  { id: 'about', href: '#about', labelKey: 'nav.about' },
  { id: 'projects', href: '#projects', labelKey: 'nav.projects' },
  { id: 'apps', href: '#apps', labelKey: 'nav.apps' },
  { id: 'experience', href: '#experience', labelKey: 'nav.experience' },
  { id: 'contact', href: '#contact', labelKey: 'nav.contact', accent: true }
] as const;

/** Offset under FloatingNav for hash scroll targets. */
export const NAV_SECTION_SCROLL_MARGIN_CLASS = 'scroll-mt-24';
