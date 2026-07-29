'use client';

import { useEffect, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Dock, DockIcon } from '@/components/ui/dock';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SOCIAL_DOCK, SOCIAL_LINKS } from '@/constants/social';
import { SOCIAL_ICONS } from '@/icons/social-icons';
import { cn } from '@/lib/utils';

interface SocialDockProps {
  /** Accessible name for the dock landmark. */
  label: string;
}

export function SocialDock({ label }: SocialDockProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return (
    <nav aria-label={label} className="flex justify-center">
      <TooltipProvider>
        <Dock
          direction="middle"
          iconSize={SOCIAL_DOCK.ICON_SIZE}
          iconMagnification={SOCIAL_DOCK.ICON_MAGNIFICATION}
          iconDistance={SOCIAL_DOCK.ICON_DISTANCE}
          disableMagnification={reduceMotion}
          className="bg-background/70 mt-6"
        >
          {SOCIAL_LINKS.map((social) => {
            const Icon = SOCIAL_ICONS[social.id];

            return (
              <DockIcon key={social.id}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={cn(
                          buttonVariants({ variant: 'ghost', size: 'icon' }),
                          'size-12 rounded-full'
                        )}
                      />
                    }
                  >
                    <Icon className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            );
          })}
        </Dock>
      </TooltipProvider>
    </nav>
  );
}
