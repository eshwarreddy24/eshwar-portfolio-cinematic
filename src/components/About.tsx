const items = [
  { icon: '💻', title: 'Digital Literacy', text: 'SAP MM, Microsoft 365 (Expert Excel, Teams, SharePoint), Government e-Office.' },
  { icon: '📋', title: 'Executive Operations', text: 'Meeting choreography, complex calendar systems, proactive time protection.' },
  { icon: '🎯', title: 'Strategic Governance', text: 'Corporate incubation, project milestones (ClickUp), risk mitigation, MIS reporting.' },
  { icon: '🤝', title: 'Interpersonal Excellence', text: 'Boardroom presentation, C-Suite & PSU liaison, confidentiality, cross-functional alignment.' },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <p className="section-label r"><span>01</span> About</p>
          <h2 className="section-title r">Core <i>Strengths</i></h2>
          <p className="section-desc r">
            Operational professional with hands-on expertise in SAP MM and office operations,
            managing complex documentation for senior leadership including former IPS/IAS officials.
          </p>
        </div>
        <div className="about-grid">
          {items.map((s, i) => (
            <article key={s.title} className={`about-card ${i % 2 === 0 ? 'r-l' : 'r-r'} d${i + 1}`}>
              <div className="about-card-icon" aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
