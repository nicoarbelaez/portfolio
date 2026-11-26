/** A point already scaled into viewBox units. */
export type ChartPoint = { x: number; y: number };

interface ScaleOptions {
  width: number;
  height: number;
  padding: number;
  /** Shared vertical domain so series and thresholds use the same scale. */
  min: number;
  max: number;
}

/** Scale a series into viewBox points: x evenly spaced, y inverted inside the padding. */
export function scaleSeries(series: readonly number[], options: ScaleOptions): ChartPoint[] {
  const { width, height, padding, min, max } = options;
  const range = max - min || 1;
  const stepX = (width - padding * 2) / (series.length - 1);
  return series.map((value, index) => ({
    x: padding + index * stepX,
    y: height - padding - ((value - min) / range) * (height - padding * 2)
  }));
}

/** Scale one value to a y coordinate with the same options as `scaleSeries`. */
export function scaleValue(value: number, options: ScaleOptions): number {
  const { height, padding, min, max } = options;
  return height - padding - ((value - min) / (max - min || 1)) * (height - padding * 2);
}

/** Polyline path (`M x y L x y ...`) through the points. */
export function toLinePath(points: readonly ChartPoint[]): string {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');
}

/** Closed path under the line, down to the chart floor, for an area fill. */
export function toAreaPath(points: readonly ChartPoint[], floorY: number): string {
  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return '';
  return `${toLinePath(points)} L${last.x.toFixed(1)} ${floorY} L${first.x.toFixed(1)} ${floorY} Z`;
}
