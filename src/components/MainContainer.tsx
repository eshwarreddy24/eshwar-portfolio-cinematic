import { useState, useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './Navbar';
import HeroScene from './HeroScene';
import Hero from './Hero';
import Marquee from './Marquee';
import About from './About';
import Journey from './Journey';
import Gallery3D from './Gallery3D';
import ExperienceRoom from './ExperienceRoom';
import DesignStack from './DesignStack';
import Credentials from './Credentials';
import Education from './Education';
import Contact3D from './Contact3D';
import Contact from './Contact';
import Particles from './Particles';

gsap.registerPlugin(ScrollTrigger);

function CanvasLoader() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700, letterSpacing: '.1em' }}>
        LOADING 3D...
      </div>
    </div>
  );
}

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

    // === SCROLL PROGRESS BAR ===
    const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
    if (progressBar) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          progressBar.style.transform = `scaleX(${self.progress})`;
        },
      });
    }

    // === SECTION SEPARATOR LINES ===
    document.querySelectorAll('.section-line').forEach((el: any) => {
      gsap.fromTo(el,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 0.15,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        }
      );
    });

    // === PARALLAX DEPTH LAYERS ===
    gsap.utils.toArray('.parallax-layer').forEach((el: any) => {
      const speed = parseFloat(el.dataset.speed || '0.3');
      gsap.to(el, {
        y: () => -250 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });

    // === COUNTING NUMBERS ===
    document.querySelectorAll('.about-metricNum').forEach((el: any) => {
      const target = parseInt(el.dataset.count || '0', 10);
      const suffix = el.dataset.suffix || '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
      });
    });

    // === MARQUEE SPEED BOOST ===
    const marqueeTracks = document.querySelectorAll('.marquee-track');
    let lastScroll = 0;
    let rafId: number;
    const boostMarquee = () => {
      const currentScroll = window.scrollY;
      const speed = Math.abs(currentScroll - lastScroll) * 0.5;
      marqueeTracks.forEach((track: any) => {
        track.style.animationDuration = `${Math.max(10, 28 - speed)}s`;
      });
      lastScroll = currentScroll;
      rafId = requestAnimationFrame(boostMarquee);
    };
    rafId = requestAnimationFrame(boostMarquee);

    // === MAGNETIC HOVER ===
    const magneticEls = document.querySelectorAll('.btn, .connect-social');
    const cleanups: (() => void)[] = [];
    magneticEls.forEach((el: any) => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    });

    // === 3D SCENE SCROLL EFFECTS ===
    // Hero canvas fades out on scroll
    const heroCanvas = document.querySelector('.hero-3d-canvas');
    if (heroCanvas) {
      gsap.to(heroCanvas, {
        opacity: 0,
        scale: 1.1,
        scrollTrigger: { trigger: '.hero', start: '30% top', end: '70% top', scrub: 1 },
      });
    }

    // Experience room zooms in
    const expCanvas = document.querySelector('.experience-3d-canvas');
    if (expCanvas) {
      gsap.fromTo(expCanvas,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: expCanvas, start: 'top 80%' },
        }
      );
    }

    // Gallery 3D scales in
    const galCanvas = document.querySelector('.gallery-3d-canvas');
    if (galCanvas) {
      gsap.fromTo(galCanvas,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: galCanvas, start: 'top 80%' },
        }
      );
    }

    // Contact 3D scales in
    const conCanvas = document.querySelector('.contact-3d-canvas');
    if (conCanvas) {
      gsap.fromTo(conCanvas,
        { opacity: 0, scale: 0.8, rotateX: 15 },
        {
          opacity: 1, scale: 1, rotateX: 0,
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: conCanvas, start: 'top 85%' },
        }
      );
    }

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      cleanups.forEach(fn => fn());
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <div className="scroll-progress" />
      <Particles />
      <Navbar />
      <main>
        {/* HERO with 3D particle canvas */}
        <section className="hero" id="hero">
          <Suspense fallback={<CanvasLoader />}>
            <HeroScene />
          </Suspense>
          <Hero />
        </section>

        <div className="section-line" />
        <Marquee />
        <div className="section-line" />
        <About />
        <div className="section-line" />
        <Journey />
        <div className="section-line" />

        {/* 3D PROJECT GALLERY */}
        <section className="gallery-section" id="gallery">
          <div className="gallery-wrap">
            <p className="about-eyebrow"><span>04</span> Projects</p>
            <h2 className="about-h2">
              Featured <span className="about-serif green-glow">Work</span>
            </h2>
          </div>
          <Suspense fallback={<CanvasLoader />}>
            <Gallery3D />
          </Suspense>
        </section>

        <div className="section-line" />

        {/* 3D INTERACTIVE EXPERIENCE */}
        <section className="experience-section" id="experience">
          <div className="gallery-wrap">
            <p className="about-eyebrow"><span>05</span> Interactive</p>
            <h2 className="about-h2">
              Skill <span className="about-serif green-glow">Universe</span>
            </h2>
          </div>
          <Suspense fallback={<CanvasLoader />}>
            <ExperienceRoom />
          </Suspense>
        </section>

        <div className="section-line" />
        <DesignStack />
        <div className="section-line" />
        <Credentials />
        <div className="section-line" />
        <Education />
        <div className="section-line" />

        {/* 3D CONTACT */}
        <section className="contact-section" id="contact-3d">
          <Suspense fallback={<CanvasLoader />}>
            <Contact3D />
          </Suspense>
        </section>

        <div className="finalFrame">
          <Contact />
        </div>
      </main>
    </>
  );
}
