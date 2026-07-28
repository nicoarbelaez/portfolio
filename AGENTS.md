# AGENTS.md

Guía obligatoria para agentes que trabajan en este repositorio (Astro 6, React 19, i18n, resume/PDF, API GitHub, deploy en Vercel).

**Todas las reglas de desarrollo de este documento son mandatorias.** Cualquier modificación o nueva implementación debe cumplirlas. Si una instrucción puntual del usuario entra en conflicto con estas normas, advertir antes de proceder.

---

# Reglas de desarrollo (obligatorias)

## Objetivo

Todo cambio debe dejar el código en un estado **mejor** que antes de la modificación, con calidad de producción y prácticas reconocidas por la industria.

## Tamaño de archivos

- Ningún archivo debe superar las **250 líneas de código**.
- Si un archivo excede este límite, debe evaluarse **inmediatamente** su refactorización.
- La división del código debe realizarse **por responsabilidad**, nunca de forma arbitraria.

## Arquitectura

- Aplicar principios **SOLID**, **Clean Architecture** y **Atomic Design** cuando corresponda (UI/componentes).
- Diseñar módulos desacoplados, reutilizables y extensibles.
- Favorecer la **composición** sobre la herencia.
- Evitar el acoplamiento entre módulos.
- Cada módulo debe tener una **única responsabilidad**.

Stack de referencia en este repo:

- UI / islas: Astro + React (Atomic Design en `components` cuando existan).
- Datos remotos: clientes tipados bajo `src/api/` (ej. GitHub).
- Config / secretos: `astro:env` (`env.schema` + `astro:env/server|client`), no tipado manual en `src/env.d.ts`.
- Contenido local: content collections solo donde aplique (hoy: `experience`).

## Reutilización

Antes de implementar una nueva solución:

1. Verificar si ya existe dentro del proyecto.
2. Verificar si la tecnología utilizada ya ofrece dicha funcionalidad (Astro, React, Vite, Vercel, etc.).
3. Verificar si existe una librería ampliamente adoptada y mantenida que resuelva el problema.
4. Solo desarrollar una implementación propia cuando exista una **justificación técnica clara**.

Nunca reinventar la rueda.

## Refactorización

Toda refactorización debe:

- Mejorar la mantenibilidad.
- Reducir duplicación de código.
- Incrementar la reutilización.
- **No** modificar el comportamiento funcional (salvo que el cambio lo pida explícitamente).
- Mantener compatibilidad con futuras extensiones.

## Calidad del código

No se permiten soluciones temporales ("quick fixes").

Cada cambio debe:

- Analizar el impacto sobre todo el sistema.
- Considerar casos de uso actuales y futuros.
- Resolver la **causa raíz** del problema.
- Evitar deuda técnica.

## Organización del proyecto

Utilizar la estructura recomendada por Astro (`src/pages`, `src/layouts`, `src/components`, `src/styles`, `public`, etc.).

Cuando un dominio crezca, organizar por módulos:

```
module/
  components/
  hooks/
  services/
  repositories/
  utils/
  types/
  constants/
  schemas/
```

Los elementos comunes reutilizables por más de un dominio deben vivir en módulos compartidos (ej. `src/api/`, `src/utils/`, `src/types/`, `src/constants/`, `src/i18n/`).

## Tipado

- Todo el código debe estar completamente tipado.
- No utilizar `any`, salvo justificación **documentada** en el mismo cambio (comentario o nota en PR).
- Preferir tipos específicos, interfaces y genéricos.
- Validar entradas con esquemas tipados (Zod u equivalente) en frontend y backend/endpoints.

## Constantes

No se permiten valores mágicos.

Todo número, string, expresión regular, ruta, clave, nombre de evento o configuración debe centralizarse en constantes o archivos de configuración (`src/constants/`, schema de `astro.config`, etc.).

## Validación

Toda entrada de datos debe validarse.

- Usar esquemas tipados (Zod u equivalente) en APIs, forms y boundaries.
- Nunca confiar en datos provenientes del cliente.
- Content collections: schemas Zod en `src/content.config.ts`.
- Env: `envField` en `astro.config` con `validateSecrets` cuando aplique.

## Base de datos

Cuando el proyecto incorpore persistencia:

- Toda interacción con la base de datos debe realizarse mediante **Prisma ORM**.
- No realizar consultas SQL directas salvo necesidad técnica **documentada**.

Hoy el portafolio no usa DB propia; al introducirla, esta regla aplica de inmediato.

## Auditoría y observabilidad

Toda operación crítica debe poder auditarse.

Registrar como mínimo (logs estructurados, útiles para diagnóstico):

- errores
- operaciones importantes
- autenticación / autorización (si existen)
- cambios de estado
- operaciones sobre base de datos (cuando corresponda)

En este repo: errores de APIs externas (GitHub, resume) deben propagarse con contexto (`status`, recurso, mensaje), no tragarse en silencio.

## Testing

Las implementaciones deben diseñarse para ser testeables.

- Evitar dependencias ocultas y alto acoplamiento.
- Preferir funciones puras, inyección de dependencias y boundaries claros (`api` / `services` / UI).

## Dependencias

Antes de agregar una dependencia nueva, evaluar:

- mantenimiento
- popularidad / comunidad
- licenciamiento
- seguridad
- rendimiento
- compatibilidad con el proyecto

Preferir librerías ampliamente utilizadas por la industria. Justificar en el PR/commit si se añade algo nuevo.

## Rendimiento

Toda implementación debe considerar:

- rendimiento
- escalabilidad
- mantenibilidad
- legibilidad
- extensibilidad

