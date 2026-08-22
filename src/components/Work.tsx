import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from '../config';

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.work-card'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: .7, stagger: .15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section className="work" id="work">
      <div className="work-wrap" ref={ref}>
        <p className="stack-eyebrow"><span>04</span> Featured Work</p>
        <h2 className="stack-h2">Projects I've <em className="about-serif">Built</em></h2>
        <div className="work-grid">
          {config.projects.map((p, i) => (
            <div key={i} className="work-card">
              <div className="work-cardIcon">{i === 0 ? '📊' : '📄'}</div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="work-tags">
                {p.tech.map((t, j) => <span key={j} className="work-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
