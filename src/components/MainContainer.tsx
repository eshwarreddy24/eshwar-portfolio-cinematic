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
      document.querySelectorAll('.r,.r-l,.r-r,.r-s,.tl').forEach(el => el.classList.add('vis'));
      return;
    }

    // Reveal observer
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.r,.r-l,.r-r,.r-s,.tl').forEach(el => revealObs.observe(el));

    // Hero stats stagger
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.hero-stat').forEach(s => {
            const d = parseInt(s.getAttribute('data-delay') || '0', 10) * 120;
            setTimeout(() => s.classList.add('vis'), d);
          });
          statsObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    const sg = document.querySelector('[data-scroll-group="hero-stats"]');
    if (sg) statsObs.observe(sg);

    // Progress bar
    const bar = document.querySelector('.progress') as HTMLElement;
    const onScroll = () => {
      if (bar) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      revealObs.disconnect();
      statsObs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip">Skip to main content</a>
      <div className="progress" />
      <Navbar />
      <main id="main">
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
