# 🐰 Bun Elysia TanStack Monorepo (Todo Application)

This is a modern, full-stack monorepo designed for high performance and end-to-end type safety. It uses **Bun** for the runtime and package manager, **Elysia.js** for the API, and **React/Vite** for the frontend, with a strong focus on sharing types and schemas.

## 🌟 Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Monorepo** | **Bun** Workspaces | Fast runtime, package management, and script execution. |
| **Backend** | **Elysia.js** (TypeScript) | High-performance, declarative, and type-safe server framework. |
| **Database** | **PostgreSQL** (Docker) | Reliable relational data storage. |
| **ORM** | **Drizzle ORM** & `drizzle-zod` | Type-safe ORM with schema derivation. |
| **Validation** | **Zod** | Run-time schema validation (shared between server and client). |
| **Frontend** | **React** (Vite) | Client-side UI framework. |
| **Future Plans** | **TanStack Router, Query, Form** | Advanced state management and routing. |
| **Utility** | **Redis** (Docker) | Future use for caching and session management. |

-----

## 🚀 Getting Started

### Prerequisites

You need the following installed locally:

* **Bun** (for the runtime and package manager)
* **Docker** and **Docker Compose** (for the database and cache services)

### 1\. Environment Variables

Create the following files and populate them with the credentials below.

#### Project Root: `.env` (Used by Docker Compose)

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=todo
POSTGRES_PORT=5432
REDIS_PORT=6379
```

#### Server Directory: `server/.env`

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/todo
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
```

#### Client Directory: `client/.env`

```env
VITE_NODE_ENV=development
VITE_API_URL=http://localhost:4000
```

### 2\. Installation and Setup

Install all dependencies across the monorepo workspaces:

```bash
bun install
```

### 3\. Start Database Services

Start the PostgreSQL and Redis containers using the central Docker Compose file:

```bash
bun db:up
# Use 'bun db:up-full' to run in the foreground and see logs
```

### 4\. Database Initialization (Drizzle)

Push the defined Drizzle schema to the running PostgreSQL database:

```bash
# Push the schema to the database (good for rapid dev cycles)
bun run db:push --filter @todo/server
```

### 5\. Start Development

This single command starts both the **Elysia server** and the **Vite client** concurrently.

```bash
bun dev
```

| Service | Address |
| :--- | :--- |
| **Backend API (Elysia)** | `http://localhost:4000` |
| **OpenAPI Docs** | `http://localhost:4000/openapi` |
| **Frontend (Vite)** | `http://localhost:5173` |

-----

## ⚙️ Available Scripts

All scripts are run from the project root directory.

### Global Scripts

| Command | Action |
| :--- | :--- |
| `bun install` | Install all dependencies across the monorepo. |
| `bun dev` | Concurrently start the server and client in watch mode. |
| `bun db:up` | Start the PostgreSQL and Redis containers in the background. |
| `bun db:down` | Stop and remove the Docker containers. |
| `bun db:up-full` | Start containers in the foreground with logging. |

### Backend Scripts (Use `bun run [script] --filter @todo/server`)

| Command | Action |
| :--- | :--- |
| `bun run dev --filter @todo/server` | Start the Elysia server in isolation with Bun's hot-reloading. |
| `bun run db:push --filter @todo/server` | Push schema changes to the running database. |
| `bun run db:generate --filter @todo/server` | Generate a new Drizzle migration file. |
| `bun run db:migrate --filter @todo/server` | Run pending migrations against the database. |
| `bun run db:studio --filter @todo/server` | Open the Drizzle Studio UI to inspect data. |

### Frontend Scripts (Use `bun run [script] --filter @todo/client`)

| Command | Action |
| :--- | :--- |
| `bun run build --filter @todo/client` | Builds the client for production. |
| `bun run preview --filter @todo/client` | Serves the production build locally. |
