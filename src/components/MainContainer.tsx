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
    // Scroll reveal with IntersectionObserver
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" role="main">
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
