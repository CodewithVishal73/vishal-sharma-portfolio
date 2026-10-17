import React, { useState, useRef, useMemo, useEffect } from 'react';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import SkillPanel, { SkillSubSection } from '../../components/SkillPanel/SkillPanel.jsx';
import TechCard from '../../components/TechCard/TechCard.jsx';
import TechInspector from '../../components/TechCard/TechInspector.jsx';
import RelationLines from '../../components/RelationLines/RelationLines.jsx';
import { skillsData, getRelatedSkillIds, getSkillById } from '../../data/skills.js';
import styles from './Skills.module.css';

export default function Skills() {
  const [activeSkillId, setActiveSkillId] = useState(null);
  const containerRef = useRef(null);
  const cardRefs = useRef({});

  const activeSkill = useMemo(() => {
    return getSkillById(activeSkillId);
  }, [activeSkillId]);

  const relatedSkillIds = useMemo(() => {
    return getRelatedSkillIds(activeSkillId);
  }, [activeSkillId]);

  const registerCardRef = (id, el) => {
    if (el) {
      cardRefs.current[id] = el;
    }
  };

  const isCardRelated = (id) => relatedSkillIds.includes(id);
  const isCardDimmed = (id) =>
    Boolean(activeSkillId && activeSkillId !== id && !relatedSkillIds.includes(id));

  // Global Esc key listener to clear active selection
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveSkillId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SectionShell
      id="stack"
      nodeNumber="03"
      nodeLabel="STACK"
      title="Skills & Architecture"
      subtitle="Verifiable technical breadth across client, server, toolchain, and AI integration."
    >
      <div ref={containerRef} className={styles.panelsContainer}>
        {/* SVG connector lines between related skills on desktop (>=1024px) */}
        <RelationLines
          activeSkillId={activeSkillId}
          relatedSkillIds={relatedSkillIds}
          cardRefs={cardRefs}
          containerRef={containerRef}
        />

        {/* Panel 1: Frontend */}
        <SkillPanel
          title={skillsData.frontend.title}
          nodeLabel={skillsData.frontend.nodeLabel}
          description={skillsData.frontend.description}
        >
          <div className={styles.cardsGrid}>
            {skillsData.frontend.items.map((skill, index) => (
              <TechCard
                key={skill.id}
                ref={(el) => registerCardRef(skill.id, el)}
                skill={skill}
                delay={index * 0.05}
                isHovered={activeSkillId === skill.id}
                isRelated={isCardRelated(skill.id)}
                isDimmed={isCardDimmed(skill.id)}
                onHover={(s) => setActiveSkillId(s.id)}
                onLeave={() => {}}
                onClick={(s) =>
                  setActiveSkillId((prev) => (prev === s.id ? null : s.id))
                }
              />
            ))}
          </div>

          <TechInspector
            activeSkill={activeSkill?.group === 'frontend' ? activeSkill : null}
            onClear={() => setActiveSkillId(null)}
            onSelectSkill={(id) => setActiveSkillId(id)}
          />
        </SkillPanel>

        {/* Panel 2: Backend */}
        <SkillPanel
          title={skillsData.backend.title}
          nodeLabel={skillsData.backend.nodeLabel}
          description={skillsData.backend.description}
        >
          <div className={styles.backendSubRows}>
            {skillsData.backend.subgroups.map((subgroup, gIdx) => (
              <SkillSubSection key={subgroup.id} heading={subgroup.title}>
                {subgroup.items.map((skill, index) => (
                  <TechCard
                    key={skill.id}
                    ref={(el) => registerCardRef(skill.id, el)}
                    skill={skill}
                    delay={(gIdx * 3 + index) * 0.04}
                    isHovered={activeSkillId === skill.id}
                    isRelated={isCardRelated(skill.id)}
                    isDimmed={isCardDimmed(skill.id)}
                    onHover={(s) => setActiveSkillId(s.id)}
                    onLeave={() => {}}
                    onClick={(s) =>
                      setActiveSkillId((prev) => (prev === s.id ? null : s.id))
                    }
                  />
                ))}
              </SkillSubSection>
            ))}
          </div>

          <TechInspector
            activeSkill={activeSkill?.group === 'backend' ? activeSkill : null}
            onClear={() => setActiveSkillId(null)}
            onSelectSkill={(id) => setActiveSkillId(id)}
          />
        </SkillPanel>

        {/* Panel 3: Tools & Technologies */}
        <SkillPanel
          title={skillsData.tools.title}
          nodeLabel={skillsData.tools.nodeLabel}
          description={skillsData.tools.description}
        >
          <div className={styles.backendSubRows}>
            {skillsData.tools.subgroups.map((subgroup, gIdx) => (
              <SkillSubSection key={subgroup.id} heading={subgroup.title}>
                {subgroup.items.map((skill, index) => (
                  <TechCard
                    key={skill.id}
                    ref={(el) => registerCardRef(skill.id, el)}
                    skill={skill}
                    delay={(gIdx * 4 + index) * 0.04}
                    isHovered={activeSkillId === skill.id}
                    isRelated={isCardRelated(skill.id)}
                    isDimmed={isCardDimmed(skill.id)}
                    onHover={(s) => setActiveSkillId(s.id)}
                    onLeave={() => {}}
                    onClick={(s) =>
                      setActiveSkillId((prev) => (prev === s.id ? null : s.id))
                    }
                  />
                ))}
              </SkillSubSection>
            ))}
          </div>

          <TechInspector
            activeSkill={activeSkill?.group === 'tools' ? activeSkill : null}
            onClear={() => setActiveSkillId(null)}
            onSelectSkill={(id) => setActiveSkillId(id)}
          />
        </SkillPanel>
      </div>
    </SectionShell>
  );
}
