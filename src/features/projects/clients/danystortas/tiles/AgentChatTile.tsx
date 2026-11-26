'use client';

import { Bot, MessageCircle } from 'lucide-react';
import { CHAT_STEP_MS } from '@/features/projects/clients/danystortas/constants/danystortas-config';
import type { DanysTortasCopy } from '@/features/projects/clients/danystortas/constants/copy.types';
import { ChatBubble } from '@/features/projects/showcase-kit/components/ChatBubble';
import { ChatViewport } from '@/features/projects/showcase-kit/components/ChatViewport';
import { PhoneFrame, PhoneHeader } from '@/features/projects/showcase-kit/components/PhoneFrame';
import { ShowcaseTile } from '@/features/projects/showcase-kit/components/ShowcaseTile';
import { TileFooter } from '@/features/projects/showcase-kit/components/TileFooter';
import { TileStage } from '@/features/projects/showcase-kit/components/TileStage';
import { ToolChip } from '@/features/projects/showcase-kit/components/ToolChip';
import { useRevealCount } from '@/features/projects/showcase-kit/hooks/useTileTicker';
import type { LocaleKey } from '@/i18n/ui';

/** Steps before the tool chips: customer message, agent reply. */
const MESSAGE_STEPS = 2;

/** WhatsApp conversation replica: bubbles first, then the tool calls the agent runs. */
export function AgentChatTile({ copy }: { copy: DanysTortasCopy['chat']; lang?: LocaleKey }) {
  const totalSteps = MESSAGE_STEPS + copy.chips.length;
  const { ref, value: revealed } = useRevealCount(totalSteps, CHAT_STEP_MS);
  const visibleChips = copy.chips.slice(0, Math.max(0, revealed - MESSAGE_STEPS));

  return (
    <ShowcaseTile>
      <TileStage stageRef={ref} className="justify-center px-4 pt-4">
        <PhoneFrame className="h-full w-full max-w-[15rem] rounded-b-none">
          <PhoneHeader icon={MessageCircle} title={copy.header} />
          <ChatViewport>
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
