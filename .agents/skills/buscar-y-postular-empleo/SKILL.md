---
name: buscar-y-postular-empleo
description: Buscar vacantes, adaptar el CV como variante, generar el PDF, postular en los portales y registrar el resultado. Usar cuando se pida buscar trabajo, postular a ofertas, configurar perfiles en portales de empleo o hacer seguimiento.
---

# Buscar y postular empleo

Procedimiento reutilizable. Este repo es público: **ningún dato personal, salario, respuesta de formulario ni estado de postulaciones va aquí**. Eso vive en `.private/postulaciones/` (ignorado por git).

## Atajo para la siguiente iteración

No volver a investigar: las cuentas ya existen (`.private/postulaciones/cuentas.md`), las respuestas están en `perfil.md` y lo ya visto en `estado.md` y `busqueda.md`. Orden: leer esos cuatro archivos, buscar solo ofertas nuevas, filtrar, preparar el CV, postular y registrar.

## Antes de empezar

1. Leer `.private/postulaciones/perfil.md` (preferencias y respuestas ya decididas) y `.private/postulaciones/estado.md` (lo ya enviado, para no repetir).
2. Preguntar solo lo que falte o haya cambiado. Si no existen esos archivos, entrevistar: roles, modalidad y ciudad, salario mínimo, nivel de inglés, disponibilidad, tipo de contrato.
3. Leer `resume/cv.yaml`, `AGENTS.md` y las skills `resume-tailor` y `cv-builder`.

## Reglas fijas

- No inventar experiencia, tecnologías, métricas, títulos ni nivel de inglés. Verificar cada afirmación contra `resume/cv.yaml` o `src/content/`.
- El asistente no escribe contraseñas, números de documento ni códigos de verificación, y no resuelve CAPTCHA. Eso lo hace la persona.
- Crear cuentas, aceptar términos y enviar postulaciones requiere autorización de la persona en la conversación. No marcar publicidad ni alertas opcionales.
- Avisar si la oferta está claramente fuera de perfil.

## 1. Buscar

- No quedarse en un solo portal: LinkedIn, Computrabajo, Indeed, elempleo, páginas de carreras de las empresas.
- Priorizar ofertas recientes y con pocos candidatos.
- Descartar las que no cumplan modalidad, salario mínimo o idioma, y las ya registradas en `estado.md`.
- Presentar una tabla (empresa, cargo, enlace, antigüedad, candidatos, requisitos que faltan) y confirmar cuáles se envían.

### Búsquedas que funcionaron

| Fuente                    | Cómo                                                                                                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LinkedIn                  | `linkedin.com/jobs/search/?keywords=<texto>&geoId=100876405` (Colombia). `f_TPR=r604800` última semana, `r1209600` dos semanas; `f_E=2` junior; `f_WT=2` remoto |
| LinkedIn (listado rápido) | Desde una pestaña de LinkedIn, pedir `/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=&location=` y leer título, empresa, fecha e id                    |
| elempleo                  | Por empresa `elempleo.com/co/ofertas-empleo/<empresa>`; oferta `elempleo.com/co/ofertas-trabajo/<slug>-<id>`                                                    |
| Computrabajo              | `co.computrabajo.com/trabajo-de-<cargo>-en-valle-del-cauca-en-cali`                                                                                             |
| Get on Board              | `getonbrd.com/empleos/programacion`                                                                                                                             |

Textos útiles: «AI engineer agentes», «forward deployed engineer», «desarrollador full stack junior», «desarrollador inteligencia artificial», «automatización IA n8n».

### Filtro de descarte (antes de crear CV o cuentas)

- Leer los requisitos completos. Si las tecnologías centrales no están en el CV o la persona dice no manejarlas, descartar.
- Descartar por años de experiencia o nivel «Senior» claramente por encima, título obligatorio o inglés superior al aceptado.
- Anotar cada descarte con su motivo en `busqueda.md`.

## 2. Adaptar el CV

