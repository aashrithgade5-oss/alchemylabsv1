import { useRef, useMemo, useEffect, useState, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Ethereal particle system - optimized for performance
const Particles = memo(({ count }: { count: number }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { viewport } = useThree();
  const frameSkip = useRef(0);
  
  const { positions, originalPositions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    // Organic distribution - clustered in center
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.pow(Math.random(), 0.6) * 7;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      const z = (Math.random() - 0.5) * 5 - 1.5;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;
      
      velocities[i3] = (Math.random() - 0.5) * 0.00025;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.00025;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0001;
    }
    
    return { positions, originalPositions, velocities };
  }, [count]);

  // Line connections geometry - pre-allocated
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxLines = Math.min(count * 8, 400); // Limit max connections
    const linePositions = new Float32Array(maxLines * 6);
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
    
    // Smooth mouse interpolation
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;
    
    // Skip frames for performance (process every 3rd frame)
    frameSkip.current++;
    if (frameSkip.current % 3 !== 0) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Update particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Gentle organic flow
      const flowX = Math.sin(time * 0.12 + originalPositions[i3] * 0.4) * 0.002;
      const flowY = Math.cos(time * 0.1 + originalPositions[i3 + 1] * 0.35) * 0.0015;
      const breathe = Math.sin(time * 0.15 + i * 0.08) * 0.001;
      
      positions[i3] += flowX + velocities[i3];
      positions[i3 + 1] += flowY + breathe + velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Subtle mouse attraction
      const mouseX = mouseRef.current.x * viewport.width * 0.35;
      const mouseY = mouseRef.current.y * viewport.height * 0.35;
      const dx = mouseX - positions[i3];
      const dy = mouseY - positions[i3 + 1];
      const distSq = dx * dx + dy * dy;
      
      if (distSq < 5 && distSq > 0.1) {
        const dist = Math.sqrt(distSq);
        const attraction = Math.pow((5 - dist) / 5, 2) * 0.003;
        positions[i3] += dx * attraction;
        positions[i3 + 1] += dy * attraction;
      }
      
      // Gentle return to origin
      positions[i3] += (originalPositions[i3] - positions[i3]) * 0.0015;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.0015;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.0015;
    }
    
    // Draw ethereal connection lines - optimized
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    let lineIndex = 0;
    const maxDist = 1.4;
    const maxDistSq = maxDist * maxDist;
    const maxLines = linePositions.length;
    
    outer: for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < count; j++) {
        if (lineIndex >= maxLines - 6) break outer;
        
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
    
    // Very subtle rotation
    const rotY = Math.sin(time * 0.02) * 0.06;
    const rotX = Math.cos(time * 0.015) * 0.03;
    particlesRef.current.rotation.y = rotY;
    particlesRef.current.rotation.x = rotX;
    linesRef.current.rotation.y = rotY;
    linesRef.current.rotation.x = rotX;
  });
  
  return (
    <group>
      {/* Ethereal connection lines - very subtle */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#dc2626"
          transparent
          opacity={0.04}
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
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#dc2626"
          transparent
          opacity={0.45}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Glow layer - larger, softer */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={Math.floor(count / 4)}
            array={positions.slice(0, Math.floor(count / 4) * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#ff4040"
          transparent
          opacity={0.06}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
});

Particles.displayName = 'Particles';

// Scene wrapper
const SceneContent = memo(({ particleCount }: { particleCount: number }) => (
  <>
    <fog attach="fog" args={['#0a0a0b', 4, 18]} />
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
    if (prefersReducedMotion) return;
    
    // Adjust count based on device capability
    const cores = navigator.hardwareConcurrency || 4;
    const isLowPower = cores <= 4;
    setParticleCount(isLowPower ? 40 : 60);
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={1}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
        performance={{ min: 0.2 }}
      >
        <SceneContent particleCount={particleCount} />
      </Canvas>
    </div>
  );
});

NeuralBackground.displayName = 'NeuralBackground';
