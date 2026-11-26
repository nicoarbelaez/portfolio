import type { ArchId, MuscleId } from '@/features/projects/clients/defi/constants/defi-config';

/** One animated row of the routine replica. */
export type RoutineRow = {
  group: string;
  /** Exercise finally selected. */
  exercise: string;
  /** Options listed in the exercise dropdown (includes `exercise`). */
  options: readonly string[];
};

/** Localized copy for the DeFi showcase. */
export type DefiCopy = {
  sheet: {
    title: string;
    description: string;
    frameTitle: string;
    clientLabel: string;
    columns: { group: string; exercise: string; link: string };
    linkLabel: string;
    /** Group options shown in the first dropdown. */
    groupOptions: readonly string[];
    /** Length must equal `SHEET_ROW_COUNT`. */
    rows: readonly RoutineRow[];
  };
  muscle: {
    title: string;
    description: string;
    requestLabel: string;
    muscles: Readonly<Record<MuscleId, string>>;
  };
  arch: {
    title: string;
    description: string;
    nodes: Readonly<Record<ArchId, { label: string; caption: string }>>;
  };
};
