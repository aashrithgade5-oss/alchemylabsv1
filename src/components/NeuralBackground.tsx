import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Particle system with optimized opacity
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  
  const particleCount = 600;
  
  const { positions, originalPositions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5 - 2;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;
      
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    
    return { positions, originalPositions, velocities };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Organic movement
      positions[i3] += Math.sin(time * 0.3 + i * 0.1) * 0.001 + velocities[i3];
      positions[i3 + 1] += Math.cos(time * 0.2 + i * 0.05) * 0.001 + velocities[i3 + 1];
      positions[i3 + 2] += Math.sin(time * 0.1 + i * 0.02) * 0.0005 + velocities[i3 + 2];
      
      // Mouse repulsion
      const dx = positions[i3] - mouseRef.current.x * viewport.width * 0.5;
      const dy = positions[i3 + 1] - mouseRef.current.y * viewport.height * 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 2.5) {
        const force = (2.5 - dist) / 2.5;
        positions[i3] += (dx / dist) * force * 0.025;
        positions[i3 + 1] += (dy / dist) * force * 0.025;
      }
      
      // Return to original position slowly
      positions[i3] += (originalPositions[i3] - positions[i3]) * 0.008;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.008;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.008;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.015;
    particlesRef.current.rotation.x = Math.sin(time * 0.08) * 0.03;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#e10613"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Subtle connection lines
const Connections = () => {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const lineCount = 200;
  const positions = useMemo(() => new Float32Array(lineCount * 6), []);
  
  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const angle = (i / lineCount) * Math.PI * 2 + time * 0.08;
      const radius = 3.5 + Math.sin(time * 0.4 + i * 0.1) * 1.2;
      
      linePositions[i6] = Math.cos(angle) * radius + Math.sin(time + i) * 0.4;
      linePositions[i6 + 1] = Math.sin(angle) * radius * 0.5 + Math.cos(time * 0.6 + i) * 0.25;
      linePositions[i6 + 2] = Math.sin(time * 0.25 + i * 0.04) * 1.8 - 2.5;
      
      const nextAngle = angle + 0.25;
      linePositions[i6 + 3] = Math.cos(nextAngle) * radius + Math.sin(time + i) * 0.4;
      linePositions[i6 + 4] = Math.sin(nextAngle) * radius * 0.5 + Math.cos(time * 0.6 + i) * 0.25;
      linePositions[i6 + 5] = Math.sin(time * 0.25 + i * 0.04 + 0.15) * 1.8 - 2.5;
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
};

// Floating geometric shapes
const FloatingShapes = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    
    group.current.rotation.y = time * 0.04;
    group.current.rotation.z = Math.sin(time * 0.15) * 0.08;
  });
  
  return (
    <group ref={group}>
      {[...Array(4)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI * 0.5) * 5,
            Math.sin(i * Math.PI * 0.5) * 2.5,
            -4 - i * 0.5,
          ]}
        >
          <octahedronGeometry args={[0.25 + i * 0.08]} />
          <meshBasicMaterial
            color="#e10613"
            transparent
            opacity={0.04 + i * 0.01}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

export const NeuralBackground = () => {
  return (
    <div className="absolute inset-0" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#0a0a0b', 6, 20]} />
        <ambientLight intensity={0.4} />
        <Particles />
        <Connections />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};
