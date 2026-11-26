import type { MecateoCopy } from '@/features/projects/apps/mecateo/constants/copy.types';

/** English copy of the Mecateo showcase. */
export const MECATEO_COPY_EN = {
  name: 'Mecateo',
  tagline: 'NFC stands that bring customers back, and AI agents for support and sales',
  hero: {
    title: 'One tap, and your customer comes back.',
    description:
      'NFC stands with a QR backup that open reviews, WhatsApp or your menu. Change the destination without reprinting and see how many taps each stand gets.',
    ctaLive: 'See NFC stands',
    ctaDetails: 'View details',
    standLabels: ['Table', 'Bar', 'Entrance'],
    tapLabel: 'Tap',
    qrBackup: 'QR backup'
  },
  redirect: {
    title: 'A destination you change without reprinting',
    description: 'The printed code never changes. The redirector decides where it leads today.',
    printedLabel: 'Printed code',
    destinationLabel: 'Leads to',
    destinations: {
      reviews: 'Google reviews',
      whatsapp: 'WhatsApp chat',
      menu: 'Menu of the day'
    }
  },
  panel: {
    title: '“Mis NFC” panel',
    description: 'Every stand with its destination, its code and its tap count.',
    frameTitle: 'Mis NFC',
    columns: { stand: 'Stand', activity: 'Activity', taps: 'Taps', code: 'Code' },
    standNames: ['Tables 1–4', 'Bar', 'Entrance']
  },
  agent: {
    title: 'AI agents that answer and sell',
    description:
      'They reply on WhatsApp, log orders and hand over to a person when they do not know. Mecateo AI agent engine, in production at Danys Tortas.',
    header: 'Sales agent',
    switchLabel: 'Agent on',
    customer: 'I want 2 boxes of the single-origin coffee',
    reply: 'Done. I am sending the payment link. Which address should we ship to?',
    chips: ['order.created', 'stock −2', 'handoff']
  },
  integrations: {
    title: 'Real integrations',
    description:
      'Wompi payments, Cloudflare at the edge, WhatsApp and Kommo through the agent, models via OpenRouter and a Go redirector.',
    roles: {
      wompi: 'checkout payments',
      cloudflare: 'protection and edge',
      redirector: 'resolves printed codes',
      whatsapp: 'agent channel',
      openrouter: 'language models'
    }
  }
} as const satisfies MecateoCopy;