- Una variante por tipo de oferta en `resume/variants/<slug>.yaml` (ver «Variantes privadas» en `AGENTS.md`). No editar `resume/cv.yaml` para una oferta puntual.
- No poner nombre de empresa ni enlace de la oferta en `meta` (el repo es público); anotarlos en `estado.md`.
- Generar: `pnpm generate:variants` (salida en `resume/.generated/`).
- Abrir el PDF y revisarlo antes de enviarlo. Guardar la copia enviada en `.private/cv-enviados/` sin sobrescribir las de envíos anteriores.
- Si RenderCV no puede ejecutarse en el entorno del asistente, pedir a la persona que corra el comando.

## 3. Configurar perfiles (una sola vez por portal)

Antes de postular, el perfil del portal debe coincidir con el CV: cargo actual y fechas, nivel de inglés, estudios (en curso, no como título obtenido), CV adjunto predeterminado.

| Portal          | Pasos                                                                                                                                                                                                                                                                                                                          | Lo que hace la persona                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Computrabajo    | Editar experiencia e idiomas en `candidato.co.computrabajo.com/candidate/cv/edit/`; subir PDF en `.../candidate/cv/uploadcv` y marcarlo predeterminado                                                                                                                                                                         | Iniciar sesión                                      |
| Indeed          | Revisar nombre completo y reemplazar el CV guardado                                                                                                                                                                                                                                                                            | Iniciar sesión                                      |
| elempleo        | Registro en `elempleo.com/co/registro-hoja-de-vida/`; «Usar mi HV» y «Analizar con IA»; completar información personal, perfil, experiencia y estudios (sin eso no deja postular); revisar lo autocompletado                                                                                                                   | Documento, fecha de nacimiento, género y contraseña |
| CGI (Njoyn)     | Alta: «Create your profile», correo y país, aviso de privacidad, adjuntar CV como _Resume_ y «Attach document» antes de «Save & Continue»; la página final vence en 60 minutos. Postular: abrir la oferta en `cgi.njoyn.com`, «Apply Now», responder si hay referido, marcar el CV y «Save & Continue»; llega acuse por correo | Contraseña e inicio de sesión                       |
| SmartRecruiters | Tras postular puede llegar por correo un formulario adicional                                                                                                                                                                                                                                                                  | Documento y salario actual                          |

Otros formularios usados: Jelou (`app.nodi.global`, exige confirmar el enlace del correo) y FullStack (formulario propio; rechaza correos ya usados).

## 4. Postular

- Revisar que el CV adjunto sea el de la variante correcta (en Computrabajo se envía el predeterminado).
- Responder las preguntas con lo registrado en `perfil.md`. Si aparece una pregunta nueva sin respuesta clara, preguntar y guardar la respuesta allí.
- Confirmar que el envío quedó hecho: mensaje en pantalla **y** correo de acuse. Algunos portales exigen confirmar un enlace en el correo.
- Si dice que el correo ya se usó, buscar el acuse anterior en Gmail; no reintentar con otros datos.

## 5. Registrar y hacer seguimiento

- Actualizar `estado.md`: fecha, empresa, cargo, enlace, CV usado, estado, respuestas declaradas, pendiente y fecha de seguimiento.
- Seguimiento a la semana si no hay respuesta (o al volver el contacto de vacaciones).

## Limitaciones conocidas del asistente

- RenderCV puede fallar al descargar paquetes de Typst en entornos aislados: pedir `pnpm generate:variants` en el equipo de la persona.
- El puente con el equipo no permite `git push`: dejar commits y merge hechos y pedir `git push origin develop main`.
- El hook `pre-commit` usa `pnpm`; si no existe, pasar `prettier` a los archivos afectados antes de usar `--no-verify`, y avisarlo.
- No se puede escribir en `.claude/` de forma remota: esta skill vive en `.agents/skills/`.

## Problemas conocidos del navegador

- Un formulario puede quedar en «Leave site?»: usar otra pestaña.
- Tras subir un archivo, la página puede congelarse unos segundos: esperar antes de volver a hacer clic.
- La extensión puede pedir permiso al redirigir a otro subdominio; verificar la URL antes de continuar.
- Para cargar archivos usar el campo de archivo directamente, no abrir el selector del sistema.
