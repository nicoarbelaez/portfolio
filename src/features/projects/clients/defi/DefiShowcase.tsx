'use client';

import { ClientShowcaseMeta } from '@/features/projects/clients/ClientShowcaseMeta';
import type { ProjectShowcaseProps } from '@/features/projects/types/showcase';
import { cn } from '@/lib/utils';

const HEADING_ID = 'defi-heading';

/**
 * TEMPORARY design — DeFi (fintech client).
 * Dark slate/emerald "terminal" look, text on top, cover below.
 * Replace with the final bespoke design; keep the registry entry and props contract.
 * Docs: `src/features/projects/README.md`.
 */
export function DefiShowcase({ project, lang, labels }: ProjectShowcaseProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-2xl border',
        'border-emerald-500/20 bg-slate-950 text-slate-100'
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-emerald-500/15 blur-3xl"
      />

      <ClientShowcaseMeta
        project={project}
        lang={lang}
        labels={labels}
        headingId={HEADING_ID}
        className="relative p-5 sm:p-7 [&_p]:text-slate-300 [&_time]:text-emerald-300/80"
        titleClassName="font-mono text-emerald-300"
      />

      <div className="relative border-t border-emerald-500/20">
        <div className="flex items-center gap-1.5 border-b border-emerald-500/20 px-4 py-2">
          <span aria-hidden="true" className="size-2 rounded-full bg-emerald-400/70" />
          <span aria-hidden="true" className="size-2 rounded-full bg-emerald-400/40" />
          <span aria-hidden="true" className="size-2 rounded-full bg-emerald-400/20" />
        </div>
        {project.image.src ? (
          <img
            src={project.image.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-16/7 w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="aspect-16/4 w-full bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-size-[24px_24px]"
          />
        )}
      </div>
    </section>
  );
}
