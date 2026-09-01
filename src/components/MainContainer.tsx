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
import Game from './Game';
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

    // === SCROLL REVEALS (existing) ===
    const revealEls = document.querySelectorAll('.sr');
    revealEls.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('revealed'),
      });
    });

    // === CLIP-PATH TEXT REVEALS ===
    document.querySelectorAll('.clip-reveal').forEach((el) => {
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        }
      );
    });

    // === HERO PARALLAX DEPTH LAYERS ===
    gsap.utils.toArray('.parallax-layer').forEach((el: any) => {
      const speed = parseFloat(el.dataset.speed || '0.3');
      gsap.to(el, {
        y: () => -200 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    // === HERO NAME PARALLAX (moves up faster on scroll) ===
    const heroH1 = document.querySelector('.hero-h1');
    if (heroH1) {
      gsap.to(heroH1, {
        y: -120,
        opacity: 0,
        scale: 0.92,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      });
    }

    // === HERO STAT CARDS SCATTER ON SCROLL ===
    document.querySelectorAll('.hero-statCard').forEach((card: any, i) => {
      gsap.to(card, {
        y: -80 - i * 30,
        opacity: 0,
        rotate: i % 2 === 0 ? -15 : 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: '20% top',
          end: '60% top',
          scrub: 1,
        },
      });
    });

    // === COUNTING NUMBERS for metrics ===
    document.querySelectorAll('.about-metricNum').forEach((el: any) => {
      const target = parseInt(el.dataset.count || '0', 10);
      const suffix = el.dataset.suffix || '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
      });
    });

    // === MARQUEE SPEED BOOST ON SCROLL ===
    const marqueeTracks = document.querySelectorAll('.marquee-track');
    let lastScroll = 0;
    const boostMarquee = () => {
      const currentScroll = window.scrollY;
      const speed = Math.abs(currentScroll - lastScroll) * 0.5;
      marqueeTracks.forEach((track: any) => {
        track.style.animationDuration = `${Math.max(10, 28 - speed)}s`;
      });
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', boostMarquee, { passive: true });

    // === SECTION SEPARATOR LINES ===
    document.querySelectorAll('.section-line').forEach((el: any) => {
      gsap.fromTo(el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    // === JOURNEY CARDS 3D FLIP-IN STAGGER ===
    const papers = document.querySelectorAll('.paper');
    papers.forEach((paper: any, i) => {
      gsap.fromTo(paper,
        { opacity: 0, y: 80, rotateY: -25, rotateX: 10, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: paper, start: 'top 88%' },
          delay: i * 0.12,
        }
      );
    });

    // === CREDENTIALS CARDS SCALE-IN ===
    document.querySelectorAll('.cred-card').forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.8, rotateX: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: card, start: 'top 85%' },
          delay: i * 0.15,
        }
      );
    });

    // === EDUCATION CARD LIFT-IN ===
    const eduCard = document.querySelector('.edu-card');
    if (eduCard) {
      gsap.fromTo(eduCard,
        { opacity: 0, y: 60, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: eduCard, start: 'top 85%' },
        }
      );
    }

    // === CONTACT SECTION SCALE REVEAL ===
    const connectHead = document.querySelector('.connect-head');
    if (connectHead) {
      gsap.fromTo(connectHead,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: connectHead, start: 'top 80%' },
        }
      );
    }

    // === MAGNETIC HOVER on buttons ===
    const magneticEls = document.querySelectorAll('.btn, .connect-social');
    magneticEls.forEach((el: any) => {
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
      });
    });

    // === GAME SECTION REVEAL ===
    const gameSection = document.querySelector('.game-section');
    if (gameSection) {
      gsap.fromTo(gameSection,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: gameSection, start: 'top 80%' },
        }
      );
    }

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', boostMarquee);
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <div className="scroll-progress" />
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <div className="section-line" />
        <Marquee />
        <div className="section-line" />
        <About />
        <div className="section-line" />
        <Journey />
        <div className="section-line" />
        <DesignStack />
        <div className="section-line" />
        <Credentials />
        <div className="section-line" />
        <Education />
        <div className="section-line" />
        <Game />
        <div className="finalFrame">
          <Contact />
        </div>
      </main>
    </>
  );
}
