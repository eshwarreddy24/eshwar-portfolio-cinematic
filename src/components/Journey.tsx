import { useState, useEffect, useRef } from 'react';
import { config } from '../config';

export default function Journey() {
  const [active, setActive] = useState(-1);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = frame.clientWidth; canvas.height = frame.clientHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
        r: Math.random() * 1.5 + .5, o: Math.random() * .3 + .05,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  // Scroll through chapters
  useEffect(() => {
    let idx = -1;
    const total = config.experiences.length;
    const handle = () => {
      if (!frameRef.current) return;
      const rect = frameRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const newIdx = Math.min(total - 1, Math.floor(progress * total));
      if (newIdx !== idx) { idx = newIdx; setActive(newIdx); }
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <section style={{ position: 'relative' }}>
      <div ref={frameRef} className="journey-frame" style={{ height: `calc(${config.experiences.length} * 100svh)` }}>
        <canvas ref={canvasRef} className="journey-canvas" />
        <div className="journey-scrim" />
        <div className="journey-overlay">
          {config.experiences.map((exp, i) => (
            <div key={i} className={`journey-chapter${active === i ? ' on' : ''}`}>
              <span className="journey-chYear">{exp.period}</span>
              <span className="journey-chTitle">{exp.role}</span>
              <span className="journey-chPlace">{exp.company} — {exp.location}</span>
              <p className="journey-chStory">
                {exp.highlights.join(' • ')}
              </p>
              <p className="journey-chBridge">
                <i>✦</i> {exp.role.includes('Content') || exp.role.includes('Meme')
                  ? 'Creating visual stories and viral content since 2020.'
                  : `Delivering results at ${exp.company}.`}
              </p>
            </div>
          ))}

          <div className="journey-rail">
            <span className="journey-counter">
              <span className="journey-counterNow">{String(active + 1).padStart(2, '0')}</span>
              {' '}/ {String(config.experiences.length).padStart(2, '0')}
            </span>
            <span className="journey-ticks">
              {config.experiences.map((_, i) => (
                <span key={i} className={`journey-tick${active === i ? ' journey-tickOn' : ''}`} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
