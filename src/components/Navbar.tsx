import { useState, useEffect } from 'react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [on, setOn] = useState('#home');

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['#home', '#about', '#work', '#contact'];
      for (const id of [...ids].reverse()) {
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top <= 200) { setOn(id); break; }
      }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className="nav-wrap">
      <div className={`nav-cap${scrolled ? ' scrolled' : ''}`}>
        <a href="#home" className="nav-logo">ESHWAR<i>.</i></a>
        <nav className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} className={on === l.href ? 'on' : ''}>
              <span className="nav-roll"><span>{l.label}</span><span aria-hidden="true">{l.label}</span></span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
