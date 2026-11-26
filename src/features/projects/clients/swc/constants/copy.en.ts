import type { SwcCopy } from '@/features/projects/clients/swc/constants/copy.types';

/** English copy of the SWC showcase. */
export const SWC_COPY_EN: SwcCopy = {
  radar: {
    title: 'An alert radar with readable rules',
    description:
      'Every alert comes from a rule you can read, with its severity and a link to the original source.',
    header: 'Alerts',
    severities: { info: 'Info', watch: 'Watch', alert: 'Alert' },
    alerts: {
      trm: { title: 'The exchange rate passes the daily move threshold', source: 'TRM' },
      secop: { title: 'A SECOP II contract expires soon', source: 'SECOP II' },
      energy: { title: 'Spot electricity price rises over the week', source: 'XM' },
      regulation: { title: 'A decree mentions a tracked keyword', source: 'Regulation' }
    }
  },
  chart: {
    title: 'The exchange rate against a threshold',
    description:
      'The 30-day series is compared with the threshold each company sets. Days above it raise an alert.',
    seriesLabel: 'TRM, 30 days',
    thresholdLabel: 'Threshold',
    startLabel: '30 days ago',
    endLabel: 'Today'
  },
  assistant: {
    title: 'An assistant that queries real data',
    description:
      'The model does not make up figures: it calls read-only tools and answers with what they return.',
    header: 'Assistant',
    question: 'How did the dollar move this week and which contracts expire soon?',
    answer:
      'The exchange rate passed the configured threshold. Two contracts are about to expire. I found two signals to review.'
  },
  sources: {
    title: 'From public data to decisions',
    description:
      'Open sources feed a rule engine. Alerts come out grouped by PESTEL, plus a weekly briefing.',
    rss: 'News RSS',
    rules: { label: 'Rule engine', caption: 'Rules' },
    pestel: { label: 'PESTEL grouping', caption: 'PESTEL' },
    briefing: { label: 'Weekly briefing', caption: 'Briefing' }
  }
};
