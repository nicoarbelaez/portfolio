interface ImagePlaceholderProps {
  src: string;
  alt: string;
  class?: string;
  transitionName?: string;
}

export function ImagePlaceholder({
  src,
  alt,
  class: className,
  transitionName
}: ImagePlaceholderProps) {
  // Client-side no podemos verificar si el archivo existe con fs
  // Asumimos que existe o usamos un evento onError
  return (
    <div class="relative" data-astro-transition-name={transitionName}>
      <img src={src} alt={alt} class={className} />
    </div>
  );
}
