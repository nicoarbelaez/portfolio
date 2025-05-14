---
title: "Discord Bot"
description: "A Discord bot built to automate common tasks and bridge the community."
categories:
  - "Python"
  - "Discord"
tags:
  - "discord"
  - "bot"
  - "node"
demo_url: "https://discord.gg/tu-servidor"
difficulty: "beginner"
priority: 0
---

This bot was born out of the need to automate moderation tasks and enhance the community experience on Discord. Designed for a private server, it offered basic tools such as auto-welcome, reminders, and role management, aiming to streamline numerous daily actions.

### Project Story

1. **Origin of the Idea**
   While managing a server with dozens of users, the need arose to simplify repetitive tasks: assigning roles, greeting new members, and creating personalized reminders.

2. **Expansion Toward Minecraft**
   After stabilizing the core Discord features, integration with a private Minecraft server was proposed, enabling in-game event notifications (e.g., game start, server downtime alerts) and coordinating activities across both platforms.

### Development Process

1. **Defining Features**

   - Automated moderation (kick/ban on prohibited words)
   - Reminder and scheduling system
   - Connection to a lightweight database for logs and settings

2. **Implementation with `discord.py`**

   - Setting up asynchronous events (`on_message`, `on_member_join`)
   - Using coroutines and promise-like patterns to chain calls without blocking the bot

3. **External API Integration**

   - Making HTTP requests to the Minecraft server’s API
   - Parsing JSON responses to extract player data and server status

4. **Persistent Synchronization**

   - Designing a simple SQLite schema to record reminders and events
   - Performing asynchronous read/write operations to avoid bottlenecks

5. **Deployment and Maintenance**

   - Configuring GitHub Actions for automated tests
   - Continuous deployment on Heroku with updates triggered by pushes to the main branch

### Usage

- `!help` – Displays all available commands.
- `!remindme [time] [message]` – Schedules a reminder that’s saved in the database and triggers after the specified interval.
- `!mcstatus` – Checks the Minecraft server status and shows the current player count.
- `!welcome on|off` – Enables or disables the welcome message for new members.

### Learnings and Challenges

- **Understanding Promises and Asynchronous Programming**
  Mastering `async/await` chains and handling exceptions in callbacks without blocking the main thread.
- **API Handling**
  Designing lightweight HTTP clients, processing responses, and transforming data to enrich Discord messages.
- **Environment Synchronization**
  Aligning the local development cycle with cloud deployment, ensuring environment variables and credentials remain up to date.
- **Multi-Platform Coordination**
  Overcoming communication challenges between Discord and Minecraft, such as latency and differing message formats.
