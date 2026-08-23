import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.sr'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
  }, []);

  return (
    <section className="connect" id="contact" ref={ref}>
      <div className="connect-head">
        <p className="connect-eyebrow sr"><span>07</span> Contact</p>
        <h2 className="connect-h2 sr">
          Let's create what's <span className="about-serif green-glow">next.</span>
        </h2>
        <p className="connect-lede sr">
          Open to opportunities in SAP, procurement, operations, and business analysis.
          Let's connect and build something impactful together.
        </p>
        <div className="connect-cta sr">
          <a href="#game" className="btn btn-primary btn-md">
            <span className="btn-fill" />
            <span className="btn-labelWrap"><span className="btn-labelStack"><span className="btn-label">Play a Game</span><span className="btn-labelClone">Play a Game</span></span></span>
            <span className="btn-arrow"><span className="btn-lead">🎮</span></span>
          </a>
        </div>
      </div>

      <div className="connect-socials">
        {[
          { href: 'tel:+919515291117', glyph: '📞', label: 'Phone', hover: '+91 95152 91117' },
          { href: 'mailto:eshwarreddy.gali@outlook.com', glyph: '✉', label: 'Email', hover: 'Send Email' },
          { href: 'https://linkedin.com/in/eshwarreddy24', glyph: 'in', label: 'LinkedIn', hover: 'Connect' },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="connect-social">
            <span className="glyph">{s.glyph}</span>
            <span className="roll">
              <span>{s.label}</span>
              <span>{s.hover}</span>
            </span>
            <span className="arr">→</span>
          </a>
        ))}
      </div>

      <div className="footer">
        <span>© {new Date().getFullYear()} Gali Eshwar Reddy</span>
        <a href="#hero">Back to top ↑</a>
      </div>
    </section>
  );
}
