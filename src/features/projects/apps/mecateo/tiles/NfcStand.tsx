import { Nfc, QrCode } from 'lucide-react';
import { ProductRender } from '@/features/projects/apps/mecateo/tiles/ProductRender';
import type { LocaleKey } from '@/i18n/ui';

interface NfcStandProps {
  lang: LocaleKey;
  labels: readonly string[];
  tapLabel: string;
  qrBackup: string;
}

/** Hero product visual: the stand render plus a caption with the tap label, placements and QR backup. */
export function NfcStand({ lang, labels, tapLabel, qrBackup }: NfcStandProps) {
  return (
    <div className="mx-auto flex shrink-0 flex-col items-center gap-3">
      <ProductRender lang={lang} />
      <div aria-hidden="true" className="flex flex-col items-center gap-1">
        <span className="text-primary flex items-center gap-1 text-xs font-semibold">
          <Nfc className="size-3.5" />
          {tapLabel}
        </span>
        <p className="text-muted-foreground text-center text-[11px] leading-tight">
          {labels.join(' · ')}
        </p>
        <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
          <QrCode className="size-3" />
          {qrBackup}
        </span>
      </div>
    </div>
  );
}
