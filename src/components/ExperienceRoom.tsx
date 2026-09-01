import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles({ count = 100 }) {
  const mesh = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00ff88" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function MilestoneOrb({ position, label, delay = 0 }: {
  position: [number, number, number];
  label: string;
  delay?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (mesh.current) {
      const s = Math.sin(state.clock.elapsedTime * 1.2 + delay) * 0.08 + 1;
      mesh.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <group position={position}>
        <mesh ref={mesh}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.4} transparent opacity={0.8} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshStandardMaterial color="#00ff88" transparent opacity={0.08} wireframe />
        </mesh>
        <Text position={[0, 0.5, 0]} fontSize={0.12} color="#ffffff" anchorX="center" anchorY="middle">
          {label}
        </Text>
      </group>
    </Float>
  );
}

export default function ExperienceRoom() {
  return (
    <div className="experience-3d-canvas">
      <Canvas camera={{ position: [0, 1, 4], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.12} />
        <pointLight position={[0, 3, 0]} intensity={0.4} color="#00ff88" distance={12} />
        <FloatingParticles count={120} />
        <MilestoneOrb position={[-2.5, 0.5, -2]} label="SAP MM" delay={0} />
        <MilestoneOrb position={[2, 1, -4]} label="Procurement" delay={1} />
        <MilestoneOrb position={[-1, -0.3, -6]} label="e-Office" delay={2} />
        <MilestoneOrb position={[2.5, 0.6, -8]} label="GeM Portal" delay={3} />
        <MilestoneOrb position={[-2, 0.2, -10]} label="Executive Ops" delay={4} />
      </Canvas>
    </div>
  );
}
