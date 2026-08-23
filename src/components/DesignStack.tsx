import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TOOLS = [
  { name: 'SAP MM', slug: 'sap', color: '#0070F2' },
  { name: 'ChatGPT', slug: 'openai', color: '#10A37F' },
  { name: 'Claude', slug: 'anthropic', color: '#D97706' },
  { name: 'Gemini', slug: 'google', color: '#4285F4' },
  { name: 'Figma', slug: 'figma', color: '#F24E1E' },
  { name: 'Canva', slug: 'canva', color: '#00C4CC' },
  { name: 'Photoshop', slug: 'adobephotoshop', color: '#31A8FF' },
  { name: 'After Effects', slug: 'adobeaftereffects', color: '#9999FF' },
  { name: 'Premiere Pro', slug: 'adobepremierepro', color: '#9999FF' },
  { name: 'SketchUp', slug: 'sketchup', color: '#E8E4E1' },
  { name: 'GitHub', slug: 'github', color: '#FFFFFF' },
  { name: 'MS Excel', slug: 'microsoftexcel', color: '#217346' },
  { name: 'MS Word', slug: 'microsoftword', color: '#2B579A' },
  { name: 'MS PPT', slug: 'microsoftpowerpoint', color: '#B7472A' },
  { name: 'Cursor', slug: 'cursor', color: '#00D4FF' },
  { name: 'Midjourney', slug: 'midjourney', color: '#FFFFFF' },
  { name: 'Python', slug: 'python', color: '#3776AB' },
];

const orbits = [
  { radius: 130, speed: 0.25, tilt: 15, items: TOOLS.slice(0, 6) },
  { radius: 210, speed: -0.18, tilt: -10, items: TOOLS.slice(6, 12) },
  { radius: 285, speed: 0.12, tilt: 20, items: TOOLS.slice(12) },
];

function ToolNode({ tool }: { tool: typeof TOOLS[0] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="tool-node" onClick={(e) => { e.stopPropagation(); setFlipped(f => !f); }}>
      <div className={`tool-flipper ${flipped ? 'flipped' : ''}`}>
        <div className="tool-face tool-front">
          <img
            src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color.replace('#', '')}`}
            alt={tool.name}
            width={28}
            height={28}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="tool-name">{tool.name}</span>
        </div>
        <div className="tool-face tool-back">
          <span className="tool-back-name">{tool.name}</span>
          <span className="tool-back-hint">tap to flip</span>
        </div>
      </div>
    </div>
  );
}

export default function DesignStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef([0, 0, 0]);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-triggered entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.tool-node'),
      { opacity: 0, scale: 0 },
      {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.04,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, []);

  // Continuous orbit rotation via requestAnimationFrame
  useEffect(() => {
    let raf: number;
    const tick = () => {
      orbits.forEach((orb, i) => {
        const el = orbitRefs.current[i];
        if (!el) return;
        angleRef.current[i] += orb.speed;
        const a = angleRef.current[i];
        // Rotate the orbit ring; counter-rotate children so icons stay upright
        el.style.transform = `rotateX(${orb.tilt}deg) rotateZ(${a}deg)`;
        el.querySelectorAll<HTMLElement>('.tool-node').forEach((node) => {
          node.style.transform = `rotateZ(${-a}deg) rotateX(${-orb.tilt}deg)`;
        });
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="stack" id="stack" ref={sectionRef}>
      <div className="stack-bg-grid" aria-hidden="true" />
      <div className="stack-bg-glow" aria-hidden="true" />

      <div className="stack-wrap">
        <p className="stack-eyebrow"><span>03</span> Design Stack</p>
        <h2 className="stack-h2">
          Tools & <em className="about-serif about-green">Software</em>
        </h2>

        {/* 3D perspective container */}
        <div className="solar-scene">
          <div className="solar-system">
            {/* Orbit ring guides */}
            {orbits.map((orb, i) => (
              <div
                key={i}
                className="solar-ring"
                style={{
                  width: orb.radius * 2,
                  height: orb.radius * 2,
                  transform: `rotateX(${orb.tilt}deg)`,
                }}
              />
            ))}

            {/* Orbiting icon containers */}
            {orbits.map((orb, i) => (
              <div
                key={i}
                className="solar-orbit"
                ref={(el) => { orbitRefs.current[i] = el; }}
                style={{ transform: `rotateX(${orb.tilt}deg)` }}
              >
                {orb.items.map((tool, j) => {
                  const angle = (j / orb.items.length) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * orb.radius;
                  const y = Math.sin(rad) * orb.radius;
                  return (
                    <div
                      key={tool.name}
                      className="orbit-node"
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${x}px - 32px)`,
                        top: `calc(50% + ${y}px - 32px)`,
                      }}
                    >
                      <ToolNode tool={tool} />
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Sun center */}
            <div className="solar-sun">
              <span className="solar-sun-icon">☀️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
