---
title: 'Readia: Plataforma de Diagnóstico de Capacidades de IA'
description: 'Documentación completa de la aplicación web diseñada para evaluar la madurez tecnológica empresarial mediante inteligencia artificial generativa y arquitecturas serverless.'
meta: 'readia'
---

### Propósito y Marco Metodológico

* **Origen Académico**: El proyecto Readia fue concebido y desarrollado como un trabajo final de grado universitario. El objetivo primordial de esta iniciativa fue trascender la implementación técnica, enfocándose en la enseñanza y aplicación práctica de la gestión de proyectos de tecnologías de la información en un entorno controlado pero profesional.
* **Estándar de Gestión**: Para garantizar el éxito de los entregables, se adoptó rigurosamente el modelo **PMBOK, edición 6** (Project Management Body of Knowledge). Este marco normativo permitió una administración estructurada de las áreas de conocimiento, incluyendo el alcance, el cronograma de actividades, la gestión de costos y el control de calidad.

La implementación de la metodología PMBOK aseguró que el desarrollo de Readia mantuviera una trayectoria clara desde el acta de constitución hasta el cierre del proyecto. Gracias a este enfoque, fue posible mitigar riesgos técnicos de manera temprana, especialmente aquellos relacionados con la interoperabilidad de servicios en la nube, alineando los objetivos académicos con una ejecución de software de alto nivel.

### Proceso de Diagnóstico y Flujo del Usuario

* **Registro de Perfil Empresarial**: El viaje del usuario comienza con la creación de un perfil detallado. A través de un formulario intuitivo, se recolectan datos fundamentales como el sector industrial, el tamaño de la organización y su visión estratégica respecto a la tecnología.
* **Cuestionario de Contexto Inicial**: Una vez establecido el perfil, el sistema despliega una serie de preguntas predefinidas. Estas interrogantes actúan como un marco de referencia estandarizado para situar a la empresa en un espectro de madurez inicial.
* **Generación Dinámica de Preguntas**: El núcleo innovador de Readia reside en su capacidad de adaptación. Utilizando el motor de IA, el sistema analiza las respuestas previas en tiempo real para formular nuevas preguntas específicas que profundizan en áreas críticas detectadas.

![Formulario de empresa con generación de preguntas](/img/projects/readia/business_form.webp)

Este flujo iterativo transforma la recolección de datos en una conversación inteligente. Al responder a estas preguntas generadas dinamicamente, el usuario proporciona un contexto mucho más rico y específico que el que permitiría un formulario estático tradicional.

![Formulario con generación de preguntas dinámicas](/video/projects/readia/form_ai.gif)

La interactividad del formulario asegura que cada diagnóstico sea único. Este comportamiento dinámico es esencial para que la inteligencia artificial posea la profundidad de campo necesaria para proyectar una hoja de ruta estratégica que sea verdaderamente aplicable a la realidad de la empresa.

### Visualización, Personalización y Colaboración

* **Informe de Diagnóstico**: Tras procesar la información, la plataforma genera un informe exhaustivo. Este documento evalúa pilares estratégicos de la organización frente a las demandas de la adopción de IA, presentando métricas claras y áreas de mejora.
* **Personalización del Contexto**: Readia ofrece flexibilidad post-diagnóstico, permitiendo a los usuarios regresar y modificar el contexto de sus respuestas iniciales. Esto facilita la simulación de diferentes escenarios o la actualización del perfil ante cambios organizacionales.
* **Funcionalidad de Compartición**: Se integró un sistema de colaboración que permite enviar previsualizaciones de los resultados a otros miembros de la organización o partes interesadas, utilizando simplemente su nombre de usuario o correo electrónico institucional.

![Diagnóstico de la empresa - vista superior](/img/projects/readia/diagnostic_1.webp)

La interfaz de usuario ha sido diseñada para ser profesional y analítica. Los paneles de control no solo presentan datos, sino que cuentan una historia sobre la capacidad actual de la empresa, permitiendo que tanto perfiles técnicos como directivos comprendan los hallazgos de manera inmediata.

![Diagnóstico de la empresa - vista con scroll](/img/projects/readia/diagnostic_2.webp)

## separator    

### Arquitectura de Software y Stack Tecnológico

