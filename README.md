# **Task Manager Application (Monorepo)**

## 📚 **Table of Contents**

- [Overview](#overview)
- [Key Features](#key-features)
  - [Backend (NestJS + GraphQL)](#backend-nestjs--graphql)
  - [Frontend (React + Vite)](#frontend-react--vite)
- [Technology Stack](#technology-stack)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Database](#database)
- [How to Run the Project in dev mode](#how-to-run-the-project-in-dev-mode)
- [How to Run the Project in preview mode](#how-to-run-the-project-in-preview-mode)
- [Planned Improvements](#planned-improvements)
  - [Backend Improvements](#backend-improvements)
  - [Frontend Improvements](#frontend-improvements)
- [Conclusion](#conclusion)

---

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
  - **Token rotation** with refresh token support
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

---

## **How to Run the Project in dev mode**

### **1. Clone the Repository**

```bash
git clone https://github.com/sezardino/task-manager
cd task-manager
```

### **2. Add needed environment variables**

#### For frontend

In `/apps/fe`, add a `.env` file with the following content:

```bash
VITE_BACKEND_URL=http://localhost:8001
```

#### For backend

In `/apps/be`, add a `.env` file with the following content:

```bash
PORT=8001

DATABASE_URL=mongodb+srv://e7097504:0EqcPbCFykg42Z0W@cluster0.7sh6f.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0

ACCESS_TOKEN_SECRET=TuftmsdI2ys85w6szQDEDp2Eq9ef9CZ8
ACCESS_TOKEN_EXPIRES_IN=15m

REFRESH_TOKEN_SECRET=tFNtNsna9nJcqPca5Sz4tZtxEomnAQaI
REFRESH_TOKEN_EXPIRES_IN=7d

ORGANIZATION_INVITE_TOKEN_SECRET=tFNtNsna9nJcqPhre5Sz4tZtxEomnAQaI
```

### **3. Install Dependencies (Using npm)**

```bash
npm install
```

### **4. Run Prisma Migrations**

```bash
cd ./apps/be
npx prisma db push
```

### **5. Start Frontend and Backend**

```bash
npm run dev
```

### **6. Open browser on http://localhost:3000**

---

## **How to Run the Project in preview mode**

Repeat the same steps as above, but use `npm run preview` to start the project in **preview** mode.

---

## **Planned Improvements**

The following features and enhancements are **yet to be implemented**:

### **Backend Improvements**

- **Enhanced Authorization Guards**
  - Restrict **organization creation** to **OWNERS** only.
  - Ensure only **project members** can interact with project resources (tasks, updates, etc.).
  - Add fine-grained access control for different roles across all resolvers.

### **Frontend Improvements**

- **Type Safety**

  - Improve and **clean up type definitions** across the codebase.
  - Ensure all GraphQL responses and API layers use **strict TypeScript types**.

- **Route Guards**

  - Restrict **authenticated users** from accessing login or registration pages.
  - Add **custom 404 pages** for undefined routes.

- **User Invitations**
  - Implement invitation handling for **logged-in users**:
    - Accept and manage invitations for projects and organizations.
    - Provide UI for users to view pending invites and accept/reject them.

---

## **Conclusion**

This project is a **monorepo** that integrates a **NestJS + GraphQL** backend with a **React + Vite** frontend, leveraging **modern technologies** and **best practices** for scalable and maintainable task management.

Further improvements are planned to enhance **security**, **user experience**, and **developer ergonomics**.
