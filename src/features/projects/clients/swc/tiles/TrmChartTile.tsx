'use client';

import { motion } from 'motion/react';
import { LineChart } from 'lucide-react';
import { SampleBadge } from '@/features/projects/clients/shared/components/SampleBadge';
import { useRevealOnView } from '@/features/projects/clients/shared/hooks/useRevealOnView';
import {
  scaleSeries,
  scaleValue,
  toAreaPath,
  toLinePath
} from '@/features/projects/clients/shared/utils/chart';
import {
  CHART_DRAW_S,
  CHART_HEIGHT,
  CHART_MARKER_DELAY_S,
  CHART_PADDING,
  CHART_WIDTH,
  TRM_SAMPLE_SERIES,
  TRM_SAMPLE_THRESHOLD
} from '@/features/projects/clients/swc/constants/swc-config';
import type { SwcCopy } from '@/features/projects/clients/swc/constants/copy.types';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { EASE_OUT } from '@/features/projects/showcase-kit/constants/showcase-motion';
import type { LocaleKey } from '@/i18n/ui';

const SCALE = {
  width: CHART_WIDTH,
  height: CHART_HEIGHT,
  padding: CHART_PADDING,
  min: Math.min(...TRM_SAMPLE_SERIES),
  max: Math.max(...TRM_SAMPLE_SERIES)
};
const POINTS = scaleSeries(TRM_SAMPLE_SERIES, SCALE);
const LINE_PATH = toLinePath(POINTS);
const AREA_PATH = toAreaPath(POINTS, CHART_HEIGHT - CHART_PADDING);
const THRESHOLD_Y = scaleValue(TRM_SAMPLE_THRESHOLD, SCALE);
const BREACHES = POINTS.filter(
  (_, index) => (TRM_SAMPLE_SERIES[index] ?? 0) > TRM_SAMPLE_THRESHOLD
);
const MARKER_RADIUS = 2.6;
const FADE_S = 0.3;
const LINE_STROKE_PX = 2;
const THRESHOLD_STROKE_PX = 1;
const THRESHOLD_DASH = '4 3';

/** 30-day line against a threshold; days above it get an alert marker. Sample series, labeled. */
export function TrmChartTile({ copy, lang }: { copy: SwcCopy['chart']; lang: LocaleKey }) {
  const { ref, shown, reduced } = useRevealOnView();

  return (
    <ShowcaseTile span="two" className="min-h-96">
      <TileStage stageRef={ref} className="flex-col gap-2 px-5 pt-4 sm:px-8">
        <div
          className="flex flex-wrap items-center justify-between gap-2 text-[11px]"
          aria-hidden="true"
        >
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="bg-primary h-0.5 w-3 rounded-full" />
              {copy.seriesLabel}
            </span>
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="border-destructive/70 h-0 w-3 border-t border-dashed" />
              {copy.thresholdLabel}
            </span>
          </span>
          <SampleBadge lang={lang} />
        </div>
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="min-h-0 w-full flex-1"
          aria-hidden="true"
          focusable="false"
        >
          <path d={AREA_PATH} className="fill-primary/10" />
          <line
            x1={CHART_PADDING}
            x2={CHART_WIDTH - CHART_PADDING}
            y1={THRESHOLD_Y}
            y2={THRESHOLD_Y}
            className="stroke-destructive/70"
            strokeWidth={THRESHOLD_STROKE_PX}
            strokeDasharray={THRESHOLD_DASH}
          />
          <motion.path
            d={LINE_PATH}
            fill="none"
            className="stroke-primary"
            strokeWidth={LINE_STROKE_PX}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: shown ? 1 : 0 }}
            transition={{ duration: CHART_DRAW_S, ease: EASE_OUT }}
          />
          {BREACHES.map((point) => (
            <motion.circle
              key={point.x}
              cx={point.x}
              cy={point.y}
              r={MARKER_RADIUS}
              className="fill-destructive"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: shown ? 1 : 0 }}
              transition={{ duration: FADE_S, delay: CHART_MARKER_DELAY_S, ease: EASE_OUT }}
            />
          ))}
        </svg>
        <div className="text-muted-foreground flex justify-between text-[10px]" aria-hidden="true">
          <span>{copy.startLabel}</span>
          <span>{copy.endLabel}</span>
        </div>
      </TileStage>
      <TileFooter icon={LineChart} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
