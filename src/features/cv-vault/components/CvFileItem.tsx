import { RiExternalLinkLine, RiLinksLine, RiShareLine } from '@remixicon/react';

import { FileType } from '@/components/reui/file-type';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from '@/components/ui/item';
import { useShareFile } from '../hooks/useShareFile';
import type { ShareMessage } from '../services/share-file';

/** Both links open in a new tab; `noreferrer` implies `noopener`. */
const LINK_TARGET = { target: '_blank', rel: 'noopener noreferrer' } as const;

export interface CvShareConfig {
  /** Accessible name prefix; the row title is appended. */
  label: string;
  /** Name the recipient sees for the attached PDF. */
  filename: string;
  message: ShareMessage;
}

export interface CvFileItemProps {
  title: string;
  /** Muted complement of the title (e.g. the company). */
  subtitle?: string;
  description?: string;
  /** Human-readable date, paired with its ISO value for the `<time>` element. */
  date?: { iso: string; label: string };
  href: string;
  openLabel: string;
  offer?: { href: string; label: string };
  share: CvShareConfig;
}

/**
 * One resume as a file row: PDF icon, title, context and actions (share, open, offer). Used for both the main resume
 * and every private variant so they stay visually identical.
 */
export function CvFileItem({
  title,
  subtitle,
  description,
  date,
  href,
  openLabel,
  offer,
  share
}: CvFileItemProps) {
  const { status, share: shareFile } = useShareFile({
    href,
    filename: share.filename,
    message: share.message
  });

  return (
    <Item role="listitem" variant="outline" size="sm">
      <ItemMedia>
        <FileType type="pdf" variant="light" aria-hidden="true" />
      </ItemMedia>
      <ItemContent className="min-w-0">
        <ItemTitle className="max-w-full">
          <span className="truncate">
            {title}
            {subtitle && <span className="text-muted-foreground font-normal"> {subtitle}</span>}
          </span>
        </ItemTitle>
        {(date || description) && (
          <ItemDescription>
            {date && <time dateTime={date.iso}>{date.label}</time>}
            {date && description && (
              <span
                aria-hidden="true"
                className="bg-muted-foreground/40 mx-1.5 inline-block size-1 rounded-full align-middle"
              />
            )}
            {description}
          </ItemDescription>
        )}
      </ItemContent>
      <ItemActions>
        <Button
          variant="ghost"
          size="icon-sm"
          type="button"
          onClick={shareFile}
          disabled={status === 'preparing'}
          aria-busy={status === 'preparing'}
          aria-label={`${share.label}: ${title}`}
        >
          <RiShareLine aria-hidden="true" />
        </Button>
        {offer && (
          <Button
            variant="ghost"
            size="icon-sm"
            nativeButton={false}
            render={<a href={offer.href} {...LINK_TARGET} />}
            aria-label={offer.label}
          >
            <RiLinksLine aria-hidden="true" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          nativeButton={false}
          render={<a href={href} {...LINK_TARGET} />}
          aria-label={openLabel}
        >
          <RiExternalLinkLine aria-hidden="true" />
        </Button>
      </ItemActions>
    </Item>
  );
}
