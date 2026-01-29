import { useRef, useMemo, useEffect, useState, memo, lazy, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Premium ethereal particle system - Performance optimized
const Particles = memo(({ count }: { count: number }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { viewport } = useThree();
  const frameSkip = useRef(0);
  
  const { positions, originalPositions, velocities, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.pow(Math.random(), 0.55) * 8;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
      const z = (Math.random() - 0.5) * 6 - 2;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;
      
      velocities[i3] = (Math.random() - 0.5) * 0.0002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.0002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.00008;
      
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions, originalPositions, velocities, phases };
  }, [count]);

  // Line connections geometry - pre-allocated with smaller buffer
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxLines = Math.min(count * 4, 200);
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
    
    // Skip more frames for better performance (every 3rd frame)
    frameSkip.current++;
    if (frameSkip.current % 3 !== 0) return;
    
    // Smooth mouse interpolation
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.02;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Update particles with simplified flow
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      
      // Simplified organic flow
      const flowX = Math.sin(time * 0.06 + originalPositions[i3] * 0.25 + phase) * 0.001;
      const flowY = Math.cos(time * 0.05 + originalPositions[i3 + 1] * 0.2 + phase) * 0.0008;
      
      positions[i3] += flowX + velocities[i3];
      positions[i3 + 1] += flowY + velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Mouse attraction - simplified
      const mouseX = mouseRef.current.x * viewport.width * 0.35;
      const mouseY = mouseRef.current.y * viewport.height * 0.35;
      const dx = mouseX - positions[i3];
      const dy = mouseY - positions[i3 + 1];
      const distSq = dx * dx + dy * dy;
      
      if (distSq < 5 && distSq > 0.1) {
        const attraction = 0.0015 / distSq;
        positions[i3] += dx * attraction;
        positions[i3 + 1] += dy * attraction;
      }
      
      // Return to origin
      positions[i3] += (originalPositions[i3] - positions[i3]) * 0.0008;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.0008;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.0008;
    }
    
    // Connection lines - simplified
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    let lineIndex = 0;
    const maxDistSq = 1.0;
    const maxLines = linePositions.length;
    
    outer: for (let i = 0; i < count; i += 2) { // Skip every other particle
      const i3 = i * 3;
      for (let j = i + 2; j < count; j += 2) {
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
  });
  
  return (
    <group>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#dc2626"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* Core particles */}
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
          size={0.06}
          color="#dc2626"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
});

Particles.displayName = 'Particles';

// Scene wrapper
const SceneContent = memo(({ particleCount }: { particleCount: number }) => (
  <>
    <fog attach="fog" args={['#0a0a0a', 6, 18]} />
    <Particles count={particleCount} />
  </>
));

SceneContent.displayName = 'SceneContent';

export const NeuralBackground = memo(({ isMobile = false }: { isMobile?: boolean }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const particleCount = isMobile ? 25 : 45;

  useEffect(() => {
    // Delay mount for better initial load
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    // Stagger the particle system load
    const timer = setTimeout(() => setShouldRender(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="absolute inset-0" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        dpr={1}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'low-power',
          stencil: false,
          depth: false,
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
