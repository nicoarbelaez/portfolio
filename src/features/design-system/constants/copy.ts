import type { LocaleKey } from '@/i18n/ui';
import type { DesignSystemCopy } from '../types/copy';

/** Page copy per locale. */
export const DESIGN_SYSTEM_COPY = {
  en: {
    title: 'Design system',
    description:
      'Tokens, motion rules and MDX documentation blocks used across the portfolio case studies.',
    badge: 'Design system',
    headline: 'Motion graphics for documentation',
    intro:
      'One set of tokens and motion rules drives every project page. Documentation blocks explain how a system moves, not only what it is made of.',
    tokens: {
      title: 'Tokens',
      colors: 'Color',
      type: 'Type scale',
      radius: 'Radius',
      spacing: 'Spacing'
    },
    motion: {
      title: 'Motion rules',
      intro: 'Motion explains structure and order. It never decorates what users see all day.',
      rules: [
        'Purpose first: animate to show flow, hierarchy or state change.',
        'Strong ease-out, 400 ms entrances, 60 ms stagger.',
        'Play once when the block enters the viewport.',
        'prefers-reduced-motion renders the final state, no movement.',
        'Only transform and opacity. Tokens for color, so light and dark both work.'
      ]
    },
    blocks: {
      title: 'Documentation blocks',
      intro: 'Available in every project MDX file without imports.',
      usage: 'MDX usage',
      live: 'Rendered from MDX'
    },
    kit: {
      title: 'Showcase kit',
      intro: 'Tiles used by the landing showcases.'
    }
  },
  es: {
    title: 'Design system',
    description:
      'Tokens, reglas de movimiento y bloques MDX de documentación usados en los casos de estudio del portafolio.',
    badge: 'Design system',
    headline: 'Motion graphics para documentación',
    intro:
      'Un mismo conjunto de tokens y reglas de movimiento guía cada página de proyecto. Los bloques explican cómo se mueve un sistema, no solo de qué está hecho.',
    tokens: {
      title: 'Tokens',
      colors: 'Color',
      type: 'Escala tipográfica',
      radius: 'Radio',
      spacing: 'Espaciado'
    },
    motion: {
      title: 'Reglas de movimiento',
      intro: 'El movimiento explica estructura y orden. No decora lo que se ve todo el día.',
      rules: [
        'Propósito primero: animar para mostrar flujo, jerarquía o cambio de estado.',
        'Ease-out fuerte, entradas de 400 ms, escalonado de 60 ms.',
        'Se reproduce una vez al entrar en el viewport.',
        'prefers-reduced-motion muestra el estado final, sin movimiento.',
        'Solo transform y opacity. Colores por tokens, así funcionan claro y oscuro.'
      ]
    },
    blocks: {
      title: 'Bloques de documentación',
      intro: 'Disponibles en cada MDX de proyecto sin imports.',
      usage: 'Uso en MDX',
      live: 'Renderizado desde MDX'
    },
    kit: {
      title: 'Showcase kit',
      intro: 'Tiles usados por los showcases de la landing.'
    }
  }
} as const satisfies Record<LocaleKey, DesignSystemCopy>;
