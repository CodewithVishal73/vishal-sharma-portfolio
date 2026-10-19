import React, { useEffect } from 'react';
import Projects from '../sections/Projects/Projects.jsx';
import NodeNav from '../components/NodeNav/NodeNav.jsx';
import { getSectionById, getAdjacentSections } from '../data/sections.js';

export default function ProjectsPage() {
  const section = getSectionById('services');
  const { prev, next } = getAdjacentSections('services');

  useEffect(() => {
    document.title = 'Services & Projects · Vishal Sharma | Portfolio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-shell" style={{ padding: 'clamp(24px, 4vw, 48px) 0' }}>
      <Projects />
      <NodeNav
        prev={prev}
        next={next}
        currentNum={section.num}
        currentLabel={section.nodeLabel}
      />
    </div>
  );
}
