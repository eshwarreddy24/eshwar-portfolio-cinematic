import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(textRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      }
    );
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef} style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(255,215,0,0.03) 0%, transparent 60%)',
        borderRadius: 24,
        pointerEvents: 'none',
      }} />
      <div ref={textRef}>
        <div className="section-label">ABOUT</div>
        <h2 className="section-title">Engineering Professional<br />& SAP Specialist</h2>
        <p style={{ color: '#aaa', fontSize: 17, lineHeight: 1.8, maxWidth: 700, marginBottom: 16 }}>
          Engineering professional with expertise in design, documentation, estimation & procurement. Currently handling SAP MM operations at Airports Authority of India, with strong experience in client coordination, project management, and graphic design.
        </p>
        <p style={{ color: '#666', fontSize: 15, lineHeight: 1.8, maxWidth: 700 }}>
          Content creator & graphic designer since 2020 — crafting visual stories, animations, and meme content across platforms.
        </p>
      </div>
    </section>
  );
}
