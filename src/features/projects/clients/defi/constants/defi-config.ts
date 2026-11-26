/** Interval between steps of the dependent-dropdown animation. */
export const SHEET_STEP_MS = 650;
/** Steps per row: group list open, group set, exercise list open, exercise and link set. */
export const SHEET_STAGES = 4;
/** Number of rows animated in the sheet replica. */
export const SHEET_ROW_COUNT = 3;

/** Interval between lit muscles in the body map. */
export const MUSCLE_STEP_MS = 1100;
/** Fade of a muscle fill (opacity only). */
export const MUSCLE_FADE_CLASS = 'transition-opacity duration-300 ease-out';

/** Query parameter names of the muscle-api (one per muscle), in the order they light up. */
export const MUSCLE_IDS = [
  'pectoral',
  'hombros',
  'biceps',
  'abdomen',
  'cuadriceps',
  'pantorrillas'
] as const;
export type MuscleId = (typeof MUSCLE_IDS)[number];

/** Ids of the architecture nodes, in data-flow order. */
export const ARCH_IDS = ['sheets', 'appsscript', 'db', 'api'] as const;
export type ArchId = (typeof ARCH_IDS)[number];

/** Columns of the architecture diagram: a U-shaped flow, Sheets to the muscle API. */
export const ARCH_COLUMNS = [
  ['sheets', 'api'],
  ['appsscript', 'db']
] as const satisfies readonly (readonly ArchId[])[];

/** Body map geometry (viewBox units) and one rounded rectangle per drawn muscle. */
export const BODY_VIEWBOX = '0 0 120 170';
export type MuscleShape = { x: number; y: number; width: number; height: number; radius: number };
export const MUSCLE_SHAPES: Readonly<Record<MuscleId, readonly MuscleShape[]>> = {
  hombros: [
    { x: 27, y: 33, width: 17, height: 12, radius: 6 },
    { x: 76, y: 33, width: 17, height: 12, radius: 6 }
  ],
  pectoral: [
    { x: 44, y: 38, width: 15, height: 17, radius: 6 },
    { x: 61, y: 38, width: 15, height: 17, radius: 6 }
  ],
  biceps: [
    { x: 24, y: 47, width: 9, height: 26, radius: 4.5 },
    { x: 87, y: 47, width: 9, height: 26, radius: 4.5 }
  ],
  abdomen: [{ x: 47, y: 58, width: 26, height: 34, radius: 8 }],
  cuadriceps: [
    { x: 43, y: 96, width: 16, height: 42, radius: 7 },
    { x: 61, y: 96, width: 16, height: 42, radius: 7 }
  ],
  pantorrillas: [
    { x: 45, y: 142, width: 12, height: 24, radius: 6 },
    { x: 63, y: 142, width: 12, height: 24, radius: 6 }
  ]
};
/** Static silhouette behind the muscles. */
export const BODY_HEAD = { cx: 60, cy: 15, r: 10 } as const;
export const BODY_TORSO: MuscleShape = { x: 40, y: 32, width: 40, height: 62, radius: 12 };
