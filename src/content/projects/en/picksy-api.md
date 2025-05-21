---
title: 'Picksy API'
description: 'Secure multi-tenant system built with Node.js, Express, and PostgreSQL. Manages JWT authentication, strict validations (Joi), email delivery (Nodemailer), and protection against backdoors. Prioritizes scalability and data isolation through a relational model.'
meta: 'picksy-api'
---

The backend of **[Picksy](/projects/picksy/)** was designed as a robust and secure system to support critical e-commerce operations, prioritizing the prevention of vulnerabilities like _backdoors_ and ensuring data isolation in a multi-tenant environment. Built on **Node.js** and **Express**, it integrates specialized technologies for authentication, validation, asynchronous communication, and relational database management.

## Technological Pillars of the Backend Module

### 1. **Express.js as the RESTful Service Layer**

- **Modularized Routes**: Each entity in the ER model (Users, Products, Orders) has its own router, simplifying maintenance and scalability.
- **Security Middleware**: Protection layers against SQL injection, XSS, and CSRF were implemented using libraries like `helmet` and `cors`, configured restrictively.
- **Centralized Error Handling**: All endpoints capture exceptions via a global middleware that logs incidents without exposing sensitive details.

### 2. **Sequelize ORM for PostgreSQL Abstraction**

- **ER-Based Modeling**: Entities and relationships from the ER diagram were mapped to models with schema-level validations (e.g., `NOT NULL` constraints, specific data types).
- **Version-Controlled Migrations**: Every database schema change was versioned using migrations executed with `sequelize-cli`, enabling safe rollbacks.
- **ACID Transactions**: Critical operations (e.g., order creation with inventory deduction) were encapsulated in transactions to prevent inconsistent states.

### 3. **Authentication with Passport and JWT**

- **Local and JWT Strategies**:
  - _Passport-local_ handles traditional email/password login, using `bcryptjs` for password hashing.
  - _Passport-jwt_ validates tokens in each request, with configurable expiration and a blacklist for revoked tokens.
- **Granular Roles**: Users have role-based permissions (admin, seller, customer) verified via middleware before resource access.

### 4. **Validations with Joi and Business Logic**

- **Input Schemas**: Every API payload is validated with Joi before processing, rejecting malformed data or potential injections.
- **Two-Layer Validation**: In addition to Joi, Sequelize models include database-level constraints (e.g., unique fields, numeric ranges).

### 5. **Asynchronous Communication with Nodemailer**

- **Transactional Flows**:
  - Registration confirmation via emails with verification tokens.
  - Order status change notifications (shipping, delivery).
  - Password resets with JWT-signed temporary links.

## Key Strategies for Backdoor Prevention

- **Principle of Least Privilege**: Database services operate with users restricted to necessary permissions (e.g., API users cannot delete tables).
- **Access Monitoring**:
  - Logs of all SQL queries in production environments.
  - Alerts for failed administrative access attempts.

## Database Structure and Multi-Tenancy

![Picksy Entity-Relationship Model](/img/projects/picksyapi/model_er.webp)

The ER model reflects a multi-tenant architecture where:

- **Companies** manage their own **Products**, **Orders**, and **Users**, with foreign keys ensuring isolation.
- **Inventory** is handled through variant systems (size, color) linked to unique SKUs.

## Deployment and Monitoring

- **Environment Variables**: Sensitive configurations (JWT keys, SMTP credentials) are managed via `.env` files excluded from the repository.
- **Health Checks**: `/status` endpoints verify real-time database and external service connections.
- **Horizontal Scaling**: The backend is deployed in Docker containers with load balancing, allowing instance scaling based on demand.

The Picksy backend demonstrates how combining mature technologies (Express, PostgreSQL) with rigorous security practices can build enterprise-grade e-commerce systems. By prioritizing strict validation, data isolation, and continuous auditing, it establishes a reliable foundation to scale toward complex functionalities like global payment integrations or subscription models, without compromising operational stability.
