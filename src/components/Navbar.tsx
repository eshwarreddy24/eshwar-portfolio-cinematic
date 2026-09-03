import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'white';
const themes: { key: Theme; icon: string }[] = [
  { key: 'dark', icon: '🌙' },
  { key: 'light', icon: '☀️' },
  { key: 'white', icon: '◻️' },
];

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && themes.some(t => t.key === saved)) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const changeTheme = (t: Theme) => {
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  };

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
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main">
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo" aria-label="Home">
          ESHWA<span>R.</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`nav-link${active === l.href ? ' on' : ''}`}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-toggle" role="radiogroup" aria-label="Theme">
          {themes.map(t => (
            <button
              key={t.key}
              className={theme === t.key ? 'on' : ''}
              onClick={() => changeTheme(t.key)}
              role="radio"
              aria-checked={theme === t.key}
              aria-label={t.key}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
