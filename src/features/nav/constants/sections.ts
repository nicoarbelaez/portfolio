import type { NavSection } from '@/features/nav/types/nav';

/** In-page section anchors for the portfolio nav. */
export const NAV_SECTIONS: readonly NavSection[] = [
  { id: 'about', href: '#about', labelKey: 'nav.about' },
  { id: 'experience', href: '#experience', labelKey: 'nav.experience' },
  { id: 'projects', href: '#projects', labelKey: 'nav.projects' },
  { id: 'contact', href: '#contact', labelKey: 'nav.contact', accent: true }
] as const;
