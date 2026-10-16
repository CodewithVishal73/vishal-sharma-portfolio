# PROJECT_CONTEXT.md — Vishal Sharma · MERN Portfolio

Authoritative for: requirements, profile facts, architecture, API, deployment, quality gates.
Companion file: `.context/DESIGN_AND_MOTION.md` (visual system, motion, components).
If the two files ever conflict, the **faculty requirements in section 2 win**, then this file, then the design file.

Status date: 16 Oct 2026. Deadline: **Tue 20 Oct 2026** (plan to submit Mon 19 Oct).

---

## 1. Overview

- **What:** individual MERN assignment (10 marks): a deployed, fully functional personal portfolio. Submission = public GitHub repo link in Google Classroom.
- **Audience:** (1) the faculty marking against the rubric, (2) recruiters and interviewers who give it ~30 seconds.
- **Goal:** full marks on every rubric line AND a portfolio that does not look like a template.
- **Design thesis:** visual explanation over text. A visitor should grasp who Vishal is, what he builds and his stack from the interface itself.
- **Base stack (non-negotiable):** React + React Router (client) · Node + Express REST API (server) · MongoDB + Mongoose (database). An earlier plan to defer the backend is **cancelled**. The backend is required and is part of the visual story.

### Success criteria
1. Every checklist row in section 2 is satisfied and demonstrable on the live URL.
2. Contact form works end to end on production (browser → Express → MongoDB document exists).
3. CV downloads as PDF and DOCX through Express routes, with correct files and filenames.
4. Both services deployed and publicly reachable. README has live links.
5. No secrets in the repo or its git history.
6. Lighthouse (mobile): Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95.

---

## 2. Faculty requirements (source of truth) and implementation map

### 2.1 Sections
| # | Faculty requirement | Implementation |
|---|---|---|
| 1 | **Hero**: animated intro with name, role, designation; typewriter OR scroll entrance; CTA Download CV; professional background/gradient | `Hero` section: name, designation, typewriter (rotating phrases), `DownloadCvButton` (PDF + DOCX), animated system-map background + gradient |
| 2 | **About**: short bio, profile photo, location, current status; animate entry on scroll | `About`: bio (≤ 60 words), `PhotoFrame` (placeholder until real photo), location, status chips, scroll reveal |
| 3 | **Skills**: animated skill bars or radial charts; grouped Frontend / Backend / Tools & Technologies; hover effects and tooltips showing proficiency level | `Skills`: three category panels of `TechCard`s with logo + name + animated bar; tooltip shows level label |
| 4 | **Projects**: ≥ 3 interactive cards; name, description, tech badges; GitHub link + live demo link on each; filter/sort by tech (optional, adds marks) | `Projects`: `ProjectCard` ×3+, tech filter chips, sort; detail route `/projects/:slug` |
| 5 | **CV download**: PDF and Word (.docx), **served via Express route** | `GET /api/cv/pdf`, `GET /api/cv/docx` + `DownloadCvButton` |
| 6 | **Education & Experience**: vertical animated timeline; degrees, institutions, years; internships/work if applicable | `Timeline` (git-graph style, vertical, scroll-drawn) |
| 7 | **Certifications & Achievements**: certificates (Coursera, NPTEL, LinkedIn Learning, etc.), image or verified link; hackathons/awards | `Certifications` cards with image or verify link; achievements list. Only real entries. |
| 8 | **Contact form (backend connected)**: Name, Email, Message → Express route → MongoDB via Mongoose; optional Nodemailer | `Contact` → `POST /api/contact` → `Message` model. Optional email notification. |

