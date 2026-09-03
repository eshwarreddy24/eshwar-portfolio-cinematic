const contacts = [
  { icon: '📞', label: 'Phone', value: '+91 95152 91117', href: 'tel:+919515291117' },
  { icon: '✉️', label: 'Email', value: 'eshwarreddy.gali@outlook.com', href: 'mailto:eshwarreddy.gali@outlook.com' },
  { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/eshwar-reddy-gali-', href: 'https://www.linkedin.com/in/eshwar-reddy-gali-' },
  { icon: '📸', label: 'Instagram', value: '@eshwarrxddy', href: 'https://www.instagram.com/eshwarrxddy' },
];

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <p className="section-label reveal"><span>06</span> Contact</p>
          <h2 className="section-title reveal">
            Let's <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Connect</span>
          </h2>
          <p className="section-subtitle reveal">
            Open to opportunities in SAP, procurement, operations, and business analysis.
          </p>
        </div>
        <div className="contact-grid">
          {contacts.map(c => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-card reveal"
            >
              <div className="contact-icon" aria-hidden="true">{c.icon}</div>
              <div>
                <div className="contact-label">{c.label}</div>
                <div className="contact-value">{c.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
