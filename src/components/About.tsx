const strengths = [
  { icon: '💻', title: 'Digital Literacy', text: 'SAP MM, Microsoft 365 (Expert Excel, Teams, SharePoint), Government e-Office.' },
  { icon: '📋', title: 'Executive Operations', text: 'Meeting choreography, complex calendar systems, proactive time protection.' },
  { icon: '🎯', title: 'Strategic Governance', text: 'Corporate incubation, project milestones (ClickUp), risk mitigation, MIS reporting.' },
  { icon: '🤝', title: 'Interpersonal Excellence', text: 'Boardroom presentation, C-Suite & PSU liaison, confidentiality, cross-functional alignment.' },
];

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="section-header">
          <p className="section-label reveal"><span>01</span> About</p>
          <h2 className="section-title reveal">
            Core <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Strengths</span>
          </h2>
          <p className="section-subtitle reveal">
            Operational professional with hands-on expertise in SAP MM and office operations,
            managing complex documentation for senior leadership including former IPS/IAS officials.
          </p>
        </div>
        <div className="grid strengths-grid" style={{ transformStyle: 'preserve-3d' }}>
          {strengths.map((s, i) => (
            <article
              key={s.title}
              className={`strength-card ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} reveal-delay-${i + 1}`}
            >
              <div className="strength-icon" aria-hidden="true">{s.icon}</div>
              <h3 className="strength-title">{s.title}</h3>
              <p className="strength-text">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
