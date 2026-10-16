# DESIGN_AND_MOTION.md — "The Request"

Visual, motion and component spec. Requirements live in `.context/PROJECT_CONTEXT.md` and win on conflict.

## 1. Concept: the page is one request travelling through the stack

Vishal builds backends and full-stack systems, and this assignment is literally a MERN request path. So the site is the life of a single request:
**Browser → React → Express → MongoDB → response.**
A thin **signal line** (the spine) runs down the page. A glowing **packet** rides it as you scroll. Each section is a **node** on the path, labelled in small mono type. The contact form at the end sends a real request, and the visitor watches the packet reach the database and come back as `201 Created`.

Rules of the concept:
- The metaphor decorates structure and never replaces readability. Headings stay plain English; mono labels are secondary.
- Every animation must mean something: progress along the path, data arriving, a connection being made, or state changing. Nothing moves "just because".
- Minimal text. Prefer logos, diagrams, shapes and short labels over paragraphs.

### Section → node map
| Order | Section | Node label | Visual idea |
|---|---|---|---|
| 01 | Hero | `CLIENT` | Name + typewriter, live **system map** (Browser→React→Express→Mongo) with travelling packet and a real "Ping API" button |
| 02 | About | `IDENTITY` | Photo in a "port" frame, 3 status chips, one short bio. Facts appear like a response payload |
| 03 | Skills | `STACK` | Three layer panels (Frontend / Backend / Tools & Technologies) of logo cards with animated bars; related techs link on hover |
| 04 | Projects | `SERVICES` | Cards that look like deployed services: mini architecture diagram, stack badges, status dots, GitHub + Live buttons |
| 05 | Education | `HISTORY` | Vertical **git-graph timeline** (commits as nodes), line draws as you scroll |
| 06 | Certifications | `PROOF` | Certificate cards styled as verified receipts with a verify link |
| 07 | Contact | `RESPONSE` | Form that fires `POST /api/contact`; request/response panel animates the real result |
| end | Footer | `200 OK` | Tiny sign-off, CV links, socials only if real |

## 2. Theme tokens (CSS custom properties on `:root[data-theme]`)

| Token | Light "Paper" | Dark "Graphite" |
|---|---|---|
| `--bg` | `#F3F0E8` | `#0B0F0E` |
| `--surface` | `#FBF9F4` | `#121817` |
| `--surface-2` | `#ECE8DD` | `#18201E` |
| `--ink` | `#12141A` | `#EAF1EE` |
| `--ink-2` (secondary text) | `#4A4F5C` | `#9AA9A3` |
| `--line` | `#D9D4C7` | `#223029` |
| `--signal` (accent, packet) | `#2433F2` | `#7DF2C4` |
| `--on-signal` | `#FFFFFF` | `#04140E` |
| `--ok` | `#166A45` | `#4ADE9A` |
| `--err` | `#B3261E` | `#FF7B72` |

- Contrast was measured: every text token above is ≥ 5.4:1 on all three surfaces in both themes (`--ok` light was darkened to pass). `--line` is decorative only (≈1.3:1); **form field borders and any border that defines a control must use `--ink-2`** (≥ 3:1).
- One accent only (`--signal`). Never add a second brand colour. Use `color-mix(in oklab, var(--signal) X%, transparent)` for glows and tints.
- Verify contrast with a script; adjust the hex values (not the rule) if anything falls below 4.5:1 for text or 3:1 for UI.
- Theme logic: initial = saved choice → else `prefers-color-scheme` → set `data-theme` before first paint (inline script in `index.html`) to avoid flash. Toggle persists to `localStorage` (try/catch).
- Toggle animation: View Transitions API circular reveal from the toggle button; fallback is a 200 ms colour crossfade. Skip when reduced motion is on.
- Brand logos keep their official colours only on hover/focus; at rest they use `currentColor` so the page stays one visual system.

## 3. Typography
- Display: **Bricolage Grotesque** (variable), weight 600–800, tracking −0.03em, `clamp(2.5rem, 7.5vw, 6.5rem)` for hero name; h2 `clamp(2rem, 4.5vw, 3.5rem)`.
- Body: **Inter Tight** 400/500, 17px base, line-height 1.55, max line length 62ch.
- Labels/code: **JetBrains Mono** 12–13px, uppercase labels with +0.08em tracking.
- Load via `@fontsource` packages, `font-display: swap`, only the weights used, preload the display font.

## 4. Layout, spacing, surfaces
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section vertical padding `clamp(64px, 12vw, 128px)`.
- Container max 1200px; gutters 16 / 24 / 32 at <768 / <1024 / ≥1024. 12-col grid ≥1024, single column below.
- Breakpoints: 480, 768, 1024, 1280. Mobile-first `min-width` queries.
- Spine: ≥1024 a fixed 1px line in the left gutter with node markers; <1024 it becomes a 2px scroll-progress bar at the top plus the mono node label above each section heading.
- Surfaces: 1px `--line` border, radius 6 (chips) / 12 (cards) / 20 (large panels), no heavy drop shadows. Depth comes from border + surface step + a faint signal glow on active/hover.
- **Ports:** cards carry a small 6px circle "port" on the left edge that lights up in `--signal` when the card is in view or hovered. This is the recurring motif tying cards to the spine.
- Sticky header: logo mark "VS", section links (scrollspy), theme toggle, "CV" button. Collapses to a menu sheet on mobile with 44px targets.

