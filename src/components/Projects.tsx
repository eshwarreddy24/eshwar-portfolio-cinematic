import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      }
    );
  }, []);

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <div className="section-label">PROJECTS</div>
      <h2 className="section-title">Featured Work</h2>

      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {config.projects.map((proj, i) => (
          <div key={i} style={{
            perspective: '1000px',
            height: 280,
            cursor: 'none',
          }}>
            <div className="flip-card" style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'rotateY(180deg)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'rotateY(0deg)';
            }}
            >
              {/* Front */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, rgba(255,215,0,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,215,0,0.1)',
                borderRadius: 16,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(255,215,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    marginBottom: 16,
                  }}>
                    {i === 0 ? '📊' : '📄'}
                  </div>
                  <h3 style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: 8,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {proj.name}
                  </h3>
                  <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
                    {proj.description}
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {proj.tech.map((t, j) => (
                    <span key={j} style={{
                      fontSize: 11,
                      color: '#ffd700',
                      background: 'rgba(255,215,0,0.08)',
                      padding: '3px 10px',
                      borderRadius: 12,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Back */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, rgba(255,215,0,0.12) 0%, rgba(0,0,0,0.9) 100%)',
                border: '1px solid rgba(255,215,0,0.2)',
                borderRadius: 16,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>
                  {i === 0 ? '🧠' : '⚡'}
                </div>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#ffd700',
                  marginBottom: 8,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {proj.name}
                </h3>
                <p style={{ fontSize: 13, color: '#aaa' }}>
                  Built with {proj.tech.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
