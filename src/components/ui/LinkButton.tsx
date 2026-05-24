import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import type { Icon } from '@tabler/icons-react';

type LinkButtonProps = (
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
) & {
  icon: Icon;
  isIcon?: boolean;
  text: string;
  href?: string;
  className?: string;
  children?: ReactNode;
};

export function LinkButton({
  icon: IconComponent,
  text,
  isIcon = false,
  className,
  href,
  children,
  ...props
}: LinkButtonProps) {
  const commonClass = `z-50 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200/10 text-xs font-medium text-slate-300 transition-colors select-none hover:border-slate-200/30 hover:bg-slate-200/5 hover:text-teal-300 ${
    isIcon ? 'p-2' : 'px-4 py-2'
  } ${className || ''}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={text}
        className={commonClass}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <IconComponent className="size-4 shrink-0" />
        {!isIcon && <span>{text}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      title={text}
      className={commonClass}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <IconComponent className="size-4 shrink-0" />
      {!isIcon && <span>{text}</span>}
      {children}
    </button>
  );
}
