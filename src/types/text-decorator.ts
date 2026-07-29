import type { AnnotationAction } from '@/components/ui/highlighter';

/** Marks supported by Magic UI Highlighter / rough-notation. */
export type TextDecoratorMark = AnnotationAction;

/** Portable segment — reuse in i18n, CMS, or any copy source. */
export type TextDecoratorSegment = {
  text: string;
  mark?: TextDecoratorMark;
};
