'use client';

import { Table2 } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PANEL_SAMPLE_ROWS,
  PANEL_STEP_MS
} from '@/features/projects/apps/mecateo/constants/mecateo-config';
import type { MecateoCopy } from '@/features/projects/apps/mecateo/constants/copy.types';
import { Sparkline } from '@/features/projects/apps/mecateo/tiles/Sparkline';
import { AppFrame } from '@/features/projects/showcase-kit/components/AppFrame';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import {
  EASE_OUT,
  ENTER_DURATION_S,
  ENTER_OFFSET_PX
} from '@/features/projects/showcase-kit/constants/showcase-motion';
import { useRevealCount } from '@/features/projects/showcase-kit/hooks/useTileTicker';

const ROW_GRID = 'grid grid-cols-[1.3fr_1fr_0.6fr_0.7fr] items-center gap-2 px-3 py-2';

/** Replica of the "Mis NFC" panel: stands, activity trend, tap counts and codes. */
export function PanelTile({ copy }: { copy: MecateoCopy['panel'] }) {
  const { ref, value: revealed, reduced } = useRevealCount(PANEL_SAMPLE_ROWS.length, PANEL_STEP_MS);
  const { columns } = copy;

  return (
    <ShowcaseTile span="two">
      <TileStage stageRef={ref} className="items-center justify-center p-4">
        <AppFrame title={copy.frameTitle} className="w-full max-w-lg">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs font-semibold">{copy.frameTitle}</span>
          </div>
          <div
            className={`${ROW_GRID} text-muted-foreground border-border/60 border-y text-[10px] uppercase`}
          >
            <span>{columns.stand}</span>
            <span>{columns.activity}</span>
            <span className="text-right">{columns.taps}</span>
            <span>{columns.code}</span>
          </div>
          {PANEL_SAMPLE_ROWS.map((row, i) =>
            i < revealed ? (
              <motion.div
                key={row.id}
                initial={reduced ? false : { opacity: 0, y: ENTER_OFFSET_PX }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: ENTER_DURATION_S, ease: EASE_OUT }}
                className={`${ROW_GRID} border-border/40 border-b text-xs last:border-b-0`}
              >
                <span className="truncate font-medium">{copy.standNames[i]}</span>
                <Sparkline points={row.trend} reduced={reduced} />
                <span className="text-right font-mono tabular-nums">{row.taps}</span>
                <span className="text-muted-foreground font-mono text-[10px]">{row.code}</span>
              </motion.div>
            ) : (
              <div key={row.id} className="h-[2.1rem]" />
            )
          )}
        </AppFrame>
      </TileStage>
      <TileFooter icon={Table2} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
