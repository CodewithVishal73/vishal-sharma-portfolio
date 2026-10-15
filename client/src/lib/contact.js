/**
 * Contact Submission Client Boundary
 * Prepares payload for future Express backend (/api/contact).
 *
 * In this Phase (Frontend Only), it honestly reports that the backend
 * service endpoint is not yet connected, avoiding false delivery claims or fake APIs.
 */

export async function sendMessage(payload) {
  // Check if an endpoint is configured
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  if (!endpoint) {
    // Honest simulated response for unconnected frontend
    // Wait brief artificial latency for realistic UI state testing
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      ok: false,
      status: 'unconnected',
      error:
        'Message delivery is not yet connected. Backend integration will be activated in the next phase. Please feel free to reference the credentials in my downloadable CV.',
    };
  }

  // Future integration point:
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error:
          'Message delivery service is temporarily unavailable. Please download my CV for direct contact details.',
      };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch {
    return {
      ok: false,
      status: 'network_error',
      error:
        'Network error attempting to reach message delivery service. Please download my CV for direct contact details.',
    };
  }
}

export default sendMessage;
