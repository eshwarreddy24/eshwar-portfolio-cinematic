import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const beats = [
  {
    title: 'Digital Literacy',
    text: '<b>SAP MM</b>, Microsoft 365 (Expert Excel, Teams, SharePoint), Government <b>e-Office</b>.',
  },
  {
    title: 'Executive Operations',
    text: 'Meeting Choreography, Complex Calendar Systems, <b>Proactive Time Protection</b>.',
  },
  {
    title: 'Strategic Governance',
    text: 'Corporate Incubation, Project Milestones (<b>ClickUp</b>), Risk Mitigation, MIS Reporting.',
  },
  {
    title: 'Interpersonal Excellence',
    text: 'Boardroom Presentation, <b>C-Suite & PSU Liaison</b>, Confidentiality, Cross-Functional Alignment.',
  },
];

const metrics = [
  { num: '150+', count: 150, suffix: '+', label: 'MSME & vendor partners managed through GeM Portal' },
  { num: '30+', count: 30, suffix: '+', label: 'Critical airport invoices certified monthly via SAP MM' },
  { num: '7+', count: 7, suffix: '+', label: 'High-impact project milestones delivered on time' },
  { num: '100%', count: 100, suffix: '%', label: 'Zero-error compliance in procurement workflows' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Eyebrow flies from left with rotateY
    gsap.fromTo(ref.current.querySelector('.about-eyebrow'),
      { opacity: 0, x: -80, rotateY: 12, transformPerspective: 600 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
    // Heading drops from top with rotateX
    gsap.fromTo(ref.current.querySelector('.about-h2'),
      { opacity: 0, y: -60, rotateX: -15, transformPerspective: 600 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      }
    );
    // Beat items stagger from left
    gsap.fromTo(ref.current.querySelectorAll('.about-beat'),
      { opacity: 0, x: -60, rotateY: 8, transformPerspective: 800 },
      { opacity: 1, x: 0, rotateY: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current.querySelector('.about-beats'), start: 'top 75%' }
      }
    );
    // Side card flies from right
    gsap.fromTo(ref.current.querySelector('.about-philoCard'),
      { opacity: 0, x: 80, rotateY: -10, scale: 0.9 },
      { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current.querySelector('.about-sideCol'), start: 'top 80%' }
      }
    );
    // Metrics rise from bottom with stagger
    gsap.fromTo(ref.current.querySelectorAll('.about-metric'),
      { opacity: 0, y: 50, rotateX: 12, transformPerspective: 700 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current.querySelector('.about-metrics'), start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-wrap">
        <p className="about-eyebrow"><span>02</span> About</p>
        <h2 className="about-h2">
          Building <span className="about-serif green-glow">operational excellence</span> across
          corporate &amp; government environments.
        </h2>

        <div className="about-grid">
          <div className="about-beats">
            {beats.map((b, i) => (
              <div className="about-beat" key={i}>
                <span className="about-beatN">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{b.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: b.text }} />
                </div>
              </div>
            ))}
          </div>
          <div className="about-sideCol">
            <div className="about-sideCard about-philoCard">
              <h4>Core Strengths</h4>
              <ul>
                <li><span>✦</span> SAP MM Procurement</li>
                <li><span>✦</span> Executive Liaison</li>
                <li><span>✦</span> e-Office & GeM</li>
                <li><span>✦</span> Advanced Excel</li>
                <li><span>✦</span> MIS Reporting</li>
                <li><span>✦</span> Content Creation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about-metrics">
          {metrics.map((m, i) => (
            <div className="about-metric" key={i}>
              <div className="about-metricNum" data-count={m.count} data-suffix={m.suffix}>0{m.suffix}</div>
              <div className="about-metricLabel">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
