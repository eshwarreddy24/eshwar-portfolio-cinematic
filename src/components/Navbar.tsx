import { useState, useEffect } from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#tools' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '16px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,215,0,0.06)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <a href="#home" style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: '#ffd700',
        letterSpacing: 2,
        cursor: 'none',
      }}>
        EG
      </a>

      <div style={{
        display: 'flex',
        gap: 32,
        alignItems: 'center',
      }}>
        {links.map(link => (
          <a key={link.href} href={link.href} style={{
            fontSize: 12,
            letterSpacing: 2,
            color: '#888',
            fontWeight: 500,
            textTransform: 'uppercase',
            transition: 'color 0.3s',
            cursor: 'none',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#ffd700'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#888'; }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
