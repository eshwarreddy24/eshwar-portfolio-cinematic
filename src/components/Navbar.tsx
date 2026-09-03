import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = links.map(l => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive('#' + ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo" aria-label="Gali Eshwar Reddy — Home">
          ESHWAR<span style={{ color: 'var(--accent)' }}>.</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link${active === l.href ? ' active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
