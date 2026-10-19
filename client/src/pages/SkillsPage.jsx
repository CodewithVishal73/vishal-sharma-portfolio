import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Skills from '../sections/Skills/Skills.jsx';
import NodeNav from '../components/NodeNav/NodeNav.jsx';
import { getSectionById, getAdjacentSections } from '../data/sections.js';

export default function SkillsPage() {
  const navigate = useNavigate();
  const section = getSectionById('stack');
  const { prev, next } = getAdjacentSections('stack');

  useEffect(() => {
    document.title = 'Stack & Skills · Vishal Sharma | Portfolio';
    window.scrollTo(0, 0);
  }, []);

  const handleSelectSkill = (skillOrTag) => {
    if (!skillOrTag || skillOrTag === 'All') {
      navigate('/projects');
    } else {
      navigate(`/projects?tag=${encodeURIComponent(skillOrTag)}`);
    }
  };

  return (
    <div className="page-shell" style={{ padding: 'clamp(24px, 4vw, 48px) 0' }}>
      <Skills onSelectSkill={handleSelectSkill} />
      <NodeNav
        prev={prev}
        next={next}
        currentNum={section.num}
        currentLabel={section.nodeLabel}
      />
    </div>
  );
}
