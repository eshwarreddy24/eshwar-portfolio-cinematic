const items = [
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
          <p className="section-label r"><span>06</span> Contact</p>
          <h2 className="section-title r">Let's <i>Connect</i></h2>
          <p className="section-desc r">Open to opportunities in SAP, procurement, operations, and business analysis.</p>
        </div>
        <div className="contact-grid">
          {items.map((c, i) => (
            <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`contact-card ${i % 2 === 0 ? 'r-l' : 'r-r'} d${i + 1}`}>
              <div className="contact-ico" aria-hidden="true">{c.icon}</div>
              <div>
                <div className="contact-lbl">{c.label}</div>
                <div className="contact-val">{c.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
