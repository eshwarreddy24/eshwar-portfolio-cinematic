import { useState, useEffect } from 'react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['#home', '#about', '#work', '#contact'];
      for (const id of sections.reverse()) {
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <a href="#home" style={{
        fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 700,
        color: '#fff', letterSpacing: 1,
      }}>
        ESHWAR<span style={{ color: '#facc15' }}>.</span>
      </a>

      <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {links.map(l => (
          <a key={l.href} href={l.href} style={{
            position: 'relative', padding: '6px 16px',
            fontSize: 13, fontWeight: 500, letterSpacing: 1,
            color: active === l.href ? '#facc15' : '#888',
            transition: 'color 0.3s',
            overflow: 'hidden',
          }}>
            <span style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
              lineHeight: '18px',
            }}>
              <span>{l.label}</span>
              <span aria-hidden="true" style={{
                position: 'absolute', top: '100%',
                transition: 'transform 0.3s', transform: active === l.href ? 'translateY(-100%)' : 'none',
              }}>{l.label}</span>
            </span>
          </a>
        ))}
      </nav>
    </header>
  );
}
