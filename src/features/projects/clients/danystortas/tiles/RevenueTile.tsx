'use client';

import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import { NumberTicker } from '@/components/ui/number-ticker';
import {
  BAR_FILL_DURATION_S,
  PERCENT_SCALE,
  REVENUE_AI_ASSISTED_COP,
  REVENUE_AI_SOLD_COP,
  REVENUE_BAR_MAX
} from '@/features/projects/clients/danystortas/constants/danystortas-config';
import type { DanysTortasCopy } from '@/features/projects/clients/danystortas/constants/copy.types';
import { useRevealOnView } from '@/features/projects/clients/shared/hooks/useRevealOnView';
import { createCurrencyFormatter } from '@/features/projects/clients/shared/utils/format';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { EASE_OUT } from '@/features/projects/showcase-kit/constants/showcase-motion';
import type { LocaleKey } from '@/i18n/ui';
import { cn } from '@/lib/utils';

interface FigureProps {
  label: string;
  note: string;
  value: number;
  format: (value: number) => string;
  shown: boolean;
  reduced: boolean;
  barClassName: string;
}

/** One approved figure: label, count-up value and a bar scaled against the larger figure. */
function Figure({ label, note, value, format, shown, reduced, barClassName }: FigureProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <p className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        <NumberTicker value={value} format={format} />
      </p>
      <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full" aria-hidden="true">
        <motion.div
          className={cn('h-full origin-left rounded-full', barClassName)}
          style={{ width: `${(value / REVENUE_BAR_MAX) * PERCENT_SCALE}%` }}
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: shown ? 1 : 0 }}
          transition={{ duration: BAR_FILL_DURATION_S, ease: EASE_OUT }}
        />
      </div>
      <p className="text-muted-foreground text-[11px]">{note}</p>
    </div>
  );
}

/**
 * The two approved revenue figures side by side, explicitly labeled as independent: money sold
 * 100% by the AI and billing assisted by AI autocomplete. They are never summed.
 */
export function RevenueTile({ copy, lang }: { copy: DanysTortasCopy['revenue']; lang: LocaleKey }) {
  const { ref, shown, reduced } = useRevealOnView();
  const format = createCurrencyFormatter(lang);

  return (
    <ShowcaseTile span="two" className="min-h-80">
      <TileStage stageRef={ref} className="flex-col justify-center gap-4 p-5 sm:px-8">
        <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span>{copy.period}</span>
          <span>{copy.grossNote}</span>
        </div>
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-0">
          <Figure
            label={copy.sold.label}
            note={copy.sold.note}
            value={REVENUE_AI_SOLD_COP}
            format={format}
            shown={shown}
            reduced={reduced}
            barClassName="bg-primary"
          />
          <div className="relative flex shrink-0 items-center sm:mx-6">
            <span className="bg-border/70 hidden h-full w-px sm:block" aria-hidden="true" />
            <span className="text-muted-foreground bg-card/90 border-border/60 rounded-full border px-2 py-0.5 text-[10px] leading-none sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
              {copy.separateNote}
            </span>
          </div>
          <Figure
            label={copy.assisted.label}
            note={copy.assisted.note}
            value={REVENUE_AI_ASSISTED_COP}
            format={format}
            shown={shown}
            reduced={reduced}
            barClassName="bg-chart-3"
          />
        </div>
      </TileStage>
      <TileFooter icon={TrendingUp} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
