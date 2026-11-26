'use client';

import { motion } from 'motion/react';

import { DEFAULT_FLOW_KIND, FLOW_KIND_STYLES } from '../constants/node-kinds';
import { useReveal } from '../hooks/use-reveal';
import type { FlowProps } from '../schemas/doc-block-schemas';
import { cn } from '@/lib/utils';

/**
 * Numbered interaction sequence, revealed step by step. The server render is a plain
 * ordered list (actor, action, detail) readable without JavaScript.
 */
export function FlowView({ steps }: FlowProps) {
  const { ref, itemProps } = useReveal<HTMLOListElement>(steps.length);

  return (
    <ol
      ref={ref}
      className="bg-card border-border/50 my-8 flex flex-col gap-0 rounded-xl border p-4 ps-4 md:p-6"
    >
      {steps.map((step, index) => {
        const style = FLOW_KIND_STYLES[step.kind ?? DEFAULT_FLOW_KIND];
        const Icon = style.icon;
        const isLast = index === steps.length - 1;

        return (
          <motion.li
            key={`${step.actor}-${index}`}
            {...itemProps(index)}
            className="relative mt-0 flex gap-3 pb-5 last:pb-0"
          >
            {isLast ? null : (
              <span
                aria-hidden="true"
                className="bg-border absolute top-9 bottom-1 left-4 w-px -translate-x-1/2"
              />
            )}
            <span
              className={cn(
                'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border',
                style.chip,
                style.border
              )}
            >
              <Icon aria-hidden="true" className="size-4" />
              <span className="sr-only">Step {index + 1}</span>
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="mt-0 text-sm leading-snug">
                <span className="font-heading font-semibold">{step.actor}</span>
                <span className="text-muted-foreground"> · </span>
                <span>{step.action}</span>
              </p>
              {step.detail ? (
                <p className="text-muted-foreground mt-0.5 text-xs leading-snug">{step.detail}</p>
              ) : null}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