## 5. Animation system

**Library:** `framer-motion` only (plus CSS). Shared tokens in `src/lib/motion.js`.

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--dur-fast / base / slow` | 160ms / 420ms / 800ms |
| Stagger | 60ms between siblings, max 8 children staggered |

Patterns:
1. **Reveal on scroll:** `opacity 0→1`, `y 24→0`, base duration, ease-out, `once: true`, margin `-12%`. Headings reveal by line (clip + y).
2. **Spine packet:** `useScroll` + `useSpring` drives the packet's position and a drawn line (`pathLength`/`scaleY`). Nodes light up as the packet passes them.
3. **Typewriter:** custom `useTypewriter` hook: type 55 ms/char, hold 1.6 s, delete 30 ms/char, loop through phrases. Full phrase list in an `aria-label`; the animated text is `aria-hidden`. Respects reduced motion by showing the first phrase statically.
4. **System map (hero):** SVG. Packet follows the path with `offset-path` or `animateMotion`-style framer `useAnimationFrame` (single rAF). Nodes pulse once when hit. The **Ping API** button calls `/api/health`, drives the packet through real round-trip time, then shows `200 OK · 143 ms · db connected` (real values) or an honest error state.
5. **Skill bars:** `scaleX` from 0 to level, `transform-origin: left`, 700ms ease-out, triggered once in view, staggered within a panel.
6. **Timeline:** vertical line draws with scroll progress; each commit node scales in as the line reaches it; the card slides in from its side (alternating ≥1024, single side below).
7. **Project cards:** hover lifts 4px, port lights, a pointer-tracking radial glow (CSS variables updated by pointer events, no re-render); filter changes use `AnimatePresence` + `layout` so cards reflow smoothly.
8. **Contact:** on submit the packet travels from the form to a "MongoDB" node and returns; panel prints the real response JSON line by line.
9. **Page transitions:** route change to `/projects/:slug` uses a short fade/slide; back navigation restores scroll position.

Rules:
- Animate only `transform`, `opacity`, `clip-path`, and `filter` on small elements. Never animate layout properties on scroll.
- At most **one** continuous animation loop on screen (the packet or map). Pause when off-screen (IntersectionObserver) or tab hidden.
- No scroll-jacking, no custom cursor, no parallax that moves text against reading.
- No autoplay audio. No animation that blocks interaction or takes longer than 800ms for UI feedback.
- **Reduced motion** (`prefers-reduced-motion: reduce`): no typewriter loop, no packet travel, no parallax, no bar growth animation (bars appear at final value), no theme wipe. Content, state changes and focus remain fully usable. Provide a visible static alternative for every animated meaning.
- Performance: 60 fps on a mid-range phone, no long tasks >50 ms during scroll, JS bundle for first load ≤ 200 kB gzip (route-split the detail page), images WebP/AVIF with explicit width/height.

## 6. Skills visualization (satisfies faculty section 3 and the visual-first brief)

Three required category panels, titled exactly **Frontend**, **Backend**, **Tools & Technologies**. Panels are visually distinct (own port, own sub-label) but share the card system.

| Panel | Contents (verified only) |
|---|---|
| Frontend | JavaScript, React (HTML/CSS only if Vishal confirms) |
| Backend | sub-row *Languages*: Java, C++, Python · sub-row *Frameworks & APIs*: Spring Boot, REST APIs, Node.js, Express · sub-row *Databases*: MongoDB, PostgreSQL, MySQL, SQL |
| Tools & Technologies | Git, GitHub, Maven, Postman (more only if confirmed) |

`TechCard` anatomy: logo (28–32 px, `currentColor` at rest, brand colour on hover/focus) · name always visible · slim animated bar · optional "used in" line (only if the project data really uses it).
- **Proficiency:** each skill has `level` ∈ `learning | working | comfortable | strong`, chosen by Vishal. Bar fill maps 0.35 / 0.55 / 0.75 / 0.9 purely visually. **No number or percentage is ever rendered.**
- **Tooltip:** on hover, focus and tap shows the level label plus evidence, e.g. "Comfortable · used in SellerLensIQ". `role="tooltip"`, linked by `aria-describedby`, dismiss with Esc, never the only way to get the info (bar also has `role="meter"` with `aria-valuetext`).
- **Relations:** a small `relations` map (Spring Boot→Java, React→JavaScript, Express→Node.js, Mongoose context→MongoDB, SQL→PostgreSQL/MySQL). On hover/focus of a card, related cards glow and a thin SVG line connects them; others dim to 60%. Desktop only; mobile shows the "related" chips inside the tooltip.
- Logo source: `react-icons` (Si* set; `FaJava`/Devicon for Java if absent) or `simple-icons`, bundled locally, no hotlinking. Verify every logo renders and is recognisable; fall back to a clean monogram tile rather than a wrong logo.
- Not a wall of logos: max ~8 cards per panel, generous spacing, panels stack on mobile.
- Data in `src/data/skills.js`: `{ id, name, group, sub, icon, level, evidence?, relations? }`. Initial `level` values are placeholders marked `// CONFIRM` until Vishal sets them.

