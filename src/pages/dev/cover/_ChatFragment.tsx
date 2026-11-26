import { ChatBubble } from '@/features/projects/showcase-kit/components/ChatBubble';
import { ToolChip } from '@/features/projects/showcase-kit/components/ToolChip';

/** Sample conversation (generic copy, no customer data) for the Danys Tortas cover. */
const CUSTOMER_MESSAGE = 'Hola, quiero una torta de chocolate para el sábado.';
const AGENT_MESSAGE = 'Claro. ¿Para cuántas personas? Te muestro las opciones.';
const CUSTOMER_REPLY = 'Para 12 personas, con entrega a domicilio.';
const AGENT_REPLY = 'Perfecto, te armo el pedido y confirmo el valor del domicilio.';
const AGENT_TOOLS = ['catalog.search', 'order.draft', 'delivery.quote'] as const;
const CHAT_HEADER = 'WhatsApp · Agente de IA';
const SAMPLE_LABEL = 'Ejemplo';

/** Chat fragment composed with the showcase-kit bubble and tool chip. */
export function ChatFragment() {
  return (
    <div
      aria-hidden="true"
      className="bg-card border-border/60 flex w-[560px] flex-col gap-3 rounded-2xl border p-5 shadow-lg [&_p]:!px-4 [&_p]:!py-2.5 [&_p]:!text-[17px] [&_p.bg-primary]:!text-neutral-950 [&_span.font-mono]:!text-[13px]"
    >
      <div className="text-muted-foreground flex items-center justify-between font-mono text-[13px] uppercase">
        <span>{CHAT_HEADER}</span>
        <span>{SAMPLE_LABEL}</span>
      </div>
      <ChatBubble from="customer">{CUSTOMER_MESSAGE}</ChatBubble>
      <ChatBubble from="agent">{AGENT_MESSAGE}</ChatBubble>
      <ChatBubble from="customer">{CUSTOMER_REPLY}</ChatBubble>
      <ChatBubble from="agent">{AGENT_REPLY}</ChatBubble>
      <div className="flex gap-2 self-end">
        {AGENT_TOOLS.map((tool) => (
          <ToolChip key={tool}>{tool}</ToolChip>
        ))}
      </div>
    </div>
  );
}
