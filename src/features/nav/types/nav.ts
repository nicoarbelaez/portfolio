import type { LabelKey } from '@/i18n/ui';

export type NavSectionId = 'about' | 'experience' | 'projects' | 'contact';

export type NavSectionLabelKey = Extract<
  LabelKey,
  'nav.about' | 'nav.experience' | 'nav.projects' | 'nav.contact'
>;

export interface NavSection {
  id: NavSectionId;
  href: `#${NavSectionId}`;
  labelKey: NavSectionLabelKey;
  accent?: boolean;
}

export type NavLabels = Record<NavSectionLabelKey, string> & {
  'nav.menu': string;
  'nav.menuClose': string;
};

export type FloatingNavLabels = NavLabels & {
  'nav.language': string;
};
