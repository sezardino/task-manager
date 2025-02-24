# **Task Manager Application (Monorepo)**

## **Overview**

**Task Manager Application** is a project management tool that helps users organize tasks, manage teams, and track progress.
It is structured as a **monorepo** containing **two separate applications**:

- **Backend (NestJS + GraphQL)**
- **Frontend (React + Vite)**

The system supports **multi-organization** management, task tracking, and **role-based access control** (RBAC).

---

## **Key Features**

### **Backend (NestJS + GraphQL)**

- **Authentication & Authorization**

  - **JWT-based** authentication
  - **token rotation** implemented refresh token functionality
  - **Role-based access control** (e.g., **OWNER, ADMIN, MEMBER**)

- **Organization Management**

  - Create and manage multiple organizations
  - Invite users with specific roles

- **Project Management**

  - Create and manage projects within an organization
  - Assign roles within projects (**OWNER, MANAGER, MEMBER**)

- **Task Management**

  - Create, edit, and delete tasks
  - Assign tasks to users
  - Track task status (**NOT_STARTED, IN_PROGRESS, IN_REVIEW, COMPLETED**)
  - Set and manage deadlines

- **GraphQL API**
  - Fully-featured **GraphQL** API
  - Input validation and error handling using **class-validator**
  - Database integration via **Prisma ORM**

---

### **Frontend (React + Vite)**

- **User-friendly Task Interface**

  - View, filter, and sort task lists
  - Update task status in real-time

- **Task Creation & Editing**

  - Dynamic forms with validation using **React Hook Form + Zod**
  - Real-time error display and user feedback

- **State Management & API Communication**

  - **React Query** for data fetching and caching

- **Modern UI**
  - **TailwindCSS** for styling
  - **Shadcnui** for accessible and customizable components
  - **Lucide Icons** for modern, lightweight icons

---

## **Technology Stack**

### **Backend**

- **NestJS** — Modular and scalable backend framework
- **GraphQL + Apollo Server** — API for flexible data queries
- **Prisma ORM** — Database management (compatible with **MongoDB**)
- **JWT** — Secure authentication
- **Day.js** — Date and time handling

### **Frontend**

- **React 19 + Vite** — Fast and modern frontend development
- **React Hook Form + Zod** — Form handling and input validation
- **React Query** — State and API management
- **TailwindCSS** — Utility-first CSS framework
- **Shadcnui** — Advanced UI components

### **Database**

- **MongoDB** — NoSQL database for structured and unstructured data
- **Prisma ORM** — Type-safe and modern data layer

## **Conclusion**

This project is a **monorepo** that integrates a **NestJS + GraphQL** backend with a **React + Vite** frontend, leveraging **modern technologies** and **best practices** for scalable and maintainable task management.
