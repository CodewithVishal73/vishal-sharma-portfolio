import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../sections/Hero/Hero.jsx';
import About from '../sections/About/About.jsx';
import Skills from '../sections/Skills/Skills.jsx';
import Projects from '../sections/Projects/Projects.jsx';
import Timeline from '../sections/Timeline/Timeline.jsx';
import Certifications from '../sections/Certifications/Certifications.jsx';
import Contact from '../sections/Contact/Contact.jsx';
import styles from './Home.module.css';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  }, []);

  const handleSelectSkill = (skillOrTag) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!skillOrTag || skillOrTag === 'All') {
      nextParams.delete('tag');
      nextParams.delete('filter');
    } else {
      nextParams.set('tag', skillOrTag);
      nextParams.delete('filter');
    }
    setSearchParams(nextParams, { replace: true, preventScrollReset: true });

    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* 01 / CLIENT — HERO */}
      <Hero />

      {/* 02 / IDENTITY — ABOUT */}
      <About />

      {/* 03 / STACK — SKILLS */}
      <Skills onSelectSkill={handleSelectSkill} />

      {/* 04 / SERVICES — PROJECTS */}
      <Projects />

      {/* 05 / HISTORY — EDUCATION & EXPERIENCE */}
      <Timeline />

      {/* 06 / PROOF — CERTIFICATIONS & ACHIEVEMENTS */}
      <Certifications />

      {/* 07 / RESPONSE — CONTACT */}
      <Contact />
    </div>
  );
}
