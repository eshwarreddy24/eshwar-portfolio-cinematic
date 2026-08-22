import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.exp-card'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: .7, stagger: .15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section className="experience" id="experience">
      <div className="experience-wrap" ref={ref}>
        <p className="stack-eyebrow"><span>07</span> Experience</p>
        <h2 className="stack-h2">Where I've <em className="about-serif">Worked</em></h2>

        {config.experiences.map((exp, i) => (
          <div key={i} className="exp-card">
            <div className="exp-period">{exp.period}</div>
            <div className="exp-content">
              <h3>{exp.role}</h3>
              <p className="exp-company">{exp.company} — {exp.location}</p>
              <p className="exp-desc">{exp.highlights.join('. ')}.</p>
              <div className="exp-skills">
                {exp.highlights.map((h, j) => <span key={j} className="exp-skill">{h}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
