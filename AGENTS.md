# AGENTS.md

Guía para agentes que trabajan con este repositorio.

Para contexto general del proyecto (Astro 6, React 19, i18n, content collections, deploy en Vercel) consulta [`CLAUDE.md`](./CLAUDE.md). Este documento se enfoca en el **workflow de adaptación de hoja de vida** — el caso de uso principal por el que un agente es invocado aquí.

## Propósito del agente

Dado un **link a una oferta de trabajo** o el **texto de una vacante**, el agente debe:

1. Extraer los requisitos clave (skills, tecnologías, responsabilidades, nivel de seniority, industria).
2. Adaptar [`rendercv.yaml`](./rendercv.yaml) destacando la experiencia, proyectos y certificaciones más relevantes del usuario.
3. Validar el YAML antes de guardar.
4. Notificar que el push a `main` con cambios en `rendercv.yaml` dispara automáticamente la regeneración del PDF (`public/resume.pdf`) vía GitHub Actions.

**Reglas inviolables**:

- Nunca fabricar experiencia, fechas, métricas o tecnologías que no aparezcan en el `rendercv.yaml` actual o en las fuentes de verdad listadas abajo.
- Mantener el idioma del CV en **español** (es el público objetivo del usuario; ver `locale.language: spanish`).
- Preservar la estructura YAML existente (claves, orden de `sections`, formato de fechas `YYYY-MM`).

## Enfoque narrativo del CV

El CV debe responder, en este orden, tres preguntas: **qué soy capaz de hacer**, **qué he logrado** y **cómo lo logré**. No es un inventario técnico.

**Aplicación por sección**:

- `perfil`: capacidades de alto nivel + dominio (backend, automatización, AI-First). Evitar listas de tecnologías aquí.
- `experiencia_laboral` y `proyectos`: cada highlight describe un **logro concreto** (qué cambió, cuánto, para quién) y **cómo** se hizo (enfoque/método). Las tecnologías se mencionan al final del bullet o en la línea `Tecnologías:` — **por encima, sin profundizar** en versiones, configuraciones internas o detalles de implementación.
- `habilidades_tecnicas`: enumeración agrupada (Backend / Frontend / IA / Infra). Sin niveles, sin años por tecnología.
- `certificados`: **listar todos los presentes** en el YAML; reordenar por relevancia a la oferta, no eliminar.
- `educacion` e `idiomas`: incluir siempre, intactos salvo cambio real.

**Regla**: si un bullet sólo describe tecnologías usadas sin logro asociado, reescribirlo o mover la tecnología a la línea `Tecnologías:`. Capacidad y resultado pesan más que stack.

## Skills que el agente debe usar

Ambos skills viven dentro del repo y se cargan automáticamente cuando estén disponibles en el entorno del agente. Si no están registrados como skills activos, **leer los `SKILL.md` directamente** para obtener su contenido.

- [`.agents/skills/resume-tailor/SKILL.md`](./.agents/skills/resume-tailor/SKILL.md) — análisis de la oferta, matching de keywords ATS, reescritura con verbos de poder y la fórmula de cuantificación (`[Verbo] + [Qué] + [Resultado cuantificado] + [Contexto]`).
- [`.agents/skills/cv-builder/SKILL.md`](./.agents/skills/cv-builder/SKILL.md) — esquema YAML que consume `rendercv`, temas disponibles (`classic`, `sb2nov`, `moderncv`, `engineeringresumes`) y CLI para generación local.

Flujo recomendado: `resume-tailor` decide **qué** modificar; `cv-builder` valida **cómo** expresarlo en el YAML.

## Fuentes de verdad para experiencia y proyectos

Antes de modificar `rendercv.yaml`, el agente puede enriquecer la información leyendo las content collections del portafolio — son la versión extendida de cada experiencia y proyecto:

- `src/content/experience/{es,en}/*.md` — experiencias laborales con descripción completa, fechas y skills (front-matter Zod-tipado en `src/content.config.ts`).
- `src/content/projects/{es,en}/*.md` — proyectos con dos secciones (general / técnico, separadas por `## separator`).
- `src/content/projects-meta/*.json` — metadata compartida por idioma: `stack`, `repo_url`, `demo_url`, `priority`, `tags` (`production | projects | practices`), `date`.

Si una oferta menciona una tecnología específica, primero buscar evidencia real en estos archivos antes de incluirla.

## Estructura de `rendercv.yaml`

Secciones actuales (en orden) y qué adaptar en cada caso:

