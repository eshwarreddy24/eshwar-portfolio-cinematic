import { useState, useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Cursor from './Cursor';
import WhiteParticles from './WhiteParticles';
import Navbar from './Navbar';
import Landing from './Landing';
import About from './About';
import SkillsSection from './SkillsSection';
import Career from './Career';
import Certifications from './Certifications';
import Projects from './Projects';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

export default function MainContainer() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, [loaded]);

  if (!loaded) return null;

  return (
    <div className="app-container">
      <Cursor />
      <WhiteParticles />
      <Navbar />
      <main className="main-content">
        <Landing />
        <About />
        <SkillsSection />
        <Career />
        <Certifications />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
