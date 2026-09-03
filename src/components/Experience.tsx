const jobs = [
  {
    period: 'Sep 2025 – Aug 2026',
    role: 'Graduate Apprentice – Civil Engineering Wing',
    company: 'Airports Authority of India (AAI)',
    location: 'Bengaluru, Karnataka',
    highlights: [
      'Coordinated sensitive briefs and confidential correspondence for board members and senior officials.',
      'Processed 30+ high value invoices monthly in SAP MM with zero errors, ensuring audit readiness.',
      'Streamlined senior calendars and prepared concise pre-reads and objective Minutes of Meeting.',
      'Revamped dynamic dashboards mapping invoice lifecycles and highlighted bottlenecks for leadership.',
      'Coordinated onboarding for 150+ MSME partners via portals, reducing procurement friction.',
      'Architected asynchronous document pipelines, reducing search latency & cross team retrieval by 40%.',
    ],
  },
  {
    period: 'Nov 2024 – Jun 2025',
    role: 'Graduate Engineer Trainee – Operations & Workspaces',
    company: 'Organo Eco Habitats Pvt Ltd',
    location: 'Hyderabad, Telangana',
    highlights: [
      'Tracked milestones via ClickUp, diagnosed bottlenecks and surfaced risks to the Board.',
      'Led field study on climate resilient workspace optimization and co-authored findings with MDs.',
      'Orchestrated multi-city stakeholder travel, accommodations, and groundwork flow for executive visits.',
    ],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <p className="section-label r"><span>03</span> Experience</p>
          <h2 className="section-title r">Work <i>History</i></h2>
        </div>
        <div className="tl">
          {jobs.map((j, i) => (
            <article key={j.company} className={`tl-item ${i === 0 ? 'r-l' : 'r-r'}`}>
              <div className="tl-dot" aria-hidden="true" />
              <p className="tl-period">{j.period}</p>
              <h3 className="tl-role">{j.role}</h3>
              <p className="tl-company">{j.company} — {j.location}</p>
              <ul className="tl-list">
                {j.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
