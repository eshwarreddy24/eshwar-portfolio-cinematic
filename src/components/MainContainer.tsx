import { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Certifications from './Certifications';
import Education from './Education';
import Contact from './Contact';

export default function MainContainer() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up, .hero-stat, .timeline')
        .forEach(el => el.classList.add('visible'));
      return;
    }

    // Main reveal observer — handles all reveal classes
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up, .timeline'
    ).forEach(el => revealObserver.observe(el));

    // Hero stats staggered entry
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.hero-stat');
            stats.forEach((stat) => {
              const delay = parseInt(stat.getAttribute('data-delay') || '0', 10) * 120;
              setTimeout(() => stat.classList.add('visible'), delay);
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsGroup = document.querySelector('[data-scroll-group="hero-stats"]');
    if (statsGroup) statsObserver.observe(statsGroup);

    // 3D tilt on cards — gentle perspective shift based on scroll position
    let tiltTicking = false;
    const onScroll = () => {
      if (tiltTicking) return;
      tiltTicking = true;
      requestAnimationFrame(() => {
        document.querySelectorAll('.tilt-card').forEach((el: Element) => {
          const rect = el.getBoundingClientRect();
          const viewH = window.innerHeight;
          const center = rect.top + rect.height / 2;
          const progress = (center - viewH / 2) / (viewH / 2);
          const rotateX = Math.max(-6, Math.min(6, progress * 4));
          (el as HTMLElement).style.transform = `perspective(800px) rotateX(${rotateX}deg)`;
        });
        tiltTicking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      statsObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" role="main" className="perspective-container">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <footer className="footer container" role="contentinfo">
        <span>© {new Date().getFullYear()} Gali Eshwar Reddy</span>
        <a href="#hero">Back to top ↑</a>
      </footer>
    </>
  );
}
