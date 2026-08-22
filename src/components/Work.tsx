import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.work-card'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section style={{ padding: '100px 0' }}>
      <div ref={ref} className="section-wrap">
        <p className="section-num">04</p>
        <h2 className="section-heading">
          Featured <em className="serif" style={{ color: '#facc15' }}>Work</em>
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {config.projects.map((proj, i) => (
            <div key={i} className="work-card" style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 32,
              transition: 'all 0.35s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,204,21,0.2)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(250,204,21,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 20,
              }}>
                {i === 0 ? '📊' : '📄'}
              </div>

              <h3 style={{
                fontSize: 20, fontWeight: 600, color: '#fff',
                marginBottom: 10, fontFamily: "'Inter', sans-serif",
              }}>
                {proj.name}
              </h3>
              <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, marginBottom: 20 }}>
                {proj.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {proj.tech.map((t, j) => (
                  <span key={j} style={{
                    fontSize: 11, color: '#facc15',
                    background: 'rgba(250,204,21,0.06)',
                    padding: '4px 10px', borderRadius: 12,
                    fontWeight: 500,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
