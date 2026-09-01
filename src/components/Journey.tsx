import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const experiences = [
  {
    num: '01',
    period: 'Sep 2025 – Present',
    role: 'Graduate Apprentice – Civil Engineering Wing',
    company: 'Airports Authority of India',
    location: 'Bengaluru International Airport',
    desc: [
      'Centralized audit-ready records across e-Office, establishing ironclad information architecture ensuring data integrity in a highly secure environment.',
      'Managed procurement administration and compliance screening for 150+ MSME and vendor partners via GeM Portal.',
      'Engineered a dynamic analytical dashboard using advanced Excel to map invoice lifecycles and payment statuses.',
      'Streamlined high-stakes external diplomacy with premium PSU executives and senior stakeholders, including former IPS and IAS officers.',
      'Spearheaded end-to-end financial workflows using SAP MM, processing 30+ critical invoices monthly with zero tolerance for error.',
      'Synthesized technical case studies on airport land records, cross-referencing ATC and AOCC mechanisms.',
    ],
    tags: ['SAP MM', 'e-Office', 'GeM', 'Excel Dashboard', 'Procurement'],
    dir: 'left' as const,
  },
  {
    num: '02',
    period: 'Nov 2024 – Jun 2025',
    role: 'Graduate Engineer Trainee – Metaphor Interiors',
    company: 'Organo Eco Habitats Pvt Ltd',
    location: 'Hyderabad, Telangana',
    desc: [
      'Directed high-level stakeholder logistics and pre-visit strategy, coordinating multi-city schedules and ground workflows.',
      'Tracked cross-departmental deliverables using ClickUp, proactively diagnosing bottlenecks and flagging timeline risks to the Board of Directors.',
      'Pioneered a technical case study on sustainable microclimates, documenting a 17°C reduction in surface temperatures; co-authored and published with firm board members.',
    ],
    tags: ['ClickUp', 'Stakeholder Mgmt', 'Sustainability', 'Case Study'],
    dir: 'right' as const,
  },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Eyebrow drops from top
    gsap.fromTo(ref.current.querySelector('.about-eyebrow'),
      { opacity: 0, y: -40, rotateX: -12 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
    // Heading scales in from center
    gsap.fromTo(ref.current.querySelector('.about-h2'),
      { opacity: 0, scale: 0.85, rotateX: 10 },
      { opacity: 1, scale: 1, rotateX: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      }
    );
    // Papers fly in from alternating sides with 3D perspective
    ref.current.querySelectorAll('.paper').forEach((paper: any, i) => {
      const fromLeft = i % 2 === 0;
      gsap.fromTo(paper,
        {
          opacity: 0,
          x: fromLeft ? -100 : 100,
          rotateY: fromLeft ? -30 : 30,
          rotateX: 5,
          scale: 0.88,
          transformPerspective: 800,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: paper, start: 'top 90%' },
          delay: i * 0.15,
        }
      );
    });
    // Floating particles drift
    ref.current.querySelectorAll('.journey-particle').forEach((p: any) => {
      gsap.to(p, {
        y: -30 + Math.random() * 60,
        x: -20 + Math.random() * 40,
        opacity: 0.12 + Math.random() * 0.1,
        duration: 3 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <section className="journey-section" id="journey" ref={ref}>
      <div className="journey-vfx-bg" aria-hidden="true">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="journey-particle"
            style={{
              width: 4 + Math.random() * 10,
              height: 4 + Math.random() * 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
        {/* Glow orbs for depth */}
        <div className="journey-orb journey-orb1" />
        <div className="journey-orb journey-orb2" />
      </div>

      <div className="journey-section-wrap">
        <p className="about-eyebrow"><span>03</span> Experience</p>
        <h2 className="about-h2">
          Professional <span className="about-serif green-glow">Journey</span>
        </h2>

        <div className="papers-stack">
          {experiences.map((exp) => (
            <div className={`paper paper-${exp.dir}`} key={exp.num}>
              <div className="paper-fold" />
              <div className="paper-inner">
                <div className="paper-top">
                  <span className="paper-num">{exp.num}</span>
                  <span className="paper-period">{exp.period}</span>
                </div>
                <div className="paper-role">{exp.role}</div>
                <div className="paper-company">{exp.company}</div>
                <div className="paper-location">{exp.location}</div>
                <ul className="paper-desc">
                  {exp.desc.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
                <div className="paper-tags">
                  {exp.tags.map(t => <span className="paper-tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
