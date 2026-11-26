import type {
  ArchitectureProps,
  FlowProps,
  MetricGridProps,
  StackGridProps
} from '@/components/doc-blocks/schemas/doc-block-schemas';

/** Generic sample system ("order assistant") used to demo each block. */
export const SAMPLE_ARCHITECTURE: ArchitectureProps = {
  layers: [
    {
      id: 'in',
      label: 'Clients',
      nodes: [
        { id: 'chat', label: 'Chat', kind: 'channel', detail: 'Messaging webhook' },
        { id: 'web', label: 'Web app', kind: 'client' }
      ]
    },
    {
      id: 'core',
      label: 'Core',
      nodes: [
        { id: 'api', label: 'API', kind: 'service', detail: 'REST + auth' },
        { id: 'agent', label: 'Agent', kind: 'ai', detail: 'Tool calling' }
      ]
    },
    {
      id: 'out',
      label: 'Data',
      nodes: [
        { id: 'db', label: 'Database', kind: 'data' },
        { id: 'pay', label: 'Payments', kind: 'external' }
      ]
    }
  ],
  edges: [
    { from: 'chat', to: 'agent', label: 'messages' },
    { from: 'web', to: 'api' },
    { from: 'api', to: 'db' },
    { from: 'agent', to: 'pay', label: 'charge', async: true }
  ]
};

export const SAMPLE_FLOW: FlowProps = {
  steps: [
    { actor: 'Customer', action: 'Sends an order by chat', kind: 'user' },
    {
      actor: 'Agent',
      action: 'Reads the menu and drafts the order',
      kind: 'ai',
      detail: 'Calls the catalog tool'
    },
    { actor: 'System', action: 'Validates stock and totals', kind: 'system' },
    { actor: 'Staff', action: 'Confirms and prepares it', kind: 'human' }
  ]
};

export const SAMPLE_TREE = [
  'apps/',
  '  api/ # REST API',
  '    src/',
  '      modules/ # one folder per domain',
  '  web/ # Astro front end',
  'docs/ # architecture notes',
  'package.json # workspace root'
].join('\n');

export const SAMPLE_STACK: StackGridProps = {
  items: [
    { name: 'Astro', category: 'frontend', version: '7' },
    { name: 'React', category: 'frontend', version: '19' },
    { name: 'NestJS', category: 'backend' },
    { name: 'PostgreSQL', category: 'data' },
    { name: 'Docker', category: 'infra' },
    { name: 'Vitest', category: 'testing' }
  ]
};

export const SAMPLE_METRICS: MetricGridProps = {
  metrics: [
    { value: '+490', label: 'Peak daily chats', context: 'sample data' },
    { value: '69%', label: 'Replies sent by AI' },
    { value: '$1.250.000', label: 'Monthly volume' }
  ]
};

/** MDX usage snippets shown next to each live block. */
export const BLOCK_SNIPPETS = {
  Architecture: `<Architecture
  layers={[{ id: 'core', label: 'Core', nodes: [{ id: 'api', label: 'API', kind: 'service' }] }]}
  edges={[{ from: 'chat', to: 'api', label: 'messages', async: true }]}
/>`,
  Flow: `<Flow steps={[{ actor: 'Customer', action: 'Sends an order', kind: 'user' }]} />`,
  FolderTree: `<FolderTree tree={\`apps/
  api/ # REST API\`} />`,
  StackGrid: `<StackGrid items={[{ name: 'Astro', category: 'frontend', version: '7' }]} />`,
  MetricGrid: `<MetricGrid metrics={[{ value: '69%', label: 'Replies sent by AI' }]} />`
} as const;
