import type { DanysTortasCopy } from '@/features/projects/clients/danystortas/constants/copy.types';

/** English copy of the Danys Tortas showcase. */
export const DANYSTORTAS_COPY_EN: DanysTortasCopy = {
  chat: {
    title: 'An agent that sells on WhatsApp',
    description:
      'Answers the customer, checks the catalog, builds the cart, takes payment and hands over to a person when needed.',
    header: 'Sales agent',
    customer: 'Hi, I would like a cake for Saturday.',
    reply: 'Sure. Here are the available options. How many people is it for?',
    chips: ['catalog', 'cart', 'order', 'payment', 'human handoff']
  },
  pipeline: {
    title: 'From a message to a reply',
    description:
      'The webhook only stores and enqueues. A worker processes the message, the agent decides and the rules validate before replying.',
    nodes: {
      whatsapp: { label: 'Customer WhatsApp', caption: 'WhatsApp' },
      kommo: { label: 'Kommo CRM', caption: 'Kommo' },
      webhook: { label: 'API webhook', caption: 'Webhook' },
      queue: { label: 'Message queue', caption: 'Queue' },
      agent: { label: 'Agent with tools', caption: 'Agent' },
      guards: { label: 'Validation rules', caption: 'Guards' },
      reply: { label: 'Reply to the customer', caption: 'Reply' }
    }
  },
  revenue: {
    title: 'Sales attributed to AI',
    description:
      'Two different figures, measured on the period gross billing. They are not summed and neither includes the other.',
    period: 'Oct 28 – Nov 27, 2026',
    grossNote: 'Gross billing, COP',
    separateNote: 'Independent figures',
    sold: { label: 'AI profit', note: 'Sold 100% by the AI' },
    assisted: {
      label: 'AI assist — themed cakes',
      note: 'Billed with AI autocomplete'
    }
  },
  volume: {
    title: 'Volume the agent absorbs',
    description: 'Peak customers served in a single day and the share of replies sent by the AI.',
    peakLabel: 'customers in one day',
    peakContext: 'Peak, last 90 days',
    shareLabel: 'of replies',
    shareContext: 'Sent by the AI, Jul–Nov 2026'
  }
};
