import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import { ThemeProvider } from '@/features/theme/components/ThemeProvider';
import { THEME_MODES } from '@/features/theme/constants/theme';
import type { ThemeTogglerProps } from '@/features/theme/types/theme';
import { cn } from '@/lib/utils';

/**
 * App theme control (Animate UI Theme Toggler).
 * Self-contained island: includes ThemeProvider so it works under Astro `client:*`.
 *
 * @example
 * ```astro
 * <ThemeToggler client:load aria-label={t('nav.theme')} />
 * ```
 */
export function ThemeToggler({
  variant = 'ghost',
  size = 'sm',
  modes = THEME_MODES,
  direction = 'ltr',
  className,
  'aria-label': ariaLabel = 'Toggle theme',
  ...props
}: ThemeTogglerProps) {
  return (
    <ThemeProvider>
      <ThemeTogglerButton
        variant={variant}
        size={size}
        modes={[...modes]}
        direction={direction}
        aria-label={ariaLabel}
        className={cn('border-border bg-background/40', className)}
        {...props}
      />
    </ThemeProvider>
  );
}
