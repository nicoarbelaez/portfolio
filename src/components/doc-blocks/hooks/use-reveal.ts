import { useEffect, useState } from 'react';
import { useReducedMotion, type Variants } from 'motion/react';

import { useIsInView } from '@/hooks/use-is-in-view';
import {
  DOC_BLOCK_EASE,
  MAX_STAGGERED_ITEMS,
  MS_PER_SECOND,
  REVEAL_DURATION_S,
  REVEAL_OFFSET_PX,
  REVEAL_STAGGER_S,
  REVEAL_START_SCALE,
  REVEAL_VIEW_MARGIN
} from '../constants/doc-block-motion';

/** Item variants: `custom` is the item index and drives the stagger. */
export const REVEAL_VARIANTS: Variants = {
  hide: {
    opacity: 0,
    y: REVEAL_OFFSET_PX,
    scale: REVEAL_START_SCALE,
    transition: { duration: 0 }
  },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: REVEAL_DURATION_S,
      delay: Math.min(index, MAX_STAGGERED_ITEMS) * REVEAL_STAGGER_S,
      ease: DOC_BLOCK_EASE
    }
  })
};

/** Motion props returned by `useReveal().itemProps`. */
export interface RevealItemProps {
  initial: false;
  animate: 'show' | 'hide';
  variants: Variants;
  custom: number;
}

/**
 * Reveal-on-view state for a doc block.
 * Server render and no-JS state is the final one (`shown = true`); once hydrated and
 * motion is allowed, items hide and play in when the block enters the viewport.
 * Reduced motion keeps the final state and never animates.
 *
 * @param itemCount Number of revealed items, used to compute when `settled` flips.
 * @returns `settled` is true once the reveal finished (safe to measure layout).
 */
export function useReveal<T extends HTMLElement>(itemCount = 0) {
  const reduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const { ref, isInView } = useIsInView<T>(null, {
    inView: true,
    inViewOnce: true,
    inViewMargin: REVEAL_VIEW_MARGIN
  });

  const animated = hydrated && !reduced;
  const shown = !animated || isInView;

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!animated || !isInView) return;
    const staggered = Math.min(itemCount, MAX_STAGGERED_ITEMS) * REVEAL_STAGGER_S;
    const timer = setTimeout(
      () => setTimerDone(true),
      (REVEAL_DURATION_S + staggered) * MS_PER_SECOND
    );
    return () => clearTimeout(timer);
  }, [animated, isInView, itemCount]);

  const settled = hydrated && (!animated || timerDone);

  /** Props to spread on a `motion.*` element to reveal it at position `index`. */
  const itemProps = (index: number): RevealItemProps => ({
    initial: false,
    animate: shown ? 'show' : 'hide',
    variants: REVEAL_VARIANTS,
    custom: index
  });

  return { ref, animated, shown, settled, itemProps };
}
