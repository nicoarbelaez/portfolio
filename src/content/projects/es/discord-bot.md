---
title: 'Discord Bot'
description: 'Un bot de Discord creado para automatizar acciones comunes y unir a la comunidad'
meta: 'discord-bot'
---

Este bot nace de la necesidad de automatizar tareas de moderación y mejorar la experiencia de comunidad en Discord. Diseñado para un servidor propio, ofrecía herramientas básicas como bienvenida automática, recordatorios y gestión de roles, con el objetivo de facilitar numerosas acciones diarias.

### Historia del proyecto

1. **Origen de la idea**
   Al gestionar un servidor con decenas de usuarios, surgió la necesidad de simplificar tareas repetitivas: asignar roles, saludar a nuevos miembros y crear recordatorios personalizados.

2. **Expansión hacia Minecraft**
   Tras estabilizar las funciones básicas en Discord, se planteó la integración con un servidor de Minecraft propio, permitiendo notificar eventos in-game (p. ej. inicio de partida, alertas de caída) y coordinar actividades entre ambas plataformas.

### Proceso de desarrollo

1. **Definición de funcionalidades**

   - Moderación automática (kick/ban por palabras prohibidas)
   - Sistema de recordatorios y programaciones
   - Conexión con una base de datos ligera para almacenar logs y configuraciones

2. **Implementación con `discord.py`**

   - Configuración de eventos asíncronos (`on_message`, `on_member_join`)
   - Uso de corutinas y manejo de promesas para encadenar llamadas sin bloquear el bot

3. **Integración de APIs externas**

   - Creación de peticiones HTTP a la API del servidor Minecraft
   - Procesamiento de respuestas JSON para extraer datos de jugadores y estado del servidor

4. **Sincronización persistente**

   - Diseño de un esquema simple en SQLite para registrar recordatorios y eventos
   - Métodos de lectura/escritura asíncronos para evitar cuellos de botella

5. **Despliegue y mantenimiento**

   - Configuración de GitHub Actions para pruebas automáticas
   - Despliegue continuo en Heroku con actualizaciones al hacer _push_ en la rama principal

### Uso

- `!help` – Muestra todos los comandos disponibles.
- `!remindme [tiempo] [mensaje]` – Programa un recordatorio que se almacenará en la base de datos y disparará tras el periodo especificado.
- `!mcstatus` – Consulta el estado del servidor de Minecraft y muestra el número de jugadores en línea.
- `!welcome on|off` – Activa o desactiva el mensaje de bienvenida para nuevos miembros.

### Aprendizajes y retos

- **Comprender las promesas y la programación asíncrona**
  Aprender a encadenar tareas con `async/await` y gestionar excepciones en callbacks sin bloquear el hilo principal.
- **Manejo de APIs**
  Diseñar clientes HTTP ligeros, procesar respuestas y transformar datos para enriquecer mensajes en Discord.
- **Sincronización de entornos**
  Alinear el ciclo de desarrollo en local con el despliegue en la nube, garantizando que las variables de entorno y credenciales estén siempre actualizadas.
- **Coordinación Multi-Plataforma**
  Resolver desafíos de comunicación entre Discord y Minecraft, como latencias y formatos de mensaje distintos.
