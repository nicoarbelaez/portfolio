---
title: 'Training and Nutrition Application and Automation'
description: 'Comprehensive solution to automate training and nutrition programs using Google Sheets and mobile app developed in AppSheet for more efficient management of routines and diets'
meta: 'defi'
---

TrainerElitez is a comprehensive solution designed to optimize the management of training programs and nutrition plans in the sports field. It emerged from the need to automate manual processes in creating personalized plans, focusing on operational efficiency and user experience.

### Main Objectives

- **Program Automation**: Agile generation of training routines and nutrition plans based on specific goals
- **Nutrient Calculator**: Intelligent food exchange according to macronutrient requirements
- **Centralized Management**: Unified platform for progress tracking and user control

### Key Functionalities

#### Google Sheets

- **Monthly Tracking**: Specialized sheets to assign exercises and personalized methodologies to each client
- **Progress Analysis**: Automatic detection of regression, stagnation or progress week by week per exercise and day
- **Performance Consolidation**: Centralized sheet grouping results to identify specific improvement areas
- **Muscle Visualization**: Graphical representation of muscle group status using color codes according to numerical values (0-5)

![Muscle group visualization according to performance](/img/projects/trainerelitez/preview-check-in.avif)

#### Mobile Application (AppSheet)

- **Personalized Diets**: Detailed visualization of nutrition plans with food images, quantities (grams/household measures) and macronutrient breakdown
- **Interactive Shopping Lists**: Complete listing of required foods with purchase verification system
- **Exchange Calculator**: Food substitution maintaining caloric equivalence
- **Custom Dish Creation**: Tool to design dishes with real-time macronutrient calculation and save/reuse options
- **Achievement Tracking**: Visualization of goals achieved during training process
- **Administrative Panel**:
  - Centralized management of users, foods, achievements and recipes
  - Automated diet creation (by user, day and meal) with food or full day replication function
  - Reuse of pre-existing recipes in new assignments

![Diet and shopping list interface](/img/projects/trainerelitez/app-diet.avif)

### Benefits and Results

- **Operational Efficiency**: Reduced time in diet and routine creation
- **Scalability**: Capability to manage larger client volume
- **Improved User Experience**: Immediate mobile access to nutrition and training plans
- **Unified Visibility**: Centralized control of all users without file dispersion

### Client Testimonial

> The application has marked a before and after in the service I offer to my clients, mainly because it has allowed them to generate greater adherence to the nutrition plan.

<video controls playsinline preload="metadata" style="max-width:40%;" src="/video/projects/trainerelitez/testimonial.mp4"></video>

## separator

### Architecture and Data Flow

| Component              | Technology         | Functionality                                        |
| ---------------------- | ------------------ | ---------------------------------------------------- |
| Mobile Frontend        | AppSheet           | User interface and content visualization             |
| Database               | Google Sheets      | Storage of food catalogs, users and records          |
| Connection API         | Google Apps Script | Automation of queries and updates between sheets     |
| Nutritional Calculator | JavaScript         | Logic for food exchange based on macronutrients      |
| Notifications          | Brevo              | Automatic email sending upon reaching goals          |
| Dynamic Muscle Image   | Express + Vercel   | Generation of visual representation of muscle status |

### Implemented Technologies

#### Muscle Visualization API

Endpoint `/api/v1/muscles` generates images representing muscle performance through numerical parameters (0-5):

- 1-2: Red color (low performance)
- 3: Yellow color (medium performance)
- 4-5: Green color (high performance)

**Implementation example:**

```bash
/api/v1/muscles?triceps=5&biceps=5&lumbar=2&...&format=png
```

![Muscle visualization demonstration](https://trainerelitez-defi-api.vercel.app/api/v1/muscles?triceps=5&biceps=5&lumbar=2&trapecio=4&dorsal=3&pectoral=5&hombros=5&abdomen=4&antebrazo=5&cuadriceps=4&aductores=2&femoral=3&gluteo=4&pantorrillas=5&format=png)

### Technical Challenges and Solutions

#### 1. Synchronization of Multiple Google Sheets

- **Challenge**: Inconsistencies in data distributed across separate sheets for foods, routines and progress records
- **Solution**: Implementation of intermediate API with Google Apps Script using validation and optimistic locking
- **Result**: Real-time synchronization without discrepancies between components

#### 2. Logic Limitations in AppSheet

- **Challenge**: Restrictions on validations and advanced features within AppSheet
- **Solution**: Development of custom endpoints with Google Apps Script for:
  - PDF generation
  - Shopping list management
  - Structured food replication between plans
- **Result**: Extended functionality while maintaining native integration with Google Sheets
