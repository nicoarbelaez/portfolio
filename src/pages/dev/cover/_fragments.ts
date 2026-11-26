import type { ArchitectureProps } from '@/components/doc-blocks/schemas/doc-block-schemas';

/**
 * Architecture fragments for covers: trimmed copies of each project's overview `<Architecture>`
 * (same node ids, labels and kinds; fewer nodes so they stay legible at 640 px).
 */
export const COVER_ARCHITECTURES: Readonly<Record<string, ArchitectureProps>> = {
  swc: {
    layers: [
      {
        id: 'sources',
        label: 'Fuentes públicas',
        nodes: [
          { id: 'datosgov', label: 'datos.gov.co', kind: 'external', detail: 'TRM, SECOP II' },
          { id: 'xm', label: 'XM', kind: 'external', detail: 'Precio de energía' },
          { id: 'rss', label: 'RSS de medios', kind: 'external' }
        ]
      },
      {
        id: 'app',
        label: 'Aplicación',
        nodes: [
          { id: 'core', label: 'Motor de reglas', kind: 'service', detail: 'src/core' },
          { id: 'ui', label: 'Interfaz', kind: 'client', detail: 'Next.js' },
          { id: 'assistant', label: 'Asistente de IA', kind: 'ai', detail: 'Vercel AI SDK' }
        ]
      }
    ],
    edges: [
      { from: 'datosgov', to: 'core' },
      { from: 'xm', to: 'core' },
      { from: 'rss', to: 'core' },
      { from: 'core', to: 'ui', label: 'avisos' },
      { from: 'assistant', to: 'core', label: 'herramientas' }
    ]
  },
  defi: {
    layers: [
      {
        id: 'client',
        label: 'Cliente',
        nodes: [
          { id: 'sheet', label: 'Hoja de rutina', kind: 'client', detail: 'Google Sheets' },
          { id: 'appsheet', label: 'App de intercambios', kind: 'client', detail: 'AppSheet' }
        ]
      },
      {
        id: 'logic',
        label: 'Lógica',
        nodes: [
          { id: 'script', label: 'Script de la hoja', kind: 'service', detail: 'Apps Script' },
          { id: 'db', label: 'Base de datos', kind: 'data', detail: 'JSON' },
          { id: 'muscle', label: 'API de mapa muscular', kind: 'service', detail: 'Express 5' }
        ]
      }
    ],
    edges: [
      { from: 'sheet', to: 'script', label: 'onEdit' },
      { from: 'script', to: 'db', label: 'JSON' },
      { from: 'appsheet', to: 'muscle' }
    ]
  },
  'living-sports': {
    layers: [
      {
        id: 'app',
        label: 'App',
        nodes: [{ id: 'mobile', label: 'App Android', kind: 'client', detail: 'Expo 54' }]
      },
      {
        id: 'supabase',
        label: 'Supabase',
        nodes: [
          { id: 'auth', label: 'Auth', kind: 'service', detail: 'Google OAuth' },
          { id: 'edge', label: 'Edge Functions', kind: 'worker', detail: 'Deno' },
          { id: 'db', label: 'PostgreSQL', kind: 'data', detail: 'RLS y auditoría' }
        ]
      }
    ],
    edges: [
      { from: 'mobile', to: 'auth', label: 'sesión' },
      { from: 'mobile', to: 'edge' },
      { from: 'mobile', to: 'db' },
      { from: 'edge', to: 'db' }
    ]
  },
  appsalon: {
    layers: [
      {
        id: 'ui',
        label: 'Interfaz',
        nodes: [{ id: 'spa', label: 'React 19', kind: 'client', detail: 'Inertia 3' }]
      },
      {
        id: 'app',
        label: 'Laravel 13',
        nodes: [
          { id: 'http', label: 'API HTTP', kind: 'service', detail: 'Roles y Fortify' },
          { id: 'queue', label: 'Cola', kind: 'worker', detail: 'Reportes PDF' }
        ]
      },
      {
        id: 'data',
        label: 'Datos',
        nodes: [{ id: 'mysql', label: 'MySQL 8', kind: 'data' }]
      }
    ],
    edges: [
      { from: 'spa', to: 'http', label: 'Inertia' },
      { from: 'http', to: 'mysql' },
      { from: 'http', to: 'queue', label: 'encola', async: true },
      { from: 'queue', to: 'mysql', async: true }
    ]
  },
  'claude-identity': {
    layers: [
      {
        id: 'host',
        label: 'Claude Code',
        nodes: [
          { id: 'plugin', label: 'Plugin', kind: 'client', detail: 'Hooks y skills' },
          { id: 'status', label: 'Status line', kind: 'channel', detail: 'Uso por cuenta' }
        ]
      },
      {
        id: 'cli',
        label: 'cid',
        nodes: [
          { id: 'cmd', label: 'CLI', kind: 'service', detail: 'Go 1.26' },
          { id: 'swap', label: 'Swap seguro', kind: 'worker', detail: 'Locks y rollback' }
        ]
      },
      {
        id: 'os',
        label: 'Sistema',
        nodes: [{ id: 'keyring', label: 'Llavero del SO', kind: 'infra' }]
      }
    ],
    edges: [
      { from: 'plugin', to: 'cmd', label: 'cid hook' },
      { from: 'status', to: 'cmd' },
      { from: 'cmd', to: 'swap' },
      { from: 'swap', to: 'keyring' }
    ]
  }
};
