'use client';

import { motion } from 'motion/react';

import { NumberTicker } from '@/components/ui/number-ticker';
import { useReveal } from '../hooks/use-reveal';
import type { Metric, MetricGridProps } from '../schemas/doc-block-schemas';
import { formatMetricNumber, parseMetricValue } from '../utils/parse-metric-value';

function MetricValue({ raw }: { raw: string }) {
  const parsed = parseMetricValue(raw);
  if (!parsed) return <span>{raw}</span>;

  return (
    <>
      {parsed.prefix}
      <NumberTicker
        value={parsed.value}
        format={(current) => formatMetricNumber(current, parsed)}
      />
      {parsed.suffix}
    </>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <>
      <dt className="text-muted-foreground text-sm">{metric.label}</dt>
      <dd className="font-heading ms-0 mt-0 text-3xl leading-none font-semibold tracking-tight">
        <MetricValue raw={metric.value} />
        {metric.context ? (
          <span className="text-muted-foreground mt-2 block font-sans text-xs font-normal tracking-normal">
            {metric.context}
          </span>
        ) : null}
      </dd>
    </>
  );
}

/** Headline numbers with a count-up when visible. Server render shows the final values. */
export function MetricGridView({ metrics }: MetricGridProps) {
  const { ref, itemProps } = useReveal<HTMLDListElement>(metrics.length);

  return (
    <dl ref={ref} className="my-8 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={`${metric.label}-${index}`}
          {...itemProps(index)}
          className="bg-card border-border/50 relative flex flex-col-reverse gap-1 overflow-hidden rounded-xl border p-4"
        >
          <span aria-hidden="true" className="bg-primary absolute inset-x-0 top-0 h-0.5" />
          <MetricCard metric={metric} />
        </motion.div>
      ))}
    </dl>
  );
}
