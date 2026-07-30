import { cn } from '@/lib/utils';

/** Visual treatment for the experience timeline company mark. */
export const EXPERIENCE_AVATAR_STYLES = ['default', 'none'] as const;

export type ExperienceAvatarStyle = (typeof EXPERIENCE_AVATAR_STYLES)[number];

export const EXPERIENCE_AVATAR_STYLE_DEFAULT: ExperienceAvatarStyle = 'default';

/** Shell classes around the logo image (compose with size via `cn`). */
export function experienceAvatarClassName(
  style: ExperienceAvatarStyle = EXPERIENCE_AVATAR_STYLE_DEFAULT,
  className?: string
): string {
  return cn(
    'relative z-10 flex shrink-0 items-center justify-center',
    style === 'default' && 'overflow-hidden rounded-full border border-border bg-card shadow-sm',
    style === 'none' && 'overflow-visible bg-transparent',
    className
  );
}
