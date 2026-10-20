/**
 * generate-real-docx.mjs
 * Generates Vishal_Sharma_CV.docx that mirrors the actual PDF resume content.
 * Run: node server/scripts/generate-real-docx.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  TabStopType,
  TabStopPosition,
} from 'docx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '../assets/cv');
const docxPath = path.join(outputDir, 'Vishal_Sharma_CV.docx');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// ─── Colour / size constants ────────────────────────────────────────────────
const C_INK     = '111827'; // near-black text
const C_MUTED   = '4B5563'; // grey subtext
const C_GREEN   = '15803D'; // accent (section headers)
const C_LINK    = '1D4ED8'; // blue for URLs

const PT = (pt) => pt * 2; // twips → half-points  (docx `size` = half-points)

// ─── Helpers ────────────────────────────────────────────────────────────────
const bold       = (text, color = C_INK, size = 9)  => new TextRun({ text, bold: true,  color, size: PT(size) });
const normal     = (text, color = C_INK, size = 9)  => new TextRun({ text,               color, size: PT(size) });
const italic     = (text, color = C_MUTED, size = 8.5) => new TextRun({ text, italics: true, color, size: PT(size) });
const muted      = (text, size = 8.5)               => new TextRun({ text, color: C_MUTED, size: PT(size) });
const lineBreak  = ()                               => new TextRun({ break: 1 });

function sectionHeading(title) {
  return new Paragraph({
    spacing: { before: 160, after: 50 },
    border: {
      bottom: { color: 'D1D5DB', space: 1, style: BorderStyle.SINGLE, size: 4 },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: PT(9),
        color: C_GREEN,
        characterSpacing: 80,
      }),
    ],
  });
}

function para(children, opts = {}) {
  return new Paragraph({ children, spacing: { before: 30, after: 30 }, ...opts });
}

function bullet(children, level = 0) {
  return new Paragraph({
    bullet: { level },
    children,
    spacing: { before: 20, after: 20 },
  });
}

// ─── Document Content ────────────────────────────────────────────────────────
const children = [
  // ── NAME ──
  new Paragraph({
    spacing: { before: 0, after: 30 },
    children: [
      new TextRun({ text: 'Vishal Sharma', bold: true, size: PT(20), color: C_INK }),
    ],
  }),

  // ── ROLE / TITLE ──
  new Paragraph({
    spacing: { before: 0, after: 40 },
    children: [
      new TextRun({ text: 'Software Engineer', bold: true, size: PT(10.5), color: C_GREEN }),
    ],
  }),

  // ── CONTACT LINE ──
  new Paragraph({
    spacing: { before: 0, after: 10 },
    children: [
      muted('Jaipur, India', 8.5),
      muted('   |   ', 8.5),
      new TextRun({ text: 'vishal.sharma.tech1@gmail.com', color: C_LINK, size: PT(8.5) }),
      muted('   |   ', 8.5),
      new TextRun({ text: 'github.com/CodewithVishal73', color: C_LINK, size: PT(8.5) }),
      muted('   |   ', 8.5),
      new TextRun({ text: 'vishalsharma1.netlify.app', color: C_LINK, size: PT(8.5) }),
    ],
  }),

  // ── SEPARATOR ──
  new Paragraph({ spacing: { before: 0, after: 60 }, children: [muted('')] }),

  // ═══════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════
  sectionHeading('Professional Summary'),
  para([
    normal(
      'Computer Science undergraduate specializing in backend architecture, REST API engineering, and scalable software systems. '
      + 'Experienced in developing secure service layers, relational and document database integrations, and intelligent web applications. '
      + 'Solved 175+ problems on LeetCode. McKinsey Forward Program participant. Committed to building verifiable, production-quality systems.',
      C_INK,
      8.5,
    ),
  ], { spacing: { before: 40, after: 60 } }),

  // ═══════════════════════════════════════════
  // EDUCATION
  // ═══════════════════════════════════════════
  sectionHeading('Education'),
  para([
    bold('B.Tech in Computer Science and Engineering', C_INK, 9),
    muted('  —  Expected Graduation: 2028', 8.5),
  ], { spacing: { before: 40, after: 20 } }),
  para([
    muted('JK Lakshmipat University, Jaipur  (Current Student)', 8.5),
  ], { spacing: { before: 0, after: 60 } }),

  // ═══════════════════════════════════════════
  // EXPERIENCE
  // ═══════════════════════════════════════════
  sectionHeading('Experience'),

  // JGS
  para([
    bold('JGS Jaipur Global Services Pvt. Ltd., Jaipur', C_INK, 9),
    muted('  —  18 May 2026 – 18 July 2026  (Backend Engineering Intern)', 8.5),
  ], { spacing: { before: 40, after: 20 } }),
  bullet([normal('Engineered backend service layer and data persistence for SellerLensIQ — an Amazon keyword research and listing SEO platform.', C_INK, 8.5)]),
  bullet([normal('Built Spring Boot REST APIs, implemented authentication, CSV bulk ingestion pipeline, and PostgreSQL database models.', C_INK, 8.5)]),
  bullet([normal('Designed and implemented relational schema with efficient query patterns for keyword portfolio and listing analytics.', C_INK, 8.5)]),
  new Paragraph({ spacing: { before: 0, after: 50 }, children: [] }),

  // ═══════════════════════════════════════════
  // SKILLS
  // ═══════════════════════════════════════════
  sectionHeading('Technical Skills'),
  para([
    bold('Languages: ', C_INK, 8.5),
    muted('Java, C++, Python, JavaScript', 8.5),
  ], { spacing: { before: 40, after: 20 } }),
  para([
    bold('Backend: ', C_INK, 8.5),
    muted('Spring Boot, REST APIs, Node.js, Express', 8.5),
  ], { spacing: { before: 0, after: 20 } }),
  para([
    bold('Databases: ', C_INK, 8.5),
    muted('PostgreSQL, MySQL, MongoDB, SQL', 8.5),
  ], { spacing: { before: 0, after: 20 } }),
  para([
    bold('Frontend: ', C_INK, 8.5),
    muted('React, HTML, CSS, JavaScript', 8.5),
  ], { spacing: { before: 0, after: 20 } }),
  para([
    bold('Tools & Technologies: ', C_INK, 8.5),
    muted('Git, GitHub, Maven, Postman, Practical AI Integration, AI-Assisted App Development', 8.5),
  ], { spacing: { before: 0, after: 60 } }),

  // ═══════════════════════════════════════════
  // PROJECTS
  // ═══════════════════════════════════════════
  sectionHeading('Projects'),

  // SellerLensIQ
  para([
    bold('SellerLensIQ', C_INK, 9),
    bold('  ·  ', C_MUTED, 9),
    italic('Java · Spring Boot · PostgreSQL · REST APIs', C_MUTED, 8.5),
    muted('   [Associated with JGS Internship]', 8),
  ], { spacing: { before: 40, after: 15 } }),
  bullet([normal('Amazon keyword research and listing SEO intelligence platform.', C_INK, 8.5)]),
  bullet([normal('Engineered RESTful endpoints for keyword portfolio tracking, CSV bulk upload pipeline, and PostgreSQL persistence.', C_INK, 8.5)]),
  new Paragraph({ spacing: { before: 0, after: 40 }, children: [] }),

  // ClinicSaaS
  para([
    bold('ClinicSaaS', C_INK, 9),
    bold('  ·  ', C_MUTED, 9),
    italic('Java · Spring Boot · REST APIs', C_MUTED, 8.5),
    muted('   [In Progress]', 8),
  ], { spacing: { before: 20, after: 15 } }),
  bullet([normal('Healthcare clinic management application for administrative and appointment workflows.', C_INK, 8.5)]),
  bullet([normal('Implemented structured domain models, doctor scheduling logic, and secure REST endpoints.', C_INK, 8.5)]),
  new Paragraph({ spacing: { before: 0, after: 40 }, children: [] }),

  // Vaani Bill
  para([
    bold('Vaani Bill', C_INK, 9),
    bold('  ·  ', C_MUTED, 9),
    italic('React · Node.js · REST APIs', C_MUTED, 8.5),
    muted('   [Concept]', 8),
  ], { spacing: { before: 20, after: 15 } }),
  bullet([normal('AI voice point-of-sale concept exploring billing simplification through Hindi, English, and Hinglish speech interactions.', C_INK, 8.5)]),
  new Paragraph({ spacing: { before: 0, after: 60 }, children: [] }),

  // ═══════════════════════════════════════════
  // ACHIEVEMENTS & ACTIVITIES
  // ═══════════════════════════════════════════
  sectionHeading('Achievements & Activities'),
  bullet([
    bold('McKinsey Forward Program ', C_INK, 8.5),
    muted('— Participant; professional skills and leadership curriculum by McKinsey & Company.', 8.5),
  ], 0),
  bullet([
    bold('LeetCode ', C_INK, 8.5),
    muted('— Solved 175+ problems across data structures, algorithms, and system design topics.', 8.5),
  ], 0),
  bullet([
    bold('Google & IBM Certifications ', C_INK, 8.5),
    muted('— Completed verified courses in AI, data analytics, and software engineering fundamentals.', 8.5),
  ], 0),
  new Paragraph({ spacing: { before: 0, after: 60 }, children: [] }),

  // ═══════════════════════════════════════════
  // CORE COMPETENCIES
  // ═══════════════════════════════════════════
  sectionHeading('Core Competencies'),
  para([
    muted(
      'Strict API Contracts & Schema Validation   •   Relational & Document Persistence Boundaries   •   '
      + 'Defensive Security & Middleware Architecture   •   Practical AI Systems Integration',
      8.5,
    ),
  ], { spacing: { before: 40, after: 30 } }),
];

// ─── Build & Write ───────────────────────────────────────────────────────────
const doc = new Document({
  creator: 'Vishal Sharma',
  title: 'Vishal Sharma - Resume',
  description: 'Software Engineer Resume',
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: PT(9), color: C_INK },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 648, bottom: 648, left: 720, right: 720 }, // 0.45 in top/bottom, 0.5 in left/right
        },
      },
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(docxPath, buffer);
console.log(`✓  DOCX written to: ${docxPath}  (${Math.round(buffer.length / 1024)} KB)`);
