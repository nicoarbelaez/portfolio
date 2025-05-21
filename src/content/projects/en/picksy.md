---
title: 'Picksy E-Commerce'
description: 'Multi-tenant e-commerce platform built with a modular architecture to manage independent stores. Integrates advanced customization systems, real-time analytics, and optimization tools.'
meta: 'picksy'
---

**Picksy** is a multi-tenant e-commerce platform designed to deliver scalable and customizable solutions for complex commercial environments. Developed as a prototype for **[Orderly's SAS](/projects/landing-orderlys)**, it emerged from the need to explore modern architectures that combine performance, flexibility, and centralized management. The project, led by lead developer **[Jorge Velasquez](https://github.com/jevg2003)**, was built through a collaborative fork, prioritizing experimentation with emerging technologies and agile development practices.

## Technical Description & Features

Picksy operates under a modular architecture that clearly separates frontend from backend, enabling independent evolution of each component. Its core lies in hosting multiple stores under a single domain, where each business autonomously manages its digital presence without interfering with others.

### Technological Pillars

- **Hybrid Frontend**: Combines **Astro** for static page generation (e.g., catalogs, landing pages) with **Next.js** for dynamic routes (shopping carts, user dashboards). This integration enables load times under 2 seconds for static content and support for complex interactivity.
- **RESTful Backend**: Built with **Node.js** and **Express**, offering over 30 endpoints for JWT authentication, product CRUD, order processing, and inventory synchronization. View it [here](/projects/picksy-api/).
- **Relational Database**: Uses **PostgreSQL** with schema partitioning to isolate data between stores, ensuring security and efficiency in bulk queries.

### Key Features

- **Secure Multi-Tenancy**: Each store operates on a unique subdomain (`store.picksy.com`) with role-based access policies (admin, editor, customer).
- **Real-Time Customization**:
  - WYSIWYG editors to modify themes (colors, fonts, layouts).
  - Automated QR code generation linked to products, with scan metrics in dashboards.
- **Promotional Engine**:
  - Seasonal discounts, single-use coupons, and volume-based purchase rules.
  - Visible countdown timers for flash deals.
- **Built-In Analytics**:
  - Dashboards with interactive charts showing conversions, cart abandonment, and inventory trends.
  - CSV/PDF report exports for integration with external tools.

## Architecture & Data Flow

| Component      | Technologies                        | System Role                                                                |
| -------------- | ----------------------------------- | -------------------------------------------------------------------------- |
| **Rendering**  | Astro (SSG), Next.js (SSR/ISR)      | Delivers static pages for SEO and dynamic pages for interactive user flows |
| **API**        | Node.js, Express, Prisma ORM        | Manages authentication, webhooks, and database synchronization             |
| **Storage**    | PostgreSQL, AWS S3 (for media)      | Hosts structured data and media files with geo-redundancy                  |
| **Deployment** | Vercel (frontend), Render (backend) | Implements CI/CD with auto-rollback and uptime monitoring                  |

## Technical Challenges & Roadmap

Picksy faces critical scalability challenges, many to be addressed in future iterations:

1. **Performance Optimization**:

   - Reduce Time to First Byte (TTFB) on dynamic pages via API-level caching.
   - Implement **Server-Side Rendering (SSR)** for product pages to improve SEO and perceived speed.

2. **Smart Search System**:

   - Replace keyword search with an engine supporting nested filters (price, ratings, custom attributes).
   - Add real-time suggestions and spell-check corrections.

3. **Multi-Tenant Scalability**:

   - Migrate to microservices architecture to isolate failures (e.g., standalone payment service).
   - Adopt **GraphQL** to minimize over-fetching for stores with 10,000+ product catalogs.

4. **Global E-Commerce**:
   - Integrate local payment gateways (e.g., PSE for Colombia, Pix for Brazil).
   - Auto-translate content using APIs like DeepL, with RTL (right-to-left) support.

## Impact & Projection

As the foundation of **Orderly's SAS**, Picksy demonstrates how a well-structured tech stack can adapt to diverse markets.

The platform not only addresses immediate e-commerce needs but also lays the groundwork for:

- **IoT Integration**: Use QR codes to link physical products with digital warranties.
- **Subscription Models**: Manage recurring memberships with prorated upgrades in real time.
- **Unified Marketplace**: Enable cross-store purchases in a single cart with consolidated shipping.

Its success hinges on balancing technical innovation with commercial pragmatism, offering a robust alternative to generic SaaS solutions like Shopify or WooCommerce for specialized use cases.
