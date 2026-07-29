import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

import {
  THEME_ATTRIBUTE,
  THEME_DEFAULT,
  THEME_STORAGE_KEY
} from '@/features/theme/constants/theme';

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * next-themes provider for Astro React islands.
 * Mount once around any island that calls `useTheme` (e.g. ThemeToggler).
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={THEME_ATTRIBUTE}
      defaultTheme={THEME_DEFAULT}
      enableSystem
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
