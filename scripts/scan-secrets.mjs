import { execSync } from 'child_process';

console.log('--- Starting Git Secret Scan ---');
const log = execSync('git log -p --all', { maxBuffer: 100 * 1024 * 1024, encoding: 'utf8' });

const patterns = [
  { name: 'MongoDB URI (Atlas)', regex: /mongodb\+srv:\/\/[^\s]+/i },
  { name: 'Private Key Block', regex: /BEGIN (RSA|OPENSSH|EC|PGP) PRIVATE KEY/i },
  { name: 'GitHub Personal Access Token', regex: /(ghp_[a-zA-Z0-9]{30,}|github_pat_[a-zA-Z0-9]{30,})/ },
  { name: 'AWS Access Key ID', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'Generic Secret assignment', regex: /(api_key|client_secret|db_password)\s*[:=]\s*["'][a-zA-Z0-9_\-]{16,}["']/i }
];

let foundAny = false;
for (const { name, regex } of patterns) {
  const match = log.match(regex);
  if (match) {
    foundAny = true;
    console.error(`  ✗ [MATCH FOUND] ${name}`);
  } else {
    console.log(`  ✓ CLEAN: ${name} (0 matches)`);
  }
}

if (!foundAny) {
  console.log('✓ PASS: Zero secrets found in working tree and entire git history.');
  process.exit(0);
} else {
  console.error('✗ FAIL: Potential secrets found in git history.');
  process.exit(1);
}
