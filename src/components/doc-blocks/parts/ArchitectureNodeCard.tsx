import type { Ref } from 'react';
import { motion } from 'motion/react';

import type { RevealItemProps } from '../hooks/use-reveal';
import { ARCHITECTURE_KIND_STYLES } from '../constants/node-kinds';
import type { ArchitectureNode } from '../schemas/doc-block-schemas';
import { cn } from '@/lib/utils';

interface ArchitectureNodeCardProps {
  node: ArchitectureNode;
  nodeRef?: Ref<HTMLLIElement>;
  /** Motion props from `useReveal().itemProps(index)`. */
  reveal: RevealItemProps;
}

/** One architecture node: icon chip tinted by kind, label, optional detail. */
export function ArchitectureNodeCard({ node, nodeRef, reveal }: ArchitectureNodeCardProps) {
  const style = ARCHITECTURE_KIND_STYLES[node.kind];
  const Icon = style.icon;

  return (
    <motion.li
      ref={nodeRef}
      {...reveal}
      data-kind={node.kind}
      className={cn(
        'bg-card relative z-10 mt-0 flex items-start gap-3 rounded-xl border p-3 shadow-xs',
        style.border
      )}
    >
      <span
        aria-hidden="true"
        className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg', style.chip)}
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="font-heading block text-sm leading-tight font-semibold">{node.label}</span>
        <span className="text-muted-foreground block text-xs">
          <span className="sr-only">Type: </span>
          {node.kind}
        </span>
        {node.detail ? (
          <span className="text-muted-foreground mt-1 block text-xs leading-snug">
            {node.detail}
          </span>
        ) : null}
      </span>
    </motion.li>
  );
}
