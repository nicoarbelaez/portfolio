import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppFrameProps {
  /** Window title or address shown in the chrome bar. */
  title: string;
  children: ReactNode;
  className?: string;
}

const TRAFFIC_LIGHTS = ['bg-destructive/60', 'bg-chart-3/60', 'bg-primary/60'] as const;

/**
 * Browser-style frame for replicated product UI. Decorative: hidden from assistive tech,
 * the tile footer carries the description.
 */
export function AppFrame({ title, children, className }: AppFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-background border-border/60 flex min-h-0 flex-col overflow-hidden rounded-lg border shadow-md',
        className
      )}
    >
      <div className="border-border/60 bg-muted/50 flex items-center gap-2 border-b px-2.5 py-1.5">
        <span className="flex gap-1">
          {TRAFFIC_LIGHTS.map((tone) => (
            <span key={tone} className={cn('size-2 rounded-full', tone)} />
          ))}
        </span>
        <span className="bg-background text-muted-foreground min-w-0 flex-1 truncate rounded px-2 py-0.5 text-[10px]">
          {title}
        </span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
