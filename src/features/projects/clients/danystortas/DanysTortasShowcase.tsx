'use client';

import { ClientShowcaseMeta } from '@/features/projects/clients/ClientShowcaseMeta';
import type { ProjectShowcaseProps } from '@/features/projects/types/showcase';
import { cn } from '@/lib/utils';

const HEADING_ID = 'danystortas-heading';

/**
 * TEMPORARY design — Danys Tortas (bakery client).
 * Warm rose/amber palette, cover on the left, text on the right.
 * Replace with the final bespoke design; keep the registry entry and props contract.
 * Docs: `src/features/projects/README.md`.
 */
export function DanysTortasShowcase({ project, lang, labels }: ProjectShowcaseProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className={cn(
        'grid overflow-hidden rounded-2xl border md:grid-cols-5',
        'border-rose-200/70 bg-linear-to-br from-rose-50 via-amber-50 to-orange-50',
        'dark:border-rose-900/40 dark:from-rose-950/40 dark:via-stone-900 dark:to-amber-950/30'
      )}
    >
      <div className="relative min-h-52 md:col-span-2">
        {project.image.src ? (
          <img
            src={project.image.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-rose-200 to-amber-200 text-5xl dark:from-rose-900/50 dark:to-amber-900/40"
          >
            🎂
          </div>
        )}
      </div>

      <ClientShowcaseMeta
        project={project}
        lang={lang}
        labels={labels}
        headingId={HEADING_ID}
        className="p-5 sm:p-7 md:col-span-3"
        titleClassName="text-rose-900 dark:text-rose-100"
      />
    </section>
  );
}
