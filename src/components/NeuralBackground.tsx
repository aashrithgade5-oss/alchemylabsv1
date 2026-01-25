import { useRef, useMemo, useEffect, useState, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Premium ethereal particle system - Awwwards-level quality
const Particles = memo(({ count }: { count: number }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);
  const outerGlowRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { viewport } = useThree();
  const frameSkip = useRef(0);
  
  const { positions, originalPositions, velocities, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    
    // Organic distribution - clustered with varied depth
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
      
      // Varied sizes for depth perception
      sizes[i] = 0.03 + Math.random() * 0.04;
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions, originalPositions, velocities, sizes, phases };
  }, [count]);

  // Line connections geometry - pre-allocated
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxLines = Math.min(count * 6, 300);
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
    
    // Smooth mouse interpolation - silky feel
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03;
    
    // Skip frames for performance (process every 2nd frame)
    frameSkip.current++;
    if (frameSkip.current % 2 !== 0) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Update particles with organic flow
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      
      // Multi-frequency organic flow
      const flowX = Math.sin(time * 0.08 + originalPositions[i3] * 0.3 + phase) * 0.0015;
      const flowY = Math.cos(time * 0.06 + originalPositions[i3 + 1] * 0.25 + phase) * 0.001;
      const flowZ = Math.sin(time * 0.04 + phase * 2) * 0.0005;
      const breathe = Math.sin(time * 0.12 + i * 0.1) * 0.0008;
      
      positions[i3] += flowX + velocities[i3];
      positions[i3 + 1] += flowY + breathe + velocities[i3 + 1];
      positions[i3 + 2] += flowZ + velocities[i3 + 2];
      
      // Refined mouse attraction - softer influence
      const mouseX = mouseRef.current.x * viewport.width * 0.4;
      const mouseY = mouseRef.current.y * viewport.height * 0.4;
      const dx = mouseX - positions[i3];
      const dy = mouseY - positions[i3 + 1];
      const distSq = dx * dx + dy * dy;
      
      if (distSq < 6 && distSq > 0.05) {
        const dist = Math.sqrt(distSq);
        const attraction = Math.pow((6 - dist) / 6, 2.5) * 0.002;
        positions[i3] += dx * attraction;
        positions[i3 + 1] += dy * attraction;
      }
      
      // Gentle return to origin
      positions[i3] += (originalPositions[i3] - positions[i3]) * 0.001;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.001;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.001;
    }
    
    // Ethereal connection lines - very subtle neural network effect
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    let lineIndex = 0;
    const maxDist = 1.2;
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
    
    // Sync glow layers
    if (glowRef.current) {
      glowRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Very subtle breathing rotation
    const rotY = Math.sin(time * 0.015) * 0.05;
    const rotX = Math.cos(time * 0.012) * 0.025;
    particlesRef.current.rotation.y = rotY;
    particlesRef.current.rotation.x = rotX;
    linesRef.current.rotation.y = rotY;
    linesRef.current.rotation.x = rotX;
    if (glowRef.current) {
      glowRef.current.rotation.y = rotY;
      glowRef.current.rotation.x = rotX;
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.rotation.y = rotY;
      outerGlowRef.current.rotation.x = rotX;
    }
  });
  
  return (
    <group>
      {/* Ethereal connection lines - more visible */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#dc2626"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* Outer atmospheric glow - largest, more visible */}
      <points ref={outerGlowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={Math.floor(count / 5)}
            array={positions.slice(0, Math.floor(count / 5) * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.35}
          color="#ff3030"
          transparent
          opacity={0.05}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Inner glow layer - medium size, more visible */}
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={Math.floor(count / 3)}
            array={positions.slice(0, Math.floor(count / 3) * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color="#ff4545"
          transparent
          opacity={0.08}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Core particles - crisp and more visible */}
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
          size={0.055}
          color="#dc2626"
          transparent
          opacity={0.75}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
});

Particles.displayName = 'Particles';

// Scene wrapper with refined fog
const SceneContent = memo(({ particleCount }: { particleCount: number }) => (
  <>
    <fog attach="fog" args={['#0a0a0a', 5, 20]} />
    <ambientLight intensity={0.01} />
    <Particles count={particleCount} />
  </>
));

SceneContent.displayName = 'SceneContent';

export const NeuralBackground = memo(({ isMobile = false }: { isMobile?: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(70);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    // Adjust count based on device capability
    const cores = navigator.hardwareConcurrency || 4;
    const isLowPower = cores <= 4;
    // Fewer particles on mobile for performance
    setParticleCount(isMobile ? 35 : (isLowPower ? 50 : 70));
    setIsMounted(true);
  }, [isMobile]);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ 
          antialias: !isMobile, 
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
        performance={{ min: isMobile ? 0.5 : 0.3 }}
      >
        <SceneContent particleCount={particleCount} />
      </Canvas>
    </div>
  );
});

NeuralBackground.displayName = 'NeuralBackground';
