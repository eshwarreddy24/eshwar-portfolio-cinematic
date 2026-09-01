import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#00ff88" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function FloatingShape({ position, color, speed = 1, size = 0.3 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  size?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.15;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} wireframe transparent opacity={0.4} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-3d-canvas">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#00ff88" />
        <Particles count={200} />
        <FloatingShape position={[-3, 1, -2]} color="#00ff88" speed={0.6} size={0.35} />
        <FloatingShape position={[3, -1, -3]} color="#00cc6a" speed={0.8} size={0.25} />
        <FloatingShape position={[0, 2, -4]} color="#00ff88" speed={0.5} size={0.4} />
        <Stars radius={12} depth={20} count={400} factor={1.5} saturation={0} fade speed={0.3} />
      </Canvas>
    </div>
  );
}
