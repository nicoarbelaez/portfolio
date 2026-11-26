import { motion } from 'motion/react';
import {
  SPARKLINE_HEIGHT,
  SPARKLINE_WIDTH
} from '@/features/projects/apps/mecateo/constants/mecateo-config';
import { EASE_OUT } from '@/features/projects/showcase-kit/constants/showcase-motion';

const DRAW_DURATION_S = 0.6;
const STROKE_WIDTH = 1.5;

/** Build a polyline path scaled into the sparkline viewBox. */
function toPath(points: readonly number[]): string {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = SPARKLINE_WIDTH / (points.length - 1);
  return points
    .map((point, i) => {
      const x = i * step;
      const y = SPARKLINE_HEIGHT - ((point - min) / range) * (SPARKLINE_HEIGHT - 2) - 1;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

/** Tiny trend line that draws itself on mount (`reduced` renders it complete). */
export function Sparkline({ points, reduced }: { points: readonly number[]; reduced: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`}
      className="text-primary h-4 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={toPath(points)}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: DRAW_DURATION_S, ease: EASE_OUT }}
      />
    </svg>
  );
}
