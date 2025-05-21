---
title: 'Picksy API'
description: 'Sistema multiempresa seguro construido con Node.js, Express y PostgreSQL. Gestiona autenticación JWT, validaciones estrictas (Joi), envío de correos (Nodemailer) y protege contra backdoors. Prioriza escalabilidad y aislamiento de datos mediante modelo relacional.'
meta: 'picksy-api'
---

El backend de **[Picksy](/es/projects/picksy/)** se diseñó como un sistema robusto y seguro para soportar operaciones críticas de e-commerce, priorizando la prevención de vulnerabilidades como _backdoors_ y garantizando aislamiento de datos en un entorno multiempresa. Basado en **Node.js** y **Express**, integra tecnologías especializadas para autenticación, validación, comunicación asíncrona y gestión de bases de datos relacionales.

## Pilares Tecnológicos del Módulo Backend

### 1. **Express.js como Capa de Servicios RESTful**

- **Rutas Modularizadas**: Cada entidad del modelo ER (Usuarios, Productos, Pedidos) tiene su propio router, facilitando el mantenimiento y la escalabilidad.
- **Middleware de Seguridad**: Se implementaron capas de protección contra inyecciones SQL, XSS y CSRF usando librerías como `helmet` y `cors` configuradas de forma restrictiva.
- **Gestión de Errores Centralizada**: Todos los endpoints capturan excepciones mediante un middleware global que registra incidentes sin exponer detalles sensibles.

### 2. **Sequelize ORM para la Abstracción de PostgreSQL**

- **Modelado Basado en el ER**: Las entidades y relaciones del diagrama se mapearon en modelos con validaciones a nivel de esquema (ej: restricciones `NOT NULL`, tipos de datos específicos).
- **Migrations para Control de Versiones**: Cada cambio en la estructura de la base de datos se versionó mediante migraciones ejecutadas con `sequelize-cli`, permitiendo rollbacks seguros.
- **Transacciones ACID**: Operaciones críticas (ej: creación de pedidos con descuento de inventario) se encapsularon en transacciones para evitar estados inconsistentes.

### 3. **Autenticación con Passport y JWT**

- **Estrategia Local y JWT**:
  - _Passport-local_ gestiona el login tradicional con email y contraseña, usando `bcryptjs` para hashing de contraseñas.
  - _Passport-jwt_ valida tokens en cada request, con expiración configurable y lista negra para tokens revocados.
- **Roles Granulares**: Los usuarios tienen permisos basados en roles (admin, vendedor, cliente) que se verifican en middleware antes de acceder a recursos.

### 4. **Validaciones con Joi y Lógica de Negocio**

- **Schemas para Inputs**: Cada payload de API se valida con Joi antes de procesarlo, rechazando datos malformados o inyecciones potenciales.
- **Validación en Dos Capas**: Además de Joi, los modelos de Sequelize incluyen restricciones a nivel de base de datos (ej: campos únicos, rangos numéricos).

### 5. **Comunicación Asíncrona con Nodemailer**

- **Flujos Transaccionales**:
  - Confirmación de registro mediante emails con tokens de verificación.
  - Notificaciones de cambio de estado en pedidos (envío, entrega).
  - Reseteo de contraseñas con enlaces temporales y firmados con JWT.

## Estrategias Clave para Prevención de Backdoors

- **Principio de Mínimo Privilegio**: Los servicios de base de datos operan con usuarios que solo tienen permisos necesarios (ej: el usuario de la API no puede eliminar tablas).
- **Monitorización de Accesos**:
  - Logs de todas las consultas SQL en entornos de producción.
  - Alertas por intentos de acceso fallidos a recursos administrativos.

## Estructura de la Base de Datos y Multi-Tenancy

![Modelo Entidad-Relación de Picksy](/img/projects/picksyapi/model_er.webp)

El modelo ER refleja una arquitectura multiempresa donde:

- **Empresas** tienen sus propios **Productos**, **Pedidos** y **Usuarios**, con claves foráneas que garantizan aislamiento.
- **Inventario** se gestiona mediante un sistema de variantes (talla, color) vinculadas a SKUs únicos.

## Despliegue y Monitorización

- **Variables de Entorno**: Configuraciones sensibles (claves JWT, credenciales SMTP) se gestionan mediante archivos `.env` excluidos del repositorio.
- **Health Checks**: Endpoints `/status` verifican conexiones a base de datos y servicios externos en tiempo real.
- **Escalado Horizontal**: El backend se despliega en contenedores Docker con balanceo de carga, permitiendo escalar instancias según demanda.

El backend de Picksy demuestra cómo combinar tecnologías maduras (Express, PostgreSQL) con prácticas rigurosas de seguridad para construir sistemas e-commerce empresariales. Al priorizar la validación estricta, el aislamiento de datos y la auditoría continua, se establece una base confiable para escalar hacia funcionalidades complejas como integración de pagos globales o modelos de suscripción, sin comprometer la estabilidad operativa.
