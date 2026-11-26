import type { PipelineId } from '@/features/projects/clients/danystortas/constants/danystortas-config';

/** Localized copy for the Danys Tortas showcase. */
export type DanysTortasCopy = {
  chat: {
    title: string;
    description: string;
    header: string;
    customer: string;
    reply: string;
    /** Tool calls shown in order: catalog, cart, order, payment, handoff. */
    chips: readonly string[];
  };
  pipeline: {
    title: string;
    description: string;
    nodes: Readonly<Record<PipelineId, { label: string; caption: string }>>;
  };
  revenue: {
    title: string;
    description: string;
    period: string;
    grossNote: string;
    separateNote: string;
    sold: { label: string; note: string };
    assisted: { label: string; note: string };
  };
  volume: {
    title: string;
    description: string;
    peakLabel: string;
    peakContext: string;
    shareLabel: string;
    shareContext: string;
  };
};
