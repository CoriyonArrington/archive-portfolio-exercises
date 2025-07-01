
import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  direction: 'up' | 'down' | 'none';
  isScrolled: boolean;
}

interface UseScrollOptions {
  threshold?: number;
  debounceMs?: number;
}

/**
 * Custom hook to track scroll position and direction
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Scroll threshold to consider as "scrolled"
 * @param {number} options.debounceMs - Debounce time in milliseconds
 * @returns {ScrollPosition} Current scroll position and direction
 */
function useScroll({ threshold = 50, debounceMs = 10 }: UseScrollOptions = {}): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    direction: 'none',
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const direction = scrollY > lastScrollY ? 'down' : scrollY < lastScrollY ? 'up' : 'none';
      const isScrolled = scrollY > threshold;
      
      setScrollPosition({
        scrollY,
        scrollX,
        direction,
        isScrolled,
      });
      
      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.setTimeout(() => {
          updateScrollPosition();
        }, debounceMs);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, debounceMs]);

  return scrollPosition;
}

export default useScroll;
