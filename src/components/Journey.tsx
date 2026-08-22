import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll('.journey-block');
    gsap.fromTo(cards,
      { opacity: 0, y: 80, rotateX: 15, rotateY: -5, scale: 0.9, transformPerspective: 600 },
      {
        opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1,
        duration: 1, stagger: 0.25, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      }
    );

    // Glow pulse animation on each card
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { boxShadow: '0 4px 20px rgba(0,200,83,0)' },
        {
          boxShadow: '0 8px 40px rgba(0,200,83,0.2)',
          duration: 2,
          delay: 0.3 + i * 0.25,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        }
      );
    });
  }, []);

  return (
    <section className="journey-section" id="journey">
      <div className="journey-vfx-bg" aria-hidden="true">
        <span className="journey-particle" style={{ left: '10%', top: '20%', width: 4, height: 4 }} />
        <span className="journey-particle" style={{ left: '85%', top: '15%', width: 3, height: 3 }} />
        <span className="journey-particle" style={{ left: '20%', top: '80%', width: 5, height: 5 }} />
        <span className="journey-particle" style={{ left: '90%', top: '75%', width: 3, height: 3 }} />
        <span className="journey-particle" style={{ left: '50%', top: '10%', width: 4, height: 4 }} />
        <span className="journey-particle" style={{ left: '30%', top: '50%', width: 3, height: 3 }} />
        <span className="journey-particle-accent" style={{ left: '75%', top: '40%', width: 6, height: 6 }} />
        <span className="journey-particle-accent" style={{ left: '15%', top: '60%', width: 5, height: 5 }} />
      </div>
      <div className="journey-section-wrap" ref={ref}>
        <p className="stack-eyebrow"><span>02</span> Journey</p>
        <h2 className="stack-h2">Where I've <em className="about-serif about-green">Worked</em></h2>

        <div className="journey-blocks">
          {config.experiences.map((exp, i) => (
            <div key={i} className="journey-block">
              <div className="journey-block-glow" />
              <div className="journey-block-inner">
                <div className="journey-block-top">
                  <span className="journey-period">{exp.period}</span>
                  <span className="journey-block-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="journey-block-role">{exp.role}</h3>
                <p className="journey-block-company">{exp.company}</p>
                <p className="journey-block-location">{exp.location}</p>
                <div className="journey-block-tags">
                  {exp.highlights.map((h, j) => <span key={j} className="work-tag">{h}</span>)}
                </div>
              </div>
              <div className="journey-block-border" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
