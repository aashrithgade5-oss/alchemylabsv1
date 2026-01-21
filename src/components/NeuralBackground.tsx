import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Optimized particle system with reduced count for performance
const Particles = ({ count }: { count: number }) => {
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
      
      velocities[i3] = (Math.random() - 0.5) * 0.001;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.001;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0005;
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
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Simplified organic movement
      positions[i3] += Math.sin(time * 0.2 + i * 0.1) * 0.0008 + velocities[i3];
      positions[i3 + 1] += Math.cos(time * 0.15 + i * 0.05) * 0.0008 + velocities[i3 + 1];
      positions[i3 + 2] += Math.sin(time * 0.08 + i * 0.02) * 0.0003 + velocities[i3 + 2];
      
      // Mouse repulsion (simplified)
      const dx = positions[i3] - mouseRef.current.x * viewport.width * 0.4;
      const dy = positions[i3 + 1] - mouseRef.current.y * viewport.height * 0.4;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 2) {
        const force = (2 - dist) / 2;
        positions[i3] += (dx / dist) * force * 0.015;
        positions[i3 + 1] += (dy / dist) * force * 0.015;
      }
      
      // Return to original position
      positions[i3] += (originalPositions[i3] - positions[i3]) * 0.006;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.006;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.006;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.01;
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
        size={0.05}
        color="#e10613"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Simplified connection lines
const Connections = () => {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const lineCount = 40;
  const positions = useMemo(() => new Float32Array(lineCount * 6), []);
  
  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const angle = (i / lineCount) * Math.PI * 2 + time * 0.05;
      const radius = 3 + Math.sin(time * 0.3 + i * 0.1) * 1;
      
      linePositions[i6] = Math.cos(angle) * radius;
      linePositions[i6 + 1] = Math.sin(angle) * radius * 0.4;
      linePositions[i6 + 2] = Math.sin(time * 0.2 + i * 0.03) * 1.5 - 2;
      
      const nextAngle = angle + 0.2;
      linePositions[i6 + 3] = Math.cos(nextAngle) * radius;
      linePositions[i6 + 4] = Math.sin(nextAngle) * radius * 0.4;
      linePositions[i6 + 5] = Math.sin(time * 0.2 + i * 0.03 + 0.1) * 1.5 - 2;
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
      <lineBasicMaterial color="#e10613" transparent opacity={0.08} />
    </lineSegments>
  );
};

// Simplified floating shapes
const FloatingShapes = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = time * 0.03;
  });
  
  return (
    <group ref={group}>
      {[...Array(3)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI * 0.67) * 4,
            Math.sin(i * Math.PI * 0.67) * 2,
            -4 - i * 0.5,
          ]}
        >
          <octahedronGeometry args={[0.2 + i * 0.05]} />
          <meshBasicMaterial
            color="#e10613"
            transparent
            opacity={0.05}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

// Scene content wrapper
const SceneContent = ({ particleCount }: { particleCount: number }) => {
  return (
    <>
      <fog attach="fog" args={['#0a0a0b', 6, 18]} />
      <ambientLight intensity={0.3} />
      <Particles count={particleCount} />
      <Connections />
      <FloatingShapes />
    </>
  );
};

export const NeuralBackground = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(120);

  useEffect(() => {
    setIsMounted(true);
    // Adjust particle count based on device
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setParticleCount(isMobile ? 60 : prefersReducedMotion ? 80 : 120);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <SceneContent particleCount={particleCount} />
      </Canvas>
    </div>
  );
};
