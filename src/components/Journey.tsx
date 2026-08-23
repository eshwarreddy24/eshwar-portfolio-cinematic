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
  },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.paper'),
      { opacity: 0, rotateY: -45, x: -60 },
      { opacity: 1, rotateY: 0, x: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      }
    );
  }, []);

  return (
    <section className="journey-section" id="journey" ref={ref}>
      <div className="journey-vfx-bg" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="journey-particle"
            style={{
              width: 4 + Math.random() * 8,
              height: 4 + Math.random() * 8,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="journey-section-wrap">
        <p className="about-eyebrow sr"><span>03</span> Experience</p>
        <h2 className="about-h2 sr">
          Professional <span className="about-serif green-glow">Journey</span>
        </h2>

        <div className="papers-stack">
          {experiences.map((exp) => (
            <div className="paper" key={exp.num}>
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
