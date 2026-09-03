import { useEffect } from 'react';
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
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Scroll progress bar
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

    // Section separator lines
    document.querySelectorAll('.section-line').forEach((el: any) => {
      gsap.fromTo(el,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        }
      );
    });

    // Parallax depth layers
    gsap.utils.toArray('.parallax-layer').forEach((el: any) => {
      const speed = parseFloat(el.dataset.speed || '0.3');
      gsap.to(el, {
        y: () => -200 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });

    // Counting numbers
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
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
      });
    });

    // Magnetic hover
    const cleanups: (() => void)[] = [];
    document.querySelectorAll('.btn, .connect-social').forEach((el: any) => {
      let ticking = false;
      const onMove = (e: MouseEvent) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.25, ease: 'power2.out' });
          ticking = false;
        });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' });
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => {
      lenis.destroy();
      cleanups.forEach(fn => fn());
    };
  }, []);

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
        <div className="finalFrame">
          <Contact />
        </div>
      </main>
    </>
  );
}
