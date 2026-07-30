import type { LocaleKey } from '@/i18n/ui';
import asadoImg from '@/assets/apps/mecateo/menu/asado.webp';
import hamburguesaImg from '@/assets/apps/mecateo/menu/hamburguesa.webp';
import perroImg from '@/assets/apps/mecateo/menu/perro.webp';
import picadaImg from '@/assets/apps/mecateo/menu/picada.webp';
import salchipapaImg from '@/assets/apps/mecateo/menu/salchipapa.webp';

export const MECATEO_LIVE_URL = 'https://mecateo.arbelaeznicolas.dev';
export const MECATEO_MENU_URL = 'https://mecateo.arbelaeznicolas.dev/terremoto/menu';
export const MECATEO_SLUG = 'mecateo';

export type MecateoMenuItem = {
  name: string;
  note: string;
  imageSrc: string;
  imageAlt: string;
};

export type MecateoCopy = {
  name: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  ctaLive: string;
  ctaDetails: string;
  menuTitle: string;
  menuDescription: string;
  menuQrHint: string;
  posTitle: string;
  posDescription: string;
  integrationsTitle: string;
  integrationsDescription: string;
  menuItems: readonly MecateoMenuItem[];
  posEvents: readonly { title: string; subtitle: string; time: string }[];
  heroCategories: readonly string[];
  heroPreviewLabel: string;
};

const MENU_IMAGES = {
  salchipapa: salchipapaImg.src,
  hamburguesa: hamburguesaImg.src,
  perro: perroImg.src,
  asado: asadoImg.src,
  picada: picadaImg.src
} as const;

const MECATEO_COPY = {
  es: {
    name: 'Mecateo',
    tagline: 'Sistema operativo inteligente para restaurantes',
    heroTitle: 'Vende más. Opera con menos esfuerzo.',
    heroDescription:
      'POS, menú QR, CRM, pagos Bre-B y agentes de IA en un solo ecosistema para restaurantes.',
    ctaLive: 'Abrir app',
    ctaDetails: 'Ver detalles',
    menuTitle: 'Menú digital + QR',
    menuDescription: 'El cliente escanea, explora y pide desde el celular.',
    menuQrHint: 'Escanea el menú de Terremoto',
    posTitle: 'POS inteligente',
    posDescription: 'Ventas, inventario y operación en tiempo real.',
    integrationsTitle: 'Todo conectado',
    integrationsDescription: 'QR, WhatsApp, IA, CRM y pagos Bre-B en un flujo.',
    menuItems: [
      {
        name: 'Salchipapa especial',
        note: 'Más pedida',
        imageSrc: MENU_IMAGES.salchipapa,
        imageAlt: 'Salchipapa especial de Fast Food Terremoto'
      },
      {
        name: 'Hamburguesa especial',
        note: 'Brioche · 150g',
        imageSrc: MENU_IMAGES.hamburguesa,
        imageAlt: 'Hamburguesa especial de Fast Food Terremoto'
      },
      {
        name: 'Perro con papas',
        note: 'Popular',
        imageSrc: MENU_IMAGES.perro,
        imageAlt: 'Perro caliente con papas de Fast Food Terremoto'
      },
      {
        name: 'Filete de pollo',
        note: 'Asados',
        imageSrc: MENU_IMAGES.asado,
        imageAlt: 'Filete de pollo asado de Fast Food Terremoto'
      },
      {
        name: 'Picada',
        note: 'Para compartir',
        imageSrc: MENU_IMAGES.picada,
        imageAlt: 'Picada de Fast Food Terremoto'
      }
    ],
    posEvents: [
      { title: 'Pedido mesa 4', subtitle: 'QR · $48.000', time: 'ahora' },
      { title: 'Pago Bre-B', subtitle: 'Instantáneo', time: '1m' },
      { title: 'Stock bajo', subtitle: 'Carne · 8 und.', time: '3m' },
      { title: 'WhatsApp IA', subtitle: 'Pedido cerrado', time: '5m' },
      { title: 'Campaña CRM', subtitle: '12 abiertos', time: '12m' }
    ],
    heroCategories: ['Salchipapas', 'Hamburguesas', 'Perros', 'Asados', 'Bebidas'],
    heroPreviewLabel: 'Menú en vivo · Terremoto'
  },
  en: {
    name: 'Mecateo',
    tagline: 'Intelligent operating system for restaurants',
    heroTitle: 'Sell more. Operate with less effort.',
    heroDescription:
      'POS, QR menu, CRM, Bre-B payments, and AI agents in one restaurant ecosystem.',
    ctaLive: 'Open app',
    ctaDetails: 'View details',
    menuTitle: 'Digital menu + QR',
    menuDescription: 'Guests scan, browse, and order from their phone.',
    menuQrHint: 'Scan Terremoto’s live menu',
    posTitle: 'Smart POS',
    posDescription: 'Sales, inventory, and ops in real time.',
    integrationsTitle: 'All connected',
    integrationsDescription: 'QR, WhatsApp, AI, CRM, and Bre-B payments in one flow.',
    menuItems: [
      {
        name: 'Special salchipapa',
        note: 'Top seller',
        imageSrc: MENU_IMAGES.salchipapa,
        imageAlt: 'Special salchipapa from Fast Food Terremoto'
      },
      {
        name: 'Special burger',
        note: 'Brioche · 150g',
        imageSrc: MENU_IMAGES.hamburguesa,
        imageAlt: 'Special burger from Fast Food Terremoto'
      },
      {
        name: 'Dog with fries',
        note: 'Popular',
        imageSrc: MENU_IMAGES.perro,
        imageAlt: 'Hot dog with fries from Fast Food Terremoto'
      },
      {
        name: 'Grilled chicken',
        note: 'Grill',
        imageSrc: MENU_IMAGES.asado,
        imageAlt: 'Grilled chicken from Fast Food Terremoto'
      },
      {
        name: 'Picada platter',
        note: 'To share',
        imageSrc: MENU_IMAGES.picada,
        imageAlt: 'Picada platter from Fast Food Terremoto'
      }
    ],
    posEvents: [
      { title: 'Table 4 order', subtitle: 'QR · $48.000', time: 'now' },
      { title: 'Bre-B payment', subtitle: 'Instant', time: '1m' },
      { title: 'Low stock', subtitle: 'Meat · 8 left', time: '3m' },
      { title: 'WhatsApp AI', subtitle: 'Order closed', time: '5m' },
      { title: 'CRM campaign', subtitle: '12 opens', time: '12m' }
    ],
    heroCategories: ['Salchipapas', 'Burgers', 'Hot dogs', 'Grill', 'Drinks'],
    heroPreviewLabel: 'Live menu · Terremoto'
  }
} as const satisfies Record<LocaleKey, MecateoCopy>;

export function getMecateoCopy(lang: LocaleKey): MecateoCopy {
  return MECATEO_COPY[lang];
}
