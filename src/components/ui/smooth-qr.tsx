'use client';

import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { cn } from '@/lib/utils';

/** Always dark modules — QR sits on a light plate in both themes. */
const QR_MODULE_COLOR = '#111111';

interface SmoothQrProps {
  value: string;
  size?: number;
  className?: string;
  label?: string;
}

/**
 * Reusable rounded-dot QR (not square modules). Client-only via qr-code-styling.
 */
export function SmoothQr({ value, size = 112, className, label }: SmoothQrProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.replaceChildren();

    const qr = new QRCodeStyling({
      width: size,
      height: size,
      type: 'svg',
      data: value,
      margin: 2,
      qrOptions: { errorCorrectionLevel: 'M' },
      dotsOptions: {
        type: 'rounded',
        color: QR_MODULE_COLOR
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: QR_MODULE_COLOR
      },
      cornersDotOptions: {
        type: 'dot',
        color: QR_MODULE_COLOR
      },
      backgroundOptions: {
        color: 'transparent'
      }
    });

    qr.append(host);

    return () => {
      host.replaceChildren();
    };
  }, [value, size]);

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-sm',
        'ring-1 ring-black/15',
        className
      )}
      role="img"
      aria-label={label ?? `QR code: ${value}`}
    >
      <div ref={hostRef} className="block [&>svg]:block" style={{ width: size, height: size }} />
    </div>
  );
}