### 2.2 Technical checklist (all required for full marks)
| Requirement | Plan |
|---|---|
| React + React Router SPA | Vite + React 18, `react-router-dom` v6/7: `/`, `/projects/:slug`, `*` (404) |
| Node + Express REST API | `/server`, ESM, routes in section 5 |
| MongoDB + Mongoose stores contact submissions | Atlas M0, `Message` model |
| Animations (Framer Motion/GSAP/AOS/CSS) | `framer-motion` + CSS; no other animation library |
| Fully responsive: mobile, tablet, desktop | Mobile-first; verified at 360, 390, 768, 1024, 1440, 1920 |
| Dark / light toggle | `[data-theme]` tokens, persisted, respects `prefers-color-scheme` |
| CV in PDF and DOCX from backend | Files in `server/assets/cv/`, served by Express |
| Deployed: frontend Vercel/Netlify, backend Render/Railway | Vercel (client) + Render (server) + Atlas |
| Env vars for secrets; `.env` not pushed | `.env.example` committed, `.env` ignored, history scanned |

### 2.3 Rubric (what gets marked)
UI design and responsiveness · Animations and interactivity · MERN integration (contact form end to end) · CV download PDF+DOCX via backend · Projects and content quality (≥ 3, GitHub + live links, meaningful descriptions) · Deployment (both live) · Code quality and GitHub (organized folders, **meaningful commits**, README, `.env` not exposed).

### 2.4 Submission contents
`/client`, `/server`, `README.md` (description, live link, local setup), dependencies in both `package.json`, `.gitignore` excluding `node_modules` and `.env`. Exposed Mongo URIs, keys or passwords cost marks.

---

## 3. Verified profile

**Verified (stated by Vishal):**
- Name: Vishal Sharma
- Education: B.Tech Computer Science and Engineering, JK Lakshmipat University, Jaipur. Expected graduation 2028.
- Status: current student
- Languages: Java, C++, JavaScript, Python, SQL
- Frameworks/APIs: Spring Boot, REST APIs, React
- Databases: PostgreSQL, MySQL, MongoDB
- Tools: Git, GitHub, Maven, Postman
- Projects: **SellerLensIQ**, **Clinic Management System**
- Experience areas: authentication, database integration, API development, AI-assisted application development
- Interests: backend and API design, system architecture, practical AI integration

**Supported by this repository itself (state it only because this project uses them):** Node.js, Express, Mongoose, Framer Motion, Vite.

**Needs confirmation from Vishal (never invent; mark `// CONFIRM` in data files and surface in the final report):**
- Third project (required): proposed = **this portfolio** (real MERN project, real repo, real live URL). Replace or add if he has another.
- GitHub repo URL and live demo URL for **each** project, plus his GitHub / LinkedIn URLs
- Real descriptions of SellerLensIQ and the clinic system: what they do, his role, stack actually used. Ask, do not guess.
- Enrollment start year (assumed 2024, unconfirmed), school/12th details if he wants them on the timeline
- Certificates and hackathons: names, platform, year, verify URL or image
- Location line (assumed "Jaipur, India"), bio wording, email shown publicly
- Proficiency level per skill (scale in `DESIGN_AND_MOTION.md` §6)
- Profile photo (arrives later; build the slot now)
- Whether he has an existing CV file. If not, generate from `server/scripts/cv.data.js` using only verified facts.

**Hard content rules**
- Do **not** mention any separate business, startup or company anywhere in the site, README, CV or data files.
- No invented metrics, awards, employers, users, percentages, links or testimonials. Empty is better than fake.
- Hero copy (approved earlier, editable in `profile.js`): designation **"Software Engineer"**, headline **"Engineering the Future of"** + rotating **AI Systems / Backend Infrastructure / Intelligent Platforms**, support line **"Building scalable software, reliable backend systems, and intelligent digital experiences."**, CTAs **View Projects** and **Download CV**.

---

## 4. Decisions and conflict resolutions

