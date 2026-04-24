# MoM Plan Management System

This repository contains the MoM Plan Management System, consisting of a PostgreSQL database, a Node.js backend, and a Next.js frontend. The easiest way to run the entire application locally is using Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Environment Setup

The `docker-compose.yml` file is already configured with default environment variables. However, if you need to override them, you can create a `.env` file in the root directory:

```env
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=mom_website
JWT_SECRET=thisisoursecretcodefortoken
```

## Running the Application

To build and start all the services (Database, Backend, and Frontend), run the following command in the root directory:

```bash
docker-compose up -d --build
```
*The `-d` flag runs the containers in the background, and `--build` forces a rebuild of the images if you made code changes.*

Once the containers are up and running, you can access:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

## Database Setup & Initialization

After the containers are running for the first time, you need to set up the database schema and populate it with initial data. Run the following commands to execute them inside the running backend container (`mom_backend`):

### 1. Create Database
*(Note: The database is usually created automatically by the Postgres container on first run via the POSTGRES_DB env var. If you need to manually trigger the creation script from the backend, run this.)*
```bash
docker exec -it mom_backend npm run db:create
```

### 2. Run Migrations
To create the necessary tables in your database schema, run the Sequelize migrations:
```bash
docker exec -it mom_backend npm run db:migrate
```

### 3. Run Seeders
To populate the database with initial required data (e.g., default users, roles), run the seeders:
```bash
docker exec -it mom_backend npm run db:seed:all
```

## Stopping the Application (Making Down)

To safely stop the running containers without destroying them:

```bash
docker-compose stop
```

To completely stop and **remove** the containers and networks:

```bash
docker-compose down
```

**Important Note on Database Reset:**
If you want to completely wipe the database and start fresh, you need to remove the associated Docker volume. Add the `-v` flag to the down command:
```bash
docker-compose down -v
```

## Viewing Logs

If you need to debug or see what is happening, you can view the logs:

To view logs for all services:
```bash
docker-compose logs -f
```

To view logs for a specific service (e.g., `backend` or `frontend`):
```bash
docker-compose logs -f backend
```
