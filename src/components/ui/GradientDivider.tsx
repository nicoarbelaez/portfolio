interface GradientDividerProps {
  class?: string;
  noGradient?: boolean;
}

export function GradientDivider({ class: className, noGradient = false }: GradientDividerProps) {
  return (
    <hr
      class={`${className || ''} ${
        noGradient
          ? 'mx-auto h-px w-full border-0 bg-slate-500/30'
          : 'mx-auto h-px w-4/5 border-0 bg-gradient-to-r from-transparent via-slate-500/30 to-transparent'
      }`}
    />
  );
}
