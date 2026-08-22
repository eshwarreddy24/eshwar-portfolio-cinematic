import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Career() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemsRef.current) return;
    gsap.fromTo(itemsRef.current.children,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      }
    );
  }, []);

  return (
    <section className="section" id="experience" ref={sectionRef}>
      <div className="section-label">EXPERIENCE</div>
      <h2 className="section-title">Where I've Worked</h2>

      <div ref={itemsRef} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {config.experiences.map((exp, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '140px 1fr',
            gap: 32,
            padding: '32px 0',
            borderBottom: i < config.experiences.length - 1 ? '1px solid rgba(255,215,0,0.08)' : 'none',
          }}>
            <div style={{
              fontSize: 13,
              color: '#ffd700',
              fontWeight: 500,
              letterSpacing: 1,
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {exp.period}
            </div>
            <div>
              <h3 style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#fff',
                marginBottom: 4,
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {exp.role}
              </h3>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>
                {exp.company} — {exp.location}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {exp.highlights.map((h, j) => (
                  <span key={j} style={{
                    fontSize: 12,
                    color: '#aaa',
                    background: 'rgba(255,215,0,0.06)',
                    border: '1px solid rgba(255,215,0,0.1)',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontWeight: 400,
                  }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
