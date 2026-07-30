import logoUrl from '@/assets/apps/mecateo/logo.svg?url';
import { cn } from '@/lib/utils';

interface MecateoLogoProps {
  className?: string;
}

/** Decorative brand mark — white plate so the dark mark stays readable. */
export function MecateoLogo({ className }: MecateoLogoProps) {
  return (
    <span
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1',
        // Light: contrast ring on the plate (not the SVG). Dark: plate already pops.
        'border-foreground/25 border dark:border-transparent',
        className
      )}
      aria-hidden="true"
    >
      <img
        src={logoUrl}
        alt=""
        width={32}
        height={32}
        className="size-full object-contain"
        decoding="async"
      />
    </span>
  );
}
