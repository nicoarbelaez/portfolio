import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ENTER_DURATION_S,
  EASE_OUT
} from '@/features/projects/showcase-kit/constants/showcase-motion';

/** Scale a chip starts from (never from 0). */
const CHIP_START_SCALE = 0.92;

interface ToolChipProps {
  children: ReactNode;
}

/** Monospace chip for agent tool calls and events (`order.created`, `stock -2`). */
export function ToolChip({ children }: ToolChipProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      initial={reduced ? false : { opacity: 0, scale: CHIP_START_SCALE }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: ENTER_DURATION_S, ease: EASE_OUT }}
      className="border-border/60 bg-card text-muted-foreground inline-flex items-center rounded-md border px-1.5 py-0.5 font-mono text-[10px]"
    >
      {children}
    </motion.span>
  );
}
