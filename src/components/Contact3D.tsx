import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function RotatingEnvelope() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.4;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={group}>
        <mesh>
          <boxGeometry args={[1.2, 0.8, 0.06]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#00ff88" emissiveIntensity={0.08} />
        </mesh>
        <mesh position={[0, 0.3, 0.03]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.65, 0.4, 4]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 0, -0.08]}>
          <torusGeometry args={[0.85, 0.015, 12, 48]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

function ContactParticles() {
  const mesh = useRef<THREE.Points>(null!);
  const positions = new Float32Array(80 * 3);
  for (let i = 0; i < 80; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

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
      <pointsMaterial size={0.025} color="#00ff88" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

export default function Contact3D() {
  return (
    <div className="contact-3d-canvas">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.12} />
        <pointLight position={[2, 2, 2]} intensity={0.4} color="#00ff88" />
        <RotatingEnvelope />
        <ContactParticles />
      </Canvas>
    </div>
  );
}
