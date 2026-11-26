/** Interval between steps of the replicated conversation. */
export const CHAT_STEP_MS = 1300;

/** Ids of the pipeline stages shown in the beam tile, in processing order. */
export const PIPELINE_IDS = [
  'whatsapp',
  'kommo',
  'webhook',
  'queue',
  'agent',
  'guards',
  'reply'
] as const;
export type PipelineId = (typeof PIPELINE_IDS)[number];

/** Columns of the pipeline diagram: top row goes in, bottom row comes back out. */
export const PIPELINE_COLUMNS = [
  ['whatsapp'],
  ['kommo', 'reply'],
  ['webhook', 'guards'],
  ['queue', 'agent']
] as const satisfies readonly (readonly PipelineId[])[];

/** Approved metrics. Gross billing in COP over one month. The two revenue figures are separate. */
export const REVENUE_AI_SOLD_COP = 29_974_400;
export const REVENUE_AI_ASSISTED_COP = 33_498_500;
/** Peak of customers served in one day (verified maximum). */
export const PEAK_CUSTOMERS_PER_DAY = 490;
/** Share of agent replies sent by AI (average). */
export const AI_REPLY_SHARE_PERCENT = 69;

/** Scale reference for the revenue bars (the larger of the two separate figures). */
export const REVENUE_BAR_MAX = REVENUE_AI_ASSISTED_COP;
export const BAR_FILL_DURATION_S = 1.2;
export const PERCENT_SCALE = 100;
