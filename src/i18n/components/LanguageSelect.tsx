import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FlagIcon } from '@/i18n/components/FlagIcon';
import { LOCALE_ORDER, LOCALE_SHORT } from '@/i18n/constants/display';
import { locales, type LocaleKey } from '@/i18n/ui';
import { getLocalizedPath } from '@/i18n/utils';
import { cn } from '@/lib/utils';

interface LanguageSelectProps {
  lang: LocaleKey;
  pathname: string;
  label: string;
  className?: string;
}

export function LanguageSelect({ lang, pathname, label, className }: LanguageSelectProps) {
  const handleChange = (value: string | null) => {
    if (!value || value === lang) return;
    const next = value as LocaleKey;
    window.location.assign(getLocalizedPath(pathname, next));
  };

  return (
    <Select value={lang} onValueChange={handleChange}>
      <SelectTrigger
        size="sm"
        aria-label={label}
        className={cn('border-border bg-background/40 hover:bg-muted cursor-pointer', className)}
      >
        <FlagIcon locale={lang} />
        <SelectValue>
          {(value: string | null) => (
            <span className="text-xs font-semibold tracking-wide">
              {LOCALE_SHORT[(value as LocaleKey | null) ?? lang]}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        align="end"
        alignItemWithTrigger={false}
        sideOffset={8}
        className="border-border bg-popover/95 backdrop-blur-xl"
      >
        {LOCALE_ORDER.map((locale) => (
          <SelectItem key={locale} value={locale} className="cursor-pointer">
            <FlagIcon locale={locale} title={locales[lang][locale]} />
            <span className="font-medium tracking-wide">{LOCALE_SHORT[locale]}</span>
            <span className="text-muted-foreground">{locales[lang][locale]}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
