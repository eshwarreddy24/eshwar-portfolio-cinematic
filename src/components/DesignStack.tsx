import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiFigma, SiSketchup, SiGithub } from 'react-icons/si';
import { FaRobot, FaBrain, FaStar, FaKeyboard, FaMusic, FaGem, FaBolt } from 'react-icons/fa6';
import { MdPhotoCamera, MdMovie, MdVideoFile, MdTableChart, MdDescription, MdSlideshow, MdBrush } from 'react-icons/md';

const rings = [
  { radius: 120, speed: 25, items: [
    { name: 'SAP MM', icon: <FaGem />, color: '#0070f2' },
    { name: 'ChatGPT', icon: <FaRobot />, color: '#10a37f' },
    { name: 'Claude', icon: <FaBrain />, color: '#d97706' },
    { name: 'Gemini', icon: <FaStar />, color: '#4285f4' },
    { name: 'Figma', icon: <SiFigma />, color: '#f24e1e' },
    { name: 'Canva', icon: <MdBrush />, color: '#00c4cc' },
  ]},
  { radius: 190, speed: -35, items: [
    { name: 'Photoshop', icon: <MdPhotoCamera />, color: '#31a8ff' },
    { name: 'After Effects', icon: <MdMovie />, color: '#9999ff' },
    { name: 'Premiere Pro', icon: <MdVideoFile />, color: '#9999ff' },
    { name: 'SketchUp', icon: <SiSketchup />, color: '#e8e4e1' },
    { name: 'GitHub', icon: <SiGithub />, color: '#fff' },
    { name: 'MS Excel', icon: <MdTableChart />, color: '#217346' },
  ]},
  { radius: 260, speed: 50, items: [
    { name: 'MS Word', icon: <MdDescription />, color: '#2b579a' },
    { name: 'MS PPT', icon: <MdSlideshow />, color: '#b7472a' },
    { name: 'Cursor', icon: <FaKeyboard />, color: '#00d4ff' },
    { name: 'Vibe Coding', icon: <FaMusic />, color: '#1db954' },
    { name: 'Midjourney', icon: <FaBolt />, color: '#fff' },
  ]},
];

function FlipNode({ item }: { item: { name: string; icon: React.ReactNode; color: string } }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flip-card" onClick={() => setFlipped(f => !f)}>
      <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-front">
          <span className="flip-icon" style={{ color: item.color }}>{item.icon}</span>
          <span className="flip-label">{item.name}</span>
        </div>
        <div className="flip-back">
          <span className="flip-back-name">{item.name}</span>
          <span className="flip-back-tap">Tap to flip</span>
        </div>
      </div>
    </div>
  );
}

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
      let angle = (360 / ring.items.length) * i * 20;
      const animate = () => {
        angle += ring.speed > 0 ? 0.3 : -0.3;
        el.style.transform = `rotate(${angle}deg)`;
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
          {rings.map((ring, i) => (
            <div key={i} className="solar-ring" style={{ width: ring.radius * 2, height: ring.radius * 2 }} />
          ))}

          {rings.map((ring, i) => (
            <div key={i} className="solar-orbit" ref={el => { ringRefs.current[i] = el; }}>
              {ring.items.map((item, j) => {
                const angle = (j / ring.items.length) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * ring.radius;
                const y = Math.sin(rad) * ring.radius;
                return (
                  <div key={item.name} className="orbit-node" style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px - 28px)`,
                    top: `calc(50% + ${y}px - 28px)`,
                  }}>
                    <FlipNode item={item} />
                  </div>
                );
              })}
            </div>
          ))}

          <div className="solar-sun">
            <span className="solar-sun-icon">☀️</span>
          </div>
        </div>
      </div>
    </section>
  );
}
