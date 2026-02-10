import { useEffect } from 'preact/hooks';
import { IconX } from '@tabler/icons-preact';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export function ImageModal({ isOpen, onClose, src, alt }: ImageModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        class="relative max-h-full max-w-full overflow-hidden rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          class="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
          title="Close"
        >
          <IconX class="size-6" />
        </button>
        <img src={src} alt={alt} class="max-h-[90vh] max-w-[90vw] object-contain" />
      </div>
    </div>
  );
}
