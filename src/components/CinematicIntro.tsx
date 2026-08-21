import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../components/styles/CinematicIntro.css';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; life: number; color: string }[] = [];
    const geometricLines: { x1: number; y1: number; x2: number; y2: number; progress: number; speed: number }[] = [];
    const circuitPaths: { points: { x: number; y: number }[]; progress: number; speed: number }[] = [];

    // Create geometric lines
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      geometricLines.push({
        x1: cx,
        y1: cy,
        x2: cx + Math.cos(angle) * 900,
        y2: cy + Math.sin(angle) * 900,
        progress: 0,
        speed: 0.004 + Math.random() * 0.006,
      });
    }

    // Create circuit paths (Wakandan tech lines)
    for (let i = 0; i < 12; i++) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const points: { x: number; y: number }[] = [];
      let px = cx;
      let py = cy;
      for (let j = 0; j < 8; j++) {
        const step = 30 + Math.random() * 50;
        const dir = angle + (Math.random() - 0.5) * 1.2;
        px += Math.cos(dir) * step;
        py += Math.sin(dir) * step;
        points.push({ x: px, y: py });
      }
      circuitPaths.push({ points, progress: 0, speed: 0.008 + Math.random() * 0.012 });
    }

    // Concentric hexagons
    const hexagons: { radius: number; rotation: number; opacity: number }[] = [];
    for (let i = 0; i < 10; i++) {
      hexagons.push({ radius: 40 + i * 50, rotation: i * 0.15, opacity: 0 });
    }

    let animId: number;
    const animate = () => {
      frame++;
      ctx.fillStyle = 'rgba(3, 3, 8, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw geometric lines
      geometricLines.forEach((line, i) => {
        if (frame > i * 1.5) {
          line.progress = Math.min(line.progress + line.speed, 1);
        }
        const ex = line.x1 + (line.x2 - line.x1) * line.progress;
        const ey = line.y1 + (line.y2 - line.y1) * line.progress;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(ex, ey);
        const gradient = ctx.createLinearGradient(line.x1, line.y1, ex, ey);
        gradient.addColorStop(0, 'rgba(0, 180, 255, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 255, 200, 0.05)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw circuit paths
      circuitPaths.forEach((path) => {
        if (frame > 20) {
          path.progress = Math.min(path.progress + path.speed, 1);
        }
        const pts = path.points;
        const drawCount = Math.floor(pts.length * path.progress);
        if (drawCount < 2) return;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        for (let j = 0; j < drawCount; j++) {
          ctx.lineTo(pts[j].x, pts[j].y);
        }
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw hexagons
      hexagons.forEach((hex, i) => {
        if (frame > 30 + i * 12) {
          hex.opacity = Math.min(hex.opacity + 0.01, 0.5);
          hex.rotation += 0.002;
        }
        if (hex.opacity <= 0) return;
        ctx.beginPath();
        for (let j = 0; j <= 6; j++) {
          const angle = (j / 6) * Math.PI * 2 + hex.rotation;
          const x = cx + Math.cos(angle) * hex.radius;
          const y = cy + Math.sin(angle) * hex.radius;
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0, 200, 255, ${hex.opacity * 0.6})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Energy particles
      if (frame > 40 && Math.random() > 0.6) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2.5;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 2,
          life: 1,
          color: Math.random() > 0.5 ? '0, 200, 255' : '0, 255, 200',
        });
      }

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.006;
        if (p.life <= 0) { particles.splice(i, 1); return; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.8})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);

    // GSAP timeline
    const tl = gsap.timeline();
    tl.set('.intro-overlay', { opacity: 1 });
    tl.to({}, { duration: 1.5 });
    tl.set('.marvel-studios', { opacity: 0, scale: 0.5 })
      .to('.marvel-studios', { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, '+=0.5')
      .to({}, { duration: 1.2 });
    tl.set('.intro-name', { opacity: 0, letterSpacing: '40px', y: 20 })
      .to('.intro-name', { opacity: 1, letterSpacing: '10px', y: 0, duration: 1.5, ease: 'power4.out' })
      .set('.intro-subtitle', { opacity: 0, y: 15 })
      .to('.intro-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
      .to({}, { duration: 0.8 });
    tl.to('.intro-flash', { opacity: 1, duration: 0.08 })
      .to('.intro-flash', { opacity: 0, duration: 0.4 })
      .to('.intro-overlay', {
        opacity: 0, duration: 1.2, ease: 'power2.inOut',
        onComplete: () => { cancelAnimationFrame(animId); onComplete(); },
      }, '+=0.2');

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="intro-overlay" ref={containerRef}>
      <canvas ref={canvasRef} className="intro-canvas" />
      <div className="intro-flash" />
      <div className="intro-content">
        <div className="marvel-studios">
          <div className="marvel-line" />
          <span className="marvel-text">PRESENTS</span>
          <div className="marvel-line" />
        </div>
        <h1 className="intro-name">ESHWAR REDDY GALI</h1>
        <p className="intro-subtitle">ENGINEER · SAP SPECIALIST · CREATIVE PROFESSIONAL</p>
      </div>
      <div className="vibranium-border" />
    </div>
  );
}