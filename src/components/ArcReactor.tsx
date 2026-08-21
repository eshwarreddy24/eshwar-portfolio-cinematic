import { useEffect, useRef } from "react";

const ArcReactor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const size = 500;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    interface Ring { radius: number; segments: number; speed: number; width: number; opacity: number; dashLen: number; gapLen: number; }
    const rings: Ring[] = [
      { radius: 60, segments: 12, speed: 0.02, width: 2, opacity: 0.8, dashLen: 8, gapLen: 12 },
      { radius: 85, segments: 16, speed: -0.015, width: 1.5, opacity: 0.6, dashLen: 6, gapLen: 14 },
      { radius: 110, segments: 20, speed: 0.01, width: 1, opacity: 0.4, dashLen: 4, gapLen: 16 },
      { radius: 135, segments: 24, speed: -0.008, width: 0.8, opacity: 0.3, dashLen: 3, gapLen: 18 },
      { radius: 160, segments: 28, speed: 0.006, width: 0.5, opacity: 0.2, dashLen: 2, gapLen: 20 },
    ];

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, size, size);

      // Outer glow
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      outerGlow.addColorStop(0, "rgba(255, 23, 68, 0.08)");
      outerGlow.addColorStop(0.5, "rgba(213, 0, 0, 0.03)");
      outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath(); ctx.arc(cx, cy, 200, 0, Math.PI * 2); ctx.fill();

      // Rotating rings
      rings.forEach((ring) => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(time * ring.speed);
        ctx.beginPath(); ctx.arc(0, 0, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 23, 68, ${ring.opacity})`;
        ctx.lineWidth = ring.width; ctx.setLineDash([ring.dashLen, ring.gapLen]); ctx.stroke();
        for (let i = 0; i < ring.segments; i++) {
          const angle = (Math.PI * 2 / ring.segments) * i;
          const x = Math.cos(angle) * ring.radius;
          const y = Math.sin(angle) * ring.radius;
          ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 100, 100, ${ring.opacity * 0.8})`; ctx.fill();
        }
        ctx.setLineDash([]); ctx.restore();
      });

      // Energy arcs
      for (let i = 0; i < 3; i++) {
        const angle1 = time * 0.5 + (Math.PI * 2 / 3) * i;
        const angle2 = angle1 + 0.3 + Math.sin(time * 3) * 0.2;
        const r1 = 70 + Math.sin(time * 2 + i) * 10;
        const r2 = 120 + Math.cos(time * 2 + i) * 15;
        const x1 = cx + Math.cos(angle1) * r1; const y1 = cy + Math.sin(angle1) * r1;
        const x2 = cx + Math.cos(angle2) * r2; const y2 = cy + Math.sin(angle2) * r2;
        const midX = (x1 + x2) / 2 + Math.sin(time * 5 + i) * 15;
        const midY = (y1 + y2) / 2 + Math.cos(time * 5 + i) * 15;
        ctx.beginPath(); ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(midX, midY, x2, y2);
        ctx.strokeStyle = `rgba(255, 60, 80, ${0.15 + Math.sin(time * 4 + i) * 0.1})`;
        ctx.lineWidth = 0.8; ctx.stroke();
      }

      // Core pulsing glow
      const pulse = 0.6 + Math.sin(time * 2) * 0.2;
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      coreGlow.addColorStop(0, `rgba(255, 50, 70, ${pulse * 0.4})`);
      coreGlow.addColorStop(0.4, `rgba(255, 23, 68, ${pulse * 0.2})`);
      coreGlow.addColorStop(1, "rgba(213, 0, 0, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2); ctx.fill();

      // Core center
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.8})`; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 50, 70, ${pulse * 0.3})`; ctx.fill();

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", top: "50%", left: "50%",
      width: "min(60vh, 500px)", height: "min(60vh, 500px)",
      transform: "translate(-50%, -50%)", zIndex: 2,
      pointerEvents: "none", filter: "blur(0.5px)",
    }} />
  );
};

export default ArcReactor;
