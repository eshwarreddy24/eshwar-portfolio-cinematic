const jobs = [
  {
    period: 'Sep 2025 – Present',
    role: 'Graduate Apprentice — Civil Engineering Wing',
    company: 'Airports Authority of India (AAI)',
    location: 'Bengaluru International Airport',
    highlights: [
      'Centralized audit-ready records across e-Office, establishing ironclad information architecture.',
      'Managed procurement administration for 150+ MSME and vendor partners via GeM Portal.',
      'Engineered dynamic analytical dashboard using advanced Excel for invoice lifecycle tracking.',
      'Streamlined high-stakes correspondence with premium PSU executives and former IPS/IAS officers.',
      'Spearheaded end-to-end financial workflows using SAP MM, processing 30+ invoices monthly.',
      'Synthesized technical case studies on airport land records, ATC and AOCC mechanisms.',
    ],
  },
  {
    period: 'Nov 2024 – Jun 2025',
    role: 'Graduate Engineer Trainee — Metaphor Interiors',
    company: 'Organo Eco Habitats Pvt Ltd',
    location: 'Hyderabad, Telangana',
    highlights: [
      'Directed high-level stakeholder logistics and pre-visit strategy for multi-city schedules.',
      'Tracked cross-departmental deliverables using ClickUp, flagging timeline risks to Board of Directors.',
      'Pioneered technical case study on sustainable microclimates — 17°C surface temperature reduction.',
      'Co-authored and published definitive brief with firm board members.',
    ],
  },
];

export default function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="container">
        <div className="section-header">
          <p className="section-label reveal"><span>03</span> Experience</p>
          <h2 className="section-title reveal">
            Professional <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Journey</span>
          </h2>
        </div>
        <div className="timeline">
          {jobs.map((j, i) => (
            <article key={j.company} className={`timeline-item ${i === 0 ? 'reveal-left' : 'reveal-right'}`}>
              <div className="timeline-dot" aria-hidden="true" />
              <p className="timeline-period">{j.period}</p>
              <h3 className="timeline-role">{j.role}</h3>
              <p className="timeline-company">{j.company} — {j.location}</p>
              <ul className="timeline-list">
                {j.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
