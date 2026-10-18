import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, '../../docs/screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Find Chrome/Edge or default browser
function getBrowserLaunchOptions() {
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return { executablePath: p, headless: true };
    }
  }
  return { headless: true };
}

const VIEWPORTS = [
  { name: '320x568', width: 320, height: 568, isTouch: true, isMobile: true },
  { name: '360x740', width: 360, height: 740, isTouch: true, isMobile: true },
  { name: '390x844', width: 390, height: 844, isTouch: true, isMobile: true },
  { name: '412x915', width: 412, height: 915, isTouch: true, isMobile: true },
  { name: '768x1024', width: 768, height: 1024, isTouch: true, isMobile: false },
  { name: '820x1180', width: 820, height: 1180, isTouch: true, isMobile: false },
  { name: '1024x768', width: 1024, height: 768, isTouch: false, isMobile: false },
  { name: '1280x720', width: 1280, height: 720, isTouch: false, isMobile: false },
  { name: '1440x900', width: 1440, height: 900, isTouch: false, isMobile: false },
  { name: '1920x1080', width: 1920, height: 1080, isTouch: false, isMobile: false },
  { name: '844x390-landscape', width: 844, height: 390, isTouch: true, isMobile: true },
];

const ROUTES = [
  { path: '/', slug: 'home' },
  { path: '/projects/seller-lens-iq', slug: 'project-seller-lens-iq' },
  { path: '/projects/clinic-saas', slug: 'project-clinic-saas' },
  { path: '/projects/vaani-bill', slug: 'project-vaani-bill' },
  { path: '/not-found-page-test', slug: '404' },
];

const THEMES = ['dark', 'light'];
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

