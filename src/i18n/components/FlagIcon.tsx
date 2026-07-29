import { cn } from '@/lib/utils';
import type { LocaleKey } from '@/i18n/ui';

interface FlagIconProps {
  locale: LocaleKey;
  className?: string;
  title?: string;
}

/** Colombia (es) and United States (en) flag marks for the language switcher. */
export function FlagIcon({ locale, className, title }: FlagIconProps) {
  if (locale === 'es') {
    return (
      <svg
        aria-hidden={title ? undefined : true}
        aria-label={title}
        className={cn('size-4 shrink-0 overflow-hidden rounded-[2px] shadow-sm', className)}
        role="img"
        viewBox="0 0 24 16"
      >
        {title ? <title>{title}</title> : null}
        <path fill="#fcd116" d="M0 0h24v16H0z" />
        <path fill="#003893" d="M0 8h24v4H0z" />
        <path fill="#ce1126" d="M0 12h24v4H0z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn('size-4 shrink-0 overflow-hidden rounded-[2px] shadow-sm', className)}
      role="img"
      viewBox="0 0 24 16"
    >
      {title ? <title>{title}</title> : null}
      <path fill="#b22234" d="M0 0h24v16H0z" />
      <path
        fill="#fff"
        d="M0 1.23h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.47h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0z"
      />
      <path fill="#3c3b6e" d="M0 0h9.6v8.62H0z" />
    </svg>
  );
}