| Sección                 | Adaptación según la oferta                                                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `perfil`                | Reescribir el resumen (1–3 líneas) priorizando keywords de la oferta y el seniority esperado.                                           |
| `experiencia_laboral`   | Reordenar (más relevante primero) y reescribir `highlights` con la fórmula cuantificada. Mantener todas las experiencias — no eliminar. |
| `proyectos`             | Añadir/reordenar proyectos del portafolio relevantes para el rol (sacarlos de `src/content/projects-meta/`).                            |
| `habilidades_tecnicas`  | Reordenar bullets para que el primero matchee el stack principal de la oferta.                                                          |
| `certificados`          | Reordenar los relevantes al rol al inicio; no inventar.                                                                                 |
| `educacion` / `idiomas` | Normalmente intactos.                                                                                                                   |

Reglas de formato:

- Highlights: bullets con backticks `` ` `` o `**negrita**` para tecnologías clave que el ATS deba detectar.
- Fechas: `YYYY-MM` o `YYYY`. `end_date: 'present'` para roles actuales (mostrado como "actualidad" por el locale).
- Links inline en highlights: formato Markdown `[texto](url)`.

## Cómo se construye y despliega el PDF

Workflow en [`.github/workflows/generate-resume.yml`](./.github/workflows/generate-resume.yml):

- **Trigger**: `push` a `main` que toque `rendercv.yaml`.
- **Pipeline**: instala Python 3.12 + `requirements.txt` (`rendercv[full]`), corre `python -m rendercv render rendercv.yaml --pdf-path ./public/resume.pdf` con generación de markdown/html/png desactivada.
- **Commit-back**: `stefanzweifel/git-auto-commit-action@v5` empuja `public/resume.pdf` como `chore: update resume PDF [skip ci]`.
- **Sin tests ni linters** — el único gate de calidad es que `rendercv render` no falle.

**Implicación para el agente**: cualquier cambio en `rendercv.yaml` mergeado a `main` se publicará automáticamente. Validar el render local antes de commitear evita PDFs rotos en producción.

## Comandos

```bash
# Render local (requiere Python + pip install -r requirements.txt)
python -m rendercv render rendercv.yaml --pdf-path ./public/resume.pdf

# Validación rápida del YAML sin generar artefactos
python -m rendercv render rendercv.yaml \
  --dont-generate-markdown --dont-generate-html --dont-generate-png \
  --pdf-path ./public/resume.pdf

# Limpiar salida temporal
rm -rf rendercv_output
```

Si Python no está disponible localmente, el agente puede commitear y dejar que el workflow valide en CI — pero debe avisar al usuario.

## Flujo de trabajo del agente (paso a paso)

1. **Recibir input**: link a la oferta o texto plano. Si es link, fetch el contenido (`WebFetch`).
2. **Cargar skills**: leer `resume-tailor` y `cv-builder`.
3. **Analizar la oferta** (skill `resume-tailor`): extraer requisitos, keywords, seniority, industria.
4. **Cargar estado actual**: leer `rendercv.yaml` + (opcional) collections de `src/content/`.
5. **Matchear**: tabla requisito → evidencia real del usuario. Marcar gaps; nunca inventarlos.
6. **Proponer cambios** al usuario antes de editar (tabla compacta: sección, cambio, razón).
7. **Editar `rendercv.yaml`** con `Edit` preservando el YAML válido.
8. **Validar**: correr `rendercv render` si Python está disponible; si no, hacer un parse YAML mental verificando indentación y comillas.
9. **Reportar**: resumen de cambios + recordatorio del trigger del workflow.

## Pull Request / Commit

- Tipo Conventional Commits: `feat:` o `chore:` con scope `cv` cuando aplique (ej. `chore(cv): adaptar CV para vacante de Backend Engineer en X`).
- Un solo commit por adaptación (`rendercv.yaml` aislado).
- No incluir `public/resume.pdf` — lo regenera el bot en CI.
- Si se modifican también las content collections del portafolio, separar en commits distintos (regla del repo: no mezclar archivos sin relación).

## Notas para el agente

- El usuario es **Nicolas Arbelaez Tapias** — Full Stack con foco en Backend, AI-First y automatización. Cali, Colombia. Verificar siempre que las skills resaltadas matcheen este perfil real.
- Inglés del usuario: **A2 (competencia técnica)**. No adaptar el CV a inglés salvo petición explícita; si se hace, mantener el archivo `.yaml` en español y crear un segundo archivo (`rendercv.en.yaml`) en vez de sobrescribir.
- Si la oferta es claramente fuera de perfil (ej. rol senior con 10+ años, médico, marketing puro), avisar al usuario antes de forzar la adaptación.
