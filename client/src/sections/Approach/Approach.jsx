import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import Port from '../../components/primitives/Port.jsx';
import { TechIcon } from '../../components/TechCard/iconMap.jsx';
import { getSectionById } from '../../data/sections.js';
import styles from './Approach.module.css';

const PRINCIPLES = [
  {
    num: '01',
    mono: '01 / API CONTRACTS',
    title: 'Strict API Contracts',
    desc: 'I define explicit request schemas, sanitize input, and return predictable error shapes before data touches business logic.',
    icons: ['node', 'express', 'rest-apis'],
    codeSnippet: `const result = schema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ ok: false, error });
}`,
    seenIn: [
      { name: 'SellerLensIQ', to: '/projects/seller-lens-iq' },
    ],
  },
  {
    num: '02',
    mono: '02 / PERSISTENCE',
    title: 'Structured Persistence Boundaries',
    desc: 'I design relational and document persistence schemas with explicit field constraints, indexed queries, and reliable data ingestion.',
    icons: ['postgres', 'mongodb', 'java'],
    codeSnippet: `// Mongoose & PostgreSQL schemas with strict validation
const doc = await Message.create({ name, email, message });`,
    seenIn: [
      { name: 'SellerLensIQ', to: '/projects/seller-lens-iq' },
      { name: 'ClinicSaaS', to: '/projects/clinic-saas' },
    ],
  },
  {
    num: '03',
    mono: '03 / SECURITY',
    title: 'Defensive Security Boundaries',
    desc: 'I protect endpoints with rate limits, origin-checked CORS, security headers, honeypots, and strict environment configuration.',
    icons: ['express', 'node', 'react'],
    codeSnippet: `router.post('/', contactRateLimiter, validateContact, ...);
if (website?.trim()) return res.status(201).json({ ok: true });`,
    seenIn: [
      { name: 'SellerLensIQ', to: '/projects/seller-lens-iq' },
    ],
  },
];

export default function Approach() {
  const shouldReduceMotion = useReducedMotion();
  const sectionMeta = getSectionById('approach');

  return (
    <SectionShell
      id="approach"
      nodeNumber={sectionMeta.num}
      nodeLabel={sectionMeta.nodeLabel}
      title="How I Build"
      subtitle="Core engineering principles derived from building reliable backend services and production client applications."
    >
      <div className={styles.grid}>
        {PRINCIPLES.map((p, idx) => (
          <motion.article
            key={p.num}
            className={styles.card}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{
              duration: 0.45,
              delay: shouldReduceMotion ? 0 : idx * 0.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            {/* Header: Port and Mono Tag */}
            <div className={styles.cardHeader}>
              <span className={styles.monoTag}>{p.mono}</span>
              <Port active className={styles.headerPort} />
            </div>

            {/* Title */}
            <h3 className={styles.cardTitle}>{p.title}</h3>

            {/* Concise Verified Claim */}
            <p className={styles.cardDesc}>{p.desc}</p>

            {/* Optional 2-3 line real code evidence from this repo */}
            {p.codeSnippet && (
              <pre className={styles.codeBlock} tabIndex={0} aria-label={`${p.title} code implementation`}>
                <code>{p.codeSnippet}</code>
              </pre>
            )}

            {/* Footer: Tech Icons & Project Links */}
            <div className={styles.cardFooter}>
              <div className={styles.iconGroup} aria-label="Technologies used">
                {p.icons.map((iconId) => (
                  <span key={iconId} className={styles.iconWrapper} title={iconId}>
                    <TechIcon id={iconId} size={18} />
                  </span>
                ))}
              </div>

              <div className={styles.chipsRow}>
                {p.seenIn.map((proj) => (
                  <Link
                    key={proj.name}
                    to={proj.to}
                    className={styles.projectChip}
                    aria-label={`View principle applied in ${proj.name}`}
                  >
                    <span className={styles.chipPrefix}>Seen in:</span>
                    <span className={styles.chipTarget}>{proj.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Corner Bracket Detail */}
            <div className={styles.cornerMarker} aria-hidden="true" />
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
