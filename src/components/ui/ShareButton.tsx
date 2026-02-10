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
    const title = document.title;

    const shareData = { url, title };

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
      text={text}
      onClick={handleShare}
      isIcon
      class="share-btn"
    >
      <span class="text-node hidden md:inline-block">{buttonText}</span>
    </LinkButton>
  );
}
