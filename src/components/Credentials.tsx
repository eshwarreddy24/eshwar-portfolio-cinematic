import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const certs = [
  {
    title: 'Entrepreneurship Development',
    issuer: 'AIC-SKU · Atal Innovation Mission, NITI Aayog',
    desc: 'Selected for AIC SKU IGNITE 3.0 Training Program; led a team through entrepreneurship, business strategy and startup-pitching under Chief Innovation Coach Naveen Lakkurr.',
  },
  {
    title: 'Microsoft 365 Certified: Copilot Administrator Associate',
    issuer: 'Microsoft',
    desc: 'Demonstrated expertise in Microsoft 365 Copilot administration, configuration, and enterprise deployment across organizational environments.',
  },
];

export default function Credentials() {
  const ref = useRef<HTMLDivElement>(null);

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
            <div className="cred-card" key={i}>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="cred-issuer">
                <span style={{ color: 'var(--accent)' }}>✦</span>
                <span>{c.issuer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
