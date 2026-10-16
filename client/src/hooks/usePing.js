import { useState, useCallback } from 'react';
import { pingApi } from '../lib/api.js';

export function usePing() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const ping = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pingApi();
      setResult(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { ping, loading, result, error };
}
