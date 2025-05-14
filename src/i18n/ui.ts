export type LocaleKey = keyof typeof locales;

export const locales = {
  en: {
    en: "English",
    es: "Spanish",
  },
  es: {
    en: "Inglés",
    es: "Español",
  },
};

export const defaultLang: LocaleKey = "en";

export const labels = {
  es: {
    title: "Portafolio",
    "action.back": "Regresar",
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "hero.description": "Una colección de mis proyectos y trabajos.",
  },
  en: {
    title: "Portfolio",
    "action.back": "Back",
    "nav.home": "Home",
    "nav.projects": "Projects",
    "hero.description": "A collection of my projects and works.",
  },
};
