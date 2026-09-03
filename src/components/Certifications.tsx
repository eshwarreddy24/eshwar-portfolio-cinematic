const certs = [
  {
    name: 'SAP Certified — Implementation Consultant — SAP Service Cloud Version 2',
    issuer: 'SAP',
    date: '2025',
    badgeClass: 'cert-badge-stripe',
    icon: '🔷',
  },
  {
    name: 'Microsoft 365 Certified: Copilot Administrator Associate',
    issuer: 'Microsoft',
    date: '2025',
    badgeClass: 'cert-badge-google',
    icon: '🟦',
  },
  {
    name: 'Entrepreneurship Development — AIC SKU IGNITE 3.0',
    issuer: 'Atal Innovation Mission, NITI Aayog',
    date: '2024',
    badgeClass: 'cert-badge-atal',
    icon: '🏆',
  },
];

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-header">
          <p className="section-label reveal"><span>04</span> Certifications</p>
          <h2 className="section-title reveal">
            Professional <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Credentials</span>
          </h2>
        </div>
        <div className="certs-grid">
          {certs.map((c) => (
            <article key={c.name} className="cert-card reveal">
              <div className={`cert-badge ${c.badgeClass}`} aria-hidden="true">
                {c.icon}
              </div>
              <div className="cert-info">
                <h3 className="cert-name">{c.name}</h3>
                <p className="cert-issuer">{c.issuer}</p>
                <p className="cert-date">{c.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
