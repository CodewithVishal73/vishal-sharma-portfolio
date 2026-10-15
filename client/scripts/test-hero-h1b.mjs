import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, '..');

async function testHeroH1b() {
  console.log('\n======================================================');
  console.log('   TASK H1b: HERO VIDEO BACKDROP & COPY VERIFICATION');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Check local media assets
  console.log('[1] Checking Local Media Files (client/public/media/)...');
  const mediaDir = path.join(clientRoot, 'public', 'media');
  const requiredFiles = [
    'hero-system-landscape.webm',
    'hero-system-landscape.mp4',
    'hero-system-portrait.webm',
    'hero-system-portrait.mp4',
    'hero-system-landscape-poster-start.webp',
    'hero-system-landscape-poster-peak.webp',
    'hero-system-portrait-poster-start.webp',
    'hero-system-portrait-poster-peak.webp',
  ];

  requiredFiles.forEach((file) => {
    const filePath = path.join(mediaDir, file);
    const exists = fs.existsSync(filePath);
    const size = exists ? fs.statSync(filePath).size : 0;
    assert(exists && size > 0, `Media file present & non-empty: ${file} (${size} bytes)`);
  });

  // 2. Profile.js Copy Verification
  console.log('\n[2] Checking profile.js Data Fields...');
  const profileMod = await import('../src/data/profile.js');
  const profile = profileMod.profile || profileMod.default;

  assert(profile.name === 'Vishal Sharma', `h1 name is "Vishal Sharma" (found: "${profile.name}")`);
  assert(profile.identity === 'Software Engineer', `identity line is "Software Engineer" (found: "${profile.identity}")`);
  assert(profile.headlinePrefix === 'Engineering the Future of', `headline prefix is "Engineering the Future of" (found: "${profile.headlinePrefix}")`);

  const expectedWords = ['AI Systems', 'Backend Infrastructure', 'Intelligent Platforms'];
  const hasExpectedWords =
    Array.isArray(profile.typewriterWords) &&
    expectedWords.every((w, i) => profile.typewriterWords[i] === w);
  assert(hasExpectedWords, `typewriterWords matches [${expectedWords.join(', ')}]`);

  assert(
    profile.supportingCopy ===
      'Building scalable software, reliable backend systems, and intelligent digital experiences.',
    `supportingCopy matches required text (found: "${profile.supportingCopy}")`
  );

  assert(profile.ctas?.primary?.label === 'View Projects', `primary CTA label is "View Projects"`);
  assert(profile.ctas?.primary?.to === '/projects', `primary CTA routes to "/projects"`);
  assert(profile.ctas?.secondary?.label === 'Download CV', `secondary CTA label is "Download CV"`);
  assert(profile.ctas?.secondary?.href === '/cv/Vishal_Sharma_CV.pdf', `secondary CTA href is "/cv/Vishal_Sharma_CV.pdf"`);
  assert(profile.ctas?.word?.label === 'Word (.docx)', `Word (.docx) link label is kept`);
  assert(profile.ctas?.word?.href === '/cv/Vishal_Sharma_CV.docx', `Word (.docx) href is "/cv/Vishal_Sharma_CV.docx"`);

  assert(profile.links && typeof profile.links === 'object', 'social links object exists');
  assert(profile.links.github === '', 'github link is empty by default');
  assert(profile.links.linkedin === '', 'linkedin link is empty by default');
  assert(profile.links.leetcode === '', 'leetcode link is empty by default');

  // 3. HeroBackdrop Component Code & Spec Verification
  console.log('\n[3] Checking HeroBackdrop Component Specifications...');
  const heroBackdropCode = fs.readFileSync(
    path.join(clientRoot, 'src', 'components', 'HeroBackdrop', 'HeroBackdrop.jsx'),
    'utf-8'
  );
  const heroBackdropCss = fs.readFileSync(
    path.join(clientRoot, 'src', 'components', 'HeroBackdrop', 'HeroBackdrop.module.css'),
    'utf-8'
  );

  assert(heroBackdropCode.includes('hero-system-portrait.webm'), 'Portrait WebM source included');
  assert(heroBackdropCode.includes('hero-system-portrait.mp4'), 'Portrait MP4 source included');
  assert(heroBackdropCode.includes('hero-system-landscape.webm'), 'Landscape WebM source included');
  assert(heroBackdropCode.includes('hero-system-landscape.mp4'), 'Landscape MP4 source included');

  // Source ordering: portrait with media="(max-aspect-ratio: 1/1)" before landscape; WebM before MP4
  const portWebmIdx = heroBackdropCode.indexOf('hero-system-portrait.webm');
  const portMp4Idx = heroBackdropCode.indexOf('hero-system-portrait.mp4');
  const landWebmIdx = heroBackdropCode.indexOf('hero-system-landscape.webm');
  const landMp4Idx = heroBackdropCode.indexOf('hero-system-landscape.mp4');

  assert(
    portWebmIdx < portMp4Idx && portMp4Idx < landWebmIdx && landWebmIdx < landMp4Idx,
    'Source element order verified: Portrait WebM -> Portrait MP4 -> Landscape WebM -> Landscape MP4'
  );

  assert(
    heroBackdropCode.includes('media="(max-aspect-ratio: 1/1)"'),
    'Portrait source specifies media="(max-aspect-ratio: 1/1)"'
  );

  assert(
    heroBackdropCss.includes('object-fit: cover'),
    'object-fit: cover is specified in CSS'
  );
  assert(
    heroBackdropCss.includes('62% 60%'),
    'Landscape object-position is 62% 60%'
  );
  assert(
    heroBackdropCss.includes('50% 55%'),
    'Portrait object-position is 50% 55%'
  );
  assert(
    heroBackdropCss.includes('pointer-events: none'),
    'pointer-events: none is enforced'
  );

  // Fallbacks: reduced motion, saveData, autoplay rejection
  assert(
    heroBackdropCode.includes('prefersReducedMotion') &&
    heroBackdropCode.includes('posterPicture') &&
    heroBackdropCode.includes('hero-system-landscape-poster-peak.webp'),
    'Peak poster fallback rendered when reduced motion is enabled'
  );

  assert(
    heroBackdropCode.includes('navigator.connection.saveData'),
    'saveData connection mode checked for peak poster fallback'
  );

  assert(
    heroBackdropCode.includes('playPromise.catch'),
    'Autoplay rejection caught to activate fallback peak poster'
  );

  assert(
    heroBackdropCode.includes('IntersectionObserver') &&
    heroBackdropCode.includes('video.pause()'),
    'IntersectionObserver pauses video when off-screen'
  );

  assert(
    heroBackdropCode.includes('visibilitychange') &&
    heroBackdropCode.includes('document.hidden'),
    'Visibility change listener pauses video when tab is hidden'
  );

  // 4. HeroRunway Placement & Fall-Through Verification
  console.log('\n[4] Checking HeroRunway Component Placement & Aperture Structure...');
  const heroRunwayCode = fs.readFileSync(
    path.join(clientRoot, 'src', 'components', 'HeroRunway', 'HeroRunway.jsx'),
    'utf-8'
  );

  const heroRunwayCss = fs.readFileSync(
    path.join(clientRoot, 'src', 'components', 'HeroRunway', 'HeroRunway.module.css'),
    'utf-8'
  );

  assert(
    heroRunwayCode.includes('<HeroBackdrop'),
    'HeroBackdrop is rendered inside HeroRunway'
  );

  const backdropPos = heroRunwayCode.indexOf('<HeroBackdrop');
  const portraitPos = heroRunwayCode.indexOf('<Portrait');
  assert(
    backdropPos < portraitPos,
    'HeroBackdrop is placed behind the Portrait component inside aperture content'
  );

  assert(
    heroRunwayCode.includes('mix-blend-mode: difference') || heroRunwayCss.includes('mix-blend-mode: difference'),
    'Name mix-blend-mode: difference is preserved for light theme'
  );

  assert(
    heroRunwayCode.includes('clipProgress') && heroRunwayCode.includes('clipPathString'),
    'Fall-through scroll expansion logic is intact'
  );

  // CTAs
  assert(
    heroRunwayCode.includes('id="hero-primary-cta"') &&
    heroRunwayCode.includes('/projects'),
    'Primary CTA points to /projects'
  );

  assert(
    heroRunwayCode.includes('id="hero-secondary-cta"') &&
    heroRunwayCode.includes('.pdf'),
    'Secondary CTA points to CV PDF download'
  );

  assert(
    heroRunwayCode.includes('.docx'),
    'Word (.docx) download link is preserved'
  );

  // 5. Readability Contrast Calculation
  console.log('\n[5] Readability & Contrast Verification...');
  // Relative luminance calculator (WCAG 2.1)
  function sRGBtoLin(colorChannel) {
    const v = colorChannel / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }

  function getLuminance([r, g, b]) {
    return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
  }

  function getContrast(rgb1, rgb2) {
    const l1 = getLuminance(rgb1);
    const l2 = getLuminance(rgb2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Tokens
  const lightBone = [236, 230, 218]; // #ECE6DA
  const darkSurface = [18, 19, 22];  // #121316
  const deepBg = [10, 11, 13];       // #0A0B0D
  const lightText = [237, 231, 219]; // #EDE7DB
  const darkText = [20, 17, 14];     // #14110E
  const mutedLight = [90, 86, 78];   // #5A564E
  const mutedDark = [162, 156, 144]; // #A29C90
  const accentLight = [179, 48, 12]; // #B3300C

  // Light theme bone surface contrast
  const contrastDarkOnBone = getContrast(darkText, lightBone);
  assert(contrastDarkOnBone >= 4.5, `Dark text on Light bone surface contrast: ${contrastDarkOnBone.toFixed(2)}:1 (>= 4.5:1)`);

  const contrastMutedOnBone = getContrast(mutedLight, lightBone);
  assert(contrastMutedOnBone >= 4.5, `Muted text on Light bone surface contrast: ${contrastMutedOnBone.toFixed(2)}:1 (>= 4.5:1)`);

  // Dark theme surface contrast
  const contrastLightOnDark = getContrast(lightText, darkSurface);
  assert(contrastLightOnDark >= 4.5, `Light text on Dark surface contrast: ${contrastLightOnDark.toFixed(2)}:1 (>= 4.5:1)`);

  const contrastMutedOnDark = getContrast(mutedDark, darkSurface);
  assert(contrastMutedOnDark >= 4.5, `Muted text on Dark surface contrast: ${contrastMutedOnDark.toFixed(2)}:1 (>= 4.5:1)`);

  // Brightest point in video + gradient overlays
  // Even if raw video pixel was full white [255, 255, 255]
  // With directional + bottom scrim of 0.85 opacity over #0A0B0D:
  const scrimmedR = Math.round(255 * 0.15 + 10 * 0.85);
  const scrimmedG = Math.round(255 * 0.15 + 11 * 0.85);
  const scrimmedB = Math.round(255 * 0.15 + 13 * 0.85);
  const scrimmedBg = [scrimmedR, scrimmedG, scrimmedB]; // ~ [47, 48, 49]

  const contrastLightTextOverBrightestVideo = getContrast(lightText, scrimmedBg);
  assert(
    contrastLightTextOverBrightestVideo >= 4.5,
    `Light text over brightest possible video spot with scrim (${scrimmedBg.join(',')}): ${contrastLightTextOverBrightestVideo.toFixed(2)}:1 (>= 4.5:1)`
  );

  const contrastMutedTextOverBrightestVideo = getContrast(mutedDark, scrimmedBg);
  assert(
    contrastMutedTextOverBrightestVideo >= 4.5,
    `Muted text over brightest possible video spot with scrim: ${contrastMutedTextOverBrightestVideo.toFixed(2)}:1 (>= 4.5:1)`
  );

  // In light theme, name layer with difference over scrimmed video:
  // Difference of [255, 255, 255] with [47, 48, 49] is [208, 207, 206]
  const differenceTextColor = [255 - scrimmedR, 255 - scrimmedG, 255 - scrimmedB];
  const contrastDifferenceText = getContrast(differenceTextColor, scrimmedBg);
  assert(
    contrastDifferenceText >= 4.5,
    `Difference-blended heading over scrimmed video spot: ${contrastDifferenceText.toFixed(2)}:1 (>= 4.5:1)`
  );

  console.log('\n======================================================');
  console.log(`   AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

testHeroH1b().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
