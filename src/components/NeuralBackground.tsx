import { useRef, useMemo, useEffect, useState, forwardRef, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Optimized particle system with reduced count for performance
const Particles = memo(forwardRef<THREE.Points, { count: number }>(({ count }, ref) => {
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  
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
      
      velocities[i3] = (Math.random() - 0.5) * 0.0008;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.0008;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0004;
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
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Process every 2nd particle for performance
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      
      // Simplified organic movement
      positions[i3] += Math.sin(time * 0.15 + i * 0.08) * 0.0006 + velocities[i3];
      positions[i3 + 1] += Math.cos(time * 0.12 + i * 0.04) * 0.0006 + velocities[i3 + 1];
      positions[i3 + 2] += Math.sin(time * 0.06 + i * 0.015) * 0.0002 + velocities[i3 + 2];
      
      // Mouse repulsion (simplified)
      const dx = positions[i3] - mouseRef.current.x * viewport.width * 0.35;
      const dy = positions[i3 + 1] - mouseRef.current.y * viewport.height * 0.35;
      const distSq = dx * dx + dy * dy;
      
      if (distSq < 4) {
        const dist = Math.sqrt(distSq);
        const force = (2 - dist) / 2;
        positions[i3] += (dx / dist) * force * 0.012;
        positions[i3 + 1] += (dy / dist) * force * 0.012;
      }
      
      // Return to original position with smooth damping
      positions[i3] += (originalPositions[i3] - positions[i3]) * 0.004;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.004;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.004;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.008;
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
        size={0.045}
        color="#e10613"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}));

Particles.displayName = 'Particles';

// Simplified connection lines
const Connections = memo(forwardRef<THREE.LineSegments>((_, ref) => {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const lineCount = 30; // Reduced for performance
  const positions = useMemo(() => new Float32Array(lineCount * 6), []);
  
  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const angle = (i / lineCount) * Math.PI * 2 + time * 0.04;
      const radius = 3 + Math.sin(time * 0.25 + i * 0.08) * 1;
      
      linePositions[i6] = Math.cos(angle) * radius;
      linePositions[i6 + 1] = Math.sin(angle) * radius * 0.4;
      linePositions[i6 + 2] = Math.sin(time * 0.15 + i * 0.025) * 1.5 - 2;
      
      const nextAngle = angle + 0.2;
      linePositions[i6 + 3] = Math.cos(nextAngle) * radius;
      linePositions[i6 + 4] = Math.sin(nextAngle) * radius * 0.4;
      linePositions[i6 + 5] = Math.sin(time * 0.15 + i * 0.025 + 0.1) * 1.5 - 2;
    }
    
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={lineCount * 2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#e10613" transparent opacity={0.06} />
    </lineSegments>
  );
}));

Connections.displayName = 'Connections';

// Simplified floating shapes
const FloatingShapes = memo(forwardRef<THREE.Group>((_, ref) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = time * 0.025;
  });
  
  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI * 0.67) * 4,
            Math.sin(i * Math.PI * 0.67) * 2,
            -4 - i * 0.5,
          ]}
        >
          <octahedronGeometry args={[0.18 + i * 0.04]} />
          <meshBasicMaterial
            color="#e10613"
            transparent
            opacity={0.04}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}));

FloatingShapes.displayName = 'FloatingShapes';

// Scene content wrapper - memoized
const SceneContent = memo(({ particleCount }: { particleCount: number }) => {
  return (
    <>
      <fog attach="fog" args={['#0a0a0b', 6, 18]} />
      <ambientLight intensity={0.25} />
      <Particles count={particleCount} />
      <Connections />
      <FloatingShapes />
    </>
  );
});

SceneContent.displayName = 'SceneContent';

export const NeuralBackground = memo(() => {
  const [isMounted, setIsMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(100);

  useEffect(() => {
    setIsMounted(true);
    // Adjust particle count based on device capability
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setParticleCount(isMobile ? 50 : prefersReducedMotion ? 60 : 100);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 will-change-transform" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.2]} // Reduced max DPR for performance
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <SceneContent particleCount={particleCount} />
      </Canvas>
    </div>
  );
});

NeuralBackground.displayName = 'NeuralBackground';
