const items = [
  { icon: '📞', label: 'Call Me', href: 'tel:+919515291117' },
  { icon: '✉️', label: 'Email Me', href: 'mailto:eshwarreddy.gali@outlook.com' },
  { icon: '🔗', label: 'LinkedIn', href: 'https://www.linkedin.com/in/eshwar-reddy-gali-' },
  { icon: '📸', label: 'Instagram', href: 'https://www.instagram.com/eshwarrxddy' },
];

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <p className="section-label r"><span>05</span> Contact</p>
          <h2 className="section-title r">Let's <i>Connect</i></h2>
          <p className="section-desc r">Open to opportunities in workplace operations, program management, and executive support.</p>
        </div>
        <div className="contact-grid">
          {items.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`contact-card ${i % 2 === 0 ? 'r-l' : 'r-r'} d${i + 1}`}
            >
              <div className="contact-ico" aria-hidden="true">{c.icon}</div>
              <span className="contact-lbl">{c.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
