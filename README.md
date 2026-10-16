# Personal Library

A full-stack web application for managing your personal book collection and tracking your reading progress.

**[🚀 Live Demo](https://personal-library-three.vercel.app/)**

Built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Features

- Add books with a title, author, and optional ISBN
- Track reading status: Want to Read, Currently Reading, and Read
- Search books by title or author
- Filter books by reading status
- Update reading status and delete books
- Persistent storage with PostgreSQL
- Form validation on the client and server
- Loading skeletons and accessible UI controls

## Tech Stack

**Frontend**

- React
- TypeScript
- Vite
- Sass
- Zod

**Backend**

- Node.js
- Express
- TypeScript
- PostgreSQL
- `pg` for database access
- Zod for request validation

**Testing and Development Tools**

- Vitest and Supertest for backend testing
- ESLint
- Docker Compose
- GitHub Actions for continuous integration

## Project Structure

```text
personal-library/
├── .github/
│   └── workflows/
│       └── ci.yml
├── client/             # React frontend
├── server/             # Express REST API
├── database/
│   └── init.sql        # Database initialization script
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js and npm
- Docker with Docker Compose
- Git

## Local Setup

### 1. Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

PostgreSQL is exposed on port `5433` on your host. The database initialization script creates the `books` table when PostgreSQL initializes a fresh data volume.

### 2. Configure environment variables

Create local environment files from the examples.

For the backend:

```bash
cd server
cp .env.example .env
```

For the frontend, open a separate terminal at the project root:

```bash
cd client
cp .env.example .env
```

Review the values in each .env file if your local ports or database credentials differ. The backend uses DATABASE_URL for normal development and TEST_DATABASE_URL when running tests.

### 3. Install dependencies

In the `server/` directory:

```bash
npm install
```

In the `client/` directory:

```bash
npm install
```

### 4. Start the backend

From `server/`:

```bash
npm run dev
```

The API runs at `http://localhost:3000` by default.

Health check: `http://localhost:3000/api/health`

### 5. Start the frontend

From `client/`, in another terminal:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Testing

The backend uses Vitest for automated tests and Supertest for HTTP integration tests. Tests cover request validation, CRUD endpoint behavior, database persistence, and the health endpoint.

### 1. Create the test database

Start the local PostgreSQL container first. Create the test database once:

```bash
docker compose exec db psql -U library_user -d postgres \
  -c "CREATE DATABASE personal_library_test OWNER library_user;"
```

Initialize its schema:

```bash
docker compose exec -T db psql -U library_user -d personal_library_test \
  < database/init.sql
```

Ensure `server/.env` contains the appropriate test connection string for your local database:

```dotenv
TEST_DATABASE_URL=postgresql://library_user:library_dev_password@localhost:5433/personal_library_test
```

Use the credentials and port configured in your own Docker Compose setup.

### 2. Run backend tests

From `server/`:

```bash
npm test
```

The test command sets `NODE_ENV=test`, so the backend uses `TEST_DATABASE_URL` rather than the normal development database.

**Important:** Tests clear and modify data in the test database. Never point `TEST_DATABASE_URL` at your production database.

## Continuous Integration

GitHub Actions automatically runs the CI workflow on pushes to `master` and pull requests targeting `master`.

The workflow has two independent jobs:

**Frontend checks**

- Install dependencies with `npm ci`
- Run ESLint
- Run the TypeScript checks and Vite production build

**Backend checks**

- Install dependencies with `npm ci`
- Compile TypeScript
- Start a temporary PostgreSQL 17 service
- Initialize the test schema
- Run the automated backend tests

CI uses a dedicated temporary database and does not connect to the production database.

## API Endpoints

| Method | Endpoint         | Description                         |
| ------ | ---------------- | ----------------------------------- |
| GET    | `/api/books`     | Retrieve all books                  |
| POST   | `/api/books`     | Add a book                          |
| PATCH  | `/api/books/:id` | Update a book's reading status      |
| DELETE | `/api/books/:id` | Delete a book                       |
| GET    | `/api/health`    | Check API and database connectivity |

## Production Builds

Build the frontend:

```bash
cd client
npm run build
```

Run frontend linting:

```bash
cd client
npm run lint
```

Build the backend:

```bash
cd server
npm run build
```
