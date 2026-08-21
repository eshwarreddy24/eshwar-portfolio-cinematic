import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/styles/Career.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'AIRPORTS AUTHORITY OF INDIA',
    location: 'Bengaluru, Karnataka',
    role: 'Graduate Apprentice · Engineering / Operations / Procurement',
    period: '2024 – Present',
    highlights: ['SAP MM', 'GeM Portal', 'Tender Scrutiny', 'e-Office EDMS'],
  },
  {
    company: 'ORGANO ECO HABITATS PVT. LTD.',
    location: 'Bengaluru, Karnataka',
    role: 'Graduate Engineer Trainee · Client Coordination / Interior Design',
    period: '2023 – 2024',
    highlights: ['NRI Clients', 'ClickUp', 'Estimation', 'Billing'],
  },
  {
    company: 'CONTENT CREATOR',
    location: 'Freelance · Since 2020',
    role: 'Graphic Designer · Video Editor · Script Writer · Animator',
    period: '2020 – Present',
    highlights: ['Photoshop', 'Premiere Pro', 'After Effects', 'Illustrator'],
  },
  {
    company: 'MEME CREATOR',
    location: 'Social Media · Since 2020',
    role: 'Viral Content · Community Building · Trend Analysis',
    period: '2020 – Present',
    highlights: ['Canva', 'CapCut', 'Trend Analytics', 'Engagement'],
  },
];

export default function Career() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.career-card');
    if (!cards) return;

    cards.forEach((card, i) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(card, {
        opacity: 0,
        x: isLeft ? -80 : 80,
        rotateY: isLeft ? -5 : 5,
        filter: 'blur(5px)',
      }, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, []);

  return (
    <section className="career" id="experience" ref={sectionRef}>
      <div className="career-container">
        <div className="section-header">
          <span className="section-tag">02</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </div>

        <div className="career-timeline">
          <div className="timeline-line" />
          {experiences.map((exp, i) => (
            <div className={`career-card ${i % 2 === 0 ? 'card-left' : 'card-right'}`} key={i}>
              <div className="card-glow" />
              <div className="card-content">
                <div className="card-period">{exp.period}</div>
                <h3 className="card-company">{exp.company}</h3>
                <p className="card-location">{exp.location}</p>
                <p className="card-role">{exp.role}</p>
                <div className="card-highlights">
                  {exp.highlights.map((h, j) => (
                    <span className="highlight-tag" key={j}>{h}</span>
                  ))}
                </div>
              </div>
              <div className="card-dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}