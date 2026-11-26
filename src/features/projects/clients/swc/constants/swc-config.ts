/** Interval between alerts appearing in the radar. */
export const ALERT_STEP_MS = 1000;
/** Duration of the line draw in the TRM chart (seconds). */
export const CHART_DRAW_S = 1.6;
/** Delay before breach markers appear, after the line starts drawing (seconds). */
export const CHART_MARKER_DELAY_S = 1.2;

/** Severities of the rule engine, as used by the product (informative, watch, alert). */
export const SEVERITIES = ['info', 'watch', 'alert'] as const;
export type Severity = (typeof SEVERITIES)[number];

/** Token classes per severity (pill background and text). */
export const SEVERITY_CLASS: Readonly<Record<Severity, string>> = {
  info: 'bg-muted text-muted-foreground',
  watch: 'bg-chart-3/15 text-chart-3',
  alert: 'bg-destructive/15 text-destructive'
};

/** Alert kinds the radar replica cycles through, in appearance order. */
export const ALERT_KINDS = ['trm', 'secop', 'energy', 'regulation'] as const;
export type AlertKind = (typeof ALERT_KINDS)[number];
/** Severity of each sample alert. */
export const ALERT_SEVERITY: Readonly<Record<AlertKind, Severity>> = {
  trm: 'alert',
  secop: 'watch',
  energy: 'info',
  regulation: 'watch'
};

/**
 * Illustrative 30-day series (arbitrary units) for the chart replica. Hand-written, not market
 * data: the tile is labeled as sample data.
 */
export const TRM_SAMPLE_SERIES = [
  50, 51, 50, 52, 53, 52, 54, 53, 55, 54, 56, 55, 54, 56, 58, 57, 59, 58, 60, 62, 61, 63, 62, 64,
  63, 66, 70, 74, 73, 76
] as const;
/** Threshold line of the chart (same arbitrary units). */
export const TRM_SAMPLE_THRESHOLD = 68;

/** Chart geometry (viewBox units). */
export const CHART_WIDTH = 300;
export const CHART_HEIGHT = 110;
export const CHART_PADDING = 8;

/** Tool names the assistant calls (identifiers from the product, never localized). */
export const ASSISTANT_TOOLS = [
  'get_trm',
  'get_secop_contracts',
  'get_macro_series',
  'get_news',
  'detect_signals'
] as const;

/** Streaming cadence of the assistant replica. */
export const STREAM_TICK_MS = 90;
export const STREAM_QUESTION_TICKS = 5;
export const STREAM_CHIP_TICKS = 5;
export const STREAM_CHARS_PER_TICK = 2;
export const STREAM_HOLD_TICKS = 28;

/** Ids of the sources diagram. */
export const SOURCE_IDS = ['datos', 'secop', 'worldbank', 'xm', 'rss'] as const;
export type SourceId = (typeof SOURCE_IDS)[number];
export const SOURCE_NAMES: Readonly<Record<Exclude<SourceId, 'rss'>, string>> = {
  datos: 'datos.gov.co',
  secop: 'SECOP II',
  worldbank: 'World Bank',
  xm: 'XM'
};
export const SOURCES_COLUMNS = [
  [...SOURCE_IDS],
  ['rules'],
  ['pestel', 'briefing']
] as const satisfies readonly (readonly string[])[];
