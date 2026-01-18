import { useCallback, useRef } from 'react';

// Create audio context lazily to avoid autoplay restrictions
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
};

// Synthesize sounds programmatically (no external files needed)
const synthesizeSound = (type: 'hover' | 'click' | 'success') => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    switch (type) {
      case 'hover':
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
        break;

      case 'click':
        oscillator.frequency.setValueAtTime(150, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;

      case 'success':
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
        break;
    }
  } catch (error) {
    // Silently fail if audio context isn't available
    console.debug('Audio synthesis unavailable:', error);
  }
};

export const useSoundEffects = () => {
  const isEnabled = useRef(true);
  const lastHoverTime = useRef(0);

  const playSound = useCallback((type: 'hover' | 'click' | 'success') => {
    if (!isEnabled.current) return;

    // Throttle hover sounds to prevent spam
    if (type === 'hover') {
      const now = Date.now();
      if (now - lastHoverTime.current < 50) return;
      lastHoverTime.current = now;
    }

    synthesizeSound(type);
  }, []);

  const toggleSound = useCallback(() => {
    isEnabled.current = !isEnabled.current;
    return isEnabled.current;
  }, []);

  return { playSound, toggleSound, isEnabled: isEnabled.current };
};
