import type { ReactNode, RefObject } from 'react';
import { NODE_SIZE_CLASS } from '@/features/projects/showcase-kit/constants/showcase-layout';
import { cn } from '@/lib/utils';

interface TileNodeProps {
  /** Ref consumed by `AnimatedBeam` (`fromRef` / `toRef`). */
  nodeRef: RefObject<HTMLDivElement | null>;
  /** Accessible name of the node. */
  label: string;
  /** Optional visible caption under the node. */
  caption?: string;
  size?: keyof typeof NODE_SIZE_CLASS;
  /** Highlight the node border with the accent (hub nodes). */
  emphasized?: boolean;
  className?: string;
  children: ReactNode;
}

/** Circular beam endpoint with an optional caption. */
export function TileNode({
  nodeRef,
  label,
  caption,
  size = 'md',
  emphasized = false,
  className,
  children
}: TileNodeProps) {
  return (
    <div className="z-10 flex flex-col items-center gap-1">
      <div
        ref={nodeRef}
        role="img"
        aria-label={label}
        className={cn(
          'bg-background flex items-center justify-center overflow-hidden rounded-full border shadow-sm',
          // Stronger opposite-tone edge in light mode so nodes read on light surfaces.
          emphasized ? 'border-primary/40' : 'border-foreground/20 dark:border-border/50',
          NODE_SIZE_CLASS[size],
          className
        )}
      >
        {children}
      </div>
      {caption ? (
        <span className="text-muted-foreground text-[11px] leading-none" aria-hidden="true">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
