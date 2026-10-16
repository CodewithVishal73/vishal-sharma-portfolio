import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../sections/Hero/Hero.jsx';
import About from '../sections/About/About.jsx';
import Skills from '../sections/Skills/Skills.jsx';
import Projects from '../sections/Projects/Projects.jsx';
import SectionShell from '../components/SectionShell/SectionShell.jsx';
import Button from '../components/primitives/Button.jsx';
import Badge from '../components/primitives/Badge.jsx';
import Chip from '../components/primitives/Chip.jsx';
import Port from '../components/primitives/Port.jsx';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* 01 / CLIENT — HERO */}
      <Hero />

      {/* 02 / IDENTITY — ABOUT */}
      <About />

      {/* 03 / STACK — SKILLS */}
      <Skills />

      {/* 04 / SERVICES — PROJECTS */}
      <Projects />

      {/* 05 / HISTORY — EDUCATION */}
      <SectionShell
        id="history"
        nodeNumber="05"
        nodeLabel="HISTORY"
        title="Education & Experience"
        subtitle="Vertical timeline of academic credentials"
      >
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>B.Tech in Computer Science and Engineering</h3>
              <Badge variant="ok">2024 — 2028</Badge>
            </div>
            <p className={styles.cardDesc}>
              JK Lakshmipat University, Jaipur · Current Student
            </p>
          </div>
        </div>
      </SectionShell>

      {/* 06 / PROOF — CERTIFICATIONS */}
      <SectionShell
        id="proof"
        nodeNumber="06"
        nodeLabel="PROOF"
        title="Certifications & Achievements"
        subtitle="Verified credentials and technical achievements"
      >
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className="mono-label">VERIFIED CREDENTIALS</span>
              <Port active />
            </div>
            <p className={styles.cardDesc}>
              Verified certificates and hackathon awards will be populated as confirmed. Only genuine achievements are showcased.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* 07 / RESPONSE — CONTACT */}
      <SectionShell
        id="response"
        nodeNumber="07"
        nodeLabel="RESPONSE"
        title="Contact"
        subtitle="Send a real-time message through the Express & MongoDB backend"
      >
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className="mono-label">SEND A REQUEST (201 CREATED)</span>
              <Port active />
            </div>
            <p className={styles.cardDesc}>
              Direct pipeline to MongoDB Atlas with server rate-limiting, Zod input validation, and optional SMTP notification.
            </p>
            <div className={styles.heroActions}>
              <Button variant="primary">
                Open Contact Form
              </Button>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
