export default function Education() {
  return (
    <section className="section section-alt" id="education">
      <div className="container">
        <div className="section-header">
          <p className="section-label reveal"><span>05</span> Education</p>
          <h2 className="section-title reveal">
            Academic <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Background</span>
          </h2>
        </div>
        <article className="edu-card reveal-up">
          <h3 className="edu-degree">Bachelor of Technology in Civil Engineering</h3>
          <p className="edu-school">Srinivasa Ramanujan Institute of Technology</p>
          <p className="edu-meta">Anantapur, Andhra Pradesh · Jan 2020 – May 2024 · CGPA: 7.59/10</p>
          <ul className="edu-highlights">
            <li className="edu-highlight reveal-left reveal-delay-1">Student Club Executive — Commanded 20+ operators for digital media production.</li>
            <li className="edu-highlight reveal-left reveal-delay-2">NSS Representative — Awarded National Service Scheme certification.</li>
            <li className="edu-highlight reveal-left reveal-delay-3">AIC SKU IGNITE 3.0 — Led team through entrepreneurship training.</li>
            <li className="edu-highlight reveal-left reveal-delay-4">Corporate Agility — Transitions between engineering and executive environments.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
