import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Eyebrow from left
    gsap.fromTo(ref.current.querySelector('.about-eyebrow'),
      { opacity: 0, x: -60, rotateY: 10 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
    // Heading from top
    gsap.fromTo(ref.current.querySelector('.about-h2'),
      { opacity: 0, y: -40, rotateX: -10 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' }
      }
    );
    // Card rises from bottom with 3D perspective
    gsap.fromTo(ref.current.querySelector('.edu-card'),
      { opacity: 0, y: 80, rotateX: 12, scale: 0.9, transformPerspective: 700 },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current.querySelector('.edu-card'), start: 'top 88%' }
      }
    );
    // Highlight items stagger from left
    gsap.fromTo(ref.current.querySelectorAll('.edu-highlights li'),
      { opacity: 0, x: -30, rotateY: 5 },
      { opacity: 1, x: 0, rotateY: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current.querySelector('.edu-highlights'), start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section className="edu" ref={ref}>
      <div className="edu-wrap">
        <p className="about-eyebrow sr"><span>06</span> Education</p>
        <h2 className="about-h2 sr">
          Academic <span className="about-serif green-glow">Foundation</span>
        </h2>
        <div className="edu-card">
          <h3>Bachelor of Technology in Civil Engineering</h3>
          <div className="edu-school">Srinivasa Ramanujan Institute of Technology</div>
          <div className="edu-meta">Anantapur, Andhra Pradesh · Jan 2020 – May 2024 · CGPA: 7.59/10</div>
          <ul className="edu-highlights">
            <li>Student Club Executive: Commanded a team of 20+ for digital media production and major institutional ceremonies.</li>
            <li>NSS Representative: Awarded National Service Scheme certification for leadership in community development.</li>
            <li>Selected for AIC SKU IGNITE 3.0 Training Program; led a team through entrepreneurship and business strategy training under Chief Innovation Coach Naveen Lakkurr.</li>
            <li>Corporate Agility: Transitioned fluidly between DGPS Surveying, Hydrant Refueling systems at IOCL Skytankers, and executive office management.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
