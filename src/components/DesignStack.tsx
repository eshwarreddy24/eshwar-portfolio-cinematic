import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const tools = [
  { name: 'SAP MM', icon: '⬡' }, { name: 'ChatGPT', icon: '🤖' },
  { name: 'Claude', icon: '🧠' }, { name: 'Gemini', icon: '✨' },
  { name: 'Figma', icon: '🖌️' }, { name: 'Canva', icon: '🎯' },
  { name: 'Photoshop', icon: '🖼️' }, { name: 'After Effects', icon: '🎬' },
  { name: 'Premiere Pro', icon: '🎞️' }, { name: 'SketchUp', icon: '🏠' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'MS Excel', icon: '📊' }, { name: 'MS Word', icon: '📝' },
  { name: 'MS PowerPoint', icon: '📽️' }, { name: 'Cursor', icon: '⌨️' },
  { name: 'Vibe Coding', icon: '🎶' }, { name: 'Midjourney', icon: '🎨' },
];

export default function DesignStack() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.stack-item'),
      { opacity: 0, y: 20, scale: .9 },
      { opacity: 1, y: 0, scale: 1, duration: .5, stagger: .03, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section className="stack">
      <div className="stack-wrap" ref={ref}>
        <p className="stack-eyebrow"><span>03</span> Design Stack</p>
        <h2 className="stack-h2">Tools & <em className="about-serif about-green">Software</em></h2>
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
