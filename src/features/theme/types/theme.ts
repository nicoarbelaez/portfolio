import type { ThemeTogglerButtonProps } from '@/components/animate-ui/components/buttons/theme-toggler';
import type { ThemeSelection } from '@/components/animate-ui/primitives/effects/theme-toggler';

export type ThemeMode = ThemeSelection;

export type ThemeTogglerProps = Omit<ThemeTogglerButtonProps, 'modes'> & {
  modes?: readonly ThemeMode[];
};
