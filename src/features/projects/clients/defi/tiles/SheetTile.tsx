'use client';

import { motion, useReducedMotion } from 'motion/react';
import { PlayCircle, Table2 } from 'lucide-react';
import { SampleBadge } from '@/features/projects/clients/shared/components/SampleBadge';
import {
  SHEET_ROW_COUNT,
  SHEET_STAGES,
  SHEET_STEP_MS
} from '@/features/projects/clients/defi/constants/defi-config';
import type { DefiCopy } from '@/features/projects/clients/defi/constants/copy.types';
import { AppFrame } from '@/features/projects/showcase-kit/components/AppFrame';
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

const ROW_GRID_CLASS = 'grid grid-cols-[1fr_1.4fr_auto] items-center gap-2 px-2.5';
const EMPTY_CELL = '—';

/** Stage of one row: 0 empty, 1 group list, 2 group set, 3 exercise list, 4 exercise and link set. */
function rowStage(revealed: number, rowIndex: number): number {
  return Math.min(Math.max(revealed - rowIndex * SHEET_STAGES, 0), SHEET_STAGES);
}

interface DropdownProps {
  options: readonly string[];
  selected: string;
  /** Open upward for the last row so the list stays inside the frame. */
  upward: boolean;
  reduced: boolean;
}

/** Open dropdown list of the sheet cell (selected option highlighted). */
function Dropdown({ options, selected, upward, reduced }: DropdownProps) {
  return (
    <motion.ul
      initial={reduced ? false : { opacity: 0, y: upward ? ENTER_OFFSET_PX : -ENTER_OFFSET_PX }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ENTER_DURATION_S, ease: EASE_OUT }}
      className={cn(
        'bg-popover text-popover-foreground border-border absolute left-0 z-20 min-w-full rounded-md border p-0.5 shadow-md',
        upward ? 'bottom-full mb-0.5' : 'top-full mt-0.5'
      )}
    >
      {options.map((option) => (
        <li
          key={option}
          className={cn(
            'rounded px-1.5 py-0.5 text-[10px] whitespace-nowrap',
            option === selected && 'bg-primary/15 text-foreground font-medium'
          )}
        >
          {option}
        </li>
      ))}
    </motion.ul>
  );
}

/** Spreadsheet replica: muscle group, exercise and video link fill in through dependent dropdowns. */
export function SheetTile({ copy, lang }: { copy: DefiCopy['sheet']; lang: LocaleKey }) {
  const totalSteps = SHEET_ROW_COUNT * SHEET_STAGES;
  const { ref, value: revealed } = useRevealCount(totalSteps, SHEET_STEP_MS);
  const reduced = useReducedMotion() ?? false;

  return (
    <ShowcaseTile span="two" className="min-h-96" accent="chart-2">
      <TileStage stageRef={ref} className="px-4 pt-4 sm:px-8">
        <AppFrame title={copy.frameTitle} className="h-full w-full rounded-b-none">
          <div className="border-border/60 flex items-center justify-between gap-2 border-b px-2.5 py-1.5 text-[11px]">
            <span className="flex items-center gap-2">
              <Table2 className="text-primary size-3.5" aria-hidden="true" />
              <span className="text-muted-foreground">{copy.clientLabel}</span>
              <span className="bg-muted h-2 w-16 rounded-full" />
            </span>
            <SampleBadge lang={lang} />
          </div>
          <div
            className={cn(
              ROW_GRID_CLASS,
              'bg-muted/50 text-muted-foreground border-border/60 border-b py-1.5 text-[10px] font-semibold uppercase'
            )}
          >
            <span>{copy.columns.group}</span>
            <span>{copy.columns.exercise}</span>
            <span>{copy.columns.link}</span>
          </div>
          {copy.rows.map((row, index) => {
            const stage = rowStage(revealed, index);
            const upward = index === SHEET_ROW_COUNT - 1;
            return (
              <div
                key={row.group}
                className={cn(ROW_GRID_CLASS, 'border-border/40 border-b py-2 text-[11px]')}
              >
                <span
                  className={cn(
                    'relative rounded px-1.5 py-0.5',
                    stage === 1 && 'ring-primary ring-1'
                  )}
                >
                  {stage >= 2 ? row.group : EMPTY_CELL}
                  {stage === 1 ? (
                    <Dropdown
                      options={copy.groupOptions}
                      selected={row.group}
                      upward={upward}
                      reduced={reduced}
                    />
                  ) : null}
                </span>
                <span
                  className={cn(
                    'relative rounded px-1.5 py-0.5',
                    stage === 3 && 'ring-primary ring-1'
                  )}
                >
                  {stage >= 4 ? row.exercise : EMPTY_CELL}
                  {stage === 3 ? (
                    <Dropdown
                      options={row.options}
                      selected={row.exercise}
                      upward={upward}
                      reduced={reduced}
                    />
                  ) : null}
                </span>
                <span className="text-primary flex items-center gap-1">
                  {stage >= 4 ? (
                    <>
                      <PlayCircle className="size-3" aria-hidden="true" />
                      {copy.linkLabel}
                    </>
                  ) : (
                    <span className="text-muted-foreground">{EMPTY_CELL}</span>
                  )}
                </span>
              </div>
            );
          })}
        </AppFrame>
      </TileStage>
      <TileFooter icon={Table2} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
