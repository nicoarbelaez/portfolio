---
title: 'Plataforma DEFI para Nutrición y Entrenamiento'
description: 'Solución integral para automatizar programas de entrenamiento y nutrición con aplicación móvil y gestión de datos en Google Sheets.'
meta: 'defi'
---

La plataforma **DEFI** ofrece una solución integral de automatización y gestión para mi cliente del ámbito deportivo, un entrenador personal y nutricionista. Diseñada con un enfoque centrado en la eficiencia y la experiencia de usuario, DEFI agiliza la elaboración de programas de entrenamiento y planes de alimentación, incorporando un robusto sistema de cálculo de nutrientes y una completa aplicación móvil.

## Descripción del Proyecto

DEFI nace de la necesidad de optimizar procesos tediosos y manuales en la elaboración de planes personalizados. Los principales objetivos del proyecto fueron:

- **Automatización de Programas**: Permite a mi cliente elaborar rutinas de entrenamiento y menús nutricionales mucho más rápido, en función de los objetivos y parámetros de cada usuario.
- **Calculadora de Nutrientes**: Herramienta capaz de intercambiar alimentos según requerimientos de macronutrientes, garantizando flexibilidad y precisión en la dieta.
- **Aplicación Móvil en AppSheet**: Plataforma accesible desde dispositivos móviles, con gestión de roles, seguimiento de logros y mayor interacción entre entrenador y cliente.

## Funcionalidades Principales

1. **Automatización Nutricional y Lista de Compra**

   - **Cálculo de Nutrientes Automático**: El sistema extrae datos de macronutrientes de todos los alimentos en Google Sheets y calcula automáticamente las proporciones necesarias para cada día de la semana.
   - **Elaboración de Dietas Semanales**: Permite a mi cliente elaborar menús diarios completos para una o varias semanas de forma mucho más rápida, garantizando el cumplimiento de requerimientos nutricionales.
   - **Lista de Compra Consolidada**: Agrega las cantidades totales de cada alimento utilizados en el periodo seleccionado y crea una lista de compra optimizada para el cliente.
   - **Flexibilidad Dinámica**: Si se modifica cualquier elemento del plan (por ejemplo, cambiar un alimento o ajustar calorías), todas las rutinas y la lista de compra se actualizan al instante.

2. **Calculadora de Intercambio de Alimentos**

   - Base de datos de alimentos con valores de macronutrientes almacenada en Google Sheets.
   - Cálculo dinámico de equivalencias para intercambio de raciones.

3. **Aplicación Móvil (AppSheet)**

   - **Gestión de Roles**: Accesos diferenciados para administradores, entrenadores y clientes.
   - **Sistema de Logros**: Desbloqueo de metas y notificaciones por correo al alcanzarlas, enviadas vía **Brevo** (brevo.com).
   - **Repositorio de Videos**: Subida y visualización de material audiovisual para guiar al usuario.
   - **Perfil de Usuario**: Estadísticas de videos vistos y progreso de metas.
   - **Integración de Calculadora**: Acceso directo al cálculo de intercambios desde la app.

4. **Base de Datos en Google Sheets**

   - Centralización de la información en hojas de cálculo con conexión bidireccional.
   - Actualización en tiempo real de datos entre la app y las hojas.

5. **API con Google Apps Script**

   - Desarrollo de una capa intermedia para sincronizar varias hojas de Google Sheets.
   - Endpoints personalizados para la lectura y escritura de datos desde la aplicación móvil.

## Arquitectura y Flujo de Datos

| Componente              | Tecnología         | Descripción                                                                      |
| ----------------------- | ------------------ | -------------------------------------------------------------------------------- |
| Frontend Móvil          | AppSheet           | Interfaz de usuario, gestión de roles y visualización de contenido.              |
| Base de Datos           | Google Sheets      | Almacenamiento de catálogos de alimentos, usuarios y registros de entrenamiento. |
| API de Conexión         | Google Apps Script | Automatización de consultas y actualizaciones entre múltiples hojas.             |
| Calculadora Nutricional | JavaScript         | Lógica de cálculo de intercambios de macronutrientes.                            |
| Notificaciones          | **Brevo**          | Envío de correos automáticos al lograr metas o hitos.                            |

## Beneficios y Resultados

- **Eficiencia Operativa**: Reducción significativa de tiempo en la elaboración de programas.
- **Escalabilidad**: Estructura modular que permite incorporar nuevas funcionalidades sin reescribir la base.
- **Mejora en la Experiencia de Usuario**: Interfaz amigable y personalizada que incrementa la adherencia de los clientes.
- **Visibilidad y Control**: Reportes en tiempo real y seguimiento detallado del desempeño.

## Retos y Soluciones

1. **Sincronización de múltiples hojas de Google Sheets**

   - **Reto**: Mi cliente gestionaba datos en hojas separadas para alimentos, rutinas y registros de progreso, lo que dificultaba la coherencia.
   - **Solución**: API en Google Apps Script como capa intermedia, con validación y bloqueo optimista.
   - **Resultado**: Datos sincronizados en tiempo real y sin discrepancias.

2. **Automatización de cálculos nutricionales dinámicos**

   - **Reto**: Intercambio de alimentos según macronutrientes con cálculos complejos.
   - **Solución**: Lógica en JavaScript que extrae valores desde Google Sheets y actualiza la interfaz en tiempo real.
   - **Resultado**: Intercambios instantáneos sin cálculos manuales.

3. **Gestión de roles y notificaciones personalizadas**

   - **Reto**: Diferenciar permisos y enviar notificaciones sin spam.
   - **Solución**: AppSheet con roles personalizados y triggers que envían correos via **Brevo** solo al alcanzar metas.
   - **Resultado**: Comunicación efectiva y segmentada.

4. **Integración móvil segura y escalable**
   - **Reto**: Mantener rendimiento con usuarios concurrentes.
   - **Solución**: Optimización de consultas, paginación e índices en Google Apps Script; reglas de seguridad en AppSheet.
   - **Resultado**: Rendimiento estable incluso con muchos usuarios.

Con DEFI, mi cliente cuenta con una plataforma privada y eficiente que combina automatización, análisis de datos y experiencia móvil, completamente adaptada a sus necesidades de nutrición y entrenamiento personal. Su enfoque serio y detallado garantiza resultados de alta calidad y fiabilidad, consolidando la confianza de mi cliente en cada etapa del proceso.
