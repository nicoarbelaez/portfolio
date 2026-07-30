import { NAV_SECTIONS } from '@/features/nav/constants/sections';
import type { NavLabels } from '@/features/nav/types/nav';
import { scrollToHash } from '@/features/nav/utils/scroll-to-hash';
import { cn } from '@/lib/utils';

interface DesktopNavLinksProps {
  labels: NavLabels;
}

export function DesktopNavLinks({ labels }: DesktopNavLinksProps) {
  return (
    <nav
      aria-label="Primary"
      className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex"
    >
      {NAV_SECTIONS.map((section) => (
        <a
          key={section.id}
          href={section.href}
          onClick={(event) => scrollToHash(section.href, event)}
          className={cn(
            'inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium',
            'transition-colors duration-200',
            'focus-visible:ring-ring/30 focus-visible:ring-3 focus-visible:outline-none',
            section.accent
              ? 'text-primary hover:bg-primary/10'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          {labels[section.labelKey]}
        </a>
      ))}
    </nav>
  );
}
