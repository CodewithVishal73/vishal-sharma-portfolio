# Claims Ledger

Authoritative audit of all technical, educational, and project claims made across the portfolio codebase, UI components, and data files.
Strictly derived from readable evidence in the workspace and explicit **Owner-Stated Facts**.

| Claim | Where shown | Source | Status | Notes / Constraints |
|---|---|---|---|---|
| **Vishal Sharma** (Identity & Name) | `profile.js`, `Hero.jsx`, `About.jsx`, `README.md` | Owner-stated facts | `owner-stated` | Primary portfolio author name. |
| **Education: B.Tech Computer Science and Engineering, JK Lakshmipat University, Jaipur** | `profile.js`, `timeline.js` | Owner-stated facts | `owner-stated` | Expected graduation 2028. |
| **Education Start Year** | `timeline.js` | None | `unverified` | Start year NOT stated: do NOT invent it. |
| **Experience: JGS Jaipur Global Services Pvt. Ltd., Jaipur, Rajasthan, India** | `timeline.js` | Owner-stated facts | `owner-stated` | Period: 18 May 2026 to 18 July 2026. |
| **Experience Designation: "Internship"** | `timeline.js` | Owner-stated facts | `unconfirmed` | Placeholder pending official designation confirmation. |
| **SellerLensIQ: Associated with JGS** | `timeline.js`, `projects.js` | Owner-stated facts | `owner-stated` | Project developed in JGS company context, not a separate employer. |
| **SellerLensIQ: Amazon keyword research & listing SEO intelligence platform** | `projects.js`, `ProjectCard.jsx`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` | Feature-level description only; no company-confidential data. |
| **SellerLensIQ: Java / Spring Boot & PostgreSQL stack** | `projects.js`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` | Core backend architecture. |
| **SellerLensIQ: Authentication, keyword/portfolio management, CSV bulk import** | `projects.js`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` | Implemented project features. |
| **SellerLensIQ: Analytics** | `projects.js`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` | Listing quality and keyword metrics only. |
| **SellerLensIQ: Public deployment, customers, or business revenue** | None | None | `unverified` | DO NOT claim public deployment or commercial metrics. |
| **ClinicSaaS: Clinic management project in Java / Spring Boot** | `projects.js`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` | Core backend project. |
| **ClinicSaaS: Database & API details** | `projects.js`, `ProjectDetail.jsx` | Repo only | `unverified` | Relational DB unspecified; do not claim MySQL unless repo verifies. |
| **Vaani Bill: AI voice POS product concept** | `projects.js`, `ProjectDetail.jsx` | Owner-stated facts | `owner-stated` | Concept only; Hindi/English/Hinglish voice billing; NOT shipped. |
| **Skill: Java** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` | Used in SellerLensIQ, ClinicSaaS. |
| **Skill: C++** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` | Core systems & algorithm proficiency. |
| **Skill: JavaScript** | `skills.js`, `TechCard.jsx` | Owner-stated facts / Repo | `verified` | Used in this portfolio client and runtime logic. |
| **Skill: Python** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` | Scripting, data handling, and AI experimentation. |
| **Skill: SQL** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` | Relational database queries. |
| **Skill: Spring Boot** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` | Used in SellerLensIQ, ClinicSaaS. |
| **Skill: REST APIs** | `skills.js`, `TechCard.jsx` | Owner-stated facts / Repo | `verified` | Express and Spring Boot service endpoints. |
| **Skill: React** | `skills.js`, `TechCard.jsx` | `client/package.json` | `verified` | React 18 frontend of this portfolio. |
| **Skill: Node.js** | `skills.js`, `TechCard.jsx` | `server/package.json` | `verified` | Server runtime of this portfolio. |
| **Skill: Express** | `skills.js`, `TechCard.jsx` | `server/package.json` | `verified` | REST API framework of this portfolio. |
| **Skill: PostgreSQL** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` | Used in SellerLensIQ. |
| **Skill: MySQL** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` | Working knowledge / relational alternative. |
| **Skill: MongoDB** | `skills.js`, `TechCard.jsx` | `server/package.json` | `verified` | Real persistence database for this portfolio. |
| **Skill: Git & GitHub** | `skills.js`, `TechCard.jsx` | Workspace `.git` | `verified` | Branching, commits, and version control. |
| **Skill: Maven** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` | Java dependency management and build tool. |
| **Skill: Postman** | `skills.js`, `TechCard.jsx` | Owner-stated facts | `owner-stated` | API contract testing and execution. |
| **Interests: Practical AI integration & AI-assisted development** | `profile.js`, `intelligence.js` | Owner-stated facts | `owner-stated` | Kept to practical software integration, no AI agent claims. |
| **Certification: IBM Java Developer** | `certifications.js` | Coursera `8B36R5EZH835` | `verified` | Credential link verified. |
| **Certification: McKinsey.org Forward Program** | `certifications.js` | Credly `bef2840b-...` | `verified` | Credential link verified. |
| **Certification: Google AI Essentials** | `certifications.js` | Coursera `4FEA75A7SLPY` | `verified` | Credential link verified. |
| **Certification: IBM Generative AI: Prompt Engineering** | `certifications.js` | Coursera link | `verified` | Course completion verified. |
| **Architecture: This site (Node.js + Express + MongoDB)** | `architecture.js`, `SystemMap.jsx` | `server/src/` | `verified` | Tag: "This site". Real telemetry endpoint. |
| **Architecture: Project pattern (Spring Boot + PostgreSQL)** | `architecture.js`, `SystemMap.jsx` | Owner-stated facts | `project` | Tag: "SellerLensIQ". Pattern used in SellerLensIQ. |
| **Architecture: AI service branch** | `architecture.js`, `SystemMap.jsx` | Architecture pattern | `illustrative` | Tag: "Illustrative". Generic AI service, educational. |

## Truth Governance Rules
1. **No Invented Experience**: JGS internship title is marked as a placeholder ("Internship") awaiting confirmation. Start year for university is omitted.
2. **Honesty in Telemetry**: Only the Node.js/Express path connects to the live backend. Illustrative paths show no numbers, latencies, or status codes.
3. **No Fake AI Claims**: No claims of hosted LLMs, deployed bots, or proprietary models.
