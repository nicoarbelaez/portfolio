import type { DanysTortasCopy } from '@/features/projects/clients/danystortas/constants/copy.types';

/** Spanish copy of the Danys Tortas showcase. */
export const DANYSTORTAS_COPY_ES: DanysTortasCopy = {
  chat: {
    title: 'Un agente que vende por WhatsApp',
    description:
      'Atiende al cliente, consulta el catálogo, arma el carrito, cobra y pasa a una persona cuando hace falta.',
    header: 'Agente de ventas',
    customer: 'Hola, quiero una torta para el sábado.',
    reply: 'Claro. Estas son las opciones disponibles. ¿Para cuántas personas?',
    chips: ['catálogo', 'carrito', 'pedido', 'pago', 'traspaso a humano']
  },
  pipeline: {
    title: 'De un mensaje a una respuesta',
    description:
      'El webhook solo guarda y encola. Un worker procesa el mensaje, el agente decide y las reglas validan antes de responder.',
    nodes: {
      whatsapp: { label: 'WhatsApp del cliente', caption: 'WhatsApp' },
      kommo: { label: 'Kommo CRM', caption: 'Kommo' },
      webhook: { label: 'Webhook de la API', caption: 'Webhook' },
      queue: { label: 'Cola de mensajes', caption: 'Cola' },
      agent: { label: 'Agente con herramientas', caption: 'Agente' },
      guards: { label: 'Reglas de validación', caption: 'Reglas' },
      reply: { label: 'Respuesta al cliente', caption: 'Respuesta' }
    }
  },
  revenue: {
    title: 'Ventas atribuidas a la IA',
    description:
      'Dos cifras distintas, medidas sobre la facturación bruta del período. No se suman ni una incluye a la otra.',
    period: '28 oct – 27 nov 2026',
    grossNote: 'Facturación bruta, COP',
    separateNote: 'Cifras independientes',
    sold: { label: 'Ganancia IA', note: 'Vendido 100 % por la IA' },
    assisted: {
      label: 'Ayuda IA — tortas temáticas',
      note: 'Facturado con autocompletado de IA'
    }
  },
  volume: {
    title: 'Volumen que absorbe el agente',
    description:
      'Pico de clientes atendidos en un solo día y proporción de respuestas enviadas por la IA.',
    peakLabel: 'clientes en un día',
    peakContext: 'Pico, últimos 90 días',
    shareLabel: 'de las respuestas',
    shareContext: 'Enviadas por la IA, jul–nov 2026'
  }
};
