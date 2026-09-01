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
    gsap.fromTo(ref.current.querySelectorAll('.sr'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      }
    );
  }, []);

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-wrap">
        <p className="about-eyebrow sr"><span>02</span> About</p>
        <h2 className="about-h2 sr">
          Building <span className="about-serif green-glow">operational excellence</span> across
          corporate &amp; government environments.
        </h2>

        <div className="about-grid">
          <div className="about-beats">
            {beats.map((b, i) => (
              <div className="about-beat sr" key={i}>
                <span className="about-beatN">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{b.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: b.text }} />
                </div>
              </div>
            ))}
          </div>
          <div className="about-sideCol">
            <div className="about-sideCard about-philoCard sr">
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
            <div className="about-metric sr" key={i}>
              <div className="about-metricNum" data-count={m.count} data-suffix={m.suffix}>0{m.suffix}</div>
              <div className="about-metricLabel">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
