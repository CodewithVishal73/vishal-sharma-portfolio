const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const rawApiUrl = (env.VITE_API_URL || '').trim();
const fallbackUrl = env.DEV ? 'http://localhost:5000' : '';
export const API_BASE_URL = (rawApiUrl || fallbackUrl).replace(/\/+$/, '');

if (env.PROD && !rawApiUrl) {
  console.error(
    '\x1b[31m[CONFIG_ERROR] VITE_API_URL environment variable is missing in production build!\x1b[0m'
  );
}

/**
 * Builds a robust API URL by:
 * - Trimming whitespace
 * - Stripping all trailing slashes from the base
 * - Ensuring the path has exactly one leading slash
 * - Joining base and path with one slash
 *
 * A base with or without trailing slashes always yields https://host/api/...
 *
 * @param {string} arg1 Path or base URL
 * @param {string} [arg2] Base URL or path
 * @returns {string} Normalized API URL
 */
export function buildApiUrl(arg1 = '', arg2) {
  let path = '';
  let base = API_BASE_URL;

  if (arg2 !== undefined) {
    const isArg1Path = typeof arg1 === 'string' && (arg1.startsWith('/api') || arg1.startsWith('api/'));
    const isArg2Base = typeof arg2 === 'string' && (arg2.startsWith('http://') || arg2.startsWith('https://'));
    const isArg1Base = typeof arg1 === 'string' && (arg1.startsWith('http://') || arg1.startsWith('https://'));
    const isArg2Path = typeof arg2 === 'string' && (arg2.startsWith('/api') || arg2.startsWith('api/'));

    if ((isArg1Base && !isArg1Path) || (isArg2Path && !isArg1Path)) {
      base = arg1;
      path = arg2;
    } else {
      path = arg1;
      base = arg2;
    }
  } else {
    path = arg1;
  }

  const trimmedBase = (base ?? '').toString().trim().replace(/\/+$/, '');
  const trimmedPath = (path ?? '').toString().trim();
  const normalizedPath = '/' + trimmedPath.replace(/^\/+/, '');

  if (!trimmedBase) {
    return normalizedPath;
  }

  return `${trimmedBase}${normalizedPath}`;
}

/**
 * Fetch wrapper with timeout and normalized JSON response/error shape.
 */
export async function request(path, options = {}) {
  if (env.PROD && !API_BASE_URL) {
    return {
      ok: false,
      httpStatus: 0,
      error: {
        code: 'MISSING_API_URL',
        message: 'Production configuration error: VITE_API_URL is not set.',
      },
    };
  }
  const { timeout = 8000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(buildApiUrl(path), {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers || {}),
      },
    });

    clearTimeout(timer);

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    let data;
    if (isJson) {
      try {
        data = await response.json();
      } catch {
        data = {
          ok: false,
          error: { code: 'PARSE_ERROR', message: 'Unable to parse server JSON response' },
        };
      }
    } else {
      // Non-JSON response (e.g. HTML from SPA rewrite when API_BASE_URL is missing or invalid)
      data = {
        ok: false,
        error: {
          code: 'INVALID_CONTENT_TYPE',
          message: `Expected JSON response but received ${contentType || 'non-JSON body'}`,
        },
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        httpStatus: response.status,
        error:
          data.error || {
            code: 'HTTP_ERROR',
            message: `Request failed with status ${response.status}`,
          },
      };
    }

    // Preserve payload fields (e.g. data.status = 'up') without overwriting with HTTP status code
    return {
      httpStatus: response.status,
      ...data,
    };
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err.name === 'AbortError';

    return {
      ok: false,
      httpStatus: 0,
      error: {
        code: isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR',
        message: isTimeout
          ? 'The server took too long to respond (it may be cold-starting).'
          : err.message || 'Network connection failed',
      },
    };
  }
}

/**
 * Fire-and-forget ping to wake sleeping Render instance on boot.
 */
export function warmUp() {
  try {
    fetch(buildApiUrl('/api/health'), { method: 'GET' }).catch(() => {});
  } catch {
    // Ignore warm up exceptions
  }
}

/**
 * Ping API health endpoint and measure roundtrip latency.
 */
export async function pingApi() {
  const start = performance.now();
  const result = await request('/api/health');
  const duration = Math.round(performance.now() - start);
  return { ...result, latency: duration };
}

/**
 * Post contact form data to the Express backend.
 */
export async function submitContact(payload) {
  return request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Downloads CV in specified format ('pdf' | 'docx') from the Express backend.
 * Handles 45s timeout, 2.5s waking notification, Content-Type & non-zero size checks,
 * and direct browser saving via Object URL.
 */
export async function downloadCv(format = 'pdf', { onWaking } = {}) {
  const normalizedFormat = format.toLowerCase() === 'docx' ? 'docx' : 'pdf';
  const targetUrl = buildApiUrl(`/api/cv/${normalizedFormat}`);
  const filename = `Vishal_Sharma_CV.${normalizedFormat}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  let wakingTimer = null;
  if (typeof onWaking === 'function') {
    wakingTimer = setTimeout(() => {
      onWaking(true);
    }, 2500);
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (wakingTimer) clearTimeout(wakingTimer);
    if (typeof onWaking === 'function') onWaking(false);

    if (!response.ok) {
      let errorMsg = `Server returned status ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson?.error?.message) {
          errorMsg = errorJson.error.message;
        }
      } catch {
        // Fall back to status text
      }
      return {
        ok: false,
        error: errorMsg,
        fallbackUrl: targetUrl,
      };
    }

    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    if (normalizedFormat === 'pdf' && !contentType.includes('pdf')) {
      return {
        ok: false,
        error: `Unexpected Content-Type: expected application/pdf but received ${contentType}`,
        fallbackUrl: targetUrl,
      };
    }

    if (
      normalizedFormat === 'docx' &&
      !contentType.includes('wordprocessingml') &&
      !contentType.includes('octet-stream') &&
      !contentType.includes('zip')
    ) {
      return {
        ok: false,
        error: `Unexpected Content-Type for Word document: received ${contentType}`,
        fallbackUrl: targetUrl,
      };
    }

    const blob = await response.blob();
    if (!blob || blob.size === 0) {
      return {
        ok: false,
        error: 'Received empty file payload from server.',
        fallbackUrl: targetUrl,
      };
    }

    // Save using Object URL
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);

    return {
      ok: true,
      filename,
      size: blob.size,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (wakingTimer) clearTimeout(wakingTimer);
    if (typeof onWaking === 'function') onWaking(false);

    const isTimeout = err.name === 'AbortError';
    return {
      ok: false,
      error: isTimeout
        ? 'Download timed out after 45 seconds while waiting for the server.'
        : err.message || 'Network error encountered during CV download.',
      fallbackUrl: targetUrl,
    };
  }
}

