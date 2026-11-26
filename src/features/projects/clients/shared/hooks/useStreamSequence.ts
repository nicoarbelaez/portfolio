'use client';

import type { RefObject } from 'react';
import { useTileTicker } from '@/features/projects/showcase-kit/hooks/useTileTicker';

interface StreamSequenceOptions {
  chipCount: number;
  answerLength: number;
  tickMs: number;
  /** Ticks before the first chip (the question is visible from tick 1). */
  questionTicks: number;
  chipTicks: number;
  charsPerTick: number;
  /** Ticks the complete state stays before the loop restarts. */
  holdTicks: number;
}

/** What is visible at the current tick of a question, tool calls, streamed answer sequence. */
export type StreamSequenceResult = {
  ref: RefObject<HTMLDivElement | null>;
  questionShown: boolean;
  chips: number;
  /** Characters of the answer streamed so far. */
  chars: number;
};

/**
 * Drives an assistant replica: question, then tool chips one by one, then the answer streaming
 * in characters, then a hold before restarting. Runs only in view; reduced motion returns the
 * complete final state.
 */
export function useStreamSequence(options: StreamSequenceOptions): StreamSequenceResult {
  const { chipCount, answerLength, tickMs, questionTicks, chipTicks, charsPerTick, holdTicks } =
    options;
  const { ref, value, reduced } = useTileTicker(tickMs);

  if (reduced) return { ref, questionShown: true, chips: chipCount, chars: answerLength };

  const chipsEnd = questionTicks + chipCount * chipTicks;
  const cycle = chipsEnd + Math.ceil(answerLength / charsPerTick) + holdTicks;
  const tick = value % cycle;

  return {
    ref,
    questionShown: tick >= 1,
    chips:
      tick < questionTicks
        ? 0
        : Math.min(chipCount, Math.floor((tick - questionTicks) / chipTicks) + 1),
    chars: Math.min(answerLength, Math.max(0, tick - chipsEnd) * charsPerTick)
  };
}
