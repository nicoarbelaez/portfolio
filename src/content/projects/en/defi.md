---
title: 'DEFI Platform for Nutrition and Training'
description: 'Comprehensive solution to automate training and nutrition programs with a mobile app and data management in Google Sheets.'
meta: 'defi'
---

The **DEFI** platform offers a comprehensive automation and management solution for my client in the sports field, a personal trainer and nutritionist. Designed with a focus on efficiency and user experience, DEFI streamlines the creation of training programs and meal plans by incorporating a robust nutrient calculation system and a full-featured mobile app.

## Project Description

DEFI was born from the need to optimize tedious, manual processes in crafting personalized plans. The main objectives of the project were:

- **Program Automation**: Enables my client to create workout routines and nutritional menus much faster, based on each user’s goals and parameters.
- **Nutrient Calculator**: A tool capable of swapping foods according to macronutrient requirements, ensuring flexibility and accuracy in the diet.
- **Mobile App in AppSheet**: An accessible platform from mobile devices, with role management, achievement tracking, and enhanced interaction between trainer and client.

## Key Features

1. **Nutritional Automation & Shopping List**

   - **Automatic Nutrient Calculation**: The system pulls macronutrient data for all foods from Google Sheets and automatically calculates the required proportions for each day of the week.
   - **Weekly Meal Plan Generation**: Allows my client to create full daily menus for one or multiple weeks much faster, ensuring nutritional requirements are met.
   - **Consolidated Shopping List**: Aggregates total quantities of each food used in the selected period and generates an optimized shopping list for the client.
   - **Dynamic Flexibility**: If any element of the plan is modified (e.g., swapping a food item or adjusting calories), all routines and the shopping list update instantly.

2. **Food Exchange Calculator**

   - Food database with macronutrient values stored in Google Sheets.
   - Dynamic calculation of equivalencies for portion exchanges.

3. **Mobile App (AppSheet)**

   - **Role Management**: Differentiated access for administrators, trainers, and clients.
   - **Achievement System**: Unlocking goals with email notifications sent via **Brevo** (brevo.com).
   - **Video Repository**: Upload and view audiovisual material to guide the user.
   - **User Profile**: Statistics on videos watched and goal progress.
   - **Calculator Integration**: Direct access to the exchange calculator from within the app.

4. **Database in Google Sheets**

   - Centralized information in spreadsheets with bidirectional connection.
   - Real-time data synchronization between the app and the sheets.

5. **API with Google Apps Script**

   - Development of an intermediary layer to synchronize multiple Google Sheets.
   - Custom endpoints for reading and writing data from the mobile application.

## Architecture and Data Flow

| Component              | Technology         | Description                                                  |
| ---------------------- | ------------------ | ------------------------------------------------------------ |
| Mobile Frontend        | AppSheet           | User interface, role management, and content display.        |
| Database               | Google Sheets      | Storage of food catalogs, users, and workout records.        |
| Connection API         | Google Apps Script | Automation of queries and updates across multiple sheets.    |
| Nutritional Calculator | JavaScript         | Logic for macronutrient exchange calculations.               |
| Notifications          | **Brevo**          | Sending automated emails upon goal or milestone achievement. |

## Benefits and Outcomes

- **Operational Efficiency**: Significant reduction in time required to create programs.
- **Scalability**: Modular structure that allows adding new features without rewriting the core.
- **Improved User Experience**: Friendly, personalized interface that boosts client adherence.
- **Visibility and Control**: Real-time reports and detailed performance tracking.

## Challenges and Solutions

1. **Synchronizing Multiple Google Sheets**

   - **Challenge**: My client managed data in separate sheets for foods, routines, and progress logs, which hindered consistency.
   - **Solution**: API in Google Apps Script as an intermediary layer, with validation and optimistic locking.
   - **Outcome**: Real-time synchronization without discrepancies.

2. **Automating Dynamic Nutritional Calculations**

   - **Challenge**: Swapping foods based on macronutrients with complex calculations.
   - **Solution**: JavaScript logic that extracts values from Google Sheets and updates the interface in real time.
   - **Outcome**: Instant exchanges without manual calculations.

3. **Role Management and Personalized Notifications**

   - **Challenge**: Differentiating permissions and sending notifications without spamming.
   - **Solution**: AppSheet with custom roles and triggers that send emails via **Brevo** only upon goal achievements.
   - **Outcome**: Effective, segmented communication.

4. **Secure and Scalable Mobile Integration**

   - **Challenge**: Maintaining performance with concurrent users.
   - **Solution**: Query optimization, pagination, and indexing in Google Apps Script; security rules in AppSheet.
   - **Outcome**: Stable performance even with many users.

With DEFI, my client has a private, efficient platform that combines automation, data analysis, and mobile experience, fully tailored to their personal training and nutrition needs. Its serious, detailed approach ensures high-quality, reliable results, building the client’s trust at every stage of the process.