| ID | Decision | Why |
|---|---|---|
| D1 | Backend is real and required (Express + Mongoose) | Rubric lines "MERN integration", "CV via backend", "deployment of both" |
| D2 | **Skills use animated bars + proficiency tooltips**, with logos as the primary recognition device. Levels are qualitative labels chosen by Vishal; no percentages are ever displayed. | The faculty explicitly requires animated bars/radials and proficiency tooltips. A "no bars" design would lose marks. |
| D3 | Portfolio content (projects, skills, timeline, certs) lives in client data files, not in MongoDB | Render free tier cold-starts (~30–60 s). Page must render instantly. Only contact and CV need the server. |
| D4 | Client warms the API on load (`GET /api/health`, fire and forget) and forms/buttons show a "waking the server" state | Prevents the contact form failing on a cold backend during marking |
| D5 | Concept = **"The Request"**: the page is the lifecycle of one request through the stack (Browser → React → Express → MongoDB). See design file. | Distinctive, ties visuals to the assignment's stack, and the contact form becomes a live demo |
| D6 | Palette is new: bone paper / graphite-green, one accent "signal". No orange-on-black carry-over. | Fresh identity; earlier attempts looked generic |
| D7 | Single scrolling home + `/projects/:slug` detail + 404, all with React Router | Satisfies SPA + Router; keeps the cinematic scroll |
| D8 | Hero video from the earlier session is **optional** ambient layer (dark theme only) after the live system map exists | The map is code, theme-aware, interactive. Video is orange-tinted and may need re-tinting. |

---

## 5. Architecture

### 5.1 Repository
```
portfolio/
  .context/                 PROJECT_CONTEXT.md, DESIGN_AND_MOTION.md
  .gitignore                node_modules, .env*, !.env.example, dist, build, .DS_Store
  README.md
  client/
    index.html  vite.config.js  vercel.json  .env.example
    public/                 favicon, og-image, media/ (optional hero video), photo/ (later)
    src/
      main.jsx  App.jsx  routes.jsx
      styles/               tokens.css  base.css  motion.css
      data/                 profile.js skills.js projects.js timeline.js certifications.js
      lib/                  api.js  motion.js (shared variants/easings)  theme.js
      hooks/                useTypewriter useInView useReducedMotion usePing useTheme
      components/           (see design file §7)
      sections/             Hero About Skills Projects Timeline Certifications Contact
      pages/                Home.jsx  ProjectDetail.jsx  NotFound.jsx
  server/
    package.json  .env.example
    assets/cv/              Vishal_Sharma_CV.pdf  Vishal_Sharma_CV.docx
    scripts/                generate-cv.js  cv.data.js
    src/
      index.js              boot: env → db → listen
      app.js                express app (exported for tests)
      config/               env.js (validate, fail fast)  db.js
      models/               Message.js
      routes/               health.js contact.js cv.js
      middleware/           rateLimit.js validate.js errorHandler.js notFound.js
      utils/                mailer.js (optional)
```

### 5.2 API contract (JSON; all errors share one shape)
Success: `{ "ok": true, ... }` · Error: `{ "ok": false, "error": { "code": "VALIDATION_ERROR", "message": "…", "fields": { "email": "…" } } }`

| Method + path | Behaviour |
|---|---|
| `GET /api/health` | `200 { ok:true, status:"up", db:"connected"\|"disconnected", uptime, ts }`. Used for warm-up and the hero "ping" |
| `POST /api/contact` | Body `{ name, email, message, website? }`. `website` is a honeypot: if filled, return 201 without saving. Validate: name 2–80, email valid, message 10–2000, trim and strip control chars. Save `Message`. `201 { ok:true, id, createdAt }`. Invalid → 400 with `fields`. Rate limited → 429. |
| `GET /api/cv/pdf` | `res.download` with `Content-Type: application/pdf`, filename `Vishal_Sharma_CV.pdf`. 404 JSON if file missing |
| `GET /api/cv/docx` | Same, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `Vishal_Sharma_CV.docx` |
| any other `/api/*` | 404 JSON |

### 5.3 Mongoose `Message`
`name` String (req, 2–80) · `email` String (req, lowercase, validated) · `message` String (req, 10–2000) · `userAgent` String (optional, truncated) · `status` enum `new|read` default `new` · timestamps. Index on `createdAt` desc. Do not store raw IPs.

