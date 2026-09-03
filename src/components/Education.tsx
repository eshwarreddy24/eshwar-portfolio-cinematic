const certs = [
  { name: 'Stripe Certified Fundamentals', issuer: 'Stripe Learning', color: '#635bff' },
  { name: 'Google Workspace Administrator', issuer: 'Coursera', color: '#4285f4' },
];

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header">
          <p className="section-label r"><span>04</span> Education & Credentials</p>
          <h2 className="section-title r">Academic <i>Background</i></h2>
        </div>
        <article className="edu-card r">
          <h3>Bachelor of Technology, Civil Engineering</h3>
          <p className="edu-school">Srinivasa Ramanujan Institute of Technology</p>
          <p className="edu-meta">Anantapur, Andhra Pradesh · Jan 2020 – May 2024 · First Class with Distinction</p>
          <ul className="edu-list">
            <li>Selected for AIC-SKU IGNITE 3.0 — national incubation program backed by Atal Innovation Mission, NITI Aayog.</li>
            <li>Gained expert mentorship from industry lead Naveen Lakkur during rigorous entrepreneurship training.</li>
            <li>Student Club Executive — Commanded 20+ operators for digital media production and institutional ceremonies.</li>
          </ul>
        </article>
        <div className="certs-inline r" style={{ marginTop: 24, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {certs.map(c => (
            <div key={c.name} className="cert-chip" style={{
              padding: '10px 20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 14,
              fontWeight: 600,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
              <span>{c.name}</span>
              <span style={{ color: 'var(--text-3)', fontSize: 12, fontWeight: 400 }}>— {c.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