No sacrificar la arquitectura por una optimización prematura. En Astro: fetch en paralelo cuando no hay dependencias, secretos solo en servidor, evitar JS de cliente innecesario.

## Documentación

- Las decisiones arquitectónicas importantes deben quedar documentadas (este archivo, comentarios de módulo o PR).
- APIs, componentes reutilizables y módulos públicos deben tener documentación suficiente para mantenerlos (JSDoc breve en exports públicos).

## Checklist previo a dar por cerrado un cambio

1. ¿Algún archivo supera 250 líneas? → refactorizar.
2. ¿Se reutilizó lo existente / el framework / una lib madura antes de inventar?
3. ¿Tipado completo, sin `any` injustificado?
4. ¿Sin valores mágicos?
5. ¿Entradas validadas en boundaries?
6. ¿Errores críticos con contexto útil?
7. ¿El código quedó más claro y extensible que antes?

---

# Workflow de adaptación de CV

Caso de uso principal cuando el agente recibe una oferta de trabajo o texto de vacante. El CV vive en [`resume/cv.yaml`](./resume/cv.yaml) y se genera vía RenderCV (`pnpm generate:resume` / scripts en `package.json`).

## Propósito

1. Extraer requisitos clave (skills, tecnologías, responsabilidades, seniority, industria).
2. Adaptar `resume/cv.yaml` destacando experiencia, proyectos y certificaciones relevantes.
3. Validar el YAML / render antes de guardar.
4. Recordar: cambios mergeados que regeneran el PDF deben validarse localmente cuando sea posible.

**Reglas inviolables del CV**:

- Nunca fabricar experiencia, fechas, métricas o tecnologías que no aparezcan en el YAML actual o en las fuentes de verdad.
- Mantener el idioma del CV en **español** (`locale.language: spanish`).
- Preservar la estructura YAML existente (claves, orden de `sections`, fechas `YYYY-MM`).

## Enfoque narrativo

El CV responde, en orden: **qué soy capaz de hacer**, **qué he logrado**, **cómo lo logré**. No es un inventario técnico.

- `perfil`: capacidades de alto nivel + dominio. Evitar listas de tecnologías.
- `experiencia_laboral` / `proyectos`: logro concreto + cómo; tecnologías al final o en `Tecnologías:`.
- `habilidades_tecnicas`: agrupadas, sin niveles ni años por tech.
- `certificados`: listar todos; reordenar por relevancia, no eliminar.
- `educacion` / `idiomas`: intactos salvo cambio real.

Si un bullet solo lista tecnologías sin logro, reescribirlo o mover la tech a `Tecnologías:`.

## Skills

Si no están registrados como skills activos, **leer los `SKILL.md` directamente**:

- [`.agents/skills/resume-tailor/SKILL.md`](./.agents/skills/resume-tailor/SKILL.md)
- [`.agents/skills/cv-builder/SKILL.md`](./.agents/skills/cv-builder/SKILL.md) / [`.claude/skills/cv-builder/SKILL.md`](./.claude/skills/cv-builder/SKILL.md)

Flujo: `resume-tailor` decide **qué**; `cv-builder` valida **cómo** en YAML.

## Fuentes de verdad

- `resume/cv.yaml` — CV canónico.
- `src/content/experience/{es,en}/*.md` — experiencia extendida (Zod en `src/content.config.ts`).

Si una oferta menciona una tecnología, buscar evidencia real ahí antes de incluirla.

## Adaptación por sección

| Sección                 | Adaptación                                                 |
| ----------------------- | ---------------------------------------------------------- |
| `perfil`                | Resumen 1–3 líneas con keywords y seniority.               |
| `experiencia_laboral`   | Reordenar + highlights cuantificados; no eliminar roles.   |
| `proyectos`             | Reordenar/reescribir highlights ya presentes; no inventar. |
| `habilidades_tecnicas`  | Primer bullet = stack principal de la oferta.              |
| `certificados`          | Relevantes primero; no inventar.                           |
| `educacion` / `idiomas` | Normalmente intactos.                                      |

Formato: backticks o `**negrita**` para keywords ATS; fechas `YYYY-MM` o `YYYY`; `end_date: 'present'` para roles actuales; links `[texto](url)`.

## Comandos CV

```bash
pnpm generate:resume
# o
python -m rendercv render ./resume/cv.yaml \
  --dont-generate-markdown --dont-generate-html --dont-generate-png \
  --output-folder ./.tmp/rendercv --pdf-path ./resume.pdf
```

Si Python no está disponible, avisar al usuario.

## Flujo paso a paso (CV)

1. Recibir oferta (link → fetch, o texto).
2. Cargar skills `resume-tailor` + `cv-builder`.
3. Analizar oferta.
4. Leer `resume/cv.yaml` (+ experience opcional).
5. Matchear requisito → evidencia; marcar gaps sin inventar.
6. Proponer cambios (tabla: sección, cambio, razón).
7. Editar YAML válido.
8. Validar render si es posible.
9. Reportar resumen.

## Commits (CV)

- Conventional Commits con scope `cv` cuando aplique.
- Un commit por adaptación de CV; no mezclar con UI/API no relacionada.
- No commitear PDFs generados si el pipeline los regenera (`public/resume`, `resume/*.pdf` según `.gitignore`).

## Perfil del usuario

- **Nicolas Arbelaez Tapias** — Full Stack con foco Backend, AI-First y automatización. Cali, Colombia.
- Inglés **A2 (técnico)**. No pasar el CV a inglés salvo petición explícita; si se pide, crear archivo aparte (no sobrescribir el español).
- Si la oferta está claramente fuera de perfil, avisar antes de forzar la adaptación.
