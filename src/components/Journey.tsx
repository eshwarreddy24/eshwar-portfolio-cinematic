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
      { opacity: 0, y: 60, rotateX: 12, scale: 0.95 },
      {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
  }, []);

  return (
    <section className="journey-section" id="journey">
      <div className="journey-section-wrap" ref={ref}>
        <p className="stack-eyebrow"><span>02</span> Journey</p>
        <h2 className="stack-h2">Where I've <em className="about-serif about-green">Worked</em></h2>

        <div className="journey-blocks">
          {config.experiences.map((exp, i) => (
            <div key={i} className="journey-block" style={{ perspective: 800 }}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
