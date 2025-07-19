import { useState, useEffect } from 'preact/hooks';
import Tab from '@/components/TabLink';
import { getLangFromUrl, useTranslations } from '@/i18n/utils';

const strGeneral = 'general';
const strTechnical = 'technical';
export const TAB_IDS = [strGeneral, strTechnical] as const;
export type TabId = (typeof TAB_IDS)[number];

interface Props {
  className?: string;
  htmlGeneral: string;
  htmlTechnical?: string;
}

export default function ContentTabs({ className = '', htmlGeneral, htmlTechnical = '' }: Props) {
  // Determine language and translation function (client-only)
  const lang = typeof window !== 'undefined' ? getLangFromUrl(new URL(window.location.href)) : 'en';
  const t = useTranslations(lang);

  // Labels based on translation
  const labels: Record<TabId, string> = {
    general: t('tabs.general'),
    technical: t('tabs.technical')
  };

  // Check if technical content exists
  const hasTech = htmlTechnical.trim().length > 0;

  // State for current tab
  const [tab, setTab] = useState<TabId>(strGeneral);

  useEffect(() => {
    const onHashChange = () => {
      const raw = (window.location.hash.substring(1) || strGeneral) as TabId;
      let current: TabId = TAB_IDS.includes(raw as TabId) ? raw : strGeneral;
      if (current === strTechnical && !hasTech) {
        current = strGeneral;
      }
      setTab(current);
      // Sync URL if it doesn't match
      if (window.location.hash.substring(1) !== current) {
        window.history.replaceState(null, '', `#${current}`);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [hasTech]);

  return (
    <>
      <ul
        class={`${className} flex gap-2 border-b border-gray-500 text-center text-sm font-medium text-gray-500 uppercase`}
      >
        {TAB_IDS.map((id) => (
          <Tab key={id} tabId={id} label={labels[id]} disabled={id === strTechnical && !hasTech} />
        ))}
      </ul>
      <div class="prose prose-custom prose-slate prose-invert mb-6 max-w-none">
        {tab === strGeneral && <div dangerouslySetInnerHTML={{ __html: htmlGeneral }} />}
        {tab === strTechnical && hasTech && (
          <div dangerouslySetInnerHTML={{ __html: htmlTechnical }} />
        )}
      </div>
    </>
  );
}
