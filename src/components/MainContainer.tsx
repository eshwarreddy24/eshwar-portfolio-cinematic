import { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Marquee from './Marquee';
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
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

    // 3D mouse tilt on .tilt3d cards
    const cleanups: (() => void)[] = [];
    document.querySelectorAll('.tilt3d').forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
        el.classList.add('tilted');
      };
      const onLeave = () => {
        el.style.transform = '';
        el.classList.remove('tilted');
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => {
      revealObs.disconnect();
      statsObs.disconnect();
      window.removeEventListener('scroll', onScroll);
      cleanups.forEach(fn => fn());
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip">Skip to main content</a>
      <div className="progress" />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Experience />
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
