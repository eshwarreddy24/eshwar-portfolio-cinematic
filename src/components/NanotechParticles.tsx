import { useEffect, useRef } from "react";

const NanotechParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const PARTICLE_COUNT = 90;
    const MOUSE_RADIUS = 140;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    window.addEventListener("mousemove", onMouseMove);

    interface NanoParticle { x: number; y: number; vx: number; vy: number; size: number; opacity: number; hex: boolean; phase: number; }
    const particles: NanoParticle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 0.5, opacity: Math.random() * 0.5 + 0.1,
        hex: Math.random() > 0.7, phase: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.1;
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 23, 68, ${alpha})`; ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        const dx = p.x - mx; const dy = p.y - my; const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.6; p.vy += (dy / dist) * force * 0.6;
        }
        p.vx += Math.sin(time + p.phase) * 0.01; p.vy += Math.cos(time + p.phase) * 0.01;
        p.vx *= 0.97; p.vy *= 0.97;
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = canvas.width + 10; if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10; if (p.y > canvas.height + 10) p.y = -10;

        const pulse = 0.5 + Math.sin(time * 2 + p.phase) * 0.3;
        ctx.save(); ctx.globalAlpha = p.opacity * pulse;

        if (p.hex) {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i - Math.PI / 6;
            const hx = p.x + Math.cos(angle) * p.size * 1.5;
            const hy = p.y + Math.sin(angle) * p.size * 1.5;
            if (i === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
          }
          ctx.closePath(); ctx.strokeStyle = "rgba(255, 50, 70, 0.6)"; ctx.lineWidth = 0.6; ctx.stroke();
          ctx.fillStyle = "rgba(255, 23, 68, 0.05)"; ctx.fill();
        } else {
          ctx.shadowBlur = 10; ctx.shadowColor = "rgba(255, 23, 68, 0.5)";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 100, 120, 0.7)"; ctx.fill();
        }
        ctx.restore();
      });

      // Hex grid background
      const gridSize = 80;
      const offsetX = (time * 5) % gridSize;
      ctx.strokeStyle = "rgba(255, 23, 68, 0.02)"; ctx.lineWidth = 0.3;
      for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
        for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize * 0.866) {
          const row = Math.floor(y / (gridSize * 0.866));
          const xOffset = row % 2 === 0 ? 0 : gridSize / 2;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i - Math.PI / 6;
            const hx = x + xOffset + Math.cos(angle) * gridSize * 0.4;
            const hy = y + Math.sin(angle) * gridSize * 0.4;
            if (i === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
          }
          ctx.closePath(); ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouseMove); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none",
    }} />
  );
};

export default NanotechParticles;
