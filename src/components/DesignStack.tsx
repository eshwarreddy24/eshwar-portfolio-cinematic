import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Tool { name: string; icon: string; }

const tools: Tool[] = [
  { name: 'SAP MM', icon: '⬡' },
  { name: 'ChatGPT', icon: '🤖' },
  { name: 'Claude', icon: '🧠' },
  { name: 'Gemini', icon: '✨' },
  { name: 'Figma', icon: '🖌️' },
  { name: 'Canva', icon: '🎯' },
  { name: 'Photoshop', icon: '🖼️' },
  { name: 'After Effects', icon: '🎬' },
  { name: 'Premiere Pro', icon: '🎞️' },
  { name: 'SketchUp', icon: '🏠' },
  { name: 'AutoCAD', icon: '📐' },
  { name: 'Python', icon: '🐍' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'MS Excel', icon: '📊' },
  { name: 'MS Word', icon: '📝' },
  { name: 'MS PowerPoint', icon: '📽️' },
  { name: 'Cursor', icon: '⌨️' },
  { name: 'Vibe Coding', icon: '🎶' },
];

export default function DesignStack() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.stack-item'),
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section style={{ padding: '100px 0' }}>
      <div ref={ref} className="section-wrap">
        <p className="section-num">03</p>
        <h2 className="section-heading">
          Design <em className="serif" style={{ color: '#facc15' }}>Stack</em>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
          gap: 12,
          maxWidth: 700,
        }}>
          {tools.map((tool) => (
            <div key={tool.name} className="stack-item" style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8,
              padding: '18px 8px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12,
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,204,21,0.2)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
            >
              <span style={{ fontSize: 28 }}>{tool.icon}</span>
              <span style={{
                fontSize: 10, letterSpacing: 0.5, color: '#777',
                fontWeight: 500, textTransform: 'uppercase', textAlign: 'center',
              }}>
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
