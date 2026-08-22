import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Credentials() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.cred-reveal'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section style={{ padding: '100px 0' }}>
      <div ref={ref} className="section-wrap">
        <p className="section-num cred-reveal">05</p>
        <h2 className="section-heading cred-reveal">
          <em className="serif" style={{ color: '#facc15' }}>Certifications</em>
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {/* SAP Certification */}
          <div className="cred-reveal" style={{
            background: 'rgba(250,204,21,0.04)',
            border: '1px solid rgba(250,204,21,0.12)',
            borderRadius: 16, padding: 32,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Corner accent */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 60, height: 60,
              background: 'linear-gradient(135deg, transparent 50%, rgba(250,204,21,0.08) 50%)',
            }} />

            <div style={{
              display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'rgba(250,204,21,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>
                🏆
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff' }}>
                  SAP Certified
                </h3>
                <p style={{ fontSize: 11, color: '#facc15', letterSpacing: 2, fontWeight: 500 }}>
                  SAP SERVICE CLOUD V2
                </p>
              </div>
            </div>

            <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.7 }}>
              Implementation Consultant — SAP Service Cloud Version 2
            </p>

            <div style={{
              marginTop: 20, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#facc15', animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 11, color: '#666', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Verified Credential
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
