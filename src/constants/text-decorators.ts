import type { TextDecoratorMark } from '@/types/text-decorator';

/** Shared rough-notation defaults for all decorated text. */
export const TEXT_DECORATOR_MOTION = {
  ANIMATION_DURATION_MS: 600,
  ITERATIONS: 2,
  STROKE_WIDTH: 1.5,
  PADDING_PX: 4
} as const;

export type TextDecoratorStyle = {
  /** Stroke / fill color for the annotation. */
  color: string;
  /** Theme-aware text classes applied to the marked span. */
  textClassName?: string;
};

const FALLBACK_DECORATOR_STYLE: TextDecoratorStyle = {
  color: '#bef264'
};

/**
 * Visual registry per mark — extend here to restyle or add marks site-wide.
 * Highlight uses `dark:text-secondary` so the stroke stays readable on dark surfaces.
 */
export const TEXT_DECORATOR_STYLES = {
  highlight: {
    color: '#84cc16',
    textClassName: 'dark:text-secondary'
  }
} as const satisfies Partial<Record<TextDecoratorMark, TextDecoratorStyle>>;

export function getTextDecoratorStyle(mark: TextDecoratorMark): TextDecoratorStyle {
  const styles = TEXT_DECORATOR_STYLES as Partial<Record<TextDecoratorMark, TextDecoratorStyle>>;
  return styles[mark] ?? FALLBACK_DECORATOR_STYLE;
}
