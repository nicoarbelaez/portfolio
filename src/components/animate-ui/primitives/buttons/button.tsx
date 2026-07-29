'use client';

import { motion, type HTMLMotionProps } from 'motion/react';

import {
  Slot,
  type SlotProps,
  type WithAsChild
} from '@/components/animate-ui/primitives/animate/slot';

type ButtonProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    hoverScale?: number;
    tapScale?: number;
  }
>;

function Button({ hoverScale = 1.05, tapScale = 0.95, asChild = false, ...props }: ButtonProps) {
  const motionProps = {
    whileTap: { scale: tapScale },
    whileHover: { scale: hoverScale }
  };

  if (asChild) {
    return <Slot {...motionProps} {...(props as unknown as SlotProps)} />;
  }

  return <motion.button {...motionProps} {...props} />;
}

export { Button, type ButtonProps };
