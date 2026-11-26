'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import {
  DEFAULT_TICK_MS,
  IN_VIEW_MARGIN,
  SEQUENCE_HOLD_TICKS
} from '@/features/projects/showcase-kit/constants/showcase-motion';

/** Ref to attach to the tile stage, the derived value and whether motion is reduced. */
export type TickerResult = {
  ref: RefObject<HTMLDivElement | null>;
  value: number;
  reduced: boolean;
};

/**
 * Raw ticker: increments `value` every `intervalMs` while the attached element is in view.
 * Under reduced motion it never ticks and `reduced` is true.
 */
export function useTileTicker(intervalMs: number = DEFAULT_TICK_MS): TickerResult {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: IN_VIEW_MARGIN });
  const reduced = useReducedMotion() ?? false;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setTick((current) => current + 1), intervalMs);
    return () => clearInterval(id);
  }, [inView, reduced, intervalMs]);

  return { ref, value: tick, reduced };
}

/**
 * Sequence reveal: how many of `count` steps are visible (0..count). It holds the complete
 * state for a few ticks, then restarts. Reduced motion shows the complete state.
 */
export function useRevealCount(count: number, intervalMs: number = DEFAULT_TICK_MS): TickerResult {
  const { ref, value, reduced } = useTileTicker(intervalMs);
  const cycle = count + SEQUENCE_HOLD_TICKS;
  return { ref, reduced, value: reduced ? count : Math.min(value % cycle, count) };
}

/** Cycle index in 0..count-1 (first item under reduced motion). */
export function useCycleIndex(count: number, intervalMs: number = DEFAULT_TICK_MS): TickerResult {
  const { ref, value, reduced } = useTileTicker(intervalMs);
  return { ref, reduced, value: reduced ? 0 : value % count };
}
