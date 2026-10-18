import mongoose from 'mongoose';
import http from 'http';
import app from '../src/app.js';
import Message from '../src/models/Message.js';

let server;
let baseUrl;
const savedDocs = [];

async function setup() {
  // Mock mongoose connection state for local test without external network download
  mongoose.connection.readyState = 1;
  mongoose.connection.db = {
    admin: () => ({
      ping: async () => ({ ok: 1 }),
    }),
  };

  // Mock Message model create for local unit test
  Message.create = async (data) => {
    const doc = {
      _id: { toString: () => `doc_${Date.now()}` },
      createdAt: new Date(),
      ...data,
    };
    savedDocs.push(doc);
    return doc;
  };

  server = http.createServer(app);
  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
}

async function teardown() {
  if (server) {
    await new Promise((r) => server.close(r));
  }
}

async function request(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, options);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { status: res.status, headers: res.headers, text, json };
}

async function runTests() {
  console.log('--- Starting Stage C Server Security & Validation Tests ---');
  await setup();
  let passCount = 0;
  let failCount = 0;

  function assert(condition, name) {
    if (condition) {
      console.log(`  ✓ PASS: ${name}`);
      passCount++;
    } else {
      console.error(`  ✗ FAIL: ${name}`);
      failCount++;
    }
  }

  try {
    // 1. Health check endpoint
    const health = await request('/api/health');
    assert(health.status === 200, 'Health check returns 200');
    assert(health.json && health.json.ok === true, 'Health check has ok: true');
    assert(health.json && health.json.db === 'connected', 'Health check reflects real Mongoose state: connected');
    assert(
      Object.keys(health.json).sort().join(',') === 'db,ok,status,ts,uptime',
      'Health check returns ONLY { ok, status, db, uptime, ts } with zero leaks'
    );

    // 2. Security headers (Helmet) and X-Powered-By disabled
    assert(!health.headers.get('x-powered-by'), 'x-powered-by header is absent');
    assert(health.headers.get('x-content-type-options') === 'nosniff', 'X-Content-Type-Options: nosniff present');

    // 3. Unknown route JSON 404
    const notFound = await request('/some/unknown/route');
    assert(notFound.status === 404, 'Unknown route returns 404');
    assert(notFound.json && notFound.json.error?.code === 'NOT_FOUND', 'Unknown route returns JSON with NOT_FOUND code');

    // 4. CORS verification
    // Allowed origin (http://localhost:5173 is in dev default)
    const corsAllowed = await request('/api/health', {
      headers: { Origin: 'http://localhost:5173' },
    });
    assert(
      corsAllowed.headers.get('access-control-allow-origin') === 'http://localhost:5173',
      'CORS allows configured origin'
    );

    // Disallowed origin
    const corsDisallowed = await request('/api/health', {
      headers: { Origin: 'https://evil-hacker.com' },
    });
    assert(
      corsDisallowed.status === 403 || !corsDisallowed.headers.get('access-control-allow-origin'),
      'CORS rejects disallowed origin'
    );

    // Missing origin (direct / server-to-server)
    const corsNoOrigin = await request('/api/health');
    assert(corsNoOrigin.status === 200, 'Missing Origin header is accepted for direct requests');

    // 5. Payload too large (10kb limit)
    const hugeBody = 'a'.repeat(12 * 1024);
    const oversize = await request('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email: 'test@example.com', message: hugeBody }),
    });
    assert(oversize.status === 413, 'Oversized JSON payload returns 413 Payload Too Large');

    // 6. Contact validation: Invalid email
    const invalidEmail = await request('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'invalid-email', message: 'Hello this is a valid message length' }),
    });
    assert(invalidEmail.status === 400, 'Invalid email returns 400');
    assert(invalidEmail.json?.error?.fields?.email !== undefined, 'Validation error details email field');

    // 7. Contact validation: Wrong types / NoSQL injection attempts (operator objects)
    const operatorObj = await request('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: { $gt: '' }, email: 'test@example.com', message: 'Legit message text here' }),
    });
    assert(operatorObj.status === 400, 'Operator object in string field is rejected with 400');

    // 8. Contact validation: Honeypot field triggers 201 without saving to database
    const countBeforeHoneypot = savedDocs.length;
    const honeypotRes = await request('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Spam Bot',
        email: 'bot@spam.com',
        message: 'This is spam message content',
        website: 'https://spam-link.com',
      }),
    });
    assert(honeypotRes.status === 201, 'Honeypot returns 201 success to spoofer');
    assert(savedDocs.length === countBeforeHoneypot, 'Honeypot does NOT save document to MongoDB');

    // 9. Contact valid submission
    const validRes = await request('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice Recruiter',
        email: 'alice@company.com',
        message: 'Hi Vishal, we were very impressed with your portfolio!',
      }),
    });
    assert(validRes.status === 201, 'Valid contact form returns 201 Created');
    assert(validRes.json?.ok === true && validRes.json?.id, 'Returns ok: true and generated document id');
    assert(savedDocs.length === countBeforeHoneypot + 1, 'Document correctly persisted in MongoDB model');

    // 10. Rate limiting test: send rapid requests to trigger 429
    let got429 = false;
    for (let i = 0; i < 7; i++) {
      const res = await request('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `User ${i}`,
          email: `user${i}@example.com`,
          message: 'Testing rate limit with repeated requests',
        }),
      });
      if (res.status === 429) {
        got429 = true;
        assert(res.json?.error?.code === 'RATE_LIMITED', 'Rate limited response has RATE_LIMITED error code');
        break;
      }
    }
    assert(got429, 'Rate limiter triggers 429 after 5 requests');

    // 11. CV routes
    const cvPdf = await request('/api/cv/pdf');
    assert(cvPdf.status === 200, 'GET /api/cv/pdf returns 200');
    assert(cvPdf.headers.get('content-type')?.includes('application/pdf'), 'CV PDF Content-Type is application/pdf');
    assert(
      cvPdf.headers.get('content-disposition')?.includes('Vishal_Sharma_CV.pdf'),
      'CV PDF Content-Disposition sets filename'
    );

    const cvDocx = await request('/api/cv/docx');
    assert(cvDocx.status === 200, 'GET /api/cv/docx returns 200');
    assert(
      cvDocx.headers.get('content-type')?.includes('wordprocessingml'),
      'CV DOCX Content-Type is Word document'
    );

    // CV path traversal attempt
    const cvTraversal = await request('/api/cv/../../package.json');
    assert(cvTraversal.status === 404, 'CV path traversal attempt returns 404');

    const cvUnsupported = await request('/api/cv/exe');
    assert(cvUnsupported.status === 404, 'Unsupported CV format returns 404');
  } finally {
    await teardown();
  }

  console.log('--- Stage C Security Test Summary ---');
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
