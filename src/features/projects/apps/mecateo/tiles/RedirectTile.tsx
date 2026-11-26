'use client';

import { ArrowDown, Link2, MessageCircle, Nfc, Star, UtensilsCrossed } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MECATEO_REDIRECT_HOST,
  MECATEO_SAMPLE_CODE,
  REDIRECT_CYCLE_MS,
  REDIRECT_DESTINATION_KINDS,
  type RedirectDestinationKind
} from '@/features/projects/apps/mecateo/constants/mecateo-config';
import type { MecateoCopy } from '@/features/projects/apps/mecateo/constants/copy.types';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import {
  CROSSFADE_BLUR_PX,
  EASE_OUT,
  ENTER_OFFSET_PX
} from '@/features/projects/showcase-kit/constants/showcase-motion';
import { useCycleIndex } from '@/features/projects/showcase-kit/hooks/useTileTicker';
import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';
import { cn } from '@/lib/utils';

/** Exit is faster than enter: the system responds, the user watches the new state. */
const SWAP_ENTER_S = 0.24;
const SWAP_EXIT_S = 0.14;

const DESTINATION_ICONS: Readonly<Record<RedirectDestinationKind, ShowcaseIcon>> = {
  reviews: Star,
  whatsapp: MessageCircle,
  menu: UtensilsCrossed
};

/** Destination swap on a fixed printed code: the core idea of the dynamic redirector. */
export function RedirectTile({ copy }: { copy: MecateoCopy['redirect'] }) {
  const { ref, value: index } = useCycleIndex(REDIRECT_DESTINATION_KINDS.length, REDIRECT_CYCLE_MS);
  const kind = REDIRECT_DESTINATION_KINDS[index];
  const Icon = DESTINATION_ICONS[kind];

  return (
    <ShowcaseTile>
      <TileStage stageRef={ref} className="flex-col items-center justify-center gap-2 p-4">
        <div aria-hidden="true" className="flex flex-col items-center gap-2">
          <p className="text-muted-foreground text-[10px] tracking-wide uppercase">
            {copy.printedLabel}
          </p>
          <span className="bg-muted border-border/60 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs">
            <Nfc className="text-primary size-3.5" aria-hidden="true" />
            {MECATEO_REDIRECT_HOST}/{MECATEO_SAMPLE_CODE}
          </span>
          <ArrowDown className="text-muted-foreground size-4" aria-hidden="true" />
          <p className="text-muted-foreground text-[10px] tracking-wide uppercase">
            {copy.destinationLabel}
          </p>
          <div className="h-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={kind}
                initial={{ opacity: 0, y: ENTER_OFFSET_PX, filter: `blur(${CROSSFADE_BLUR_PX}px)` }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: SWAP_ENTER_S, ease: EASE_OUT }
                }}
                exit={{
                  opacity: 0,
                  y: -ENTER_OFFSET_PX,
                  filter: `blur(${CROSSFADE_BLUR_PX}px)`,
                  transition: { duration: SWAP_EXIT_S, ease: EASE_OUT }
                }}
                className="bg-primary/10 border-primary/40 text-foreground flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium"
              >
                <Icon className="text-primary size-4" aria-hidden="true" />
                {copy.destinations[kind]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="flex gap-1">
            {REDIRECT_DESTINATION_KINDS.map((item) => (
              <span
                key={item}
                className={cn(
                  'size-1.5 rounded-full transition-colors',
                  item === kind ? 'bg-primary' : 'bg-border'
                )}
              />
            ))}
          </span>
        </div>
      </TileStage>
      <TileFooter icon={Link2} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
