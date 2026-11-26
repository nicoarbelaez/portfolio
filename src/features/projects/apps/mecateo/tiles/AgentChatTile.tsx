'use client';

import { Bot } from 'lucide-react';
import { AGENT_STEP_MS } from '@/features/projects/apps/mecateo/constants/mecateo-config';
import type { MecateoCopy } from '@/features/projects/apps/mecateo/constants/copy.types';
import { ChatBubble } from '@/features/projects/showcase-kit/components/ChatBubble';
import { ChatViewport } from '@/features/projects/showcase-kit/components/ChatViewport';
import { PhoneFrame, PhoneHeader } from '@/features/projects/showcase-kit/components/PhoneFrame';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { ToolChip } from '@/features/projects/showcase-kit/components/ToolChip';
import { useRevealCount } from '@/features/projects/showcase-kit/hooks/useTileTicker';

/** Steps before the tool chips: customer message, agent reply. */
const MESSAGE_STEPS = 2;

/** Floating "agent on" switch: a blurred pill over the chat, not part of the header. */
function AgentSwitch({ label }: { label: string }) {
  return (
    <span className="bg-background/70 border-border/60 flex items-center gap-1 rounded-full border py-0.5 pr-2 pl-1 text-[10px] whitespace-nowrap shadow-sm backdrop-blur-md">
      <span className="bg-primary relative h-3 w-5 shrink-0 rounded-full">
        <span className="bg-primary-foreground absolute top-0.5 right-0.5 size-2 rounded-full" />
      </span>
      {label}
    </span>
  );
}

/** Replica of an agent conversation: bubbles, then tool chips (`order.created`, `stock −2`, `handoff`). */
export function AgentChatTile({ copy }: { copy: MecateoCopy['agent'] }) {
  const totalSteps = MESSAGE_STEPS + copy.chips.length;
  const { ref, value: revealed } = useRevealCount(totalSteps, AGENT_STEP_MS);
  const visibleChips = copy.chips.slice(0, Math.max(0, revealed - MESSAGE_STEPS));

  return (
    <ShowcaseTile className="min-h-96">
      <TileStage stageRef={ref} className="justify-center px-4 pt-4">
        <PhoneFrame className="h-full w-full max-w-[15rem] rounded-b-none">
          <PhoneHeader icon={Bot} title={copy.header} />
          <ChatViewport overlay={<AgentSwitch label={copy.switchLabel} />}>
            {revealed >= 1 ? <ChatBubble from="customer">{copy.customer}</ChatBubble> : null}
            {revealed >= MESSAGE_STEPS ? <ChatBubble from="agent">{copy.reply}</ChatBubble> : null}
            <div className="flex flex-wrap gap-1.5">
              {visibleChips.map((chip) => (
                <ToolChip key={chip}>{chip}</ToolChip>
              ))}
            </div>
          </ChatViewport>
        </PhoneFrame>
      </TileStage>
      <TileFooter icon={Bot} title={copy.title} description={copy.description} />
    </ShowcaseTile>
  );
}
