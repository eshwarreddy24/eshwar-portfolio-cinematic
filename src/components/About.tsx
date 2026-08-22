import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.about-reveal'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section style={{ padding: '100px 0' }} id="about-content">
      <div ref={ref} className="section-wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        {/* Left - Text */}
        <div>
          <p className="section-num about-reveal">01</p>
          <h2 className="section-heading about-reveal">
            About <em className="serif" style={{ color: '#facc15' }}>Me</em>
          </h2>
          <p className="about-reveal" style={{ fontSize: 15, color: '#aaa', lineHeight: 1.8, marginBottom: 16 }}>
            Engineering professional with experience spanning procurement, SAP MM operations,
            interior design coordination, graphic designing, and content creation.
          </p>
          <p className="about-reveal" style={{ fontSize: 15, color: '#888', lineHeight: 1.8, marginBottom: 24 }}>
            At Airports Authority of India, I handle SAP MM billing, tender scrutiny for 150+ vendors,
            BOQs, estimation, GeM portal operations, and e-Office. Previously at Organo Eco Habitats,
            I coordinated premium NRI clients on interior design projects.
          </p>
          <p className="about-reveal" style={{ fontSize: 15, color: '#888', lineHeight: 1.8 }}>
            Since 2020, I've been a content creator, graphic designer, and meme creator — building
            visual stories, animations, and viral content across platforms.
          </p>
        </div>

        {/* Right - Image */}
        <div className="about-reveal" style={{ position: 'relative' }}>
          <div style={{
            width: '100%', aspectRatio: '3/4',
            borderRadius: 16, overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(250,204,21,0.06), rgba(255,255,255,0.02))',
          }}>
            <img src="/profile.jpg" alt="Eshwar Reddy Gali" style={{
              width: '100%', height: '100%', objectFit: 'cover',
            }} />
          </div>
          {/* Accent line */}
          <div style={{
            position: 'absolute', bottom: -12, left: 20, right: 20,
            height: 2, background: 'linear-gradient(90deg, #facc15, transparent)',
          }} />
        </div>
      </div>
    </section>
  );
}
