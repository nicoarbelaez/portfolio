import { SAMPLE_BADGE_LABEL } from '@/features/projects/clients/shared/constants/client-config';
import type { LocaleKey } from '@/i18n/ui';

/** Small label marking a UI replica as illustrative data (never a result). */
export function SampleBadge({ lang }: { lang: LocaleKey }) {
  return (
    <span className="text-muted-foreground border-border/60 rounded-full border px-1.5 py-0.5 text-[9px] leading-none tracking-wide uppercase">
      {SAMPLE_BADGE_LABEL[lang]}
    </span>
  );
}
