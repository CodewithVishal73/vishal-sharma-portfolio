# Vishal Sharma — MERN Portfolio

## Description
A full-stack personal developer portfolio built for Vishal Sharma as an individual MERN assignment. The application represents the life of a single request through the full stack (Browser → React → Express → MongoDB), featuring a dynamic system-map, verified skill cards, interactive project showcases, timeline, and an end-to-end connected contact route.

## Live links
- **Client (Frontend):** *TBD (Vercel deployment)*
- **Server (API):** *TBD (Render deployment)*

## Tech stack
- **Frontend:** React 18, React Router, Framer Motion, React Icons, CSS Modules, Vite
- **Backend:** Node.js, Express, Mongoose, Zod, Helmet, CORS, Express Rate Limit
- **Database:** MongoDB (Atlas M0)

## Local setup

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)

### Client
```bash
cd client
npm install
npm run dev
```

### Server
```bash
cd server
npm install
npm run dev
```

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check and latency ping |
| `POST` | `/api/contact` | Submit contact message to MongoDB |
| `GET` | `/api/cv/pdf` | Download curriculum vitae (PDF) |
| `GET` | `/api/cv/docx` | Download curriculum vitae (DOCX) |

## Deployment
- **Frontend:** Vercel SPA deployment
- **Backend:** Render Web Service
- **Database:** MongoDB Atlas

## Environment variables

### Client (`client/.env`)
- `VITE_API_URL`: Backend API base URL (e.g. `http://localhost:5000` or production Render URL)

### Server (`server/.env`)
- `PORT`: Port to listen on (e.g. `5000`)
- `NODE_ENV`: Application environment (`development` / `production`)
- `MONGODB_URI`: MongoDB connection string
- `CLIENT_ORIGINS`: Allowed CORS origins (comma-separated)
- `SMTP_HOST`: (Optional) SMTP host for email notifications
- `SMTP_PORT`: (Optional) SMTP port
- `SMTP_USER`: (Optional) SMTP username
- `SMTP_PASS`: (Optional) SMTP password
- `NOTIFY_TO`: (Optional) Target email for notifications
