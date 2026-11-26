import type { DefiCopy } from '@/features/projects/clients/defi/constants/copy.types';

/** Spanish copy of the DeFi showcase. */
export const DEFI_COPY_ES: DefiCopy = {
  sheet: {
    title: 'Rutinas con listas dependientes',
    description:
      'El grupo muscular filtra los ejercicios y cada ejercicio enlaza su video. Apps Script mantiene las listas al editar la hoja.',
    frameTitle: 'Rutina semanal · Google Sheets',
    clientLabel: 'Cliente',
    columns: { group: 'Grupo muscular', exercise: 'Ejercicio', link: 'Video' },
    linkLabel: 'Ver video',
    groupOptions: ['Pectoral', 'Dorsal', 'Cuádriceps'],
    rows: [
      {
        group: 'Pectoral',
        exercise: 'Press de banca',
        options: ['Press de banca', 'Aperturas', 'Fondos']
      },
      {
        group: 'Dorsal',
        exercise: 'Remo con barra',
        options: ['Remo con barra', 'Jalón al pecho', 'Dominadas']
      },
      {
        group: 'Cuádriceps',
        exercise: 'Sentadilla',
        options: ['Sentadilla', 'Prensa', 'Zancadas']
      }
    ]
  },
  muscle: {
    title: 'Mapa muscular por API',
    description:
      'Una API en Express recibe los músculos entrenados, colorea un SVG del cuerpo y lo devuelve como PNG o JPG.',
    requestLabel: 'muscle-api',
    muscles: {
      pectoral: 'Pectoral',
      hombros: 'Hombros',
      biceps: 'Bíceps',
      abdomen: 'Abdomen',
      cuadriceps: 'Cuádriceps',
      pantorrillas: 'Pantorrillas'
    }
  },
  arch: {
    title: 'Hojas, scripts y API',
    description:
      'La hoja del cliente consume una base de datos hecha con Apps Script que expone JSON. La API de imágenes corre aparte en Vercel.',
    nodes: {
      sheets: { label: 'Google Sheets del cliente', caption: 'Sheets' },
      appsscript: {
        label: 'Apps Script en TypeScript, desplegado con clasp',
        caption: 'Apps Script'
      },
      db: { label: 'defi-db: aplicación web que sirve JSON', caption: 'defi-db' },
      api: { label: 'API de mapa muscular en Express, en Vercel', caption: 'muscle-api' }
    }
  }
};
