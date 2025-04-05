# Task Management Application

This repository contains a task management application developed as a technical
test. The application allows users to manage tasks, view analytics, and organize
their work efficiently.

## 🚀 Features

### Core Features

- **Task Management Table**

    - Create, edit, delete, and list tasks
    - Each task has a title, description, and status (To Do, In Progress,
      Completed)

- **Analytics Dashboard**

    - View statistics (total tasks, completed vs. pending)
    - Visual data representation through charts

- **Task Prioritization**

    - Assign priority levels (high, medium, low) to tasks

- **Task Duplication**

    - Clone existing tasks with all their properties
    - Subtasks are also duplicated if present

- **Favorites**
    - Mark tasks as favorites for quick access

## 🛠️ Technologies Used

- **Next.js** - React framework for server-side rendering and static site
  generation
- **TypeScript** - For type safety and better developer experience
- **Tailwind CSS** - For styling components
- **Prisma** - ORM for database operations
- **shadcn/ui** - Component library for consistent UI
- **Auth.js** - Authentication solution

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL database

## 🚀 Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/brunowzz/next-test.git
cd next-test
```

2. Install dependencies:

```bash
pnpm i
```

3. Set up environment variables: Create a `.env` file in the root directory with
   the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/taskmanagement"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:

```bash
pnpm prisma migrate dev --name init
```

5. Start the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see
   the application.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── dashboard/
│   │   ├── tasks/
│   │   └── profile/
│   ├── (public)/
│   │   ├── login/
│   │   └── register/
│   └── api/
├── components/
│   ├── ui/
│   ├── tasks/
│   └── dashboard/
├── lib/
│   ├── auth/
│   └── utils/
├── database/
│   └── prisma.service.ts
└── types/
```

## 🚢 Deployment

This application is deployed on Vercel. You can access the live version at:

[https://task-management-app.vercel.app](https://task-management-app.vercel.app)

## 🔒 Authentication

The application uses NextAuth.js for authentication. Users can:

- Register with email and password
- Log in with existing credentials
- Access protected routes after authentication

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for
details.

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/brunowzz)

---

This project was created as part of a technical test for a part-time position.