## 7. Components
Layout: `Header`, `ThemeToggle`, `Footer`, `SpineRail`, `PacketIndicator`, `SectionShell` (node label + heading + reveal), `ScrollToTop`.
Primitives: `Button` (primary/secondary/ghost), `Badge`, `Chip`, `Port`, `Tooltip`, `Reveal`, `Skeleton`.
Hero: `SystemMap`, `PingButton`, `Typewriter`, `DownloadCvButton` (split button: PDF · DOCX, calls `/api/cv/*`, shows "preparing…" if server is waking).
Content: `PhotoFrame`, `StatusChip`, `TechCard`, `SkillPanel`, `RelationLines`, `ProjectCard`, `ProjectFilter`, `ArchitectureMini` (per-project small SVG), `TimelineItem`, `CertCard`, `AchievementList`, `ContactForm`, `RequestResponsePanel`.
Pages: `Home`, `ProjectDetail`, `NotFound`.
Hooks: `useTypewriter`, `useInView`, `useReducedMotion`, `usePing`, `useTheme`, `useScrollSpy`.
Styling: CSS Modules per component + global `tokens.css`/`base.css` only. No Tailwind, no CSS-in-JS. No broad resets beyond a minimal base.

## 8. Section specs

**Hero** (full viewport, `min-height: 100svh`): left column: mono label `01 / CLIENT`, name (display), designation "Software Engineer", headline "Engineering the Future of" + typewriter phrases, support line, CTAs (View Projects primary, Download CV split button secondary). Right/below: `SystemMap` (four nodes: Browser, React, Express, MongoDB; labelled; packet loop; Ping API). Background: soft signal-tinted gradient mesh plus faint grid; optional dark-only video layer at ≤ 35% opacity behind the map if it improves things (files exist from earlier work in `hero-system-*.mp4/.webm` and posters; must be muted, looped, `playsInline`, paused off-screen, poster for reduced motion, and re-tinted to the signal colour if kept).

**About:** `PhotoFrame` (3:4, rounded 20, port, subtle scan-line reveal; placeholder shows initials "VS" and a note-free neutral style until the real image is added at `public/photo/vishal.webp`). Bio ≤ 60 words, honest. Chips: Location, Status (Student · B.Tech CSE, JKLU, 2028), Focus (Backend · APIs · AI integration). Reveal on scroll.

**Projects:** minimum 3 (SellerLensIQ, Clinic Management System, this portfolio). Card: name, one-sentence description, stack badges, `ArchitectureMini`, status dot only if truthful, **GitHub** and **Live demo** buttons (both required; if a URL is not yet provided render a disabled "Link coming" button and flag it in the report, never a fake link). Filter chips are generated from the data's tech tags, plus sort (Newest / A–Z). `/projects/:slug`: problem, architecture diagram, stack, what was built (3–5 bullets), links, next/previous project.

**Timeline:** git-graph style. Items: B.Tech CSE at JKLU (2024–2028, confirm start year) and any confirmed school/internship entries. No invented internships; if there is no experience, a single honest "Currently building: …" node is fine. Show degree, institution, years.

**Certifications & Achievements:** card = title, issuer, year, image thumbnail or "Verify" link. Achievements (hackathons/awards) as a compact list. If Vishal has none yet, render the section with only real entries and no filler. Flag it.

**Contact:** left: heading + email (if confirmed) + social links that exist. Right: form (Name, Email, Message) with inline validation, honeypot hidden field, disabled state while sending, "waking server" notice if >2.5 s, success with request/response panel, error with retry, character counter on message. Labels visible, `aria-live` status.

## 9. Accessibility
Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`); one `h1`; skip link; all controls ≥ 44×44 touch targets; visible focus ring `2px solid var(--signal)` with 2px offset (3:1 against both themes); images have meaningful `alt` (decorative = empty alt); animations never carry information alone; forms have real `<label>`s and `aria-describedby` errors; colour is never the sole signal; works fully keyboard-only; no horizontal overflow at 320px.

## 10. Taste rubric (self-critique each prompt, 1–10, fix anything < 7)
Distinctiveness (would a stranger recognise this as not a template?) · Hierarchy and spacing rhythm · Typography quality · Motion meaning and smoothness · Logo recognisability and calm density · Responsive polish · Light/dark parity · Content honesty.
Anti-patterns to avoid: purple-blue gradient hero, glassmorphism everywhere, emoji icons, floating random orbs, "Hi, I'm…" centred stack, uniform three-card grids with identical icons, lorem ipsum, fake stats.