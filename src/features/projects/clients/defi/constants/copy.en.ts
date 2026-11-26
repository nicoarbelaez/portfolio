import type { DefiCopy } from '@/features/projects/clients/defi/constants/copy.types';

/** English copy of the DeFi showcase. */
export const DEFI_COPY_EN: DefiCopy = {
  sheet: {
    title: 'Routines with dependent dropdowns',
    description:
      'The muscle group filters the exercises and each exercise links its video. Apps Script keeps the lists in sync as the sheet is edited.',
    frameTitle: 'Weekly routine · Google Sheets',
    clientLabel: 'Client',
    columns: { group: 'Muscle group', exercise: 'Exercise', link: 'Video' },
    linkLabel: 'Watch video',
    groupOptions: ['Chest', 'Back', 'Quadriceps'],
    rows: [
      {
        group: 'Chest',
        exercise: 'Bench press',
        options: ['Bench press', 'Dumbbell fly', 'Dips']
      },
      {
        group: 'Back',
        exercise: 'Barbell row',
        options: ['Barbell row', 'Lat pulldown', 'Pull-ups']
      },
      {
        group: 'Quadriceps',
        exercise: 'Squat',
        options: ['Squat', 'Leg press', 'Lunges']
      }
    ]
  },
  muscle: {
    title: 'Muscle map through an API',
    description:
      'An Express API takes the trained muscles, colors a body SVG and returns it as PNG or JPG.',
    requestLabel: 'muscle-api',
    muscles: {
      pectoral: 'Chest',
      hombros: 'Shoulders',
      biceps: 'Biceps',
      abdomen: 'Abs',
      cuadriceps: 'Quadriceps',
      pantorrillas: 'Calves'
    }
  },
  arch: {
    title: 'Sheets, scripts and API',
    description:
      'The client sheet reads a database built with Apps Script that serves JSON. The image API runs separately on Vercel.',
    nodes: {
      sheets: { label: 'Client Google Sheets', caption: 'Sheets' },
      appsscript: {
        label: 'Apps Script in TypeScript, deployed with clasp',
        caption: 'Apps Script'
      },
      db: { label: 'defi-db: web app serving JSON', caption: 'defi-db' },
      api: { label: 'Express muscle map API on Vercel', caption: 'muscle-api' }
    }
  }
};
