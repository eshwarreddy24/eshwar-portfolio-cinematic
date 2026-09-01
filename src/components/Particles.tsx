import { useEffect, useRef } from 'react';

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Floating particles — reduced to 25
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 1.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      alpha: 0.08 + Math.random() * 0.12,
    }));

    let raf: number;
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - lastTime < interval) return;
      lastTime = time;

      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${p.alpha})`;
        ctx.fill();
      });
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  // Custom cursor — throttled with RAF
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let ticking = false;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
          ring.style.transform = `translate(${mx - 18}px, ${my - 18}px)`;
          ticking = false;
        });
      }
    };

    const onEnter = () => ring.classList.add('hovering');
    const onLeave = () => ring.classList.remove('hovering');

    window.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button, .tool-node, .paper, .cred-card, .connect-social').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="particle-canvas" />
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />
    </>
  );
}
