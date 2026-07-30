'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { MagicCard } from '@/components/ui/magic-card';
import { cn } from '@/lib/utils';

/** Portfolio primary accents for Magic Card border spotlight. */
const GRADIENT_FROM = 'oklch(0.84 0.23 130)';
const GRADIENT_TO = 'oklch(0.77 0.22 132)';
const GRADIENT_COLOR_DARK = 'oklch(0.35 0.06 130 / 0.45)';
const GRADIENT_COLOR_LIGHT = 'oklch(0.84 0.23 130 / 0.28)';

interface MecateoMagicTileProps {
  children: ReactNode;
  className?: string;
}

/**
 * Magic Card shell for Mecateo secondary tiles (menu / POS / integrations).
 * @see https://magicui.design/docs/components/magic-card
 */
export function MecateoMagicTile({ children, className }: MecateoMagicTileProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <MagicCard
      className={cn('relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl', className)}
      gradientSize={220}
      gradientFrom={GRADIENT_FROM}
      gradientTo={GRADIENT_TO}
      gradientColor={isDark ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT}
      gradientOpacity={0.7}
    >
      {children}
    </MagicCard>
  );
}
