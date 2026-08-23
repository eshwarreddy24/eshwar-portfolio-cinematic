import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Hero from './Hero';
import Marquee from './Marquee';
import About from './About';
import Journey from './Journey';
import DesignStack from './DesignStack';
import Credentials from './Credentials';
import Education from './Education';
import Contact from './Contact';
import Particles from './Particles';

gsap.registerPlugin(ScrollTrigger);

export default function MainContainer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Global scroll reveals
    const revealEls = document.querySelectorAll('.sr');
    revealEls.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('revealed'),
      });
    });

    return () => { lenis.destroy(); };
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Journey />
        <DesignStack />
        <Credentials />
        <Education />
        <div className="finalFrame">
          <Contact />
        </div>
      </main>
    </>
  );
}
