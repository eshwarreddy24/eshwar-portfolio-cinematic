import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from './TiltCard';
import '../components/styles/About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;
    gsap.fromTo(contentRef.current.children, {
      opacity: 0, y: 40, filter: 'blur(5px)',
    }, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
    });
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="section-container" ref={contentRef}>
        <div className="section-header">
          <span className="section-tag">01</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" />
        </div>
        <div className="about-content">
          <p className="about-text">
            Engineering Professional with hands-on experience in infrastructure documentation,
            estimation & procurement. <span className="highlight">SAP MM Specialist</span>,
            Procurement Specialist with a passion for creative design, cinematography, and
            building innovative solutions.
          </p>
          <div className="about-stats">
            <TiltCard className="stat-tilt">
              <div className="stat-item">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </TiltCard>
            <TiltCard className="stat-tilt">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Roles</span>
              </div>
            </TiltCard>
            <TiltCard className="stat-tilt">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}