import { useState, useEffect } from 'preact/hooks';
import type { TabId } from '@/components/sections/ContentTabs';

type Props = {
  tabId: TabId;
  label: string;
  disabled?: boolean;
};

export default function Tab({ tabId, label, disabled = false }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      const current = window.location.hash.substring(1) || 'general';
      setActive(current === tabId);
    };
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [tabId]);

  if (disabled) {
    return (
      <li>
        <span class="inline-block cursor-not-allowed border-b-2 p-4 text-gray-400 line-through">
          {label}
        </span>
      </li>
    );
  }

  const handleClick = (e: Event) => {
    e.preventDefault();
    window.location.hash = tabId;
  };

  return (
    <li>
      <a
        href={`#${tabId}`}
        onClick={handleClick}
        class={`inline-block border-b-2 p-4 ${
          active
            ? 'border-teal-300 text-teal-300'
            : 'border-transparent hover:border-gray-300 hover:text-gray-300'
        }`}
        aria-current={active ? 'page' : undefined}
      >
        {label}
      </a>
    </li>
  );
}
