const certs = [
  { name: 'SAP Certified — Implementation Consultant — SAP Service Cloud Version 2', issuer: 'SAP', date: '2025', cls: 'cert-sap', icon: '🔷' },
  { name: 'Microsoft 365 Certified: Copilot Administrator Associate', issuer: 'Microsoft', date: '2025', cls: 'cert-ms', icon: '🟦' },
  { name: 'Entrepreneurship Development — AIC SKU IGNITE 3.0', issuer: 'Atal Innovation Mission, NITI Aayog', date: '2024', cls: 'cert-at', icon: '🏆' },
];

export default function Certifications() {
  return (
    <section className="section" id="credentials">
      <div className="container">
        <div className="section-header">
          <p className="section-label r"><span>04</span> Credentials</p>
          <h2 className="section-title r">Professional <i>Certifications</i></h2>
        </div>
        <div className="certs-grid">
          {certs.map((c, i) => (
            <article key={c.name} className={`cert-card ${i % 2 === 0 ? 'r-l' : 'r-r'} d${i + 1}`}>
              <div className={`cert-badge-icon ${c.cls}`} aria-hidden="true">{c.icon}</div>
              <div>
                <h3>{c.name}</h3>
                <p className="issuer">{c.issuer}</p>
                <p className="date">{c.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
