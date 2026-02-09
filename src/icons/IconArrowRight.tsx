import { cn } from '@/lib/utils';
import { IconArrowNarrowRight } from '@tabler/icons-preact';

interface IconProps {
  className?: string;
}

export function IconArrowRight({ className, ...props }: IconProps) {
  return (
    <IconArrowNarrowRight
      className={cn(
        'ml-1 inline-block size-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none',
        className
      )}
    />
  );
}
