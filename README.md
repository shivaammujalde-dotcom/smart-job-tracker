# Smart Job Tracker

Smart Job Tracker is a full-stack job application tracking app.
The backend is built with Express and MongoDB, and the frontend is built with React + Vite.

## Features

- User authentication with JWT
- Add, update, delete job applications
- Track status (Applied, Interview, Offer, Rejected)
- Dashboard APIs for summary metrics
- Docker support for backend deployment

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- React
- Vite
- Docker

## Project Structure

```text
smart-job-tracker/
|-- client/
|-- public/
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   `-- server.js
|-- src/
|-- Dockerfile
|-- .dockerignore
|-- package.json
`-- README.md
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

- Create `server/.env`
- Add required values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start backend:

```bash
npm run dev
```

4. (Optional) Start frontend (if used separately):

```bash
npm run client
```

## Production Start

```bash
npm start
```

## Docker

Build image:

```bash
docker build -t smart-job-tracker .
```

Run container:

```bash
docker run --env-file server/.env -p 5000:5000 smart-job-tracker
```

## Render Deployment (Docker)

1. Push code to GitHub.
2. In Render, create a new Web Service.
3. Select repository and choose `Docker` runtime.
4. Keep Dockerfile path as `Dockerfile`.
5. Add environment variables (`MONGO_URI`, `JWT_SECRET`, etc.).
6. Deploy.

## API Base URL

- Local: `http://localhost:5000`
- Health route: `GET /`

## Scripts

- `npm run dev` - run backend with nodemon
- `npm start` - run backend with node
- `npm run client` - start Vite dev server
- `npm run build` - build frontend
- `npm run lint` - run ESLint

## License

ISC
