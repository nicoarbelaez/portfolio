'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Radar } from 'lucide-react';
import { SampleBadge } from '@/features/projects/clients/shared/components/SampleBadge';
import {
  ALERT_KINDS,
  ALERT_SEVERITY,
  ALERT_STEP_MS,
  SEVERITY_CLASS
} from '@/features/projects/clients/swc/constants/swc-config';
import type { SwcCopy } from '@/features/projects/clients/swc/constants/copy.types';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import {
  ENTER_DURATION_S,
  ENTER_OFFSET_PX,
  EASE_OUT
} from '@/features/projects/showcase-kit/constants/showcase-motion';
import { useRevealCount } from '@/features/projects/showcase-kit/hooks/useTileTicker';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

/** Alert feed replica: rule-engine alerts with severities appear one after another. */
export function RadarTile({ copy, lang }: { copy: SwcCopy['radar']; lang: LocaleKey }) {
  const { ref, value: revealed } = useRevealCount(ALERT_KINDS.length, ALERT_STEP_MS);
  const reduced = useReducedMotion();

  return (
    <ShowcaseTile className="min-h-96">
      <TileStage stageRef={ref} className="flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2" aria-hidden="true">
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            <Radar className="text-primary size-3.5" />
            {copy.header}
          </span>
          <SampleBadge lang={lang} />
        </div>
        <ul className="flex flex-col gap-1.5" aria-hidden="true">
          {ALERT_KINDS.slice(0, revealed).map((kind) => {
            const severity = ALERT_SEVERITY[kind];
            return (
              <motion.li
                key={kind}
                initial={reduced ? false : { opacity: 0, y: ENTER_OFFSET_PX }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: ENTER_DURATION_S, ease: EASE_OUT }}
                className="border-border/60 bg-card flex items-start gap-2 rounded-lg border p-1.5"
              >
                <span
                  className={cn(
                    'w-16 shrink-0 rounded px-1 py-0.5 text-center text-[9px] font-semibold uppercase',
                    SEVERITY_CLASS[severity]
                  )}
                >
                  {copy.severities[severity]}
                </span>
                <span className="min-w-0 text-[11px] leading-tight">
                  {copy.alerts[kind].title}
                  <span className="text-muted-foreground block text-[10px]">
                    {copy.alerts[kind].source}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </TileStage>
      <TileFooter icon={Radar} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
