import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/styles/CallToAction.css';

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelector('.cta-content'), {
      opacity: 0,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section className="cta" ref={ref}>
      <div className="cta-container">
        <div className="cta-content">
          <span className="cta-tag">05</span>
          <h2 className="cta-title">Let's Build Something Great</h2>
          <p className="cta-text">
            Open to opportunities in SAP Customer Success, Business Operations,
            and Creative roles. Let's connect.
          </p>
        </div>
      </div>
    </section>
  );
}