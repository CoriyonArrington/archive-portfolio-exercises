// hooks/use-media-query.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') { // Guard for SSR or non-browser environments
        // On the server, you might want to return a default value or handle it differently
        // For this hook, which is client-side by nature, we can just set a default
        // and let the client-side effect update it.
        // Alternatively, you could throw an error or log a warning if used in a non-browser context.
        const initialMatch = false; // Or true, depending on your default assumption for SSR
        setMatches(initialMatch);
        return;
    }

    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);

    listener(); // Set initial state on client

    try {
      mediaQueryList.addEventListener('change', listener);
    } catch (e) { // Fallback for older browsers that might not support addEventListener
      mediaQueryList.addListener(listener);
    }

    return () => {
      try {
        mediaQueryList.removeEventListener('change', listener);
      } catch (e) { // Fallback for older browsers
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}