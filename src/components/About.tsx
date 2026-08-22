import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.about-reveal'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: .8, stagger: .12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section className="about" id="about-content">
      <div className="about-wrap" ref={ref}>
        <p className="about-eyebrow about-reveal"><span>01</span> About Me</p>
        <h2 className="about-h2 about-reveal">
          Engineering professional<br />& <em className="about-serif">SAP Specialist</em>
        </h2>

        <div className="about-grid">
          <div className="about-beats">
            <div className="about-beat about-reveal">
              <span className="about-beatN">01</span>
              <div>
                <h3>Engineering &amp; Procurement</h3>
                <p>Handling <b>SAP MM</b> billing, tender scrutiny for 150+ vendors, BOQs, estimation, GeM portal operations, and e-Office at Airports Authority of India.</p>
              </div>
            </div>
            <div className="about-beat about-reveal">
              <span className="about-beatN">02</span>
              <div>
                <h3>Design &amp; Coordination</h3>
                <p>Previously at <b>Organo Eco Habitats</b>, coordinated premium NRI clients on interior design projects, estimation &amp; billing.</p>
              </div>
            </div>
            <div className="about-beat about-reveal">
              <span className="about-beatN">03</span>
              <div>
                <h3>Content &amp; Creativity</h3>
                <p>Since 2020, I've been a <b>content creator, graphic designer, and meme creator</b> — building visual stories, animations, and viral content.</p>
              </div>
            </div>
          </div>

          <div className="about-sideCol about-reveal">
            <div className="about-imgCard">
              <div className="avatar-circle">EG</div>
              <span className="avatar-label">Eshwar Reddy Gali</span>
            </div>
            <div className="about-philoCard">
              <h4>My Philosophy</h4>
              <ul>
                <li><span>✦</span> Simplicity in complexity</li>
                <li><span>✦</span> Design with purpose</li>
                <li><span>✦</span> Build with integrity</li>
                <li><span>✦</span> Deliver with passion</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about-metrics about-reveal">
          <div className="about-metric">
            <div className="about-metricNum">4<i>+</i></div>
            <div className="about-metricLabel">Professional Roles</div>
          </div>
          <div className="about-metric">
            <div className="about-metricNum">2<i>+</i></div>
            <div className="about-metricLabel">Years Experience</div>
          </div>
          <div className="about-metric">
            <div className="about-metricNum">150<i>+</i></div>
            <div className="about-metricLabel">Vendors Coordinated</div>
          </div>
          <div className="about-metric">
            <div className="about-metricNum">100<i>%</i></div>
            <div className="about-metricLabel">Commitment to Excellence</div>
          </div>
        </div>
      </div>
    </section>
  );
}
