'use client';

import { useRef, type RefObject } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { IN_VIEW_MARGIN } from '@/features/projects/showcase-kit/constants/showcase-motion';

/** Ref to attach to the tile stage and whether the final state should be shown. */
export type RevealOnViewResult = {
  ref: RefObject<HTMLDivElement | null>;
  /** True once the stage entered the viewport (always true under reduced motion). */
  shown: boolean;
  reduced: boolean;
};

/**
 * One-shot reveal for tiles that animate a value (bars, rings, draws) a single time.
 * Reduced motion reports `shown` immediately so the static final state renders.
 */
export function useRevealOnView(): RevealOnViewResult {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });
  const reduced = useReducedMotion() ?? false;
  return { ref, shown: inView || reduced, reduced };
}
