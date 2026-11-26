# Feature: projects

Catálogo curado de proyectos + showcases de la landing + páginas de detalle (`/projects/<slug>`, `/es/projects/<slug>`).

## Estructura

```
constants/catalog.ts        Catálogo (fuente de verdad). ACTIVE_PROJECT_CATALOG = sin archivados.
constants/sections.ts       Secciones: client | apps | side
schemas/catalog.ts          Zod del catálogo (incluye `archived`)
services/enrich.ts          Enriquecimiento (GitHub) — solo sobre el catálogo ACTIVO
components/showcase-registry.ts   slug -> showcase personalizado
components/ProjectsTabs.tsx         Tabs client | side: click, arrastre (Embla) y deep link (?tab=)
hooks/use-tabs-carousel.ts          Embla + AutoHeight: arrastre/swipe entre tabs, pill sigue el progreso
hooks/use-url-tab.ts                Tab sincronizado con ?tab=
components/ProjectShowcaseBlock.tsx   Render de un bloque (header opcional + showcases / cards)
components/ProjectsSection.astro      Composición de la landing
apps/<slug>/                Showcases de apps (Mecateo)
clients/<slug>/             Showcases de proyectos para clientes
types/showcase.ts           Contrato de props de un showcase
```

## Landing: orden y diseño

`#projects` = intro → **tabs** [Proyectos para clientes | Proyectos personales]; luego `#apps`.

- Tab **client**: showcases propios por proyecto (mismo mecanismo que Apps), registrados en
  `showcase-registry.ts`. Sin entrada en el registro cae a `ProjectCard`.
- Tab **side**: grilla de cards.
- `apps` (`#apps`) usa el mismo mecanismo de showcases, sin tabs.
- **Orden**: campo `order` del catálogo dentro de cada sección. Los showcases propios ocupan
  todo el ancho; proyectos consecutivos sin showcase comparten una grilla de cards.
- Si solo queda un tab con proyectos (el otro vacío/archivado), la barra de tabs se oculta.

### Arrastrar para cambiar de tab

Patrón: **Embla Carousel** (`embla-carousel-react` + plugin `embla-carousel-auto-height`), no un
slider propio. Los paneles viven en un carrusel horizontal controlado por el valor del tab.

- Mouse y touch: arrastra el contenido a izquierda/derecha; ves el panel siguiente pegado al actual.
- Al soltar se completa el cambio si pasaste de la mitad **o** fue un flick rápido; si no, vuelve.
- La píldora de la barra de tabs sigue el progreso del arrastre (se actualiza sin re-render).
- La altura se adapta con transición (clientes y personales miden distinto).
- Gesto vertical = scroll normal de la página (`touch-action: pan-y`); solo lo horizontal mueve tabs.
- **Interactivos**: las cards son clicables por completo, así que el arrastre SÍ puede empezar sobre
  links y botones (Embla cancela el clic que sigue a un arrastre; un toque/clic sin arrastre navega
  normal). Solo `PROJECT_SWIPE_IGNORE_SELECTOR` (`input, select, textarea, [data-no-swipe]`) lo
  bloquea; agrega `data-no-swipe` a cualquier control propio que lo necesite.
- Entre paneles hay un espacio (`PROJECT_TAB_PANE_GAP_CLASS`) para que no se vean pegados al arrastrar.
- Accesibilidad: el panel inactivo es `inert` + `aria-hidden`; los tabs siguen funcionando con clic
  y el deep link.

### Deep link a un tab

Query param `tab` (`constants/tabs.ts`), combinable con el hash de la sección:

- `/?tab=client#projects` · `/?tab=side#projects`
- `/es/?tab=side#projects`

Sin param (o valor inválido / tab vacío) se abre el primer tab disponible (por defecto `client`).
Al cambiar de tab la URL se actualiza con `history.replaceState` (sin nuevas entradas de historial),
así que la URL visible siempre es compartible. Lógica en `hooks/use-url-tab.ts`.

## Archivar un proyecto

En `constants/catalog.ts` agrega `archived: true` a la entrada:

```ts
{ slug: 'invictus', section: 'client', order: 2, archived: true, ... }
```

Efecto (un solo punto de filtrado: `ACTIVE_PROJECT_CATALOG`):

- No aparece en la landing (cliente, app o personal).
- No se genera su página de detalle (`/projects/<slug>` y `/es/projects/<slug>` → 404).
- No se genera su imagen OG.
- El catálogo conserva la entrada; **desarchivar = borrar el flag** (o `false`).

Archivados actualmente: `invictus`.

## Showcase personalizado (apps o clientes)

1. Crea `clients/<slug>/<Nombre>Showcase.tsx` (o `apps/<slug>/`). Recibe `ProjectShowcaseProps`
   (`project`, `lang`, `labels`); puedes declarar solo las props que uses.
2. Regístralo en `components/showcase-registry.ts`.
3. Define su posición con `order` en el catálogo.

`clients/ClientShowcaseMeta.tsx` pinta título, periodo, descripción, topics y CTAs a partir de
los datos del proyecto (sin copy hardcodeado) para reutilizarlo en diseños de cliente.

## Diseños temporales

Marcados `TEMPORARY` en su JSDoc; reemplazar por el diseño final manteniendo registro y props.

| Proyecto     | Archivo                                       | Idea                                                                   |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------- |
| Danys Tortas | `clients/danystortas/DanysTortasShowcase.tsx` | Paleta rosa/ámbar cálida; portada a la izquierda, texto a la derecha.  |
| DeFi         | `clients/defi/DefiShowcase.tsx`               | Estilo "terminal" oscuro slate/esmeralda; texto arriba, portada abajo. |

Mecateo (`apps/mecateo/`) mantiene su bento propio, ahora registrado igual que los demás.
