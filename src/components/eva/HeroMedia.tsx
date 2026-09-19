'use client';

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Prefers generated /media/eva/hero.{mp4,webp}; on 404 falls back to owned red-slats footage.
const FALLBACK_VIDEO = '/media/red-slats-tall.mp4';
const FALLBACK_POSTER = '/media/red-slats-tall-poster.jpg';

export function HeroMedia() {
  const reduce = useReducedMotion();
  const [video, setVideo] = useState('/media/eva/hero.mp4');
  const [poster, setPoster] = useState('/media/eva/hero.webp');

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Poster image doubles as the reduced-motion frame and as the 404 probe for hero.webp. */}
      <img
        src={poster}
        alt=""
        onError={() => poster !== FALLBACK_POSTER && setPoster(FALLBACK_POSTER)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!reduce && (
        <video
          key={video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => video !== FALLBACK_VIDEO && setVideo(FALLBACK_VIDEO)}
        >
          <source src={video} type="video/mp4" onError={() => video !== FALLBACK_VIDEO && setVideo(FALLBACK_VIDEO)} />
        </video>
      )}
    </div>
  );
}
