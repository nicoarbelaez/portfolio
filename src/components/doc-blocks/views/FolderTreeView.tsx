'use client';

import { File, Folder } from 'lucide-react';
import { motion } from 'motion/react';

import { useReveal } from '../hooks/use-reveal';
import type { FolderTreeProps } from '../schemas/doc-block-schemas';
import { parseFolderTree } from '../utils/parse-folder-tree';
import { cn } from '@/lib/utils';

/** Horizontal indent per tree level, in rem. */
const INDENT_REM = 1.25;

/**
 * Folder structure from an indented string; `#` comments become descriptions.
 * Server render is a list of entries with their descriptions.
 */
export function FolderTreeView({ tree }: FolderTreeProps) {
  const entries = parseFolderTree(tree);
  const { ref, itemProps } = useReveal<HTMLUListElement>(entries.length);

  return (
    <ul
      ref={ref}
      aria-label="Folder structure"
      className="bg-card border-border/50 my-8 flex flex-col gap-0.5 rounded-xl border p-4 ps-4 font-mono text-sm md:p-5"
    >
      {entries.map((entry, index) => {
        const Icon = entry.isDirectory ? Folder : File;
        return (
          <motion.li
            key={`${entry.name}-${index}`}
            {...itemProps(index)}
            style={{ paddingInlineStart: `${entry.depth * INDENT_REM}rem` }}
            className="mt-0 flex flex-wrap items-baseline gap-x-3 gap-y-0 py-0.5"
          >
            <span className="flex items-center gap-2">
              <Icon
                aria-hidden="true"
                className={cn(
                  'size-4 shrink-0 self-center',
                  entry.isDirectory ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span className={cn(entry.isDirectory && 'font-semibold')}>{entry.name}</span>
            </span>
            {entry.description ? (
              <span className="text-muted-foreground font-sans text-xs">
                <span className="sr-only">: </span>
                {entry.description}
              </span>
            ) : null}
          </motion.li>
        );
      })}
    </ul>
  );
}
