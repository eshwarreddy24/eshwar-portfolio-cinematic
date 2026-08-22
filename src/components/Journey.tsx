import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const papers = ref.current.querySelectorAll('.paper');
    gsap.fromTo(papers,
      { rotateY: -90, opacity: 0, x: -60, transformPerspective: 800, transformOrigin: 'left center' },
      {
        rotateY: 0, opacity: 1, x: 0,
        duration: 0.9, stagger: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      }
    );
  }, []);

  return (
    <section className="journey-section" id="journey">
      <div className="journey-vfx-bg" aria-hidden="true">
        <span className="journey-particle" style={{ left: '10%', top: '20%', width: 4, height: 4 }} />
        <span className="journey-particle" style={{ left: '85%', top: '15%', width: 3, height: 3 }} />
        <span className="journey-particle" style={{ left: '20%', top: '80%', width: 5, height: 5 }} />
        <span className="journey-particle" style={{ left: '90%', top: '75%', width: 3, height: 3 }} />
        <span className="journey-particle-accent" style={{ left: '75%', top: '40%', width: 6, height: 6 }} />
        <span className="journey-particle-accent" style={{ left: '15%', top: '60%', width: 5, height: 5 }} />
      </div>
      <div className="journey-section-wrap" ref={ref}>
        <p className="stack-eyebrow"><span>02</span> Journey</p>
        <h2 className="stack-h2">Where I've <em className="about-serif about-green">Worked</em></h2>

        <div className="papers-stack">
          {config.experiences.map((exp, i) => (
            <div key={i} className="paper" style={{ zIndex: config.experiences.length - i }}>
              <div className="paper-fold" />
              <div className="paper-inner">
                <div className="paper-top">
                  <span className="paper-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="journey-period">{exp.period}</span>
                </div>
                <h3 className="paper-role">{exp.role}</h3>
                <p className="paper-company">{exp.company}</p>
                <p className="paper-location">{exp.location}</p>
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
