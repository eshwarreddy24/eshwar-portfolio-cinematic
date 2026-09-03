const projects = [
  { title: 'Invoice Lifecycle Dashboards', problem: 'Manual tracking caused delays in payment processing and audit readiness.', approach: 'Revamped dynamic dashboards mapping invoice lifecycles and highlighting bottlenecks for senior leadership.', impact: 'Processed 30+ high-value invoices monthly in SAP MM with zero errors.', tools: ['SAP MM', 'Advanced Excel', 'Data Dashboards'], metric: 'Zero Errors' },
  { title: 'MSME Partner Onboarding Pipeline', problem: 'Procurement friction and compliance gaps with 150+ MSME vendors.', approach: 'Streamlined onboarding via GeM Portal with stringent compliance screening.', impact: 'Reduced procurement friction and ensured full compliance across all partners.', tools: ['GeM Portal', 'e-Office', 'Compliance'], metric: '150+ Partners' },
  { title: 'Enterprise Document Pipeline', problem: 'Cross-team document retrieval was slow and inefficient.', approach: 'Architected asynchronous document pipelines in enterprise records system.', impact: 'Reduced search latency and cross-team retrieval time by 40%.', tools: ['SharePoint', 'e-Office', 'Document Control'], metric: '40% Faster' },
  { title: 'Executive Calendar & MoM System', problem: 'Senior leadership needed structured pre-reads and meeting documentation.', approach: 'Streamlined senior calendars and prepared concise pre-reads and objective Minutes of Meeting.', impact: 'Optimized executive operational readiness for field operations.', tools: ['MS Outlook', 'MS Word', 'Calendar Mgmt'], metric: 'Board Ready' },
  { title: 'Climate Resilient Workspace Study', problem: 'Need for data on sustainable workspace optimization.', approach: 'Led field study on climate resilient workspace optimization and co-authored findings with managing directors.', impact: 'Published findings with Organo Eco Habitats leadership.', tools: ['Field Research', 'Data Analysis', 'Report Writing'], metric: 'Published' },
  { title: 'National Incubation Program', problem: 'Selected from across institution for entrepreneurship training.', approach: 'Selected for AIC-SKU IGNITE 3.0 backed by Atal Innovation Mission, NITI Aayog.', impact: 'Gained expert mentorship from Naveen Lakkur and industry leads.', tools: ['Entrepreneurship', 'Business Strategy', 'Innovation'], metric: 'NITI Aayog' },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <p className="section-label r"><span>02</span> Projects</p>
          <h2 className="section-title r">Key <i>Achievements</i></h2>
          <p className="section-desc r">Impact-driven work across operations, procurement, and executive support.</p>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <article key={p.title} className={`project-card tilt3d ${i % 2 === 0 ? 'r-s' : 'r'} d${(i % 6) + 1}`}>
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
