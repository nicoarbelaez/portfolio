import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ENTER_DURATION_S,
  ENTER_OFFSET_PX,
  EASE_OUT
} from '@/features/projects/showcase-kit/constants/showcase-motion';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  /** `customer` aligns left and uses the muted surface; `agent` aligns right in the accent tone. */
  from: 'customer' | 'agent';
  children: ReactNode;
}

/**
 * Chat message for replicated conversations. Enters with a small rise + fade (transform and
 * opacity only); reduced motion renders it in place.
 */
export function ChatBubble({ from, children }: ChatBubbleProps) {
  const reduced = useReducedMotion();
  const isAgent = from === 'agent';

  return (
    <motion.p
      initial={reduced ? false : { opacity: 0, y: ENTER_OFFSET_PX }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ENTER_DURATION_S, ease: EASE_OUT }}
      className={cn(
        'max-w-[85%] rounded-2xl px-2.5 py-1.5 text-[11px] leading-snug',
        isAgent
          ? 'bg-primary text-primary-foreground self-end rounded-br-sm'
          : 'bg-muted text-foreground self-start rounded-bl-sm'
      )}
    >
      {children}
    </motion.p>
  );
}
