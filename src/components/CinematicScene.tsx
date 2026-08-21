import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Particle Galaxy ────────────────────────── */
function ParticleGalaxy() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const arm = i % 3;
      const armOffset = (arm / 3) * Math.PI * 2;
      const radius = 2 + Math.random() * 16;
      const spin = radius * 0.3;
      const angle = radius * 0.15 + armOffset + (Math.random() - 0.5) * 0.5;

      pos[i3] = Math.cos(angle + spin) * radius + (Math.random() - 0.5) * 1.5;
      pos[i3 + 1] = (Math.random() - 0.5) * 2 * Math.exp(-radius * 0.08);
      pos[i3 + 2] = Math.sin(angle + spin) * radius + (Math.random() - 0.5) * 1.5;

      const t = radius / 18;
      col[i3] = 0.1 * (1 - t);
      col[i3 + 1] = 0.6 + 0.4 * (1 - t);
      col[i3 + 2] = 0.9 + 0.1 * (1 - t);
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Floating Energy Rings ──────────────────── */
function EnergyRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh rotation={[0, 0.5, 1]}>
          <torusGeometry args={[6, 0.015, 16, 120]} />
          <meshBasicMaterial color="#00c8ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh rotation={[1, 0.3, 0.5]}>
          <torusGeometry args={[9, 0.01, 16, 120]} />
          <meshBasicMaterial color="#0088cc" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh rotation={[0.5, 1, 0.3]}>
          <torusGeometry args={[12, 0.008, 16, 120]} />
          <meshBasicMaterial color="#004466" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>
    </group>
  );
}

/* ── Floating Wireframe Geometry ────────────── */
function FloatingGeometry() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.x = state.clock.elapsedTime * (0.08 + i * 0.015);
      child.rotation.y = state.clock.elapsedTime * (0.12 + i * 0.01);
    });
  });

  const shapes = useMemo(() => [
    { pos: [-8, 4, -6] as [number, number, number], scale: 0.7, color: '#00c8ff', geo: 'oct' },
    { pos: [10, -3, -10] as [number, number, number], scale: 1.0, color: '#006688', geo: 'ico' },
    { pos: [5, 6, -14] as [number, number, number], scale: 0.5, color: '#00aadd', geo: 'dodec' },
    { pos: [-6, -5, -8] as [number, number, number], scale: 0.8, color: '#004466', geo: 'oct' },
  ], []);

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <Float key={i} speed={0.5 + i * 0.2} rotationIntensity={0.4} floatIntensity={0.3}>
          <mesh position={s.pos} scale={s.scale}>
            {s.geo === 'oct' && <octahedronGeometry args={[1, 0]} />}
            {s.geo === 'ico' && <icosahedronGeometry args={[1, 0]} />}
            {s.geo === 'dodec' && <dodecahedronGeometry args={[1, 0]} />}
            <meshBasicMaterial color={s.color} wireframe transparent opacity={0.2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ── Mouse Light ────────────────────────────── */
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lightRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      lightRef.current.position.x = x * 10;
      lightRef.current.position.y = y * 6;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <pointLight ref={lightRef} color="#00c8ff" intensity={2} distance={20} decay={2} />
  );
}

/* ── Scene ──────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 10]} intensity={0.8} color="#00c8ff" />
      <pointLight position={[-10, -5, 5]} intensity={0.4} color="#004488" />
      <MouseLight />
      <Stars radius={30} depth={50} count={2000} factor={3} saturation={0.5} fade speed={0.5} />
      <ParticleGalaxy />
      <EnergyRings />
      <FloatingGeometry />
    </>
  );
}

/* ── Export ─────────────────────────────────── */
export default function CinematicScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 18], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#030308']} />
        <fog attach="fog" args={['#030308', 20, 45]} />
        <Scene />
      </Canvas>
    </div>
  );
}