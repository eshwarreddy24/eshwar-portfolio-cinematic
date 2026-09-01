import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function RotatingEnvelope() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.5;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={group}>
        {/* Envelope body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 1, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#00ff88" emissiveIntensity={0.1} />
        </mesh>
        {/* Envelope flap */}
        <mesh position={[0, 0.35, 0.04]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.8, 0.5, 4]} />
          <MeshDistortMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
            distort={0.2}
            speed={2}
          />
        </mesh>
        {/* Glow ring */}
        <mesh position={[0, 0, -0.1]}>
          <torusGeometry args={[1, 0.02, 16, 64]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function ContactParticles() {
  const mesh = useRef<THREE.Points>(null!);
  const positions = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00ff88" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Contact3D() {
  return (
    <div className="contact-3d-canvas">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 3]} intensity={0.6} color="#00ff88" />
        <pointLight position={[-3, -2, 2]} intensity={0.3} color="#00cc6a" />
        <RotatingEnvelope />
        <ContactParticles />
      </Canvas>
    </div>
  );
}
