import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const stats = [
  { icon: '📋', num: 4, suffix: '+', label: 'Roles Handled' },
  { icon: '🏗️', num: 2, suffix: '+', label: 'Years Experience' },
  { icon: '🌍', num: 150, suffix: '+', label: 'Vendors Coordinated' },
  { icon: '⭐', num: 100, suffix: '%', label: 'Commitment' },
];

export default function Hero() {
  const headRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headRef.current) return;
    const els = headRef.current.querySelectorAll('.hero-reveal');
    gsap.fromTo(els, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.3,
    });
  }, []);

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '80px 48px',
    }}>
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%)',
        left: '10%', top: '20%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(250,204,21,0.04) 0%, transparent 70%)',
        right: '10%', bottom: '20%', pointerEvents: 'none',
      }} />

      <div ref={headRef} style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Kicker */}
        <p className="hero-reveal" style={{
          fontFamily: "'Caveat', cursive", fontSize: 18, color: '#facc15',
          marginBottom: 16, opacity: 0,
        }}>
          Engineer & SAP Specialist
        </p>

        {/* Main heading with serif accents */}
        <h1 className="hero-reveal" style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(36px, 7vw, 72px)',
          fontWeight: 800, color: '#fff', lineHeight: 1.05,
          marginBottom: 24, opacity: 0,
        }}>
          <span style={{ display: 'block' }}>Engineering solutions that</span>
          <span style={{ display: 'block' }}>
            feel <em className="serif" style={{ color: '#facc15' }}>obvious.</em>
          </span>
        </h1>

        {/* Sub */}
        <p className="hero-reveal" style={{
          fontSize: 16, color: '#999', maxWidth: 520, margin: '0 auto 36px',
          lineHeight: 1.7, opacity: 0,
        }}>
          I bridge engineering, procurement, and design — making complex processes
          feel effortless. From SAP MM to graphic design, I deliver results.
        </p>

        {/* CTAs */}
        <div className="hero-reveal" style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          opacity: 0,
        }}>
          <a href="#work" className="btn btn-primary">
            <span>View My Work</span>
            <span className="btn-arrow">→</span>
          </a>
          <a href="#about" className="btn btn-ghost">
            <span>See How I Work</span>
          </a>
        </div>
      </div>

      {/* Portrait arch */}
      <div ref={portraitRef} style={{
        position: 'relative', marginTop: 60,
        width: 'clamp(260px, 30vw, 380px)',
        height: 'clamp(300px, 35vw, 440px)',
      }}>
        {/* Arch decoration */}
        <div style={{
          position: 'absolute', inset: -20,
          border: '1px solid rgba(250,204,21,0.15)',
          borderRadius: '50% 50% 0 0',
          pointerEvents: 'none',
        }} />
        {/* Portrait */}
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50% 50% 0 0',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(250,204,21,0.08), rgba(255,255,255,0.02))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src="/profile.jpg"
            alt="Eshwar Reddy Gali"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
            }}
          />
        </div>
      </div>

      {/* Stat cards flanking */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 16, maxWidth: 700, width: '100%',
        marginTop: 48,
      }}>
        {stats.map((s, i) => (
          <div key={i} className="hero-reveal" style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '18px 20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, opacity: 0,
          }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div>
              <div style={{
                fontSize: 22, fontWeight: 700, color: '#fff',
                fontFamily: "'Inter', sans-serif",
              }}>
                {s.num}<span style={{ color: '#facc15' }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: 12, color: '#888', letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'float 2s ease-in-out infinite',
      }}>
        <span style={{ fontSize: 11, letterSpacing: 2, color: '#555', fontWeight: 500 }}>Scroll to Explore</span>
        <span style={{ fontSize: 16, color: '#facc15' }}>↓</span>
      </div>
    </section>
  );
}