* **Framework de Desarrollo**: La aplicación se construyó íntegramente sobre **Next.js**, aprovechando sus capacidades tanto para el frontend como para las API routes del backend. Esto permitió un desarrollo unificado y una gestión de rutas altamente eficiente.
* **Estrategia de Renderizado**: Se priorizó el uso de **Server Side Rendering (SSR)**. Esta decisión técnica garantiza que los diagnósticos y datos dinámicos se procesen en el servidor, ofreciendo una carga inicial más rápida y una consistencia de datos absoluta en cada visualización.
* **Infraestructura de Datos y Autenticación**: **Supabase** actúa como el núcleo de persistencia mediante **Postgres**. Además, gestiona la autenticación segura a través de proveedores externos como GitHub y Google, simplificando el acceso para los usuarios corporativos.
* **Diseño y Prototipado**: Para la capa visual, se utilizó **Tailwind CSS** en conjunto con **shadcn/ui**. Esta combinación facilitó la creación de componentes de interfaz modernos y funcionales de manera ágil, manteniendo una estética sobria y profesional.

El despliegue de la infraestructura se realizó sobre **Vercel**, lo que permitió establecer un flujo de integración continua (CI/CD) robusto. El uso de componentes de **shadcn/ui** fue fundamental para acelerar el prototipado visual sin comprometer la calidad del software final, permitiendo al equipo concentrarse en la lógica de procesamiento de IA.

### Procesamiento de IA y Decisiones de Arquitectura

* **Motor Generativo**: El cerebro de la aplicación es **Gemini**. Se seleccionó este modelo por su avanzada capacidad de razonamiento y su ventana de contexto extendida, ideal para analizar grandes volúmenes de respuestas empresariales.
* **Orquestación con AI SDK**: Se implementó la librería **AI de Vercel** para manejar la comunicación con el motor generativo. Esta herramienta facilitó la creación de objetos JSON estructurados, asegurando que la salida de la IA fuera siempre compatible con los requerimientos del sistema.
* **Computación Serverless**: La generación de diagnósticos pesados se delegó a **AWS Lambda**. Esta arquitectura desacoplada permite que el procesamiento intenso se realice de forma independiente, optimizando la velocidad y la respuesta del servidor principal.

Durante la fase de diseño, se evaluó el uso de **n8n** como motor de microservicios. Sin embargo, tras pruebas de carga, se descartó debido a limitaciones en la concurrencia y dificultades para escalar eficientemente cuando múltiples usuarios solicitaban diagnósticos simultáneos. La transición a **AWS Lambda** proporcionó la elasticidad necesaria para manejar flujos complejos de creación de roadmaps de forma concurrente y segura.

### Sincronización Realtime y Visualización de Roadmap

* **Persistencia Estructurada**: Cuando la función Lambda completa el análisis, guarda los resultados en la base de datos de Supabase. La información se almacena de forma híbrida: atributos relacionales directos para consultas rápidas y objetos **JSON** complejos para la profundidad del diagnóstico.
* **Generación de Hoja de Ruta**: El sistema realiza un parseo de los datos JSON para alimentar la librería **React Flow**. Esto transforma los datos abstractos de la IA en un diagrama interactivo y visualmente rico.
* **Actualización en Tiempo Real**: Gracias a **Supabase Realtime**, la interfaz del usuario se actualiza automáticamente. El usuario puede observar el progreso de la función Lambda y ver cómo aparecen los resultados finales sin necesidad de refrescar el navegador.

![Hoja de ruta principal](/img/projects/readia/roadmap.webp)

La integración con **React Flow** permite que la hoja de ruta estratégica sea una herramienta de exploración. Los usuarios pueden interactuar con cada nodo del gráfico para profundizar en las recomendaciones técnicas y estratégicas sugeridas por la inteligencia artificial.

![Detalles del nodo de la hoja de ruta](/img/projects/readia/roadmap_details.webp)

Esta arquitectura garantiza que la experiencia del usuario sea fluida. Mientras AWS Lambda y Gemini trabajan en el backend procesando la complejidad del diagnóstico, el cliente recibe feedback constante mediante la conexión Realtime, culminando en una representación visual interactiva que facilita la toma de decisiones tecnológicas.