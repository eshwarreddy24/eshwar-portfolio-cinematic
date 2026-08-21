import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function ParticleGalaxy() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1500;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const arm = i % 3;
      const armOffset = (arm / 3) * Math.PI * 2;
      const radius = 2 + Math.random() * 14;
      const spin = radius * 0.3;
      const angle = radius * 0.15 + armOffset + (Math.random() - 0.5) * 0.5;
      pos[i3] = Math.cos(angle + spin) * radius;
      pos[i3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i3 + 2] = Math.sin(angle + spin) * radius;
      const t = radius / 16;
      col[i3] = 0.5 * (1 - t); col[i3 + 1] = 0.4 * (1 - t); col[i3 + 2] = 0.7 * (1 - t);
    }
    return [pos, col];
  }, []);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function EnergyRings() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.015; });
  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh rotation={[0, 0.5, 1]}>
          <torusGeometry args={[6, 0.01, 16, 120]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh rotation={[1, 0.3, 0.5]}>
          <torusGeometry args={[10, 0.008, 16, 120]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>
    </group>
  );
}

function FloatingGeometry() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.x = state.clock.elapsedTime * (0.06 + i * 0.01);
      child.rotation.y = state.clock.elapsedTime * (0.08 + i * 0.008);
    });
  });
  const shapes = useMemo(() => [
    { pos: [-7, 3, -8] as [number, number, number], scale: 0.5, color: '#a78bfa', geo: 'oct' },
    { pos: [8, -2, -12] as [number, number, number], scale: 0.7, color: '#7c3aed', geo: 'ico' },
    { pos: [4, 5, -15] as [number, number, number], scale: 0.4, color: '#fbbf24', geo: 'dodec' },
  ], []);
  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <Float key={i} speed={0.4 + i * 0.15} rotationIntensity={0.3} floatIntensity={0.2}>
          <mesh position={s.pos} scale={s.scale}>
            {s.geo === 'oct' && <octahedronGeometry args={[1, 0]} />}
            {s.geo === 'ico' && <icosahedronGeometry args={[1, 0]} />}
            {s.geo === 'dodec' && <dodecahedronGeometry args={[1, 0]} />}
            <meshBasicMaterial color={s.color} wireframe transparent opacity={0.08} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <Stars radius={30} depth={50} count={800} factor={2} saturation={0.2} fade speed={0.3} />
      <ParticleGalaxy />
      <EnergyRings />
      <FloatingGeometry />
    </>
  );
}

export default function CinematicScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
      <Canvas camera={{ position: [0, 0, 18], fov: 55 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <color attach="background" args={['#08080f']} />
        <fog attach="fog" args={['#08080f', 18, 40]} />
        <Scene />
      </Canvas>
    </div>
  );
}