async function run() {
  console.log(`\n========================================`);
  console.log(`Starting Responsive & Visual QA Checks`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`========================================\n`);

  const launchOpts = getBrowserLaunchOptions();
  const browser = await chromium.launch(launchOpts);

  let totalCombinations = 0;
  let totalOverflows = 0;
  let totalTouchTargetIssues = 0;
  let totalTextIssues = 0;
  let totalInputZoomIssues = 0;
  let totalClippedHeadings = 0;
  let totalConsoleErrors = 0;

  const results = [];

  for (const route of ROUTES) {
    for (const theme of THEMES) {
      for (const vp of VIEWPORTS) {
        totalCombinations++;
        const comboKey = `${route.slug}_${vp.name}_${theme}`;
        process.stdout.write(`Testing [${comboKey}]... `);

        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: 1,
        });

        const page = await context.newPage();
        const consoleErrors = [];
        const failedRequests = [];

        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        page.on('requestfailed', (req) => {
          // Ignore favicon or optional resource failures
          if (!req.url().includes('favicon')) {
            failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText}`);
          }
        });

        try {
          await page.goto(`${BASE_URL}${route.path}`, {
            waitUntil: 'networkidle',
            timeout: 15000,
          });

          // Set theme explicitly
          await page.evaluate((t) => {
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem('theme', t);
          }, theme);

          await page.waitForTimeout(300);

          // Evaluation script inside browser page
          const audit = await page.evaluate((options) => {
            const { isTouch, isMobile, width } = options;
            const issues = {
              overflow: false,
              overflowingElements: [],
              smallTouchTargets: [],
              smallText: [],
              smallInputs: [],
              clippedHeadings: [],
              imagesWithoutDimensions: [],
            };

            const docWidth = document.documentElement.scrollWidth;
            const winWidth = window.innerWidth;
            if (docWidth > winWidth + 1) {
              issues.overflow = true;
              // Find overflowing elements
              const allElements = document.querySelectorAll('*');
              allElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.right > winWidth + 2) {
                  const tag = el.tagName.toLowerCase();
                  const cls = el.className && typeof el.className === 'string' ? `.${el.className.split(' ').join('.')}` : '';
                  const id = el.id ? `#${el.id}` : '';
                  issues.overflowingElements.push({
                    selector: `${tag}${id}${cls}`.slice(0, 100),
                    right: Math.round(rect.right),
                    winWidth,
                  });
                }
              });
            }

            // Interactive element size check on touch viewports (width <= 820)
            if (isTouch) {
              const interactiveSelectors = 'button, a[href], input, select, textarea, [role="button"], [tabindex="0"]';
              const interactives = document.querySelectorAll(interactiveSelectors);
              interactives.forEach((el) => {
                // Ignore hidden or zero-size elements
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0 || window.getComputedStyle(el).display === 'none' || window.getComputedStyle(el).visibility === 'hidden') {
                  return;
                }
                // Exclude inline text links within paragraphs and breadcrumbs if height is text height
                const isInlineLink = el.tagName === 'A' && el.closest('p');
                if (isInlineLink) return;

                // Threshold: width and height should ideally be >= 44x44 or at least touchable
                if (rect.width < 32 || rect.height < 32) {
                  const tag = el.tagName.toLowerCase();
                  const text = (el.innerText || el.getAttribute('aria-label') || '').slice(0, 30).trim();
                  issues.smallTouchTargets.push({
                    selector: tag,
                    text,
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                  });
                }
              });
            }

            // Input font size on mobile (prevent iOS zoom)
            if (isMobile) {
              const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, select');
              inputs.forEach((el) => {
                const fz = parseFloat(window.getComputedStyle(el).fontSize);
                if (fz < 16) {
                  issues.smallInputs.push({
                    tag: el.tagName.toLowerCase(),
                    name: el.name || el.id || 'unnamed',
                    fontSize: fz,
                  });
                }
              });
            }

            // Clipped headings
            const headings = document.querySelectorAll('h1, h2, h3, h4');
            headings.forEach((h) => {
              const rect = h.getBoundingClientRect();
              if (h.scrollWidth > rect.width + 2) {
                issues.clippedHeadings.push({
                  text: h.innerText.slice(0, 40),
                  scrollWidth: h.scrollWidth,
                  width: Math.round(rect.width),
                });
              }
            });

            return issues;
          }, { isTouch: vp.isTouch, isMobile: vp.isMobile, width: vp.width });

          // Take screenshot
          const screenshotName = `${route.slug}_${vp.name}_${theme}.png`;
          const screenshotPath = path.join(screenshotsDir, screenshotName);
          await page.screenshot({ path: screenshotPath, fullPage: true });

          const hasOverflow = audit.overflow;
          if (hasOverflow) {
            totalOverflows++;
            console.log(`❌ OVERFLOW (${audit.overflowingElements.length} elements)`);
          } else if (consoleErrors.length > 0) {
            totalConsoleErrors += consoleErrors.length;
            console.log(`⚠️ Console errors: ${consoleErrors.length}`);
          } else {
            console.log(`✓ OK`);
          }

          results.push({
            combo: comboKey,
            route: route.path,
            viewport: vp.name,
            theme,
            audit,
            consoleErrors,
            failedRequests,
            screenshotPath,
          });

        } catch (err) {
          console.log(`❌ FAILED TO RUN: ${err.message}`);
          results.push({
            combo: comboKey,
            error: err.message,
          });
        } finally {
          await context.close();
        }
      }
    }
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`Audit Summary`);
  console.log(`========================================`);
  console.log(`Total combinations tested: ${totalCombinations}`);
  console.log(`Total overflow failures: ${totalOverflows}`);
  console.log(`Total console errors: ${totalConsoleErrors}`);
  console.log(`Screenshots saved in: docs/screenshots/`);

  // Write JSON report
  const reportPath = path.resolve(__dirname, '../../docs/responsive-audit.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`Detailed audit report written to: ${reportPath}\n`);

  if (totalOverflows > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('Fatal error during responsive audit:', err);
  process.exit(1);
});
