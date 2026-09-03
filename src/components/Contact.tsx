const items = [
  { icon: '📞', href: 'tel:+919515291117', title: 'Call Me' },
  { icon: '✉️', href: 'mailto:eshwarreddy.gali@outlook.com', title: 'Email Me' },
  { icon: '🔗', href: 'https://www.linkedin.com/in/eshwar-reddy-gali-', title: 'LinkedIn' },
  { icon: '📸', href: 'https://www.instagram.com/eshwarrxddy', title: 'Instagram' },
];

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <p className="section-label r"><span>05</span> Contact</p>
          <h2 className="section-title r">Let's <i>Connect</i></h2>
          <p className="section-desc r">Tap an icon to reach out.</p>
        </div>
        <div className="contact-icons r">
          {items.map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`contact-icon-btn d${i + 1}`}
              title={c.title}
              aria-label={c.title}
            >
              <span className="contact-ico">{c.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
