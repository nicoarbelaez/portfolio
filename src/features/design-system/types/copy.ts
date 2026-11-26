/** Localized copy of the /design-system page. */
export interface DesignSystemCopy {
  title: string;
  description: string;
  badge: string;
  headline: string;
  intro: string;
  tokens: { title: string; colors: string; type: string; radius: string; spacing: string };
  motion: { title: string; intro: string; rules: readonly string[] };
  blocks: { title: string; intro: string; usage: string; live: string };
  kit: { title: string; intro: string };
}
