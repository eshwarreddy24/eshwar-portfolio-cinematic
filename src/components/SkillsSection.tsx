import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Tool { name: string; icon: string; color: string; }

const designTools: Tool[] = [
  { name: 'Midjourney', icon: '🎨', color: '#fff' },
  { name: 'After Effects', icon: '🎬', color: '#9999FF' },
  { name: 'Photoshop', icon: '🖼️', color: '#31A8FF' },
  { name: 'Premiere Pro', icon: '🎞️', color: '#9999FF' },
  { name: 'Illustrator', icon: '✏️', color: '#FF9A00' },
  { name: 'SketchUp', icon: '🏠', color: '#E8722A' },
  { name: 'Canva', icon: '🎯', color: '#00C4CC' },
  { name: 'Figma', icon: '🖌️', color: '#F24E1E' },
];

const engineeringTools: Tool[] = [
  { name: 'AutoCAD', icon: '📐', color: '#E32636' },
  { name: 'SAP MM', icon: '⬡', color: '#0070F2' },
  { name: 'MS Excel', icon: '📊', color: '#217346' },
  { name: 'MS Word', icon: '📝', color: '#2B579A' },
  { name: 'MS PowerPoint', icon: '📽️', color: '#D24726' },
];

const techTools: Tool[] = [
  { name: 'ChatGPT', icon: '🤖', color: '#10A37F' },
  { name: 'Claude', icon: '🧠', color: '#D97757' },
  { name: 'Gemini', icon: '✨', color: '#4285F4' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'GitHub', icon: '🐙', color: '#fff' },
  { name: 'Cursor', icon: '⌨️', color: '#7C3AED' },
  { name: 'Vibe Coding', icon: '🎶', color: '#EC4899' },
];

function ToolCard({ tool }: { tool: Tool }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref}
      onMouseEnter={() => gsap.to(ref.current, { y: -8, scale: 1.05, duration: 0.3, ease: 'power2.out' })}
      onMouseLeave={() => gsap.to(ref.current, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        padding: '20px 12px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,215,0,0.08)',
        borderRadius: 12, transition: 'border-color 0.3s', cursor: 'none',
      }}
    >
      <span style={{ fontSize: 32 }}>{tool.icon}</span>
      <span style={{ fontSize: 11, letterSpacing: 1, color: '#888', fontWeight: 500, textTransform: 'uppercase' }}>
        {tool.name}
      </span>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      }
    );
  }, []);

  return (
    <section className="section" id="tools" ref={sectionRef}>
      <div className="section-label">DESIGN STACK</div>
      <h2 className="section-title">Tools & Software</h2>
      <div ref={gridRef}>
        <h3 style={{ fontSize: 13, letterSpacing: 3, color: '#ffd700', marginBottom: 16, fontWeight: 500 }}>DESIGN & CREATIVITY</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12, marginBottom: 40 }}>
          {designTools.map((t) => <ToolCard key={t.name} tool={t} />)}
        </div>
        <h3 style={{ fontSize: 13, letterSpacing: 3, color: '#ffd700', marginBottom: 16, fontWeight: 500 }}>ENGINEERING & PROCUREMENT</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12, marginBottom: 40 }}>
          {engineeringTools.map((t) => <ToolCard key={t.name} tool={t} />)}
        </div>
        <h3 style={{ fontSize: 13, letterSpacing: 3, color: '#ffd700', marginBottom: 16, fontWeight: 500 }}>TECH & AI TOOLS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
          {techTools.map((t) => <ToolCard key={t.name} tool={t} />)}
        </div>
      </div>
    </section>
  );
}
