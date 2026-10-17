export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Fetch wrapper with timeout and normalized JSON response/error shape.
 */
export async function request(path, options = {}) {
  const { timeout = 8000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers || {}),
      },
    });

    clearTimeout(timer);

    let data;
    try {
      data = await response.json();
    } catch {
      data = {
        ok: false,
        error: { code: 'PARSE_ERROR', message: 'Unable to parse server response' },
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error:
          data.error || {
            code: 'HTTP_ERROR',
            message: `Request failed with status ${response.status}`,
          },
      };
    }

    return { ...data, status: response.status };
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err.name === 'AbortError';

    return {
      ok: false,
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
    fetch(`${API_BASE_URL}/api/health`, { method: 'GET' }).catch(() => {});
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
