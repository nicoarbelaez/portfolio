import { LINKS } from '@/constants/link';

export const SOCIAL_DOCK = {
  ICON_SIZE: 40,
  ICON_MAGNIFICATION: 56,
  ICON_DISTANCE: 120
} as const;

export type SocialNetworkId = 'github' | 'linkedin' | 'platzi' | 'instagram';

export type SocialLink = {
  id: SocialNetworkId;
  href: string;
  label: string;
};

/** Display order for the hero social dock. */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'github', href: LINKS.GITHUB, label: 'GitHub' },
  { id: 'linkedin', href: LINKS.LINKEDIN, label: 'LinkedIn' },
  { id: 'platzi', href: LINKS.PLATZI, label: 'Platzi' },
  { id: 'instagram', href: LINKS.INSTAGRAM, label: 'Instagram' }
] as const;
