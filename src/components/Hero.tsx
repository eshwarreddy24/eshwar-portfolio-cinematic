import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(ref.current.querySelector('.hero-kicker'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(ref.current.querySelector('.hero-h1'), { opacity: 0, y: 40, rotateX: 8 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8 }, '-=0.3')
      .fromTo(ref.current.querySelector('.hero-sub'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(ref.current.querySelectorAll('.hero-ctas .btn'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
      .fromTo(ref.current.querySelectorAll('.hero-statCard'), { opacity: 0, scale: 0.8, rotateY: 10 }, { opacity: 1, scale: 1, rotateY: 0, stagger: 0.08, duration: 0.6 }, '-=0.5');

    // Parallax on scroll
    gsap.to(ref.current.querySelector('.hero-head'), {
      y: -80, opacity: 0,
      scrollTrigger: { trigger: ref.current, start: 'top top', end: '40% top', scrub: 1 }
    });
    gsap.to(ref.current.querySelector('.hero-stageRow'), {
      y: -40, opacity: 0,
      scrollTrigger: { trigger: ref.current, start: '20% top', end: '60% top', scrub: 1 }
    });
  }, []);

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="hero-ambient" aria-hidden="true">
        <div className="hero-glow hero-glowL parallax-layer" data-speed="0.4" />
        <div className="hero-glow hero-glowR parallax-layer" data-speed="0.6" />
        <div className="hero-ring parallax-layer" data-speed="0.2" />
        <div className="hero-plusA parallax-layer" data-speed="0.5">+</div>
        <div className="hero-plusB parallax-layer" data-speed="0.3">+</div>
      </div>

      <div className="hero-head">
        <p className="hero-kicker">OPERATIONS · SAP MM · PROCUREMENT</p>
        <h1 className="hero-h1">
          <span className="hero-row">GALI ESHWAR</span>
          <span className="hero-row"><span className="hero-serif hero-accent">Reddy</span></span>
        </h1>
        <p className="hero-sub">
          Operational professional with hands-on expertise in SAP MM and office operations,
          managing complex documentation for senior leadership including former IPS/IAS officials.
        </p>
        <div className="hero-ctas">
          <a href="#contact" className="btn btn-primary btn-md">
            <span className="btn-fill" />
            <span className="btn-labelWrap"><span className="btn-labelStack"><span className="btn-label">Hire Me</span><span className="btn-labelClone">Hire Me</span></span></span>
            <span className="btn-arrow"><span className="btn-lead">↗</span></span>
          </a>
          <a href="#journey" className="btn btn-ghost btn-md">
            <span className="btn-fill" />
            <span className="btn-labelWrap"><span className="btn-labelStack"><span className="btn-label">View Work</span><span className="btn-labelClone">View Work</span></span></span>
            <span className="btn-arrow"><span className="btn-lead">→</span></span>
          </a>
        </div>
      </div>

      <div className="hero-stageRow">
        <div className="hero-side hero-sideL">
          <div className="hero-statCard">
            <div className="hero-statNum">4<i>+</i></div>
            <div className="hero-statLabel">Roles Across Engineering & Operations</div>
          </div>
          <div className="hero-statCard">
            <div className="hero-statNum">150<i>+</i></div>
            <div className="hero-statLabel">MSME & Vendor Partners Managed</div>
          </div>
        </div>
        <div className="hero-side hero-sideR">
          <div className="hero-statCard">
            <div className="hero-statNum">30<i>+</i></div>
            <div className="hero-statLabel">Critical Invoices Certified Monthly</div>
          </div>
          <div className="hero-statCard">
            <div className="hero-statNum">100<i>%</i></div>
            <div className="hero-statLabel">Zero-Error Procurement Workflow</div>
          </div>
        </div>
      </div>

      <div className="hero-scrollCue">
        <span>SCROLL</span>
        <span className="hero-cueArrow">↓</span>
      </div>
    </section>
  );
}
