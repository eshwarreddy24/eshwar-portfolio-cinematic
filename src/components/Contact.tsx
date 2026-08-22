import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.contact-reveal'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  const socials = [
    { label: 'LinkedIn', href: config.contact.linkedin, icon: '💼' },
    { label: 'Instagram', href: config.contact.instagram, icon: '📸' },
    { label: 'Email', href: `mailto:${config.contact.email}`, icon: '✉️' },
  ];

  return (
    <section id="contact" style={{ padding: '100px 0 0' }}>
      <div ref={ref} className="section-wrap" style={{ textAlign: 'center' }}>
        <p className="section-num contact-reveal">06</p>
        <h2 className="section-heading contact-reveal" style={{ marginBottom: 20 }}>
          Let's create what's{' '}
          <em className="serif" style={{ color: '#facc15' }}>next.</em>
        </h2>
        <p className="contact-reveal" style={{
          fontSize: 15, color: '#888', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7,
        }}>
          I'm open to opportunities, collaborations, and good conversations.
          If you're building something impactful, I'd like to hear about it.
        </p>

        <div className="contact-reveal" style={{ marginBottom: 60 }}>
          <a href={`mailto:${config.contact.email}`} className="btn btn-primary">
            <span>Start a Conversation</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>

        {/* Social links */}
        <div className="contact-reveal" style={{
          display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap',
          marginBottom: 60,
        }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 50,
              fontSize: 13, color: '#aaa', fontWeight: 500,
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,204,21,0.3)';
              (e.currentTarget as HTMLElement).style.color = '#facc15';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
              (e.currentTarget as HTMLElement).style.color = '#aaa';
            }}
            >
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span>{s.label}</span>
              <span style={{ fontSize: 14, opacity: 0.5 }}>↗</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '24px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: '#444', fontSize: 12,
        }}>
          <span>Designed & Developed by <b style={{ color: '#888' }}>Eshwar</b></span>
          <a href="#home" style={{ color: '#666', transition: 'color 0.3s' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#facc15'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#666'; }}
          >
            Back to top ↑
          </a>
          <span>© 2026 Eshwar Reddy Gali</span>
        </footer>
      </div>
    </section>
  );
}
