import { useState, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const CinematicScene = lazy(() => import('./CinematicScene'));
const CinematicIntro = lazy(() => import('./CinematicIntro'));

import FlowingMenu from './FlowingMenu';
import Landing from './Landing';
import About from './About';
import WhatIDo from './WhatIDo';
import Career from './Career';
import DomeGallery from './DomeGallery';
import TechStackNew from './TechStackNew';
import Projects from './Projects';
import MiniGame from './MiniGame';
import CallToAction from './CallToAction';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

function Loader() {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#08080f',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
    }}>
      <div style={{
        width: 40, height: 40,
        border: '2px solid rgba(167,139,250,0.2)', borderTopColor: '#a78bfa',
        borderRadius: '50%', animation: 'rotateRing 1s linear infinite',
      }} />
    </div>
  );
}

export default function MainContainer() {
  const [introComplete, setIntroComplete] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSceneReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="app-container">
      <Suspense fallback={<Loader />}>
        {!introComplete && <CinematicIntro onComplete={() => setIntroComplete(true)} />}
        {sceneReady && <CinematicScene />}
      </Suspense>

      {introComplete && (
        <>
          <FlowingMenu />
          <main className="main-content">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <DomeGallery />
            <TechStackNew />
            <Projects />
            <div id="game"><MiniGame /></div>
            <CallToAction />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}