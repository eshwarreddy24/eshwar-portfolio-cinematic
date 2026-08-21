import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import '../components/styles/FlowingMenu.css';

const menuItems = [
  { label: 'About', href: '#about', icon: '01' },
  { label: 'Work', href: '#work', icon: '02' },
  { label: 'Experience', href: '#experience', icon: '03' },
  { label: 'Tools', href: '#tools', icon: '04' },
  { label: 'Projects', href: '#projects', icon: '05' },
  { label: 'Play', href: '#game', icon: '06' },
  { label: 'Contact', href: '#contact', icon: '07' },
];

export default function FlowingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Stagger animate items
      gsap.fromTo(itemsRef.current, {
        opacity: 0, y: 40, rotateX: -15,
      }, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.2,
      });
      // Animate menu background
      gsap.fromTo(menuRef.current, {
        clipPath: 'circle(0% at 95% 5%)',
      }, {
        clipPath: 'circle(150% at 95% 5%)',
        duration: 0.8, ease: 'power3.inOut',
      });
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        className={`flowing-menu-trigger ${scrolled ? 'scrolled' : ''} ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="menu-burger">
          <span className="burger-line" />
          <span className="burger-line" />
        </div>
        <span className="menu-label">{isOpen ? 'CLOSE' : 'MENU'}</span>
      </button>

      {/* Full screen flowing menu */}
      <div
        className={`flowing-menu-overlay ${isOpen ? 'open' : ''}`}
        ref={menuRef}
        style={{ clipPath: 'circle(0% at 95% 5%)' }}
      >
        <div className="flowing-menu-content">
          <div className="menu-bg-text">MENU</div>
          <nav className="menu-nav">
            {menuItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="menu-item"
                ref={(el) => { itemsRef.current[i] = el; }}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              >
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-label">{item.label}</span>
                <span className="menu-item-line" />
              </a>
            ))}
          </nav>
          <div className="menu-footer">
            <span>Eshwar Reddy Gali</span>
            <span>Bengaluru, India</span>
          </div>
        </div>
      </div>
    </>
  );
}