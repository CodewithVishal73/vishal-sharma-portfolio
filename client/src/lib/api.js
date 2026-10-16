const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function pingApi() {
  const start = performance.now();
  const response = await fetch(`${API_BASE_URL}/api/health`);
  const duration = Math.round(performance.now() - start);
  const data = await response.json();
  return { ...data, latency: duration };
}

export async function sendContactMessage(payload) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
}
