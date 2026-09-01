import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  color: string;
}

const projects: Project[] = [
  {
    title: 'Smart Procurement Dashboard',
    desc: 'Real-time analytics for airport invoice lifecycles and vendor compliance tracking.',
    tags: ['SAP MM', 'Excel', 'MIS'],
    color: '#00ff88',
  },
  {
    title: 'e-Office Document System',
    desc: 'Centralized audit-ready records architecture for government-grade data integrity.',
    tags: ['e-Office', 'EDMS', 'Governance'],
    color: '#00cc6a',
  },
  {
    title: 'Vendor Compliance Engine',
    desc: 'Automated screening pipeline for 150+ MSME partners via GeM Portal integration.',
    tags: ['GeM', 'Procurement', 'Compliance'],
    color: '#00aa5c',
  },
];

function ProjectCard({ project, index, onSelect }: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (mesh.current) {
      const targetScale = hovered ? 1.08 : 1;
      mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={1.5 + index * 0.3} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[(index - 1) * 2.5, 0, 0]}>
        <RoundedBox
          ref={mesh}
          args={[2, 2.5, 0.15]}
          radius={0.1}
          smoothness={4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onSelect(project)}
        >
          <meshStandardMaterial
            color={hovered ? project.color : '#1a1a1a'}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.4 : 0.1}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        {/* Glow border */}
        <mesh position={[0, 0, -0.01]}>
          <RoundedBox args={[2.06, 2.56, 0.1]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color={project.color}
              transparent
              opacity={0.15}
            />
          </RoundedBox>
        </mesh>
      </group>
    </Float>
  );
}

function GalleryScene({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 3, 5]} intensity={0.5} color="#00ff88" />
      <pointLight position={[-5, 0, 3]} intensity={0.3} color="#00cc6a" />
      {projects.map((p, i) => (
        <ProjectCard key={i} project={p} index={i} onSelect={onSelect} />
      ))}
    </>
  );
}

export default function Gallery3D() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="gallery-3d-section">
      <div className="gallery-3d-canvas">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <GalleryScene onSelect={setSelected} />
        </Canvas>
      </div>

      {selected && (
        <div className="gallery-overlay" onClick={() => setSelected(null)}>
          <div className="gallery-overlay-card" onClick={e => e.stopPropagation()}>
            <button className="gallery-close" onClick={() => setSelected(null)}>✕</button>
            <div className="gallery-overlay-glow" style={{ background: selected.color }} />
            <h3>{selected.title}</h3>
            <p>{selected.desc}</p>
            <div className="gallery-tags">
              {selected.tags.map(t => (
                <span key={t} className="gallery-tag" style={{ borderColor: selected.color }}>{t}</span>
              ))}
            </div>
            <div className="gallery-overlay-actions">
              <button className="btn btn-primary btn-sm" onClick={() => setSelected(null)}>
                <span className="btn-fill" />
                <span className="btn-labelWrap"><span className="btn-labelStack"><span className="btn-label">Close</span><span className="btn-labelClone">Close</span></span></span>
                <span className="btn-arrow"><span className="btn-lead">→</span></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
