interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  transitionName?: string;
}

export function ImagePlaceholder({ src, alt, className, transitionName }: ImagePlaceholderProps) {
  return (
    <div className="relative" data-astro-transition-name={transitionName}>
      <img src={src} alt={alt} className={className} />
    </div>
  );
}
