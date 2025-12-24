---
title: 'High Quality Roofer Co'
description: 'Recuperación, limpieza de malware y optimización de plataforma web para servicios de roofing con integración de backend mediante Google Apps Script.'
meta: 'hqroofingco'
---

Este proyecto consiste en una página web desarrollada originalmente en WordPress, diseñada para promocionar servicios de roofing y actuar como una herramienta estratégica para la captación de clientes potenciales a través de formularios de contacto.

### Estado Inicial y Problemáticas

La plataforma fue entregada por los clientes con graves deficiencias técnicas que impedían su correcto funcionamiento y comprometían la imagen de la empresa:

- **Compromiso de Seguridad**: La instalación de WordPress había sido hackeada, resultando en la inyección de malware, archivos maliciosos y contenido explícito no adecuado dentro del sitio.
- **Gestión de Acceso**: Las credenciales de acceso administrativo eran inexistentes o no podían ser localizadas por los propietarios.
- **Problemas Visuales**: El sistema de estilos (CSS) presentaba fallos críticos que afectaban la navegación y el diseño profesional de la página.

### Acciones Realizadas

Para rescatar el proyecto, se ejecutó un plan de intervención integral que incluyó:

1.  **Saneamiento**: Mitigación y eliminación total del malware y los archivos inyectados.
2.  **Restauración de Estilos**: Corrección de los errores de CSS para devolver la integridad visual al sitio.
3.  **Optimización**: Mejoras en el rendimiento general de la página para asegurar una carga eficiente.
4.  **Limpieza de Datos**: Eliminación de archivos y datos residuales generados tanto por el ataque informático como por administraciones anteriores.

## separator

### Backend y Captación de Leads

Se desarrolló una solución personalizada para el almacenamiento de cotizaciones utilizando **Google Apps Script**. El objetivo principal es procesar y guardar la información enviada por los usuarios a través de los formularios del sitio de forma externa y segura.

### Reto Técnico: Integración WordPress - Apps Script

Durante la implementación, se detectó que el ecosistema de **WordPress y Elementor** no lograba interpretar correctamente las respuestas (responses) enviadas por Google Apps Script. Esto generaba fallos en la comunicación de datos.

#### Solución Implementada: Mini-Plugin Personalizado

Para resolver esta incompatibilidad, se desarrolló un plugin a medida en PHP que actúa como puente de comunicación:

- **Webhook Interno**: El plugin genera un punto de enlace (endpoint) dentro de WordPress.
- **Redirección de Datos**: Recibe la información del formulario y la redirige mediante un webhook hacia Google Apps Script.
- **Arquitectura Intermedia**: Esta capa resolvió el problema de interpretación de respuestas, garantizando que el flujo de datos fuera exitoso y transparente para el usuario.

### SEO y Monitoreo

Se implementó una infraestructura robusta para el seguimiento y posicionamiento del sitio:

- **Google Analytics**: Configuración completa para el monitoreo de tráfico y comportamiento de usuario.
- **Google Search Console**: Conexión y validación para el control de indexación.
- **Depuración de Archivos**: Se eliminaron múltiples archivos innecesarios y archivos basura para optimizar la salud del sitio ante los motores de búsqueda, asegurando que el rastro del malware fuera borrado por completo.
