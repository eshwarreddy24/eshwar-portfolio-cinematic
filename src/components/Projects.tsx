const projects = [
  { title: 'Airport Infrastructure Invoice Management', problem: 'Manual invoice tracking caused delays and errors in payment processing.', approach: 'Engineered dynamic Excel dashboards mapping invoice lifecycles and payment statuses.', impact: 'Zero-error procurement workflow for 30+ critical invoices monthly.', tools: ['SAP MM', 'Advanced Excel', 'GeM Portal'], metric: '30+ invoices/mo' },
  { title: 'MSME Vendor Compliance Screening', problem: 'Onboarding bottlenecks for 150+ vendor partners.', approach: 'Streamlined procurement administration with stringent compliance screening via GeM Portal.', impact: 'Eliminated onboarding bottlenecks across all vendor partners.', tools: ['GeM Portal', 'e-Office', 'MIS Reporting'], metric: '150+ vendors' },
  { title: 'Executive Correspondence & Diplomacy', problem: 'High-stakes communications with premium PSU executives and former IPS/IAS officers.', approach: 'Managed institutional correspondence with structured agendas and authoritative MoM.', impact: 'Optimized executive operational readiness for senior directors.', tools: ['e-Office', 'MS Word', 'SharePoint'], metric: 'Zero breaches' },
  { title: 'Airport Land Records Case Study', problem: 'Complex land records needed cross-referencing across multiple airport systems.', approach: 'Synthesized technical case studies on airport land records and operational mechanisms.', impact: 'Comprehensive documentation of ATC and AOCC mechanisms at BIAL.', tools: ['Advanced Excel', 'MS PowerPoint', 'Research'], metric: 'Published' },
  { title: 'Sustainable Microclimate Study', problem: 'Need for data on sustainable design alternatives for office spaces.', approach: 'Documented 17°C surface temperature reduction through bamboo design tweaks.', impact: 'Co-authored and published definitive brief with firm board members.', tools: ['Site Engineering', 'Data Analysis', 'MS Excel'], metric: '17°C reduction' },
  { title: 'Project Milestone Tracking System', problem: 'Cross-departmental deliverables lacked visibility and proactive risk flagging.', approach: 'Tracked deliverables using ClickUp, diagnosing bottlenecks and flagging timeline risks.', impact: 'Proactive risk mitigation before delivery timelines impacted.', tools: ['ClickUp', 'MIS Reporting', 'MS Excel'], metric: 'Zero delays' },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <p className="section-label r"><span>02</span> Projects</p>
          <h2 className="section-title r">Case <i>Studies</i></h2>
          <p className="section-desc r">Key projects demonstrating impact across procurement, operations, and stakeholder management.</p>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <article key={p.title} className={`project-card ${i % 2 === 0 ? 'r-s' : 'r'} d${(i % 6) + 1}`}>
              <div className="project-badge">📊 {p.metric}</div>
              <h3>{p.title}</h3>
              <div className="project-row"><span className="project-k">Problem</span><span className="project-v">{p.problem}</span></div>
              <div className="project-row"><span className="project-k">Approach</span><span className="project-v">{p.approach}</span></div>
              <div className="project-row"><span className="project-k">Impact</span><span className="project-v">{p.impact}</span></div>
              <div className="project-tags">{p.tools.map(t => <span key={t} className="project-tag">{t}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
