const items = [
  { icon: '📋', title: 'Administrative', text: 'Calendar management, Confidentiality, Expense reporting, Executive coordination, Travel booking.' },
  { icon: '💻', title: 'Software', text: 'Google Workspace, MS Office Suite, SharePoint, Microsoft Teams, SAP MM, Advanced Excel.' },
  { icon: '🎯', title: 'Project Management', text: 'Document control, Data dashboards, Risk mitigation, Timeline monitoring.' },
  { icon: '🌍', title: 'Languages', text: 'English (Professional), Telugu (Native), Hindi (Native).' },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <p className="section-label r"><span>01</span> About</p>
          <h2 className="section-title r">Professional <i>Strengths</i></h2>
          <p className="section-desc r">
            Looking for a position within workplace operations. Desires to execute,
            program management and support leaders in fast-paced international environments.
          </p>
        </div>
        <div className="about-grid">
          {items.map((s, i) => (
            <article key={s.title} className={`about-card tilt3d ${i % 2 === 0 ? 'r-l' : 'r-r'} d${i + 1}`}>
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
