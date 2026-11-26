import type { ShowcaseIcon } from '@/features/projects/showcase-kit/types/showcase-kit';

/** One endpoint of a beam diagram. `pill` renders a compact labeled capsule instead of a circle. */
export type BeamNodeSpec = {
  id: string;
  /** Accessible name of the node. */
  label: string;
  /** Visible caption (circle nodes) or text (pill nodes). */
  caption: string;
  icon: ShowcaseIcon;
  kind?: 'circle' | 'pill';
  /** Highlight the border with the accent (hub nodes). */
  emphasized?: boolean;
};

/** Beam between two node ids. */
export type BeamEdgeSpec = {
  from: string;
  to: string;
  curvature?: number;
  reverse?: boolean;
};
