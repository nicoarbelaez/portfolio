import type { SwcCopy } from '@/features/projects/clients/swc/constants/copy.types';

/** Spanish copy of the SWC showcase. */
export const SWC_COPY_ES: SwcCopy = {
  radar: {
    title: 'Un radar de avisos con reglas legibles',
    description:
      'Cada aviso nace de una regla que se puede leer, con su severidad y un enlace a la fuente original.',
    header: 'Avisos',
    severities: { info: 'Informativa', watch: 'Vigilar', alert: 'Alerta' },
    alerts: {
      trm: { title: 'La TRM supera el umbral de variación diaria', source: 'TRM' },
      secop: { title: 'Un contrato de SECOP II vence pronto', source: 'SECOP II' },
      energy: { title: 'El precio de la energía en bolsa sube en la semana', source: 'XM' },
      regulation: { title: 'Un decreto menciona una palabra clave', source: 'Regulación' }
    }
  },
  chart: {
    title: 'La TRM contra un umbral',
    description:
      'La serie de 30 días se compara con el umbral que configura cada empresa. Los días que lo superan generan un aviso.',
    seriesLabel: 'TRM, 30 días',
    thresholdLabel: 'Umbral',
    startLabel: 'Hace 30 días',
    endLabel: 'Hoy'
  },
  assistant: {
    title: 'Un asistente que consulta datos reales',
    description:
      'El modelo no inventa cifras: llama herramientas de solo lectura y responde con lo que devuelven.',
    header: 'Asistente',
    question: '¿Cómo se movió el dólar esta semana y qué contratos vencen pronto?',
    answer:
      'La TRM superó el umbral configurado. Hay dos contratos por vencer. Detecté dos señales para revisar.'
  },
  sources: {
    title: 'De datos públicos a decisiones',
    description:
      'Fuentes abiertas entran a un motor de reglas. De ahí salen los avisos agrupados por PESTEL y un resumen semanal.',
    rss: 'RSS de noticias',
    rules: { label: 'Motor de reglas', caption: 'Reglas' },
    pestel: { label: 'Agrupación PESTEL', caption: 'PESTEL' },
    briefing: { label: 'Resumen semanal', caption: 'Resumen' }
  }
};
