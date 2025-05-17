import { Temporal } from '@js-temporal/polyfill';

export function getYearsSince(input: string | Temporal.PlainDate): number {
  const start = Temporal.PlainDate.from(input);
  const today = Temporal.Now.plainDateISO();
  return start.until(today, { largestUnit: 'years' }).years;
}
