---
title: 'Readia: AI Capabilities Diagnostic Platform'
description: 'Complete documentation of the web application designed to evaluate corporate technological maturity using generative artificial intelligence and serverless architectures.'
meta: 'readia'
---

### Purpose and Methodological Framework

* **Academic Origin**: The Readia project was conceived and developed as a university final degree project. Its primary objective transcended technical implementation, focusing on teaching and the practical application of information technology project management within a controlled yet professional environment.
* **Management Standard**: To ensure the success of the deliverables, the **PMBOK model, 6th edition** (Project Management Body of Knowledge) was rigorously adopted. This regulatory framework allowed for structured administration of knowledge areas, including scope, activity scheduling, cost management, and quality control.

The implementation of the PMBOK methodology ensured that Readia's development maintained a clear trajectory from the charter to project closure. Thanks to this approach, it was possible to mitigate technical risks early on, especially those related to cloud service interoperability, aligning academic goals with high-level software execution.

### Diagnostic Process and User Flow

* **Business Profile Registration**: The user journey begins with the creation of a detailed profile. Through an intuitive form, fundamental data such as the industrial sector, organization size, and strategic vision regarding technology are collected.
* **Initial Context Questionnaire**: Once the profile is established, the system displays a series of predefined questions. These questions act as a standardized reference frame to place the company within an initial maturity spectrum.
* **Dynamic Question Generation**: Readia's innovative core lies in its adaptability. Using the AI engine, the system analyzes previous responses in real-time to formulate new specific questions that delve into detected critical areas.

![Business form with question generation](/img/projects/readia/business_form.webp)

This iterative flow transforms data collection into an intelligent conversation. By answering these dynamically generated questions, the user provides a much richer and more specific context than a traditional static form would allow.

![Form with dynamic question generation](/video/projects/readia/form_ai.gif)

The interactivity of the form ensures that each diagnostic is unique. This dynamic behavior is essential for the artificial intelligence to possess the necessary depth of field to project a strategic roadmap that is truly applicable to the company's reality.

### Visualization, Customization, and Collaboration

* **Diagnostic Report**: After processing the information, the platform generates a comprehensive report. This document evaluates the organization's strategic pillars against the demands of AI adoption, presenting clear metrics and areas for improvement.
* **Context Customization**: Readia offers post-diagnostic flexibility, allowing users to return and modify the context of their initial responses. This facilitates the simulation of different scenarios or profile updates in response to organizational changes.
* **Sharing Functionality**: A collaboration system was integrated, allowing users to send previews of the results to other organization members or stakeholders using simply their username or institutional email.

![Company diagnostic - top view](/img/projects/readia/diagnostic_1.webp)

The user interface has been designed to be professional and analytical. The dashboards do not just present data; they tell a story about the company's current capacity, allowing both technical profiles and decision-makers to understand findings immediately.

![Company diagnostic - scroll view](/img/projects/readia/diagnostic_2.webp)

## separator     

### Software Architecture and Tech Stack

* **Development Framework**: The entire development (frontend and backend) was performed using **Next.js**, allowing for efficient route management and a fluid user experience.
* **Rendering Strategy**: Much of the application utilizes **Server Side Rendering (SSR)** to process diagnostic data on the server, ensuring displayed information is always current and improving indexing.
* **Persistence and Authentication**: **Supabase (Postgres)** was selected as the database engine. Identity management is handled through Supabase Auth integration for third-party providers like **GitHub** and **Google**.
* **Interface Design**: **Tailwind CSS** was employed along with the **shadcn/ui** component library to achieve rapid prototyping and a modern, sober design.

Deploying the infrastructure on **Vercel** allowed for highly agile continuous integration and continuous delivery (CI/CD) cycles. The choice of **shadcn/ui** was decisive in maintaining aesthetic and functional consistency across all complex forms and result panels.

### AI Processing and Architecture Decisions

* **Generative Engine**: The artificial intelligence driving the diagnostics is **Gemini**, selected for its reasoning capabilities and extensive context processing.
* **AI Data Handling**: The **Vercel AI SDK** was used to orchestrate communication with the AI engine, facilitating the generation and management of structured JSON objects for data exchange.
* **Serverless Computing**: **AWS Lambda** was implemented to execute diagnostic functions. This decision allows heavy data processing to be fast, efficient, and decoupled from the main server.

During the architecture design, significant technical challenges arose. Initially, the use of **n8n** as a microservice for diagnostics and roadmaps was evaluated but discarded because it limited the system to a single flow and did not support the concurrency required for multiple simultaneous users. Ultimately, **AWS Lambda** proved to be the optimal solution for allowing concurrent executions and handling the full diagnostic flow scalably.

### Real-time Synchronization and Roadmap Visualization

* **Diagnostic Persistence**: When the Lambda function is invoked, it generates the diagnostic and saves the information to the **Supabase Postgres** database, storing results in both relational attributes and a complex **JSON** object.
* **Roadmap Generation**: The application performs a **parsing of the stored JSON** to feed the **React Flow** library, which is responsible for rendering the interactive strategic roadmap diagram.
* **Realtime Update**: **Supabase Realtime** is used to synchronize the user interface. This allows showing generation progress (the state of the Lambda function) and final results without the user needing to refresh the page.

![Main roadmap](/img/projects/readia/roadmap.webp)

The integration of **React Flow** allows the roadmap to be an interactive tool rather than a static image, where users can explore each node and understand technological dependencies. Thanks to **Supabase Realtime**, the waiting experience while the AI processes the diagnostic is transparent, providing immediate feedback on each intermediate step of the creation flow.

![Roadmap node details](/img/projects/readia/roadmap_details.webp)