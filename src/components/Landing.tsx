import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const roles = [
  'ENGINEER',
  'SAP SPECIALIST',
  'PROCUREMENT SPECIALIST',
  'GRAPHIC DESIGNER',
  'CINEMATOGRAPHER',
  'CONTENT CREATOR',
];

export default function Landing() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 50, filter: 'blur(12px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.8, ease: 'power4.out' }
    );
    tl.fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    let idx = 0;
    const el = roleRef.current;
    if (!el) return;
    const rotate = () => {
      gsap.to(el, {
        opacity: 0, y: -8, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          idx = (idx + 1) % roles.length;
          el.textContent = roles[idx];
          gsap.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        },
      });
    };
    const interval = setInterval(rotate, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="landing" id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Name with flowing water effect */}
      <h1 ref={nameRef} style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(48px, 10vw, 120px)',
        fontWeight: 800,
        textAlign: 'center',
        lineHeight: 1,
        letterSpacing: '-2px',
        marginBottom: '24px',
        position: 'relative',
        opacity: 0,
      }}>
        <span style={{
          background: 'linear-gradient(135deg, #fff 0%, #ffd700 40%, #fff 50%, #ffd700 60%, #fff 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s ease-in-out infinite',
        }}>
          ESHWAR REDDY
        </span>
        <br />
        <span style={{
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4a 30%, #ffd700 60%, #ffed4a 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s ease-in-out infinite reverse',
          fontSize: '0.6em',
          letterSpacing: '8px',
        }}>
          GALI
        </span>
      </h1>

      {/* Rotating role */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(14px, 2.5vw, 20px)',
        fontWeight: 500,
        letterSpacing: '6px',
        textTransform: 'uppercase',
        color: '#ffd700',
        minHeight: '28px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <span ref={roleRef}>{roles[0]}</span>
      </div>

      {/* Subtitle */}
      <div ref={subRef} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginTop: '32px',
        color: '#888',
        fontSize: '13px',
        letterSpacing: '3px',
        fontWeight: 400,
        opacity: 0,
      }}>
        <div style={{ width: 40, height: 1, background: 'rgba(255,215,0,0.3)' }} />
        <span>BENGALURU, INDIA</span>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ffd700', opacity: 0.6 }} />
        <span>OPEN TO WORK</span>
        <div style={{ width: 40, height: 1, background: 'rgba(255,215,0,0.3)' }} />
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        animation: 'float 2s ease-in-out infinite',
      }}>
        <div style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.4))' }} />
        <span style={{ fontSize: 10, letterSpacing: 3, color: '#555', fontWeight: 500 }}>SCROLL</span>
      </div>
    </section>
  );
}
