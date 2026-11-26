'use client';

import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'motion/react';

import { useIsInView } from '@/hooks/use-is-in-view';
import { cn } from '@/lib/utils';

/** Count-up duration in seconds. */
export const TICKER_DURATION_S = 1.4;
/** Strong ease-out (cubic-bezier 0.23, 1, 0.32, 1). */
export const TICKER_EASE = [0.23, 1, 0.32, 1] as const;
/** Viewport margin before the count-up starts. */
const TICKER_VIEW_MARGIN = '-40px';

interface NumberTickerProps {
  /** Final value. Server render and reduced motion show it as-is. */
  value: number;
  /** Value the count starts from. */
  startValue?: number;
  /** Renders a number (separators, decimals). Defaults to `String`. */
  format?: (value: number) => string;
  duration?: number;
  className?: string;
}

/**
 * Counts from `startValue` to `value` once, when it enters the viewport.
 * Renders the final value on the server and under `prefers-reduced-motion`;
 * assistive tech always reads the final value.
 */
export function NumberTicker({
  value,
  startValue = 0,
  format = String,
  duration = TICKER_DURATION_S,
  className
}: NumberTickerProps) {
  const reduced = useReducedMotion();
  const { ref, isInView } = useIsInView<HTMLSpanElement>(null, {
    inView: true,
    inViewOnce: true,
    inViewMargin: TICKER_VIEW_MARGIN
  });
  const formatRef = useRef(format);
  formatRef.current = format;

  useEffect(() => {
    const node = ref.current;
    if (reduced || !node) return;
    if (!isInView) {
      node.textContent = formatRef.current(startValue);
      return;
    }
    const controls = animate(startValue, value, {
      duration,
      ease: TICKER_EASE,
      onUpdate: (latest) => {
        node.textContent = formatRef.current(latest);
      }
    });
    return () => controls.stop();
  }, [reduced, isInView, startValue, value, duration, ref]);

  return (
    <>
      <span className="sr-only">{format(value)}</span>
      <span ref={ref} aria-hidden="true" className={cn('tabular-nums', className)}>
        {format(value)}
      </span>
    </>
  );
}
