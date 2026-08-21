import { useState, useEffect } from 'react';
import '../components/styles/Navbar.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Tools', href: '#tools' },
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">ERG</a>
        <div className="nav-links">
          {links.map((link, i) => (
            <a href={link.href} className="nav-link" key={i}>{link.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}