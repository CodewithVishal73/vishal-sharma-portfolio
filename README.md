# Vishal Sharma — Full-Stack MERN Portfolio

A production-grade, fully responsive personal portfolio website engineered with the **MERN Stack** (React.js frontend, Node.js + Express.js backend REST API, and MongoDB Atlas database with Mongoose ODM). Designed as a living CV with real end-to-end database connectivity and server-side document delivery, the system models a full request path: **Browser → React → Express API → MongoDB Atlas**

![Portfolio Preview](client/public/og-image.png)

---

## 1. Live Deployments

| Component | Platform | Live URL | Status & Purpose |
|---|---|---|---|
| **Frontend Application** | Netlify | [https://vishalsharma1.netlify.app/](https://vishalsharma1.netlify.app/) | Production React SPA with dark/light theme, interactive pipeline UI, responsive layouts |
| **Backend REST API** | Render | [https://vishal-sharma-portfolio.onrender.com](https://vishal-sharma-portfolio.onrender.com) | Express.js + Node.js API with security middleware and MongoDB Atlas connection |
| **API Health Check** | Render | [https://vishal-sharma-portfolio.onrender.com/api/health](https://vishal-sharma-portfolio.onrender.com/api/health) | Live health check returning `{ ok: true, status: "up", db: "connected" }` |


## 2. Tech Stack & Version Specifications

| Technology | Version | Role in Architecture & Rationale |
|---|---|---|
| **Node.js** | `>=20.0.0` (LTS) | Server runtime supporting native ES Modules, modern Fetch API, and secure crypto primitives. |
| **React** | `^18.3.1` | Client UI library utilizing component-driven architecture, hooks, and Concurrent Mode. |
| **Vite** | `^5.4.9` | Ultra-fast client build tool providing optimized ES module development and production bundling. |
| **React Router DOM** | `^6.27.0` | Client-side routing for Single Page Application navigation (`/`, `/projects/:slug`, `/404`). |
| **Framer Motion** | `^11.11.9` | Declarative animation engine configured with `prefers-reduced-motion` compliance. |
| **Express.js** | `^4.21.1` | Minimalist HTTP web framework for REST API endpoints, routing, and defensive middleware. |
| **Mongoose** | `^8.7.1` | Object Data Modeling (ODM) for MongoDB schema validation, typed models, and sanitizeFilter queries. |
| **MongoDB Atlas** | `v7.0+` (M0 Free Tier) | Managed cloud document database providing indexed collection persistence for contact inquiries. |
| **Helmet** | `^8.0.0` | HTTP response header security middleware setting defensive headers (nosniff, frameguard, etc.). |
| **Zod** | `^3.23.8` | Strict TypeScript-first schema declaration and runtime input validation / data sanitization. |
| **Express Rate Limit** | `^7.4.1` | Defensive IP-based rate limiting on sensitive submission endpoints to mitigate spam and DoS. |
| **PDFKit** | `^0.15.0` | Server-side programmatic PDF generation engine compiling verified CV data to binary stream. |
| **Docx** | `^9.0.0` | Server-side programmatic Word (.docx) generation library producing compliant OpenXML documents. |
| **Netlify** | Platform | Static web hosting provider configured for SPA rewrites (`netlify.toml`) and security headers. |
| **Render** | Platform | Containerized cloud hosting platform running the Express Node.js background web service. |

---


## 3. Local Development & Setup Guide

### Prerequisites
- **Node.js:** `v20.0.0` or higher (verified with `node -v`)
- **npm:** `v10.0.0` or higher
- **MongoDB:** Local MongoDB instance OR MongoDB Atlas cluster connection string

### Step 1: Clone the Repository
```bash
git clone https://github.com/CodewithVishal73/vishal-sharma-portfolio.git
cd vishal-sharma-portfolio
```

### Step 2: Configure Environment Variables
Create `.env` files from their respective `.env.example` templates:

```bash
# In the repository root:
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Ensure `server/.env` contains your MongoDB URI:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
CLIENT_ORIGINS=http://localhost:5173
```

Ensure `client/.env` points to the local backend:
```env
VITE_API_URL=http://localhost:5000
VITE_SITE_URL=http://localhost:5173
```

### Step 3: Install Dependencies
```bash
# Install server dependencies
cd server
npm ci

# Install client dependencies
cd ../client
npm ci
cd ..
```

### Step 4: Start Backend and Frontend
In terminal 1 (Server):
```bash
cd server
npm start
# Output: [server] Server running on 0.0.0.0:5000 (development)
```

In terminal 2 (Client):
```bash
cd client
npm run dev
# Output: Local: http://localhost:5173/
```

### Step 5: Verify Local Operations
1. **Health Check:** Open `http://localhost:5000/api/health` in your browser. Verify `{ ok: true, status: "up", db: "connected" }`.
2. **Frontend UI:** Open `http://localhost:5173` in your browser.
3. **Contact Form:** Scroll to Contact section, fill out the form, and submit. Verify success toast and MongoDB persistence.
4. **CV Downloads:** Click "PDF" or "DOCX" to verify file download via Express backend.


## 4. Author Information

- **Name:** Vishal Sharma
- **GitHub:** [https://github.com/CodewithVishal73](https://github.com/CodewithVishal73)
- **LinkedIn:** [https://linkedin.com/in/vishalsh1](https://linkedin.com/in/vishalsh1)
- **LeetCode:** [https://leetcode.com/u/Vishal_cd/](https://leetcode.com/u/Vishal_cd/)
- **Email:** vishal.sharma.tech1@gmail.com
