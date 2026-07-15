'use client';

import { useCallback } from 'react';
import { useMotionValue, useTransform } from 'framer-motion';

// Lightweight cursor-tracked 3D tilt (Landing_Page_Patches.pdf Phase 5/10:
// "can also be made 3D" / "magnetic 3D button"). Pure CSS-transform via
// motion values, no Three.js — pair with `style={{ rotateX, rotateY }}` on
// an `m.div` with `perspective` set on its parent.
export function useTilt(maxDeg = 6) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const degX = useTransform(rotateX, (v) => `${v}deg`);
  const degY = useTransform(rotateY, (v) => `${v}deg`);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * maxDeg);
      rotateX.set(py * -maxDeg);
    },
    [rotateX, rotateY, maxDeg],
  );
  const onLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { onMove, onLeave, rotateX: degX, rotateY: degY };
}
