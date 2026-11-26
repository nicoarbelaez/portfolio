import {
  Bot,
  Cloud,
  Cog,
  Cpu,
  Database,
  Globe,
  Headset,
  MessageSquare,
  Monitor,
  Server,
  Sparkles,
  User,
  type LucideIcon
} from 'lucide-react';

/** Kinds accepted by `<Architecture>` nodes. */
export const ARCHITECTURE_NODE_KINDS = [
  'client',
  'channel',
  'service',
  'worker',
  'ai',
  'data',
  'external',
  'infra'
] as const;
export type ArchitectureNodeKind = (typeof ARCHITECTURE_NODE_KINDS)[number];

/** Kinds accepted by `<Flow>` steps. */
export const FLOW_STEP_KINDS = ['user', 'system', 'ai', 'human'] as const;
export type FlowStepKind = (typeof FLOW_STEP_KINDS)[number];

/** Categories accepted by `<StackGrid>` items (same as `meta.stack`). */
export const STACK_CATEGORIES = [
  'frontend',
  'backend',
  'data',
  'ai',
  'infra',
  'testing',
  'tooling'
] as const;
export type StackCategory = (typeof STACK_CATEGORIES)[number];

/** Icon plus tonal classes (token colors only) for one kind. */
export interface KindStyle {
  icon: LucideIcon;
  /** Icon chip: tinted background + foreground. */
  chip: string;
  /** Node border accent. */
  border: string;
}

export const ARCHITECTURE_KIND_STYLES: Record<ArchitectureNodeKind, KindStyle> = {
  client: { icon: Monitor, chip: 'bg-chart-1/15 text-chart-1', border: 'border-chart-1/40' },
  channel: {
    icon: MessageSquare,
    chip: 'bg-chart-2/15 text-chart-2',
    border: 'border-chart-2/40'
  },
  service: { icon: Server, chip: 'bg-primary/15 text-primary', border: 'border-primary/40' },
  worker: { icon: Cog, chip: 'bg-chart-3/15 text-chart-3', border: 'border-chart-3/40' },
  ai: { icon: Sparkles, chip: 'bg-primary/20 text-primary', border: 'border-primary/60' },
  data: { icon: Database, chip: 'bg-chart-4/15 text-chart-4', border: 'border-chart-4/40' },
  external: {
    icon: Globe,
    chip: 'bg-muted text-muted-foreground',
    border: 'border-border/60 border-dashed'
  },
  infra: { icon: Cloud, chip: 'bg-chart-5/20 text-chart-5', border: 'border-chart-5/40' }
};

export const FLOW_KIND_STYLES: Record<FlowStepKind, KindStyle> = {
  user: { icon: User, chip: 'bg-chart-1/15 text-chart-1', border: 'border-chart-1/40' },
  system: { icon: Cpu, chip: 'bg-primary/15 text-primary', border: 'border-primary/40' },
  ai: { icon: Bot, chip: 'bg-primary/20 text-primary', border: 'border-primary/60' },
  human: { icon: Headset, chip: 'bg-chart-3/15 text-chart-3', border: 'border-chart-3/40' }
};

/** Step kind used when `kind` is omitted. */
export const DEFAULT_FLOW_KIND: FlowStepKind = 'system';

/** Display label per stack category (technical names, language-neutral). */
export const STACK_CATEGORY_LABELS: Record<StackCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  data: 'Data',
  ai: 'AI',
  infra: 'Infra',
  testing: 'Testing',
  tooling: 'Tooling'
};
