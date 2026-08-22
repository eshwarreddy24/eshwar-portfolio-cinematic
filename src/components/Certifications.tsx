import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      }
    );
  }, []);

  return (
    <section className="section" id="certifications" ref={sectionRef}>
      <div className="section-label">CREDENTIALS</div>
      <h2 className="section-title">Certifications</h2>

      <div ref={cardRef} style={{
        background: 'linear-gradient(135deg, rgba(255,215,0,0.06) 0%, rgba(255,215,0,0.02) 100%)',
        border: '1px solid rgba(255,215,0,0.15)',
        borderRadius: 16,
        padding: '40px 48px',
        maxWidth: 600,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative corner */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: 'linear-gradient(135deg, transparent 50%, rgba(255,215,0,0.1) 50%)',
        }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 20,
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'rgba(255,215,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}>
            🏆
          </div>
          <div>
            <h3 style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#fff',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              SAP Certified
            </h3>
            <p style={{ fontSize: 12, color: '#ffd700', letterSpacing: 2, fontWeight: 500 }}>
              SAP SERVICE CLOUD VERSION 2
            </p>
          </div>
        </div>

        <p style={{ fontSize: 15, color: '#aaa', lineHeight: 1.7 }}>
          Implementation Consultant — SAP Service Cloud Version 2
        </p>

        <div style={{
          marginTop: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#ffd700',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 12, color: '#666', letterSpacing: 2, textTransform: 'uppercase' }}>
            Verified Credential
          </span>
        </div>
      </div>
    </section>
  );
}
