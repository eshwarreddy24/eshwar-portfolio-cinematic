import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Hero from './Hero';
import Marquee from './Marquee';
import About from './About';
import Journey from './Journey';
import DesignStack from './DesignStack';
import Work from './Work';
import Experience from './Experience';
import Credentials from './Credentials';
import Contact from './Contact';

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
    return () => { lenis.destroy(); };
  }, [ready]);

  if (!ready) return null;

  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Journey />
        <DesignStack />
        <Work />
        <Experience />
        <Credentials />
        <div className="finalFrame">
          <Contact />
        </div>
      </main>
    </div>
  );
}
