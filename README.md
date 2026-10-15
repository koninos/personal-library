# Personal Library

A full-stack personal book library built with React, TypeScript, Express, and PostgreSQL. Manage your books, track reading progress, and quickly find books using search and status filters.

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

**Development Tools**

- Docker Compose
- ESLint

## Project Structure

```text
personal-library/
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

Review the values in each `.env` file if your local ports or database credentials differ.

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

## API Endpoints

| Method | Endpoint                | Description                         |
| ------ | ----------------------- | ----------------------------------- |
| GET    | `/api/books`            | Retrieve all books                  |
| POST   | `/api/books`            | Add a book                          |
| PATCH  | `/api/books/:id/status` | Update a book's reading status      |
| DELETE | `/api/books/:id`        | Delete a book                       |
| GET    | `/api/health`           | Check API and database connectivity |

## Production Builds

Build the frontend:

```bash
cd client
npm run build
```

Build the backend:

```bash
cd server
npm run build
```
