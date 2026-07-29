import { PERSONAL_INFO } from '@/constants/constants';
import { cn } from '@/lib/utils';

interface NavBrandProps {
  className?: string;
}

export function NavBrand({ className }: NavBrandProps) {
  return (
    <a
      href="#"
      className={cn(
        'font-heading text-foreground shrink-0 px-2 text-lg font-bold tracking-wide',
        'transition-opacity duration-200 hover:opacity-80',
        'focus-visible:ring-ring/30 focus-visible:ring-3 focus-visible:outline-none',
        className
      )}
    >
      {PERSONAL_INFO.BRAND_NAME}
      <span className="text-primary" aria-hidden="true">
        .
      </span>
    </a>
  );
}
