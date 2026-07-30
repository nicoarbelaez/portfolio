/** Smooth in-page hash navigation — respects prefers-reduced-motion. */
export function scrollToHash(hash: string, event?: { preventDefault: () => void }): void {
  if (!hash.startsWith('#')) return;

  const target = document.getElementById(hash.slice(1));
  if (!target) return;

  event?.preventDefault();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start'
  });

  if (window.location.hash !== hash) {
    history.pushState(null, '', hash);
  }
}
