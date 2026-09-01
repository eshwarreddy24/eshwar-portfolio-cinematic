import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 800 }) {
  const mesh = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.05;
      mesh.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ff88"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
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
      mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={mesh} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshStandardMaterial
        color="#00ff88"
        wireframe
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-3d-canvas">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#00ff88" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#00cc6a" />
        <Particles count={600} />
        <FloatingShape position={[-3, 1, -2]} color="#00ff88" speed={0.8} size={0.4} />
        <FloatingShape position={[3, -1, -3]} color="#00cc6a" speed={1.2} size={0.3} />
        <FloatingShape position={[0, 2, -4]} color="#00ff88" speed={0.6} size={0.5} />
        <FloatingShape position={[-2, -2, -1]} color="#00aa5c" speed={1} size={0.25} />
        <FloatingShape position={[2, 2, -2]} color="#00ff88" speed={0.9} size={0.35} />
        <GridFloor />
        <Stars radius={15} depth={30} count={1000} factor={2} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
