import { useRef, useMemo, useEffect, useState, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

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

// Configuration based on device capability
const getConfig = (capability: string) => {
  switch (capability) {
    case 'high':
      return {
        particleCount: 80,
        connectionDistance: 1.6,
        frameSkip: 1,
        glowLayers: 2,
        dpr: Math.min(window.devicePixelRatio, 1.25),
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
    default: // reduced motion
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

type DeviceConfig = ReturnType<typeof getConfig>;

// Ethereal glow layer - simple & performant
const GlowLayer = memo(({ count, size, opacity, color }: { 
  count: number; 
  size: number; 
  opacity: number;
  color: string;
}) => {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.pow(Math.random(), 0.4) * 8;
      
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, [count]);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.005;
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
});

GlowLayer.displayName = 'GlowLayer';

// Main particle system - optimized
const Particles = memo(({ config }: { config: DeviceConfig }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { viewport } = useThree();
  const frameCount = useRef(0);
  
  const { positions, originalPositions, velocities, phases } = useMemo(() => {
    const count = config.particleCount;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    
    // Golden ratio spiral distribution
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = i / count;
      const theta = goldenAngle * i;
      const phi = Math.acos(1 - 2 * t);
      const radius = Math.pow(Math.random(), 0.35) * 7;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
      const z = (Math.random() - 0.5) * 5 - 2;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;
      
      velocities[i3] = (Math.random() - 0.5) * 0.0002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.0002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0001;
      
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions, originalPositions, velocities, phases };
  }, [config.particleCount]);

  // Line connections geometry
  const lineGeometry = useMemo(() => {
    if (!config.enableConnections) return null;
    const geometry = new THREE.BufferGeometry();
    const maxLines = Math.min(config.particleCount * 4, 300);
    const linePositions = new Float32Array(maxLines * 6);
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geometry.setDrawRange(0, 0);
    return geometry;
  }, [config.particleCount, config.enableConnections]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    // Frame skipping
    frameCount.current++;
    if (frameCount.current % config.frameSkip !== 0) return;
    
    // Mouse interpolation
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;
    
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.elapsedTime;
    const count = config.particleCount;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      
      // Simplified organic flow
      const flowX = Math.sin(time * 0.06 + phase) * 0.0008;
      const flowY = Math.cos(time * 0.05 + phase) * 0.0006;
      
      posArray[i3] += flowX + velocities[i3];
      posArray[i3 + 1] += flowY + velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];
      
      // Mouse attraction
      const mouseX = mouseRef.current.x * viewport.width * 0.35;
      const mouseY = mouseRef.current.y * viewport.height * 0.35;
      const dx = mouseX - posArray[i3];
      const dy = mouseY - posArray[i3 + 1];
      const distSq = dx * dx + dy * dy;
      
      if (distSq < 6 && distSq > 0.1) {
        const attraction = 0.002 / (distSq + 0.5);
        posArray[i3] += dx * attraction;
        posArray[i3 + 1] += dy * attraction;
      }
      
      // Return to origin
      posArray[i3] += (originalPositions[i3] - posArray[i3]) * 0.0008;
      posArray[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * 0.0008;
      posArray[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * 0.0008;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update connections
    if (linesRef.current && lineGeometry && config.enableConnections) {
      const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;
      const maxDistSq = config.connectionDistance * config.connectionDistance;
      const maxLines = linePositions.length;
      
      outer: for (let i = 0; i < count; i += 3) {
        const i3 = i * 3;
        for (let j = i + 3; j < count; j += 3) {
          if (lineIndex >= maxLines - 6) break outer;
          
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;
          
          if (distSq < maxDistSq) {
            linePositions[lineIndex++] = posArray[i3];
            linePositions[lineIndex++] = posArray[i3 + 1];
            linePositions[lineIndex++] = posArray[i3 + 2];
            linePositions[lineIndex++] = posArray[j3];
            linePositions[lineIndex++] = posArray[j3 + 1];
            linePositions[lineIndex++] = posArray[j3 + 2];
          }
        }
      }
      
      linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <group>
      {config.enableConnections && lineGeometry && (
        <lineSegments ref={linesRef} geometry={lineGeometry}>
          <lineBasicMaterial
            color="#dc2626"
            transparent
            opacity={0.025}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}
      
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={config.particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ff4444"
          transparent
          opacity={0.8}
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
const SceneContent = memo(({ config }: { config: DeviceConfig }) => (
  <group>
    <fog attach="fog" args={['#0a0a0a', 6, 18]} />
    
    {config.enableGlow && config.glowLayers >= 1 && (
      <GlowLayer count={20} size={0.12} opacity={0.03} color="#dc2626" />
    )}
    {config.enableGlow && config.glowLayers >= 2 && (
      <GlowLayer count={15} size={0.2} opacity={0.02} color="#ff6b6b" />
    )}
    
    <Particles config={config} />
  </group>
));

SceneContent.displayName = 'SceneContent';

interface NeuralBackgroundProps {
  isMobile?: boolean;
}

export const NeuralBackground = memo(({ isMobile = false }: NeuralBackgroundProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [config, setConfig] = useState<DeviceConfig | null>(null);

  useEffect(() => {
    const capability = isMobile ? 'low' : getDeviceCapability();
    const deviceConfig = getConfig(capability);
    
    setConfig(deviceConfig);
    
    // Immediate render for instant visual
    const timer = requestAnimationFrame(() => setShouldRender(true));
    return () => cancelAnimationFrame(timer);
  }, [isMobile]);

  if (!shouldRender || !config) return null;

  return (
    <div 
      className="absolute inset-0 gpu-accelerated" 
      style={{ background: 'transparent' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={config.dpr}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
        performance={{ min: 0.4, max: 0.8 }}
      >
        <SceneContent config={config} />
      </Canvas>
    </div>
  );
});

NeuralBackground.displayName = 'NeuralBackground';
