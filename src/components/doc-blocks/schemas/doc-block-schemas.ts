import { z } from 'zod';

import {
  ARCHITECTURE_NODE_KINDS,
  FLOW_STEP_KINDS,
  STACK_CATEGORIES
} from '../constants/node-kinds';

const nonEmpty = z.string().trim().min(1);

const architectureNodeSchema = z.object({
  id: nonEmpty,
  label: nonEmpty,
  kind: z.enum(ARCHITECTURE_NODE_KINDS),
  detail: nonEmpty.optional()
});

const architectureLayerSchema = z.object({
  id: nonEmpty,
  label: nonEmpty,
  nodes: z.array(architectureNodeSchema).min(1)
});

const architectureEdgeSchema = z.object({
  from: nonEmpty,
  to: nonEmpty,
  label: nonEmpty.optional(),
  async: z.boolean().optional()
});

/** Props of `<Architecture>`: layers (columns) of nodes plus directed edges. */
export const architectureSchema = z
  .object({
    layers: z.array(architectureLayerSchema).min(1),
    edges: z.array(architectureEdgeSchema).default([])
  })
  .superRefine((value, ctx) => {
    const ids = new Set<string>();
    value.layers.forEach((layer, layerIndex) => {
      layer.nodes.forEach((node, nodeIndex) => {
        if (ids.has(node.id)) {
          ctx.addIssue({
            code: 'custom',
            message: `Duplicate node id "${node.id}"`,
            path: ['layers', layerIndex, 'nodes', nodeIndex, 'id']
          });
        }
        ids.add(node.id);
      });
    });
    value.edges.forEach((edge, edgeIndex) => {
      (['from', 'to'] as const).forEach((end) => {
        if (!ids.has(edge[end])) {
          ctx.addIssue({
            code: 'custom',
            message: `Edge ${end} references unknown node "${edge[end]}"`,
            path: ['edges', edgeIndex, end]
          });
        }
      });
    });
  });
export type ArchitectureProps = z.infer<typeof architectureSchema>;
export type ArchitectureLayer = ArchitectureProps['layers'][number];
export type ArchitectureNode = ArchitectureLayer['nodes'][number];
export type ArchitectureEdge = ArchitectureProps['edges'][number];

const flowStepSchema = z.object({
  actor: nonEmpty,
  action: nonEmpty,
  detail: nonEmpty.optional(),
  kind: z.enum(FLOW_STEP_KINDS).optional()
});

/** Props of `<Flow>`: ordered interaction steps. */
export const flowSchema = z.object({ steps: z.array(flowStepSchema).min(1) });
export type FlowProps = z.infer<typeof flowSchema>;
export type FlowStep = FlowProps['steps'][number];

/** Props of `<FolderTree>`: indented string, `#` starts a description. */
export const folderTreeSchema = z.object({ tree: nonEmpty });
export type FolderTreeProps = z.infer<typeof folderTreeSchema>;

/** Shape shared by `<StackGrid>` items and `meta.yaml` `stack`. */
export const stackItemSchema = z.object({
  name: nonEmpty,
  category: z.enum(STACK_CATEGORIES),
  version: nonEmpty.optional()
});

/** Props of `<StackGrid>`: technologies grouped by category. */
export const stackGridSchema = z.object({ items: z.array(stackItemSchema).min(1) });
export type StackGridProps = z.infer<typeof stackGridSchema>;
export type StackItem = z.infer<typeof stackItemSchema>;

const metricSchema = z.object({
  value: nonEmpty,
  label: nonEmpty,
  context: nonEmpty.optional()
});

/** Props of `<MetricGrid>`: headline numbers with a count-up on view. */
export const metricGridSchema = z.object({ metrics: z.array(metricSchema).min(1) });
export type MetricGridProps = z.infer<typeof metricGridSchema>;
export type Metric = MetricGridProps['metrics'][number];
