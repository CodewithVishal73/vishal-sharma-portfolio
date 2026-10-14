# Vishal Sharma — Personal Portfolio ("Descent")

A personal developer portfolio and academic assignment built around the concept of **Descent**: "Everything you see sits on something you don't." The site presents a layered journey through a software system—transitioning from bright surface layers down into deep architectural foundations.

---

## Tech Stack

- **Framework**: React 19 + Vite (Vanilla JSX)
- **Styling**: Vanilla CSS with CSS custom properties (tokens) and CSS Modules
- **Routing**: `react-router-dom` (lazy-loaded routes with tone-aware transitions)
- **Animation**: `framer-motion` (respects `prefers-reduced-motion`)
- **Typography**: `@fontsource/instrument-serif` (display) and `@fontsource-variable/inter-tight` (body/UI)
- **CV Tooling**: `pdfkit` & `docx` for script-based starter CV generation

> **Notice**: No TailwindCSS, component libraries, 3D engines, GSAP, or smooth-scroll interceptors are used.

---

## Features

- **The Aperture**: Architectural doorway focal point framing the hero and portrait, transitioning seamlessly between tones.
- **The Beam**: Left-edge interactive vertical scroll indicator and timeline spine.
- **The Layers**: Exploded CSS 3D stack visualizing Interface, Service, and Foundation layers in the skills section.
- **Tone Depth**: Dynamic `data-tone` system (`surface`, `mid`, `deep`) with contrast-validated color scales.
- **Dual-Theme Engine**: Zero-flash dark/light mode engine driven by an inline pre-paint script and synced with system preferences and `localStorage`.
- **Honest Content & State System**: Strict placeholder auditing in development (`npm run check:content`), no fake credentials or mock successes.
- **Accessible & Responsive**: WCAG AA compliant contrast across all tones, visible focus rings, full keyboard navigation, mobile overlay with focus trapping.

---

## Project Structure

```text
portfolio/
├── .context/                  # Private project context and content tracking
│   ├── FRONTEND_CONTEXT.md
│   └── TODO_CONTENT.md
├── client/                    # Vite + React frontend application
│   ├── public/
│   │   ├── _redirects         # Static routing fallback for SPA
│   │   ├── cv/                # Downloadable CV files (PDF & DOCX)
│   │   └── images/portrait/   # Profile images
│   ├── src/
│   │   ├── assets/            # Static assets
│   │   ├── components/        # UI components (Header, Footer, Beam, RouteTransition, ThemeToggle)
│   │   ├── config/            # Portrait and runtime configuration
│   │   ├── data/              # Pure JS data files (profile, skills, projects, timeline, certifications)
│   │   ├── hooks/             # Custom hooks (useTheme, useToneColor, useReducedMotion)
│   │   ├── routes/            # Lazy-loaded page components (Home, Projects, Journey, Contact, NotFound)
│   │   └── styles/            # Design tokens and base stylesheet
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json            # Vercel SPA rewrites
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## Local Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd portfolio/client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Set VITE_CONTACT_ENDPOINT if a backend endpoint is available
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

5. **Run content audit**:
   ```bash
   npm run check:content
   ```

6. **Build for production**:
   ```bash
   npm run build
   npm run preview
   ```

---

## CV Regeneration

Downloadable CV assets (`Vishal_Sharma_CV.pdf` and `Vishal_Sharma_CV.docx`) are located in `client/public/cv/`.

To regenerate the starter documents from `src/data/`:
```bash
cd client
npm run generate:cv
```
Alternatively, replace both files in `client/public/cv/` with your own custom-designed files using the exact filenames:
- `Vishal_Sharma_CV.pdf`
- `Vishal_Sharma_CV.docx`

---

## Portrait Guidelines

A fallback monogram placeholder (`VS`) inside a lit aperture is rendered when no portrait is configured.

To add a real portrait:
1. Provide a photo meeting these criteria:
   - **Composition**: Head and shoulders
   - **Lighting**: One soft side light, directional
   - **Background**: Dark or neutral tone
   - **Aspect Ratio**: 4:5
   - **Resolution**: At least 1600px height (e.g., 1600x2000px)
2. Place the file at `client/public/images/portrait/portrait.jpg` (optionally WebP variants `portrait-800.webp`, `portrait-1200.webp`, `portrait-1600.webp`).
3. Update `client/src/config/portrait.config.js` with `src: '/images/portrait/portrait.jpg'` and adjust `focalX` and `focalY` coordinates.
