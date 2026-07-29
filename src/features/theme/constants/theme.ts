import type { ThemeSelection } from '@/components/animate-ui/primitives/effects/theme-toggler';

/** localStorage key used by next-themes */
export const THEME_STORAGE_KEY = 'portfolio-theme';

/** Matches Tailwind `@custom-variant dark` (class on `<html>`) */
export const THEME_ATTRIBUTE = 'class' as const;

export const THEME_DEFAULT = 'system' as const satisfies ThemeSelection;

/** Prefer OS preference, then allow explicit light/dark */
export const THEME_MODES = ['system', 'light', 'dark'] as const satisfies readonly ThemeSelection[];
