import { useState, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Lazy load the heavy 3D scene
const CinematicScene = lazy(() => import('./CinematicScene'));
const CinematicIntro = lazy(() => import('./CinematicIntro'));

// Regular imports (lightweight)
import Landing from './Landing';
import About from './About';
import WhatIDo from './WhatIDo';
import Career from './Career';
import TechStackNew from './TechStackNew';
import Projects from './Projects';
import CallToAction from './CallToAction';
import Contact from './Contact';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger);

// Loading fallback
function Loader() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#030308',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: '2px solid rgba(0,200,255,0.2)',
        borderTopColor: '#00c8ff',
        borderRadius: '50%',
        animation: 'rotate 1s linear infinite',
      }} />
    </div>
  );
}

export default function MainContainer() {
  const [introComplete, setIntroComplete] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  // Mark scene as ready after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => setSceneReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Initialize smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      <Suspense fallback={<Loader />}>
        {/* Cinematic Intro */}
        {!introComplete && (
          <CinematicIntro onComplete={() => setIntroComplete(true)} />
        )}

        {/* Epic 3D Universe — lazy loaded */}
        {sceneReady && <CinematicScene />}
      </Suspense>

      {/* Main content */}
      {introComplete && (
        <>
          <Navbar />
          <main className="main-content">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <TechStackNew />
            <Projects />
            <CallToAction />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}