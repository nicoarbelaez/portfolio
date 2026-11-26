'use client';

import { Bot } from 'lucide-react';
import { AGENT_STEP_MS } from '@/features/projects/apps/mecateo/constants/mecateo-config';
import type { MecateoCopy } from '@/features/projects/apps/mecateo/constants/copy.types';
import { ChatBubble } from '@/features/projects/showcase-kit/components/ChatBubble';
import { PhoneFrame } from '@/features/projects/showcase-kit/components/PhoneFrame';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { ToolChip } from '@/features/projects/showcase-kit/components/ToolChip';
import { useRevealCount } from '@/features/projects/showcase-kit/hooks/useTileTicker';

/** Steps before the tool chips: customer message, agent reply. */
const MESSAGE_STEPS = 2;

/** Replica of an agent conversation: bubbles, then tool chips (`order.created`, `stock −2`, `handoff`). */
export function AgentChatTile({ copy }: { copy: MecateoCopy['agent'] }) {
  const totalSteps = MESSAGE_STEPS + copy.chips.length;
  const { ref, value: revealed } = useRevealCount(totalSteps, AGENT_STEP_MS);
  const visibleChips = copy.chips.slice(0, Math.max(0, revealed - MESSAGE_STEPS));

  return (
    <ShowcaseTile className="min-h-96">
      <TileStage stageRef={ref} className="justify-center px-4 pt-4">
        <PhoneFrame className="h-full w-full max-w-[15rem] rounded-b-none">
          <div className="border-border/60 flex items-center justify-between gap-2 border-b px-2.5 pb-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold">
              <Bot className="text-primary size-3.5" aria-hidden="true" />
              {copy.header}
            </span>
            <span className="flex items-center gap-1 text-[10px]">
              <span className="bg-primary relative h-3 w-5 rounded-full">
                <span className="bg-primary-foreground absolute top-0.5 right-0.5 size-2 rounded-full" />
              </span>
              {copy.switchLabel}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-2.5">
            <span className="text-muted-foreground self-center text-[9px] tracking-wide uppercase">
              {copy.sampleBadge}
            </span>
            {revealed >= 1 ? <ChatBubble from="customer">{copy.customer}</ChatBubble> : null}
            {revealed >= MESSAGE_STEPS ? <ChatBubble from="agent">{copy.reply}</ChatBubble> : null}
            <div className="flex flex-wrap gap-1.5">
              {visibleChips.map((chip) => (
                <ToolChip key={chip}>{chip}</ToolChip>
              ))}
            </div>
          </div>
        </PhoneFrame>
      </TileStage>
      <TileFooter icon={Bot} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
