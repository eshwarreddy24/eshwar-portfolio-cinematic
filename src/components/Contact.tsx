import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      }
    );
  }, []);

  return (
    <section className="section" id="contact" ref={sectionRef} style={{ paddingBottom: 80 }}>
      <div ref={contentRef}>
        <div className="section-label">GET IN TOUCH</div>
        <h2 className="section-title">Let's Work Together</h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 400,
        }}>
          <a href={`mailto:${config.contact.email}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 15,
            color: '#aaa',
            padding: '16px 20px',
            background: 'rgba(255,215,0,0.04)',
            border: '1px solid rgba(255,215,0,0.1)',
            borderRadius: 12,
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,0,0.3)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,215,0,0.08)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,0,0.1)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,215,0,0.04)';
          }}
          >
            <span style={{ fontSize: 20 }}>✉️</span>
            {config.contact.email}
          </a>

          <a href={config.contact.linkedin} target="_blank" rel="noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 15,
            color: '#aaa',
            padding: '16px 20px',
            background: 'rgba(255,215,0,0.04)',
            border: '1px solid rgba(255,215,0,0.1)',
            borderRadius: 12,
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,0,0.3)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,215,0,0.08)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,0,0.1)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,215,0,0.04)';
          }}
          >
            <span style={{ fontSize: 20 }}>💼</span>
            LinkedIn Profile
          </a>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 80,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,215,0,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#444',
          fontSize: 12,
        }}>
          <span>© 2026 Eshwar Reddy Gali</span>
          <span>Designed with passion ✨</span>
        </div>
      </div>
    </section>
  );
}
