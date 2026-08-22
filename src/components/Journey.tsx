import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.journey-item'),
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
  }, []);

  return (
    <section style={{ padding: '100px 0' }}>
      <div ref={ref} className="section-wrap">
        <p className="section-num">02</p>
        <h2 className="section-heading">
          My <em className="serif" style={{ color: '#facc15' }}>Journey</em>
        </h2>

        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: 0, top: 8, bottom: 8,
            width: 1, background: 'rgba(255,255,255,0.08)',
          }} />

          {config.experiences.map((exp, i) => (
            <div key={i} className="journey-item" style={{
              position: 'relative',
              padding: '28px 0',
              borderBottom: i < config.experiences.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -36, top: 34,
                width: 8, height: 8, borderRadius: '50%',
                background: '#facc15', border: '2px solid #0a0a0a',
              }} />

              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                {/* Period */}
                <div style={{
                  minWidth: 120, fontSize: 13, fontWeight: 500,
                  color: '#facc15', letterSpacing: 1,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {exp.period}
                </div>

                {/* Content */}
                <div>
                  <h3 style={{
                    fontSize: 18, fontWeight: 600, color: '#fff',
                    marginBottom: 4, fontFamily: "'Inter', sans-serif",
                  }}>
                    {exp.role}
                  </h3>
                  <p style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>
                    {exp.company} — {exp.location}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {exp.highlights.map((h, j) => (
                      <span key={j} style={{
                        fontSize: 12, color: '#aaa',
                        background: 'rgba(250,204,21,0.06)',
                        border: '1px solid rgba(250,204,21,0.1)',
                        padding: '4px 12px', borderRadius: 20,
                      }}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
