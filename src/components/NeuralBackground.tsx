import { useRef, useMemo, useEffect, useState, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Ethereal particle system with organic flow
const Particles = memo(({ count }: { count: number }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { viewport } = useThree();
  const frameSkip = useRef(0);
  
  const { positions, originalPositions, velocities, sizes, opacities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const opacities = new Float32Array(count);
    
    // Create a more organic distribution - clustered in center, sparse at edges
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Use gaussian-like distribution for more organic clustering
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.pow(Math.random(), 0.5) * 8; // Power for center clustering
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.6; // Flatten vertically
      const z = (Math.random() - 0.5) * 6 - 2;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;
      
      // Slower, more graceful movement
      velocities[i3] = (Math.random() - 0.5) * 0.0003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.0003;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0001;
      
      // Variable sizes for depth
      sizes[i] = 0.02 + Math.random() * 0.06;
      opacities[i] = 0.3 + Math.random() * 0.7;
    }
    
    return { positions, originalPositions, velocities, sizes, opacities };
  }, [count]);

  // Line connections geometry
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    // Pre-allocate for max connections
    const linePositions = new Float32Array(count * count * 6);
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geometry.setDrawRange(0, 0);
    return geometry;
  }, [count]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state) => {
    if (!particlesRef.current || !linesRef.current) return;
    
    // Smooth mouse following
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
    
    // Skip frames for performance
    frameSkip.current++;
    if (frameSkip.current % 2 !== 0) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Update particles with organic flow
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Organic flowing motion - like underwater currents
      const flowX = Math.sin(time * 0.15 + originalPositions[i3] * 0.5) * 0.003;
      const flowY = Math.cos(time * 0.12 + originalPositions[i3 + 1] * 0.4) * 0.002;
      const breathe = Math.sin(time * 0.2 + i * 0.1) * 0.0015;
      
      positions[i3] += flowX + velocities[i3];
      positions[i3 + 1] += flowY + breathe + velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Mouse attraction with soft falloff
      const mouseX = mouseRef.current.x * viewport.width * 0.4;
      const mouseY = mouseRef.current.y * viewport.height * 0.4;
      const dx = mouseX - positions[i3];
      const dy = mouseY - positions[i3 + 1];
      const distSq = dx * dx + dy * dy;
      
      if (distSq < 6 && distSq > 0.1) {
        const dist = Math.sqrt(distSq);
        const attraction = Math.pow((6 - dist) / 6, 2) * 0.004;
        positions[i3] += dx * attraction;
        positions[i3 + 1] += dy * attraction;
      }
      
      // Gentle return to origin
      positions[i3] += (originalPositions[i3] - positions[i3]) * 0.002;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.002;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.002;
    }
    
    // Draw connecting lines between nearby particles
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    let lineIndex = 0;
    const maxDist = 1.8;
    const maxDistSq = maxDist * maxDist;
    
    for (let i = 0; i < count && lineIndex < linePositions.length - 6; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < count && lineIndex < linePositions.length - 6; j++) {
        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        
        if (distSq < maxDistSq) {
          linePositions[lineIndex++] = positions[i3];
          linePositions[lineIndex++] = positions[i3 + 1];
          linePositions[lineIndex++] = positions[i3 + 2];
          linePositions[lineIndex++] = positions[j3];
          linePositions[lineIndex++] = positions[j3 + 1];
          linePositions[lineIndex++] = positions[j3 + 2];
        }
      }
    }
    
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Subtle rotation
    particlesRef.current.rotation.y = Math.sin(time * 0.03) * 0.1;
    particlesRef.current.rotation.x = Math.cos(time * 0.02) * 0.05;
    linesRef.current.rotation.y = particlesRef.current.rotation.y;
    linesRef.current.rotation.x = particlesRef.current.rotation.x;
  });
  
  return (
    <group>
      {/* Neural connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#dc2626"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* Main particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={count}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#dc2626"
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Secondary glow particles - larger, more diffuse */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={Math.floor(count / 3)}
            array={positions.slice(0, Math.floor(count / 3) * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#ff3333"
          transparent
          opacity={0.1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
});

Particles.displayName = 'Particles';

// Scene content wrapper
const SceneContent = memo(({ particleCount }: { particleCount: number }) => (
  <>
    <fog attach="fog" args={['#0a0a0b', 5, 20]} />
    <ambientLight intensity={0.1} />
    <Particles count={particleCount} />
  </>
));

SceneContent.displayName = 'SceneContent';

export const NeuralBackground = memo(() => {
  const [isMounted, setIsMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(80);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Don't mount at all
    
    // Adjust count based on device
    const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    setParticleCount(isLowPower ? 50 : 80);
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={1}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
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
