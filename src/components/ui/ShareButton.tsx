import { useState } from 'preact/hooks';
import { LinkButton } from '@/components/ui/LinkButton';
import { IconShare } from '@tabler/icons-preact';
import { isMobile } from '@/utils/device';

interface ShareButtonProps {
  text: string;
  copiedText: string;
}

export function ShareButton({ text, copiedText }: ShareButtonProps) {
  const [buttonText, setButtonText] = useState(text);

  const handleShare = async () => {
    const url = window.location.href;
    // We can get title/desc from document, but standard practice for react/preact might be
    // to just rely on current page state or pass them as props if needed.
    // The original script used document querySelector, which we can replicate.

    // Note: checking for window/document is safe in useEffect/handlers as they run on client.

    const title = document.title;
    const description =
      document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content || title;

    const shareData = { url, title, text: description };

    if (isMobile() && navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share cancelled or failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setButtonText(copiedText);
        setTimeout(() => {
          setButtonText(text);
        }, 1500);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  };

  return (
    <LinkButton
      icon={IconShare}
      text={text} // Title attribute stays as original "Share" usually, or could be dynamic
      onClick={handleShare}
      isIcon
      class="share-btn"
    >
      <span class="text-node hidden md:inline-block">{buttonText}</span>
    </LinkButton>
  );
}
