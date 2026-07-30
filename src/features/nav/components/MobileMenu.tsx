import { motion, useReducedMotion } from 'motion/react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger
} from '@/components/animate-ui/primitives/radix/sheet';
import { Menu } from '@/components/animate-ui/icons/menu';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO } from '@/constants/constants';
import { NAV_SECTIONS } from '@/features/nav/constants/sections';
import { NAV_MOTION } from '@/features/nav/constants/ui';
import type { NavLabels } from '@/features/nav/types/nav';
import { scrollToHash } from '@/features/nav/utils/scroll-to-hash';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  labels: NavLabels;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ labels, open, onOpenChange }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={open ? labels['nav.menuClose'] : labels['nav.menu']}
          aria-expanded={open}
          className="md:hidden"
        >
          <Menu animate={open} size={22} />
        </Button>
      </SheetTrigger>

      <SheetPortal>
        <SheetOverlay className="bg-background/80 fixed inset-0 z-40 backdrop-blur-md" />
        <SheetContent
          side="top"
          className={cn(
            'z-40 flex h-dvh w-full flex-col items-center justify-center gap-2',
            'bg-background/95 border-none px-6 backdrop-blur-xl'
          )}
          transition={
            reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 220, damping: 28 }
          }
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{labels['nav.menu']}</SheetTitle>
            <SheetDescription>{PERSONAL_INFO.BRAND_NAME}</SheetDescription>
          </SheetHeader>

          <nav aria-label={labels['nav.menu']} className="flex flex-col items-center gap-5">
            {NAV_SECTIONS.map((section, index) => (
              <motion.a
                key={section.id}
                href={section.href}
                onClick={(event) => {
                  scrollToHash(section.href, event);
                  onOpenChange(false);
                }}
                initial={reduceMotion ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : index * (NAV_MOTION.linkStaggerMs / 1000),
                  duration: NAV_MOTION.linkDuration,
                  ease: 'easeOut'
                }}
                className={cn(
                  'font-heading text-3xl font-semibold tracking-tight',
                  'transition-colors duration-200',
                  'focus-visible:ring-ring/30 focus-visible:ring-3 focus-visible:outline-none',
                  section.accent
                    ? 'text-primary hover:text-primary/80'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {labels[section.labelKey]}
              </motion.a>
            ))}
          </nav>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}
