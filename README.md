# Smart Job Tracker

Production-ready MERN-style job tracker with JWT auth, protected routes, live dashboard stats, and modern responsive UI.

## What is included

- Register/login with token persistence
- Protected dashboard route
- Create, edit, delete job applications
- Search, status filter, sorting, pagination
- Dashboard stat cards from backend aggregate API
- Responsive polished interface for portfolio/demo use

## Tech stack

- React + Vite + Tailwind utility layer
- Express + MongoDB + Mongoose
- JWT authentication

## Setup

1. Install dependencies

```bash
npm install
```

2. Create `server/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

3. Optional frontend env (`.env` at project root)

```env
VITE_API_BASE_URL=http://localhost:5000
```

4. Run backend and frontend in two terminals

```bash
npm run dev:server
npm run client
```

## Scripts

- `npm run client` - Vite frontend
- `npm run dev:server` - nodemon backend
- `npm run build` - production frontend build
- `npm run lint` - ESLint

## API routes used by frontend

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/dashboard`
- `GET /api/jobs`
- `POST /api/jobs`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`
