import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.hero-head > *');
    gsap.fromTo(els, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2,
    });
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-ambient">
        <span className="hero-glow hero-glowL" />
        <span className="hero-glow hero-glowR" />
        <span className="hero-ring" />
        <span className="hero-plusA">+</span>
        <span className="hero-plusB">+</span>
        <span className="hero-particle" style={{ left: '8%', top: '26%', width: 6, height: 6 }} />
        <span className="hero-particle" style={{ left: '14%', top: '62%', width: 4, height: 4 }} />
        <span className="hero-particle" style={{ left: '5%', top: '78%', width: 5, height: 5 }} />
        <span className="hero-particle" style={{ left: '90%', top: '22%', width: 5, height: 5 }} />
        <span className="hero-particle hero-particleAcc" style={{ left: '94%', top: '58%', width: 6, height: 6 }} />
        <span className="hero-particle" style={{ left: '86%', top: '82%', width: 4, height: 4 }} />
      </div>

      <div className="hero-head" ref={ref}>
        <p className="hero-kicker">Engineer &amp; SAP Specialist</p>
        <h1 className="hero-h1">
          <span className="hero-row">Engineering solutions that</span>
          <span className="hero-row">feel <em className="hero-serif hero-green">obvious.</em></span>
        </h1>
        <p className="hero-sub">
          I bridge engineering, procurement, and design — making complex processes
          feel effortless. From SAP MM to graphic design, I deliver results.
        </p>
        <div className="hero-ctas">
          <a href="#contact" className="btn btn-primary btn-md">
            <span className="btn-fill" />
            <span className="btn-labelWrap"><span className="btn-labelStack"><span className="btn-label">Hire Me</span><span className="btn-label btn-labelClone" aria-hidden="true">Hire Me</span></span></span>
            <span className="btn-arrow">→</span>
          </a>
          <a href="#cricket" className="btn btn-ghost btn-md">
            <span className="btn-fill" />
            <span className="btn-lead"><span className="hero-play">🏏</span></span>
            <span className="btn-labelWrap"><span className="btn-labelStack"><span className="btn-label">Play a Game with Me</span><span className="btn-label btn-labelClone" aria-hidden="true">Play a Game with Me</span></span></span>
          </a>
        </div>
      </div>

      <div className="hero-stageRow">
        <div className="hero-side hero-sideL">
          <div className="hero-statCard">
            <div className="hero-statNum"><span>4</span><i>+</i></div>
            <div className="hero-statLabel">Roles Handled</div>
          </div>
          <div className="hero-statCard">
            <div className="hero-statNum"><span>2</span><i>+</i></div>
            <div className="hero-statLabel">Years Experience</div>
          </div>
        </div>

        <div className="hero-stage">
          <div className="hero-archLine" />
          <div className="hero-arch" />
        </div>

        <div className="hero-side hero-sideR">
          <div className="hero-statCard">
            <div className="hero-statNum"><span>150</span><i>+</i></div>
            <div className="hero-statLabel">Vendors Coordinated</div>
          </div>
          <div className="hero-statCard">
            <div className="hero-statNum"><span>100</span><i>%</i></div>
            <div className="hero-statLabel">Commitment</div>
          </div>
        </div>
      </div>

      <div className="hero-scrollCue">
        <span>Scroll to Explore</span>
        <span className="hero-cueArrow">↓</span>
      </div>
    </section>
  );
}
