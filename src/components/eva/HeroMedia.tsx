'use client';

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Subject sits in the right third; mobile shifts the crop so she stays framed behind the copy.
const POS = 'object-[68%_center] md:object-[center_center]';

export function HeroMedia() {
  const reduce = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <img src="/media/eva/hero.webp" alt="" className={`absolute inset-0 h-full w-full object-cover ${POS}`} />
      {!reduce && videoOk && (
        <video
          className={`absolute inset-0 h-full w-full object-cover ${POS}`}
          poster="/media/eva/hero.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoOk(false)}
        >
          <source src="/media/eva/hero.mp4" type="video/mp4" onError={() => setVideoOk(false)} />
        </video>
      )}
    </div>
  );
}
