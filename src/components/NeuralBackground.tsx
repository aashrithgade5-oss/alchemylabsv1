import { useRef, useMemo, useEffect, useState, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Heavily optimized particle system
const Particles = memo(({ count }: { count: number }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const frameSkip = useRef(0);
  
  const { positions, originalPositions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4 - 2;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;
      
      velocities[i3] = (Math.random() - 0.5) * 0.0006;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.0006;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0003;
    }
    
    return { positions, originalPositions, velocities };
  }, [count]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    // Skip every other frame for performance
    frameSkip.current++;
    if (frameSkip.current % 2 !== 0) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Process particles with simplified math
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Simplified organic movement
      positions[i3] += Math.sin(time * 0.1 + i * 0.05) * 0.0004 + velocities[i3];
      positions[i3 + 1] += Math.cos(time * 0.08 + i * 0.03) * 0.0004 + velocities[i3 + 1];
      
      // Mouse repulsion - only for nearby particles
      const dx = positions[i3] - mouseRef.current.x * viewport.width * 0.3;
      const dy = positions[i3 + 1] - mouseRef.current.y * viewport.height * 0.3;
      const distSq = dx * dx + dy * dy;
      
      if (distSq < 3) {
        const dist = Math.sqrt(distSq);
        const force = (1.7 - dist) / 2;
        positions[i3] += (dx / dist) * force * 0.008;
        positions[i3 + 1] += (dy / dist) * force * 0.008;
      }
      
      // Return to original position
      positions[i3] += (originalPositions[i3] - positions[i3]) * 0.003;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.003;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.005;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#e10613"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

Particles.displayName = 'Particles';

// Scene content wrapper
const SceneContent = memo(({ particleCount }: { particleCount: number }) => (
  <>
    <fog attach="fog" args={['#0a0a0b', 6, 18]} />
    <Particles count={particleCount} />
  </>
));

SceneContent.displayName = 'SceneContent';

export const NeuralBackground = memo(() => {
  const [isMounted, setIsMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(60);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Don't mount at all
    
    setIsMounted(true);
    setParticleCount(60); // Fixed lower count for consistency
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={1} // Force 1x DPR for performance
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
        performance={{ min: 0.3 }}
      >
        <SceneContent particleCount={particleCount} />
      </Canvas>
    </div>
  );
});

NeuralBackground.displayName = 'NeuralBackground';
