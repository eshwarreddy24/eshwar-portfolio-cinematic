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
    gsap.fromTo(ref.current.querySelectorAll('.cred-card'),
      { opacity: 0, y: 40, rotateX: 6 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
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
