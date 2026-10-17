# Claims Ledger

Authoritative audit of all technical, educational, and project claims made across the portfolio codebase, UI components, and data files.

| Claim | Where it appears | Source | Status |
|---|---|---|---|
| **Vishal Sharma** (Identity & Name) | `profile.js`, `Hero.jsx`, `About.jsx`, `README.md` | `PROJECT_CONTEXT.md` §3 | `owner-stated` |
| **B.Tech CSE, JK Lakshmipat University (2024–2028)** | `profile.js`, `About.jsx`, `timeline.js` | `PROJECT_CONTEXT.md` §3 | `owner-stated` |
| **Status: Current Student** | `profile.js`, `About.jsx`, `timeline.js` | `PROJECT_CONTEXT.md` §3 | `owner-stated` |
| **Location: Jaipur, India** | `profile.js`, `About.jsx` | `PROJECT_CONTEXT.md` §3 | `owner-stated` |
| **Interests: Practical AI integration & AI-assisted app development** | `profile.js`, `Hero.jsx`, `About.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: Java** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: C++** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: JavaScript** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: Python** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: SQL** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: Spring Boot** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: REST APIs** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: React** | `skills.js`, `TechCard.jsx` | `client/package.json` (`react` 18.3.1) | `verified` |
| **Skill: Node.js** | `skills.js`, `TechCard.jsx` | `server/package.json` | `verified` |
| **Skill: Express** | `skills.js`, `TechCard.jsx` | `server/package.json` (`express` 4.21.2) | `verified` |
| **Skill: MongoDB** | `skills.js`, `TechCard.jsx` | `server/package.json` (`mongoose` 8.10.1) | `verified` |
| **Skill: PostgreSQL** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: MySQL** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: Git** | `skills.js`, `TechCard.jsx` | Workspace `.git` repository | `verified` |
| **Skill: GitHub** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: Maven** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **Skill: Postman** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` |
| **SellerLensIQ: Amazon keyword research & listing SEO intelligence platform** | `projects.js`, `ProjectCard.jsx`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` |
| **SellerLensIQ: Java/Spring Boot & PostgreSQL stack** | `projects.js`, `ProjectCard.jsx`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` |
| **SellerLensIQ: Authentication, keyword/portfolio management, CSV import, analytics** | `projects.js`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` |
| **SellerLensIQ: PostgreSQL Row-Level Security (RLS) multi-tenant data isolation** | `projects.js` (legacy), `timeline.js` (legacy) | None visible in readable code | `unverified` (removed from UI/data) |
| **SellerLensIQ: Competitor gap analysis engine** | `projects.js` (legacy) | None visible in readable code | `unverified` (removed from UI/data) |
| **SellerLensIQ: Public GitHub repository & live demo URL** | `projects.js` | None provided (`null`) | `unverified` (rendered honestly as private / no demo) |
| **ClinicSaaS: Clinic management project in Java/Spring Boot** | `projects.js`, `ProjectCard.jsx`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` |
| **ClinicSaaS: MySQL database integration & DTO validation** | `projects.js` (legacy) | None visible in readable code | `unverified` (removed from UI/data) |
| **ClinicSaaS: Postman collection test suites** | `projects.js` (legacy) | None visible in readable code | `unverified` (removed from UI/data) |
| **ClinicSaaS: Public GitHub repository & live demo URL** | `projects.js` | None provided (`null`) | `unverified` (rendered honestly as private / no demo) |
| **Vaani Bill: AI voice POS concept (Hindi/English/Hinglish voice billing, planned integrations)** | `projects.js`, `ProjectCard.jsx`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` |
| **Vaani Bill: Working speech parsing & audio streaming pipeline** | `skills.js` (legacy), `projects.js` (legacy) | None visible in readable code; owner states not shipped | `unverified` (removed; marked strictly as planned concept) |
| **Vaani Bill: Implemented Tailwind POS interface & TypeScript backend** | `projects.js` (legacy) | None visible in readable code | `unverified` (removed; marked as concept) |
| **Vaani Bill: Lovable Cloud DB integration** | `projects.js` (legacy) | None visible in readable code | `unverified` (removed from UI/data) |
| **Vaani Bill: Public GitHub repository & live demo URL** | `projects.js` | None provided (`null`) | `unverified` (rendered honestly as private / no demo) |
| **Certification: IBM Java Developer** | `certifications.js`, `CertCard.jsx` | Coursera verification URL `8B36R5EZH835` | `verified` |
| **Certification: McKinsey.org Forward Program** | `certifications.js`, `CertCard.jsx` | Credly badge URL `bef2840b-...` | `verified` |
| **Certification: Google AI Essentials** | `certifications.js`, `CertCard.jsx` | Coursera verification URL `4FEA75A7SLPY` | `verified` |
| **Certification: IBM Generative AI: Prompt Engineering Basics** | `certifications.js`, `CertCard.jsx` | Coursera course URL | `verified` |

## Summary of Removals and UI Adjustments

1. **Unverified multitenancy and RLS claims removed:** References to PostgreSQL Row-Level Security tenant isolation in SellerLensIQ have been removed from `projects.js`, `skills.js`, and `timeline.js`.
2. **Unverified working voice/AI pipeline claims removed:** All claims implying that Vaani Bill has working audio streaming or deployed speech models were removed from `skills.js` and `projects.js`. Vaani Bill is presented strictly as a planned concept with an explicit `Concept` chip and `Planned Direction (Not Shipped)` separation.
3. **Honest states for missing project links:** Since no public GitHub or live demo URLs are provided or readable in the repository for any of the 3 projects, buttons are not rendered as disabled or fake links. Instead, the UI explicitly renders truthful status chips: `"Repository private"` and `"No public demo yet"`.
