'use client';

import { useEffect, useState } from 'react';
import { MonitorSmartphone } from 'lucide-react';
import { AnimatedList } from '@/components/ui/animated-list';
import { MecateoMagicTile } from '@/features/projects/apps/mecateo/MecateoMagicTile';
import { cn } from '@/lib/utils';

interface PosListTileProps {
  title: string;
  description: string;
  events: readonly { title: string; subtitle: string; time: string }[];
}

function EventRow({ title, subtitle, time }: { title: string; subtitle: string; time: string }) {
  return (
    <div className="bg-background border-border/40 w-full rounded-xl border p-3 shadow-sm">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-muted-foreground text-xs">{time}</span>
      </div>
      <p className="text-muted-foreground text-xs">{subtitle}</p>
    </div>
  );
}

/** POS operations tile — animated list with reduced-motion fallback. */
export function PosListTile({ title, description, events }: PosListTileProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const list = events.map((event) => <EventRow key={`${event.title}-${event.time}`} {...event} />);

  return (
    <MecateoMagicTile className="col-span-1 min-h-80 md:min-h-0">
      <div className="relative z-40 min-h-[11rem] flex-1 overflow-hidden p-3">
        {reduceMotion ? (
          <div className="flex flex-col gap-2">{list.slice(0, 3)}</div>
        ) : (
          <AnimatedList
            delay={1800}
            className={cn(
              'absolute inset-x-3 top-3 h-[220px] scale-95',
              '[mask-image:linear-gradient(to_top,transparent_5%,black_55%)]'
            )}
          >
            {list}
          </AnimatedList>
        )}
      </div>
      <div className="border-border/60 bg-card/90 relative z-40 space-y-1 border-t p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <MonitorSmartphone className="text-foreground size-5 shrink-0" aria-hidden="true" />
          <h4 className="font-heading text-base font-semibold">{title}</h4>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
      </div>
    </MecateoMagicTile>
  );
}
