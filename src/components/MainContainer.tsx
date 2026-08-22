import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './Navbar';
import TunnelIntro from './TunnelIntro';
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

function Scene({ id, runway, children }: { id?: string; runway?: number; children: React.ReactNode }) {
  const runwayPx = runway ? `calc(${runway} * 100svh)` : undefined;
  return (
    <>
      <div className="scene-hold" data-scene={id}>
        {children}
      </div>
      {runway && (
        <div className="scene-runway" data-runway={id} style={{ height: runwayPx }} aria-hidden="true" />
      )}
    </>
  );
}

export default function MainContainer() {
  const [ready, setReady] = useState(false);
  const [tunnelProgress, setTunnelProgress] = useState(0);
  const tunnelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Lenis smooth scroll
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

  // Tunnel scroll progress — calculated from the runway div below the tunnel
  useEffect(() => {
    if (!ready) return;
    const handle = () => {
      const runwayEl = document.querySelector('[data-runway="intro"]') as HTMLElement | null;
      if (!runwayEl) return;
      const rect = runwayEl.getBoundingClientRect();
      const vh = window.innerHeight;
      // runwayEl top goes from +6vh (start) to -vh (end)
      // progress = how far through the runway we've scrolled
      const totalScroll = rect.height + vh; // total scrollable distance
      const scrolled = totalScroll - (rect.bottom + vh); // how much has scrolled past
      const progress = Math.max(0, Math.min(1, scrolled / rect.height));
      setTunnelProgress(progress);
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, [ready]);

  if (!ready) return null;

  return (
    <div>
      <Navbar />
      <main>
        {/* TUNNEL INTRO — 6 screens of scroll */}
        <Scene id="intro" runway={6}>
          <section className="tunnel-intro" id="intro-section">
            <div className="tunnel-frame" ref={tunnelRef}>
              <TunnelIntro progress={tunnelProgress} />
              <h1 style={{ clipPath: 'inset(50%)', whiteSpace: 'nowrap', width: 1, height: 1, position: 'absolute', overflow: 'hidden' }}>
                ESHWAR — Engineer &amp; SAP Specialist
              </h1>
              <p className="tunnel-hint">Scroll to enter</p>
              <div className="tunnel-progress">
                <span className="tunnel-stageNow">{String(Math.min(6, Math.floor(tunnelProgress * 6) + 1)).padStart(2, '0')}</span>
                <span className="tunnel-progLine"><span className="tunnel-progFill" style={{ transform: `scaleX(${tunnelProgress})` }} /></span>
                <span>06</span>
              </div>
            </div>
          </section>
        </Scene>

        {/* HERO */}
        <Scene id="hero">
          <Hero />
        </Scene>

        {/* MARQUEE */}
        <Scene id="about">
          <Marquee />
        </Scene>

        {/* ABOUT */}
        <Scene id="about-content">
          <About />
        </Scene>

        {/* JOURNEY — 6 screens of scroll */}
        <Scene id="journey" runway={6}>
          <Journey />
        </Scene>

        {/* DESIGN STACK */}
        <Scene id="stack">
          <DesignStack />
        </Scene>

        {/* WORK — 4.5 screens */}
        <Scene id="work" runway={4.5}>
          <Work />
        </Scene>

        {/* EXPERIENCE — 4.4 screens */}
        <Scene id="experience" runway={4.4}>
          <Experience />
        </Scene>

        {/* CREDENTIALS — 3.5 screens */}
        <Scene id="credentials" runway={3.5}>
          <Credentials />
        </Scene>

        {/* CONTACT */}
        <div className="finalFrame">
          <Contact />
        </div>
      </main>
    </div>
  );
}
