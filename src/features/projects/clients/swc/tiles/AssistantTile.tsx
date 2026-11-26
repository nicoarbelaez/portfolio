'use client';

import { Sparkles } from 'lucide-react';
import { useStreamSequence } from '@/features/projects/clients/shared/hooks/useStreamSequence';
import {
  ASSISTANT_TOOLS,
  STREAM_CHARS_PER_TICK,
  STREAM_CHIP_TICKS,
  STREAM_HOLD_TICKS,
  STREAM_QUESTION_TICKS,
  STREAM_TICK_MS
} from '@/features/projects/clients/swc/constants/swc-config';
import type { SwcCopy } from '@/features/projects/clients/swc/constants/copy.types';
import { ChatBubble } from '@/features/projects/showcase-kit/components/ChatBubble';
import { ChatViewport } from '@/features/projects/showcase-kit/components/ChatViewport';
import { PhoneFrame, PhoneHeader } from '@/features/projects/showcase-kit/components/PhoneFrame';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { ToolChip } from '@/features/projects/showcase-kit/components/ToolChip';
import type { LocaleKey } from '@/i18n/ui';

/** Assistant replica: a question, the read-only tools it calls, then the answer streaming in. */
export function AssistantTile({ copy }: { copy: SwcCopy['assistant']; lang?: LocaleKey }) {
  const { ref, questionShown, chips, chars } = useStreamSequence({
    chipCount: ASSISTANT_TOOLS.length,
    answerLength: copy.answer.length,
    tickMs: STREAM_TICK_MS,
    questionTicks: STREAM_QUESTION_TICKS,
    chipTicks: STREAM_CHIP_TICKS,
    charsPerTick: STREAM_CHARS_PER_TICK,
    holdTicks: STREAM_HOLD_TICKS
  });

  return (
    <ShowcaseTile className="min-h-96">
      <TileStage stageRef={ref} className="justify-center px-4 pt-4">
        <PhoneFrame className="h-full w-full max-w-[17rem] rounded-b-none">
          <PhoneHeader icon={Sparkles} title={copy.header} />
          <ChatViewport>
            {questionShown ? <ChatBubble from="customer">{copy.question}</ChatBubble> : null}
            <div className="flex flex-wrap gap-1.5">
              {ASSISTANT_TOOLS.slice(0, chips).map((tool) => (
                <ToolChip key={tool}>{tool}</ToolChip>
              ))}
            </div>
            {chars > 0 ? <ChatBubble from="agent">{copy.answer.slice(0, chars)}</ChatBubble> : null}
          </ChatViewport>
        </PhoneFrame>
      </TileStage>
      <TileFooter icon={Sparkles} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
