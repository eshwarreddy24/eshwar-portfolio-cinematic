import { useEffect, useRef } from 'react';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${window.scrollY * 0.12}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-grid" ref={bgRef} aria-hidden="true" />
      <div className="container hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Available for Opportunities
        </div>
        <h1 className="hero-name">
          <span className="line"><span>Gali Eshwar</span></span>
          <span className="line"><span className="accent">Reddy</span></span>
        </h1>
        <p className="hero-role">Operations · SAP MM · Executive Support · Procurement</p>
        <p className="hero-sub">
          Operations and workplace professional with 1.6 years of experience and extensive
          exposure within the Airports Authority of India. Spearheaded office operations
          and executive support collaboration among cross-functional teams.
        </p>
        <div className="hero-btns">
          <a href="#contact" className="btn btn-primary">
            <span>Download Resume</span>
            <span aria-hidden="true">↓</span>
          </a>
          <a href="#projects" className="btn btn-outline">
            <span>View Case Studies</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="hero-stats" data-scroll-group="hero-stats">
          <div className="hero-stat" data-delay="0">
            <div className="hero-stat-num">150+</div>
            <div className="hero-stat-lbl">MSME Partners Onboarded</div>
          </div>
          <div className="hero-stat" data-delay="1">
            <div className="hero-stat-num">30+</div>
            <div className="hero-stat-lbl">High-Value Invoices / Mo</div>
          </div>
          <div className="hero-stat" data-delay="2">
            <div className="hero-stat-num">1.6</div>
            <div className="hero-stat-lbl">Years Experience</div>
          </div>
          <div className="hero-stat" data-delay="3">
            <div className="hero-stat-num">40%</div>
            <div className="hero-stat-lbl">Faster Retrieval</div>
          </div>
        </div>
      </div>
    </section>
  );
}
