import type { MecateoCopy } from '@/features/projects/apps/mecateo/constants/copy.types';

/** Spanish copy of the Mecateo showcase. */
export const MECATEO_COPY_ES = {
  name: 'Mecateo',
  tagline: 'Soportes NFC para que tus clientes vuelvan y agentes de IA para atender y vender',
  hero: {
    title: 'Un toque, y tu cliente vuelve.',
    description:
      'Soportes NFC con QR de respaldo que llevan a reseñas, WhatsApp o tu menú. Cambias el destino sin reimprimir y ves cuántos toques recibe cada soporte.',
    ctaLive: 'Ver soportes NFC',
    ctaDetails: 'Ver detalles',
    standLabels: ['Mesa', 'Barra', 'Entrada'],
    tapLabel: 'Toque',
    qrBackup: 'QR de respaldo'
  },
  redirect: {
    title: 'Destino que se cambia sin reimprimir',
    description: 'El código impreso no cambia. El redirector decide a dónde lleva hoy.',
    printedLabel: 'Código impreso',
    destinationLabel: 'Lleva a',
    destinations: {
      reviews: 'Reseñas de Google',
      whatsapp: 'Chat de WhatsApp',
      menu: 'Menú del día'
    }
  },
  panel: {
    title: 'Panel «Mis NFC»',
    description: 'Cada soporte con su destino, su código y su conteo de toques.',
    frameTitle: 'Mis NFC',
    columns: { stand: 'Soporte', activity: 'Actividad', taps: 'Toques', code: 'Código' },
    standNames: ['Mesas 1–4', 'Barra', 'Entrada']
  },
  agent: {
    title: 'Agentes de IA que atienden y venden',
    description:
      'Responden por WhatsApp, registran pedidos y pasan a una persona cuando no saben. Motor de agentes de IA de Mecateo, en producción en Danys Tortas.',
    header: 'Agente de ventas',
    switchLabel: 'Agente activado',
    customer: 'Quiero 2 cajas del café de origen',
    reply: 'Listo. Te envío el link de pago. ¿A qué dirección lo mandamos?',
    chips: ['order.created', 'stock −2', 'handoff']
  },
  integrations: {
    title: 'Integraciones reales',
    description:
      'Pagos con Wompi, borde con Cloudflare, WhatsApp y Kommo a través del agente, modelos vía OpenRouter y un redirector en Go.',
    roles: {
      wompi: 'pagos del checkout',
      cloudflare: 'protección y borde',
      redirector: 'resuelve los códigos impresos',
      whatsapp: 'canal del agente',
      openrouter: 'modelos de lenguaje'
    }
  }
} as const satisfies MecateoCopy;
