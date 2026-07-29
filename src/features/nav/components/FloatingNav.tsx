import { useState } from 'react';

import { DesktopNavLinks } from '@/features/nav/components/DesktopNavLinks';
import { MobileMenu } from '@/features/nav/components/MobileMenu';
import { NavBrand } from '@/features/nav/components/NavBrand';
import { NAV_Z_INDEX } from '@/features/nav/constants/ui';
import type { FloatingNavLabels } from '@/features/nav/types/nav';
import { LanguageSelect } from '@/i18n/components/LanguageSelect';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

interface FloatingNavProps {
  lang: LocaleKey;
  pathname: string;
  labels: FloatingNavLabels;
}

export function FloatingNav({ lang, pathname, labels }: FloatingNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
      style={{ zIndex: NAV_Z_INDEX }}
    >
      <div
        className={cn(
          'border-border pointer-events-auto flex w-full max-w-3xl items-center gap-2 rounded-xl border',
          'bg-background/80 px-3 py-1.5 shadow-sm backdrop-blur-xl',
          'supports-[backdrop-filter]:bg-background/70 dark:bg-card/90'
        )}
      >
        <NavBrand />
        <DesktopNavLinks labels={labels} />

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <LanguageSelect lang={lang} pathname={pathname} label={labels['nav.language']} />
          <MobileMenu labels={labels} open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </div>
    </header>
  );
}
