import { useEffect, useRef } from "react";

const EnergyPulse = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    interface Pulse { x: number; y: number; radius: number; maxRadius: number; speed: number; opacity: number; lineWidth: number; }
    const pulses: Pulse[] = [];
    const addPulse = () => {
      pulses.push({
        x: canvas.width / 2, y: canvas.height / 2, radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.6,
        speed: 2 + Math.random() * 2, opacity: 0.15, lineWidth: 1.5,
      });
    };

    const interval = setInterval(addPulse, 4000);
    addPulse();

    let lastScroll = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - lastScroll) > 50) { addPulse(); lastScroll = window.scrollY; }
    };
    window.addEventListener("scroll", onScroll);

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.radius += p.speed; p.opacity *= 0.995;
        if (p.radius > p.maxRadius || p.opacity < 0.001) { pulses.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 23, 68, ${p.opacity})`; ctx.lineWidth = p.lineWidth; ctx.stroke();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius * 0.98, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 100, 120, ${p.opacity * 0.3})`; ctx.lineWidth = p.lineWidth * 3; ctx.stroke();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); clearInterval(interval); window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      zIndex: 2, pointerEvents: "none", opacity: 0.4,
    }} />
  );
};

export default EnergyPulse;
