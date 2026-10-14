import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, '..');

async function checkContent() {
  console.log('\n========================================');
  console.log('   PORTFOLIO CONTENT & PLACEHOLDER AUDIT');
  console.log('========================================\n');

  // Load data modules
  const profileMod = await import('../src/data/profile.js');
  const skillsMod = await import('../src/data/skills.js');
  const projectsMod = await import('../src/data/projects.js');
  const timelineMod = await import('../src/data/timeline.js');
  const certsMod = await import('../src/data/certifications.js');

  const profile = profileMod.profile || profileMod.default;
  const skills = skillsMod.skills || skillsMod.default;
  const projects = projectsMod.projects || projectsMod.default;
  const timeline = timelineMod.timeline || timelineMod.default;
  const certs = certsMod.certifications || certsMod.default?.certifications || [];
  const achievements = certsMod.achievements || certsMod.default?.achievements || [];

  const placeholders = [];
  const replaceMarkers = [];

  // Deep inspection helper
  function inspect(obj, pathStr) {
    if (!obj || typeof obj !== 'object') return;

    if (obj.placeholder === true) {
      placeholders.push({ path: pathStr, name: obj.name || obj.title || obj.id || 'unnamed' });
    }

    for (const [key, val] of Object.entries(obj)) {
      const currentPath = `${pathStr}.${key}`;
      if (typeof val === 'string') {
        if (val.toLowerCase().includes('replace')) {
          replaceMarkers.push({ path: currentPath, value: val });
        }
      } else if (typeof val === 'object' && val !== null) {
        inspect(val, currentPath);
      }
    }
  }

  inspect(profile, 'profile');
  inspect(skills, 'skills');
  inspect(projects, 'projects');
  inspect(timeline, 'timeline');
  inspect(certs, 'certifications');
  inspect(achievements, 'achievements');

  // 1. Report Placeholders
  console.log(`[1] Placeholders (placeholder: true) Found: ${placeholders.length}`);
  if (placeholders.length > 0) {
    placeholders.forEach((p) => {
      console.log(`    - ${p.path}: "${p.name}"`);
    });
  } else {
    console.log('    ✓ No placeholder: true entries found.');
  }

  // 2. Report Replace Markers
  console.log(`\n[2] "Replace" Markers Found: ${replaceMarkers.length}`);
  if (replaceMarkers.length > 0) {
    replaceMarkers.forEach((r) => {
      console.log(`    - ${r.path}: "${r.value}"`);
    });
  } else {
    console.log('    ✓ No "replace" text markers found.');
  }

  // 3. Projects Count
  const realProjects = Array.isArray(projects)
    ? projects.filter((p) => p && !p.placeholder)
    : [];
  console.log(`\n[3] Real Projects Count: ${realProjects.length}`);
  if (realProjects.length < 3) {
    console.warn(`    ⚠️  WARNING: Only ${realProjects.length} real project(s) present (minimum required is 3).`);
    console.warn('        Add 2 more real projects or replace placeholders in src/data/projects.js.');
  } else {
    console.log(`    ✓ Meets project quota: ${realProjects.length} real project(s).`);
  }

  // 4. CV Files Check
  const cvDir = path.join(clientRoot, 'public', 'cv');
  const pdfPath = path.join(cvDir, 'Vishal_Sharma_CV.pdf');
  const docxPath = path.join(cvDir, 'Vishal_Sharma_CV.docx');

  const hasPdf = fs.existsSync(pdfPath);
  const hasDocx = fs.existsSync(docxPath);

  console.log('\n[4] Downloadable CV Files (public/cv/):');
  console.log(`    - Vishal_Sharma_CV.pdf:  ${hasPdf ? '✓ Present' : '❌ MISSING'}`);
  console.log(`    - Vishal_Sharma_CV.docx: ${hasDocx ? '✓ Present' : '❌ MISSING'}`);

  if (!hasPdf || !hasDocx) {
    console.warn('    ⚠️  WARNING: One or both CV files are missing from public/cv/.');
    console.warn('        Run "npm run generate:cv" or place your designed CV files in client/public/cv/.');
  }

  console.log('\n========================================\n');
}

checkContent().catch((err) => {
  console.error('Error running content check:', err);
  process.exit(1);
});