### 5.4 Security and robustness
`helmet`; CORS allowlist from `CLIENT_ORIGINS` (comma-separated; include the Vercel URL and `http://localhost:5173`); `express.json({ limit: "10kb" })`; `express-rate-limit` on `/api/contact` (e.g. 5 per 15 min per IP, with `trust proxy` set correctly for Render); central error handler never leaks stack traces in production; env validated at boot (missing `MONGODB_URI` → clear error and exit); Mongo `serverSelectionTimeoutMS: 8000`; graceful shutdown. Nodemailer (or Resend) notification is optional and **must never fail the request**: log and continue.

### 5.5 Environment variables
| File | Var | Notes |
|---|---|---|
| `server/.env` | `PORT` (5000), `NODE_ENV`, `MONGODB_URI`, `CLIENT_ORIGINS` | required |
| `server/.env` | `SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASS NOTIFY_TO` | optional |
| `client/.env` | `VITE_API_URL` | `http://localhost:5000` locally, Render URL in production |
Commit `.env.example` files with dummy values only.

### 5.6 CV
Final files must exist in `server/assets/cv/` and be committed (they ship with the server). If Vishal supplies a CV, use it. Otherwise `server/scripts/generate-cv.js` builds both formats from `cv.data.js` (`pdfkit` + `docx`, dev dependencies) using only verified facts. Both outputs must show identical content. Open both files and check text, fonts and one-page layout.

### 5.7 Deployment
1. **Atlas:** free M0 cluster, database user with a strong password, Network Access `0.0.0.0/0` (Render IPs change), copy the SRV URI into Render only.
2. **Render (Web Service):** root directory `server`, build `npm install`, start `npm start`, env vars from 5.5, health check path `/api/health`. Free instances sleep, see D4.
3. **Vercel:** root directory `client`, framework Vite, env `VITE_API_URL=https://<service>.onrender.com`, `client/vercel.json` rewrite `/(.*)` → `/index.html` so deep links such as `/projects/sellerlensiq` work. (Netlify alternative: `client/public/_redirects` with `/* /index.html 200`.)
4. After the first Vercel deploy, add its URL to `CLIENT_ORIGINS` on Render and redeploy.
5. Verify on production: health, contact submit (then check the document in Atlas), both CV downloads, deep link refresh, dark/light on mobile.
6. Before the first push and again before submission: `git log -p | grep -iE "mongodb(\+srv)?://|password|secret"` must show nothing real. If a secret was ever committed, rotate it, since deleting the file is not enough.

### 5.8 Git discipline (graded)
Conventional commits, small and frequent, at least one per feature: `feat(server): add contact route with validation`, `feat(client): skills grid with animated bars`, `fix(client): …`, `docs: README`, `chore: …`. Never one giant commit. Branch `main` only is acceptable.

---

## 6. Quality gates (run at the end of every prompt that changes UI or API)

- `npm run build` passes in client and server has no startup errors; lint clean if configured
- Screenshots at **1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 360×740**, in **both themes**; inspect them, do not assume
- No horizontal scroll at any size; no layout shift (CLS ≤ 0.05)
- Keyboard: tab order logical, visible focus on all interactive elements, tooltips reachable by focus
- Reduced-motion emulation: content fully visible and usable, no continuous motion
- Contrast ≥ 4.5:1 body text, ≥ 3:1 large text and UI parts, in both themes (measure)
- API checked with `curl`: valid, invalid, honeypot, oversize, rate-limit and CORS from a disallowed origin
- No console errors or warnings; no failed network requests
- Final: walk the section 2 tables and tick each row with evidence

## 7. Constraints for the builder
- Inspect before changing; never overwrite unrelated files; never reformat the whole repo.
- Add a dependency only if it earns its place; list each new one with a reason in the commit body. Allowed baseline: react, react-dom, react-router-dom, framer-motion, react-icons (or simple-icons), and on the server express, mongoose, cors, helmet, express-rate-limit, dotenv, zod (or express-validator), optional nodemailer.
- Do not fabricate personal data, links, certificates, metrics or photos.
- Stop and ask only for blockers listed in section 3. Otherwise make the best decision, record it in section 8, and keep going.

## 8. Decision log (append as you build)
- 2026-10-16 · D1–D8 above.