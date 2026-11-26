'use client';

import { useRef } from 'react';
import { Nfc, QrCode } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  EASE_OUT,
  IN_VIEW_MARGIN
} from '@/features/projects/showcase-kit/constants/showcase-motion';

/** Ripple rings radiating from the tap point. */
const RIPPLE_DELAYS_S = [0, 0.9, 1.8] as const;
const RIPPLE_DURATION_S = 2.7;
const RIPPLE_END_SCALE = 2.1;
const RIPPLE_START_OPACITY = 0.45;

interface NfcStandProps {
  labels: readonly string[];
  tapLabel: string;
  qrBackup: string;
}

/** Illustrated NFC stand with tap ripples (autoplay in view, static under reduced motion). */
export function NfcStand({ labels, tapLabel, qrBackup }: NfcStandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: IN_VIEW_MARGIN });
  const reduced = useReducedMotion();
  const animate = inView && !reduced;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-muted/40 border-border/60 mx-auto flex w-40 shrink-0 flex-col items-center gap-3 rounded-2xl border p-4 shadow-md"
    >
      <div className="relative flex size-16 items-center justify-center">
        {RIPPLE_DELAYS_S.map((delay) => (
          <motion.span
            key={delay}
            className="border-primary absolute inset-0 rounded-full border"
            initial={{ opacity: 0, scale: 1 }}
            animate={
              animate
                ? { opacity: [RIPPLE_START_OPACITY, 0], scale: [1, RIPPLE_END_SCALE] }
                : { opacity: 0, scale: 1 }
            }
            transition={{
              duration: RIPPLE_DURATION_S,
              delay,
              ease: EASE_OUT,
              repeat: Infinity
            }}
          />
        ))}
        <span className="bg-primary text-primary-foreground relative flex size-12 items-center justify-center rounded-full">
          <Nfc className="size-6" aria-hidden="true" />
        </span>
      </div>
      <span className="text-primary text-xs font-semibold">{tapLabel}</span>
      <p className="text-muted-foreground text-center text-[11px] leading-tight">
        {labels.join(' · ')}
      </p>
      <span className="text-muted-foreground border-border/60 flex items-center gap-1 border-t pt-2 text-[10px]">
        <QrCode className="size-3" aria-hidden="true" />
        {qrBackup}
      </span>
    </div>
  );
}
