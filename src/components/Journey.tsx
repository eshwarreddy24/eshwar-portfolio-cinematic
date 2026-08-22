import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.journey-item'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: .7, stagger: .15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section className="journey-section" id="journey">
      <div className="journey-section-wrap" ref={ref}>
        <p className="stack-eyebrow"><span>02</span> Journey</p>
        <h2 className="stack-h2">Where I've <em className="about-serif">Worked</em></h2>

        <div className="journey-timeline">
          {config.experiences.map((exp, i) => (
            <div key={i} className="journey-item">
              <div className="journey-dot" />
              <div className="journey-content">
                <span className="journey-period">{exp.period}</span>
                <h3>{exp.role}</h3>
                <p className="journey-place">{exp.company} — {exp.location}</p>
                <div className="journey-tags">
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
