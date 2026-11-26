import type {
  IntegrationId,
  RedirectDestinationKind
} from '@/features/projects/apps/mecateo/constants/mecateo-config';

/** Localized copy for the Mecateo showcase. */
export type MecateoCopy = {
  name: string;
  tagline: string;
  hero: {
    title: string;
    description: string;
    ctaLive: string;
    ctaDetails: string;
    standLabels: readonly string[];
    tapLabel: string;
    qrBackup: string;
  };
  redirect: {
    title: string;
    description: string;
    printedLabel: string;
    destinationLabel: string;
    destinations: Readonly<Record<RedirectDestinationKind, string>>;
  };
  panel: {
    title: string;
    description: string;
    frameTitle: string;
    columns: { stand: string; activity: string; taps: string; code: string };
    /** Same order as `PANEL_SAMPLE_ROWS`. */
    standNames: readonly [string, string, string];
  };
  agent: {
    title: string;
    description: string;
    header: string;
    switchLabel: string;
    customer: string;
    reply: string;
    chips: readonly string[];
  };
  integrations: {
    title: string;
    description: string;
    roles: Readonly<Record<IntegrationId, string>>;
  };
};
