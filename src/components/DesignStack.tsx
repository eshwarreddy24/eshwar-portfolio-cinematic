import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const tools = [
  { name: 'SAP MM', icon: '⬡' }, { name: 'ChatGPT', icon: '🤖' },
  { name: 'Claude', icon: '🧠' }, { name: 'Gemini', icon: '✨' },
  { name: 'Figma', icon: '🖌️' }, { name: 'Canva', icon: '🎯' },
  { name: 'Photoshop', icon: '🖼️' }, { name: 'After Effects', icon: '🎬' },
  { name: 'Premiere Pro', icon: '🎞️' }, { name: 'SketchUp', icon: '🏠' },
  { name: 'GitHub', icon: '🐙' }, { name: 'MS Excel', icon: '📊' },
  { name: 'MS Word', icon: '📝' }, { name: 'MS PowerPoint', icon: '📽️' },
  { name: 'Cursor', icon: '⌨️' }, { name: 'Vibe Coding', icon: '🎶' },
  { name: 'Midjourney', icon: '🎨' },
];

export default function DesignStack() {
  const ref = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.orbit-item'),
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: .6, stagger: .04, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
  }, []);

  useEffect(() => {
    if (!orbitRef.current) return;
    const el = orbitRef.current;
    let angle = 0;
    let raf: number;
    const speed = 0.15;

    const animate = () => {
      angle += speed;
      el.style.transform = `rotateY(${angle}deg)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const radius = 200;

  return (
    <section className="stack" id="stack">
      {/* Animated background grid */}
      <div className="stack-bg-grid" aria-hidden="true" />
      <div className="stack-bg-glow" aria-hidden="true" />

      <div className="stack-wrap" ref={ref}>
        <p className="stack-eyebrow"><span>03</span> Design Stack</p>
        <h2 className="stack-h2">Tools & <em className="about-serif about-green">Software</em></h2>

        {/* 3D Orbit Sphere */}
        <div className="orbit-scene">
          <div className="orbit-sphere" ref={orbitRef}>
            {tools.map((t, i) => {
              const total = tools.length;
              const theta = (i / total) * Math.PI * 2;
              const phi = Math.acos(2 * ((i + 0.5) / total) - 1);
              const x = radius * Math.sin(phi) * Math.cos(theta);
              const y = radius * Math.sin(phi) * Math.sin(theta);
              const z = radius * Math.cos(phi);
              return (
                <div
                  key={t.name}
                  className="orbit-item"
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                  }}
                >
                  <span className="orbit-icon">{t.icon}</span>
                  <span className="orbit-label">{t.name}</span>
                </div>
              );
            })}
          </div>
          {/* Center core */}
          <div className="orbit-core">
            <span className="orbit-core-icon">💼</span>
          </div>
        </div>

        {/* Flat grid below as fallback/secondary view */}
        <div className="stack-grid">
          {tools.map(t => (
            <div key={t.name} className="stack-item">
              <span>{t.icon}</span>
              <small>{t.name}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
