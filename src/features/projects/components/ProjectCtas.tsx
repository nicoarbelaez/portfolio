'use client';

import { buttonVariants } from '@/components/ui/button';
import type { ProjectCtas } from '@/features/projects/types/project';
import { cn } from '@/lib/utils';

interface ProjectCtasProps {
  ctas: ProjectCtas;
  detailsHref?: string;
  labels: {
    site: string;
    repo: string;
    details: string;
  };
  className?: string;
}

export function ProjectCtasLinks({ ctas, detailsHref, labels, className }: ProjectCtasProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {detailsHref ? (
        <a href={detailsHref} className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}>
          {labels.details}
        </a>
      ) : null}
      {ctas.siteUrl ? (
        <a
          href={ctas.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          {labels.site}
        </a>
      ) : null}
      {ctas.repoUrl ? (
        <a
          href={ctas.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
        >
          {labels.repo}
        </a>
      ) : null}
    </div>
  );
}
