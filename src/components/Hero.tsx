import { useEffect, useRef } from 'react';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translateY(${y * 0.15}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero section" id="hero">
      <div className="hero-bg" ref={bgRef} aria-hidden="true">
        <div className="hero-gradient hero-gradient-1" />
        <div className="hero-gradient hero-gradient-2" />
        <div className="hero-grid-bg" />
      </div>
      <div className="container hero-content">
        <div className="hero-eyebrow reveal">
          <span className="hero-eyebrow-dot" />
          Available for Opportunities
        </div>
        <h1 className="hero-name reveal">
          Gali Eshwar <span className="hero-name-accent">Reddy</span>
        </h1>
        <p className="hero-summary reveal">
          Operational professional with hands-on expertise in SAP MM and office operations,
          managing complex documentation for senior leadership including former IPS/IAS officials.
          Proven track record in procurement, vendor management, and executive operations.
        </p>
        <div className="hero-actions reveal">
          <a href="#contact" className="btn btn-primary">
            <span>Download Resume</span>
            <span aria-hidden="true">↓</span>
          </a>
          <a href="#projects" className="btn btn-secondary">
            <span>View Case Studies</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="hero-stats reveal">
          <div className="hero-stat">
            <div className="hero-stat-value">150+</div>
            <div className="hero-stat-label">Vendor Partners</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">30+</div>
            <div className="hero-stat-label">Invoices / Month</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">2+</div>
            <div className="hero-stat-label">Years Experience</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">0</div>
            <div className="hero-stat-label">Error Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
