# Secure-URL-Shortener

A full-stack URL shortener application built with Node.js, Express, React, and PostgreSQL.

## Clone Repository

```
git clone https://github.com/RutikKulkarni/Secure-URL-Shortener.git
cd Secure-URL-Shortener
```

## Setup with Docker

### Prerequisites

- Docker and Docker Compose
- Git

### Run Application

```
docker-compose up --build
```

### Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8082

## Setup without Docker

### Prerequisites

- Node.js
- PostgreSQL
- Git

### Backend Setup

```
cd backend
npm install

# Copy .env.example to .env and update password as needed
cp .env.example .env

# Start backend
npm run dev
```

### Frontend Setup

```
cd frontend
npm install

# Copy .env.example to .env and make changes as needed
cp .env.example .env

# Start frontend
npm start
```

### Database Setup

```sql
CREATE DATABASE urlshortener;

CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    clicks INTEGER DEFAULT 0
);
```

## API Endpoints

- **POST** `/shorten` - Create a short URL
- **GET** `/:code` - Redirect to original URL
- **GET** `/analytics/:code` - Get URL analytics
