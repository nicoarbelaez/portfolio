---
title: 'Aplicación y Automatización de Entrenamiento y Nutrición'
description: 'Solución integral para automatizar programas de entrenamiento y nutrición mediante Google Sheet y aplicación móvil elaborada en AppSheet para gestion mas eficiente de rutinas y dietas.'
meta: 'defi'
---

TrainerElitez es una solución integral diseñada para optimizar la gestión de programas de entrenamiento y planes nutricionales en el ámbito deportivo. Surgió de la necesidad de automatizar procesos manuales en la creación de planes personalizados, con enfoque en eficiencia operativa y experiencia de usuario.

### Objetivos Principales

- **Automatización de programas**: Generación ágil de rutinas de entrenamiento y planes nutricionales basados en objetivos específicos
- **Calculadora de nutrientes**: Intercambio inteligente de alimentos según requerimientos de macronutrientes
- **Gestión centralizada**: Plataforma unificada para seguimiento de progreso y control de usuarios

### Funcionalidades Clave

#### Google Sheets

- **Seguimiento mensual**: Hojas especializadas para asignar ejercicios y metodologías personalizadas a cada cliente
- **Análisis de progreso**: Detección automática de regresión, estancamiento o avance semana tras semana por ejercicio y día
- **Consolidación de rendimiento**: Hoja centralizada que agrupa resultados para identificar áreas específicas de mejora
- **Visualización muscular**: Representación gráfica del estado de grupos musculares mediante códigos de color según valores numéricos (0-5)

![Visualización de grupos musculares según rendimiento](/img/projects/trainerelitez/preview-check-in.avif)

#### Aplicación Móvil (AppSheet)

- **Dietas personalizadas**: Visualización detallada de planes nutricionales con imágenes de alimentos, cantidades (gramos/medidas caseras) y desglose de macronutrientes
- **Listas de compras interactivas**: Listado completo de alimentos requeridos con sistema de verificación de compras
- **Calculadora de intercambios**: Sustitución de alimentos manteniendo equivalencia calórica
- **Creación de platos personalizados**: Herramienta para diseñar platos con cálculo en tiempo real de macronutrientes y opciones de guardado/reutilización
- **Seguimiento de logros**: Visualización de metas alcanzadas durante el proceso de entrenamiento
- **Panel administrativo**:

  - Gestión centralizada de usuarios, alimentos, logros y recetas
  - Creación automatizada de dietas (por usuario, día y comida) con función de réplica de alimentos o días completos
  - Reutilización de recetas preexistentes en nuevas asignaciones

![Interfaz de dieta y lista de compras](/img/projects/trainerelitez/app-diet.avif)

### Beneficios y Resultados

- **Eficiencia operativa**: Reducción de tiempo en creación de dietas y rutinas
- **Escalabilidad**: Capacidad para gestionar mayor volumen de clientes
- **Experiencia de usuario mejorada**: Acceso móvil inmediato a planes nutricionales y de entrenamiento
- **Visibilidad unificada**: Control centralizado de todos los usuarios sin dispersión de archivos

### Testimonio del Cliente

> La aplicación ha marcado un antes y un después en el servicio que ofrezco a mis asesorados, principalmente porque les ha permitido generar mayor adherencia al plan de alimentación.

<video controls playsinline preload="metadata" class="vertical-video" src="/video/projects/trainerelitez/testimonial.mp4"></video>

## separator

### Arquitectura y Flujo de Datos

| Componente               | Tecnología         | Función                                                        |
| ------------------------ | ------------------ | -------------------------------------------------------------- |
| Frontend Móvil           | AppSheet           | Interfaz de usuario y visualización de contenido               |
| Base de Datos            | Google Sheets      | Almacenamiento de catálogos de alimentos, usuarios y registros |
| API de Conexión          | Google Apps Script | Automatización de consultas y actualización entre hojas        |
| Calculadora Nutricional  | JavaScript         | Lógica para intercambio de alimentos según macronutrientes     |
| Notificaciones           | Brevo              | Envío automático de correos al alcanzar metas                  |
| Imagen Dinámica Muscular | Express + Vercel   | Generación de representación visual del estado muscular        |

### Tecnologías Implementadas

#### API de Visualización Muscular

Endpoint `/api/v1/muscles` genera imágenes que representan el rendimiento muscular mediante parámetros numéricos (0-5):

- 1-2: Color rojo (bajo rendimiento)
- 3: Color amarillo (rendimiento medio)
- 4-5: Color verde (alto rendimiento)

**Ejemplo de implementación:**

```bash
/api/v1/muscles?triceps=5&biceps=5&lumbar=2&...&format=png
```

![Demostración de visualización muscular](https://trainerelitez-defi-api.vercel.app/api/v1/muscles?triceps=5&biceps=5&lumbar=2&trapecio=4&dorsal=3&pectoral=5&hombros=5&abdomen=4&antebrazo=5&cuadriceps=4&aductores=2&femoral=3&gluteo=4&pantorrillas=5&format=png)

### Retos Técnicos y Soluciones

#### 1. Sincronización de Múltiples Hojas de Google Sheets

- **Reto**: Inconsistencias en datos distribuidos entre hojas separadas para alimentos, rutinas y registros de progreso
- **Solución**: Implementación de API intermedia con Google Apps Script utilizando validación y bloqueo optimista
- **Resultado**: Sincronización en tiempo real sin discrepancias entre componentes

#### 2. Limitaciones de Lógica en AppSheet

- **Reto**: Restricciones en validaciones y características avanzadas dentro de AppSheet
- **Solución**: Desarrollo de endpoints personalizados con Google Apps Script para:
  - Generación de PDFs
  - Gestión de listas de compras
  - Réplica estructurada de alimentos entre planes
- **Resultado**: Funcionalidad extendida manteniendo integración nativa con Google Sheets
