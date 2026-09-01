import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles({ count = 300 }) {
  const mesh = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00ff88" transparent opacity={0.5} sizeAttenuation />
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
      const s = Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.1 + 1;
      mesh.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={position}>
        <mesh ref={mesh}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color="#00ff88"
            transparent
            opacity={0.1}
            wireframe
          />
        </mesh>
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function ExperienceContent() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 3, 0]} intensity={0.6} color="#00ff88" distance={15} />
      <pointLight position={[-5, 0, -5]} intensity={0.3} color="#00cc6a" />
      <pointLight position={[5, 0, -10]} intensity={0.3} color="#00ff88" />

      <FloatingParticles count={400} />

      <MilestoneOrb position={[-3, 0.5, -2]} label="SAP MM" delay={0} />
      <MilestoneOrb position={[2, 1, -5]} label="Procurement" delay={1} />
      <MilestoneOrb position={[-1, -0.5, -8]} label="e-Office" delay={2} />
      <MilestoneOrb position={[3, 0.8, -11]} label="GeM Portal" delay={3} />
      <MilestoneOrb position={[-2, 0.3, -14]} label="Executive Ops" delay={4} />
      <MilestoneOrb position={[1, -0.3, -17]} label="MIS Reports" delay={5} />

      {/* Connecting lines */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -3, 0.5, -2, 2, 1, -5,
              2, 1, -5, -1, -0.5, -8,
              -1, -0.5, -8, 3, 0.8, -11,
              3, 0.8, -11, -2, 0.3, -14,
              -2, 0.3, -14, 1, -0.3, -17,
            ]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ff88" transparent opacity={0.15} />
      </line>
    </>
  );
}

export default function ExperienceRoom() {
  return (
    <div className="experience-3d-canvas">
      <Canvas camera={{ position: [0, 1, 3], fov: 60 }}>
        <ExperienceContent />
      </Canvas>
    </div>
  );
}
