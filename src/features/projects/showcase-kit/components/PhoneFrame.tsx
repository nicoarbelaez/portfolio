import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * Device frame for replicated mobile UI (chat, app screens). Decorative: hidden from
 * assistive tech. Give it a fixed width and let the tile clip its bottom edge.
 */
export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'border-foreground/15 bg-background relative flex min-h-0 flex-col overflow-hidden rounded-[1.5rem] border-[5px] shadow-lg',
        className
      )}
    >
      <span className="bg-foreground/15 absolute top-1.5 left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full" />
      <div className="flex min-h-0 flex-1 flex-col pt-4">{children}</div>
    </div>
  );
}

interface PhoneHeaderProps {
  /** Lucide icon shown before the title. */
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  /** Chat title: always one horizontal line, truncated with an ellipsis only if it overflows. */
  title: string;
}

/** Single-line chat header for a `PhoneFrame` (no second line, no controls: toggles float in the chat). */
export function PhoneHeader({ icon: Icon, title }: PhoneHeaderProps) {
  return (
    <div className="border-border/60 flex items-center border-b px-2.5 pb-2">
      <span className="flex min-w-0 items-center gap-1.5 text-[11px] font-semibold whitespace-nowrap">
        <Icon className="text-primary size-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{title}</span>
      </span>
    </div>
  );
}
