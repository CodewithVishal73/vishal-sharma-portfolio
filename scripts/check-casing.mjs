import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const gitFiles = new Set(
  execSync('git ls-files', { encoding: 'utf8' })
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean)
);

function getExactFilePath(filePath) {
  // Normalize to POSIX relative path
  return filePath.replace(/\\/g, '/');
}

const sourceExtensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.css'];
let casingErrors = 0;
let checkedImports = 0;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        scanDir(fullPath);
      }
    } else if (sourceExtensions.some((ext) => entry.name.endsWith(ext))) {
      checkFileImports(fullPath);
    }
  }
}

function checkFileImports(file) {
  const content = fs.readFileSync(file, 'utf8');
  // Match `import ... from '...'` and `@import '...'`
  const importRegex = /(?:import\s+(?:[\w*\s{},]*\s+from\s+)?['"]([^'"]+)['"]|@import\s+['"]([^'"]+)['"])/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importSpecifier = match[1] || match[2];
    if (importSpecifier.startsWith('.')) {
      checkedImports++;
      const dir = path.dirname(file);
      const resolved = path.resolve(dir, importSpecifier);

      // Candidate resolutions: exact, or with .jsx, .js, .mjs, /index.js, /index.jsx
      const candidates = [
        resolved,
        resolved + '.jsx',
        resolved + '.js',
        resolved + '.mjs',
        resolved + '.css',
        path.join(resolved, 'index.jsx'),
        path.join(resolved, 'index.js'),
      ];

      let found = null;
      for (const cand of candidates) {
        if (fs.existsSync(cand)) {
          found = cand;
          break;
        }
      }

      if (found) {
        // Check case against actual fs entry
        const relativeToRoot = path.relative(process.cwd(), found).replace(/\\/g, '/');
        if (!gitFiles.has(relativeToRoot)) {
          // Check if it exists with different case in git
          const lowerMap = new Map();
          for (const gf of gitFiles) {
            lowerMap.set(gf.toLowerCase(), gf);
          }
          const lower = relativeToRoot.toLowerCase();
          if (lowerMap.has(lower) && lowerMap.get(lower) !== relativeToRoot) {
            console.error(
              `[CASING ERROR] in ${file}:\n  Import "${importSpecifier}" resolved to "${relativeToRoot}"\n  Actual git file is "${lowerMap.get(lower)}"`
            );
            casingErrors++;
          }
        }
      } else {
        console.error(`[UNRESOLVED IMPORT] in ${file}: "${importSpecifier}"`);
        casingErrors++;
      }
    }
  }
}

scanDir(path.resolve('client/src'));
scanDir(path.resolve('server/src'));

console.log(`\nCasing audit complete: checked ${checkedImports} relative imports.`);
if (casingErrors === 0) {
  console.log('✓ PASS: All imports match git and filesystem casing exactly.');
  process.exit(0);
} else {
  console.error(`✗ FAIL: Found ${casingErrors} casing/resolution errors.`);
  process.exit(1);
}
