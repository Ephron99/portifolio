import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

/**
 * Checks whether the CV file actually exists in /public so the "Download CV"
 * button never silently 404s. Returns { ready, checking }.
 *
 * Note: dev servers with SPA fallback answer missing files with 200 + HTML,
 * so a plain res.ok check is not enough — the response must be a PDF (or at
 * least not HTML).
 */
export function useCvStatus() {
  const [ready, setReady] = useState(null); // null = unknown/checking

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(profile.cv.path, { method: 'HEAD' });
        const type = res.headers.get('content-type') || '';
        const isRealFile = res.ok && !type.includes('text/html');
        if (!cancelled) setReady(isRealFile);
      } catch {
        if (!cancelled) setReady(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ready: ready === true, checking: ready === null };
}
