import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const certs = [
  {
    title: 'SAP Certified — Implementation Consultant — SAP Service Cloud Version 2',
    issuer: 'SAP Certification',
    desc: 'Certified in SAP Service Cloud Version 2 implementation, demonstrating expertise in configuring and deploying SAP customer service solutions.',
    img: '/certs/sap-cert.png',
  },
  {
    title: 'Entrepreneurship Development',
    issuer: 'AIC-SKU Confederation · Atal Innovation Mission, NITI Aayog',
    desc: 'Completed IGNITE 3.0 Training Program under Chief Innovation Coach Naveen Lakkurr; led a team through entrepreneurship, business strategy, and startup-pitching.',
    img: '/certs/aic-sku.png',
  },
];

export default function Credentials() {
  const ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Eyebrow from left
    gsap.fromTo(ref.current.querySelector('.about-eyebrow'),
      { opacity: 0, x: -60, rotateY: 10 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
    // Heading drops from top
    gsap.fromTo(ref.current.querySelector('.about-h2'),
      { opacity: 0, y: -40, rotateX: -10 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' }
      }
    );
    // Cards fly from alternating directions
    ref.current.querySelectorAll('.cred-card').forEach((card: any, i: number) => {
      const fromRight = i % 2 === 1;
      gsap.fromTo(card,
        { opacity: 0, x: fromRight ? 80 : -80, rotateY: fromRight ? 15 : -15, scale: 0.85, transformPerspective: 700 },
        { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 0.9, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: card, start: 'top 85%' }, delay: i * 0.15
        }
      );
    });
  }, []);

  return (
    <section className="creds" ref={ref}>
      <div className="creds-wrap">
        <p className="about-eyebrow sr"><span>05</span> Certifications</p>
        <h2 className="about-h2 sr">
          Professional <span className="about-serif green-glow">Credentials</span>
        </h2>
        <div className="creds-grid">
          {certs.map((c, i) => (
            <div className="cred-card" key={i} onClick={() => setLightbox(c.img)}>
              <div className="cred-img-wrap">
                <img src={c.img} alt={c.title} className="cred-img" />
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="cred-issuer">
                <span style={{ color: 'var(--accent)' }}>✦</span>
                <span>{c.issuer}</span>
              </div>
              <p className="cred-tap">Tap to view full certificate →</p>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="cred-lightbox" onClick={() => setLightbox(null)}>
          <div className="cred-lightbox-inner" onClick={e => e.stopPropagation()}>
            <img src={lightbox} alt="Certificate" />
            <button className="cred-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
