import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApiUrl } from './api.js';

test('buildApiUrl joins base and path cleanly', () => {
  // Base with trailing slash
  assert.equal(
    buildApiUrl('/api/contact', 'https://host/'),
    'https://host/api/contact'
  );

  // Base without trailing slash
  assert.equal(
    buildApiUrl('/api/contact', 'https://host'),
    'https://host/api/contact'
  );

  // Missing leading slash on the path
  assert.equal(
    buildApiUrl('api/contact', 'https://host'),
    'https://host/api/contact'
  );

  // Base with trailing slash AND missing leading slash on the path
  assert.equal(
    buildApiUrl('api/contact', 'https://host/'),
    'https://host/api/contact'
  );

  // CV endpoints (PDF / DOCX)
  assert.equal(
    buildApiUrl('/api/cv/pdf', 'https://host/'),
    'https://host/api/cv/pdf'
  );
  assert.equal(
    buildApiUrl('api/cv/pdf', 'https://host'),
    'https://host/api/cv/pdf'
  );
  assert.equal(
    buildApiUrl('/api/cv/docx', 'https://host/'),
    'https://host/api/cv/docx'
  );

  // Health / warm-up endpoint
  assert.equal(
    buildApiUrl('/api/health', 'https://host/'),
    'https://host/api/health'
  );
  assert.equal(
    buildApiUrl('api/health', 'https://host'),
    'https://host/api/health'
  );

  // Extra slashes and whitespace handling
  assert.equal(
    buildApiUrl('  api/contact  ', '  https://host///  '),
    'https://host/api/contact'
  );
  assert.equal(
    buildApiUrl('///api/contact', 'https://host/'),
    'https://host/api/contact'
  );

  // Inverted argument order support (base, path)
  assert.equal(
    buildApiUrl('https://host/', 'api/contact'),
    'https://host/api/contact'
  );
  assert.equal(
    buildApiUrl('https://host', '/api/contact'),
    'https://host/api/contact'
  );

  // Fallback when base is empty or root slash
  assert.equal(buildApiUrl('/api/contact', ''), '/api/contact');
  assert.equal(buildApiUrl('api/contact', ''), '/api/contact');
  assert.equal(buildApiUrl('/api/contact', '/'), '/api/contact');

  // Default base URL usage (when base is omitted)
  const defaultJoined = buildApiUrl('/api/contact');
  assert.match(defaultJoined, /\/api\/contact$/);
  assert.ok(!defaultJoined.includes('//api'));
});
