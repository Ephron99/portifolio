import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

/**
 * Checks whether the CV file actually exists in /public so the "Download CV"
 * button never silently 404s. Returns { ready, checking }.
 */
export function useCvStatus() {
  const [ready, setReady] = useState(null); // null = unknown/checking

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(profile.cv.path, { method: 'HEAD' });
        if (!cancelled) setReady(res.ok);
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
