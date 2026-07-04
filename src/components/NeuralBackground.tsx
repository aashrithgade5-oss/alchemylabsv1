'use client';

import { useRef, useEffect, useState, memo } from 'react';

// Detect device capability for graceful scaling
const getDeviceCapability = (): 'high' | 'medium' | 'low' | 'reduced' => {
  if (typeof window === 'undefined') return 'low';

  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 2;
  const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return 'reduced';
  if (isMobileDevice || cores <= 2 || memory <= 2) return 'low';
  if (cores >= 8 && memory >= 8) return 'high';
  return 'medium';
};

interface Config {
  particleCount: number;
  connectionDistance: number;
  frameSkip: number;
  glowLayers: number;
  dpr: number;
  enableConnections: boolean;
  enableGlow: boolean;
}

const getConfig = (capability: string): Config => {
  switch (capability) {
    case 'high':
      return {
        particleCount: 80,
        connectionDistance: 1.6,
        frameSkip: 1,
        glowLayers: 2,
        dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.25),
        enableConnections: true,
        enableGlow: true,
      };
    case 'medium':
      return {
        particleCount: 50,
        connectionDistance: 1.3,
        frameSkip: 2,
        glowLayers: 1,
        dpr: 1,
        enableConnections: true,
        enableGlow: false,
      };
    case 'low':
      return {
        particleCount: 30,
        connectionDistance: 1.0,
        frameSkip: 3,
        glowLayers: 0,
        dpr: 0.75,
        enableConnections: false,
        enableGlow: false,
      };
    default:
      return {
        particleCount: 20,
        connectionDistance: 0,
        frameSkip: 6,
        glowLayers: 0,
        dpr: 0.5,
        enableConnections: false,
        enableGlow: false,
      };
  }
};

interface Particle {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  vz: number;
  phase: number;
}

interface NeuralBackgroundProps {
  isMobile?: boolean;
}

export const NeuralBackground = memo(({ isMobile = false }: NeuralBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShouldRender(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const capability = isMobile ? 'low' : getDeviceCapability();
    let config = getConfig(capability);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w * config.dpr;
      canvas.height = h * config.dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    };
    resize();
    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(container);

    // Build particles - golden ratio spiral distribution
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const count = config.particleCount;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const theta = goldenAngle * i;
      const phi = Math.acos(1 - 2 * t);
      const radius = Math.pow(Math.random(), 0.35) * 7;

      // Map 3D coords to 2D canvas space (normalized -1..1 → pixel)
      const nx = radius * Math.sin(phi) * Math.cos(theta) / 8;
      const ny = radius * Math.sin(phi) * Math.sin(theta) * 0.5 / 8;
      const z = (Math.random() - 0.5) * 5 - 2;

      particles.push({
        x: nx, y: ny, z,
        ox: nx, oy: ny,
        vx: (Math.random() - 0.5) * 0.000025,
        vy: (Math.random() - 0.5) * 0.000025,
        vz: (Math.random() - 0.5) * 0.00001,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Mouse
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver to pause when off-screen
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    io.observe(container);

    // FPS self-healing
    const fps = { slowFrames: 0, degraded: false, lastTime: 0 };

    let frameCount = 0;
    let rafId = 0;
    let startTime = performance.now();

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);

      if (!isVisible) return;

      frameCount++;
      if (frameCount % config.frameSkip !== 0) return;

      // FPS monitor
      if (fps.lastTime > 0) {
        const ft = now - fps.lastTime;
        if (ft > 20) {
          fps.slowFrames++;
          if (fps.slowFrames > 30 && !fps.degraded) {
            fps.degraded = true;
            config = {
              ...config,
              particleCount: Math.max(15, Math.floor(config.particleCount / 2)),
              enableConnections: false,
              enableGlow: false,
              frameSkip: Math.min(config.frameSkip + 2, 6),
            };
          }
        } else {
          fps.slowFrames = Math.max(0, fps.slowFrames - 1);
        }
      }
      fps.lastTime = now;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h);

      ctx.clearRect(0, 0, w, h);

      // Mouse lerp
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      const t = (now - startTime) / 1000;
      const activeCount = Math.min(config.particleCount, particles.length);

      // Update positions
      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];
        const phase = p.phase;

        const flowX = Math.sin(t * 0.06 + phase) * 0.000025;
        const flowY = Math.cos(t * 0.05 + phase) * 0.00002;

        p.x += flowX + p.vx;
        p.y += flowY + p.vy;
        p.z += p.vz;

        // Mouse attraction (in normalized space)
        const mxN = mouse.x * 0.35;
        const myN = mouse.y * 0.35;
        const dx = mxN - p.x;
        const dy = myN - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 0.015 && distSq > 0.0001) {
          const attraction = 0.00006 / (distSq + 0.5);
          p.x += dx * attraction;
          p.y += dy * attraction;
        }

        // Return to origin
        p.x += (p.ox - p.x) * 0.0008;
        p.y += (p.oy - p.y) * 0.0008;
        p.z += ((-2) - p.z) * 0.0008; // gentle return to z=-2
      }

      // Draw connections
      if (config.enableConnections) {
        const distThreshSq = config.connectionDistance * config.connectionDistance * 0.003;
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineWidth = 0.5;

        for (let i = 0; i < activeCount; i += 3) { // skip every 3rd for perf
          const pi = particles[i];
          const pxi = cx + pi.x * scale;
          const pyi = cy - pi.y * scale;

          for (let j = i + 3; j < activeCount; j += 3) {
            const pj = particles[j];
            const ddx = pi.x - pj.x;
            const ddy = pi.y - pj.y;
            const ddz = pi.z - pj.z;
            const dsq = ddx * ddx + ddy * ddy + ddz * ddz;

            if (dsq < distThreshSq) {
              const alphaZ = 0.3 + 0.7 * (1 - Math.abs(pi.z) / 5);
              ctx.strokeStyle = `rgba(220,38,38,${0.025 * alphaZ})`;
              ctx.beginPath();
              ctx.moveTo(pxi, pyi);
              ctx.lineTo(cx + pj.x * scale, cy - pj.y * scale);
              ctx.stroke();
            }
          }
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      // Draw glow layers
      if (config.enableGlow && config.glowLayers >= 1) {
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < Math.min(20, activeCount); i++) {
          const p = particles[i];
          const px = cx + p.x * scale;
          const py = cy - p.y * scale;
          const alphaZ = 0.3 + 0.7 * (1 - Math.abs(p.z) / 5);
          const grd = ctx.createRadialGradient(px, py, 0, px, py, 6 * config.dpr);
          grd.addColorStop(0, `rgba(220,38,38,${0.03 * alphaZ})`);
          grd.addColorStop(1, 'rgba(220,38,38,0)');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(px, py, 6 * config.dpr, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      // Draw particles
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];
        const px = cx + p.x * scale;
        const py = cy - p.y * scale;
        const alphaZ = 0.3 + 0.7 * (1 - Math.abs(p.z) / 5);

        ctx.beginPath();
        ctx.arc(px, py, 1.5 * config.dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,68,68,${0.8 * alphaZ})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObs.disconnect();
      io.disconnect();
    };
  }, [shouldRender, isMobile]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 gpu-accelerated"
      style={{ background: 'transparent' }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', background: 'transparent' }}
      />
    </div>
  );
});

NeuralBackground.displayName = 'NeuralBackground';
