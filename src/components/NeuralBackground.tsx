import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Particle system that creates a neural network effect
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  
  const particleCount = 800;
  
  const { positions, originalPositions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
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
      
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    
    return { positions, originalPositions, velocities };
  }, []);
  
  // Mouse tracking
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
      
      if (dist < 2) {
        const force = (2 - dist) / 2;
        positions[i3] += (dx / dist) * force * 0.02;
        positions[i3 + 1] += (dy / dist) * force * 0.02;
      }
      
      // Return to original position slowly
      positions[i3] += (originalPositions[i3] - positions[i3]) * 0.005;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.005;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.005;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.02;
    particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
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
        size={0.03}
        color="#e10613"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Connection lines between nearby particles
const Connections = () => {
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();
  
  const lineCount = 300;
  const positions = useMemo(() => new Float32Array(lineCount * 6), []);
  
  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const angle = (i / lineCount) * Math.PI * 2 + time * 0.1;
      const radius = 3 + Math.sin(time * 0.5 + i * 0.1) * 1;
      
      linePositions[i6] = Math.cos(angle) * radius + Math.sin(time + i) * 0.5;
      linePositions[i6 + 1] = Math.sin(angle) * radius * 0.6 + Math.cos(time * 0.7 + i) * 0.3;
      linePositions[i6 + 2] = Math.sin(time * 0.3 + i * 0.05) * 1.5 - 2;
      
      const nextAngle = angle + 0.3;
      linePositions[i6 + 3] = Math.cos(nextAngle) * radius + Math.sin(time + i) * 0.5;
      linePositions[i6 + 4] = Math.sin(nextAngle) * radius * 0.6 + Math.cos(time * 0.7 + i) * 0.3;
      linePositions[i6 + 5] = Math.sin(time * 0.3 + i * 0.05 + 0.2) * 1.5 - 2;
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

// Floating geometric shapes
const FloatingShapes = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    
    group.current.rotation.y = time * 0.05;
    group.current.rotation.z = Math.sin(time * 0.2) * 0.1;
  });
  
  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI * 0.4) * 4,
            Math.sin(i * Math.PI * 0.4) * 2,
            -3 - i * 0.5,
          ]}
        >
          <octahedronGeometry args={[0.3 + i * 0.1]} />
          <meshBasicMaterial
            color="#e10613"
            transparent
            opacity={0.05 + i * 0.02}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

export const NeuralBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#080808']} />
        <fog attach="fog" args={['#080808', 5, 15]} />
        <ambientLight intensity={0.5} />
        <Particles />
        <Connections />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};
