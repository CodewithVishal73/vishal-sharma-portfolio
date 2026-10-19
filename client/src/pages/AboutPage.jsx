import React, { useEffect } from 'react';
import About from '../sections/About/About.jsx';
import NodeNav from '../components/NodeNav/NodeNav.jsx';
import { getSectionById, getAdjacentSections } from '../data/sections.js';

export default function AboutPage() {
  const section = getSectionById('identity');
  const { prev, next } = getAdjacentSections('identity');

  useEffect(() => {
    document.title = 'Identity · Vishal Sharma | Portfolio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-shell" style={{ padding: 'clamp(24px, 4vw, 48px) 0' }}>
      <About />
      <NodeNav
        prev={prev}
        next={next}
        currentNum={section.num}
        currentLabel={section.nodeLabel}
      />
    </div>
  );
}
