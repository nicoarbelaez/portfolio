import type { AlertKind, Severity } from '@/features/projects/clients/swc/constants/swc-config';

/** Localized copy for the SWC showcase. */
export type SwcCopy = {
  radar: {
    title: string;
    description: string;
    header: string;
    severities: Readonly<Record<Severity, string>>;
    alerts: Readonly<Record<AlertKind, { title: string; source: string }>>;
  };
  chart: {
    title: string;
    description: string;
    seriesLabel: string;
    thresholdLabel: string;
    startLabel: string;
    endLabel: string;
  };
  assistant: {
    title: string;
    description: string;
    header: string;
    question: string;
    answer: string;
  };
  sources: {
    title: string;
    description: string;
    rss: string;
    rules: { label: string; caption: string };
    pestel: { label: string; caption: string };
    briefing: { label: string; caption: string };
  };
};
