'use client';

import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import { NumberTicker } from '@/components/ui/number-ticker';
import {
  AI_REPLY_SHARE_PERCENT,
  BAR_FILL_DURATION_S,
  PEAK_CUSTOMERS_PER_DAY
} from '@/features/projects/clients/danystortas/constants/danystortas-config';
import type { DanysTortasCopy } from '@/features/projects/clients/danystortas/constants/copy.types';
import { useRevealOnView } from '@/features/projects/clients/shared/hooks/useRevealOnView';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { EASE_OUT } from '@/features/projects/showcase-kit/constants/showcase-motion';

/** Prefix that marks the peak as a lower bound ("+490"). */
const PEAK_PREFIX = '+';
const formatPeak = (value: number) => `${PEAK_PREFIX}${Math.round(value)}`;
const formatPercent = (value: number) => `${Math.round(value)} %`;

/** Peak customers in one day plus the share of replies sent by the AI (progress bar). */
export function VolumeTile({ copy }: { copy: DanysTortasCopy['volume'] }) {
  const { ref, shown, reduced } = useRevealOnView();

  return (
    <ShowcaseTile accent="chart-3">
      <TileStage stageRef={ref} className="flex-col justify-center gap-5 p-5">
        <div>
          <p className="font-heading text-4xl font-semibold tracking-tight">
            <NumberTicker value={PEAK_CUSTOMERS_PER_DAY} format={formatPeak} />
          </p>
          <p className="text-sm">{copy.peakLabel}</p>
          <p className="text-muted-foreground text-[11px]">{copy.peakContext}</p>
        </div>
        <div className="space-y-1.5">
          <p className="flex items-baseline gap-1.5">
            <span className="font-heading text-2xl font-semibold">
              <NumberTicker value={AI_REPLY_SHARE_PERCENT} format={formatPercent} />
            </span>
            <span className="text-sm">{copy.shareLabel}</span>
          </p>
          <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full" aria-hidden="true">
            <motion.div
              className="bg-primary h-full origin-left rounded-full"
              style={{ width: `${AI_REPLY_SHARE_PERCENT}%` }}
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: shown ? 1 : 0 }}
              transition={{ duration: BAR_FILL_DURATION_S, ease: EASE_OUT }}
            />
          </div>
          <p className="text-muted-foreground text-[11px]">{copy.shareContext}</p>
        </div>
      </TileStage>
      <TileFooter icon={Users} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
