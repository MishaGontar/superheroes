# Superhero Web Application

## Overview

This project is a web application designed for managing a superhero database. It allows users to create, edit, view, and
delete superhero profiles. Each profile includes detailed information and associated images.

## Features

- **CRUD Operations**: Create, read, update, and delete superhero entries.
- **Image Management**: Add or remove images for each superhero.
- **Pagination**: Display a list of superheroes, 5 items per page, showing one image and nickname.
- **Detailed View**: View all details and images of a selected superhero.

## Technologies Used

### Backend

- **Node.js** with **Nest.js**
- **Postgresql** for database management
- **Prisma** as the ORM

### Frontend

- **React** for building the user interface
- **React Router** for navigation
- **Axios** for HTTP requests

### Additional Tools

- **Multer** for image uploads

## Installation and Setup

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm**
- **Postgresql** database

### Environment Configuration

Ensure that you have created `.env` files for both the frontend and backend to properly configure the environment
variables.

### .env for Frontend

Create a `.env` file in the `front` directory with the following content:

| Name            | Description                                                     | Example Value             |
|-----------------|-----------------------------------------------------------------|---------------------------|
| `VITE_BACK_URL` | The base URL for API requests from the frontend to the backend. | `"http://localhost:3000"` |

### .env for Backend

Create a `.env` file in the `backend` directory with the following content:

| Name           | Description                                    | Example Value                                                   |
|----------------|------------------------------------------------|-----------------------------------------------------------------|
| `DATABASE_URL` | Connection string for the PostgreSQL database. | `"postgresql://<username>:<password>@<host>:<port>/<database>"` |

After configuring your `.env` file, run the following command to apply migrations:

```bash
npm run database:migrate
```

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/superhero-database.git
   cd superhero-database/backend
2. Install dependencies (it will install for front and backend):
   ```bash
   npm install
3. Run Backend:
   ```bash
   npm run start:back
4. Run Frontend:
   ```bash
   npm run start:front 
   ```
   