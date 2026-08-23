import { useState, useEffect } from 'react';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['#hero', '#about', '#journey', '#contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="nav-wrap">
      <nav className={`nav-cap${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nav-logo">ESHWA<i>.</i></a>
        <div className="nav-links">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? 'on' : ''}
            >
              <span className="nav-roll">
                <span>{l.label}</span>
                <span>{l.label}</span>
              </span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
