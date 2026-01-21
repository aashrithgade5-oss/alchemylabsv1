import { useCallback, useRef } from 'react';

// Sound effects disabled for a cleaner, more premium experience
// This hook is kept for API compatibility but sounds are muted

export const useSoundEffects = () => {
  const isEnabled = useRef(false); // Disabled by default

  const playSound = useCallback((_type: 'hover' | 'click' | 'success') => {
    // Sound effects disabled for premium feel
    // No-op function for API compatibility
  }, []);

  const toggleSound = useCallback(() => {
    isEnabled.current = !isEnabled.current;
    return isEnabled.current;
  }, []);

  return { playSound, toggleSound, isEnabled: isEnabled.current };
};
