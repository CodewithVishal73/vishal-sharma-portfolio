import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../sections/Hero/Hero.jsx';
import About from '../sections/About/About.jsx';
import Skills from '../sections/Skills/Skills.jsx';
import Intelligence from '../sections/Intelligence/Intelligence.jsx';
import Projects from '../sections/Projects/Projects.jsx';
import Timeline from '../sections/Timeline/Timeline.jsx';
import Certifications from '../sections/Certifications/Certifications.jsx';
import Contact from '../sections/Contact/Contact.jsx';
import styles from './Home.module.css';

export default function Home() {
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* 01 / CLIENT — HERO */}
      <Hero />

      {/* 02 / IDENTITY — ABOUT */}
      <About />

      {/* 03 / STACK — SKILLS */}
      <Skills />

      {/* 04 / INTELLIGENCE — INTELLIGENT SYSTEMS LAYER */}
      <Intelligence />

      {/* 05 / SERVICES — PROJECTS */}
      <Projects />

      {/* 06 / HISTORY — EDUCATION & EXPERIENCE */}
      <Timeline />

      {/* 07 / PROOF — CERTIFICATIONS & ACHIEVEMENTS */}
      <Certifications />

      {/* 08 / RESPONSE — CONTACT */}
      <Contact />
    </div>
  );
}
