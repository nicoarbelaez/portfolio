'use client';

import { motion } from 'motion/react';

import { STACK_CATEGORY_LABELS } from '../constants/node-kinds';
import { useReveal } from '../hooks/use-reveal';
import type { StackGridProps } from '../schemas/doc-block-schemas';
import { groupByCategory } from '../utils/group-by-category';

/** Technologies grouped by category; each chip shows name and optional version. */
export function StackGridView({ items }: StackGridProps) {
  const groups = groupByCategory(items);
  const { ref, itemProps } = useReveal<HTMLDivElement>(items.length);
  let chipIndex = 0;

  return (
    <div
      ref={ref}
      className="bg-card border-border/50 my-8 grid gap-5 rounded-xl border p-4 sm:grid-cols-2 md:p-6"
    >
      {groups.map((group) => (
        <section key={group.category} className="min-w-0">
          <h4 className="text-muted-foreground mt-0 mb-2 text-xs font-medium tracking-wide uppercase">
            {STACK_CATEGORY_LABELS[group.category]}
          </h4>
          <ul className="mt-0 flex flex-wrap gap-1.5 ps-0">
            {group.items.map((item) => (
              <motion.li
                key={item.name}
                {...itemProps(chipIndex++)}
                className="border-border/60 bg-muted/50 mt-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
              >
                <span className="font-medium">{item.name}</span>
                {item.version ? (
                  <span className="text-muted-foreground font-mono">{item.version}</span>
                ) : null}
              </motion.li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
