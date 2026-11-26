'use client';

import { useRef, type ReactNode } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { Radar } from 'lucide-react';
import { AnimatedList } from '@/components/ui/animated-list';
import {
  ALERT_FADE_MASK_CLASS,
  ALERT_KINDS,
  ALERT_SEVERITY,
  ALERT_STEP_MS,
  SEVERITY_CLASS,
  type AlertKind
} from '@/features/projects/clients/swc/constants/swc-config';
import type { SwcCopy } from '@/features/projects/clients/swc/constants/copy.types';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

type RadarCopy = SwcCopy['radar'];

/** One notification: text on top, severity badge and source below (single column). */
function AlertItem({ kind, copy }: { kind: AlertKind; copy: RadarCopy }) {
  const severity = ALERT_SEVERITY[kind];
  return (
    <div className="border-border/60 bg-card flex flex-col gap-1.5 rounded-lg border p-2.5">
      <span className="text-xs leading-snug font-medium">{copy.alerts[kind].title}</span>
      <span className="flex items-center gap-2">
        <span
          className={cn(
            'rounded px-1.5 py-0.5 text-[10px] leading-none font-semibold uppercase',
            SEVERITY_CLASS[severity]
          )}
        >
          {copy.severities[severity]}
        </span>
        <span className="text-muted-foreground text-[10px]">{copy.alerts[kind].source}</span>
      </span>
    </div>
  );
}

/**
 * Notification feed replica. The list lives in a fixed, masked container (absolute inside a
 * `flex-1` wrapper), so new alerts push the stack down and clip at the bottom: the card never
 * changes height. Reduced motion renders the alerts static.
 */
export function RadarTile({ copy }: { copy: RadarCopy; lang?: LocaleKey }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef);
  const reduced = useReducedMotion();
  const items: ReactNode[] = ALERT_KINDS.map((kind) => (
    <AlertItem key={kind} kind={kind} copy={copy} />
  ));

  return (
    <ShowcaseTile className="min-h-96">
      <TileStage stageRef={stageRef} className="flex-col gap-2 p-4">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            <Radar className="text-primary size-3.5" />
            {copy.header}
          </span>
        </div>
        <div className="relative min-h-0 flex-1" aria-hidden="true">
          <div className={cn('absolute inset-0 overflow-hidden', ALERT_FADE_MASK_CLASS)}>
            {reduced ? (
              <div className="flex flex-col gap-2">{items}</div>
            ) : inView ? (
              <AnimatedList delay={ALERT_STEP_MS} className="items-stretch gap-2">
                {items}
              </AnimatedList>
            ) : null}
          </div>
        </div>
      </TileStage>
      <TileFooter icon={Radar} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
