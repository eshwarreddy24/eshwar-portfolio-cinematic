import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const rings = [
  { radius: 120, speed: 25, items: [
    { name: 'SAP MM', icon: '⬡' }, { name: 'ChatGPT', icon: '🤖' },
    { name: 'Claude', icon: '🧠' }, { name: 'Gemini', icon: '✨' },
    { name: 'Figma', icon: '🖌️' }, { name: 'Canva', icon: '🎯' },
  ]},
  { radius: 190, speed: -35, items: [
    { name: 'Photoshop', icon: '🖼️' }, { name: 'After Effects', icon: '🎬' },
    { name: 'Premiere Pro', icon: '🎞️' }, { name: 'SketchUp', icon: '🏠' },
    { name: 'GitHub', icon: '🐙' }, { name: 'MS Excel', icon: '📊' },
  ]},
  { radius: 260, speed: 50, items: [
    { name: 'MS Word', icon: '📝' }, { name: 'MS PowerPoint', icon: '📽️' },
    { name: 'Cursor', icon: '⌨️' }, { name: 'Vibe Coding', icon: '🎶' },
    { name: 'Midjourney', icon: '🎨' },
  ]},
];

export default function DesignStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll('.orbit-node'),
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: .5, stagger: .03, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      }
    );
  }, []);

  useEffect(() => {
    const anims: number[] = [];
    rings.forEach((ring, i) => {
      const el = ringRefs.current[i];
      if (!el) return;
      let angle = (360 / ring.items.length) * i * 20; // offset each ring
      const animate = () => {
        angle += ring.speed > 0 ? 0.3 : -0.3;
        el.style.transform = `rotate(${angle}deg)`;
        // Counter-rotate children so text stays upright
        el.querySelectorAll('.orbit-node').forEach(node => {
          (node as HTMLElement).style.transform = `rotate(${-angle}deg)`;
        });
        anims.push(requestAnimationFrame(animate));
      };
      anims.push(requestAnimationFrame(animate));
    });
    return () => anims.forEach(id => cancelAnimationFrame(id));
  }, []);

  return (
    <section className="stack" id="stack" ref={sectionRef}>
      <div className="stack-bg-grid" aria-hidden="true" />
      <div className="stack-bg-glow" aria-hidden="true" />

      <div className="stack-wrap">
        <p className="stack-eyebrow"><span>03</span> Design Stack</p>
        <h2 className="stack-h2">Tools & <em className="about-serif about-green">Software</em></h2>

        <div className="solar-system">
          {/* Orbit rings (visual guides) */}
          {rings.map((ring, i) => (
            <div
              key={i}
              className="solar-ring"
              style={{ width: ring.radius * 2, height: ring.radius * 2 }}
            />
          ))}

          {/* Rotating rings with icons */}
          {rings.map((ring, i) => (
            <div
              key={i}
              className="solar-orbit"
              ref={el => { ringRefs.current[i] = el; }}
            >
              {ring.items.map((item, j) => {
                const angle = (j / ring.items.length) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * ring.radius;
                const y = Math.sin(rad) * ring.radius;
                return (
                  <div
                    key={item.name}
                    className="orbit-node"
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${x}px - 26px)`,
                      top: `calc(50% + ${y}px - 26px)`,
                    }}
                  >
                    <span className="orbit-node-icon">{item.icon}</span>
                    <span className="orbit-node-label">{item.name}</span>
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
    </section>
  );
}
