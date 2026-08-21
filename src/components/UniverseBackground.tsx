import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 25;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);
      siz[i] = Math.random() * 2 + 0.5;

      // Cyan to blue color variation
      const t = Math.random();
      col[i3] = t * 0.1;
      col[i3 + 1] = 0.5 + t * 0.3;
      col[i3 + 2] = 0.8 + t * 0.2;
    }
    return [pos, siz, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NebulaCloud() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.005;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.003) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[20, 32, 32]} />
      <meshBasicMaterial
        color="#001428"
        transparent
        opacity={0.15}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function EnergyRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {[8, 12, 16].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.3]}>
          <torusGeometry args={[radius, 0.02, 8, 100]} />
          <meshBasicMaterial
            color={i === 0 ? '#00c8ff' : i === 1 ? '#0088cc' : '#004466'}
            transparent
            opacity={0.3 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = state.clock.elapsedTime * (0.1 + i * 0.02);
      child.rotation.y = state.clock.elapsedTime * (0.15 + i * 0.01);
      (child as THREE.Mesh).position.y += Math.sin(state.clock.elapsedTime + i) * 0.001;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      <mesh position={[-6, 3, -5]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#00c8ff" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[7, -2, -8]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#006688" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh position={[4, 5, -12]}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#00aadd" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function UniverseBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#030308']} />
        <fog attach="fog" args={['#030308', 15, 40]} />
        <ParticleField />
        <NebulaCloud />
        <EnergyRings />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}