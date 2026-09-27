'use client';

import { useEffect, useState } from 'react';

export const PRELOADED_EVENT = 'al:preloaded';

/**
 * Bumps once when the opening sequence hands over, so a caller can key its
 * entrance animations to replay as the aperture opens (instead of playing
 * unseen underneath the preloader). Stays 0 when the preloader never ran.
 */
export function usePreloaderHandoff() {
  const [gen, setGen] = useState(0);
  useEffect(() => {
    if (document.documentElement.getAttribute('data-pl') !== 'run') return;
    const onDone = () => setGen(1);
    window.addEventListener(PRELOADED_EVENT, onDone, { once: true });
    return () => window.removeEventListener(PRELOADED_EVENT, onDone);
  }, []);
  return gen;
}
