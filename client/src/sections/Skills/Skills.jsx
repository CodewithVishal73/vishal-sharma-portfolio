import React from 'react';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import SkillPanel, { SkillSubSection } from '../../components/SkillPanel/SkillPanel.jsx';
import TechCard from '../../components/TechCard/TechCard.jsx';
import { skillsData } from '../../data/skills.js';
import styles from './Skills.module.css';

export default function Skills({ onSelectSkill }) {
  return (
    <SectionShell
      id="stack"
      nodeNumber="03"
      nodeLabel="STACK"
      title="Skills & Architecture"
      subtitle="Verifiable technical breadth across client, server, database, applied AI, and developer toolchain."
    >
      <div className={styles.panelsContainer}>
        {/* Panel 1: Frontend */}
        <SkillPanel
          title={skillsData.frontend.title}
          nodeLabel={skillsData.frontend.nodeLabel}
          description={skillsData.frontend.description}
        >
          <div className={styles.cardsGrid}>
            {skillsData.frontend.items.map((skill) => (
              <TechCard key={skill.id} skill={skill} onSelectSkill={onSelectSkill} />
            ))}
          </div>
        </SkillPanel>

        {/* Panel 2: Backend */}
        <SkillPanel
          title={skillsData.backend.title}
          nodeLabel={skillsData.backend.nodeLabel}
          description={skillsData.backend.description}
        >
          <div className={styles.backendSubRows}>
            {skillsData.backend.subgroups.map((subgroup) => (
              <SkillSubSection key={subgroup.id} heading={subgroup.title}>
                {subgroup.items.map((skill) => (
                  <TechCard key={skill.id} skill={skill} onSelectSkill={onSelectSkill} />
                ))}
              </SkillSubSection>
            ))}
          </div>
        </SkillPanel>

        {/* Panel 3: Applied AI & Intelligent Systems */}
        <SkillPanel
          title={skillsData.ai.title}
          nodeLabel={skillsData.ai.nodeLabel}
          description={skillsData.ai.description}
        >
          <div className={styles.cardsGrid}>
            {skillsData.ai.items.map((skill) => (
              <TechCard key={skill.id} skill={skill} onSelectSkill={onSelectSkill} />
            ))}
          </div>
        </SkillPanel>

        {/* Panel 4: Tools & Technologies */}
        <SkillPanel
          title={skillsData.tools.title}
          nodeLabel={skillsData.tools.nodeLabel}
          description={skillsData.tools.description}
        >
          <div className={styles.backendSubRows}>
            {skillsData.tools.subgroups.map((subgroup) => (
              <SkillSubSection key={subgroup.id} heading={subgroup.title}>
                {subgroup.items.map((skill) => (
                  <TechCard key={skill.id} skill={skill} onSelectSkill={onSelectSkill} />
                ))}
              </SkillSubSection>
            ))}
          </div>
        </SkillPanel>
      </div>
    </SectionShell>
  );
}
